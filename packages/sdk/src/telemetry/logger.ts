/* eslint-disable no-console */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface SdkLogger {
  debug(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
}

const consoleLogger: SdkLogger = {
  debug(message, context) {
    console.debug('[sdk]', message, context ?? '');
  },
  info(message, context) {
    console.info('[sdk]', message, context ?? '');
  },
  warn(message, context) {
    console.warn('[sdk]', message, context ?? '');
  },
  error(message, context) {
    console.error('[sdk]', message, context ?? '');
  }
};

export const createLogger = (logger?: Partial<SdkLogger>): SdkLogger => ({
  debug: logger?.debug ?? consoleLogger.debug,
  info: logger?.info ?? consoleLogger.info,
  warn: logger?.warn ?? consoleLogger.warn,
  error: logger?.error ?? consoleLogger.error
});
