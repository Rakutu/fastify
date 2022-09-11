import { FastifyReply, FastifyRequest } from 'fastify';


declare module 'fastify' {
    export interface FastifyInstance {
        // authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
        authenticate: any;
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