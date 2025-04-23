import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { fileUploader } from '../../../helpers/fileUploader';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
    '/create-admin',
    auth('ADMIN', 'SUPPER_ADMIN'),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data));
        return UserController.createAdmin(req, res, next);
    }
);


router.post(
    '/create-doctor',
    auth('ADMIN', 'SUPPER_ADMIN'),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createDoctor.parse(JSON.parse(req.body.data));
        return UserController.createDoctor(req, res, next);
    }
);

export const UserRoutes = router;

// (async function() {

//     // Configuration
//    cloudinary.config({
//        cloud_name: 'dxbpbbpbh',
//        api_key: '217764316287532',
//        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//    });

//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });

//     console.log(uploadResult);

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();
