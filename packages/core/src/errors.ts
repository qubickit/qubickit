import type { ZodIssue } from 'zod';

export class QubicHttpError extends Error {
  constructor(public status: number, public body: unknown) {
    super(`HTTP ${status}`);
    this.name = 'QubicHttpError';
  }
}

export class QubicValidationError extends Error {
  constructor(public issues: ZodIssue[]) {
    super('Response validation failed');
    this.name = 'QubicValidationError';
  }
}

export class QubicTimeoutError extends Error {
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'QubicTimeoutError';
  }
}

export class QubicCircuitOpenError extends Error {
  constructor(public host: string) {
    super(`Circuit breaker open for host ${host}`);
    this.name = 'QubicCircuitOpenError';
  }
}
