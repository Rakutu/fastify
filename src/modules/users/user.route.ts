import { FastifyInstance } from 'fastify';
import { registerUserHandler, loginHandler } from './user.controller';
import { $ref } from './user.schema';


export async function userRoute(server: FastifyInstance) {
    server.post('/', {
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
                200: $ref('loginResponseSchema'),
            }
        }
    }, loginHandler);
}

export default userRoute;