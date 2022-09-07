import userRoute from './modules/users/user.route';
import { fastify as Fastify } from 'fastify';


const PORT = process.env.PORT || 3000;
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
        await server.listen(PORT, '0.0.0.0');

        console.log(`Server ready at http://localhost:${PORT}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

main();
