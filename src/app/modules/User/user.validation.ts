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

const createUser = z.object({
    password: z.string({ required_error: 'password is required' }),
    user: z.object({
        name: z.string({ required_error: 'name is required' }),
        email: z
            .string({ required_error: 'email is required' })
            .email({ message: 'provide a valid email' }),
        contactNumber: z.string({
            required_error: 'contact Number is required'
        })
    })
});

export const UserValidation = {
    createAdmin,
    createUser
};
