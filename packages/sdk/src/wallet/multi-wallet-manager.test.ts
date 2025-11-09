import { describe, expect, it, vi } from 'vitest';

import { WalletManager } from './manager';
import { MultiWalletManager } from './multi-wallet-manager';

vi.mock('@qubickit/core', () => ({
  createIdentityPackage: vi.fn(async (_seed: string, index: number = 0) => ({
    privateKey: new Uint8Array(32).fill(index),
    publicKey: new Uint8Array(32).fill(index),
    publicKeyWithChecksum: new Uint8Array(36).fill(index),
    identity: `IDENTITY-${index}`
  }))
}));

const seed = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyabcd';
const passphrase = 'multitest';

describe('MultiWalletManager', () => {
  it('enforces shared limits', async () => {
    const manager = new WalletManager();
    const multi = new MultiWalletManager(manager);
    const profile = await multi.createProfile({ seed, passphrase, label: 'shared' });
    multi.setLimit({ profileId: profile.profileId, maxTransfersPerMinute: 1 });
    multi.enforceLimit(profile.profileId);
    expect(() => multi.enforceLimit(profile.profileId)).toThrow(/limit/i);
  });

  it('removes profiles and limits together', async () => {
    const manager = new WalletManager();
    const multi = new MultiWalletManager(manager);
    const profile = await multi.createProfile({ seed, passphrase, label: 'temp' });
    await multi.removeProfile(profile.profileId);
    await expect(manager.getProfile(profile.profileId)).resolves.toBeUndefined();
  });
});
