import jwt, { SignOptions } from "jsonwebtoken";

const generateToken = (payload: any, secret: string, expiresIn: string) => {

  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  const tokens = jwt.sign(payload, secret, options);
  return tokens;
};

export const jwtHelpers = {
    generateToken
};
