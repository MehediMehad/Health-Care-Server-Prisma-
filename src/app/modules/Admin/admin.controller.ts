import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterPikedFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";

const getAllFromDB = async (req: Request, res: Response) => {
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
      success: true,
      statusCode: 200,
      message: "Admin data fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Southing went wrong",
      error: error,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin data fetched by id",
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin data updated!",
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.deleteFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin data deleted!",
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.softDeleteFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Admin soft deleted!",
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
