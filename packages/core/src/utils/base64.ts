export type Base64Input = Uint8Array | string;

const isHexString = (value: string) => /^0x[0-9a-f]+$/i.test(value);

const normalizeStringToBytes = (value: string): Uint8Array => {
  if (isHexString(value)) {
    return new Uint8Array(Buffer.from(value.slice(2), 'hex'));
  }
  return new Uint8Array(Buffer.from(value, 'utf8'));
};

export const toBase64 = (value: Base64Input): string => {
  if (typeof value === 'string') {
    return Buffer.from(normalizeStringToBytes(value)).toString('base64');
  }
  return Buffer.from(value).toString('base64');
};

export const fromBase64 = (value: string): Uint8Array => {
  return new Uint8Array(Buffer.from(value, 'base64'));
};
