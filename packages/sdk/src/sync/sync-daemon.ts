import type { SessionClient } from '../session';
import type { MetricsRecorder } from '../telemetry/metrics';
import type { SdkLogger } from '../telemetry/logger';
import { SyncError } from '../errors/sdk-error';

export interface SyncDaemonOptions {
  intervalMs?: number;
  identities?: string[];
}

export class SyncDaemon {
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly sessionClient: SessionClient,
    private readonly logger: SdkLogger,
    private readonly metrics: MetricsRecorder,
    private readonly options: SyncDaemonOptions = {}
  ) {}

  start() {
    if (this.timer) return;
    const interval = this.options.intervalMs ?? 15_000;
    this.logger.info('Sync daemon started', { interval });
    this.timer = setInterval(() => {
      this.runCycle().catch((error) => {
        this.logger.error('Sync cycle failed', { error });
      });
    }, interval);
  }

  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
    this.logger.info('Sync daemon stopped');
  }

  private async runCycle() {
    const identities = this.options.identities ?? [];
    if (!identities.length) {
      return;
    }
    const startedAt = Date.now();
    for (const identity of identities) {
      try {
        await this.sessionClient.listTransactions(identity, { limit: 50, cacheTtlMs: 0 });
        await this.sessionClient.getBalance(identity, { cacheTtlMs: 0 });
        this.metrics.record('sync.identity.ok', 1, { identity });
      } catch (error) {
        this.metrics.record('sync.identity.error', 1, { identity });
        throw new SyncError(`Failed to sync identity ${identity}`, { identity }, error);
      }
    }
    this.metrics.record('sync.cycle.duration', Date.now() - startedAt);
  }
}
