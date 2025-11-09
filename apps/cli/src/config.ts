import { DEFAULT_HOSTS } from '@qubickit/core';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

export interface CliConfig {
  configPath: string;
  httpHost: string;
  archiveHost: string;
  statsHost: string;
  queryHost: string;
  walletStorePath: string;
}

const DEFAULT_CONFIG_PATH = process.env.QUBICKIT_CONFIG ?? join(homedir(), '.qubickit', 'config.json');

type RawConfig = Partial<Omit<CliConfig, 'configPath'>>;

export async function loadCliConfig(overrides: Partial<CliConfig> = {}): Promise<CliConfig> {
  const configPath = overrides.configPath ?? DEFAULT_CONFIG_PATH;
  const fileConfig = await readConfigFile(configPath);
  const envConfig: RawConfig = {
    httpHost: process.env.QUBIC_HTTP_HOST,
    archiveHost: process.env.QUBIC_ARCHIVE_HOST,
    statsHost: process.env.QUBIC_STATS_HOST,
    queryHost: process.env.QUBIC_QUERY_HOST,
    walletStorePath: process.env.QUBIC_WALLET_STORE
  };

  const resolved: CliConfig = {
    configPath,
    httpHost: overrides.httpHost ?? fileConfig.httpHost ?? envConfig.httpHost ?? DEFAULT_HOSTS.http,
    archiveHost: overrides.archiveHost ?? fileConfig.archiveHost ?? envConfig.archiveHost ?? DEFAULT_HOSTS.archive,
    statsHost: overrides.statsHost ?? fileConfig.statsHost ?? envConfig.statsHost ?? DEFAULT_HOSTS.stats,
    queryHost: overrides.queryHost ?? fileConfig.queryHost ?? envConfig.queryHost ?? DEFAULT_HOSTS.query,
    walletStorePath:
      overrides.walletStorePath ??
      fileConfig.walletStorePath ??
      envConfig.walletStorePath ??
      join(dirname(configPath), 'wallets.json')
  };

  return resolved;
}

export async function saveCliConfig(config: CliConfig): Promise<void> {
  const payload: RawConfig = {
    httpHost: config.httpHost,
    archiveHost: config.archiveHost,
    statsHost: config.statsHost,
    queryHost: config.queryHost,
    walletStorePath: config.walletStorePath
  };
  await mkdir(dirname(config.configPath), { recursive: true });
  await writeFile(config.configPath, JSON.stringify(payload, null, 2), 'utf8');
}

async function readConfigFile(path: string): Promise<RawConfig> {
  try {
    const buffer = await readFile(path, 'utf8');
    return JSON.parse(buffer) as RawConfig;
  } catch (error) {
    if (isNoEntry(error)) {
      return {};
    }
    throw error;
  }
}

const isNoEntry = (error: unknown): error is NodeJS.ErrnoException =>
  Boolean(error && typeof error === 'object' && 'code' in error && (error as NodeJS.ErrnoException).code === 'ENOENT');
