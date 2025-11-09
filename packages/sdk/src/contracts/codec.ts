import { fromBase64, identityToPublicKey, publicKeyToIdentity } from '@qubickit/core';

import {
  STRUCT_LAYOUTS,
  type StructFromName,
  type StructLayoutField,
  type StructWireType
} from './generated';

type StructPayload = string | Uint8Array;

const IDENTITY_BYTE_LENGTH = 32;
const BURN_IDENTITY = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFXIB';

class StructBinaryReader {
  private readonly view: DataView;
  private offset = 0;

  constructor(private readonly buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  readUint8() {
    this.ensure(1);
    return this.buffer[this.offset++]!;
  }

  readInt8() {
    const value = this.readUint8();
    return (value << 24) >> 24;
  }

  readUint16() {
    this.ensure(2);
    const value = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return value;
  }

  readInt16() {
    this.ensure(2);
    const value = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return value;
  }

  readUint32() {
    this.ensure(4);
    const value = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return value >>> 0;
  }

  readInt32() {
    this.ensure(4);
    const value = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  readBigUint64() {
    this.ensure(8);
    const value = this.view.getBigUint64(this.offset, true);
    this.offset += 8;
    return value;
  }

  readBigInt64() {
    this.ensure(8);
    const value = this.view.getBigInt64(this.offset, true);
    this.offset += 8;
    return value;
  }

  readBytes(length: number) {
    this.ensure(length);
    const slice = this.buffer.subarray(this.offset, this.offset + length);
    this.offset += length;
    return slice;
  }

  remaining() {
    return this.buffer.length - this.offset;
  }

  private ensure(length: number) {
    if (this.offset + length > this.buffer.length) {
      throw new RangeError('StructBinaryReader out of range');
    }
  }
}

class StructBinaryWriter {
  private readonly chunks: Uint8Array[] = [];

  writeUint8(value: number) {
    const chunk = new Uint8Array(1);
    new DataView(chunk.buffer).setUint8(0, value & 0xff);
    this.push(chunk);
  }

  writeInt8(value: number) {
    const chunk = new Uint8Array(1);
    new DataView(chunk.buffer).setInt8(0, value);
    this.push(chunk);
  }

  writeUint16(value: number) {
    const chunk = new Uint8Array(2);
    new DataView(chunk.buffer).setUint16(0, value, true);
    this.push(chunk);
  }

  writeInt16(value: number) {
    const chunk = new Uint8Array(2);
    new DataView(chunk.buffer).setInt16(0, value, true);
    this.push(chunk);
  }

  writeUint32(value: number) {
    const chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value >>> 0, true);
    this.push(chunk);
  }

  writeInt32(value: number) {
    const chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value | 0, true);
    this.push(chunk);
  }

  writeBigUint64(value: bigint) {
    const chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setBigUint64(0, value, true);
    this.push(chunk);
  }

  writeBigInt64(value: bigint) {
    const chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setBigInt64(0, value, true);
    this.push(chunk);
  }

  writeBytes(bytes: Uint8Array) {
    this.push(bytes);
  }

  toUint8Array() {
    const total = this.chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const chunk of this.chunks) {
      merged.set(chunk, offset);
      offset += chunk.length;
    }
    return merged;
  }

  private push(chunk: Uint8Array) {
    this.chunks.push(chunk);
  }
}

export class StructDecodingError extends Error {}

export class StructEncodingError extends Error {}

export const decodeStructPayload = async <TName extends keyof typeof STRUCT_LAYOUTS>(
  structName: TName,
  payload: StructPayload
): Promise<StructFromName<TName>> => {
  const reader = new StructBinaryReader(normalizePayload(payload));
  const result = await decodeStructByName(structName, reader);
  return result as StructFromName<TName>;
};

export const decodeStructPayloadByName = async (structName: string, payload: StructPayload) => {
  return decodeStructPayload(structName as keyof typeof STRUCT_LAYOUTS, payload);
};

const decodeStructByName = async (structName: string, reader: StructBinaryReader) => {
  const layout = STRUCT_LAYOUTS[structName as keyof typeof STRUCT_LAYOUTS];
  if (!layout) throw new StructDecodingError(`Struct layout for ${structName} not found.`);
  const result: Record<string, unknown> = {};
  for (const field of layout) {
    result[field.name] = await decodeField(reader, field);
  }
  return result;
};

const normalizePayload = (payload: StructPayload): Uint8Array => {
  if (payload instanceof Uint8Array) {
    return payload;
  }
  return fromBase64(payload);
};

const decodeField = async (reader: StructBinaryReader, field: StructLayoutField) => {
  switch (field.wireType) {
    case 'struct':
      if (!field.structName) throw new StructDecodingError(`Struct field ${field.name} is missing structName metadata.`);
      return decodeStructByName(field.structName, reader);
    case 'array':
      if (typeof field.length !== 'number') {
        throw new StructDecodingError(`Array field ${field.name} is missing length metadata.`);
      }
      if (!field.elementType) {
        throw new StructDecodingError(`Array field ${field.name} is missing elementType metadata.`);
      }
      return decodeArrayField(reader, field);
    case 'uint8':
    case 'sint8':
    case 'uint16':
    case 'sint16':
    case 'uint32':
    case 'sint32':
    case 'uint64':
    case 'sint64':
    case 'string':
    case 'asset':
      return decodePrimitiveField(reader, field as PrimitiveStructField);
    case 'unknown':
      throw new StructDecodingError(
        `Unsupported field ${field.name} with wireType=${field.wireType}. Update the generator mapping.`
      );
    default:
      return assertNever(field.wireType);
  }
};

const decodeIdentity = async (bytes: Uint8Array): Promise<string> => {
  return publicKeyToIdentity(bytes);
};

type PrimitiveStructField = StructLayoutField & { wireType: Exclude<StructWireType, 'struct' | 'array'> };

const decodePrimitiveField = async (reader: StructBinaryReader, field: PrimitiveStructField) => {
  switch (field.wireType) {
    case 'uint8':
      return reader.readUint8();
    case 'sint8':
      return reader.readInt8();
    case 'uint16':
      return reader.readUint16();
    case 'sint16':
      return reader.readInt16();
    case 'uint32':
      return reader.readUint32();
    case 'sint32':
      return reader.readInt32();
    case 'uint64': {
      const value = reader.readBigUint64();
      if (isAssetNameField(field.name)) {
        return decodeAssetNameLiteral(value) ?? value;
      }
      return value;
    }
    case 'sint64':
      return reader.readBigInt64();
    case 'string':
      return decodeIdentity(reader.readBytes(IDENTITY_BYTE_LENGTH));
    case 'asset':
      return decodeAssetField(reader);
    case 'unknown':
    default:
      throw new StructDecodingError(`Unsupported primitive wire type: ${field.wireType}`);
  }
};

const decodeArrayField = async (reader: StructBinaryReader, field: StructLayoutField) => {
  const result: unknown[] = [];
  let identityFieldName: string | undefined;
  for (let index = 0; index < (field.length ?? 0); index++) {
    if (field.elementType === 'struct') {
      if (!field.elementStructName) {
        throw new StructDecodingError(`Array field ${field.name} element struct missing name metadata.`);
      }
      const decoded = await decodeStructByName(field.elementStructName, reader);
      if (!identityFieldName) {
        identityFieldName = inferIdentityFieldName(field.elementStructName);
      }
      result.push(decoded);
    } else if (field.elementType && field.elementType !== 'array') {
      result.push(
        await decodePrimitiveField(reader, {
          name: `${field.name}[${index}]`,
          wireType: field.elementType
        } as PrimitiveStructField)
      );
    } else {
      throw new StructDecodingError(`Unsupported element type for array field ${field.name}.`);
    }
  }
  if (identityFieldName) {
    return trimTrailingBurnEntries(result, identityFieldName);
  }
  return result;
};

const inferIdentityFieldName = (structName: string): string | undefined => {
  const layout = STRUCT_LAYOUTS[structName as keyof typeof STRUCT_LAYOUTS];
  if (!layout) return undefined;
  const identityField = layout.find(
    (field) => field.name === 'issuer' || field.name === 'entity' || field.name === 'newOwnerAndPossessor'
  );
  return identityField?.name;
};

const trimTrailingBurnEntries = (entries: unknown[], fieldName: string) => {
  let index = entries.length;
  while (index > 0) {
    const candidate = entries[index - 1];
    if (isBurnEntry(candidate, fieldName)) {
      index--;
      continue;
    }
    break;
  }
  return entries.slice(0, index);
};

const isBurnEntry = (entry: unknown, fieldName: string): boolean => {
  if (!entry || typeof entry !== 'object') return false;
  const identity = (entry as Record<string, unknown>)[fieldName];
  return typeof identity === 'string' && identity === BURN_IDENTITY;
};

const isAssetNameField = (name?: string) => (name ?? '').toLowerCase().includes('assetname');

const decodeAssetField = async (reader: StructBinaryReader) => {
  const issuer = await decodeIdentity(reader.readBytes(IDENTITY_BYTE_LENGTH));
  const assetNameRaw = reader.readBigUint64();
  return {
    issuer,
    assetName: decodeAssetNameLiteral(assetNameRaw) ?? assetNameRaw
  };
};

const decodeAssetNameLiteral = (value: bigint): string | null => {
  let remaining = value;
  const chars: string[] = [];
  for (let i = 0; i < 8; i++) {
    const code = Number(remaining & 0xffn);
    remaining >>= 8n;
    if (code === 0) break;
    if (!isPrintableAssetChar(code)) {
      return null;
    }
    chars.push(String.fromCharCode(code));
  }
  if (!chars.length) return null;
  return chars.join('');
};

const isPrintableAssetChar = (code: number) => {
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    code === 95 || // _
    code === 45 // -
  );
};

export const encodeStructPayload = async <TName extends keyof typeof STRUCT_LAYOUTS>(
  structName: TName,
  data: StructFromName<TName> | Record<string, unknown>
): Promise<Uint8Array> => {
  const layout = STRUCT_LAYOUTS[structName];
  if (!layout) throw new StructEncodingError(`Struct layout for ${structName} not found.`);
  const writer = new StructBinaryWriter();
  for (const field of layout) {
    const value = (data as Record<string, unknown>)[field.name];
    if (value === undefined || value === null) {
      throw new StructEncodingError(`Missing value for field ${field.name} on struct ${String(structName)}.`);
    }
    encodeField(writer, field, value);
  }
  return writer.toUint8Array();
};

export const encodeStructPayloadByName = async (structName: string, data: Record<string, unknown>) => {
  return encodeStructPayload(structName as keyof typeof STRUCT_LAYOUTS, data);
};

const encodeField = (writer: StructBinaryWriter, field: StructLayoutField, value: unknown) => {
  switch (field.wireType) {
    case 'uint8':
      writer.writeUint8(assertNumber(value, field, false, 8));
      return;
    case 'sint8':
      writer.writeInt8(assertNumber(value, field, true, 8));
      return;
    case 'uint16':
      writer.writeUint16(assertNumber(value, field, false, 16));
      return;
    case 'sint16':
      writer.writeInt16(assertNumber(value, field, true, 16));
      return;
    case 'uint32':
      writer.writeUint32(assertNumber(value, field, false, 32));
      return;
    case 'sint32':
      writer.writeInt32(assertNumber(value, field, true, 32));
      return;
    case 'uint64':
      writer.writeBigUint64(assertBigInt(value, field.name, false));
      return;
    case 'sint64':
      writer.writeBigInt64(assertBigInt(value, field.name, true));
      return;
    case 'string':
      writer.writeBytes(encodeIdentityField(value, field.name));
      return;
    case 'asset': {
      const { issuer, assetName } = encodeAssetField(value, field);
      writer.writeBytes(issuer);
      writer.writeBigUint64(assetName);
      return;
    }
    case 'unknown':
      throw new StructEncodingError(
        `Unsupported field ${field.name} with wireType=${field.wireType}. Update the generator mapping.`
      );
    default:
      assertNever(field.wireType);
  }
};

const assertNumber = (value: unknown, field: StructLayoutField, signed: boolean, bits: number): number => {
  const asNumber = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(asNumber)) {
    throw new StructEncodingError(`Field ${field.name} must be a finite number.`);
  }
  const min = signed ? -(2 ** (bits - 1)) : 0;
  const max = signed ? 2 ** (bits - 1) - 1 : 2 ** bits - 1;
  if (asNumber < min || asNumber > max) {
    throw new StructEncodingError(`Field ${field.name} is out of range for ${signed ? 'signed' : 'unsigned'} ${bits}-bit.`);
  }
  return Math.trunc(asNumber);
};

const assertBigInt = (value: unknown, fieldName: string, signed: boolean): bigint => {
  let bigintValue: bigint;
  if (typeof value === 'bigint') {
    bigintValue = value;
  } else if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new StructEncodingError(`Field ${fieldName} must be finite.`);
    bigintValue = BigInt(Math.trunc(value));
  } else if (typeof value === 'string') {
    try {
      bigintValue = BigInt(value);
    } catch {
      const encoded = maybeEncodeAssetNameString(value, fieldName);
      if (encoded !== undefined) {
        bigintValue = encoded;
      } else {
        throw new StructEncodingError(`Field ${fieldName} must be a valid integer string.`);
      }
    }
  } else {
    throw new StructEncodingError(`Field ${fieldName} must be a bigint, number, or numeric string.`);
  }
  const limit = 2n ** 64n;
  const signedLimit = 2n ** 63n;
  if (signed) {
    if (bigintValue < -signedLimit || bigintValue > signedLimit - 1n) {
      throw new StructEncodingError(`Field ${fieldName} is out of range for signed 64-bit integer.`);
    }
  } else if (bigintValue < 0n || bigintValue >= limit) {
    throw new StructEncodingError(`Field ${fieldName} is out of range for unsigned 64-bit integer.`);
  }
  return bigintValue;
};

const encodeIdentityField = (value: unknown, fieldName: string): Uint8Array => {
  if (typeof value !== 'string') {
    throw new StructEncodingError(`Field ${fieldName} must be an identity string.`);
  }
  return identityToPublicKey(value);
};

const encodeAssetField = (
  value: unknown,
  field: StructLayoutField
): { issuer: Uint8Array; assetName: bigint } => {
  if (!value || typeof value !== 'object') {
    throw new StructEncodingError(`Field ${field.name} must be an object with issuer and assetName.`);
  }
  const issuer = encodeIdentityField((value as { issuer?: string }).issuer, `${field.name}.issuer`);
  const assetName = assertBigInt((value as { assetName?: unknown }).assetName, `${field.name}.assetName`, false);
  return { issuer, assetName };
};

const maybeEncodeAssetNameString = (value: string, fieldName: string): bigint | undefined => {
  if (!/assetname/i.test(fieldName)) return undefined;
  const trimmed = value.trim();
  if (!trimmed) {
    throw new StructEncodingError(`Field ${fieldName} cannot be empty.`);
  }
  if (!/^[A-Za-z0-9_-]{1,8}$/.test(trimmed)) {
    throw new StructEncodingError(
      `Field ${fieldName} must be numeric or an asset name up to 8 ASCII characters (A-Z, 0-9, _, -).`
    );
  }
  const buffer = Buffer.from(trimmed, 'ascii');
  let result = 0n;
  for (let i = 0; i < buffer.length; i++) {
    result |= BigInt(buffer[i]!) << (BigInt(i) * 8n);
  }
  return result;
};

const assertNever = (_wireType: StructWireType): never => {
  throw new StructDecodingError(`Unsupported wire type: ${_wireType as string}`);
};
