import { BinaryWriter } from '../utils/binary';

export interface ContractCallOptions {
  procedureIndex: number;
  args?: Uint8Array;
}

export const buildContractCallPayload = (options: ContractCallOptions): Uint8Array => {
  const writer = new BinaryWriter();
  writer.writeUint16(options.procedureIndex);
  if (options.args) writer.writeBytes(options.args);
  return writer.toUint8Array();
};

export interface ContractQueryOptions {
  functionIndex: number;
  args?: Uint8Array;
}

export const buildContractQueryPayload = (options: ContractQueryOptions): Uint8Array => {
  const writer = new BinaryWriter();
  writer.writeUint16(options.functionIndex);
  if (options.args) writer.writeBytes(options.args);
  return writer.toUint8Array();
};
