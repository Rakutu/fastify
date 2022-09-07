import crypto from 'crypto';


interface Hash {
    hash: string;
    salt: string;
}

interface VerifyPasswordArgs {
    candidatePassword: string;
    hash: string;
    salt: string;
}

export function hashPassword(password: string): Hash {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(
        password,
        salt,
        1000,
        64,
        'sha512',
    ).toString('hex');

    return {
        hash,
        salt
    };
}

export function verifyPassword(options: VerifyPasswordArgs): boolean {
    const {
        candidatePassword,
        hash,
        salt,
    } = options;

    const candidateHash = crypto.pbkdf2Sync(
        candidatePassword,
        salt,
        1000,
        64,
        'sha512',
    ).toString('hex');

    return hash === candidateHash;
}
