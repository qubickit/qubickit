type Encoding = 'base64' | 'hex' | 'utf8';

export function decodePayload(value: string | undefined, encoding: Encoding = 'base64'): Uint8Array | undefined {
  if (!value) return undefined;
  switch (encoding) {
    case 'hex':
      return Buffer.from(value.startsWith('0x') ? value.slice(2) : value, 'hex');
    case 'utf8':
      return Buffer.from(value, 'utf8');
    case 'base64':
    default:
      return Buffer.from(value, 'base64');
  }
}

export function encodePayload(buffer: Uint8Array, encoding: Encoding = 'base64'): string {
  return Buffer.from(buffer).toString(encoding);
}
