import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/login', AuthController.loginUser);
router.post('/refresh-token', AuthController.refreshToken);
router.post(
    '/change-password',
    auth('ADMIN', 'DOCTOR', 'PATIENT', 'SUPPER_ADMIN'),
    AuthController.changePassword
);

router.post(
    '/forgot-password',
    auth('ADMIN', 'DOCTOR', 'PATIENT', 'SUPPER_ADMIN'),
    AuthController.forgotPassword
);

export const AuthRouter = router;
