import { randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createContext } from '../context';
import { promptConfirm, promptInput } from '../utils/io';
import { logInfo, logSuccess, printJson, printTable, logWarn } from '../utils/output';
import { parseInteger, parseString } from '../utils/parsers';
import { selectAccount, selectProfile } from '../utils/selectors';
import { withSpinner } from '../utils/spinner';
import type { CliBalancePayload, CliBalanceResponse } from '../utils/balance';

interface WalletListOptions {
  json?: boolean;
}

interface WalletBalanceOptions extends WalletListOptions {
  concurrency?: string | number;
}

interface CreateProfileOptions extends WalletListOptions {
  seed?: string;
  random?: boolean;
  passphrase?: string;
  label?: string;
  accountLabel?: string;
  derivationIndex?: string | number;
  metadata?: string[];
  metadataFile?: string;
}

interface RemoveProfileOptions {
  profileId?: string;
}

interface AddAccountOptions {
  profileId?: string;
  passphrase?: string;
  derivationIndex?: string | number;
  label?: string;
  interval?: string | number;
}

interface IssueSessionOptions extends WalletListOptions {
  profileId?: string;
  passphrase?: string;
  accountId?: string;
  derivationIndex?: string | number;
  ttl?: string | number;
}

interface ResumeSessionOptions extends WalletListOptions {
  token?: string;
  extendMs?: string | number;
}

interface ExportProfileOptions extends WalletListOptions {
  profileId?: string;
}

interface InspectProfileOptions extends WalletListOptions {
  profileId?: string;
}

interface UpdateProfileOptions extends WalletListOptions {
  profileId?: string;
  label?: string;
  metadata?: string[];
  metadataFile?: string;
  replaceMetadata?: boolean;
  clearMetadata?: boolean;
}

export async function listWalletBalancesCommand(options: WalletBalanceOptions) {
  const ctx = await createContext();
  const profiles = await ctx.sdk.wallet.listProfiles();
  if (!profiles.length) {
    logInfo('No wallet profiles stored. Use `wallet profiles:create` to add one.');
    return;
  }
  const session = ctx.sdk.createSessionClient();
  const jobs = profiles.flatMap((profile) => profile.accounts.map((account) => ({ profile, account })));
  if (!jobs.length) {
    logInfo('No accounts found. Use `wallet accounts:add` to create one.');
    return;
  }
  const concurrency = parseInteger(options.concurrency, 'concurrency', { min: 1, max: 10 }) ?? 3;
  const useSpinner = concurrency === 1;

  const rows = await runWithConcurrency(jobs, concurrency, async ({ profile, account }) => {
    const label = account.label ?? account.accountId;
    const identity = account.accountId;
    const fetchBalance = async () =>
      (await session.getBalance(identity, { cacheTtlMs: 0 })) as CliBalanceResponse;

    const response = useSpinner
      ? await withSpinner(`Fetching balance for ${label}`, fetchBalance)
      : await fetchBalance();

    return {
      profile: profile.label ?? profile.profileId,
      account: label,
      identity,
      balance: formatBalanceSummary(response.balance),
      incoming: formatAmount(response.balance, 'incomingAmount'),
      outgoing: formatAmount(response.balance, 'outgoingAmount')
    };
  });

  if (options.json) {
    printJson(rows);
  } else {
    printTable(rows);
  }
}

async function runWithConcurrency<T, TResult>(
  items: T[],
  limit: number,
  handler: (item: T, index: number) => Promise<TResult>
): Promise<TResult[]> {
  const results: TResult[] = new Array(items.length);
  let cursor = 0;
  const worker = async () => {
    while (true) {
      const current = cursor;
      cursor += 1;
      if (current >= items.length) break;
      results[current] = await handler(items[current]!, current);
    }
  };
  const poolSize = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: poolSize }, () => worker()));
  return results;
}

export async function listWalletProfilesCommand(options: WalletListOptions) {
  const ctx = await createContext();
  const profiles = await withSpinner('Loading wallet profiles', async () => ctx.sdk.wallet.listProfiles());
  if (options.json) {
    printJson(profiles);
    return;
  }
  printTable(
    profiles.map((profile) => ({
      profileId: profile.profileId,
      label: profile.label ?? '-',
      accounts: profile.accounts.length,
      updatedAt: new Date(profile.updatedAt).toLocaleString()
    }))
  );
}

export async function createWalletProfileCommand(options: CreateProfileOptions) {
  const ctx = await createContext();
  const generatedSeed = options.random ? generateRandomSeed() : undefined;
  if (generatedSeed && options.seed) {
    logWarn('Ignoring provided seed because --random was used.');
  }
  const seed = generatedSeed ?? (await resolveInput('seed', options.seed ?? process.env.QUBIC_SEED));
  const passphrase = await resolveInput('passphrase', options.passphrase ?? process.env.QUBIC_WALLET_PASSPHRASE, true);
  const derivationIndex = parseInteger(options.derivationIndex, 'derivation index', { min: 0 }) ?? 0;
  const metadata = await resolveMetadata(options.metadata, options.metadataFile);
  const profile = await withSpinner('Creating profile', async () =>
    ctx.sdk.wallet.createProfile({
      seed,
      passphrase,
      label: options.label,
      accountLabel: options.accountLabel,
      derivationIndex,
      metadata
    })
  );
  logSuccess(`Profile ${profile.profileId} created with ${profile.accounts.length} account(s).`);
  if (generatedSeed) {
    if (options.json) {
      printJson({ profile, seed: generatedSeed });
    } else {
      logWarn('Random seed generated. Store it securely:');
      console.log(generatedSeed);
    }
  } else if (options.json) {
    printJson(profile);
  }
}

export async function updateWalletProfileCommand(options: UpdateProfileOptions) {
  const ctx = await createContext();
  const profile = await selectProfile(ctx, options.profileId);
  const metadata = options.clearMetadata ? {} : await resolveMetadata(options.metadata, options.metadataFile);
  const mergeMetadata = options.clearMetadata ? false : options.replaceMetadata ? false : undefined;
  if (options.label === undefined && metadata === undefined && !options.clearMetadata) {
    logWarn('No updates provided. Use --label, --metadata, or --clear-metadata.');
    return;
  }
  const updated = await withSpinner('Updating profile', async () =>
    ctx.sdk.wallet.updateProfile({
      profileId: profile.profileId,
      label: options.label,
      metadata,
      mergeMetadata
    })
  );
  logSuccess(`Profile ${updated.profileId} updated.`);
  if (options.json) {
    printJson(updated);
  } else {
    logInfo(`Label: ${updated.label ?? '-'}`);
    if (updated.metadata && Object.keys(updated.metadata).length) {
      console.log('Metadata:');
      printTable(Object.entries(updated.metadata).map(([key, value]) => ({ key, value })));
    }
  }
}

export async function removeWalletProfileCommand(options: RemoveProfileOptions) {
  const ctx = await createContext();
  const profile = await selectProfile(ctx, options.profileId);
  const confirmed = await promptConfirm(
    `Remove profile ${profile.label ?? profile.profileId}? This cannot be undone.`,
    false
  );
  if (!confirmed) {
    logInfo('Profile removal cancelled.');
    return;
  }
  await withSpinner('Removing profile', async () => ctx.sdk.wallet.removeProfile(profile.profileId));
  logSuccess(`Removed profile ${profile.profileId}.`);
}

export async function addWalletAccountCommand(options: AddAccountOptions) {
  const ctx = await createContext();
  const profile = await selectProfile(ctx, options.profileId);
  const passphrase = await resolveInput('passphrase', options.passphrase ?? process.env.QUBIC_WALLET_PASSPHRASE, true);
  const derivationIndex = parseInteger(options.derivationIndex, 'derivation index', { min: 0 }) ?? 0;
  const account = await withSpinner('Deriving new account', async () =>
    ctx.sdk.wallet.addAccount({
      profileId: profile.profileId,
      passphrase,
      derivationIndex,
      label: options.label
    })
  );
  logSuccess(`Account ${account.accountId} added to profile ${profile.profileId}.`);
}

export async function issueSessionCommand(options: IssueSessionOptions) {
  const ctx = await createContext();
  const { profile, account } = await selectAccount(ctx, {
    profileId: options.profileId,
    accountId: options.accountId,
    promptLabel: 'Select an account to issue a session for'
  });
  const passphrase = await resolveInput('passphrase', options.passphrase ?? process.env.QUBIC_WALLET_PASSPHRASE, true);
  const derivationIndex = parseInteger(options.derivationIndex, 'derivation index', { min: 0 });
  const ttlMs = parseInteger(options.ttl, 'ttlMs', { min: 1 });
  const session = await withSpinner('Issuing session token', async () =>
    ctx.sdk.wallet.issueSessionToken({
      profileId: profile.profileId,
      passphrase,
      accountId: options.accountId ?? account.accountId,
      derivationIndex: derivationIndex ?? account.derivationIndex,
      ttlMs
    })
  );
  logSuccess(`Session issued for profile ${profile.profileId} (expires ${new Date(session.expiresAt).toLocaleString()}).`);
  if (options.json) {
    printJson(session);
    return;
  }
  console.log(`Token: ${session.token}`);
}

export async function resumeSessionCommand(options: ResumeSessionOptions) {
  const ctx = await createContext();
  const token = parseString(options.token ?? process.env.QUBIC_SESSION_TOKEN, 'session token');
  const extendMs = parseInteger(options.extendMs, 'extendMs', { min: 1 });
  const session = await withSpinner('Resuming session', async () =>
    ctx.sdk.wallet.resumeSession(token, { extendMs })
  );
  logInfo(`Session active for profile ${session.profileId}.`);
  if (options.json) {
    printJson(session);
  } else {
    console.log(`Identity: ${session.account.identity}`);
    console.log(`Expires: ${new Date(session.expiresAt).toLocaleString()}`);
  }
}

export async function exportProfileCommand(options: ExportProfileOptions) {
  const ctx = await createContext();
  const profile = await selectProfile(ctx, options.profileId);
  printJson(profile);
}

export async function inspectWalletProfileCommand(options: InspectProfileOptions) {
  const ctx = await createContext();
  const profile = await selectProfile(ctx, options.profileId);
  if (options.json) {
    printJson(profile);
    return;
  }
  logInfo(`Profile ${profile.profileId}`);
  printTable([
    { field: 'Label', value: profile.label ?? '-' },
    { field: 'Accounts', value: profile.accounts.length },
    { field: 'Created', value: new Date(profile.createdAt).toLocaleString() },
    { field: 'Updated', value: new Date(profile.updatedAt).toLocaleString() }
  ]);
  if (profile.accounts.length) {
    console.log('\nAccounts');
    printTable(
      profile.accounts.map((account) => ({
        label: account.label ?? '-',
        identity: account.accountId,
        index: account.derivationIndex,
        created: new Date(account.createdAt).toLocaleString()
      }))
    );
  }
  if (profile.metadata && Object.keys(profile.metadata).length) {
    console.log('\nMetadata');
    printTable(
      Object.entries(profile.metadata).map(([key, value]) => ({
        key,
        value
      }))
    );
  }
}

const formatBalanceSummary = (balance?: CliBalancePayload) => {
  if (!balance) return '-';
  if ('available' in balance && typeof balance.available === 'string') {
    const pending = balance.pending ? ` pending ${balance.pending}` : '';
    return `${balance.available}${pending}`;
  }
  if ('balance' in balance && typeof balance.balance === 'string') {
    return balance.balance;
  }
  return '-';
};

const formatAmount = (balance: CliBalancePayload | undefined, key: 'incomingAmount' | 'outgoingAmount'): string => {
  if (!balance) return '-';
  const value = balance[key];
  return typeof value === 'string' ? value : '-';
};

async function resolveInput(label: string, value?: string, prompt = false): Promise<string> {
  if (value && value.trim()) {
    return value.trim();
  }
  if (prompt) {
    return promptInput(`${label}: `);
  }
  throw new Error(`Missing required ${label}. Provide a flag or environment variable.`);
}

type MetadataMap = Record<string, string>;

async function resolveMetadata(entries?: string[], filePath?: string): Promise<MetadataMap | undefined> {
  const fileMetadata = await loadMetadataFile(filePath);
  const inlineMetadata = parseMetadataEntries(entries);
  if (!fileMetadata && !inlineMetadata) {
    return undefined;
  }
  return {
    ...(fileMetadata ?? {}),
    ...(inlineMetadata ?? {})
  };
}

function parseMetadataEntries(entries?: string[]): MetadataMap | undefined {
  if (!entries || !entries.length) return undefined;
  return entries.reduce<MetadataMap>((acc, entry) => {
    const [key, ...rest] = entry.split('=');
    if (!key || !rest.length) {
      throw new Error(`Invalid metadata entry "${entry}". Use key=value format.`);
    }
    acc[key.trim()] = rest.join('=').trim();
    return acc;
  }, {});
}

async function loadMetadataFile(filePath?: string): Promise<MetadataMap | undefined> {
  if (!filePath) return undefined;
  const data = JSON.parse(await readFile(filePath, 'utf8'));
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Metadata file must contain a JSON object.');
  }
  return Object.entries(data as Record<string, unknown>).reduce<MetadataMap>((acc, [key, value]) => {
    acc[key] = typeof value === 'string' ? value : String(value);
    return acc;
  }, {});
}

const SEED_LENGTH = 55;
const SEED_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

function generateRandomSeed(): string {
  const bytes = randomBytes(SEED_LENGTH);
  let seed = '';
  for (let i = 0; i < SEED_LENGTH; i += 1) {
    const index = bytes.at(i);
    seed += SEED_ALPHABET[(index ?? 0) % SEED_ALPHABET.length];
  }
  return seed;
}
