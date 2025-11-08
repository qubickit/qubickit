import { z, type ZodTypeAny } from 'zod';
import { QubicValidationError } from '../errors';

export const parseWithSchema = <TSchema extends ZodTypeAny>(schema: TSchema, payload: unknown) => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new QubicValidationError(error.issues);
    }
    throw error;
  }
};
