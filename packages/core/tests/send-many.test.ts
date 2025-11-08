import { describe, expect, it } from 'bun:test';
import { buildSendManyPayload } from '../src/serde/send-many-builder';

const identity = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGH';

describe('send many builder', () => {
  it('builds payload', async () => {
    const payload = await buildSendManyPayload([
      { destinationId: identity, amount: 10n },
      { destinationId: identity, amount: 5n }
    ]);
    expect(payload.length).toBe(2 * (32 + 8));
  });

  it('requires at least one output', async () => {
    await expect(buildSendManyPayload([])).rejects.toThrow('outputs required');
  });

  it('validates destination identities', async () => {
    await expect(
      buildSendManyPayload([{ destinationId: 'invalid', amount: 1n }])
    ).rejects.toThrow('Identity must be 60 uppercase characters');
  });
});
