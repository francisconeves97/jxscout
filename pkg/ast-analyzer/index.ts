import * as fs from "fs";
import { findUrlPaths } from "./paths";

interface Analyzer {
  name: string;
  analyze: (filePath: string) => any;
}

const analyzers: Record<string, Analyzer> = {
  paths: {
    name: "URL Paths Analyzer",
    analyze: findUrlPaths,
  },
  // Add more analyzers here as they are created
};

function printUsage() {
  console.error(
    "Usage: tsx pkg/ast-analyzers/index.ts <filepath> <analyzer1,analyzer2,...>"
  );
  console.error("\nAvailable analyzers:");
  Object.entries(analyzers).forEach(([key, analyzer]) => {
    console.error(`  - ${key}: ${analyzer.name}`);
  });
  process.exit(1);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    printUsage();
  }

  const [filePath, analyzersList] = args;

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const requestedAnalyzers = analyzersList.split(",");

  const results: Record<string, any> = {};

  for (const analyzerName of requestedAnalyzers) {
    const analyzer = analyzers[analyzerName];
    if (!analyzer) {
      console.error(`Error: Unknown analyzer "${analyzerName}"`);
      printUsage();
    }

    try {
      results[analyzerName] = analyzer.analyze(filePath);
    } catch (error) {
      console.error(`Error running ${analyzerName} analyzer:`, error);
      process.exit(1);
    }
  }

  console.log(JSON.stringify(results));
}

if (require.main === module) {
  main();
}
