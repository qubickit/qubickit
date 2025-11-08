# @qubickit/core

Phase 1 for the QubicKit core library includes typed RPC clients, a shared transport layer, and schema generation helpers.

## Scripts
- `bun run dev` – tsup in watch mode.
- `bun run build` – produce ESM + CJS bundles with type declarations.
- `bun run lint` – eslint over `src`.
- `bun run test` – Bun's test runner.
- `bun run schemas:download` – fetch the latest swagger specs into `schemas/raw`.
- `bun run schemas:generate` – regenerate TypeScript definitions from the downloaded specs.

## Structure
- `src/transport/http-client.ts` – low-level HTTP client with retry/backoff, caching, hooks, and typed errors (timeout-aware).
- `src/config/hosts.ts` – default host registry for archive/http/stats/query surfaces.
- `src/clients/*` – Archive/HTTP/Stats/Query clients exposing typed helpers (`getTickData`, `getTickTransactions`, `getBalance`, `getTransfersByIdentity`, `getLatestStats`, etc.).
- `src/models/generated` – auto-generated OpenAPI types (run the schema script to populate).
- `src/models/*-schemas.ts` – Zod validators for key responses.
- `src/models/routes.ts` – literal unions for all supported RPC paths.
- `src/errors.ts` – reusable HTTP + validation errors surfaced by clients.
- `src/watchers/` – polling-based tick watcher for downstream subscriptions.
- `src/wallet/` – seed → identity helpers powered by KangarooTwelve + SchnorrQ (async API; await `createIdentityPackage`).
- `src/contracts/` – helper for invoking smart contract query endpoints.
- `src/serde/transaction-builder.ts` – binary serialization + signing helpers for transfers.
- `src/transactions/{monitor.ts,broadcast.ts}` – utilities to broadcast and monitor transactions end to end.

See `docs/core-notes.md` for the native-node research summary that informed these APIs.
