import { describe, expect, it } from 'bun:test';
import { attachNetworkMetadata, createTransactionDraft } from '../src/serde/transaction-builder';

describe('TransactionBuilder', () => {
  it('creates encoded draft', async () => {
    const result = await createTransactionDraft({
      sourceSeed: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      destinationId: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGH',
      amount: 10n,
      input: new Uint8Array([1, 2, 3])
    }, { tickNumber: 1 });

    expect(result.txId).toBeTruthy();
    expect(result.encoded).toBeTruthy();
  });

  it('requires tick number', async () => {
    await expect(
      createTransactionDraft({
        sourceSeed: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        destinationId: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGH',
        amount: 1n,
        tickNumber: undefined as unknown as number
      })
    ).rejects.toThrow('tickNumber is required');
  });

  it('validates destination identity', async () => {
    await expect(
      createTransactionDraft({
        sourceSeed: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        destinationId: 'invalid',
        amount: 1n,
        tickNumber: 1
      })
    ).rejects.toThrow('Identity must be 60 uppercase characters');
  });
});

describe('attachNetworkMetadata', () => {
  it('fills missing tick from metadata', async () => {
    const draft = attachNetworkMetadata(
      {
        sourceSeed: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        destinationId: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGH',
        amount: 1n
      },
      { tickNumber: 5, timeLock: new Uint8Array([1, 2]) }
    );

    expect(draft.tickNumber).toBe(5);
    expect(draft.timeLock).toBeInstanceOf(Uint8Array);
  });
});
