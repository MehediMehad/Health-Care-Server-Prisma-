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

  const accessTokens = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "ajsskskkss",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );
  console.log(41, accessTokens);
  

  return accessTokens
};

export const AuthService = {
  loginUser,
};
