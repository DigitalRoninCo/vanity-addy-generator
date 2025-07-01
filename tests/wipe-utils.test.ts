jest.mock('@project-serum/anchor', () => {
  const rpc = jest.fn(async () => 'mock-tx');
  return {
    AnchorProvider: {
      env: jest.fn(() => ({ wallet: { publicKey: 'pk' } }))
    },
    web3: { PublicKey: jest.fn((v: string) => v) },
    Program: jest.fn().mockImplementation(() => ({
      methods: {
        storeWipeProof: jest.fn().mockReturnValue({
          accounts: jest.fn().mockReturnValue({ rpc })
        })
      }
    })),
    setProvider: jest.fn()
  };
}, { virtual: true });

import { initiateWipe } from '../app/lib/wipe-utils';
import * as anchor from '@project-serum/anchor';

describe('initiateWipe', () => {
  it('invokes the anchor program and returns signature', async () => {
    const result = await initiateWipe('user1');
    expect(result).toEqual({ txSignature: 'mock-tx' });

    expect(anchor.AnchorProvider.env).toHaveBeenCalled();
    expect(anchor.setProvider).toHaveBeenCalled();
    expect((anchor.Program as unknown as jest.Mock)).toHaveBeenCalled();
  });
});
