import crypto from 'crypto';

export function generateHash(data: string, algorithm: string = 'sha256'): string {
  return crypto.createHash(algorithm).update(data).digest('hex');
}

export function generateRandomString(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex').substring(0, length);
}

export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('base64url');
}

export function hashPassword(password: string, salt: string = generateRandomString(16)): {
  hash: string;
  salt: string;
} {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

export function verifyPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const { hash: newHash } = hashPassword(password, salt);
  return newHash === hash;
}
