import { z } from 'zod';


const createUserSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Invalid email address',
    }),
    name: z.string({
        invalid_type_error: 'Name must be a string',
    }).optional(),
    password: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Password must be a string',
    }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;