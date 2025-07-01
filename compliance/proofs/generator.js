// Simple proof generator stub. In a real implementation this would fetch the
// transaction from the Solana RPC and render a PDF. To keep the project
// lightweight we simply mock out those parts.
const { Connection } = require('@solana/web3.js');

async function generatePDF(tx) {
  // Pretend we generated a PDF from the transaction data.
  return `PDF:${tx}`;
}

async function generateProof(txId) {
  const conn = new Connection(process.env.SOLANA_RPC || '');
  const tx = await conn.getTransaction(txId);
  return {
    txData: tx,
    pdf: await generatePDF(tx)
  };
}

module.exports = { generateProof, generatePDF };
