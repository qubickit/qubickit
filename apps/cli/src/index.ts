import { runTransportInspectCommand } from './transport-inspect';

async function main() {
  const command = process.argv[2];
  switch (command) {
    case 'transport:inspect':
      await runTransportInspectCommand();
      break;
    default:
      console.log('Usage: bun run cli transport:inspect');
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
