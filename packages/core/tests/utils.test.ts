import { describe, expect, it } from 'bun:test';
import { normalizeAmount } from '../src/utils/amount';
import { parseTickRange } from '../src/utils/ticks';
import { createIdentityPackage, identityToPublicKey, publicKeyToIdentity } from '../src/wallet/identity';

describe('Utils', () => {
  it('normalizes amount', () => {
    expect(normalizeAmount(10n)).toBe('10');
    expect(normalizeAmount(5)).toBe('5');
    expect(normalizeAmount('15')).toBe('15');
  });

  it('throws for invalid amount inputs', () => {
    expect(() => normalizeAmount(Number.POSITIVE_INFINITY)).toThrow('finite');
    expect(() => normalizeAmount('abc')).toThrow('integer');
  });

  it('validates tick range', () => {
    expect(parseTickRange({ from: 1, to: 5 })).toEqual({ from: 1, to: 5 });
  });

  it('rejects invalid tick ranges', () => {
    expect(() => parseTickRange({ from: 5, to: 3 })).toThrow('greater than or equal');
  });

  it('creates deterministic identity package', async () => {
    const seed = 'a'.repeat(55);
    const pkg = await createIdentityPackage(seed);
    const rebuilt = await publicKeyToIdentity(identityToPublicKey(pkg.identity));
    expect(rebuilt).toMatch(/^[A-Z]{60}$/);
  });
});
