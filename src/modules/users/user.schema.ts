import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';


const userSchemaCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Invalid email address',
    }),
    name: z.string({
        invalid_type_error: 'Name must be a string',
    }).optional(),
};

const createUserSchema = z.object({
    ...userSchemaCore,
    password: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Password must be a string',
    }),
});

const responseUserSchema = z.object({
    ...userSchemaCore,
    id: z.number(),
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Invalid email address',
    }),
    password: z.string(),
});

const loginResponseSchema = z.object({
    access_token: z.string(),
});


export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    responseUserSchema,
    loginSchema,
    loginResponseSchema,
}, {
    $id: 'userSchemas',
});