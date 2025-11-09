export type QubicSdkErrorCode =
  | 'WALLET_NOT_FOUND'
  | 'WALLET_LIMIT_EXCEEDED'
  | 'TRANSFER_FAILED'
  | 'SYNC_FAILED'
  | 'UNEXPECTED';

export interface QubicSdkErrorOptions {
  code: QubicSdkErrorCode;
  message: string;
  cause?: unknown;
  remediation?: string;
  context?: Record<string, unknown>;
}

export class QubicSdkError extends Error {
  readonly code: QubicSdkErrorCode;
  readonly remediation?: string;
  readonly context?: Record<string, unknown>;

  constructor(options: QubicSdkErrorOptions) {
    super(options.message);
    this.name = 'QubicSdkError';
    this.code = options.code;
    this.remediation = options.remediation;
    this.context = options.context;
    if (options.cause) {
      this.cause = options.cause;
    }
  }
}

export class WalletError extends QubicSdkError {
  constructor(message: string, context?: Record<string, unknown>, cause?: unknown) {
    super({
      code: 'WALLET_NOT_FOUND',
      message,
      context,
      cause,
      remediation: 'Verify the wallet profile exists and the passphrase is correct.'
    });
    this.name = 'WalletError';
  }
}

export class WalletLimitError extends QubicSdkError {
  constructor(message: string, context?: Record<string, unknown>) {
    super({
      code: 'WALLET_LIMIT_EXCEEDED',
      message,
      context,
      remediation: 'Adjust the shared wallet limit or wait for the next sync cycle.'
    });
    this.name = 'WalletLimitError';
  }
}

export class TransferError extends QubicSdkError {
  constructor(message: string, context?: Record<string, unknown>, cause?: unknown) {
    super({
      code: 'TRANSFER_FAILED',
      message,
      context,
      cause,
      remediation: 'Check the destination identity, network status, and retry.'
    });
    this.name = 'TransferError';
  }
}

export class SyncError extends QubicSdkError {
  constructor(message: string, context?: Record<string, unknown>, cause?: unknown) {
    super({
      code: 'SYNC_FAILED',
      message,
      context,
      cause,
      remediation: 'Review connectivity and ensure the session token is valid.'
    });
    this.name = 'SyncError';
  }
}
