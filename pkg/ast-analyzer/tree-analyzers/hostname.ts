import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const HOSTNAME_ANALYZER_NAME = "hostname";

// Regex pattern to match hostnames
// Matches:
// - Domain names with subdomains (e.g. sub.example.com)
// - Allows only letters, numbers, hyphens, and dots
// - Each label must start and end with a letter or number
// - Labels cannot start or end with hyphens
const HOSTNAME_REGEX = new RegExp(
  `^(?!.*\\.(js|ts|jsx|tsx|html|css|json|md|txt|xml|yaml|yml|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|otf|mp4|webm|mp3|wav|pdf|zip|tar|gz|rar|7z|sql|db|sqlite|env|log|lock|map|min|bundle|config|conf|ini|toml|lock|pem|key|crt|cer|p12|pfx|bak|tmp|temp)$)[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*\\.[a-zA-Z]{2,4}$`,
  "i"
);

const hostnameAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node, ancestors) {
      if (!node.loc || typeof node.value !== "string") {
        return;
      }

      // Check if the string literal matches the hostname pattern
      if (HOSTNAME_REGEX.test(node.value)) {
        let parsedUrl: URL | null = null;

        try {
          parsedUrl = new URL(`https://${node.value}`);
        } catch {
          return;
        }

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HOSTNAME_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hostname-string": true,
          },
          extra: {
            hostname: parsedUrl.hostname,
          },
        };

        if (
          node.value.includes("www.w3.org") ||
          node.value.startsWith("react.")
        ) {
          return;
        }

        matchesReturn.push(match);
      }
    },
  };
};

export { hostnameAnalyzerBuilder };
