import { Request, RequestHandler, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpsCode from 'http-status'
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res:Response) => {
    const result = await AuthService.loginUser()    

    sendResponse(res, {
        statusCode: httpsCode.OK,
        success: true,
        message: "Logged successfully",
        data: result
    })
})


export const AuthController = {
    loginUser
}