export interface KeyHandleRecord {
  userId: string;
  handle: string;
}

const keyHandles = new Map<string, string>();

export function storeKeyHandle(userId: string, handle: string): void {
  keyHandles.set(userId, handle);
}

export function getKeyHandle(userId: string): string | undefined {
  return keyHandles.get(userId);
}

export function removeKeyHandle(userId: string): boolean {
  return keyHandles.delete(userId);
}

export function listKeyHandles(): KeyHandleRecord[] {
  return Array.from(keyHandles.entries()).map(([userId, handle]) => ({ userId, handle }));
}

export function clearKeyHandles(): void {
  keyHandles.clear();
}
