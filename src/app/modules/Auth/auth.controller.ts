import { Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpsCode from 'http-status'
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res:Response) => {

    const result = await AuthService.loginUser(req.body)    
    const {refreshTokens} = result
    res.cookie('refreshTokens', refreshTokens, {
        secure: true,
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpsCode.OK,
        success: true,
        message: "Logged successfully",
        data: {
            accessTokens: result.accessTokens,
            needPasswordChange: result.needPasswordChange
        }
    })
})


export const AuthController = {
    loginUser
}