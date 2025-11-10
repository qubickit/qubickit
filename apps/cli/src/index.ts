import { Command } from 'commander';
import pkg from '../package.json' assert { type: 'json' };
import { runTransportInspectCommand } from './commands/transport-inspect';
import {
  watchBalanceCommand,
  watchContractsCommand,
  watchTicksCommand,
  watchTransfersCommand
} from './commands/watchers';
import {
  addWalletAccountCommand,
  createWalletProfileCommand,
  exportProfileCommand,
  inspectWalletProfileCommand,
  issueSessionCommand,
  listWalletProfilesCommand,
  removeWalletProfileCommand,
  resumeSessionCommand,
  listWalletBalancesCommand,
  updateWalletProfileCommand
} from './commands/wallet';
import {
  listContractsCommand,
  callContractCommand,
  invokeContractCommand,
  describeContractCommand
} from './commands/contracts';
import { resumeTransferQueueCommand, sendTransferCommand } from './commands/transfers';
import { runShellCommand } from './commands/shell';
import { setVerboseLogging } from './utils/output';
import { showNetworkStatusCommand } from './commands/status';
import { sessionBalanceCommand, sessionHistoryCommand } from './commands/session';

const program = new Command();

const collectArgOption = (value: string, previous: string[] = []) => {
  previous.push(value);
  return previous;
};

program.name('qubic').description('QubicKit CLI').version(pkg.version).option('-v, --verbose', 'Enable verbose logging');

registerTransportCommands(program);
registerWatchCommands(program);
registerWalletCommands(program);
registerTransferCommands(program);
registerContractCommands(program);
registerStatusCommands(program);
registerSessionCommands(program);

program.command('shell').description('Interactive command shell').action(runShellCommand);

program.hook('preAction', (thisCommand, actionCommand) => {
  const source = actionCommand ?? thisCommand;
  const opts =
    (typeof source.optsWithGlobals === 'function' ? source.optsWithGlobals() : source.opts?.()) ??
    program.optsWithGlobals?.() ??
    {};
  setVerboseLogging(Boolean(opts.verbose));
});

program.parseAsync(process.argv).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  if (process.env.DEBUG) {
    console.error(error);
  }
  process.exit(1);
});

function registerTransportCommands(root: Command) {
  const scope = 'transport';
  const group = root.command(scope).description('Transport telemetry + diagnostics');
  addScopedCommand(group, root, scope, 'inspect', 'Inspect HTTP transport diagnostics and recent requests.', (cmd) =>
    cmd
      .option('--host <url>', 'Primary HTTP host')
      .option('--fallback <urls...>', 'Fallback hosts (space separated)')
      .option('--cache-size <number>', 'LRU cache size', Number)
      .option('--path <path>', 'Request path used for probes', '/v1/status')
      .option('--requests <count>', 'Number of probe requests before reading diagnostics', Number, 1)
      .option('--probe', 'Hit the endpoint before printing diagnostics', true)
      .option('--quiet', 'Suppress probe logs')
      .action(runTransportInspectCommand)
  );
}

function registerWatchCommands(root: Command) {
  const scope = 'watch';
  const group = root.command(scope).description('Realtime watcher commands');

  addScopedCommand(group, root, scope, 'ticks', 'Stream tick numbers from the archive.', (cmd) =>
    cmd.option('--count <number>', 'Stop after N ticks', Number).option('--json', 'Emit JSON').action(watchTicksCommand)
  );

  addScopedCommand(group, root, scope, 'balance', 'Watch balance changes for an identity.', (cmd) =>
    cmd
      .option('--identity <id>', 'Identity to monitor (default QUBIC_IDENTITY env)')
      .option('--interval <ms>', 'Polling interval in ms', Number)
      .option('--json', 'Emit JSON events')
      .action(watchBalanceCommand)
  );

  addScopedCommand(group, root, scope, 'transfers', 'Stream new transfers for an identity.', (cmd) =>
    cmd
      .option('--identity <id>', 'Identity to monitor (default QUBIC_IDENTITY env)')
      .option('--interval <ms>', 'Polling interval in ms', Number)
      .option('--limit <count>', 'How many transfers per fetch', Number)
      .option('--json', 'Emit JSON events')
      .action(watchTransfersCommand)
  );

  addScopedCommand(group, root, scope, 'contracts', 'Stream transactions that touch a contract identity.', (cmd) =>
    cmd
      .option('--contract <id>', 'Contract identity (name/address/index)')
      .option('--matcher-identity <id>', 'Identity used to fetch transactions (defaults to contract)')
      .option('--interval <ms>', 'Polling interval', Number)
      .option('--json', 'Emit JSON events')
      .action(watchContractsCommand)
  );
}

function registerWalletCommands(root: Command) {
  const wallet = root.command('wallet').description('Wallet & session commands');

  const profiles = wallet.command('profiles').description('Profile management');
  profiles.command('list').description('List stored wallet profiles').option('--json', 'Output JSON').action(listWalletProfilesCommand);
  profiles
    .command('create')
    .description('Create a new wallet profile by encrypting a seed.')
    .option('--seed <seed>', 'Seed (defaults to QUBIC_SEED env)')
    .option('--random', 'Generate a random seed (overrides --seed)')
    .option('--passphrase <pass>', 'Passphrase (defaults to QUBIC_WALLET_PASSPHRASE or prompt)')
    .option('--label <label>', 'Profile label')
    .option('--account-label <label>', 'Initial account label')
    .option('--derivation-index <index>', 'Initial account derivation index', Number, 0)
    .option('--metadata <key=value>', 'Metadata entry (repeatable)', collectArgOption, [])
    .option('--metadata-file <path>', 'Path to JSON metadata file')
    .option('--json', 'Output JSON')
    .action(createWalletProfileCommand);
  profiles
    .command('update')
    .description('Update profile label and metadata.')
    .option('--profile-id <id>', 'Profile id')
    .option('--label <label>', 'New label')
    .option('--metadata <key=value>', 'Metadata entry (repeatable)', collectArgOption, [])
    .option('--metadata-file <path>', 'Path to JSON metadata file')
    .option('--replace-metadata', 'Replace metadata instead of merging')
    .option('--clear-metadata', 'Remove all metadata before applying updates')
    .option('--json', 'Output JSON')
    .action(updateWalletProfileCommand);
  profiles
    .command('inspect')
    .description('Inspect a specific profile and its accounts.')
    .option('--profile-id <id>', 'Profile id')
    .option('--json', 'Output JSON')
    .action(inspectWalletProfileCommand);
  profiles
    .command('remove')
    .description('Remove a stored profile.')
    .option('--profile-id <id>', 'Profile id')
    .action(removeWalletProfileCommand);
  profiles
    .command('export')
    .description('Export the raw profile JSON.')
    .option('--profile-id <id>', 'Profile id')
    .action(exportProfileCommand);

  const accounts = wallet.command('accounts').description('Account helpers');
  accounts
    .command('add')
    .description('Add an account to an existing profile.')
    .option('--profile-id <id>', 'Profile id')
    .option('--passphrase <pass>', 'Passphrase (defaults to env or prompt)')
    .option('--derivation-index <index>', 'Derivation index', Number, 0)
    .option('--label <label>', 'Account label')
    .action(addWalletAccountCommand);

  const sessions = wallet.command('sessions').description('Session token management');
  sessions
    .command('issue')
    .description('Issue a session token for a profile/account.')
    .option('--profile-id <id>', 'Profile id')
    .option('--passphrase <pass>', 'Passphrase (defaults to env or prompt)')
    .option('--account-id <id>', 'Account id to load')
    .option('--derivation-index <index>', 'Derivation index', Number)
    .option('--ttl <ms>', 'TTL override in ms', Number)
    .option('--json', 'Output JSON')
    .action(issueSessionCommand);
  sessions
    .command('resume')
    .description('Resume a session token and show its expiry.')
    .option('--token <token>', 'Session token (defaults to QUBIC_SESSION_TOKEN env)')
    .option('--extend-ms <ms>', 'Extend TTL in ms', Number)
    .option('--json', 'Output JSON')
    .action(resumeSessionCommand);

  wallet
    .command('balances')
    .description('List balances for every stored account.')
    .option('--json', 'Output JSON')
    .option('--concurrency <number>', 'Number of concurrent balance fetches (default 3)')
    .action(listWalletBalancesCommand);
}

function registerTransferCommands(root: Command) {
  const scope = 'transfer';
  const group = root.command(scope).description('Transfer helpers');

  addScopedCommand(group, root, scope, 'send', 'Draft and broadcast a transfer.', (cmd) =>
    cmd
      .option('--destination <identity>', 'Destination identity')
      .option('--amount <amount>', 'Amount in raw units')
      .option('--session-token <token>', 'Existing session token to reuse')
      .option('--profile-id <id>', 'Profile id to issue a temporary session token')
      .option('--passphrase <pass>', 'Passphrase (required when --profile-id is used)')
      .option('--account-id <id>', 'Specific account id to unlock')
      .option('--seed <seed>', 'Seed used for signing (alternative to session token)')
      .option('--derivation-index <index>', 'Derivation index', Number)
      .option('--input <payload>', 'Contract input payload (base64 by default)')
      .option('--input-encoding <encoding>', 'Payload encoding base64|hex|utf8', 'base64')
      .option('--input-type <id>', 'Input type override', Number)
      .option('--tick <number>', 'Tick override', Number)
      .option('--tick-offset <number>', 'Number of ticks to add when auto-selecting the target tick', Number)
      .option('--procedure-id <id>', 'Procedure id metadata', Number)
      .option('--dry-run', 'Skip broadcast and only sign')
      .option('--no-monitor', 'Skip settlement monitoring')
      .option('--no-queue-on-fail', 'Do not requeue failed transfers')
      .option('--json', 'Output JSON result')
      .action(sendTransferCommand)
  );

  addScopedCommand(group, root, scope, 'queue:resume', 'Resume any queued transfers awaiting broadcast.', (cmd) =>
    cmd.action(resumeTransferQueueCommand)
  );
}

function registerContractCommands(root: Command) {
  const scope = 'contracts';
  const group = root.command(scope).description('Contract registry helpers');

  addScopedCommand(group, root, scope, 'list', 'List known contracts from the static registry.', (cmd) =>
    cmd.option('--filter <term>', 'Filter by term').option('--json', 'Output JSON').action(listContractsCommand)
  );

  addScopedCommand(group, root, scope, 'call', 'Call a contract function (read-only).', (cmd) =>
    cmd
      .option('--contract <id>', 'Contract name/address/index')
      .option('--function-name <name>', 'Function name')
      .option('--function-id <id>', 'Function id', Number)
      .option('--input-type <type>', 'Input type override', Number)
      .option('--payload <payload>', 'Encoded payload')
      .option('--payload-encoding <encoding>', 'Encoding base64|hex|utf8', 'base64')
      .option('--args <json>', 'JSON arguments encoded via the function input struct')
      .option('--args-file <path>', 'Path to JSON arguments encoded via the function input struct')
      .option('--arg <key=value>', 'Set argument field (repeatable)', collectArgOption, [])
      .option('--decode [mode]', 'Decode responseData (struct|base64|hex|utf8|json)')
      .option('--format <mode>', 'Format decoded json (raw|fixed)')
      .option('--decimals <n>', 'Decimals for fixed formatting', Number)
      .option('--json', 'Output JSON')
      .action(callContractCommand)
  );

  addScopedCommand(group, root, scope, 'invoke', 'Invoke a contract procedure (creates a transfer).', (cmd) =>
    cmd
      .option('--contract <id>', 'Contract name/address/index')
      .option('--procedure-name <name>', 'Procedure name')
      .option('--procedure-id <id>', 'Procedure id', Number)
      .option('--amount <amount>', 'Amount to send', '0')
      .option('--session-token <token>', 'Existing session token')
      .option('--profile-id <id>', 'Profile id to issue a session token')
      .option('--passphrase <pass>', 'Passphrase when using profile id')
      .option('--account-id <id>', 'Account id override')
      .option('--seed <seed>', 'Seed for signing')
      .option('--derivation-index <index>', 'Derivation index', Number)
      .option('--input <payload>', 'Input payload')
      .option('--payload-encoding <encoding>', 'Payload encoding', 'base64')
      .option('--args <json>', 'JSON arguments encoded via the procedure input struct')
      .option('--args-file <path>', 'Path to JSON arguments encoded via the procedure input struct')
      .option('--arg <key=value>', 'Set argument field (repeatable)', collectArgOption, [])
      .option('--input-type <type>', 'Input type override', Number)
      .option('--dry-run', 'Skip broadcast')
      .option('--no-monitor', 'Skip settlement monitoring')
      .option('--no-queue-on-fail', 'Do not requeue failed transfers')
      .option('--json', 'Output JSON')
      .action(invokeContractCommand)
  );
  addScopedCommand(group, root, scope, 'describe', 'Describe a contract (functions, procedures).', (cmd) =>
    cmd
      .option('--contract <id>', 'Contract name/address/index')
      .option('--filter <term>', 'Filter when searching for contract')
      .option('--json', 'Output JSON')
      .action(describeContractCommand)
  );
}

function addScopedCommand(
  group: Command,
  root: Command,
  scope: string,
  name: string,
  description: string,
  configure: (cmd: Command) => Command
) {
  const nested = group.command(name).description(description);
  configure(nested);
}

function registerStatusCommands(root: Command) {
  const scope = 'status';
  const group = root.command(scope).description('Environment + network status');

  addScopedCommand(group, root, scope, 'network', 'Show latest tick and network health.', (cmd) =>
    cmd.action(showNetworkStatusCommand)
  );
}

function registerSessionCommands(root: Command) {
  const scope = 'session';
  const group = root.command(scope).description('Session client helpers');

  addScopedCommand(group, root, scope, 'balance', 'Fetch a one-off balance snapshot.', (cmd) =>
    cmd.option('--identity <id>', 'Identity (default QUBIC_IDENTITY env)').option('--json', 'Output JSON').action(sessionBalanceCommand)
  );

  addScopedCommand(group, root, scope, 'history', 'List recent transactions for an identity.', (cmd) =>
    cmd
      .option('--identity <id>', 'Identity (default QUBIC_IDENTITY env)')
      .option('--limit <count>', 'Number of transactions', Number, 25)
      .option('--json', 'Output JSON')
      .action(sessionHistoryCommand)
  );
}
