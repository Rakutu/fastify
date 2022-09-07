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
    id: z.number(),
    ...userSchemaCore,
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    responseUserSchema,
});