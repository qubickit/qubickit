import cryptoRuntime, {
	CHECKSUM_LENGTH,
	PRIVATE_KEY_LENGTH,
	PUBLIC_KEY_LENGTH,
} from "./index";

const SEED_ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export interface KeyPair {
	privateKey: Uint8Array;
	publicKey: Uint8Array;
}

export interface KeyPairWithChecksum extends KeyPair {
	publicKeyWithChecksum: Uint8Array;
}

function seedToBytes(seed: string): Uint8Array {
	const bytes = new Uint8Array(seed.length);
	for (let i = 0; i < seed.length; i++) {
		const char = seed.charAt(i);
		const idx = SEED_ALPHABET.indexOf(char);
		if (idx < 0) {
			throw new Error("seed must contain only lowercase letters a-z");
		}
		bytes[i] = idx;
	}
	return bytes;
}

export async function derivePrivateKey(
	seed: string,
	index = 0,
): Promise<Uint8Array> {
	const { K12 } = await cryptoRuntime;
	const byteSeed = seedToBytes(seed);
	const preimage = byteSeed.slice();

	let remaining = index;
	while (remaining-- > 0) {
		for (let i = 0; i < preimage.length; i++) {
			const next = (preimage.at(i) ?? 0) + 1;
			if (next > SEED_ALPHABET.length) {
				preimage[i] = 1;
				continue;
			}
			preimage[i] = next;
			break;
		}
	}

	const key = new Uint8Array(PRIVATE_KEY_LENGTH);
	K12(preimage, key, PRIVATE_KEY_LENGTH);
	return key;
}

export async function deriveKeyPairWithChecksum(
	seed: string,
	index = 0,
): Promise<KeyPairWithChecksum> {
	const { schnorrq, K12 } = await cryptoRuntime;
	const privateKey = await derivePrivateKey(seed, index);
	const publicKeyWithChecksum = new Uint8Array(
		PUBLIC_KEY_LENGTH + CHECKSUM_LENGTH,
	);
	publicKeyWithChecksum.set(schnorrq.generatePublicKey(privateKey));
	K12(
		publicKeyWithChecksum.subarray(0, PUBLIC_KEY_LENGTH),
		publicKeyWithChecksum,
		CHECKSUM_LENGTH,
		PUBLIC_KEY_LENGTH,
	);
	return {
		privateKey,
		publicKey: publicKeyWithChecksum.subarray(0, PUBLIC_KEY_LENGTH),
		publicKeyWithChecksum,
	};
}

export async function deriveKeyPair(
	seed: string,
	index = 0,
): Promise<KeyPair> {
	const { privateKey, publicKey } = await deriveKeyPairWithChecksum(seed, index);
	return { privateKey, publicKey };
}
