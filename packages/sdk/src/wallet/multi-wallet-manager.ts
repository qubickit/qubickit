import { WalletManager } from './manager';
import type { CreateProfileInput } from './manager';
import type { WalletProfile } from './schemas';
import { WalletLimitError, WalletError } from '../errors/sdk-error';

export interface SharedLimit {
  profileId: string;
  maxTransfersPerMinute?: number;
  maxAmount?: number;
}

export interface MultiWalletManagerOptions {
  limits?: SharedLimit[];
}

interface WalletUsage {
  profileId: string;
  transfersInWindow: number;
  windowStartedAt: number;
  amountInWindow: number;
}

const WINDOW_MS = 60_000;

export class MultiWalletManager {
  private readonly usage = new Map<string, WalletUsage>();
  private readonly limits = new Map<string, SharedLimit>();

  constructor(private readonly manager: WalletManager, options: MultiWalletManagerOptions = {}) {
    for (const limit of options.limits ?? []) {
      this.limits.set(limit.profileId, limit);
    }
  }

  async createProfile(input: CreateProfileInput & { limit?: SharedLimit }): Promise<WalletProfile> {
    const profile = await this.manager.createProfile(input);
    if (input.limit) {
      this.limits.set(profile.profileId, { ...input.limit, profileId: profile.profileId });
    }
    return profile;
  }

  getProfile(profileId: string) {
    return this.manager.getProfile(profileId);
  }

  setLimit(limit: SharedLimit) {
    this.limits.set(limit.profileId, limit);
  }

  enforceLimit(profileId: string, amount?: number) {
    const limit = this.limits.get(profileId);
    if (!limit) {
      return;
    }
    const now = Date.now();
    const usage = this.usage.get(profileId) ?? {
      profileId,
      transfersInWindow: 0,
      windowStartedAt: now,
      amountInWindow: 0
    };
    if (now - usage.windowStartedAt > WINDOW_MS) {
      usage.transfersInWindow = 0;
      usage.amountInWindow = 0;
      usage.windowStartedAt = now;
    }
    const nextTransfers = usage.transfersInWindow + 1;
    const nextAmount = usage.amountInWindow + (amount ?? 0);
    if (limit.maxTransfersPerMinute && nextTransfers > limit.maxTransfersPerMinute) {
      throw new WalletLimitError('Transfer rate limit exceeded', { profileId });
    }
    if (limit.maxAmount && nextAmount > limit.maxAmount) {
      throw new WalletLimitError('Transfer amount limit exceeded', { profileId });
    }
    usage.transfersInWindow = nextTransfers;
    usage.amountInWindow = nextAmount;
    this.usage.set(profileId, usage);
  }

  async removeProfile(profileId: string) {
    const existing = await this.manager.getProfile(profileId);
    if (!existing) {
      throw new WalletError(`Profile ${profileId} not found`, { profileId });
    }
    await this.manager.removeProfile(profileId);
    this.limits.delete(profileId);
    this.usage.delete(profileId);
  }

  listLimits() {
    return Array.from(this.limits.values());
  }
}
