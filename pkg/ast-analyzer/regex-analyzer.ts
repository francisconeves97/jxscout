import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export interface RegexAnalyzerConfig {
  analyzerName: string;
  regex: RegExp;
  filter?: (match: AnalyzerMatch, ancestors: Node[]) => boolean;
  tags?: (value: string) => Record<string, true>;
}

export function createRegexAnalyzer(config: RegexAnalyzerConfig): Analyzer {
  return (args: AnalyzerParams, matchesReturn: AnalyzerMatch[]) => {
    return {
      Literal(node, _state, ancestors) {
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
          filePath: args.filePath,
          analyzerName: config.analyzerName,
          value: stringValue,
          start: node.loc.start,
          end: node.loc.end,
          tags: config.tags ? config.tags(stringValue) : {},
        };

        if (config.filter && !config.filter(match, ancestors)) {
          return;
        }

        matchesReturn.push(match);
      },

      TemplateLiteral(node, _state, ancestors) {
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
          filePath: args.filePath,
          analyzerName: config.analyzerName,
          value: templateValue,
          start: node.loc.start,
          end: node.loc.end,
          tags: config.tags ? config.tags(templateValue) : {},
        };

        if (config.filter && !config.filter(match, ancestors)) {
          return;
        }

        matchesReturn.push(match);
      },
    };
  };
}
