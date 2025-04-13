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

  const accessToken = jwtHelpers.generateToken(data, "sgdhsadhsaj", '5m') // sort time

  const refreshToken = jwtHelpers.generateToken(data, 'sahsahsahd', '30d') // long time

  return {
    needPasswordChange: userData.needPasswordChange,
    accessToken,
    refreshToken
  };
};

const refreshToken = async (token: string) => {
    console.log("ress", token);
    
}

export const AuthService = {
  loginUser,
  refreshToken
};
