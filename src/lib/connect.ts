import { Connection, clusterApiUrl } from '@solana/web3.js';

let connection: Connection | null = null;

export function getConnection(): Connection {
  if (!connection) {
    const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl('devnet');
    connection = new Connection(endpoint);
  }
  return connection;
}
