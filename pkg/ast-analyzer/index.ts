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
import { hashChangeAnalyzerBuilder } from "./hash-change";
import { regexAnalyzerBuilder } from "./regex";
import { domXssAnalyzerBuilder } from "./dom-xss";
import { graphqlAnalyzerBuilder } from "./graphql";
import { urlsAnalyzerBuilder } from "./urls";
import { jqueryDomXssAnalyzerBuilder } from "./jquery-dom-xss";
import { openRedirectionAnalyzerBuilder } from "./open-redirection";
import { cookieManipulationAnalyzerBuilder } from "./cookie-manipulation";
import { javascriptInjectionAnalyzerBuilder } from "./javascript-injection";
import { documentDomainManipulationAnalyzerBuilder } from "./document-domain-manipulation";
import { websocketUrlPoisoningAnalyzerBuilder } from "./websocket-url-poisoning";
import { linkManipulationAnalyzerBuilder } from "./link-manipulation";
import { ajaxRequestHeaderManipulationAnalyzerBuilder } from "./ajax-request-header-manipulation";

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

export type AnalyzerType =
  | "paths"
  | "emails"
  | "post-message"
  | "message-listener"
  | "regex-match"
  | "hash-change"
  | "regex"
  | "dom-xss"
  | "graphql"
  | "urls"
  | "jquery-dom-xss"
  | "open-redirection"
  | "cookie-manipulation"
  | "javascript-injection"
  | "document-domain-manipulation"
  | "websocket-url-poisoning"
  | "link-manipulation"
  | "ajax-request-header-manipulation";

export function analyzeFile(
  filePath: string,
  analyzersToRun?: AnalyzerType[]
): AnalyzerMatch[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Error: File not found: ${filePath}`);
  }

  const results: AnalyzerMatch[] = [];
  const args = parseFile(filePath);

  const createAnalyzer = <T extends { [key: string]: any }>(
    type: AnalyzerType,
    builder: (args: AnalyzerParams, results: AnalyzerMatch[]) => T
  ): T | null => {
    return !analyzersToRun || analyzersToRun.includes(type)
      ? builder(args, results)
      : null;
  };

  const pathsAnalyzer = createAnalyzer("paths", pathsAnalyzerBuilder);
  const emailsAnalyzer = createAnalyzer("emails", emailsAnalyzerBuilder);
  const postMessageAnalyzer = createAnalyzer(
    "post-message",
    postMessageAnalyzerBuilder
  );
  const messageListenerAnalyzer = createAnalyzer(
    "message-listener",
    messageListenerAnalyzerBuilder
  );
  const regexMatchAnalyzer = createAnalyzer(
    "regex-match",
    regexMatchAnalyzerBuilder
  );
  const hashChangeAnalyzer = createAnalyzer(
    "hash-change",
    hashChangeAnalyzerBuilder
  );
  const regexAnalyzer = createAnalyzer("regex", regexAnalyzerBuilder);
  const domXssAnalyzer = createAnalyzer("dom-xss", domXssAnalyzerBuilder);
  const graphqlAnalyzer = createAnalyzer("graphql", graphqlAnalyzerBuilder);
  const urlsAnalyzer = createAnalyzer("urls", urlsAnalyzerBuilder);
  const jqueryDomXssAnalyzer = createAnalyzer(
    "jquery-dom-xss",
    jqueryDomXssAnalyzerBuilder
  );
  const openRedirectionAnalyzer = createAnalyzer(
    "open-redirection",
    openRedirectionAnalyzerBuilder
  );
  const cookieManipulationAnalyzer = createAnalyzer(
    "cookie-manipulation",
    cookieManipulationAnalyzerBuilder
  );
  const javascriptInjectionAnalyzer = createAnalyzer(
    "javascript-injection",
    javascriptInjectionAnalyzerBuilder
  );
  const documentDomainManipulationAnalyzer = createAnalyzer(
    "document-domain-manipulation",
    documentDomainManipulationAnalyzerBuilder
  );
  const websocketUrlPoisoningAnalyzer = createAnalyzer(
    "websocket-url-poisoning",
    websocketUrlPoisoningAnalyzerBuilder
  );
  const linkManipulationAnalyzer = createAnalyzer(
    "link-manipulation",
    linkManipulationAnalyzerBuilder
  );
  const ajaxRequestHeaderManipulationAnalyzer = createAnalyzer(
    "ajax-request-header-manipulation",
    ajaxRequestHeaderManipulationAnalyzerBuilder
  );

  traverse(args.ast, {
    Literal(node, state, ancestors) {
      pathsAnalyzer?.Literal?.(node, state, ancestors);
      emailsAnalyzer?.Literal?.(node, state, ancestors);
      regexAnalyzer?.Literal?.(node, state, ancestors);
      graphqlAnalyzer?.Literal?.(node, state, ancestors);
      urlsAnalyzer?.Literal?.(node, state, ancestors);
    },
    NewExpression(node, state, ancestors) {
      regexAnalyzer?.NewExpression?.(node, state, ancestors);
      websocketUrlPoisoningAnalyzer?.NewExpression?.(node, state, ancestors);
    },
    TemplateLiteral(node, state, ancestors) {
      pathsAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      emailsAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      graphqlAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      urlsAnalyzer?.TemplateLiteral?.(node, state, ancestors);
    },
    CallExpression(node, state, ancestors) {
      postMessageAnalyzer?.CallExpression?.(node, state, ancestors);
      messageListenerAnalyzer?.CallExpression?.(node, state, ancestors);
      regexMatchAnalyzer?.CallExpression?.(node, state, ancestors);
      hashChangeAnalyzer?.CallExpression?.(node, state, ancestors);
      domXssAnalyzer?.CallExpression?.(node, state, ancestors);
      jqueryDomXssAnalyzer?.CallExpression?.(node, state, ancestors);
      openRedirectionAnalyzer?.CallExpression?.(node, state, ancestors);
      javascriptInjectionAnalyzer?.CallExpression?.(node, state, ancestors);
      ajaxRequestHeaderManipulationAnalyzer?.CallExpression?.(
        node,
        state,
        ancestors
      );
    },
    AssignmentExpression(node, state, ancestors) {
      messageListenerAnalyzer?.AssignmentExpression?.(node, state, ancestors);
      hashChangeAnalyzer?.AssignmentExpression?.(node, state, ancestors);
      domXssAnalyzer?.AssignmentExpression?.(node, state, ancestors);
      cookieManipulationAnalyzer?.AssignmentExpression?.(
        node,
        state,
        ancestors
      );
      linkManipulationAnalyzer?.AssignmentExpression?.(node, state, ancestors);
    },
    MemberExpression(node, state, ancestors) {
      openRedirectionAnalyzer?.MemberExpression?.(node, state, ancestors);
      documentDomainManipulationAnalyzer?.MemberExpression?.(
        node,
        state,
        ancestors
      );
      linkManipulationAnalyzer?.MemberExpression?.(node, state, ancestors);
    },
  });

  return results;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    printUsage();
  }

  const [filePath] = args;

  try {
    const results = analyzeFile(filePath);
    console.log(JSON.stringify(results));
  } catch (error) {
    console.error(`Error running ast analysis:`, error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
