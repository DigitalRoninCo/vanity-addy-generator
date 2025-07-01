jest.mock('@solana/web3.js', () => {
  return {
    Connection: jest.fn().mockImplementation(() => ({
      getTransaction: jest.fn(async (id) => `tx:${id}`)
    }))
  };
}, { virtual: true });

const { verifyProof } = require('../compliance/proofs/verifier');

describe('verifyProof', () => {
  it('verifies matching proof', async () => {
    const proof = { txData: 'tx:abc', pdf: 'PDF:tx:abc' };
    await expect(verifyProof('abc', proof)).resolves.toBe(true);
  });

  it('rejects mismatched proof', async () => {
    const proof = { txData: 'tx:wrong', pdf: 'PDF:tx:wrong' };
    await expect(verifyProof('abc', proof)).resolves.toBe(false);
  });
});
