import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const REGEX_MATCH_ANALYZER_NAME = "regex-match";

const regexMatchAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for string.match() calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "match" &&
        (node.callee.object.type === "Identifier" ||
          (node.callee.object.type === "Literal" &&
            typeof node.callee.object.value === "string")) &&
        node.arguments.length > 0 &&
        (node.arguments[0].type === "Literal" ||
          (node.arguments[0] as any).regex)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_MATCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-match": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for RegExp.test() calls and regex literal test() calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "test" &&
        ((node.callee.object.type === "NewExpression" &&
          node.callee.object.callee.type === "Identifier" &&
          node.callee.object.callee.name === "RegExp") ||
          (node.callee.object.type === "Identifier" &&
            node.callee.object.name === "RegExp") ||
          (node.callee.object.type === "Identifier" &&
            node.callee.object.name === "regex") ||
          (node.callee.object.type === "Literal" &&
            (node.callee.object as any).regex))
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_MATCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-match": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for RegExp.exec() calls and regex literal exec() calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "exec" &&
        ((node.callee.object.type === "NewExpression" &&
          node.callee.object.callee.type === "Identifier" &&
          node.callee.object.callee.name === "RegExp") ||
          (node.callee.object.type === "Identifier" &&
            node.callee.object.name === "RegExp") ||
          (node.callee.object.type === "Identifier" &&
            node.callee.object.name === "regex") ||
          (node.callee.object.type === "Literal" &&
            (node.callee.object as any).regex))
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_MATCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-match": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { regexMatchAnalyzerBuilder };
