import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserSchema } from './user.schema';
import { createUser } from './user.service';

async function registerUserHandler(
    request: FastifyRequest<{ Body: CreateUserSchema }>,
    reply: FastifyReply
) {
    const body = request.body;

    try {
        const user = await createUser(body);

        reply.status(201).send(user);
    } catch (error) {
        console.error(error);
        // error code just for fast, without validation
        reply.send(500);
    }
}

export default registerUserHandler;