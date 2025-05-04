import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const JAVASCRIPT_INJECTION_ANALYZER_NAME = "javascript-injection";

const javascriptInjectionAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for eval()
      if (node.callee.type === "Identifier" && node.callee.name === "eval") {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for Function()
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "Function"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for setTimeout()
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "setTimeout"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for setInterval()
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "setInterval"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for setImmediate()
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "setImmediate"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for execCommand()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "execCommand"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for execScript()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "execScript"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for msSetImmediate()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "msSetImmediate"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for crypto.generateCRMFRequest()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "crypto" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "generateCRMFRequest"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for range.createContextualFragment()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "range" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "createContextualFragment"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { javascriptInjectionAnalyzerBuilder };
