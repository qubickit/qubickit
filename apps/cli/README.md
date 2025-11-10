# QubicKit CLI

Experimental CLI that wraps `@qubickit/core` / `@qubickit/sdk` utilities for local debugging.

## Local development

```bash
# run a command directly from source
bun run --cwd apps/cli dev -- transport:inspect

# keep the process hot while iterating
bun run --cwd apps/cli dev:watch -- watch:ticks --count 5

# bundle the CLI (outputs dist/index.js with a shebang)
bun run --cwd apps/cli build

# run the lightweight smoke tests
bun run --cwd apps/cli test

# install globally (adds both `qubic` and `qk` shortcuts)
bun add -g @qubickit/cli
```

## Commands

| Command | Purpose |
| --- | --- |
| `transport inspect` | Inspect HTTP diagnostics, retry/circuit status, and recent requests (spinner-backed). |
| `watch ticks|balance|transfers|contracts` | Stream live events using the SDK watchers; verbose mode prints payload details. |
| `wallet profiles list/create/update/inspect/remove/export` | Interactive profile management (prompts for seeds, passphrases, metadata updates). |
| `wallet accounts add` | Derive additional accounts with progress spinners. |
| `wallet sessions issue/resume` | Issue or resume encrypted session tokens. |
| `wallet balances` | Fetch live balances for every stored account (with per-account spinners). |
| `session balance/history` | Pull one-off balance snapshots or list recent transactions via the session client. |
| `transfer send`, `transfer queue:resume` | Draft/broadcast transfers (auto targets latest tick +10 unless `--tick`/`--tick-offset` overrides) and resume the persistence-backed queue. |
| `contracts list/describe/call/invoke` | Inspect registry metadata (functions/procedures), run read-only calls (with optional `--decode`), or invoke procedures. |
| `status network` | Fetch latest tick + node health for quick diagnostics. |

Each command documents its flags via `qubic --help` or `qubic <command> --help`. Common environment overrides:

| Variable | Purpose |
| --- | --- |
| `QUBIC_HTTP_HOST`, `QUBIC_ARCHIVE_HOST`, `QUBIC_STATS_HOST`, `QUBIC_QUERY_HOST` | Override SDK/core hosts without editing the config file. |
| `QUBIC_WALLET_STORE` | Custom path for the encrypted wallet store (defaults to `~/.qubickit/wallets.json`). |
| `QUBIC_SEED`, `QUBIC_WALLET_PASSPHRASE`, `QUBIC_SESSION_TOKEN` | Shortcuts for signer-related commands when you don’t want to pass flags. |

Examples:

```bash
# inspect transports and send 3 probes before printing diagnostics
qk transport inspect --host https://rpc.qubic.org --requests 3

# create a profile and add another account
QUBIC_SEED=aaaa... \
QUBIC_WALLET_PASSPHRASE=secret \
  qk wallet profiles create --label "treasury"
# or let the CLI generate a random seed for you
qk wallet profiles create --random --passphrase secret --label "lab"
# update metadata/label after creation
qk wallet profiles update --profile-id <profile> --label "Treasury" --metadata env=prod --metadata region=eu
qk wallet accounts add --profile-id <profile> --derivation-index 1

# stream transfers for an identity
qk watch transfers --identity AAAAAAAAA... --json

# send a transfer using a session token
QUBIC_SESSION_TOKEN=$(qk wallet sessions issue --profile-id <profile> --json | jq -r .token)
qk transfer send --destination BBBBBB... --amount 1000000 --session-token "$QUBIC_SESSION_TOKEN"
```

## Next steps

- Persist CLI settings via `qubic config set/get`.
- Add higher-level recipes (treasury drains, scheduled sync runs).
- Support secure prompts/TTY masking for passphrases.
- Generate changelog-ready output for contract metadata when hitting the registry.
