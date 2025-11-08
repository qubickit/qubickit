import { describe, expect, it } from 'bun:test';
import type { ZodIssue } from 'zod';
import { QubicCircuitOpenError, QubicHttpError, QubicTimeoutError, QubicValidationError } from '../src/errors';

describe('Errors', () => {
  it('captures HTTP metadata', () => {
    const error = new QubicHttpError(500, { ok: false });
    expect(error.status).toBe(500);
    expect(error.body).toEqual({ ok: false });
  });

  it('wraps validation issues', () => {
    const issues: ZodIssue[] = [
      {
        code: 'custom',
        message: 'bad payload',
        path: [],
        fatal: false
      } as ZodIssue
    ];
    const error = new QubicValidationError(issues);
    expect(error.issues[0]?.message).toContain('bad');
  });

  it('exposes timeout messages', () => {
    const error = new QubicTimeoutError();
    expect(error.message).toContain('timed out');
  });

  it('describes circuit breaker state', () => {
    const error = new QubicCircuitOpenError('https://primary.example.com');
    expect(error.message).toContain('Circuit breaker open');
    expect(error.host).toBe('https://primary.example.com');
  });
});
