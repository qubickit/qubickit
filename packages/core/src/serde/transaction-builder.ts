import cryptoPromise, { DIGEST_LENGTH, SIGNATURE_LENGTH } from '../vendor/crypto/index.js';
import { createIdentityPackage, identityToPublicKey, type IdentityPackage } from '../wallet/identity';
import { normalizeAmount } from '../utils/amount';
import { identitySchema } from '../models/shared-schemas';
import { toBase64 } from '../utils/base64';

export interface TransactionDraft {
  sourceSeed: string;
  destinationId: string;
  amount: string | number | bigint;
  tickNumber?: number;
  inputType?: number;
  input?: Uint8Array;
  timeLock?: Uint8Array;
  varStruct?: Uint8Array;
}

export interface NetworkMetadata {
  tickNumber: number;
  timeLock?: Uint8Array;
  varStruct?: Uint8Array;
}

export interface SignedTransaction {
  txId: string;
  encoded: string;
  bytes: Uint8Array;
  unsignedBytes: Uint8Array;
  timeLock?: Uint8Array;
  varStruct?: Uint8Array;
}

export const attachNetworkMetadata = (draft: TransactionDraft, metadata: NetworkMetadata): TransactionDraft => ({
  ...draft,
  tickNumber: draft.tickNumber ?? metadata.tickNumber,
  timeLock: metadata.timeLock ?? draft.timeLock,
  varStruct: metadata.varStruct ?? draft.varStruct
});

const ensureTickNumber = (draft: TransactionDraft): TransactionDraft & { tickNumber: number } => {
  if (draft.tickNumber === undefined) throw new Error('tickNumber is required');
  return draft as TransactionDraft & { tickNumber: number };
};

export const createTransactionDraft = async (
  draft: TransactionDraft,
  metadata?: NetworkMetadata
): Promise<SignedTransaction> => {
  identitySchema.parse(draft.destinationId);
  const withMetadata = metadata ? attachNetworkMetadata(draft, metadata) : draft;
  const prepared = ensureTickNumber(withMetadata);

  const normalizedAmount = normalizeAmount(prepared.amount);
  const identity = await createIdentityPackage(draft.sourceSeed);
  const destinationPublicKey = identityToPublicKey(prepared.destinationId);
  const input = prepared.input ?? new Uint8Array();
  const unsignedBytes = buildUnsignedTransaction({
    sourcePublicKey: identity.publicKey,
    destinationPublicKey,
    amount: BigInt(normalizedAmount),
    tick: prepared.tickNumber,
    inputType: prepared.inputType ?? 0,
    input
  });

  const { signedBytes } = await signTransaction(identity, unsignedBytes);
  const { txId, encoded } = encodeSignedTransaction(unsignedBytes, signedBytes);

  return {
    txId,
    encoded,
    bytes: signedBytes,
    unsignedBytes,
    timeLock: prepared.timeLock,
    varStruct: prepared.varStruct
  };
};

export interface UnsignedTransactionInput {
  sourcePublicKey: Uint8Array;
  destinationPublicKey: Uint8Array;
  amount: bigint;
  tick: number;
  inputType: number;
  input: Uint8Array;
}

export const buildUnsignedTransaction = (tx: UnsignedTransactionInput): Uint8Array => {
  const baseLength = 32 + 32 + 8 + 4 + 2 + 2;
  const buffer = new Uint8Array(baseLength + tx.input.length);
  let offset = 0;

  buffer.set(tx.sourcePublicKey.subarray(0, 32), offset);
  offset += 32;
  buffer.set(tx.destinationPublicKey.subarray(0, 32), offset);
  offset += 32;

  const dataView = new DataView(buffer.buffer);
  dataView.setBigUint64(offset, tx.amount, true);
  offset += 8;

  dataView.setUint32(offset, tx.tick, true);
  offset += 4;

  dataView.setUint16(offset, tx.inputType, true);
  offset += 2;

  dataView.setUint16(offset, tx.input.length, true);
  offset += 2;

  buffer.set(tx.input, offset);

  return buffer;
};

export const signTransaction = async (identity: IdentityPackage, unsignedBytes: Uint8Array) => {
  const crypto = await cryptoPromise;
  const digest = new Uint8Array(DIGEST_LENGTH);
  crypto.K12(unsignedBytes, digest, DIGEST_LENGTH);
  const signature = crypto.schnorrq.sign(identity.privateKey, identity.publicKeyWithChecksum, digest);
  const signedBytes = new Uint8Array(unsignedBytes.length + SIGNATURE_LENGTH);
  signedBytes.set(unsignedBytes);
  signedBytes.set(signature, unsignedBytes.length);
  return { signedBytes, signature };
};

export const encodeSignedTransaction = (unsignedBytes: Uint8Array, signedBytes: Uint8Array) => {
  const txId = Buffer.from(unsignedBytes).toString('hex');
  const encoded = toBase64(signedBytes);
  return { txId, encoded };
};
