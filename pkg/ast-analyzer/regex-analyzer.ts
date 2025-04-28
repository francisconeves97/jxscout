import { Position, Program } from "acorn";
import { simple as traverse } from "acorn-walk";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export interface RegexAnalyzerConfig {
  analyzerName: string;
  regex: RegExp;
  filter?: (match: AnalyzerMatch) => boolean;
}

export function createRegexAnalyzer(config: RegexAnalyzerConfig): Analyzer {
  return (args: AnalyzerParams, matchesReturn: AnalyzerMatch[]) => {
    return {
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

        const match: AnalyzerMatch = {
          analyzerName: config.analyzerName,
          value: stringValue,
          start: node.loc.start,
          end: node.loc.end,
        };

        if (config.filter && !config.filter(match)) {
          return;
        }

        matchesReturn.push(match);
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

        const match: AnalyzerMatch = {
          analyzerName: config.analyzerName,
          value: templateValue,
          start: node.loc.start,
          end: node.loc.end,
        };

        if (config.filter && !config.filter(match)) {
          return;
        }

        matchesReturn.push(match);
      },
    };
  };
}
