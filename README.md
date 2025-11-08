# QubicKit Monorepo (Bun workspaces)

This directory serves as the Bun-based monorepo for the QubicKit stack. It mirrors the phase plans (`planning/`) with matching packages/apps:

```
.
├── packages/
│   ├── core/   # @qubickit/core low-level transport + crypto
│   ├── sdk/    # @qubickit/sdk orchestrated wallet/session layer
│   └── web/    # @qubickit/web React hooks + UI helpers
├── apps/
│   ├── cli/    # @qubickit/cli operator tooling
│   └── docs/   # @qubickit/docs (Fumadocs site placeholder)
├── planning/   # research + phase plans
├── docs/       # internal notes (see docs/core-notes.md)
├── static/     # registry snapshots
├── tsconfig.base.json
└── package.json (workspaces + Bun scripts)
```

## Getting started

```bash
bun install
```

Package-level workflows are executed via the helper scripts:

- `bun run dev:core` / `dev:sdk` / `dev:web` / `dev:cli`
- `bun run build` – sequentially calls each workspace build script (currently placeholders).
- `bun run lint` / `bun run test` – reserved for future lint/test pipelines.

Each workspace contains its own `package.json`, `tsconfig.json`, and `src/` entrypoints to keep responsibilities isolated while sharing the Bun toolchain.
