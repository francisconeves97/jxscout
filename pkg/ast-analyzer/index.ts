import * as fs from "fs";
import { parse, Program } from "acorn";
import { AnalyzerParams, Analyzer } from "./types";
import { pathsAnalyzer } from "./paths";
import { emailsAnalyzer } from "./emails";

export function parseFile(filePath: string): AnalyzerParams {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  let ast: Program;

  try {
    ast = parse(fileContent, {
      ecmaVersion: "latest",
      sourceType: "module",
      locations: true,
    });
  } catch (err) {
    ast = parse(fileContent, {
      ecmaVersion: "latest",
      sourceType: "script",
      locations: true,
    });
  }

  return { ast, source: fileContent };
}

// Define all available analyzers
const analyzers: Record<string, Analyzer> = {
  paths: pathsAnalyzer,
  emails: emailsAnalyzer,
};

function printUsage() {
  console.error(
    "Usage: tsx pkg/ast-analyzers/index.ts <filepath> <analyzer1,analyzer2,...>"
  );
  console.error("\nAvailable analyzers:");
  Object.entries(analyzers).forEach(([key]) => {
    console.error(`  - ${key}`);
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
      const args = parseFile(filePath);
      results[analyzerName] = analyzer(args);
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
