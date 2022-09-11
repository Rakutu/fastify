import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProductSchema } from './product.schema';
import { createProduct, getProducts } from './product.service';


export async function registerProductHandler(
    request: FastifyRequest<{ Body: CreateProductSchema }>,
    reply: FastifyReply,
) {
    const { body, user } = request;

    try {
        const product = await createProduct({
            ...body,
            ownerId: user.id,
        });

        reply.code(201).send(product);
    } catch (error) {
        console.error(error);
        // error code just for fast, without validation
        reply.send(500);
    }
}

export async function getProductsHandler() {
    return await getProducts();
}