const hasTextEncoder = typeof TextEncoder !== 'undefined';
const hasTextDecoder = typeof TextDecoder !== 'undefined';

export const stringToBytes = (value: string): Uint8Array => {
  if (hasTextEncoder) {
    return new TextEncoder().encode(value);
  }
  if (typeof Buffer !== 'undefined') {
    return new Uint8Array(Buffer.from(value, 'utf8'));
  }
  const bytes = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i += 1) {
    bytes[i] = value.charCodeAt(i)!;
  }
  return bytes;
};

export const bytesToString = (value: Uint8Array): string => {
  if (hasTextDecoder) {
    return new TextDecoder().decode(value);
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value).toString('utf8');
  }
  return Array.from(value)
    .map((byte) => String.fromCharCode(byte))
    .join('');
};

export const bytesToHex = (bytes: Uint8Array): string => {
  let hex = '';
  for (let i = 0; i < bytes.length; i += 1) {
    hex += bytes[i]!.toString(16).padStart(2, '0');
  }
  return hex;
};

export const hexToBytes = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0) {
    throw new Error('Hex string must have even length');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
};
