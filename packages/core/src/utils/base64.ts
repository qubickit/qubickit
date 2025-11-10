import { stringToBytes, hexToBytes } from "./encoding";

export type Base64Input = Uint8Array | string;

const isHexString = (value: string) => /^0x[0-9a-f]+$/i.test(value);

const normalizeStringToBytes = (value: string): Uint8Array => {
  if (isHexString(value)) {
    return hexToBytes(value.slice(2));
  }
  return stringToBytes(value);
};

export const toBase64 = (value: Base64Input): string => {
  const bytes =
    typeof value === "string" ? normalizeStringToBytes(value) : value;
  return bytesToBase64(bytes);
};

export const fromBase64 = (value: string): Uint8Array => {
  return base64ToBytes(value);
};

export const bytesToBase64 = (bytes: Uint8Array): string => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary);
};

export const base64ToBytes = (value: string): Uint8Array => {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(value, "base64"));
  }
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)!;
  }
  return bytes;
};
