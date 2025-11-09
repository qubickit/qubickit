import { createContext } from '../context';
import { parseInteger, parseString } from '../utils/parsers';
import { logInfo, printJson, printTable } from '../utils/output';
import { withSpinner } from '../utils/spinner';
import type { CliBalanceResponse } from '../utils/balance';
import { renderBalanceEvent } from '../utils/balance';

interface SessionBalanceOptions {
  identity?: string;
  json?: boolean;
}

interface SessionHistoryOptions {
  identity?: string;
  limit?: string | number;
  json?: boolean;
}

export async function sessionBalanceCommand(options: SessionBalanceOptions) {
  const ctx = await createContext();
  const identity = parseString(options.identity ?? process.env.QUBIC_IDENTITY, 'identity');
  const session = ctx.sdk.createSessionClient();
  const result = await withSpinner(`Fetching balance for ${identity}`, async () =>
    session.getBalance(identity, { cacheTtlMs: 0 })
  );
  if (options.json) {
    printJson(result);
  } else {
    renderBalanceEvent(result as CliBalanceResponse, 'Balance');
  }
}

export async function sessionHistoryCommand(options: SessionHistoryOptions) {
  const ctx = await createContext();
  const identity = parseString(options.identity ?? process.env.QUBIC_IDENTITY, 'identity');
  const limit = parseInteger(options.limit, 'limit', { min: 1 }) ?? 25;
  const session = ctx.sdk.createSessionClient();
  const response = await withSpinner(`Fetching last ${limit} transactions`, async () =>
    session.listTransactions(identity, { limit, cacheTtlMs: 0 })
  );
  const rows =
    response.transactions?.map((tx) => ({
      hash: (tx as Record<string, unknown>).hash ?? (tx as Record<string, unknown>).txId ?? '-',
      tick: (tx as Record<string, unknown>).tickNumber ?? '-',
      amount: (tx as Record<string, unknown>).amount ?? '-',
      status: (tx as Record<string, unknown>).status ?? '-'
    })) ?? [];
  if (options.json) {
    printJson(response);
  } else if (!rows.length) {
    logInfo('No transactions returned.');
  } else {
    printTable(rows);
  }
}
