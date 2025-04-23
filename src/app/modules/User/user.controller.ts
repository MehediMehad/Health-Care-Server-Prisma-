import { Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';

const createAdmin = catchAsync(async (req: Request, res: Response) => {    
    const result = await UserService.createAdmin(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin created successfully',
        data: result
    });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {    
    const result = await UserService.createDoctor(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Doctor created successfully',
        data: result
    });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createPatient(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient Created successfully!",
        data: result
    })
});

export const UserController = {
    createAdmin,
    createDoctor,
    createPatient
};
