import userRoute from './modules/users/user.route';
import { fastify as Fastify, FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import { userSchemas } from './modules/users/user.schema';


const PORT = Number(process.env.PORT) || 3000;
const SECRET = process.env.SECRET;

const server = Fastify();

server.register(fjwt, {
    secret: '',
})

server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply)=> {
    try {
        await request.jwtVerify();
    } catch (error) {
        return reply.send(error);
    }
})

server.get('/healthcheck', async () => {
    return {
        status: SECRET,
    }
})

async function main() {
    for (const schema of userSchemas) {
        server.addSchema(schema);
    }

    server.register(userRoute, {
        prefix: 'api/users',
    });

    try {
        await server.listen({
            port: PORT,
        });

        console.info(`Server ready at http://localhost:${PORT}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();
