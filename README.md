# qubickit

Typed clients for Qubic public endpoints (HTTP partner API, Query V2, JSON-RPC), with a pluggable transport that works in Node or browser.

## Install

```bash
bun install qubickit
# or pnpm add / npm install
```

## Usage

```ts
import {
  createHttpClient,
  createRpcClient,
  createQueryClient,
  fetchTransport,
  HttpTypes,
  QueryTypes,
} from "qubickit";

const transport = fetchTransport();

// HTTP partner API
const http = createHttpClient({
  baseUrl: "https://api.qubic.org",
  transport,
});
const balance = await http.getBalance("IDENTITY");

// JSON-RPC
const rpc = createRpcClient({
	baseUrl: "https://rpc.qubic.org",
	transport,
});
const info = await rpc.call("getNodeInfo", []);

// Query V2
const query = createQueryClient({
	baseUrl: "https://query.qubic.org",
	transport,
});
const txs = await query.getTransactionsForIdentity({ identity: "IDENTITY" });

// Keys, identities, signing
import {
	deriveKeyPair,
	identityFromPublicKey,
	signTransaction,
	serializeTransaction,
	verifyTransactionSignature,
} from "qubickit";

const { privateKey, publicKey } = await deriveKeyPair(
	"abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy",
);
const identity = await identityFromPublicKey(publicKey);
const { bytes } = await signTransaction(
	{
		sourcePublicKey: publicKey,
		destinationPublicKey: publicKey,
		amount: 1n,
		tick: 123,
		inputType: 0,
		payload: new Uint8Array(),
	},
	privateKey,
);
const parsed = deserializeTransaction(bytes);
const ok = await verifyTransactionSignature(parsed);
```

## Scripts

- `bun run lint` — Biome formatting/lint.
- `bun test` — Bun test suite with mocked transports.
- `bun run build` — Bundle ESM+CJS+`.d.ts` to `dist/` (tsup).
- `bun run release` — Lint, test, and build (used by release workflow on tags).

## Notes

- Transports are pluggable; inject your own for custom environments.
- Public endpoints require no auth; API key/header injection is optional via `QubicClientConfig` if you need it.
- Generated types are lightweight; regenerate with `node scripts/gen-http-types.cjs` and `node scripts/gen-query-types.cjs` when swagger specs change.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```
