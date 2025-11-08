import { describe, expect, it } from 'bun:test';
import { z } from 'zod';
import { parseWithSchema } from '../src/utils/validation';
import { QubicValidationError } from '../src/errors';

describe('parseWithSchema', () => {
  it('returns parsed value', () => {
    const schema = z.object({ value: z.string() });
    const result = parseWithSchema(schema, { value: 'ok' });
    expect(result.value).toBe('ok');
  });

  it('wraps zod errors with QubicValidationError', () => {
    const schema = z.object({ value: z.string() });
    expect(() => parseWithSchema(schema, { value: 1 })).toThrow(QubicValidationError);
  });
});
