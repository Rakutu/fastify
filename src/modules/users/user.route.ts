import { FastifyInstance } from 'fastify';
import registerUserHandler from './user.controller';


async function userRoute(server: FastifyInstance) {
    server.post('/', registerUserHandler);
}

export default userRoute