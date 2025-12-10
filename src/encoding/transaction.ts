import cryptoRuntime, {
	DIGEST_LENGTH,
	PUBLIC_KEY_LENGTH,
	SIGNATURE_LENGTH,
} from "../crypto";

export interface TransactionPayload {
	sourcePublicKey: Uint8Array;
	destinationPublicKey: Uint8Array;
	amount: bigint;
	tick: number;
	inputType: number;
	payload?: Uint8Array;
	signature?: Uint8Array;
}

export interface EncodedTransaction {
	bytes: Uint8Array;
	unsigned: Uint8Array;
	digest: Uint8Array;
}

const HEADER_LENGTH = 32 + 32 + 8 + 4 + 2 + 2;

function toBigInt(value: bigint | number | string): bigint {
	if (typeof value === "bigint") return value;
	if (typeof value === "number") return BigInt(value);
	return BigInt(value);
}

function clampPublicKey(key: Uint8Array, label: string): Uint8Array {
	if (key.length !== PUBLIC_KEY_LENGTH) {
		throw new Error(`${label} must be ${PUBLIC_KEY_LENGTH} bytes`);
	}
	return key;
}

export function serializeTransaction(fields: TransactionPayload): Uint8Array {
	const payload = fields.payload ?? new Uint8Array();
	const size = HEADER_LENGTH + payload.length + SIGNATURE_LENGTH;
	const out = new Uint8Array(size);
	const view = new DataView(out.buffer);

	let offset = 0;
	const source = clampPublicKey(fields.sourcePublicKey, "sourcePublicKey");
	out.set(source, offset);
	offset += PUBLIC_KEY_LENGTH;

	const dest = clampPublicKey(
		fields.destinationPublicKey,
		"destinationPublicKey",
	);

	out.set(dest, offset);
	offset += PUBLIC_KEY_LENGTH;

	view.setBigInt64(offset, toBigInt(fields.amount), true);
	offset += 8;

	view.setUint32(offset, fields.tick, true);
	offset += 4;

	view.setUint16(offset, fields.inputType, true);
	offset += 2;

	view.setUint16(offset, payload.length, true);
	offset += 2;

	out.set(payload, offset);
	offset += payload.length;

	if (fields.signature && fields.signature.length > 0) {
		if (fields.signature.length !== SIGNATURE_LENGTH) {
			throw new Error(`signature must be ${SIGNATURE_LENGTH} bytes`);
		}
		out.set(fields.signature, offset);
	}

	return out;
}

export function deserializeTransaction(bytes: Uint8Array): TransactionPayload {
	if (bytes.length < HEADER_LENGTH + SIGNATURE_LENGTH) {
		throw new Error("transaction too short");
	}
	const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	let offset = 0;
	const sourcePublicKey = bytes.slice(offset, offset + PUBLIC_KEY_LENGTH);
	offset += PUBLIC_KEY_LENGTH;
	const destinationPublicKey = bytes.slice(offset, offset + PUBLIC_KEY_LENGTH);
	offset += PUBLIC_KEY_LENGTH;
	const amount = view.getBigInt64(offset, true);
	offset += 8;
	const tick = view.getUint32(offset, true);
	offset += 4;
	const inputType = view.getUint16(offset, true);
	offset += 2;
	const inputSize = view.getUint16(offset, true);
	offset += 2;
	const payload = bytes.slice(offset, offset + inputSize);
	offset += inputSize;
	const signature = bytes.slice(offset, offset + SIGNATURE_LENGTH);

	return {
		sourcePublicKey,
		destinationPublicKey,
		amount,
		tick,
		inputType,
		payload,
		signature,
	};
}

export async function signTransaction(
	fields: Omit<TransactionPayload, "signature">,
	privateKey: Uint8Array,
): Promise<EncodedTransaction> {
	const unsignedBytes = serializeTransaction({
		...fields,
		signature: new Uint8Array(),
	});
	const unsigned = unsignedBytes.slice(
		0,
		unsignedBytes.length - SIGNATURE_LENGTH,
	);

	const digest = new Uint8Array(DIGEST_LENGTH);
	const { K12, schnorrq } = await cryptoRuntime;
	K12(unsigned, digest, DIGEST_LENGTH);
	const signature = schnorrq.sign(privateKey, fields.sourcePublicKey, digest);

	const bytes = serializeTransaction({ ...fields, signature });
	return { bytes, unsigned, digest };
}

export async function verifyTransactionSignature(
	tx: TransactionPayload,
): Promise<boolean> {
	if (!tx.signature || tx.signature.length !== SIGNATURE_LENGTH) return false;
	const unsigned = serializeTransaction({ ...tx, signature: new Uint8Array() });
	const core = unsigned.slice(0, unsigned.length - SIGNATURE_LENGTH);
	const digest = new Uint8Array(DIGEST_LENGTH);
	const { K12, schnorrq } = await cryptoRuntime;
	K12(core, digest, DIGEST_LENGTH);
	return schnorrq.verify(tx.sourcePublicKey, digest, tx.signature) === 1;
}
