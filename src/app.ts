import userRoute from './modules/users/user.route';
import { fastify as Fastify } from 'fastify';
import { userSchemas } from './modules/users/user.schema';


const PORT = Number(process.env.PORT) || 3000;
const server = Fastify();

server.get('/healthcheck', async () => {
    return {
        status: 'OK',
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
