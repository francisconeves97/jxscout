import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const REQUEST_METHOD_ANALYZER_NAME = "request-method";

const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
  "TRACE",
  "CONNECT",
];

const requestMethodAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for XHR open method
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "open" &&
        node.arguments.length >= 2
      ) {
        const methodArg = node.arguments[0];
        if (
          methodArg.type === "Literal" &&
          typeof methodArg.value === "string" &&
          HTTP_METHODS.includes(methodArg.value.toUpperCase())
        ) {
          const match: AnalyzerMatch = {
            filePath: args.filePath,
            analyzerName: REQUEST_METHOD_ANALYZER_NAME,
            value: args.source.slice(node.start, node.end),
            start: node.loc.start,
            end: node.loc.end,
            tags: {
              "request-method": true,
              [`method-${methodArg.value.toLowerCase()}`]: true,
              "xhr-method": true,
            },
          };

          matchesReturn.push(match);
        }
      }
    },
    ObjectExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for method in fetch options
      node.properties.forEach((prop: any) => {
        if (
          prop.type === "Property" &&
          prop.key &&
          prop.key.type === "Identifier" &&
          prop.key.name === "method" &&
          prop.value.type === "Literal" &&
          typeof prop.value.value === "string" &&
          HTTP_METHODS.includes(prop.value.value.toUpperCase())
        ) {
          const match: AnalyzerMatch = {
            filePath: args.filePath,
            analyzerName: REQUEST_METHOD_ANALYZER_NAME,
            value: args.source.slice(prop.start, prop.end),
            start: node.loc.start,
            end: node.loc.end,
            tags: {
              "request-method": true,
              [`method-${prop.value.value.toLowerCase()}`]: true,
              "fetch-method": true,
            },
          };

          matchesReturn.push(match);
        }
      });
    },
  };
};

export { requestMethodAnalyzerBuilder };
