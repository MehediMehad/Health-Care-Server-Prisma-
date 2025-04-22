import prisma from '../../../shared/prisma';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { fileUploader } from '../../../helpers/fileUploader';

const createAdmin = async (req: any) => {
    const file = req.file;

    if (file) {
        const fileUploadToCloudinary =
            await fileUploader.uploadToCloudinary(file);
            console.log(fileUploadToCloudinary);    
            
        req.body.admin.profilePhoto = fileUploadToCloudinary?.secure_url;
    }

    const hashPassword: string = await bcrypt.hash(req.body.password, 12);

    const userData = {
        email: req.body.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN
    };

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    return result;
};

export const UserService = {
    createAdmin
};
