import { describe, expect, it } from 'bun:test';
import {
  createIdentityPackage,
  identityToPublicKey,
  publicKeyToIdentity,
  validateSeed,
  seedToBytes,
  verifyIdentity
} from '../src/wallet/identity';

describe('Identity derivation', () => {
  it('matches known vector', async () => {
    const pkg = await createIdentityPackage('kxfamhgykfquqlquzuokgknkaswfcrxrfpogcoekcepiadlrftjmqxw');
    expect(pkg.identity).toBe('QOTXPTOMQFHEFEZBKYCNFTOZTTDCATGCGCZPBAHPHGNTUGEKYIQOVTRCDQKB');
  });

  it('validates seed shape', () => {
    expect(validateSeed('a'.repeat(55))).toBe('a'.repeat(55));
    expect(() => validateSeed('A'.repeat(55))).toThrow('lowercase');
    expect(() => validateSeed('a'.repeat(54))).toThrow('55');
  });

  it('converts seeds to bytes deterministically', () => {
    const seed = 'abc' + 'a'.repeat(52);
    const bytes = seedToBytes(seed);
    expect(bytes.length).toBe(55);
    expect(bytes[0]).toBe(0);
    expect(bytes[1]).toBe(1);
    expect(bytes[2]).toBe(2);
  });

  it('roundtrips identities through public keys', async () => {
    const identity = 'QOTXPTOMQFHEFEZBKYCNFTOZTTDCATGCGCZPBAHPHGNTUGEKYIQOVTRCDQKB';
    const publicKey = identityToPublicKey(identity);
    const rebuilt = await publicKeyToIdentity(publicKey);
    expect(rebuilt).toBe(identity);
    await expect(verifyIdentity(identity)).resolves.toBe(true);
  });

  it('rejects invalid identity strings', () => {
    expect(() => identityToPublicKey('abc')).toThrow('60 uppercase');
  });
});
