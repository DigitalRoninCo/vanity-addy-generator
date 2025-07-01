jest.mock('@solana/web3.js', () => {
  return {
    Connection: jest.fn().mockImplementation(() => ({
      getTransaction: jest.fn(async (id) => `tx:${id}`)
    }))
  };
}, { virtual: true });

const { generateProof } = require('../compliance/proofs/generator');

describe('generateProof', () => {
  it('fetches transaction data and returns proof object', async () => {
    const proof = await generateProof('abc');
    expect(proof).toEqual({ txData: 'tx:abc', pdf: 'PDF:tx:abc' });
  });
});
