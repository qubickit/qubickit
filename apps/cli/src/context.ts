import type { CliConfig } from './config';
import { loadCliConfig } from './config';
import { createCliSdk } from './sdk';
import type { QubicSdk } from '@qubickit/sdk';

export interface CliContext {
  config: CliConfig;
  sdk: QubicSdk;
}

export async function createContext(overrides: Partial<CliConfig> = {}): Promise<CliContext> {
  const config = await loadCliConfig(overrides);
  const sdk = createCliSdk(config);
  return { config, sdk };
}
