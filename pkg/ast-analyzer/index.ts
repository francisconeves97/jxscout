import fs from "fs";
import { ParseResult, parseSync } from "oxc-parser";
import { ancestors as traverse } from "./walker";
import { AnalyzerParams, AnalyzerMatch } from "./types";
import { pathsAnalyzerBuilder } from "./paths";
import { emailsAnalyzerBuilder } from "./emails";
import { messageListenerAnalyzerBuilder } from "./message-listener";
import { hashChangeAnalyzerBuilder } from "./hash-change";
import { regexAnalyzerBuilder } from "./tree-analyzers/regex-pattern";
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
import { localFilePathManipulationAnalyzerBuilder } from "./local-file-path-manipulation";
import { html5StorageManipulationAnalyzerBuilder } from "./html5-storage-manipulation";
import { xpathInjectionAnalyzerBuilder } from "./xpath-injection";
import { domDataManipulationAnalyzerBuilder } from "./dom-data-manipulation";
import { commonSourcesAnalyzerBuilder } from "./common-sources";
import { secretsAnalyzerBuilder } from "./secrets";
import { piiAnalyzerBuilder } from "./pii";
import { fileExtensionsAnalyzerBuilder } from "./extensions";
import { addEventListenerAnalyzerBuilder } from "./tree-analyzers/add-event-listener";
import { cookieAnalyzerBuilder } from "./tree-analyzers/cookie";
import { documentDomainAnalyzerBuilder } from "./tree-analyzers/document-domain";
import { evalAnalyzerBuilder } from "./tree-analyzers/eval";
import { fetchOptionsAnalyzerBuilder } from "./tree-analyzers/fetch-options";
import { fetchAnalyzerBuilder } from "./tree-analyzers/fetch";
import { hostnameAnalyzerBuilder } from "./tree-analyzers/hostname";
import { innerHtmlAnalyzerBuilder } from "./tree-analyzers/inner-html";
import { localStorageAnalyzerBuilder } from "./tree-analyzers/local-storage";
import { locationAnalyzerBuilder } from "./tree-analyzers/location";
import { onhashchangeAnalyzerBuilder } from "./tree-analyzers/onhashchange";
import { onmessageAnalyzerBuilder } from "./tree-analyzers/onmessage";
import path from "path";
import { postmessageAnalyzerBuilder } from "./tree-analyzers/postmessage";
import { regexMatchAnalyzerBuilder } from "./tree-analyzers/regex-match";
import { regexAnalyzerBuilder as regexPatternAnalyzerBuilder } from "./tree-analyzers/regex-pattern";
import { sessionStorageAnalyzerBuilder } from "./tree-analyzers/session-storage";

export function parseFile(filePath: string): AnalyzerParams {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const extension = path.extname(filePath).replace(".", "");

  let parsed: ParseResult;
  try {
    parsed = parseSync(filePath, fileContent, {
      sourceType: "module",
      astType: "ts",
      lang: extension as "js" | "ts" | "jsx" | "tsx",
    });
  } catch (error) {
    parsed = parseSync(filePath, fileContent, {
      sourceType: "module",
      astType: "ts",
      lang: extension as "js" | "ts" | "jsx" | "tsx",
    });
  }

  return { ast: parsed.program, source: fileContent, filePath };
}

function printUsage() {
  console.error("Usage: tsx pkg/ast-analyzers/index.ts <filepath>");
  process.exit(1);
}

export type AnalyzerType =
  | "paths"
  | "emails"
  | "postmessage"
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
  | "ajax-request-header-manipulation"
  | "local-file-path-manipulation"
  | "html5-storage-manipulation"
  | "xpath-injection"
  | "dom-data-manipulation"
  | "common-sources"
  | "secrets"
  | "pii"
  | "extensions"
  | "add-event-listener"
  | "cookie"
  | "document-domain"
  | "eval"
  | "fetch-options"
  | "fetch"
  | "hostname"
  | "inner-html"
  | "local-storage"
  | "session-storage"
  | "location"
  | "onhashchange"
  | "onmessage"
  | "regex-pattern";

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
    if (analyzersToRun && !analyzersToRun.includes(type)) {
      return null;
    }
    return builder(args, results);
  };

  const pathsAnalyzer = createAnalyzer("paths", pathsAnalyzerBuilder);
  const emailsAnalyzer = createAnalyzer("emails", emailsAnalyzerBuilder);
  const postMessageAnalyzer = createAnalyzer(
    "postmessage",
    postmessageAnalyzerBuilder
  );
  const messageListenerAnalyzer = createAnalyzer(
    "message-listener",
    messageListenerAnalyzerBuilder
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
  const localFilePathManipulationAnalyzer = createAnalyzer(
    "local-file-path-manipulation",
    localFilePathManipulationAnalyzerBuilder
  );
  const html5StorageManipulationAnalyzer = createAnalyzer(
    "html5-storage-manipulation",
    html5StorageManipulationAnalyzerBuilder
  );
  const xpathInjectionAnalyzer = createAnalyzer(
    "xpath-injection",
    xpathInjectionAnalyzerBuilder
  );
  const domDataManipulationAnalyzer = createAnalyzer(
    "dom-data-manipulation",
    domDataManipulationAnalyzerBuilder
  );
  const commonSourcesAnalyzer = createAnalyzer(
    "common-sources",
    commonSourcesAnalyzerBuilder
  );
  const secretsAnalyzer = createAnalyzer("secrets", secretsAnalyzerBuilder);
  const piiAnalyzer = createAnalyzer("pii", piiAnalyzerBuilder);
  const extensionsAnalyzer = createAnalyzer(
    "extensions",
    fileExtensionsAnalyzerBuilder
  );
  const addEventListenerAnalyzer = createAnalyzer(
    "add-event-listener",
    addEventListenerAnalyzerBuilder
  );
  const cookieAnalyzer = createAnalyzer("cookie", cookieAnalyzerBuilder);
  const documentDomainAnalyzer = createAnalyzer(
    "document-domain",
    documentDomainAnalyzerBuilder
  );
  const evalAnalyzer = createAnalyzer("eval", evalAnalyzerBuilder);
  const fetchOptionsAnalyzer = createAnalyzer(
    "fetch-options",
    fetchOptionsAnalyzerBuilder
  );
  const fetchAnalyzer = createAnalyzer("fetch", fetchAnalyzerBuilder);
  const hostnameAnalyzer = createAnalyzer("hostname", hostnameAnalyzerBuilder);
  const innerHtmlAnalyzer = createAnalyzer(
    "inner-html",
    innerHtmlAnalyzerBuilder
  );
  const localStorageAnalyzer = createAnalyzer(
    "local-storage",
    localStorageAnalyzerBuilder
  );
  const sessionStorageAnalyzer = createAnalyzer(
    "session-storage",
    sessionStorageAnalyzerBuilder
  );
  const locationAnalyzer = createAnalyzer("location", locationAnalyzerBuilder);
  const onhashchangeAnalyzer = createAnalyzer(
    "onhashchange",
    onhashchangeAnalyzerBuilder
  );
  const onmessageAnalyzer = createAnalyzer(
    "onmessage",
    onmessageAnalyzerBuilder
  );
  const regexMatchAnalyzer = createAnalyzer(
    "regex-match",
    regexMatchAnalyzerBuilder
  );
  const regexPatternAnalyzer = createAnalyzer(
    "regex-pattern",
    regexPatternAnalyzerBuilder
  );

  traverse(args.source, args.ast, {
    Literal(node, ancestors) {
      pathsAnalyzer?.Literal?.(node, ancestors);
      emailsAnalyzer?.Literal?.(node, ancestors);
      regexAnalyzer?.Literal?.(node, ancestors);
      graphqlAnalyzer?.Literal?.(node, ancestors);
      urlsAnalyzer?.Literal?.(node, ancestors);
      secretsAnalyzer?.Literal?.(node, ancestors);
      piiAnalyzer?.Literal?.(node, ancestors);
      extensionsAnalyzer?.Literal?.(node, ancestors);
      hostnameAnalyzer?.Literal?.(node, ancestors);
      regexPatternAnalyzer?.Literal?.(node, ancestors);
    },
    NewExpression(node, ancestors) {
      regexAnalyzer?.NewExpression?.(node, ancestors);
      websocketUrlPoisoningAnalyzer?.NewExpression?.(node, ancestors);
      regexPatternAnalyzer?.NewExpression?.(node, ancestors);
    },
    TemplateLiteral(node, ancestors) {
      pathsAnalyzer?.TemplateLiteral?.(node, ancestors);
      emailsAnalyzer?.TemplateLiteral?.(node, ancestors);
      graphqlAnalyzer?.TemplateLiteral?.(node, ancestors);
      urlsAnalyzer?.TemplateLiteral?.(node, ancestors);
      secretsAnalyzer?.TemplateLiteral?.(node, ancestors);
      piiAnalyzer?.TemplateLiteral?.(node, ancestors);
      extensionsAnalyzer?.TemplateLiteral?.(node, ancestors);
    },
    CallExpression(node, ancestors) {
      pathsAnalyzer?.CallExpression?.(node, ancestors);
      postMessageAnalyzer?.CallExpression?.(node, ancestors);
      messageListenerAnalyzer?.CallExpression?.(node, ancestors);
      domXssAnalyzer?.CallExpression?.(node, ancestors);
      jqueryDomXssAnalyzer?.CallExpression?.(node, ancestors);
      openRedirectionAnalyzer?.CallExpression?.(node, ancestors);
      cookieManipulationAnalyzer?.CallExpression?.(node, ancestors);
      javascriptInjectionAnalyzer?.CallExpression?.(node, ancestors);
      documentDomainManipulationAnalyzer?.CallExpression?.(node, ancestors);
      websocketUrlPoisoningAnalyzer?.CallExpression?.(node, ancestors);
      linkManipulationAnalyzer?.CallExpression?.(node, ancestors);
      ajaxRequestHeaderManipulationAnalyzer?.CallExpression?.(node, ancestors);
      localFilePathManipulationAnalyzer?.CallExpression?.(node, ancestors);
      html5StorageManipulationAnalyzer?.CallExpression?.(node, ancestors);
      xpathInjectionAnalyzer?.CallExpression?.(node, ancestors);
      domDataManipulationAnalyzer?.CallExpression?.(node, ancestors);
      commonSourcesAnalyzer?.CallExpression?.(node, ancestors);
      addEventListenerAnalyzer?.CallExpression?.(node, ancestors);
      cookieAnalyzer?.CallExpression?.(node, ancestors);
      documentDomainAnalyzer?.CallExpression?.(node, ancestors);
      evalAnalyzer?.CallExpression?.(node, ancestors);
      fetchOptionsAnalyzer?.CallExpression?.(node, ancestors);
      fetchAnalyzer?.CallExpression?.(node, ancestors);
      hostnameAnalyzer?.CallExpression?.(node, ancestors);
      innerHtmlAnalyzer?.CallExpression?.(node, ancestors);
      localStorageAnalyzer?.CallExpression?.(node, ancestors);
      sessionStorageAnalyzer?.CallExpression?.(node, ancestors);
      locationAnalyzer?.CallExpression?.(node, ancestors);
      onhashchangeAnalyzer?.CallExpression?.(node, ancestors);
      onmessageAnalyzer?.CallExpression?.(node, ancestors);
      regexMatchAnalyzer?.CallExpression?.(node, ancestors);
    },
    AssignmentExpression(node, ancestors) {
      pathsAnalyzer?.AssignmentExpression?.(node, ancestors);
      postMessageAnalyzer?.AssignmentExpression?.(node, ancestors);
      hashChangeAnalyzer?.AssignmentExpression?.(node, ancestors);
      domXssAnalyzer?.AssignmentExpression?.(node, ancestors);
      jqueryDomXssAnalyzer?.AssignmentExpression?.(node, ancestors);
      openRedirectionAnalyzer?.AssignmentExpression?.(node, ancestors);
      cookieManipulationAnalyzer?.AssignmentExpression?.(node, ancestors);
      javascriptInjectionAnalyzer?.AssignmentExpression?.(node, ancestors);
      documentDomainManipulationAnalyzer?.AssignmentExpression?.(
        node,
        ancestors
      );
      websocketUrlPoisoningAnalyzer?.AssignmentExpression?.(node, ancestors);
      linkManipulationAnalyzer?.AssignmentExpression?.(node, ancestors);
      ajaxRequestHeaderManipulationAnalyzer?.AssignmentExpression?.(
        node,
        ancestors
      );
      localFilePathManipulationAnalyzer?.AssignmentExpression?.(
        node,
        ancestors
      );
      html5StorageManipulationAnalyzer?.AssignmentExpression?.(node, ancestors);
      xpathInjectionAnalyzer?.AssignmentExpression?.(node, ancestors);
      domDataManipulationAnalyzer?.AssignmentExpression?.(node, ancestors);
      commonSourcesAnalyzer?.AssignmentExpression?.(node, ancestors);
      addEventListenerAnalyzer?.AssignmentExpression?.(node, ancestors);
      cookieAnalyzer?.AssignmentExpression?.(node, ancestors);
      documentDomainAnalyzer?.AssignmentExpression?.(node, ancestors);
      fetchOptionsAnalyzer?.AssignmentExpression?.(node, ancestors);
      fetchAnalyzer?.AssignmentExpression?.(node, ancestors);
      hostnameAnalyzer?.AssignmentExpression?.(node, ancestors);
      innerHtmlAnalyzer?.AssignmentExpression?.(node, ancestors);
      localStorageAnalyzer?.AssignmentExpression?.(node, ancestors);
      sessionStorageAnalyzer?.AssignmentExpression?.(node, ancestors);
      locationAnalyzer?.AssignmentExpression?.(node, ancestors);
      onhashchangeAnalyzer?.AssignmentExpression?.(node, ancestors);
      onmessageAnalyzer?.AssignmentExpression?.(node, ancestors);
    },
    MemberExpression(node, ancestors) {
      pathsAnalyzer?.MemberExpression?.(node, ancestors);
      postMessageAnalyzer?.MemberExpression?.(node, ancestors);
      domXssAnalyzer?.MemberExpression?.(node, ancestors);
      jqueryDomXssAnalyzer?.MemberExpression?.(node, ancestors);
      openRedirectionAnalyzer?.MemberExpression?.(node, ancestors);
      cookieManipulationAnalyzer?.MemberExpression?.(node, ancestors);
      javascriptInjectionAnalyzer?.MemberExpression?.(node, ancestors);
      documentDomainManipulationAnalyzer?.MemberExpression?.(node, ancestors);
      websocketUrlPoisoningAnalyzer?.MemberExpression?.(node, ancestors);
      linkManipulationAnalyzer?.MemberExpression?.(node, ancestors);
      ajaxRequestHeaderManipulationAnalyzer?.MemberExpression?.(
        node,
        ancestors
      );
      localFilePathManipulationAnalyzer?.MemberExpression?.(node, ancestors);
      html5StorageManipulationAnalyzer?.MemberExpression?.(node, ancestors);
      xpathInjectionAnalyzer?.MemberExpression?.(node, ancestors);
      domDataManipulationAnalyzer?.MemberExpression?.(node, ancestors);
      commonSourcesAnalyzer?.MemberExpression?.(node, ancestors);
      addEventListenerAnalyzer?.MemberExpression?.(node, ancestors);
      cookieAnalyzer?.MemberExpression?.(node, ancestors);
      documentDomainAnalyzer?.MemberExpression?.(node, ancestors);
      fetchOptionsAnalyzer?.MemberExpression?.(node, ancestors);
      fetchAnalyzer?.MemberExpression?.(node, ancestors);
      hostnameAnalyzer?.MemberExpression?.(node, ancestors);
      innerHtmlAnalyzer?.MemberExpression?.(node, ancestors);
      localStorageAnalyzer?.MemberExpression?.(node, ancestors);
      sessionStorageAnalyzer?.MemberExpression?.(node, ancestors);
      locationAnalyzer?.MemberExpression?.(node, ancestors);
    },
    VariableDeclarator(node, ancestors) {
      documentDomainAnalyzer?.VariableDeclarator?.(node, ancestors);
    },
    ObjectExpression(node, ancestors) {
      fetchOptionsAnalyzer?.ObjectExpression?.(node, ancestors);
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
