import type { CliContext } from '../context';
import { createContext } from '../context';
import { logInfo, logVerbose, printJson } from '../utils/output';
import { parseInteger } from '../utils/parsers';
import { selectContract, selectIdentity } from '../utils/selectors';
import type { TransferEvent } from '@qubickit/sdk/watchers';
import { renderBalanceEvent, type CliBalanceResponse } from '../utils/balance';

interface WatchBaseOptions {
  json?: boolean;
}

export interface WatchTicksOptions extends WatchBaseOptions {
  count?: string | number;
}

export interface WatchBalanceOptions extends WatchBaseOptions {
  identity?: string;
  interval?: string | number;
}

export interface WatchTransfersOptions extends WatchBalanceOptions {
  limit?: string | number;
}

export interface WatchContractsOptions extends WatchBaseOptions {
  contract?: string;
  matcherIdentity?: string;
  interval?: string | number;
}

export async function watchTicksCommand(options: WatchTicksOptions) {
  const ctx = await createContext();
  const limit = parseInteger(options.count, 'count', { min: 1 });
  logInfo('Streaming ticks. Press Ctrl+C to stop.');
  logVerbose(`[watch:ticks] limit=${limit ?? '∞'}`);
  const stream = ctx.sdk.watchers.ticks();
  await iterateChannel(
    ctx,
    () => stream.channel.asObservable().toAsyncIterator(),
    () => stream.stop(),
    options.json ?? false,
    limit
  );
}

export async function watchBalanceCommand(options: WatchBalanceOptions) {
  const ctx = await createContext();
  const identity = await selectIdentity(ctx, options.identity ?? process.env.QUBIC_IDENTITY);
  const interval = parseInteger(options.interval, 'interval', { min: 250 }) ?? 1_000;
  logInfo(`Watching balance for ${identity} (interval ${interval}ms). Press Ctrl+C to stop.`);
  logVerbose(`[watch:balance] identity=${identity} interval=${interval}`);
  await emitInitialBalanceSnapshot(ctx, identity, options.json ?? false);
  const handle = ctx.sdk.watchers.balance(identity, { intervalMs: interval });
  await iterateChannel(
    ctx,
    () => handle.channel.asObservable().toAsyncIterator(),
    () => handle.stop(),
    options.json ?? false,
    undefined,
    (value) => renderBalanceEvent(value, 'Balance update')
  );
}

export async function watchTransfersCommand(options: WatchTransfersOptions) {
  const ctx = await createContext();
  const identity = await selectIdentity(ctx, options.identity ?? process.env.QUBIC_IDENTITY);
  const interval = parseInteger(options.interval, 'interval', { min: 250 }) ?? 2_000;
  const limit = parseInteger(options.limit, 'transaction fetch limit', { min: 1 }) ?? 25;
  logInfo(`Watching transfers for ${identity} (interval ${interval}ms, fetch ${limit}). Press Ctrl+C to stop.`);
  logVerbose(`[watch:transfers] identity=${identity} interval=${interval} limit=${limit}`);
  const handle = ctx.sdk.watchers.transfers(identity, { intervalMs: interval, limit });
  await iterateChannel(
    ctx,
    () => handle.channel.asObservable().toAsyncIterator(),
    () => handle.stop(),
    options.json ?? false,
    undefined,
    (event) => renderTransferEvent(event, 'Transfer event')
  );
}

export async function watchContractsCommand(options: WatchContractsOptions) {
  const ctx = await createContext();
  const contractMetadata = await selectContract(ctx, options.contract);
  const contract = contractMetadata.address;
  const matcherIdentity = await selectIdentity(ctx, options.matcherIdentity ?? contractMetadata.address);
  const interval = parseInteger(options.interval, 'interval', { min: 250 }) ?? 4_000;
  logInfo(`Watching contract ${contract} (interval ${interval}ms). Press Ctrl+C to stop.`);
  logVerbose(`[watch:contracts] contract=${contract} matcher=${matcherIdentity} interval=${interval}`);
  const handle = ctx.sdk.watchers.contracts(contract, {
    intervalMs: interval,
    identity: matcherIdentity
  });
  await iterateChannel(
    ctx,
    () => handle.channel.asObservable().toAsyncIterator(),
    () => handle.stop(),
    options.json ?? false
  );
}

async function iterateChannel<T>(
  _ctx: CliContext,
  iteratorFactory: () => AsyncIterableIterator<T>,
  stop: () => void,
  asJson: boolean,
  maxItems?: number,
  renderer?: (value: T) => void
) {
  const interrupt = attachInterrupt(() => {
    stop();
  });
  let seen = 0;
  try {
    const iterator = iteratorFactory();
    for await (const value of iterator) {
      if (asJson) {
        printJson(value);
      } else if (renderer) {
        renderer(value);
      } else if (typeof value === 'object') {
        logVerbose('[watch] event payload', value);
        console.dir(value, { depth: null, colors: true });
      } else {
        logVerbose('[watch] event payload', value);
        console.log(value);
      }
      seen += 1;
      if (maxItems && seen >= maxItems) {
        break;
      }
      if (interrupt.isInterrupted()) {
        break;
      }
    }
  } finally {
    stop();
    interrupt.detach();
  }
}

function attachInterrupt(handler: () => void) {
  let interrupted = false;
  const wrapped = () => {
    logVerbose('Interrupt signal received, stopping watcher.');
    console.log('\nStopping watcher...');
    interrupted = true;
    handler();
  };
  process.once('SIGINT', wrapped);
  process.once('SIGTERM', wrapped);
  return {
    detach() {
      process.off('SIGINT', wrapped);
      process.off('SIGTERM', wrapped);
    },
    isInterrupted() {
      return interrupted;
    }
  };
}

async function emitInitialBalanceSnapshot(ctx: CliContext, identity: string, asJson: boolean) {
  try {
    const snapshot = (await ctx.sdk.createSessionClient().getBalance(identity, { cacheTtlMs: 0 })) as CliBalanceResponse;
    logVerbose('[watch:balance] initial snapshot fetched');
    if (asJson) {
      printJson(snapshot);
    } else {
      renderBalanceEvent(snapshot, 'Initial balance');
    }
  } catch (error) {
    logVerbose('[watch:balance] failed to fetch initial snapshot', error);
  }
}

function renderTransferEvent(event: TransferEvent, prefix: string) {
  const tx = event.transaction;
  const hash = typeof tx.hash === 'string' ? tx.hash : typeof tx.txId === 'string' ? tx.txId : '(unknown)';
  const tick = tx.tickNumber ?? 'unknown';
  const summaryParts = Object.entries(tx)
    .filter(([key]) => ['hash', 'txId', 'tickNumber'].indexOf(key) === -1)
    .slice(0, 4)
    .map(([key, value]) => `${key}=${formatTransferValue(value)}`);
  console.log(`${prefix} — hash ${hash} @ tick ${tick}${summaryParts.length ? ` | ${summaryParts.join(', ')}` : ''}`);
}

const formatTransferValue = (value: unknown) => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null ||
    value === undefined
  ) {
    return String(value);
  }
  return JSON.stringify(value);
};
