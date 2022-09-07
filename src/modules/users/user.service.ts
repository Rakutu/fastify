import prisma from '../../utils/prisma';
import { CreateUserSchema } from './user.schema';
import { hashPassword } from '../../utils/hash';

export async function createUser(input: CreateUserSchema) {
    const { password, ...rest } = input;
    const { hash, salt } = hashPassword(password);

    return await prisma.user.create({
        data: {
            ...rest,
            salt,
            password: hash,
        },
    });
}