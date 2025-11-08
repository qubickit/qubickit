export interface CryptoModule {
  schnorrq: {
    generatePublicKey(secretKey: Uint8Array): Uint8Array;
    sign(secretKey: Uint8Array, publicKey: Uint8Array, message: Uint8Array): Uint8Array;
    verify(publicKey: Uint8Array, message: Uint8Array, signature: Uint8Array): number;
  };
  kex: {
    generateCompressedPublicKey(secretKey: Uint8Array): Uint8Array;
    compressedSecretAgreement(secretKey: Uint8Array, publicKey: Uint8Array): Uint8Array;
  };
  K12(input: Uint8Array, output: Uint8Array, outputLength: number, outputOffset?: number): void;
  keccakP160012: (state: Uint8Array) => void;
  KECCAK_STATE_LENGTH: number;
}

declare const crypto: Promise<CryptoModule> & { keccakP160012: (state: Uint8Array) => void };
export const KECCAK_STATE_LENGTH: number;
export const SIGNATURE_LENGTH: number;
export const PRIVATE_KEY_LENGTH: number;
export const PUBLIC_KEY_LENGTH: number;
export const DIGEST_LENGTH: number;
export const NONCE_LENGTH: number;
export const CHECKSUM_LENGTH: number;
export default crypto;
