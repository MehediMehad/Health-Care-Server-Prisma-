import express, { Request, Response, NextFunction } from "express";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { adminValidationSchema } from "./admin.validation";

const router = express.Router();
router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchema.updateValidation),
  AdminController.updateIntoDB
);
router.delete("/:id", AdminController.deleteFromDB);
router.patch("/soft/:id", AdminController.softDeleteFromDB);

export const AdminRoutes = router;
