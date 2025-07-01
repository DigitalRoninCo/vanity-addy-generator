import { initiateWipe } from '../app/lib/wipe-utils';

describe('initiateWipe', () => {
  it('returns a dummy tx signature', async () => {
    const result = await initiateWipe('user1');
    expect(result).toEqual({ txSignature: 'dummy-signature' });
  });
});
