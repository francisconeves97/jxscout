import fs from "fs";
import { Program } from "acorn";
import { parse } from "acorn-loose";
import { ancestor as traverse } from "acorn-walk";
import { AnalyzerParams, AnalyzerMatch } from "./types";
import { pathsAnalyzerBuilder } from "./paths";
import { emailsAnalyzerBuilder } from "./emails";
import { postMessageAnalyzerBuilder } from "./post-message";
import { messageListenerAnalyzerBuilder } from "./message-listener";
import { regexMatchAnalyzerBuilder } from "./regex-match";

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
    const postMessageAnalyzer = postMessageAnalyzerBuilder(args, results);
    const messageListenerAnalyzer = messageListenerAnalyzerBuilder(
      args,
      results
    );
    const regexMatchAnalyzer = regexMatchAnalyzerBuilder(args, results);

    traverse(args.ast, {
      Literal(node, state, ancestors) {
        pathsAnalyzer.Literal?.(node, state, ancestors);
        emailsAnalyzer.Literal?.(node, state, ancestors);
      },

      TemplateLiteral(node, state, ancestors) {
        pathsAnalyzer.TemplateLiteral?.(node, state, ancestors);
        emailsAnalyzer.TemplateLiteral?.(node, state, ancestors);
      },

      CallExpression(node, state, ancestors) {
        postMessageAnalyzer.CallExpression?.(node, state, ancestors);
        messageListenerAnalyzer.CallExpression?.(node, state, ancestors);
        regexMatchAnalyzer.CallExpression?.(node, state, ancestors);
      },

      AssignmentExpression(node, state, ancestors) {
        messageListenerAnalyzer.AssignmentExpression?.(node, state, ancestors);
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
