import * as fs from "fs";
import { parse, Program } from "acorn";
import {
  createRegexAnalyzer,
  URL_PATH_REGEX,
  EMAIL_ADDRESS_REGEX,
} from "./regex-analyzer";

// Cache for parsed ASTs to avoid re-parsing the same file
const astCache = new Map<string, { ast: Program; content: string }>();

interface Analyzer {
  analyze: (filePath: string) => any;
}

// Function to parse a file and return its AST and content
function parseFile(filePath: string): { ast: Program; content: string } {
  // Check if we already have this file in the cache
  if (astCache.has(filePath)) {
    return astCache.get(filePath)!;
  }

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

  const result = { ast, content: fileContent };
  astCache.set(filePath, result);
  return result;
}

// Define all available analyzers
const analyzers: Record<string, Analyzer> = {
  // URL Paths analyzer
  paths: {
    analyze: (filePath: string) => {
      const { ast, content } = parseFile(filePath);
      return createRegexAnalyzer({ regex: URL_PATH_REGEX })(ast, content);
    },
  },

  // Email Addresses analyzer
  emails: {
    analyze: (filePath: string) => {
      const { ast, content } = parseFile(filePath);
      return createRegexAnalyzer({
        regex: EMAIL_ADDRESS_REGEX,
      })(ast, content);
    },
  },

  // Add more analyzers here as needed
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
