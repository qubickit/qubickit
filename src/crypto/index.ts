import { keccakP160012 } from "./keccakp";
import Module from "./libFourQ_K12";

export interface SchnorrQ {
	generatePublicKey(secretKey: Uint8Array): Uint8Array;
	sign(
		secretKey: Uint8Array,
		publicKey: Uint8Array,
		message: Uint8Array,
	): Uint8Array;
	verify(
		publicKey: Uint8Array,
		message: Uint8Array,
		signature: Uint8Array,
	): number;
}

export interface KeyExchange {
	generateCompressedPublicKey(secretKey: Uint8Array): Uint8Array;
	compressedSecretAgreement(
		secretKey: Uint8Array,
		publicKey: Uint8Array,
	): Uint8Array;
}

export interface CryptoRuntime {
	schnorrq: SchnorrQ;
	kex: KeyExchange;
	K12(
		input: Uint8Array,
		output: Uint8Array,
		outputLength: number,
		outputOffset?: number,
	): void;
	keccakP160012: typeof keccakP160012;
	KECCAK_STATE_LENGTH: number;
}

// Constants from wasm module
export const KECCAK_STATE_LENGTH = 200;
export const SIGNATURE_LENGTH = 64;
export const PRIVATE_KEY_LENGTH = 32;
export const PUBLIC_KEY_LENGTH = 32;
export const DIGEST_LENGTH = 32;
export const NONCE_LENGTH = 32;
export const CHECKSUM_LENGTH = 3;

type WasmModule = typeof Module & {
	_malloc(size: number): number;
	_free(ptr: number): void;
	_HEAPU8: Uint8Array;
	_HEAPU16: Uint16Array;
	_SchnorrQ_KeyGeneration(skPtr: number, pkPtr: number): void;
	_SchnorrQ_Sign(
		skPtr: number,
		pkPtr: number,
		msgPtr: number,
		msgLen: number,
		sigPtr: number,
	): void;
	_SchnorrQ_Verify(
		pkPtr: number,
		msgPtr: number,
		msgLen: number,
		sigPtr: number,
		outPtr: number,
	): void;
	_CompressedPublicKeyGeneration(skPtr: number, pkPtr: number): void;
	_CompressedSecretAgreement(
		skPtr: number,
		pkPtr: number,
		outPtr: number,
	): void;
	_KangarooTwelve(
		inPtr: number,
		inLen: number,
		outPtr: number,
		outLen: number,
		customizationPtr: number,
		customizationLen: number,
	): void;
	onRuntimeInitialized?: () => void;
};

function allocU8(
	mod: WasmModule,
	length: number,
	value?: Uint8Array,
): Uint8Array {
	const ptr = mod._malloc(length);
	const chunk = (mod as any).HEAPU8.subarray(ptr, ptr + length);
	if (value) chunk.set(value);
	return chunk;
}

function allocU16(
	mod: WasmModule,
	length: number,
	value: Uint16Array,
): Uint16Array {
	const ptr = mod._malloc(length * 2);
	const chunk = (mod as any).HEAPU16.subarray(ptr / 2, ptr / 2 + length);
	chunk.set(value);
	return chunk;
}

const cryptoRuntime: Promise<CryptoRuntime> = new Promise((resolve) => {
	const wasm = Module as WasmModule;
	wasm.onRuntimeInitialized = () => {
		const generatePublicKey = (secretKey: Uint8Array): Uint8Array => {
			const sk = allocU8(wasm, secretKey.length, secretKey);
			const pk = allocU8(wasm, PUBLIC_KEY_LENGTH);
			wasm._SchnorrQ_KeyGeneration(sk.byteOffset, pk.byteOffset);
			const key = pk.slice();
			wasm._free(sk.byteOffset);
			wasm._free(pk.byteOffset);
			return key;
		};

		const sign = (
			secretKey: Uint8Array,
			publicKey: Uint8Array,
			message: Uint8Array,
		): Uint8Array => {
			const sk = allocU8(wasm, secretKey.length, secretKey);
			const pk = allocU8(wasm, publicKey.length, publicKey);
			const m = allocU8(wasm, message.length, message);
			const s = allocU8(wasm, SIGNATURE_LENGTH);

			wasm._SchnorrQ_Sign(
				sk.byteOffset,
				pk.byteOffset,
				m.byteOffset,
				message.length,
				s.byteOffset,
			);
			const sig = s.slice();
			wasm._free(sk.byteOffset);
			wasm._free(pk.byteOffset);
			wasm._free(m.byteOffset);
			wasm._free(s.byteOffset);
			return sig;
		};

		const verify = (
			publicKey: Uint8Array,
			message: Uint8Array,
			signature: Uint8Array,
		): number => {
			const pk = allocU8(wasm, publicKey.length, publicKey);
			const m = allocU8(wasm, message.length, message);
			const s = allocU8(wasm, signature.length, signature);
			const v = allocU16(wasm, 1, new Uint16Array(1));

			wasm._SchnorrQ_Verify(
				pk.byteOffset,
				m.byteOffset,
				message.length,
				s.byteOffset,
				v.byteOffset,
			);
			const ver = v[0] ?? 0;
			wasm._free(pk.byteOffset);
			wasm._free(m.byteOffset);
			wasm._free(s.byteOffset);
			wasm._free(v.byteOffset);
			return ver;
		};

		const generateCompressedPublicKey = (secretKey: Uint8Array): Uint8Array => {
			const sk = allocU8(wasm, secretKey.length, secretKey);
			const pk = allocU8(wasm, PUBLIC_KEY_LENGTH);
			wasm._CompressedPublicKeyGeneration(sk.byteOffset, pk.byteOffset);
			const key = pk.slice();
			wasm._free(sk.byteOffset);
			wasm._free(pk.byteOffset);
			return key;
		};

		const compressedSecretAgreement = (
			secretKey: Uint8Array,
			publicKey: Uint8Array,
		): Uint8Array => {
			const sk = allocU8(wasm, secretKey.length, secretKey);
			const pk = allocU8(wasm, publicKey.length, publicKey);
			const out = allocU8(wasm, PUBLIC_KEY_LENGTH);
			wasm._CompressedSecretAgreement(
				sk.byteOffset,
				pk.byteOffset,
				out.byteOffset,
			);
			const result = out.slice();
			wasm._free(sk.byteOffset);
			wasm._free(pk.byteOffset);
			wasm._free(out.byteOffset);
			return result;
		};

		const K12 = (
			input: Uint8Array,
			output: Uint8Array,
			outputLength: number,
			outputOffset = 0,
		): void => {
			const i = allocU8(wasm, input.length, input);
			const o = allocU8(wasm, outputLength, new Uint8Array(outputLength));
			wasm._KangarooTwelve(
				i.byteOffset,
				input.length,
				o.byteOffset,
				outputLength,
				0,
				0,
			);
			output.set(o.slice(), outputOffset);
			wasm._free(i.byteOffset);
			wasm._free(o.byteOffset);
		};

		resolve({
			schnorrq: { generatePublicKey, sign, verify },
			kex: { generateCompressedPublicKey, compressedSecretAgreement },
			K12,
			keccakP160012,
			KECCAK_STATE_LENGTH,
		});
	};
});

export default cryptoRuntime;
