#!/usr/bin/env node
import {run} from './install';

function parseArgs(args: string[]): Record<string,string> {
  const options: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const eq = arg.indexOf('=');
      if (eq !== -1) {
        const key = arg.slice(2, eq);
        const val = arg.slice(eq + 1);
        options[key] = val;
      } else {
        const key = arg.slice(2);
        const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'true';
        options[key] = val;
      }
    }
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  for (const [key, value] of Object.entries(options)) {
    process.env[key] = value;
  }
  await run();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
