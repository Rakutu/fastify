import { server } from '../app';


interface Options {
    id: number;
    email: string;
    name: string | null;
}

export function generateAccessToken(options: Options) {
    return server.jwt.sign(options)
}