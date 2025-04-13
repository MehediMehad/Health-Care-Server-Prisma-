import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE
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
    let decodedData;
 try {
    decodedData = jwtHelpers.verifyToken(token, "sahsahsahd")// refreshToken secret
    
    console.log(52, decodedData);
 } catch (err) {
    throw new Error("You are not authorized!")
 }

 const userData = await prisma.user.findUniqueOrThrow({
    where: {
        email: decodedData?.email,
        status: UserStatus.ACTIVE
    }
 })

 const data = {
    email: userData.email,
    role: userData.role
  }

 const accessToken = jwtHelpers.generateToken(data, "sgdhsadhsaj", '5m') // sort time

    
 return {
    needPasswordChange: userData.needPasswordChange,
    accessToken,
  };
}
export const AuthService = {
  loginUser,
  refreshToken
};
