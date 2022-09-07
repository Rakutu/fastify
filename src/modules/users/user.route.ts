import { FastifyInstance } from 'fastify';
import registerUserHandler from './user.controller';
import { $ref } from './user.schema';


async function userRoute(server: FastifyInstance) {
    server.post('/', {
        schema: {
          body: $ref('createUserSchema'),
          response: {
              201: $ref('responseUserSchema'),
          },
        },
    }, registerUserHandler);
}

export default userRoute