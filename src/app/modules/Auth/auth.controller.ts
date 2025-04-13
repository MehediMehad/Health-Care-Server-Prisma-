import { Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpsCode from 'http-status'
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res:Response) => {

    const result = await AuthService.loginUser(req.body)    
    const {refreshToken} = result
    res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: httpsCode.OK,
        success: true,
        message: "Logged successfully",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
})

const refreshToken = catchAsync(async (req: Request, res:Response) => {    
    const {refreshToken} = req.cookies

    const result = await AuthService.refreshToken(refreshToken)    


    sendResponse(res, {
        statusCode: httpsCode.OK,
        success: true,
        message: "Logged successfully",
        data: result
        // data: {
        //     accessTokens: result.accessTokens,
        //     needPasswordChange: result.needPasswordChange
        // }
    })
})




export const AuthController = {
    loginUser,
    refreshToken
}