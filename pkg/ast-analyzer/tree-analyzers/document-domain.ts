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
        node.left.object.type === "Identifier" &&
        node.left.object.name === "document" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "domain"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOCUMENT_DOMAIN_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "domain-assignment": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a document.domain read
      if (
        node.object.type === "Identifier" &&
        node.object.name === "document" &&
        node.property.type === "Identifier" &&
        node.property.name === "domain" &&
        // Only count as a read if it's not part of an assignment
        !ancestors.some(
          (ancestor) =>
            ancestor.type === "AssignmentExpression" && ancestor.left === node
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOCUMENT_DOMAIN_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "domain-read": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { documentDomainAnalyzerBuilder };
