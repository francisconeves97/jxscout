import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const DOCUMENT_DOMAIN_ANALYZER_NAME = "document-domain";

const documentDomainAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a document.domain assignment
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "MemberExpression" &&
        node.left.object.object.type === "Identifier" &&
        node.left.object.object.name === "document" &&
        node.left.object.property.type === "Identifier" &&
        node.left.object.property.name === "domain"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOCUMENT_DOMAIN_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "domain-assignment": true,
            ...(node.right.type !== "Identifier"
              ? { "has-literal-value": true }
              : {}),
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { documentDomainAnalyzerBuilder };
