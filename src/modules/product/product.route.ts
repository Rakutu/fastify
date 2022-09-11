import { FastifyInstance } from 'fastify';
import { $ref } from './product.schema';
import { getProductsHandler, registerProductHandler } from './product.controller';


async function productRoute(server: FastifyInstance) {
    server.post('/', {
        preHandler: server.authenticate,
        schema: {
            body: $ref('createProductSchema'),
            response: {
                201: $ref('productResponseSchema'),
            },
        },
    }, registerProductHandler);

    server.get('/', {
        schema: {
            response: {
                200: $ref('productsResponseSchema'),
            },
        },
    }, getProductsHandler);
}

export default productRoute;