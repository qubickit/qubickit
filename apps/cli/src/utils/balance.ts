import type { QubicSdk } from '@qubickit/sdk';

export type CliBalanceResponse = Awaited<ReturnType<QubicSdk['core']['http']['getBalance']>>;
export type CliBalancePayload = CliBalanceResponse['balance'];

export const summarizeBalance = (balance?: CliBalancePayload): string => {
  if (!balance) return 'no balance data';
  if ('available' in balance) {
    const pending = balance.pending ? ` pending ${balance.pending}` : '';
    return `available ${balance.available}${pending}`;
  }
  if ('balance' in balance && typeof balance.balance === 'string') {
    const parts = [
      `balance ${balance.balance}`,
      balance.incomingAmount ? `incoming ${balance.incomingAmount}` : null,
      balance.outgoingAmount ? `outgoing ${balance.outgoingAmount}` : null
    ].filter(Boolean);
    return parts.join(', ');
  }
  return 'balance pending';
};

export const renderBalanceEvent = (payload: CliBalanceResponse, prefix: string) => {
  const summary = summarizeBalance(payload.balance);
  const tickInfo =
    payload.balance && 'validForTick' in payload.balance && payload.balance.validForTick !== undefined
      ? ` @ tick ${payload.balance.validForTick}`
      : '';
  console.log(`${prefix} — ${summary}${tickInfo}`);
};
