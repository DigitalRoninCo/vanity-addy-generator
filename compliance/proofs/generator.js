const { Connection } = require('@solana/web3.js');

async function generateProof(txId) {
  const conn = new Connection(process.env.SOLANA_RPC);
  const tx = await conn.getTransaction(txId);
  return {
    txData: tx,
    pdf: await generatePDF(tx) 
  };
}