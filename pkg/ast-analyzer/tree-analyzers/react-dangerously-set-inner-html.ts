import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const DANGEROUS_HTML_ANALYZER_NAME = "dangerouslySetInnerHTML";

const dangerousHtmlAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    // Handle object properties
    ObjectExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Get all property names in this object
      const propertyNames = new Set(
        node.properties
          .filter(
            (prop) => prop.type === "Property" && prop.key.type === "Identifier"
          )
          .map((prop) => (prop as any).key.name)
      );

      // Check if this object has dangerouslySetInnerHTML property
      if (propertyNames.has("dangerouslySetInnerHTML")) {
        const tags: Record<string, true> = {
          "dangerouslySetInnerHTML-object": true,
        };

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DANGEROUS_HTML_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags,
        };

        matchesReturn.push(match);
      }
    },

    // Handle JSX elements
    JSXElement(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if any of the JSX attributes is dangerouslySetInnerHTML
      const hasDangerousHtml = node.openingElement.attributes.some(
        (attr) =>
          attr.type === "JSXAttribute" &&
          attr.name.type === "JSXIdentifier" &&
          attr.name.name === "dangerouslySetInnerHTML"
      );

      if (hasDangerousHtml) {
        const tags: Record<string, true> = {
          "dangerouslySetInnerHTML-jsx": true,
        };

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DANGEROUS_HTML_ANALYZER_NAME,
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

export { dangerousHtmlAnalyzerBuilder };
