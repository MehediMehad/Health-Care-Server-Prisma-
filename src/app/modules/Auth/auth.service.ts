import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password in incorrect")
  }

  const data = {
    email: userData.email,
    role: userData.role
  }

  const accessTokens = jwtHelpers.generateToken(data, "sgdhsadhsaj", '5m')

  const refreshTokens = jwtHelpers.generateToken(data, 'sahsahsahd', '30d')

  return {
    needPasswordChange: userData.needPasswordChange,
    accessTokens,
    refreshTokens
  };
};

export const AuthService = {
  loginUser,
};
