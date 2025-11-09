import chalk from 'chalk';
import { promptSelect } from '../utils/io';
import { runTransportInspectCommand } from './transport-inspect';
import {
  watchBalanceCommand,
  watchContractsCommand,
  watchTicksCommand,
  watchTransfersCommand
} from './watchers';
import {
  addWalletAccountCommand,
  createWalletProfileCommand,
  exportProfileCommand,
  inspectWalletProfileCommand,
  issueSessionCommand,
  listWalletBalancesCommand,
  listWalletProfilesCommand,
  removeWalletProfileCommand,
  resumeSessionCommand
} from './wallet';
import { sendTransferCommand, resumeTransferQueueCommand } from './transfers';
import { callContractCommand, invokeContractCommand, listContractsCommand, describeContractCommand } from './contracts';
import { sessionBalanceCommand, sessionHistoryCommand } from './session';
import { showNetworkStatusCommand } from './status';

type ShellAction = {
  key: string;
  label: string;
  handler: () => Promise<void>;
};

type ShellCategory = {
  key: string;
  label: string;
  actions: ShellAction[];
};

const categories: ShellCategory[] = [
  {
    key: 'transport',
    label: 'Transport telemetry',
    actions: [
      {
        key: 'transport.inspect',
        label: 'Inspect HTTP transports',
        handler: () =>
          runTransportInspectCommand({
            probe: true
          })
      }
    ]
  },
  {
    key: 'watch',
    label: 'Watchers & streams',
    actions: [
      { key: 'watch.ticks', label: 'Stream ticks', handler: () => watchTicksCommand({}) },
      { key: 'watch.balance', label: 'Watch balances', handler: () => watchBalanceCommand({}) },
      { key: 'watch.transfers', label: 'Watch transfers', handler: () => watchTransfersCommand({}) },
      { key: 'watch.contracts', label: 'Watch contracts', handler: () => watchContractsCommand({}) }
    ]
  },
  {
    key: 'wallet',
    label: 'Wallets & sessions',
    actions: [
      { key: 'wallet.list', label: 'List profiles', handler: () => listWalletProfilesCommand({}) },
      { key: 'wallet.create', label: 'Create profile', handler: () => createWalletProfileCommand({}) },
      { key: 'wallet.profile.inspect', label: 'Inspect profile', handler: () => inspectWalletProfileCommand({}) },
      { key: 'wallet.remove', label: 'Remove profile', handler: () => removeWalletProfileCommand({}) },
      { key: 'wallet.account.add', label: 'Add account', handler: () => addWalletAccountCommand({}) },
      { key: 'wallet.session.issue', label: 'Issue session token', handler: () => issueSessionCommand({}) },
      { key: 'wallet.session.resume', label: 'Resume session token', handler: () => resumeSessionCommand({}) },
      { key: 'wallet.balances', label: 'List balances', handler: () => listWalletBalancesCommand({}) },
      { key: 'wallet.export', label: 'Export profile JSON', handler: () => exportProfileCommand({}) }
    ]
  },
  {
    key: 'transfer',
    label: 'Transfers & queue',
    actions: [
      { key: 'transfer.send', label: 'Send transfer', handler: () => sendTransferCommand({}) },
      { key: 'transfer.queue', label: 'Resume transfer queue', handler: () => resumeTransferQueueCommand() }
    ]
  },
  {
    key: 'contracts',
    label: 'Contracts & registry',
    actions: [
      { key: 'contracts.list', label: 'List registry entries', handler: () => listContractsCommand({}) },
      { key: 'contracts.describe', label: 'Describe contract', handler: () => describeContractCommand({}) },
      { key: 'contracts.call', label: 'Call contract function', handler: () => callContractCommand({}) },
      { key: 'contracts.invoke', label: 'Invoke contract procedure', handler: () => invokeContractCommand({}) }
    ]
  },
  {
    key: 'session',
    label: 'Session client',
    actions: [
      { key: 'session.balance', label: 'Fetch balance snapshot', handler: () => sessionBalanceCommand({}) },
      { key: 'session.history', label: 'List recent transactions', handler: () => sessionHistoryCommand({}) }
    ]
  },
  {
    key: 'status',
    label: 'Diagnostics',
    actions: [{ key: 'status.network', label: 'Show network status', handler: () => showNetworkStatusCommand() }]
  }
];

const exitOption = { key: 'exit', label: 'Exit shell' };

export async function runShellCommand() {
  renderIntro();
  let active = true;
  while (active) {
    const category = await promptSelect<ShellCategory | typeof exitOption>(
      'Choose a scope',
      [...categories, exitOption],
      (item) => item.label
    );
    if (!('actions' in category)) {
      active = false;
      break;
    }
    const action = await promptSelect<ShellAction>('Select an action', category.actions, (item) => item.label);
    printBanner(`${category.label} » ${action.label}`);
    try {
      await action.handler();
    } catch (error) {
      console.error(chalk.redBright('✖ Command failed:'), error instanceof Error ? error.message : error);
      if (process.env.DEBUG && error instanceof Error) {
        console.error(error.stack);
      }
    }
    console.log(chalk.gray('\nPress Ctrl+C to exit the current stream or wait for the next prompt.'));
  }
  console.log(chalk.magentaBright('\nSee you in the next tick.'));
}

function renderIntro() {
  console.log(chalk.magentaBright('┌──────────────────────────────────────────────┐'));
  console.log(chalk.magentaBright('│  QubicKit Interactive Console  ▸  /hax$     │'));
  console.log(chalk.magentaBright('└──────────────────────────────────────────────┘'));
  console.log(chalk.gray('Navigate with numbers, Ctrl+C to abort an active command.\n'));
}

function printBanner(text: string) {
  const line = '-'.repeat(text.length + 4);
  console.log(chalk.cyan(`\n${line}`));
  console.log(chalk.cyan(`| ${text} |`));
  console.log(chalk.cyan(line));
}
