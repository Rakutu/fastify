import { FastifyInstance } from 'fastify';
import { registerUserHandler, loginHandler } from './user.controller';
import { $ref } from './user.schema';
import { getUsersHandler } from './user.service';


export async function userRoute(server: FastifyInstance) {
    server.post('/', {
        preHandler: server.authenticate,
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('responseUserSchema'),
          },
        },
    }, registerUserHandler);

    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                201: $ref('loginResponseSchema'),
            },
        },
    }, loginHandler);

    server.get('/', {
        preHandler: server.authenticate,
    }, getUsersHandler)
}

export default userRoute;