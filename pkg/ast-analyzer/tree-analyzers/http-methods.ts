import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const HTTP_METHODS_ANALYZER_NAME = "http-methods";

const HTTP_METHODS = new Set(["post", "delete", "get", "put", "patch"]);

interface CallExpression extends Node {
  type: "CallExpression";
  callee: {
    type: "MemberExpression";
    property: {
      name: string;
    };
    object: Node;
  };
  arguments: Node[];
}

function createHttpMethodMatch(
  args: AnalyzerParams,
  node: Node,
  methodName: string
): AnalyzerMatch {
  return {
    filePath: args.filePath,
    analyzerName: HTTP_METHODS_ANALYZER_NAME,
    value: args.source.slice(node.start, node.end),
    start: node.loc!.start,
    end: node.loc!.end,
    tags: {
      [`method-${methodName}`]: true,
      "http-method": true,
    },
    extra: {
      method: methodName,
    },
  };
}

const httpMethodsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node) {
      if (!node.loc) {
        return;
      }

      const callNode = node as CallExpression;
      if (
        callNode.callee.type === "MemberExpression" &&
        HTTP_METHODS.has(callNode.callee.property.name)
      ) {
        matchesReturn.push(
          createHttpMethodMatch(args, node, callNode.callee.property.name)
        );
      }
    },
  };
};

export { httpMethodsAnalyzerBuilder };
