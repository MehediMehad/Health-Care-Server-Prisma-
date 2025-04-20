import { UserStatus } from '@prisma/client';
import { jwtHelpers, TPayloadToken } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import * as bcrypt from 'bcrypt';
import config from '../../../config';
import ApiError from '../../errors/APIError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: { email: string; password: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword = await bcrypt.compare(
        payload.password,
        userData.password
    );

    if (!isCorrectPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password in incorrect');
    }

    const data: TPayloadToken = {
        email: userData.email,
        role: userData.role
    };

    const accessToken = jwtHelpers.generateToken(
        data,
        config.jwt.jwt_secret as string,
        config.jwt.expires_in as string
    ); // "5m"

    const refreshToken = jwtHelpers.generateToken(
        data,
        config.jwt.refresh_token_secret as string,
        config.jwt.refresh_token_expires_in as string
    ); // "30d"

    return {
        needPasswordChange: userData.needPasswordChange,
        accessToken,
        refreshToken
    };
};

const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(
            token,
            config.jwt.refresh_token_secret as string
        ); // refreshToken secret
    } catch (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData?.email,
            status: UserStatus.ACTIVE
        }
    });

    const data: TPayloadToken = {
        email: userData.email,
        role: userData.role
    };

    const accessToken = jwtHelpers.generateToken(
        data,
        config.jwt.jwt_secret as string,
        config.jwt.expires_in as string
    ); // sort time

    return {
        needPasswordChange: userData.needPasswordChange,
        accessToken
    };
};

const changePassword = async (user: any, payload: any) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword = await bcrypt.compare(
        payload.oldPassword,
        userData.password
    );

    if (!isCorrectPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password in incorrect');
    }

    const hashPassword: string = await bcrypt.hash(payload.newPassword, 12);

    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashPassword,
            needPasswordChange: false
        }
    });

    return {
        message: 'password changed successfully'
    };
};

const forgotPassword = async (payload: { email: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });

    const resetPasswordToken = jwtHelpers.generateToken(
        { email: userData.email, role: userData.role },
        config.jwt.reset_password_token as Secret,
        config.jwt.reset_password_token_expires_in // "5m"
    );
    console.log(133, resetPasswordToken);
    
};

export const AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword
};
