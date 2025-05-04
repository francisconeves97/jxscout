import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const URL_ANALYZER_NAME = "url";

const urlAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    NewExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for URL constructor
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "URL" &&
        node.arguments.length >= 1
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: URL_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "url-creation": true,
            ...(node.arguments.length >= 2 ? { "has-base-url": true } : {}),
          },
        };

        matchesReturn.push(match);
      }
    },
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for URL property access
      if (
        node.object.type === "NewExpression" &&
        node.object.callee.type === "Identifier" &&
        node.object.callee.name === "URL" &&
        node.property.type === "Identifier" &&
        [
          "href",
          "protocol",
          "host",
          "hostname",
          "port",
          "pathname",
          "search",
          "hash",
        ].includes(node.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: URL_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "url-property": true,
            [`url-${node.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { urlAnalyzerBuilder };
