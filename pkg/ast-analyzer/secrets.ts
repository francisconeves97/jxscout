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
  {
    name: "Alegra 2",
    regex: /(?:alegra).{0,40}\b([a-zA-Z0-9.-@]{25,30})\b/,
  },
  {
    name: "Aletheiaapi",
    regex: /(?:aletheiaapi).{0,40}\b([A-Z0-9]{32})\b/,
  },
  {
    name: "Algoliaadminkey",
    regex: /(?:algolia).{0,40}\b([A-Z0-9]{10})\b/,
  },
  {
    name: "Algoliaadminkey 2",
    regex: /(?:algolia).{0,40}\b([a-zA-Z0-9]{32})\b/,
  },
  {
    name: "Alibaba",
    regex: /\b(LTAI[a-zA-Z0-9]{17,21})[\"' ;\s]*/,
  },
  {
    name: "Alienvault",
    regex: /(?:alienvault).{0,40}\b([a-z0-9]{64})\b/,
  },
  {
    name: "Allsports",
    regex: /(?:allsports).{0,40}\b([0-9a-z]{64})\b/,
  },
  {
    name: "Amadeus",
    regex: /(?:amadeus).{0,40}\b([0-9A-Za-z]{32})\b/,
  },
  {
    name: "Amadeus 2",
    regex: /(?:amadeus).{0,40}\b([0-9A-Za-z]{16})\b/,
  },
  {
    name: "Amazon SNS Topic",
    regex: /arn:aws:sns:[a-z0-9\-]+:[0-9]+:[A-Za-z0-9\-_]+/,
  },
  {
    name: "Ambee",
    regex: /(?:ambee).{0,40}\b([0-9a-f]{64})\b/,
  },
  {
    name: "Amplitudeapikey",
    regex: /(?:amplitude).{0,40}\b([a-f0-9]{32})/,
  },
  {
    name: "Apacta",
    regex: /(?:apacta).{0,40}\b([a-z0-9-]{36})\b/,
  },
  {
    name: "Api2cart",
    regex: /(?:api2cart).{0,40}\b([0-9a-f]{32})\b/,
  },
  {
    name: "Apideck",
    regex: /\b(sk_live_[a-z0-9A-Z-]{93})\b/,
  },
  {
    name: "Apideck 2",
    regex: /(?:apideck).{0,40}\b([a-z0-9A-Z]{40})\b/,
  },
  {
    name: "Apiflash",
    regex: /(?:apiflash).{0,40}\b([a-z0-9]{32})\b/,
  },
  {
    name: "Apiflash 2",
    regex: /(?:apiflash).{0,40}\b([a-zA-Z0-9\S]{21,30})\b/,
  },
  {
    name: "Apifonica",
    regex:
      /(?:apifonica).{0,40}\b([0-9a-z]{11}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\b/,
  },
  {
    name: "Apify",
    regex: /\b(apify\_api\_[a-zA-Z-0-9]{36})\b/,
  },
  {
    name: "Apimatic",
    regex: /(?:apimatic).{0,40}\b([a-z0-9-\S]{8,32})\b/,
  },
  {
    name: "Apimatic 2",
    regex:
      /(?:apimatic).{0,40}\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\b/,
  },
  {
    name: "Apiscience",
    regex: /(?:apiscience).{0,40}\b([a-bA-Z0-9\S]{22})\b/,
  },
  {
    name: "Apollo",
    regex: /(?:apollo).{0,40}\b([a-zA-Z0-9]{22})\b/,
  },
  {
    name: "Appcues",
    regex: /(?:appcues).{0,40}\b([0-9]{5})\b/,
  },
  {
    name: "Appcues 2",
    regex: /(?:appcues).{0,40}\b([a-z0-9-]{36})\b/,
  },
  {
    name: "Appcues 3",
    regex: /(?:appcues).{0,40}\b([a-z0-9-]{39})\b/,
  },
  {
    name: "Appfollow",
    regex: /(?:appfollow).{0,40}\b([0-9A-Za-z]{20})\b/,
  },
  {
    name: "Appsynergy",
    regex: /(?:appsynergy).{0,40}\b([a-z0-9]{64})\b/,
  },
  {
    name: "Apptivo",
    regex: /(?:apptivo).{0,40}\b([a-z0-9-]{36})\b/,
  },
  {
    name: "Apptivo 2",
    regex: /(?:apptivo).{0,40}\b([a-zA-Z0-9-]{32})\b/,
  },
  {
    name: "Artifactory",
    regex: /\b([A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])\.jfrog\.io)/,
  },
  {
    name: "Artifactory API Token",
    regex: /(?:\s|=|:|"|^)AKC[a-zA-Z0-9]{10,}/,
  },
  {
    name: "Artifactory Password",
    regex: /(?:\s|=|:|"|^)AP[\dABCDEF][a-zA-Z0-9]{8,}/,
  },
  {
    name: "Artsy",
    regex: /(?:artsy).{0,40}\b([0-9a-zA-Z]{20})\b/,
  },
  {
    name: "Artsy 2",
    regex: /(?:artsy).{0,40}\b([0-9a-zA-Z]{32})\b/,
  },
  {
    name: "Asanaoauth",
    regex: /(?:asana).{0,40}\b([a-z\/:0-9]{51})\b/,
  },
  {
    name: "Asanapersonalaccesstoken",
    regex: /(?:asana).{0,40}\b([0-9]{1,}\/[0-9]{16,}:[A-Za-z0-9]{32,})\b/,
  },
  {
    name: "Assemblyai",
    regex: /(?:assemblyai).{0,40}\b([0-9a-z]{32})\b/,
  },
  {
    name: "Asymmetric Private Key",
    regex: /-----BEGIN ((EC|PGP|DSA|RSA|OPENSSH) )?PRIVATE KEY( BLOCK)?-----/,
  },
  {
    name: "Audd",
    regex: /(?:audd).{0,40}\b([a-z0-9-]{32})\b/,
  },
  {
    name: "Auth0managementapitoken",
    regex: /(?:auth0).{0,40}\b(ey[a-zA-Z0-9._-]+)\b/,
  },
  {
    name: "Auth0oauth",
    regex: /(?:auth0).{0,40}\b([a-zA-Z0-9_-]{32,60})\b/,
  },
  {
    name: "Autodesk",
    regex: /(?:autodesk).{0,40}\b([0-9A-Za-z]{32})\b/,
  },
  {
    name: "Autodesk 2",
    regex: /(?:autodesk).{0,40}\b([0-9A-Za-z]{16})\b/,
  },
  {
    name: "Autoklose",
    regex: /(?:autoklose).{0,40}\b([a-zA-Z0-9-]{32})\b/,
  },
  {
    name: "Autopilot",
    regex: /(?:autopilot).{0,40}\b([0-9a-f]{32})\b/,
  },
  {
    name: "Avazapersonalaccesstoken",
    regex: /(?:avaza).{0,40}\b([0-9]+-[0-9a-f]{40})\b/,
  },
  {
    name: "Aviationstack",
    regex: /(?:aviationstack).{0,40}\b([a-z0-9]{32})\b/,
  },
  {
    name: "Aws",
    regex: /\b((?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16})\b/,
  },
  {
    name: "Axonaut",
    regex: /(?:axonaut).{0,40}\b([a-z0-9]{32})\b/,
  },
  {
    name: "Aylien",
    regex: /(?:aylien).{0,40}\b([a-z0-9]{32})\b/,
  },
  {
    name: "Aylien 2",
    regex: /(?:aylien).{0,40}\b([a-z0-9]{8})\b/,
  },
  {
    name: "Ayrshare",
    regex:
      /(?:ayrshare).{0,40}\b([A-Z]{7}-[A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7})\b/,
  },
  {
    name: "Bannerbear",
    regex: /(?:bannerbear).{0,40}\b([0-9a-zA-Z]{22}tt)\b/,
  },
  {
    name: "Baremetrics",
    regex: /(?:baremetrics).{0,40}\b([a-zA-Z0-9_]{25})\b/,
  },
  {
    name: "Baseapiio",
    regex:
      /(?:baseapi|base-api).{0,40}\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/,
  },
  {
    name: "Beamer",
    regex: /(?:beamer).{0,40}\b([a-zA-Z0-9_+/]{45}=)/,
  },
  {
    name: "Bearer token",
    regex: /(bearer).+/,
  },
  {
    name: "Beebole",
    regex: /(?:beebole).{0,40}\b([0-9a-z]{40})\b/,
  },
  {
    name: "Besttime",
    regex: /(?:besttime).{0,40}\b([0-9A-Za-z_]{36})\b/,
  },
  {
    name: "Billomat",
    regex: /(?:billomat).{0,40}\b([0-9a-z]{1,})\b/,
  },
  {
    name: "Billomat 2",
    regex: /(?:billomat).{0,40}\b([0-9a-z]{32})\b/,
  },
  {
    name: "Bitbar",
    regex: /(?:bitbar).{0,40}\b([0-9a-z]{32})\b/,
  },
  {
    name: "Bitcoinaverage",
    regex: /(?:bitcoinaverage).{0,40}\b([a-zA-Z0-9]{43})\b/,
  },
  {
    name: "Bitfinex",
    regex: /(?:bitfinex).{0,40}\b([A-Za-z0-9_-]{43})\b/,
  },
  {
    name: "Bitly Secret Key",
    regex: /R_[0-9a-f]{32}/,
  },
  {
    name: "Bitlyaccesstoken",
    regex: /(?:bitly).{0,40}\b([a-zA-Z-0-9]{40})\b/,
  },
  {
    name: "Bitmex",
    regex: /(?:bitmex).{0,40}([ \r\n]{1}[0-9a-zA-Z\-\_]{24}[ \r\n]{1})/,
  },
  {
    name: "Bitmex 2",
    regex: /(?:bitmex).{0,40}([ \r\n]{1}[0-9a-zA-Z\-\_]{48}[ \r\n]{1})/,
  },
  {
    name: "Blablabus",
    regex: /(?:blablabus).{0,40}\b([0-9A-Za-z]{22})\b/,
  },
  {
    name: "Blazemeter",
    regex:
      /(?:blazemeter|runscope).{0,40}\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\b/,
  },
  {
    name: "Blitapp",
    regex: /(?:blitapp).{0,40}\b([a-zA-Z0-9_-]{39})\b/,
  },
  {
    name: "Blogger",
    regex: /(?:blogger).{0,40}\b([0-9A-Za-z-]{39})\b/,
  },
  {
    name: "Bombbomb",
    regex: /(?:bombbomb).{0,40}\b([a-zA-Z0-9-._]{704})\b/,
  },
  {
    name: "Boostnote",
    regex: /(?:boostnote).{0,40}\b([0-9a-f]{64})\b/,
  },
];

export const SECRETS_ANALYZER_NAME = "secrets";

const secretsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: SECRETS_ANALYZER_NAME,
  regex: /./,
  filter: (match) => {
    // Test each pattern individually
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.regex.test(match.value)) {
        match.tags[pattern.name.toLowerCase().replace(/\s+/g, "-")] = true;
        return true;
      }
    }

    return false;
  },
});

export { secretsAnalyzerBuilder };
