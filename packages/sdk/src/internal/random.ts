import { randomUUID as nodeRandomUUID } from 'node:crypto';

export const randomUUID = () => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return nodeRandomUUID();
};
