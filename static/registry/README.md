# Qubic Static Registry Snapshot

JSON artifacts copied from https://github.com/qubic/static.

Files:
- `address_labels.json`
- `exchanges.json`
- `smart_contracts.json`
- `tokens.json`

Update flow:
1. Pull latest upstream repo (`git -C static_qubic_registry pull`).
2. Copy refreshed `data/*.json` into this folder.
3. Commit changes so SDK/CLI/docs have deterministic registry data without hitting the network.
