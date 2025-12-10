import cryptoRuntime, {
	CHECKSUM_LENGTH,
	DIGEST_LENGTH,
	PUBLIC_KEY_LENGTH,
} from "../crypto";

export interface IdentityOptions {
	lowercase?: boolean;
}

function clampPublicKey(key: Uint8Array): Uint8Array {
	if (key.length !== PUBLIC_KEY_LENGTH) {
		throw new Error(`public key must be ${PUBLIC_KEY_LENGTH} bytes`);
	}
	return key;
}

function checksumBytes(publicKey: Uint8Array): Promise<Uint8Array> {
	const digest = new Uint8Array(DIGEST_LENGTH);
	const checksum = new Uint8Array(CHECKSUM_LENGTH);
	return cryptoRuntime.then(({ K12 }) => {
		K12(publicKey, digest, DIGEST_LENGTH);
		checksum.set(digest.slice(0, CHECKSUM_LENGTH));
		return checksum;
	});
}

export async function identityFromPublicKey(
	publicKey: Uint8Array,
	options: IdentityOptions = {},
): Promise<string> {
	const key = clampPublicKey(publicKey);
	const baseChar = options.lowercase ? "a".charCodeAt(0) : "A".charCodeAt(0);

	let result = "";
	const view = new DataView(key.buffer, key.byteOffset, key.byteLength);
	for (let i = 0; i < 4; i++) {
		let val = view.getBigUint64(i * 8, true);
		for (let j = 0; j < 14; j++) {
			const digit = Number(val % 26n);
			result += String.fromCharCode(baseChar + digit);
			val /= 26n;
		}
	}

	const checksum = await checksumBytes(key);
	const c0 = checksum[0] ?? 0;
	const c1 = checksum[1] ?? 0;
	const c2 = checksum[2] ?? 0;
	let checksumVal = ((c2 << 16) | (c1 << 8) | c0) & 0x3ffff;
	for (let i = 0; i < 4; i++) {
		const digit = checksumVal % 26;
		result += String.fromCharCode(baseChar + digit);
		checksumVal = Math.floor(checksumVal / 26);
	}

	return result;
}

export function publicKeyFromIdentity(identity: string): Uint8Array {
	if (!identity || identity.length !== 60 || !/^[A-Z]+$/.test(identity)) {
		throw new Error("identity must be 60 uppercase characters");
	}
	const buf = new ArrayBuffer(PUBLIC_KEY_LENGTH);
	const view = new DataView(buf);

	for (let i = 0; i < 4; i++) {
		view.setBigUint64(i * 8, 0n, true);
		for (let j = 14; j-- > 0; ) {
			const code = identity.charCodeAt(i * 14 + j) - "A".charCodeAt(0);
			view.setBigUint64(
				i * 8,
				view.getBigUint64(i * 8, true) * 26n + BigInt(code),
				true,
			);
		}
	}

	return new Uint8Array(buf);
}

export async function verifyIdentity(identity: string): Promise<boolean> {
	try {
		const pubKey = publicKeyFromIdentity(identity);
		const recomputed = await identityFromPublicKey(pubKey);
		return recomputed === identity;
	} catch {
		return false;
	}
}
