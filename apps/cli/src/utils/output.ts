import chalk from 'chalk';

let verboseEnabled =
  process.env.QUBICKIT_VERBOSE === '1' ||
  process.env.QUBICKIT_VERBOSE?.toLowerCase() === 'true';

export const setVerboseLogging = (enabled: boolean) => {
  verboseEnabled = enabled;
};

export const isVerboseLogging = () => verboseEnabled;

export const logInfo = (message: string, ...args: unknown[]) => {
  console.log(chalk.cyan('ℹ'), chalk.cyan(message), ...args);
};

export const logSuccess = (message: string, ...args: unknown[]) => {
  console.log(chalk.green('✔'), chalk.green(message), ...args);
};

export const logWarn = (message: string, ...args: unknown[]) => {
  console.warn(chalk.yellow('⚠'), chalk.yellow(message), ...args);
};

export const logError = (message: string, ...args: unknown[]) => {
  console.error(chalk.red('✖'), chalk.red(message), ...args);
};

export const logVerbose = (message: string, ...args: unknown[]) => {
  if (!verboseEnabled) return;
  console.log(chalk.gray('…'), chalk.gray(message), ...args);
};

export function printJson(value: unknown) {
  console.log(JSON.stringify(value, null, 2));
}

export function printTable<T extends Record<string, unknown>>(rows: T[]) {
  if (!rows.length) {
    console.log('(empty)');
    return;
  }
  console.table(rows);
}

export function printKeyValue(record: Record<string, unknown>) {
  for (const [key, value] of Object.entries(record)) {
    console.log(`${chalk.gray(key)}: ${formatValue(value)}`);
  }
}

const formatValue = (value: unknown) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};
