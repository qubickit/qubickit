import type { TransferSigner } from '@qubickit/sdk';
import type { CliContext } from '../context';
import { promptInput } from '../utils/io';
import { parseInteger } from '../utils/parsers';
import { logInfo } from '../utils/output';
import { selectAccount } from '../utils/selectors';

export interface SignerOptions {
  sessionToken?: string;
  seed?: string;
  profileId?: string;
  passphrase?: string;
  derivationIndex?: string | number;
  accountId?: string;
}

export async function resolveSigner(ctx: CliContext, options: SignerOptions): Promise<TransferSigner> {
  const token = options.sessionToken ?? process.env.QUBIC_SESSION_TOKEN;
  if (token) {
    return { sessionToken: token };
  }

  const seed = options.seed ?? process.env.QUBIC_SEED;
  if (seed) {
    const derivationIndex = parseInteger(options.derivationIndex, 'derivation index', { min: 0 }) ?? 0;
    return { seed, derivationIndex };
  }

  try {
    const { profile, account } = await selectAccount(ctx, {
      profileId: options.profileId,
      accountId: options.accountId,
      promptLabel: 'Select an account for signing'
    });
    const passphrase = await resolveSecret(options.passphrase ?? process.env.QUBIC_WALLET_PASSPHRASE, 'passphrase');
    const derivationIndex = parseInteger(options.derivationIndex, 'derivation index', { min: 0 }) ?? account.derivationIndex;
    const session = await ctx.sdk.wallet.issueSessionToken({
      profileId: profile.profileId,
      passphrase,
      accountId: account.accountId,
      derivationIndex
    });
    logInfo(`Session token issued (expires ${new Date(session.expiresAt).toLocaleString()}).`);
    return { sessionToken: session.token };
  } catch (error) {
    if (error instanceof Error && /No wallet profiles/.test(error.message)) {
      const manualSeed = await resolveSecret(options.seed, 'seed');
      const derivationIndex = parseInteger(options.derivationIndex, 'derivation index', { min: 0 }) ?? 0;
      return { seed: manualSeed, derivationIndex };
    }
    throw error instanceof Error
      ? error
      : new Error('Provide --session-token, --seed, or create/import a wallet profile to sign transfers.');
  }
}

async function resolveSecret(value: string | undefined, label: string): Promise<string> {
  if (value && value.trim()) {
    return value.trim();
  }
  return promptInput(`${label}: `);
}
