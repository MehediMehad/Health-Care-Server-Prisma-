import { Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../Admin/admin.controller";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createAdmin(req.body);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
})

export const UserController = {
  createAdmin,
};
