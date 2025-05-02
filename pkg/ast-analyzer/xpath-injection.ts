import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const XPATH_INJECTION_ANALYZER_NAME = "xpath-injection";

const xpathInjectionAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for document.evaluate()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "document" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "evaluate"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: XPATH_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "xpath-injection": true,
          },
        };

        matchesReturn.push(match);
        return;
      }

      // Check for element.evaluate()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "evaluate" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name !== "document" // Ensure we don't match document.evaluate again
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: XPATH_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "xpath-injection": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { xpathInjectionAnalyzerBuilder };
