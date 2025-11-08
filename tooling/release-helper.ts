#!/usr/bin/env bun

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { $ } from 'bun';

const packages: Record<string, string> = {
  core: 'packages/core',
  sdk: 'packages/sdk',
  web: 'packages/web',
  cli: 'apps/cli'
};

const args = Bun.argv.slice(2);

const packageArgIndex = args.findIndex((arg) => arg === '--package');
const packageName =
  (packageArgIndex !== -1 ? args[packageArgIndex + 1] : undefined) ??
  args.find((arg) => arg.startsWith('--package='))?.split('--package=')[1];

if (!packageName) {
  console.error('Usage: bun run tooling/release-helper.ts --package <core|sdk|web|cli>');
  process.exit(1);
}

const packageDir = packages[packageName as keyof typeof packages];

if (!packageDir) {
  console.error(`Unknown package "${packageName}". Available: ${Object.keys(packages).join(', ')}`);
  process.exit(1);
}

const cwd = join(process.cwd(), packageDir);
const pkgPath = join(cwd, 'package.json');
const pkgJson = JSON.parse(await readFile(pkgPath, 'utf8'));

const gitStatus = await $`git status --porcelain`.text();
if (gitStatus.trim().length > 0) {
  console.warn('[release] Warning: working tree is not clean. Consider committing or stashing changes first.\n');
}

if (pkgJson.version === '0.0.0') {
  console.warn(`[release] Warning: ${pkgJson.name} is still version 0.0.0. Consider updating package.json before publishing.\n`);
}

console.log('\n[release] Running tests');
await $({ cwd })`bun run test`;

console.log('\n[release] Building package');
await $({ cwd })`bun run build`;

console.log('\n[release] Verification complete');
console.log(`[release] Package: ${pkgJson.name}`);
console.log(`[release] Version: ${pkgJson.version}`);
console.log(`[release] Directory: ${packageDir}`);
console.log('\nNext steps:');
console.log(`  1. npm publish ${packageName === 'core' ? '--access public' : ''} (run inside ${packageDir})`);
console.log('  2. Tag the release and push: git tag vX.Y.Z && git push origin vX.Y.Z');
console.log('  3. Trigger the GitHub release workflow if desired.');
