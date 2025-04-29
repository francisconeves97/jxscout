import * as fs from "fs";
import { parse, Program } from "acorn";
import { simple as traverse } from "acorn-walk";
import { AnalyzerParams, Analyzer, AnalyzerMatch } from "./types";
import { pathsAnalyzerBuilder } from "./paths";
import { emailsAnalyzerBuilder } from "./emails";

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

function printUsage() {
  console.error("Usage: tsx pkg/ast-analyzers/index.ts <filepath>");
  process.exit(1);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    printUsage();
  }

  const [filePath] = args;

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const results: AnalyzerMatch[] = [];

  try {
    const args = parseFile(filePath);

    const pathsAnalyzer = pathsAnalyzerBuilder(args, results);
    const emailsAnalyzer = emailsAnalyzerBuilder(args, results);

    traverse(args.ast, {
      Literal(node, state) {
        pathsAnalyzer.Literal?.(node, state);
        emailsAnalyzer.Literal?.(node, state);
      },

      TemplateLiteral(node, state) {
        pathsAnalyzer.TemplateLiteral?.(node, state);
        emailsAnalyzer.TemplateLiteral?.(node, state);
      },
    });

    console.log(JSON.stringify(results));
  } catch (error) {
    console.error(`Error running ast analysis:`, error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
