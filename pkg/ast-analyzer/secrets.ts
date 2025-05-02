import { createRegexAnalyzer } from "./regex-analyzer";

// Define the patterns for secrets detection
const SECRET_PATTERNS = [
  {
    name: "AWS API Gateway",
    regex: /[0-9a-z]+\.execute-api\.[0-9a-z._-]+\.amazonaws\.com/,
    confidence: "low",
  },
  {
    name: "AWS API Key",
    regex: /AKIA[0-9A-Z]{16}/,
    confidence: "high",
  },
  {
    name: "AWS ARN",
    regex: /arn:aws:[a-z0-9-]+:[a-z]{2}-[a-z]+-[0-9]+:[0-9]+:.+/,
    confidence: "high",
  },
  {
    name: "AWS Access Key ID Value",
    regex: /(A3T[A-Z0-9]|AKIA|AGPA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/,
    confidence: "high",
  },
  {
    name: "AWS AppSync GraphQL Key",
    regex: /da2-[a-z0-9]{26}/,
    confidence: "high",
  },
  {
    name: "AWS EC2 External",
    regex: /ec2-[0-9a-z._-]+\.compute(-1)?\.amazonaws\.com/,
    confidence: "low",
  },
  {
    name: "AWS EC2 Internal",
    regex: /[0-9a-z._-]+\.compute(-1)?\.internal/,
    confidence: "low",
  },
  {
    name: "AWS ELB",
    regex: /[0-9a-z._-]+\.elb\.amazonaws\.com/,
    confidence: "low",
  },
  {
    name: "AWS ElasticCache",
    regex: /[0-9a-z._-]+\.cache\.amazonaws\.com/,
    confidence: "low",
  },
  {
    name: "AWS MWS ID",
    regex:
      /mzn\.mws\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    confidence: "low",
  },
  {
    name: "AWS MWS key",
    regex:
      /amzn\.mws\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    confidence: "high",
  },
  {
    name: "AWS RDS",
    regex: /[0-9a-z._-]+\.rds\.amazonaws\.com/,
    confidence: "high",
  },
  {
    name: "AWS S3 Bucket",
    regex: /s3:\/\/[0-9a-z._\/-]+/,
    confidence: "high",
  },
  {
    name: "AWS client ID",
    regex: /(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/,
    confidence: "low",
  },
  {
    name: "AWS cred file info",
    regex: /(aws_access_key_id|aws_secret_access_key)/,
    confidence: "high",
  },
  {
    name: "Abbysale",
    regex: /(?:abbysale).{0,40}\b([a-z0-9A-Z]{40})\b/,
    confidence: "high",
  },
  {
    name: "Abstract",
    regex: /(?:abstract).{0,40}\b([0-9a-z]{32})\b/,
    confidence: "high",
  },
  {
    name: "Abuseipdb",
    regex: /(?:abuseipdb).{0,40}\b([a-z0-9]{80})\b/,
    confidence: "high",
  },
  {
    name: "Accuweather",
    regex: /(?:accuweather).{0,40}([a-z0-9A-Z\%]{35})\b/,
    confidence: "high",
  },
  {
    name: "Adafruitio",
    regex: /\b(aio\_[a-zA-Z0-9]{28})\b/,
    confidence: "high",
  },
  {
    name: "Adobeio",
    regex: /(?:adobe).{0,40}\b([a-z0-9]{32})\b/,
    confidence: "high",
  },
  {
    name: "Adzuna",
    regex: /(?:adzuna).{0,40}\b([a-z0-9]{8})\b/,
    confidence: "high",
  },
  {
    name: "Adzuna 2",
    regex: /(?:adzuna).{0,40}\b([a-z0-9]{32})\b/,
    confidence: "high",
  },
  {
    name: "Aeroworkflow",
    regex: /(?:aeroworkflow).{0,40}\b([0-9]{1,})\b/,
    confidence: "high",
  },
  {
    name: "Aeroworkflow 2",
    regex: /(?:aeroworkflow).{0,40}\b([a-zA-Z0-9^!]{20})\b/,
    confidence: "high",
  },
  {
    name: "Agora",
    regex: /(?:agora).{0,40}\b([a-z0-9]{32})\b/,
    confidence: "high",
  },
  {
    name: "Airbrakeprojectkey",
    regex: /(?:airbrake).{0,40}\b([0-9]{6})\b/,
    confidence: "high",
  },
  {
    name: "Airbrakeprojectkey 2",
    regex: /(?:airbrake).{0,40}\b([a-zA-Z-0-9]{32})\b/,
    confidence: "high",
  },
  {
    name: "Airbrakeuserkey",
    regex: /(?:airbrake).{0,40}\b([a-zA-Z-0-9]{40})\b/,
    confidence: "high",
  },
  {
    name: "Airship",
    regex: /(?:airship).{0,40}\b([0-9Aa-zA-Z]{91})\b/,
    confidence: "high",
  },
  {
    name: "Airvisual",
    regex: /(?:airvisual).{0,40}\b([a-z0-9-]{36})\b/,
    confidence: "high",
  },
  {
    name: "Alconost",
    regex: /(?:alconost).{0,40}\b([0-9Aa-z]{32})\b/,
    confidence: "high",
  },
  {
    name: "Alegra",
    regex: /(?:alegra).{0,40}\b([a-z0-9-]{20})\b/,
    confidence: "high",
  },
];

export const SECRETS_ANALYZER_NAME = "secrets";

const secretsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: SECRETS_ANALYZER_NAME,
  regex: /./,
  filter: (match) => {
    // Test each pattern individually
    for (const pattern of SECRET_PATTERNS) {
      const patternRegex = new RegExp(`^${pattern.regex.source}$`);
      if (patternRegex.test(match.value)) {
        match.tags[pattern.name.toLowerCase().replace(/\s+/g, "-")] = true;
        return true;
      }
    }

    return false;
  },
});

export { secretsAnalyzerBuilder };
