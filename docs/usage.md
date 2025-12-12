# qubickit — developer guide

Practical guide for using the SDK (HTTP partner API, Query V2, JSON-RPC, contract bindings, crypto helpers). Focused on usage; no build/maintenance steps here.

## Quickstart
```ts
import {
  createHttpClient,
  createQueryClient,
  createRpcClient,
  fetchTransport,
  ContractTypes,
} from "qubickit";

const transport = fetchTransport();

const http = createHttpClient({ baseUrl: "https://api.qubic.org", transport });
const balance = await http.getBalance("IDENTITY");

const rpc = createRpcClient({ baseUrl: "https://rpc.qubic.org", transport });
const info = await rpc.call("getNodeInfo", []);

const query = createQueryClient({ baseUrl: "https://query.qubic.org", transport });
const txs = await query.getTransactionsForIdentity({ identity: "IDENTITY" });

// Contract function (registry-backed contractIndex)
const qx = ContractTypes.Qx.createClient(query);
const orders = await qx.functions.EntityAskOrders({
  entity: new Uint8Array(32),
  offset: 0n,
  limit: 20n,
});
```

## Install
```
npm install qubickit
# or
pnpm add qubickit
# or
bun add qubickit
```
Peer dep: TypeScript >= 5. Outputs: ESM + CJS + dts.

## Config & transport
- `fetchTransport()` is the default; it auto-parses JSON by `content-type`, supports timeouts via AbortController, and works in Node 18+/browser.
- Provide a custom fetch or transport by passing `fetchTransport(customFetch)` or your own `Transport` implementation.
- Optional auth: `apiKey`, `authHeaderName`, `authScheme`; optional `userAgent`; `timeoutMs`.

## Clients
### HTTP partner API
```ts
const http = createHttpClient({ baseUrl: "...", transport });
await http.getBalance("IDENTITY");
await http.broadcastTransaction({ encodedTransaction: "..." });
await http.querySmartContract({ contractIndex: 1, inputType: 5, inputSize: 0, requestData: "" });
```

### JSON-RPC
```ts
const rpc = createRpcClient({ baseUrl: "...", transport });
const nodeInfo = await rpc.call("getNodeInfo", []);
const [ok, err] = await rpc.batch([{ method: "ping" }, { method: "bad" }]); // errors become QubicError
```

### Query V2
```ts
const query = createQueryClient({ baseUrl: "...", transport });
const tick = await query.getTickData({ tickNumber: 123 });
const txs = await query.getTransactionsForIdentity({ identity: "IDENTITY" });
```

## Contracts (generated bindings)
- Access via `ContractTypes.<Contract>`; registry provides `contractIndex` automatically, override via `{ contractIndex }`.
- Functions: read-only, call `querySmartContract` internally, return decoded output.
- Procedures: builders returning `{ inputType, payload }` for transaction signing.

Example (QX):
```ts
const qx = ContractTypes.Qx.createClient(query); // uses registry index
const asks = await qx.functions.EntityAskOrders({ entity: new Uint8Array(32), offset: 0n, limit: 10n });

const { inputType, payload } = qx.procedures.PlaceAskOrder({
  entity: new Uint8Array(32),
  price: 1_000n,
  numberOfShares: 5n,
});
// embed inputType/payload into your transaction serialize/sign/broadcast flow
```

## Crypto & identities
```ts
import {
  deriveKeyPair,
  derivePrivateKey,
  identityFromPublicKey,
  serializeTransaction,
  signTransaction,
  verifyTransactionSignature,
} from "qubickit";

const { privateKey, publicKey } = await deriveKeyPair("your-seed...");
const identity = await identityFromPublicKey(publicKey);

const unsigned = serializeTransaction({
  sourcePublicKey: publicKey,
  destinationPublicKey: publicKey,
  amount: 123n,
  tick: 42,
  inputType: 0,
  payload: new Uint8Array(),
});

const { bytes: signed } = await signTransaction(
  {
    sourcePublicKey: publicKey,
    destinationPublicKey: publicKey,
    amount: 123n,
    tick: 42,
    inputType: 0,
    payload: new Uint8Array(),
  },
  privateKey,
);
const valid = await verifyTransactionSignature(signed);
```

## Troubleshooting
- Missing `fetch`/`AbortController`: pass a custom fetch/transport.
- Auth headers: public endpoints don’t need them; set `apiKey + authHeaderName` only if required.
- Base64: contract functions handle base64 internally; if calling low-level APIs, encode/decode manually.
- Bundlers: `moduleResolution: bundler` works; exports include ESM/CJS/dts.
- Tests: mock transport by implementing `Transport` (see `tests/clients.test.ts`).
