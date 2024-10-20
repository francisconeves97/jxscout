import * as fs from "fs";
import { discoverChunks } from "./discoverer/discoverer";

function parseArgs(): { path: string; bruteForceLimit: number } {
  const [path, bruteForceLimitArg] = process.argv.slice(2);

  if (!path || !bruteForceLimitArg) {
    throw new Error("Both path and brute force limit arguments are required.");
  }

  const bruteForceLimit = parseInt(bruteForceLimitArg, 10);
  if (isNaN(bruteForceLimit)) {
    throw new Error("Brute force limit must be a valid number.");
  }

  return { path, bruteForceLimit };
}

function readFile(path: string): string {
  return fs.readFileSync(path, "utf-8");
}

try {
  const { path, bruteForceLimit } = parseArgs();

  const code = readFile(path);

  const chunks = discoverChunks(code, bruteForceLimit);

  chunks.forEach((chunk) => console.log(chunk));

  process.exit(0);
} catch (error) {
  // Log the error and exit with error code
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
