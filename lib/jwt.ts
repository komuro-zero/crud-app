// lib/jwt.ts
import { SignJWT, jwtVerify } from 'jose';

const secretKey = 'secret'; // Use the actual secret key from your environment
const key = new TextEncoder().encode(secretKey);

// Function to encrypt JWT
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Example expiration time
    .sign(key);
}

// Function to decrypt and verify JWT
export async function decrypt(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ['HS256'],
  });
  return payload;
}
