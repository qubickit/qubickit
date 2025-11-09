import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { createGenerator, remarkAutoTypeTable } from 'fumadocs-typescript';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const generator = createGenerator({
  tsconfigPath: resolve(__dirname, '../../tsconfig.base.json'),
});

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkAutoTypeTable, { generator }]],
  },
});
