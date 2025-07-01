import crypto from 'crypto';

export interface Keypair {
  publicKey: string;
  secretKey: Buffer;
}

/**
 * Generates a random base58 string.
 */
function randomBase58(length: number): string {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += alphabet[bytes[i] % alphabet.length];
  }
  return result;
}

/**
 * Generates vanity Solana keypair with given prefix.
 * This is a mock implementation and does not create real Solana keypairs.
 */
export async function generateVanityKeypair(prefix: string): Promise<Keypair> {
  let publicKey = '';
  while (!publicKey.startsWith(prefix)) {
    publicKey = randomBase58(32);
  }
  return { publicKey, secretKey: crypto.randomBytes(64) };
}
