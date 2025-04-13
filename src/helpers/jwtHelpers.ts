import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {

  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  const tokens = jwt.sign(payload, secret, options);
  return tokens;
};

const verifyToken = (token: string, secret: Secret ) =>{
  return jwt.verify(token, secret) as JwtPayload 
}  


export const jwtHelpers = {
    generateToken,
    verifyToken
};
