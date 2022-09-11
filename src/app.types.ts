import { FastifyReply, FastifyRequest } from 'fastify';


declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: (request: FastifyRequest<{ Body: any }>, reply: FastifyReply) => Promise<void>;
    }
}

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            id: number;
            email: string;
            name: string;
        }
    }
}