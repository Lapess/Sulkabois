import { EncryptJWT, jwtDecrypt } from "jose";

const secret = new TextEncoder().encode(process.env.ENCRYPTION_SECRET!);

/**
 * Encrypts an arbitrary payload into a compact JWE string
 */
export async function encrypt<T extends object>(
  payload: any,
  expiresIn = "1h",
): Promise<string> {
  return await new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .encrypt(secret);
}

/**
 * Decrypts and validates a JWE string
 * Throws if expired, tampered with, or invalid
 */
export async function decryptAndValidate<T extends object>(
  token: string,
): Promise<T> {
  const { payload } = await jwtDecrypt(token, secret, {
    clockTolerance: "5s",
  });

  return payload as T;
}
