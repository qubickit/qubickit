import type { WalletAccount, WalletProfile } from '@qubickit/sdk/wallet';
import type { CliContext } from '../context';
import { promptInput, promptSelect } from './io';
import type { ContractMetadata } from '@qubickit/sdk/contracts';

export async function selectProfile(ctx: CliContext, providedId?: string): Promise<WalletProfile> {
  if (providedId) {
    const profile = await ctx.sdk.wallet.getProfile(providedId);
    if (!profile) {
      throw new Error(`Profile ${providedId} not found.`);
    }
    return profile;
  }
  const profiles = await ctx.sdk.wallet.listProfiles();
  if (!profiles.length) {
    throw new Error('No wallet profiles available. Create one with `wallet:profiles:create`.');
  }
  return promptSelect('Select a profile', profiles, (profile) =>
    `${profile.label ?? profile.profileId} (${profile.accounts.length} account${
      profile.accounts.length === 1 ? '' : 's'
    })`
  );
}

export async function selectAccount(
  ctx: CliContext,
  opts: { profileId?: string; accountId?: string; promptLabel?: string } = {}
): Promise<{ profile: WalletProfile; account: WalletAccount }> {
  const profile = await selectProfile(ctx, opts.profileId);
  if (opts.accountId) {
    const account = profile.accounts.find((entry) => entry.accountId === opts.accountId);
    if (!account) {
      throw new Error(`Account ${opts.accountId} not found on profile ${profile.profileId}.`);
    }
    return { profile, account };
  }
  if (!profile.accounts.length) {
    throw new Error(`Profile ${profile.profileId} has no accounts. Add one with \`wallet:accounts:add\`.`);
  }
  const account = await promptSelect(
    opts.promptLabel ?? 'Select an account',
    profile.accounts,
    (entry) => `${entry.label ?? entry.accountId} (idx ${entry.derivationIndex})`
  );
  return { profile, account };
}

export async function selectIdentity(ctx: CliContext, provided?: string): Promise<string> {
  if (provided?.trim()) return provided.trim();
  const profiles = await ctx.sdk.wallet.listProfiles();
  type AccountChoice = {
    profileId: string;
    label?: string;
    account: WalletAccount;
  };
  type IdentityChoice = AccountChoice | { type: 'manual' };
  const accounts: AccountChoice[] = profiles.flatMap((profile) =>
    profile.accounts.map((account) => ({ profileId: profile.profileId, label: profile.label, account }))
  );
  if (!accounts.length) {
    return promptInput('Identity: ');
  }
  const manual: IdentityChoice = { type: 'manual' };
  const choice = await promptSelect<IdentityChoice>(
    'Select an identity',
    [...accounts, manual],
    (entry) =>
      'type' in entry
        ? 'Enter a custom identity'
        : `${entry.account.label ?? entry.account.accountId} (${entry.account.accountId})`
  );
  if ('type' in choice) {
    return promptInput('Identity: ');
  }
  return choice.account.accountId;
}

export async function selectContract(
  ctx: CliContext,
  provided?: string,
  filter?: string
): Promise<ContractMetadata> {
  if (provided) {
    const registryEntry = resolveContractFromString(ctx, provided);
    if (!registryEntry) {
      throw new Error(`Contract ${provided} not found in registry.`);
    }
    return registryEntry;
  }
  const entries = ctx.sdk.contracts.registry.list();
  const filtered = filter
    ? entries.filter((entry) =>
        [entry.name, entry.label, entry.address].some((value) => value?.toLowerCase().includes(filter.toLowerCase()))
      )
    : entries;
  if (!filtered.length) {
    throw new Error('No contracts match your filter.');
  }
  return promptSelect(
    'Select a contract',
    filtered,
    (entry) => `${entry.name}${entry.label ? ` (${entry.label})` : ''} – ${entry.address}`
  );
}

function resolveContractFromString(ctx: CliContext, identifier: string): ContractMetadata | undefined {
  if (/^\d+$/.test(identifier)) {
    return ctx.sdk.contracts.registry.getByIndex(Number(identifier));
  }
  return ctx.sdk.contracts.registry.findByName(identifier) ?? ctx.sdk.contracts.registry.getByAddress(identifier);
}
