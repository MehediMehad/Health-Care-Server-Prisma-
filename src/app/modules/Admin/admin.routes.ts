import express from 'express';
import { AdminController } from './admin.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { adminValidationSchema } from './admin.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('ADMIN', 'SUPPER_ADMIN'), AdminController.getAllFromDB);
router.get(
    '/:id',
    auth('ADMIN', 'SUPPER_ADMIN'),
    AdminController.getByIdFromDB
);
router.patch(
    '/:id',
    auth('ADMIN', 'SUPPER_ADMIN'),
    validateRequest(adminValidationSchema.updateValidation),
    AdminController.updateIntoDB
);
router.delete(
    '/:id',
    auth('ADMIN', 'SUPPER_ADMIN'),
    AdminController.deleteFromDB
);
router.patch(
    '/soft/:id',
    auth('ADMIN', 'SUPPER_ADMIN'),
    AdminController.softDeleteFromDB
);

export const AdminRoutes = router;
