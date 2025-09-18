import { Request, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { userFilterableFields } from './user.constant';
import pick from '../../../shared/pick';

const registrationNewUser = catchAsync(async (req: Request, res: Response) => {    
    const result = await UserService.registrationNewUser(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result
    });
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await UserService.getAllFromDB(filters, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data fetched!",
        meta: result.meta,
        data: result.data
    })
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await UserService.changeProfileStatus(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});




export const UserController = {
    registrationNewUser,
    getAllFromDB,
    changeProfileStatus,
};
