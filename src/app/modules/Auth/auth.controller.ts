import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpsCode from 'http-status';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true
    });

    sendResponse(res, {
        statusCode: httpsCode.OK,
        success: true,
        message: 'Logged successfully',
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpsCode.OK,
        success: true,
        message: 'Access token generated successfully',
        data: result
    });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const user = req.user; 
    const body = req.body

    const result = await AuthService.changePassword(user, body);

    sendResponse(res, {
        statusCode: httpsCode.OK,
        success: true,
        message: 'password changed successfully',
        data: result
    });
});

export const AuthController = {
    loginUser,
    refreshToken,
    changePassword
};
