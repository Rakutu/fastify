import userRoute from './modules/users/user.route';
import { fastify as Fastify, FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import { userSchemas } from './modules/users/user.schema';
import { productSchemas } from './modules/product/product.schema';
import productRoute from './modules/product/product.route';


const PORT = Number(process.env.PORT) || 3000;
const SECRET = process.env.SECRET || 'supersecret';

export const server = Fastify();

server.register(fjwt, {
    secret: SECRET,
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
        status: 'ok',
    }
})

async function main() {
    for (const schema of [ ...userSchemas, ...productSchemas ]) {
        server.addSchema(schema);
    }
    server.register(userRoute, {
        prefix: 'api/users',
    });

    server.register(productRoute, {
        prefix: '/api/product'
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
