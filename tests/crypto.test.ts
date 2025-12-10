import { expect, test } from "bun:test";
import crypto, {
	DIGEST_LENGTH,
	PUBLIC_KEY_LENGTH,
	SIGNATURE_LENGTH,
} from "../src/crypto";
import { deriveKeyPair, derivePrivateKey } from "../src/crypto/keys";
import {
	identityFromPublicKey,
	publicKeyFromIdentity,
	verifyIdentity,
} from "../src/encoding/identity";
import {
	deserializeTransaction,
	serializeTransaction,
	signTransaction,
	verifyTransactionSignature,
} from "../src/encoding/transaction";

const seed = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy"; // 55 chars

test("derive keypair and identity roundtrips", async () => {
	const { schnorrq } = await crypto;
	const { privateKey, publicKey } = await deriveKeyPair(seed);
	expect(privateKey.length).toBe(32);
	expect(publicKey.length).toBe(PUBLIC_KEY_LENGTH);

	const identity = await identityFromPublicKey(publicKey);
	expect(identity).toHaveLength(60);
	expect(await verifyIdentity(identity)).toBe(true);
	const decoded = publicKeyFromIdentity(identity);
	expect(decoded).toEqual(publicKey);

	// sanity sign/verify over random digest
	const digest = new Uint8Array(DIGEST_LENGTH).fill(7);
	const signature = schnorrq.sign(privateKey, publicKey, digest);
	expect(signature.length).toBe(SIGNATURE_LENGTH);
	expect(schnorrq.verify(publicKey, digest, signature)).toBe(1);
});

test("transaction serialize/sign/verify roundtrip", async () => {
	const { privateKey, publicKey } = await deriveKeyPair(seed);
	const destination = await deriveKeyPair(
		"bcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx",
	);

	const payload = new TextEncoder().encode("hello-qubic");
	const unsignedBytes = serializeTransaction({
		sourcePublicKey: publicKey,
		destinationPublicKey: destination.publicKey,
		amount: 123n,
		tick: 42,
		inputType: 0,
		payload,
	});
	expect(unsignedBytes.length).toBe(
		32 + 32 + 8 + 4 + 2 + 2 + payload.length + SIGNATURE_LENGTH,
	);

	const { bytes } = await signTransaction(
		{
			sourcePublicKey: publicKey,
			destinationPublicKey: destination.publicKey,
			amount: 123n,
			tick: 42,
			inputType: 0,
			payload,
		},
		privateKey,
	);

	const parsed = deserializeTransaction(bytes);
	expect(parsed.amount).toBe(123n);
	expect(parsed.tick).toBe(42);
	expect(parsed.payload?.toString()).toBe(payload.toString());
	expect(parsed.signature?.length).toBe(SIGNATURE_LENGTH);

	const valid = await verifyTransactionSignature(parsed);
	expect(valid).toBe(true);

	// tamper to ensure verify fails
	const bad = new Uint8Array(bytes);
	bad[10] = (bad[10] ?? 0) ^ 1;
	const parsedBad = deserializeTransaction(bad);
	expect(await verifyTransactionSignature(parsedBad)).toBe(false);
});

test("derivePrivateKey respects index increments", async () => {
	const key0 = await derivePrivateKey(seed, 0);
	const key1 = await derivePrivateKey(seed, 1);
	expect(key0).not.toEqual(key1);
});
