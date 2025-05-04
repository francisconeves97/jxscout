import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const DOCUMENT_DOMAIN_MANIPULATION_ANALYZER_NAME =
  "document-domain-manipulation";

const documentDomainManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for document.domain
      if (
        node.object.type === "Identifier" &&
        node.object.name === "document" &&
        node.property.type === "Identifier" &&
        node.property.name === "domain"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOCUMENT_DOMAIN_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "document-domain-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for document.domain assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "document" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "domain"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOCUMENT_DOMAIN_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "document-domain-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { documentDomainManipulationAnalyzerBuilder };
