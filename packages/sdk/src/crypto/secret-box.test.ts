import { describe, expect, it } from 'vitest';

import { decryptSecretAsString, encryptSecret } from './secret-box';

describe('secret-box', () => {
  it('encrypts and decrypts secrets', async () => {
    const payload = await encryptSecret('hunter2', 'super-secret');
    await expect(decryptSecretAsString('hunter2', payload)).resolves.toBe('super-secret');
  });

  it('fails to decrypt with incorrect passphrase', async () => {
    const payload = await encryptSecret('correct', 'value');
    await expect(decryptSecretAsString('wrong', payload)).rejects.toThrow();
  });
});
