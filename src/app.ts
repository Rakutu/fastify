import userRoute from './modules/users/user.route';
import { fastify as Fastify } from 'fastify';


const PORT = Number(process.env.PORT) || 3000;
const server = Fastify();

server.get('/healthcheck', async () => {
    return {
        status: 'OK',
    }
})

async function main() {
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
