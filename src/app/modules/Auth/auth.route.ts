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

export const AuthRouter = router;
