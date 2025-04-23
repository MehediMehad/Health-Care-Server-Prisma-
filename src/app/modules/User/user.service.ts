import prisma from '../../../shared/prisma';
import { Admin, Doctor, Patient, Prisma, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { fileUploader } from '../../../helpers/fileUploader';
import { IFile } from '../../interface/file';
import { Request } from 'express';
import { IPaginationOptions } from '../../interface/pagination';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { userSearchAbleFields } from './user.constant';

const createAdmin = async (req: Request): Promise<Admin>  => {
    const file = req.file as IFile;

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

const createDoctor = async (req: Request): Promise<Doctor>  => {
    const file = req.file as IFile;

    if (file) {
        const fileUploadToCloudinary =
            await fileUploader.uploadToCloudinary(file);
            console.log(fileUploadToCloudinary);    
            
        req.body.doctor.profilePhoto = fileUploadToCloudinary?.secure_url;
    }

    const hashPassword: string = await bcrypt.hash(req.body.password, 12);
    
    const userData = {
        email: req.body.doctor.email,
        password: hashPassword,
        role: UserRole.DOCTOR
    };

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdDoctorData = await transactionClient.doctor.create({
            data: req.body.doctor
        });

        return createdDoctorData;
    });

    return result;
};

const createPatient = async (req: Request): Promise<Patient> => {
    const file = req.file as IFile;

    if (file) {
        const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
        req.body.patient.profilePhoto = uploadedProfileImage?.secure_url;
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
        role: UserRole.PATIENT
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdPatientData = await transactionClient.patient.create({
            data: req.body.patient
        });

        return createdPatientData;
    });

    return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
    console.log(25, options);
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andCondition: Prisma.UserWhereInput[] = [];
    

    if (params.searchTerm) {
        andCondition.push({
            OR: userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive' // search case insensitive
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key],
                    // mode: 'insensitive'    // insensitive you can not use equals only use contains
                }
            }))
        });
    }

    console.dir(andCondition, { depth: null });
    
    
    const whereCondition: Prisma.UserWhereInput = andCondition.length > 0 ? { AND: andCondition } : {};

    const result = await prisma.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy:
            sortBy && sortOrder
                ? {
                      [sortBy]: sortOrder
                  }
                : {
                      createdAt: 'desc'
                  }
    });

    const total = await prisma.user.count({
        where: whereCondition
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};
export const UserService = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllFromDB
};
