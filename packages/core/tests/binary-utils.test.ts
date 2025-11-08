import { describe, expect, it } from 'bun:test';
import { BinaryReader, BinaryWriter } from '../src/utils/binary';
import { bytesToHex256, hexToBytes256 } from '../src/utils/hex';
import { ipToUint32, uint32ToIp } from '../src/utils/ipv4';

describe('Binary utilities', () => {
  it('reads and writes numbers', () => {
    const writer = new BinaryWriter();
    writer.writeUint8(1);
    writer.writeUint16(0x0203);
    writer.writeUint24(0x040506);
    writer.writeUint32(0x0708090a);
    writer.writeBigUint64(0x0bn);
    const buffer = writer.toUint8Array();
    const reader = new BinaryReader(buffer);
    expect(reader.readUint8()).toBe(1);
    expect(reader.readUint16()).toBe(0x0203);
    expect(reader.readUint24()).toBe(0x040506);
    expect(reader.readUint32()).toBe(0x0708090a);
    expect(reader.readBigUint64()).toBe(0x0bn);
  });

  it('converts hex256', () => {
    const bytes = new Uint8Array(32).fill(1);
    const hex = bytesToHex256(bytes);
    expect(hex.length).toBe(64);
    expect(hexToBytes256(hex)).toHaveLength(32);
  });

  it('converts ipv4', () => {
    const num = ipToUint32('127.0.0.1');
    expect(uint32ToIp(num)).toBe('127.0.0.1');
  });
});
