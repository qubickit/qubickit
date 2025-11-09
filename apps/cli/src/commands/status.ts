import chalk from 'chalk';
import { createContext } from '../context';
import { logInfo, printKeyValue, printTable } from '../utils/output';
import { withSpinner } from '../utils/spinner';

export async function showNetworkStatusCommand() {
  const ctx = await createContext();
  const latest = await withSpinner('Fetching latest tick', async () => ctx.sdk.core.archive.getLatestTick());
  const status = await withSpinner('Fetching network status', async () => ctx.sdk.core.archive.getStatus());

  logInfo('Network status');
  printKeyValue({
    'Latest tick': latest.tickNumber,
    'Latest epoch': latest.epoch ?? '-',
    'Last processed tick': status.lastProcessedTick?.tickNumber ?? '-'
  });

  if (status.lastProcessedTicksPerEpoch) {
    const rows = Object.entries(status.lastProcessedTicksPerEpoch).map(([epoch, tick]) => ({
      epoch,
      tick
    }));
    console.log(chalk.gray('\nProcessed ticks per epoch'));
    printTable(rows);
  }
}
