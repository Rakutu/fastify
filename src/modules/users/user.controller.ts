import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserSchema, LoginSchema } from './user.schema';
import { createUser, findUserByEmail } from './user.service';
import { verifyPassword } from '../../utils/hash';
import { generateAccessToken } from '../../utils/generateAccessToken';

export async function registerUserHandler(
    request: FastifyRequest<{ Body: CreateUserSchema }>,
    reply: FastifyReply
) {
    const body = request.body;

    try {
        const user = await createUser(body);

        reply.code(201).send(user);
    } catch (error) {
        console.error(error);
        // error code just for fast, without validation
        reply.send(500);
    }
}

export async function loginHandler(
    request: FastifyRequest<{ Body: LoginSchema }>,
    reply: FastifyReply,
) {
    const { email, password: loginPassword } = request.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return reply.code(401).send({
            message: 'Invalid email or password',
        });
    }

    const isCorrectedPassword = verifyPassword({
        candidatePassword: loginPassword,
        salt: user.salt,
        hash: user.password,
    });

    if (!isCorrectedPassword) {
        return reply.code(401).send({
            message: 'Invalid email or password',
        });
    }

    const { password, salt, ...rest } = user;

    return {
        access_token: generateAccessToken(rest),
    }
}