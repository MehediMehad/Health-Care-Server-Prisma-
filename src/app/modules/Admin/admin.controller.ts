import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterPikedFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterPikedFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await AdminService.getAllFromDB(filters, options);
    // res.status(200).json({
    //   success: true,
    //   message: "Admin data fetched",
    //   meta: result.meta,
    //   data: result.data,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    next()
  }
};

const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data fetched by id",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

const updateIntoDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data updated!",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

const deleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await AdminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

const softDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await AdminService.softDeleteFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin soft deleted!",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
