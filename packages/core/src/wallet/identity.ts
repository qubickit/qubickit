import cryptoPromise, {
  CHECKSUM_LENGTH,
  PRIVATE_KEY_LENGTH,
  PUBLIC_KEY_LENGTH
} from '../vendor/crypto/index.js';

export interface IdentityPackage {
  privateKey: Uint8Array;
  publicKey: Uint8Array;
  publicKeyWithChecksum: Uint8Array;
  identity: string;
}

const SEED_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const SEED_LENGTH = 55;

type CryptoModule = Awaited<typeof cryptoPromise>;
let cryptoModule: CryptoModule | null = null;

const getCrypto = async () => {
  if (!cryptoModule) {
    cryptoModule = await cryptoPromise;
  }
  return cryptoModule;
};

export const validateSeed = (seed: string) => {
  if (seed.length !== SEED_LENGTH) throw new Error(`Seed must be ${SEED_LENGTH} lowercase characters`);
  if (!/^[a-z]+$/.test(seed)) throw new Error('Seed must contain only lowercase letters a-z');
  return seed;
};

export const seedToBytes = (seed: string): Uint8Array => {
  validateSeed(seed);
  const bytes = new Uint8Array(seed.length);
  for (let i = 0; i < seed.length; i++) {
    const idx = SEED_ALPHABET.indexOf(seed[i]!);
    if (idx === -1) throw new Error('Invalid seed character');
    bytes[i] = idx;
  }
  return bytes;
};

export const derivePrivateKey = async (seed: string, index = 0): Promise<Uint8Array> => {
  const { K12 } = await getCrypto();
  const preimage = seedToBytes(seed);

  while (index-- > 0) {
    for (let i = 0; i < preimage.length; i++) {
      preimage[i]!++;
      if (preimage[i]! > SEED_ALPHABET.length) {
        preimage[i] = 1;
      } else {
        break;
      }
    }
  }

  const key = new Uint8Array(PRIVATE_KEY_LENGTH);
  K12(preimage, key, PRIVATE_KEY_LENGTH);
  return key;
};

const generatePublicKeyWithChecksum = async (
  privateKey: Uint8Array
): Promise<{ publicKey: Uint8Array; publicKeyWithChecksum: Uint8Array }> => {
  const { schnorrq, K12 } = await getCrypto();
  const publicKey = schnorrq.generatePublicKey(privateKey).slice(0, PUBLIC_KEY_LENGTH);
  const publicKeyWithChecksum = new Uint8Array(PUBLIC_KEY_LENGTH + CHECKSUM_LENGTH);
  publicKeyWithChecksum.set(publicKey);
  K12(publicKey, publicKeyWithChecksum, CHECKSUM_LENGTH, PUBLIC_KEY_LENGTH);
  return { publicKey, publicKeyWithChecksum };
};

const publicKeyToIdentityInternal = (publicKey: Uint8Array, checksum: Uint8Array, lowerCase: boolean) => {
  const baseChar = lowerCase ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
  let identity = '';

  for (let i = 0; i < 4; i++) {
    let chunk = 0n;
    for (let j = 0; j < 8; j++) {
      const value = BigInt(publicKey[i * 8 + j]!);
      chunk += value * (256n ** BigInt(j));
    }
    for (let j = 0; j < 14; j++) {
      identity += String.fromCharCode(Number(chunk % 26n) + baseChar);
      chunk /= 26n;
    }
  }

  let checksumInt = ((checksum[2]! << 16) | (checksum[1]! << 8) | checksum[0]!) & 0x3ffff;
  for (let i = 0; i < 4; i++) {
    identity += String.fromCharCode((checksumInt % 26) + baseChar);
    checksumInt = Math.floor(checksumInt / 26);
  }
  return identity;
};

export const publicKeyToIdentity = async (publicKey: Uint8Array, lowerCase = false): Promise<string> => {
  if (publicKey.length !== PUBLIC_KEY_LENGTH) throw new Error('Public key must be 32 bytes');
  const checksum = await computeChecksum(publicKey);
  return publicKeyToIdentityInternal(publicKey, checksum, lowerCase);
};

const computeChecksum = async (publicKey: Uint8Array): Promise<Uint8Array> => {
  const { K12 } = await getCrypto();
  const checksum = new Uint8Array(CHECKSUM_LENGTH);
  K12(publicKey, checksum, CHECKSUM_LENGTH);
  return checksum;
};

export const identityToPublicKey = (identity: string): Uint8Array => {
  if (!/^[A-Z]{60}$/.test(identity)) throw new Error('Identity must be 60 uppercase characters');
  const bytes = new Uint8Array(PUBLIC_KEY_LENGTH);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < 4; i++) {
    let value = 0n;
    for (let j = 13; j >= 0; j--) {
      const charCode = identity.charCodeAt(i * 14 + j) - 'A'.charCodeAt(0);
      value = value * 26n + BigInt(charCode);
    }
    view.setBigUint64(i * 8, value, true);
  }
  return bytes;
};

export const verifyIdentity = async (identity: string): Promise<boolean> => {
  try {
    const publicKey = identityToPublicKey(identity);
    const regenerated = await publicKeyToIdentity(publicKey);
    return regenerated === identity;
  } catch {
    return false;
  }
};

export const createIdentityPackage = async (seed: string, index = 0): Promise<IdentityPackage> => {
  const privateKey = await derivePrivateKey(seed, index);
  const { publicKey, publicKeyWithChecksum } = await generatePublicKeyWithChecksum(privateKey);
  const checksum = publicKeyWithChecksum.slice(PUBLIC_KEY_LENGTH);
  const identity = publicKeyToIdentityInternal(publicKey, checksum, false);
  return { privateKey, publicKey, publicKeyWithChecksum, identity };
};
