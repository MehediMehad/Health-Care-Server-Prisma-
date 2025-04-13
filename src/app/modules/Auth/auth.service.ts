import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const accessTokens = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "ajsskskkss",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  const refreshTokens = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "jajakaishdb",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  return {
    needPasswordChange: userData.needPasswordChange,
    accessTokens,
    refreshTokens
  };
};

export const AuthService = {
  loginUser,
};
