import { createHash } from 'crypto';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const RAW_DIR = join(process.cwd(), 'schemas', 'raw');
const SNAPSHOT_DIR = join(process.cwd(), '..', '..', 'schemas', 'swagger');

async function hashFile(path: string) {
  const data = await readFile(path);
  return createHash('sha256').update(data).digest('hex');
}

async function listJson(dir: string) {
  return (await readdir(dir)).filter((file) => file.endsWith('.json'));
}

async function main() {
  const files = await listJson(RAW_DIR);
  const mismatches: string[] = [];
  for (const file of files) {
    const rawPath = join(RAW_DIR, file);
    const snapshotPath = join(SNAPSHOT_DIR, file);
    try {
      const rawHash = await hashFile(rawPath);
      const snapHash = await hashFile(snapshotPath);
      if (rawHash !== snapHash) {
        mismatches.push(file);
      }
    } catch (error) {
      mismatches.push(`${file} (missing counterpart) - ${error}`);
    }
  }

  if (!mismatches.length) {
    console.log('Schema drift check passed.');
    return;
  }
  console.error('Schema drift detected in:', mismatches.join(', '));
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
