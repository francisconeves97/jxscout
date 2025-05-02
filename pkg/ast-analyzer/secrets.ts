import { createRegexAnalyzer } from "./regex-analyzer";

// Define the patterns for secrets detection
const SECRET_PATTERNS = [
  {
    name: "AWS API Gateway",
    regex: /[0-9a-z]+\.execute-api\.[0-9a-z._-]+\.amazonaws\.com/,
  },
  {
    name: "AWS API Key",
    regex: /AKIA[0-9A-Z]{16}/,
  },
  {
    name: "AWS ARN",
    regex: /arn:aws:[a-z0-9-]+:[a-z]{2}-[a-z]+-[0-9]+:[0-9]+:.+/,
  },
  {
    name: "AWS Access Key ID Value",
    regex: /(A3T[A-Z0-9]|AKIA|AGPA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/,
  },
  {
    name: "AWS AppSync GraphQL Key",
    regex: /da2-[a-z0-9]{26}/,
  },
  {
    name: "AWS EC2 External",
    regex: /ec2-[0-9a-z._-]+\.compute(-1)?\.amazonaws\.com/,
  },
  {
    name: "AWS EC2 Internal",
    regex: /[0-9a-z._-]+\.compute(-1)?\.internal/,
  },
  {
    name: "AWS ELB",
    regex: /[0-9a-z._-]+\.elb\.amazonaws\.com/,
  },
  {
    name: "AWS ElasticCache",
    regex: /[0-9a-z._-]+\.cache\.amazonaws\.com/,
  },
  {
    name: "AWS MWS ID",
    regex:
      /mzn\.mws\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  },
  {
    name: "AWS MWS key",
    regex:
      /amzn\.mws\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  },
  {
    name: "AWS RDS",
    regex: /[0-9a-z._-]+\.rds\.amazonaws\.com/,
  },
  {
    name: "AWS S3 Bucket",
    regex: /s3:\/\/[0-9a-z._\/-]+/,
  },
  {
    name: "AWS client ID",
    regex: /(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/,
  },
  {
    name: "AWS cred file info",
    regex: /(aws_access_key_id|aws_secret_access_key)/,
  },
  {
    name: "Abbysale",
    regex: /(?:abbysale).{0,40}\b([a-z0-9A-Z]{40})\b/,
  },
  {
    name: "Abstract",
    regex: /(?:abstract).{0,40}\b([0-9a-z]{32})\b/,
  },
  {
    name: "Abuseipdb",
    regex: /(?:abuseipdb).{0,40}\b([a-z0-9]{80})\b/,
  },
  {
    name: "Accuweather",
    regex: /(?:accuweather).{0,40}([a-z0-9A-Z\%]{35})\b/,
  },
  {
    name: "Adafruitio",
    regex: /\b(aio\_[a-zA-Z0-9]{28})\b/,
  },
  {
    name: "Adobeio",
    regex: /(?:adobe).{0,40}\b([a-z0-9]{32})\b/,
  },
  {
    name: "Adzuna",
    regex: /(?:adzuna).{0,40}\b([a-z0-9]{8})\b/,
  },
  {
    name: "Adzuna 2",
    regex: /(?:adzuna).{0,40}\b([a-z0-9]{32})\b/,
  },
  {
    name: "Aeroworkflow",
    regex: /(?:aeroworkflow).{0,40}\b([0-9]{1,})\b/,
  },
  {
    name: "Aeroworkflow 2",
    regex: /(?:aeroworkflow).{0,40}\b([a-zA-Z0-9^!]{20})\b/,
  },
  {
    name: "Agora",
    regex: /(?:agora).{0,40}\b([a-z0-9]{32})\b/,
  },
  {
    name: "Airbrakeprojectkey",
    regex: /(?:airbrake).{0,40}\b([0-9]{6})\b/,
  },
  {
    name: "Airbrakeprojectkey 2",
    regex: /(?:airbrake).{0,40}\b([a-zA-Z-0-9]{32})\b/,
  },
  {
    name: "Airbrakeuserkey",
    regex: /(?:airbrake).{0,40}\b([a-zA-Z-0-9]{40})\b/,
  },
  {
    name: "Airship",
    regex: /(?:airship).{0,40}\b([0-9Aa-zA-Z]{91})\b/,
  },
  {
    name: "Airvisual",
    regex: /(?:airvisual).{0,40}\b([a-z0-9-]{36})\b/,
  },
  {
    name: "Alconost",
    regex: /(?:alconost).{0,40}\b([0-9Aa-z]{32})\b/,
  },
  {
    name: "Alegra",
    regex: /(?:alegra).{0,40}\b([a-z0-9-]{20})\b/,
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
