import { BinaryReader, BinaryWriter } from '../utils/binary';
import { timeLockSchema, varStructEntrySchema, varStructSchema } from '../models/transaction-schemas';

export interface TimeLockWindow {
  startTick: number;
  endTick: number;
}

export interface VarStructEntry {
  key: number;
  value: Uint8Array;
}

export type VarStructInputEntry = {
  key: number;
  value: Uint8Array | string;
};

const normalizeValue = (value: Uint8Array | string): Uint8Array => {
  if (typeof value === 'string') {
    if (/^0x[0-9a-f]+$/i.test(value)) {
      return new Uint8Array(Buffer.from(value.slice(2), 'hex'));
    }
    return new Uint8Array(Buffer.from(value, 'utf8'));
  }
  return value;
};

export const serializeTimeLock = (timeLock: TimeLockWindow): Uint8Array => {
  const parsed = timeLockSchema.parse(timeLock);
  const writer = new BinaryWriter();
  writer.writeUint32(parsed.startTick);
  writer.writeUint32(parsed.endTick);
  return writer.toUint8Array();
};

export const deserializeTimeLock = (bytes: Uint8Array): TimeLockWindow => {
  const reader = new BinaryReader(bytes);
  const startTick = reader.readUint32();
  const endTick = reader.readUint32();
  return timeLockSchema.parse({ startTick, endTick });
};

export const serializeVarStruct = (entries: VarStructInputEntry[]): Uint8Array => {
  const parsed = varStructSchema.parse(entries);
  const writer = new BinaryWriter();
  writer.writeUint16(parsed.length);
  for (const entry of parsed) {
    writer.writeUint16(entry.key);
    const value = normalizeValue(entry.value);
    writer.writeUint16(value.length);
    writer.writeBytes(value);
  }
  return writer.toUint8Array();
};

export const deserializeVarStruct = (bytes: Uint8Array): VarStructEntry[] => {
  const reader = new BinaryReader(bytes);
  const count = reader.readUint16();
  const entries: VarStructEntry[] = [];
  for (let i = 0; i < count; i++) {
    const key = reader.readUint16();
    const length = reader.readUint16();
    const value = reader.readBytes(length);
    entries.push(varStructEntrySchema.parse({ key, value }) as VarStructEntry);
  }
  return entries;
};
