import { bytesToHex, hexToBytes } from './encoding';

export const bytesToHex256 = (bytes: Uint8Array): string => {
  if (bytes.length !== 32) throw new Error('Expected 32-byte array');
  return bytesToHex(bytes);
};

export const hexToBytes256 = (hex: string): Uint8Array => {
  if (hex.length !== 64 || !/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error('Expected 64-char hex string');
  }
  return hexToBytes(hex);
};
