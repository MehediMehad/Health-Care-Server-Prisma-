import { Gender } from '@prisma/client';
import { z } from 'zod';

const createAdmin = z.object({
    password: z.string({ required_error: 'password is required' }),
    admin: z.object({
        name: z.string({ required_error: 'name is required' }),
        email: z
            .string({ required_error: 'email is required' })
            .email({ message: 'provide a valid email' }),
        contactNumber: z.string({
            required_error: 'contact Number is required'
        })
    })
});

const createDoctor = z.object({
    password: z.string({
        required_error: 'Password is required'
    }),
    doctor: z.object({
        name: z.string({
            required_error: 'Name is required!'
        }),
        email: z.string({
            required_error: 'Email is required!'
        }),
        contactNumber: z.string({
            required_error: 'Contact Number is required!'
        }),
        address: z.string().optional(),
        registrationNumber: z.string({
            required_error: 'Reg number is required'
        }),
        experience: z.number().optional(),
        gender: z.nativeEnum(Gender).refine(
            (val) => Object.values(Gender).includes(val),
            (val) => ({
                message: `Invalid gender value: '${val}', expected one of [${Object.values(
                    Gender
                ).join(', ')}]`
            })
        ),
        appointmentFee: z.number({
            required_error: 'appointmentfee is required'
        }),
        qualification: z.string({
            required_error: 'qualification is required'
        }),
        currentWorkingPlace: z.string({
            required_error: 'Current working place is required!'
        }),
        designation: z.string({
            required_error: 'Designation is required!'
        })
    })
});

export const UserValidation = {
    createAdmin,
    createDoctor
};
