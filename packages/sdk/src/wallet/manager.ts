import { createIdentityPackage } from '@qubickit/core';
import { z } from 'zod';

import { createMemoryStorageAdapter, type StorageAdapter } from '../adapters';
import { decryptSecretAsString, encryptSecret, type EncryptedPayload } from '../crypto/secret-box';
import { assertNotAborted } from '../internal/abort';
import { randomUUID } from '../internal/random';
import {
  WalletAccountSchema,
  WalletProfileSchema,
  type WalletAccount,
  type WalletProfile,
  SeedSchema,
  ProfileMetadataSchema
} from './schemas';
import { WalletError } from '../errors/sdk-error';

const CreateProfileInputSchema = z.object({
  profileId: z.string().min(1).optional(),
  label: z.string().min(1).optional(),
  seed: SeedSchema,
  passphrase: z.string().min(4),
  derivationIndex: z.number().int().nonnegative().default(0),
  accountLabel: z.string().min(1).optional(),
  metadata: ProfileMetadataSchema.optional()
});

const AddAccountSchema = z.object({
  profileId: z.string().min(1),
  passphrase: z.string().min(4),
  derivationIndex: z.number().int().nonnegative(),
  label: z.string().min(1).optional()
});

const UpdateProfileInputSchema = z.object({
  profileId: z.string().min(1),
  label: z.string().min(1).optional(),
  metadata: ProfileMetadataSchema.optional(),
  mergeMetadata: z.boolean().optional()
});

const SessionTokenOptionsSchema = z.object({
  profileId: z.string().min(1),
  passphrase: z.string().min(4),
  accountId: z.string().min(1).optional(),
  derivationIndex: z.number().int().nonnegative().optional(),
  ttlMs: z.number().int().positive().optional()
});

export type CreateProfileInput = z.input<typeof CreateProfileInputSchema>;
export type AddAccountInput = z.input<typeof AddAccountSchema>;
export type IssueSessionOptions = z.input<typeof SessionTokenOptionsSchema>;
export type UpdateProfileInput = z.input<typeof UpdateProfileInputSchema>;

export interface WalletSessionHandle {
  token: string;
  profileId: string;
  account: WalletAccount;
  identityPackage: Awaited<ReturnType<typeof createIdentityPackage>>;
  expiresAt: number;
  createdAt: number;
}

type WalletSessionRecord = WalletSessionHandle;

export interface WalletManagerOptions {
  storage?: StorageAdapter<typeof WalletProfileSchema>;
  clock?: () => number;
  sessionTtlMs?: number;
}

export class WalletManager {
  private readonly storage: StorageAdapter<typeof WalletProfileSchema>;
  private readonly sessions = new Map<string, WalletSessionRecord>();
  private readonly clock: () => number;
  private readonly sessionTtlMs: number;

  constructor(options: WalletManagerOptions = {}) {
    this.clock = options.clock ?? (() => Date.now());
    this.sessionTtlMs = options.sessionTtlMs ?? 15 * 60 * 1000;
    this.storage =
      options.storage ??
      createMemoryStorageAdapter({
        schema: WalletProfileSchema,
        namespace: 'sdk-wallet-profiles'
      });
  }

  async createProfile(input: CreateProfileInput): Promise<WalletProfile> {
    const payload = CreateProfileInputSchema.parse(input);
    const now = this.clock();
    const encryptedSeed = await encryptSecret(payload.passphrase, payload.seed);
    const account = await this.createAccountFromSeed(payload.seed, {
      derivationIndex: payload.derivationIndex,
      label: payload.accountLabel
    });
    const profile: WalletProfile = {
      profileId: payload.profileId ?? randomUUID(),
      label: payload.label,
      createdAt: now,
      updatedAt: now,
      encryptedSeed,
      accounts: [account],
      metadata: payload.metadata ?? {}
    };
    await this.storage.write(profile.profileId, profile);
    return profile;
  }

  async listProfiles(): Promise<WalletProfile[]> {
    const entries = await this.storage.entries();
    return entries.map(([, profile]) => profile);
  }

  async getProfile(profileId: string): Promise<WalletProfile | undefined> {
    return this.storage.read(profileId);
  }

  async removeProfile(profileId: string): Promise<void> {
    await this.storage.delete(profileId);
  }

  async addAccount(input: AddAccountInput): Promise<WalletAccount> {
    const payload = AddAccountSchema.parse(input);
    const profile = await this.requireProfile(payload.profileId);
    const seed = await this.decryptSeed(profile.profileId, payload.passphrase);
    if (profile.accounts.some((account) => account.derivationIndex === payload.derivationIndex)) {
      throw new WalletError(`Account with index ${payload.derivationIndex} already exists.`, {
        profileId: payload.profileId,
        derivationIndex: payload.derivationIndex
      });
    }
    const account = await this.createAccountFromSeed(seed, {
      derivationIndex: payload.derivationIndex,
      label: payload.label
    });
    profile.accounts.push(account);
    profile.updatedAt = this.clock();
    await this.storage.write(profile.profileId, profile);
    return account;
  }

  async updateProfile(input: UpdateProfileInput): Promise<WalletProfile> {
    const payload = UpdateProfileInputSchema.parse(input);
    const profile = await this.requireProfile(payload.profileId);
    if (payload.label !== undefined) {
      profile.label = payload.label;
    }
    if (payload.metadata !== undefined) {
      if (payload.mergeMetadata === false) {
        profile.metadata = payload.metadata;
      } else {
        profile.metadata = {
          ...(profile.metadata ?? {}),
          ...payload.metadata
        };
      }
    }
    profile.updatedAt = this.clock();
    await this.storage.write(profile.profileId, profile);
    return profile;
  }

  async unlockSeed(profileId: string, passphrase: string): Promise<string> {
    const profile = await this.requireProfile(profileId);
    return this.decryptSeed(profile.profileId, passphrase);
  }

  async issueSessionToken(input: IssueSessionOptions): Promise<WalletSessionHandle> {
    const payload = SessionTokenOptionsSchema.parse(input);
    const profile = await this.requireProfile(payload.profileId);
    const seed = await this.decryptSeed(profile.profileId, payload.passphrase);
    const account = this.resolveAccount(profile, payload);
    const identityPackage = await createIdentityPackage(seed, account.derivationIndex);
    const token = randomUUID();
    const createdAt = this.clock();
    const record: WalletSessionRecord = {
      token,
      profileId: profile.profileId,
      account,
      identityPackage,
      createdAt,
      expiresAt: createdAt + (payload.ttlMs ?? this.sessionTtlMs)
    };
    this.sessions.set(token, record);
    return record;
  }

  async resumeSession(token: string, options?: { extendMs?: number; signal?: AbortSignal }): Promise<WalletSessionHandle> {
    assertNotAborted(options?.signal);
    const record = this.sessions.get(token);
    if (!record) {
      throw new Error('Session token is invalid.');
    }
    const now = this.clock();
    if (record.expiresAt <= now) {
      this.sessions.delete(token);
      throw new Error('Session token has expired.');
    }
    if (options?.extendMs) {
      record.expiresAt = now + options.extendMs;
    }
    return record;
  }

  invalidateSession(token: string) {
    this.sessions.delete(token);
  }

  private async decryptSeed(profileId: string, passphrase: string): Promise<string> {
    const profile = await this.requireProfile(profileId);
    return decryptSecretAsString(passphrase, profile.encryptedSeed as EncryptedPayload);
  }

  private async createAccountFromSeed(
    seed: string,
    options: { derivationIndex: number; label?: string }
  ): Promise<WalletAccount> {
    const now = this.clock();
    const identityPackage = await createIdentityPackage(seed, options.derivationIndex);
    WalletAccountSchema.shape.identity.parse(identityPackage.identity);
    const publicKeyBase64 = Buffer.from(identityPackage.publicKey).toString('base64');
    return {
      accountId: identityPackage.identity,
      label: options.label,
      derivationIndex: options.derivationIndex,
      identity: identityPackage.identity,
      publicKey: publicKeyBase64,
      createdAt: now
    };
  }

  private resolveAccount(profile: WalletProfile, options: { accountId?: string; derivationIndex?: number }): WalletAccount {
    if (options.accountId) {
      const found = profile.accounts.find((account) => account.accountId === options.accountId);
      if (!found) {
        throw new WalletError(`Account ${options.accountId} not found.`, { accountId: options.accountId });
      }
      return found;
    }
    if (typeof options.derivationIndex === 'number') {
      const found = profile.accounts.find((account) => account.derivationIndex === options.derivationIndex);
      if (!found) {
        throw new WalletError(`Account with derivation index ${options.derivationIndex} not found.`, {
          derivationIndex: options.derivationIndex
        });
      }
      return found;
    }
    const primary = profile.accounts[0];
    if (!primary) {
      throw new Error('Profile has no accounts.');
    }
    return primary;
  }

  private async requireProfile(profileId: string): Promise<WalletProfile> {
    const profile = await this.storage.read(profileId);
    if (!profile) throw new WalletError(`Profile ${profileId} not found.`, { profileId });
    return profile;
  }
}
