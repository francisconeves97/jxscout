import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const POST_MESSAGE_ANALYZER_NAME = "post-message";

const postMessageAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    CallExpression(node: any, _state: any, ancestors: Node[]) {
      // Check if this is a postMessage call (either direct or as a method)
      if (
        (node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "postMessage") ||
        (node.callee.type === "Identifier" &&
          node.callee.name === "postMessage")
      ) {
        // Get the message and target origin arguments
        const targetOriginArg = node.arguments[1];

        if (!node.loc) {
          return;
        }

        const tags: Record<string, true> = {
          "post-message": true,
        };

        if (targetOriginArg?.value !== "*") {
          tags["cross-origin"] = true;
        }

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: POST_MESSAGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags,
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { postMessageAnalyzerBuilder };
