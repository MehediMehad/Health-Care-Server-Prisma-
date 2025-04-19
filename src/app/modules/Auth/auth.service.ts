import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import config from "../../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password in incorrect");
  }

  const data = {
    email: userData.email,
    role: userData.role,
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
    refreshToken,
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
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const data = {
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelpers.generateToken(
    data,
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  ); // sort time

  return {
    needPasswordChange: userData.needPasswordChange,
    accessToken,
  };
};
export const AuthService = {
  loginUser,
  refreshToken,
};
