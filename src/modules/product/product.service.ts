import { CreateProductSchema } from './product.schema';
import prisma from '../../utils/prisma';


export async function createProduct(data: CreateProductSchema & { ownerId: number}) {
    return await prisma.product.create({
        data,
    });
}

export async function getProducts() {
    return await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            price: true,
            updatedAt: true,
            createdAt: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
}