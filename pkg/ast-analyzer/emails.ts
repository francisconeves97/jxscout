import { createRegexAnalyzer } from "./regex-analyzer";

// More permissive regex that should match all valid email formats
// including subdomains and template expressions
const EMAIL_ADDRESS_REGEX =
  /^[a-zA-Z0-9_.${}+-]+@[${}a-zA-Z0-9-]+\.?[a-zA-Z0-9-.]*$/;

// Additional filter to exclude URLs and other non-email strings that might contain @ symbols
const isLikelyEmail = (match: { value: string }): boolean => {
  // Exclude URLs that contain @ symbols
  if (match.value.includes("://")) return false;

  // Exclude strings that are just text with @ symbols
  if (match.value.trim().split("@").length !== 2) return false;

  return true;
};

export const EMAILS_ANALYZER_NAME = "emails";

const emailsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: EMAILS_ANALYZER_NAME,
  regex: EMAIL_ADDRESS_REGEX,
  filter: isLikelyEmail,
});

export { emailsAnalyzerBuilder };
