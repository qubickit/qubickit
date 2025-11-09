import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  dts: false,
  target: 'node20',
  platform: 'node',
  outDir: 'dist',
  banner: {
    js: '#!/usr/bin/env node'
  }
});
