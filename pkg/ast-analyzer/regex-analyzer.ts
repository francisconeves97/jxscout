import { Position, Program } from "acorn";
import { simple as traverse } from "acorn-walk";

export interface RegexAnalyzerConfig {
  regex: RegExp;
}

export interface FoundMatch {
  value: string;
  start: Position;
  end: Position;
}

export function createRegexAnalyzer(config: RegexAnalyzerConfig) {
  return (ast: Program, fileContent: string): FoundMatch[] => {
    const foundMatches: FoundMatch[] = [];

    traverse(ast, {
      Literal(node) {
        const stringValue = node.value;
        if (typeof stringValue !== "string") {
          return;
        }

        if (!config.regex.test(stringValue)) {
          return;
        }

        if (!node.loc) {
          return;
        }

        foundMatches.push({
          value: stringValue,
          start: node.loc.start,
          end: node.loc.end,
        });
      },

      TemplateLiteral(node) {
        const templateValue = fileContent
          .slice(node.start, node.end)
          .replaceAll("`", "");

        if (!config.regex.test(templateValue)) {
          return;
        }

        if (!node.loc) {
          return;
        }

        foundMatches.push({
          value: templateValue,
          start: node.loc.start,
          end: node.loc.end,
        });
      },
    });

    return foundMatches;
  };
}

// Predefined regex patterns
export const URL_PATH_REGEX =
  /^[a-zA-Z0-9-_~/#?[\]!$&'()*+,;={}]*\/[a-zA-Z0-9-_~/#?[\]!$&'()*+,;={}]+$/;
export const EMAIL_ADDRESS_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
