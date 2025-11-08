import { BinaryWriter } from '../utils/binary';
import { identityToPublicKey } from '../wallet/identity';
import { normalizeAmount } from '../utils/amount';
import { identitySchema } from '../models/shared-schemas';

export interface SendManyOutput {
  destinationId: string;
  amount: string | number | bigint;
}

export const buildSendManyPayload = async (outputs: SendManyOutput[]): Promise<Uint8Array> => {
  if (!outputs.length) throw new Error('outputs required');
  const writer = new BinaryWriter();
  for (const output of outputs) {
    identitySchema.parse(output.destinationId);
    const publicKey = identityToPublicKey(output.destinationId);
    writer.writeBytes(publicKey);
    writer.writeBigUint64(BigInt(normalizeAmount(output.amount)));
  }
  return writer.toUint8Array();
};
