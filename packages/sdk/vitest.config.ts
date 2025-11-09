import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    globals: true,
    passWithNoTests: false,
    testTimeout: 10000
  },
  resolve: {
    alias: [
      {
        find: '@qubickit/core',
        replacement: resolve(__dirname, '../core/src/index.ts')
      },
      {
        find: '@qubickit/core/',
        replacement: `${resolve(__dirname, '../core/src')}/`
      }
    ]
  }
});
