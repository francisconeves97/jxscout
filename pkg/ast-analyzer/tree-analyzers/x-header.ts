import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const X_HEADER_ANALYZER_NAME = "x-header";

const xHeaderAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for header operations in fetch and XHR
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "setRequestHeader" ||
          node.callee.property.name === "append" ||
          node.callee.property.name === "set") &&
        node.arguments.length >= 1
      ) {
        // Check if the header name starts with 'X-' or 'x-'
        const headerArg = node.arguments[0];
        if (
          headerArg.type === "Literal" &&
          typeof headerArg.value === "string" &&
          /^[Xx]-/.test(headerArg.value)
        ) {
          const match: AnalyzerMatch = {
            filePath: args.filePath,
            analyzerName: X_HEADER_ANALYZER_NAME,
            value: args.source.slice(node.start, node.end),
            start: node.loc.start,
            end: node.loc.end,
            tags: {
              "x-header": true,
              [`x-header-${headerArg.value.toLowerCase()}`]: true,
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

      // Check for X-headers in object literals (e.g., fetch options)
      node.properties.forEach((prop: any) => {
        if (
          prop.type === "Property" &&
          prop.key &&
          ((prop.key.type === "Identifier" && prop.key.name === "headers") ||
            (prop.key.type === "Literal" && prop.key.value === "headers")) &&
          prop.value.type === "ObjectExpression"
        ) {
          prop.value.properties.forEach((headerProp: any) => {
            if (
              headerProp.type === "Property" &&
              headerProp.key &&
              headerProp.key.type === "Literal" &&
              typeof headerProp.key.value === "string" &&
              /^[Xx]-/.test(headerProp.key.value)
            ) {
              const match: AnalyzerMatch = {
                filePath: args.filePath,
                analyzerName: X_HEADER_ANALYZER_NAME,
                value: args.source.slice(headerProp.start, headerProp.end),
                start: node.loc.start,
                end: node.loc.end,
                tags: {
                  "x-header": true,
                  [`x-header-${headerProp.key.value.toLowerCase()}`]: true,
                },
              };

              matchesReturn.push(match);
            }
          });
        }
      });
    },
  };
};

export { xHeaderAnalyzerBuilder };
