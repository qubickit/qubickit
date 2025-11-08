import { randomFillSync, webcrypto } from 'node:crypto';

type CryptoLike = typeof webcrypto;

const getCrypto = (): CryptoLike => {
  if (globalThis.crypto) {
    return globalThis.crypto as CryptoLike;
  }
  return webcrypto;
};

const getSubtle = () => getCrypto().subtle;

const getRandomValues = (length: number) => {
  const crypto = getCrypto();
  if (typeof crypto.getRandomValues === 'function') {
    return crypto.getRandomValues(new Uint8Array(length));
  }
  const buffer = new Uint8Array(length);
  randomFillSync(buffer);
  return buffer;
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const encodeBase64 = (bytes: Uint8Array) => Buffer.from(bytes).toString('base64');
const decodeBase64 = (value: string) => new Uint8Array(Buffer.from(value, 'base64'));

export interface EncryptedPayload {
  algorithm: 'AES-GCM';
  ciphertext: string;
  iv: string;
  salt: string;
  iterations: number;
  createdAt: number;
}

export interface EncryptSecretOptions {
  salt?: Uint8Array;
  iv?: Uint8Array;
  iterations?: number;
}

const DEFAULT_ITERATIONS = 100_000;

const deriveKey = async (passphrase: string, salt: Uint8Array, iterations: number) => {
  const subtle = getSubtle();
  const keyMaterial = await subtle.importKey('raw', textEncoder.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

export async function encryptSecret(passphrase: string, secret: string | Uint8Array, options: EncryptSecretOptions = {}) {
  const salt = options.salt ?? getRandomValues(16);
  const iv = options.iv ?? getRandomValues(12);
  const iterations = options.iterations ?? DEFAULT_ITERATIONS;
  const data = typeof secret === 'string' ? textEncoder.encode(secret) : secret;
  const key = await deriveKey(passphrase, salt, iterations);
  const subtle = getSubtle();
  const ciphertext = await subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return {
    algorithm: 'AES-GCM' as const,
    ciphertext: encodeBase64(new Uint8Array(ciphertext)),
    iv: encodeBase64(iv),
    salt: encodeBase64(salt),
    iterations,
    createdAt: Date.now()
  };
}

export async function decryptSecret(passphrase: string, payload: EncryptedPayload): Promise<Uint8Array> {
  const salt = decodeBase64(payload.salt);
  const iv = decodeBase64(payload.iv);
  const ciphertext = decodeBase64(payload.ciphertext);
  const key = await deriveKey(passphrase, salt, payload.iterations);
  const subtle = getSubtle();
  const plaintext = await subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new Uint8Array(plaintext);
}

export async function decryptSecretAsString(passphrase: string, payload: EncryptedPayload): Promise<string> {
  const bytes = await decryptSecret(passphrase, payload);
  return textDecoder.decode(bytes);
}
