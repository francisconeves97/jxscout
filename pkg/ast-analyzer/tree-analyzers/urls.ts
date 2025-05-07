import { Node } from "acorn";
import { AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

// This regex matches URLs with common protocols
// It allows:
// - Common protocols: http, https, ftp, ftps, sftp, ws, wss
// - Domain names with subdomains
// - IP addresses
// - Port numbers
// - Path segments
// - Query parameters
// - Fragments
const URL_REGEX =
  /^(https?|ftp|ftps|sftp|ws|wss):\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/[^\s]*)?$/;

export const URLS_ANALYZER_NAME = "urls";

function createUrlMatch(
  args: AnalyzerParams,
  node: Node,
  value: string,
  isTemplate = false
): AnalyzerMatch {
  const protocol = value.split("://")[0];
  const tags: Record<string, true> = {
    url: true,
    ...(protocol && { [protocol]: true }),
    ...(value.includes("?") && { query: true }),
    ...(value.includes("#") && { fragment: true }),
  };

  return {
    filePath: args.filePath,
    analyzerName: URLS_ANALYZER_NAME,
    value: isTemplate ? value : args.source.slice(node.start, node.end),
    start: node.loc!.start,
    end: node.loc!.end,
    tags,
  };
}

const urlsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node) {
      if (!node.loc || typeof node.value !== "string") {
        return;
      }

      const value = node.value;
      if (URL_REGEX.test(value) && !value.includes("www.w3.org")) {
        matchesReturn.push(createUrlMatch(args, node, value));
      }
    },

    TemplateLiteral(node) {
      if (!node.loc) {
        return;
      }

      // Get the raw template literal value
      const rawValue = args.source
        .slice(node.start, node.end)
        .replaceAll("`", "");

      // Check if any of the quasis (static parts) contain a URL-like pattern
      const hasUrlLikeQuasis = node.quasis.some((quasi) => {
        const value = quasi.value.raw;
        return URL_REGEX.test(value);
      });

      if (hasUrlLikeQuasis && !rawValue.includes("www.w3.org")) {
        matchesReturn.push(createUrlMatch(args, node, rawValue, true));
      }
    },
  };
};

export { urlsAnalyzerBuilder };
