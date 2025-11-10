import { describe, expect, it, vi } from 'vitest';

import { WalletManager } from './manager';

vi.mock('@qubickit/core', () => ({
  createIdentityPackage: vi.fn(async (_seed: string, index: number = 0) => {
    const base = new Uint8Array(32).fill(index);
    return {
      privateKey: base,
      publicKey: base,
      publicKeyWithChecksum: new Uint8Array(36).fill(index),
      identity: `IDENTITY-${index}`
    };
  })
}));

const seed = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyabcd';
const passphrase = 'correct horse battery staple';

describe('WalletManager', () => {
  it('creates profiles, unlocks seeds, and derives accounts', async () => {
    const manager = new WalletManager();
    const profile = await manager.createProfile({
      seed,
      passphrase,
      label: 'Primary'
    });

    expect(profile.profileId).toBeDefined();
    expect(profile.accounts).toHaveLength(1);

    const unlocked = await manager.unlockSeed(profile.profileId, passphrase);
    expect(unlocked).toBe(seed);

    const secondAccount = await manager.addAccount({
      profileId: profile.profileId,
      passphrase,
      derivationIndex: 1,
      label: 'Secondary'
    });

    expect(secondAccount.derivationIndex).toBe(1);

    const storedProfile = await manager.getProfile(profile.profileId);
    expect(storedProfile?.accounts).toHaveLength(2);
  });

  it('issues and resumes session tokens', async () => {
    const manager = new WalletManager({ sessionTtlMs: 1000 });
    const profile = await manager.createProfile({ seed, passphrase });
    const session = await manager.issueSessionToken({
      profileId: profile.profileId,
      passphrase
    });

    expect(session.token).toBeDefined();

    const resumed = await manager.resumeSession(session.token);
    expect(resumed.account.accountId).toBe(profile.accounts[0]?.accountId);
    expect(resumed.identityPackage.identity).toBe(profile.accounts[0]?.identity);

    manager.invalidateSession(session.token);
    await expect(manager.resumeSession(session.token)).rejects.toThrow(/invalid/i);
  });

  it('updates profile labels and metadata', async () => {
    const manager = new WalletManager();
    const profile = await manager.createProfile({ seed, passphrase, metadata: { env: 'dev' } });

    await manager.updateProfile({
      profileId: profile.profileId,
      label: 'Renamed',
      metadata: { region: 'eu' }
    });

    const renamed = await manager.getProfile(profile.profileId);
    expect(renamed?.label).toBe('Renamed');
    expect(renamed?.metadata).toEqual({ env: 'dev', region: 'eu' });

    await manager.updateProfile({
      profileId: profile.profileId,
      metadata: { env: 'prod' },
      mergeMetadata: false
    });

    const replaced = await manager.getProfile(profile.profileId);
    expect(replaced?.metadata).toEqual({ env: 'prod' });
  });
});
