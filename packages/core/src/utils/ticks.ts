import { tickRangeSchema } from '../models/shared-schemas';

export interface TickRange {
  from: number;
  to: number;
}

export const parseTickRange = (range: TickRange): TickRange => tickRangeSchema.parse(range);
