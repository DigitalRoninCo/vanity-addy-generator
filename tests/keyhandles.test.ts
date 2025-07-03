import {
  storeKeyHandle,
  getKeyHandle,
  removeKeyHandle,
  listKeyHandles,
  clearKeyHandles
} from '../compliance/keyhandles';

describe('keyhandle store', () => {
  beforeEach(() => clearKeyHandles());

  it('stores and retrieves a handle', () => {
    storeKeyHandle('user1', 'handle1');
    expect(getKeyHandle('user1')).toBe('handle1');
  });

  it('removes a handle', () => {
    storeKeyHandle('user2', 'handle2');
    expect(removeKeyHandle('user2')).toBe(true);
    expect(getKeyHandle('user2')).toBeUndefined();
  });

  it('lists all handles', () => {
    storeKeyHandle('u1', 'h1');
    storeKeyHandle('u2', 'h2');
    expect(listKeyHandles()).toEqual([
      { userId: 'u1', handle: 'h1' },
      { userId: 'u2', handle: 'h2' }
    ]);
  });
});
