import { createRegexAnalyzer } from "./regex-analyzer";

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

const urlsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: URLS_ANALYZER_NAME,
  regex: URL_REGEX,
  tags: (value) => {
    const tags: Record<string, true> = {};

    // Tag based on protocol
    const protocol = value.split("://")[0];
    if (protocol) {
      tags[protocol] = true;
    }

    // Tag if URL contains query parameters
    if (value.includes("?")) {
      tags.query = true;
    }

    // Tag if URL contains a fragment
    if (value.includes("#")) {
      tags.fragment = true;
    }

    return tags;
  },
});

export { urlsAnalyzerBuilder };
