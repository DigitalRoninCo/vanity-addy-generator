const { Connection } = require('@solana/web3.js');

const DEFAULT_RPC = 'https://api.mainnet-beta.solana.com';

/**
 * Verify that the supplied proof matches on-chain transaction data.
 * This simplistic implementation fetches the transaction and checks
 * that the provided PDF was generated from that data using the same
 * logic as the proof generator.
 *
 * @param {string} txId Transaction signature to validate
 * @param {{txData: any, pdf: string}} proof Proof object produced by generateProof
 * @returns {Promise<boolean>} True if the proof matches the transaction
 */
async function verifyProof(txId, proof) {
  const rpc = process.env.SOLANA_RPC || DEFAULT_RPC;
  const conn = new Connection(rpc);
  const tx = await conn.getTransaction(txId);
  if (!tx) {
    throw new Error('Transaction not found');
  }
  return proof.txData === tx && proof.pdf === `PDF:${tx}`;
}

module.exports = { verifyProof };
