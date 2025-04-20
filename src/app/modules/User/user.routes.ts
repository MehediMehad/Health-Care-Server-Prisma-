import express from 'express';
import { UserController } from './user.controller';import auth from '../../middlewares/auth';
;

const router = express.Router();




router.post('/', auth("ADMIN","SUPPER_ADMIN"), UserController.createAdmin);

export const UserRoutes = router;
