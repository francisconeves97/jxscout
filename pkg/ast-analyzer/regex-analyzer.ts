import { Position, Program } from "acorn";
import { simple as traverse } from "acorn-walk";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export interface RegexAnalyzerConfig {
  regex: RegExp;
  filter?: (match: AnalyzerMatch) => boolean;
}

export function createRegexAnalyzer(config: RegexAnalyzerConfig): Analyzer {
  return (args: AnalyzerParams): AnalyzerMatch[] => {
    const foundMatches: AnalyzerMatch[] = [];

    traverse(args.ast, {
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

        const match = {
          value: stringValue,
          start: node.loc.start,
          end: node.loc.end,
        };

        if (config.filter && !config.filter(match)) {
          return;
        }

        foundMatches.push(match);
      },

      TemplateLiteral(node) {
        const templateValue = args.source
          .slice(node.start, node.end)
          .replaceAll("`", "");

        if (!config.regex.test(templateValue)) {
          return;
        }

        if (!node.loc) {
          return;
        }

        const match = {
          value: templateValue,
          start: node.loc.start,
          end: node.loc.end,
        };

        if (config.filter && !config.filter(match)) {
          return;
        }

        foundMatches.push(match);
      },
    });

    return foundMatches;
  };
}
