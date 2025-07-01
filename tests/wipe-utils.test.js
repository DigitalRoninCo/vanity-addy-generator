import { test } from 'node:test';
import assert from 'node:assert';
import { initiateWipe } from '../app/lib/wipe-utils.js';

test('initiateWipe returns tx-like string', async () => {
  const tx = await initiateWipe('user123');
  assert.ok(tx.startsWith('tx-'));
});
