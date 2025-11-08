import { z, type ZodTypeAny } from 'zod';

import { decryptSecretAsString, encryptSecret } from '../crypto/secret-box';
import type { PersistenceAdapter } from './types';

export interface SecurePersistenceAdapterOptions<TSchema extends ZodTypeAny> {
  adapter: PersistenceAdapter<string>;
  schema: TSchema;
  passphrase: string;
}

export function createSecurePersistenceAdapter<TSchema extends ZodTypeAny>(
  options: SecurePersistenceAdapterOptions<TSchema>
): PersistenceAdapter<z.infer<TSchema>> {
  const schema = options.schema;
  const wrap = async (value: z.infer<TSchema>) => {
    const json = JSON.stringify(schema.parse(value));
    const payload = await encryptSecret(options.passphrase, json);
    return JSON.stringify(payload);
  };

  const unwrap = async (value: string | undefined) => {
    if (!value) return undefined;
    const payload = JSON.parse(value);
    const decrypted = await decryptSecretAsString(options.passphrase, payload);
    return schema.parse(JSON.parse(decrypted));
  };

  return {
    async list() {
      const entries = await options.adapter.list();
      const result: Array<[string, z.infer<TSchema>]> = [];
      for (const [key, value] of entries) {
        const decrypted = await unwrap(value);
        if (decrypted) {
          result.push([key, decrypted]);
        }
      }
      return result;
    },
    async read(id) {
      const raw = await options.adapter.read(id);
      return unwrap(raw);
    },
    async write(id, value) {
      const wrapped = await wrap(value);
      await options.adapter.write(id, wrapped);
    },
    async delete(id) {
      await options.adapter.delete(id);
    },
    async clear() {
      await options.adapter.clear();
    }
  };
}
