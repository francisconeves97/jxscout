import { AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

// Define the patterns for secrets detection

// All taken from https://github.com/mazen160/secrets-patterns-db - all credits to them
const SECRET_PATTERNS = [
  {
    name: "AWS API Gateway",
    regex: new RegExp("[0-9a-z]+.execute-api.[0-9a-z._-]+.amazonaws.com"),
  },
  { name: "AWS API Key", regex: new RegExp("AKIA[0-9A-Z]{16}") },
  {
    name: "AWS ARN",
    regex: new RegExp("arn:aws:[a-z0-9-]+:[a-z]{2}-[a-z]+-[0-9]+:[0-9]+:.+"),
  },
  {
    name: "AWS Access Key ID Value",
    regex: new RegExp(
      "(A3T[A-Z0-9]|AKIA|AGPA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}"
    ),
  },
  { name: "AWS AppSync GraphQL Key", regex: new RegExp("da2-[a-z0-9]{26}") },
  {
    name: "AWS EC2 External",
    regex: new RegExp("ec2-[0-9a-z._-]+.compute(-1)?.amazonaws.com"),
  },
  {
    name: "AWS EC2 Internal",
    regex: new RegExp("[0-9a-z._-]+.compute(-1)?.internal"),
  },
  { name: "AWS ELB", regex: new RegExp("[0-9a-z._-]+.elb.amazonaws.com") },
  {
    name: "AWS ElasticCache",
    regex: new RegExp("[0-9a-z._-]+.cache.amazonaws.com"),
  },
  {
    name: "AWS MWS ID",
    regex: new RegExp(
      "mzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
    ),
  },
  {
    name: "AWS MWS key",
    regex: new RegExp(
      "amzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
    ),
  },
  { name: "AWS RDS", regex: new RegExp("[0-9a-z._-]+.rds.amazonaws.com") },
  { name: "AWS S3 Bucket", regex: new RegExp("s3://[0-9a-z._/-]+") },
  {
    name: "AWS client ID",
    regex: new RegExp(
      "(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}"
    ),
  },
  {
    name: "AWS cred file info",
    regex: new RegExp("(aws_access_key_id|aws_secret_access_key)"),
  },
  {
    name: "Abbysale",
    regex: new RegExp("(?:abbysale).{0,40}\\b([a-z0-9A-Z]{40})\\b"),
  },
  {
    name: "Abstract",
    regex: new RegExp("(?:abstract).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Abuseipdb",
    regex: new RegExp("(?:abuseipdb).{0,40}\\b([a-z0-9]{80})\\b"),
  },
  {
    name: "Accuweather",
    regex: new RegExp("(?:accuweather).{0,40}([a-z0-9A-Z\\%]{35})\\b"),
  },
  { name: "Adafruitio", regex: new RegExp("\\b(aio\\_[a-zA-Z0-9]{28})\\b") },
  {
    name: "Adobeio - 1",
    regex: new RegExp("(?:adobe).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Adzuna - 1",
    regex: new RegExp("(?:adzuna).{0,40}\\b([a-z0-9]{8})\\b"),
  },
  {
    name: "Adzuna - 2",
    regex: new RegExp("(?:adzuna).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Aeroworkflow - 1",
    regex: new RegExp("(?:aeroworkflow).{0,40}\\b([0-9]{1,})\\b"),
  },
  {
    name: "Aeroworkflow - 2",
    regex: new RegExp("(?:aeroworkflow).{0,40}\\b([a-zA-Z0-9^!]{20})\\b"),
  },
  { name: "Agora", regex: new RegExp("(?:agora).{0,40}\\b([a-z0-9]{32})\\b") },
  {
    name: "Airbrakeprojectkey - 1",
    regex: new RegExp("(?:airbrake).{0,40}\\b([0-9]{6})\\b"),
  },
  {
    name: "Airbrakeprojectkey - 2",
    regex: new RegExp("(?:airbrake).{0,40}\\b([a-zA-Z-0-9]{32})\\b"),
  },
  {
    name: "Airbrakeuserkey",
    regex: new RegExp("(?:airbrake).{0,40}\\b([a-zA-Z-0-9]{40})\\b"),
  },
  {
    name: "Airship",
    regex: new RegExp("(?:airship).{0,40}\\b([0-9Aa-zA-Z]{91})\\b"),
  },
  {
    name: "Airvisual",
    regex: new RegExp("(?:airvisual).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Alconost",
    regex: new RegExp("(?:alconost).{0,40}\\b([0-9Aa-z]{32})\\b"),
  },
  {
    name: "Alegra - 1",
    regex: new RegExp("(?:alegra).{0,40}\\b([a-z0-9-]{20})\\b"),
  },
  {
    name: "Alegra - 2",
    regex: new RegExp("(?:alegra).{0,40}\\b([a-zA-Z0-9.-@]{25,30})\\b"),
  },
  {
    name: "Aletheiaapi",
    regex: new RegExp("(?:aletheiaapi).{0,40}\\b([A-Z0-9]{32})\\b"),
  },
  {
    name: "Algoliaadminkey - 1",
    regex: new RegExp("(?:algolia).{0,40}\\b([A-Z0-9]{10})\\b"),
  },
  {
    name: "Algoliaadminkey - 2",
    regex: new RegExp("(?:algolia).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Alibaba - 2",
    regex: new RegExp("\\b(LTAI[a-zA-Z0-9]{17,21})[\\\"' ;\\s]*"),
  },
  {
    name: "Alienvault",
    regex: new RegExp("(?:alienvault).{0,40}\\b([a-z0-9]{64})\\b"),
  },
  {
    name: "Allsports",
    regex: new RegExp("(?:allsports).{0,40}\\b([0-9a-z]{64})\\b"),
  },
  {
    name: "Amadeus - 1",
    regex: new RegExp("(?:amadeus).{0,40}\\b([0-9A-Za-z]{32})\\b"),
  },
  {
    name: "Amadeus - 2",
    regex: new RegExp("(?:amadeus).{0,40}\\b([0-9A-Za-z]{16})\\b"),
  },
  {
    name: "Amazon SNS Topic",
    regex: new RegExp("arn:aws:sns:[a-z0-9\\-]+:[0-9]+:[A-Za-z0-9\\-_]+"),
  },
  { name: "Ambee", regex: new RegExp("(?:ambee).{0,40}\\b([0-9a-f]{64})\\b") },
  {
    name: "Amplitudeapikey",
    regex: new RegExp("(?:amplitude).{0,40}\\b([a-f0-9]{32})"),
  },
  {
    name: "Apacta",
    regex: new RegExp("(?:apacta).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Api2cart",
    regex: new RegExp("(?:api2cart).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Apideck - 1",
    regex: new RegExp("\\b(sk_live_[a-z0-9A-Z-]{93})\\b"),
  },
  {
    name: "Apideck - 2",
    regex: new RegExp("(?:apideck).{0,40}\\b([a-z0-9A-Z]{40})\\b"),
  },
  {
    name: "Apiflash - 1",
    regex: new RegExp("(?:apiflash).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Apiflash - 2",
    regex: new RegExp("(?:apiflash).{0,40}\\b([a-zA-Z0-9\\S]{21,30})\\b"),
  },
  {
    name: "Apifonica",
    regex: new RegExp(
      "(?:apifonica).{0,40}\\b([0-9a-z]{11}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "Apify",
    regex: new RegExp("\\b(apify\\_api\\_[a-zA-Z-0-9]{36})\\b"),
  },
  {
    name: "Apimatic - 1",
    regex: new RegExp("(?:apimatic).{0,40}\\b([a-z0-9-\\S]{8,32})\\b"),
  },
  {
    name: "Apimatic - 2",
    regex: new RegExp(
      "(?:apimatic).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b"
    ),
  },
  {
    name: "Apiscience",
    regex: new RegExp("(?:apiscience).{0,40}\\b([a-bA-Z0-9\\S]{22})\\b"),
  },
  {
    name: "Apollo",
    regex: new RegExp("(?:apollo).{0,40}\\b([a-zA-Z0-9]{22})\\b"),
  },
  {
    name: "Appcues - 1",
    regex: new RegExp("(?:appcues).{0,40}\\b([0-9]{5})\\b"),
  },
  {
    name: "Appcues - 2",
    regex: new RegExp("(?:appcues).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Appcues - 3",
    regex: new RegExp("(?:appcues).{0,40}\\b([a-z0-9-]{39})\\b"),
  },
  {
    name: "Appfollow",
    regex: new RegExp("(?:appfollow).{0,40}\\b([0-9A-Za-z]{20})\\b"),
  },
  {
    name: "Appsynergy",
    regex: new RegExp("(?:appsynergy).{0,40}\\b([a-z0-9]{64})\\b"),
  },
  {
    name: "Apptivo - 1",
    regex: new RegExp("(?:apptivo).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Apptivo - 2",
    regex: new RegExp("(?:apptivo).{0,40}\\b([a-zA-Z0-9-]{32})\\b"),
  },
  {
    name: "Artifactory - 2",
    regex: new RegExp(
      "\\b([A-Za-z0-9](?:[A-Za-z0-9\\-]{0,61}[A-Za-z0-9])\\.jfrog\\.io)"
    ),
  },
  {
    name: "Artifactory API Token",
    regex: new RegExp('(?:\\s|=|:|"|^)AKC[a-zA-Z0-9]{10,}'),
  },
  {
    name: "Artifactory Password",
    regex: new RegExp('(?:\\s|=|:|"|^)AP[\\dABCDEF][a-zA-Z0-9]{8,}'),
  },
  {
    name: "Artsy - 1",
    regex: new RegExp("(?:artsy).{0,40}\\b([0-9a-zA-Z]{20})\\b"),
  },
  {
    name: "Artsy - 2",
    regex: new RegExp("(?:artsy).{0,40}\\b([0-9a-zA-Z]{32})\\b"),
  },
  {
    name: "Asanaoauth",
    regex: new RegExp("(?:asana).{0,40}\\b([a-z\\/:0-9]{51})\\b"),
  },
  {
    name: "Asanapersonalaccesstoken",
    regex: new RegExp(
      "(?:asana).{0,40}\\b([0-9]{1,}\\/[0-9]{16,}:[A-Za-z0-9]{32,})\\b"
    ),
  },
  {
    name: "Assemblyai",
    regex: new RegExp("(?:assemblyai).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Asymmetric Private Key",
    regex: new RegExp(
      "-----BEGIN ((EC|PGP|DSA|RSA|OPENSSH) )?PRIVATE KEY( BLOCK)?-----"
    ),
  },
  { name: "Audd", regex: new RegExp("(?:audd).{0,40}\\b([a-z0-9-]{32})\\b") },
  {
    name: "Auth0managementapitoken",
    regex: new RegExp("(?:auth0).{0,40}\\b(ey[a-zA-Z0-9._-]+)\\b"),
  },
  {
    name: "Auth0oauth - 1",
    regex: new RegExp("(?:auth0).{0,40}\\b([a-zA-Z0-9_-]{32,60})\\b"),
  },
  {
    name: "Autodesk - 1",
    regex: new RegExp("(?:autodesk).{0,40}\\b([0-9A-Za-z]{32})\\b"),
  },
  {
    name: "Autodesk - 2",
    regex: new RegExp("(?:autodesk).{0,40}\\b([0-9A-Za-z]{16})\\b"),
  },
  {
    name: "Autoklose",
    regex: new RegExp("(?:autoklose).{0,40}\\b([a-zA-Z0-9-]{32})\\b"),
  },
  {
    name: "Autopilot",
    regex: new RegExp("(?:autopilot).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Avazapersonalaccesstoken",
    regex: new RegExp("(?:avaza).{0,40}\\b([0-9]+-[0-9a-f]{40})\\b"),
  },
  {
    name: "Aviationstack",
    regex: new RegExp("(?:aviationstack).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Aws - 1",
    regex: new RegExp("\\b((?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16})\\b"),
  },
  {
    name: "Axonaut",
    regex: new RegExp("(?:axonaut).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Aylien - 1",
    regex: new RegExp("(?:aylien).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Aylien - 2",
    regex: new RegExp("(?:aylien).{0,40}\\b([a-z0-9]{8})\\b"),
  },
  {
    name: "Ayrshare",
    regex: new RegExp(
      "(?:ayrshare).{0,40}\\b([A-Z]{7}-[A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7})\\b"
    ),
  },
  {
    name: "Bannerbear",
    regex: new RegExp("(?:bannerbear).{0,40}\\b([0-9a-zA-Z]{22}tt)\\b"),
  },
  {
    name: "Baremetrics",
    regex: new RegExp("(?:baremetrics).{0,40}\\b([a-zA-Z0-9_]{25})\\b"),
  },
  {
    name: "Baseapiio",
    regex: new RegExp(
      "(?:baseapi|base-api).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Beamer",
    regex: new RegExp("(?:beamer).{0,40}\\b([a-zA-Z0-9_+/]{45}=)"),
  },
  { name: "Bearer token", regex: new RegExp("(bearer).+") },
  {
    name: "Beebole",
    regex: new RegExp("(?:beebole).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Besttime",
    regex: new RegExp("(?:besttime).{0,40}\\b([0-9A-Za-z_]{36})\\b"),
  },
  {
    name: "Billomat - 1",
    regex: new RegExp("(?:billomat).{0,40}\\b([0-9a-z]{1,})\\b"),
  },
  {
    name: "Billomat - 2",
    regex: new RegExp("(?:billomat).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Bitbar",
    regex: new RegExp("(?:bitbar).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Bitcoinaverage",
    regex: new RegExp("(?:bitcoinaverage).{0,40}\\b([a-zA-Z0-9]{43})\\b"),
  },
  {
    name: "Bitfinex",
    regex: new RegExp("(?:bitfinex).{0,40}\\b([A-Za-z0-9_-]{43})\\b"),
  },
  { name: "Bitly Secret Key", regex: new RegExp("R_[0-9a-f]{32}") },
  {
    name: "Bitlyaccesstoken",
    regex: new RegExp("(?:bitly).{0,40}\\b([a-zA-Z-0-9]{40})\\b"),
  },
  {
    name: "Bitmex - 1",
    regex: new RegExp(
      "(?:bitmex).{0,40}([ \\r\\n]{1}[0-9a-zA-Z\\-\\_]{24}[ \\r\\n]{1})"
    ),
  },
  {
    name: "Bitmex - 2",
    regex: new RegExp(
      "(?:bitmex).{0,40}([ \\r\\n]{1}[0-9a-zA-Z\\-\\_]{48}[ \\r\\n]{1})"
    ),
  },
  {
    name: "Blablabus",
    regex: new RegExp("(?:blablabus).{0,40}\\b([0-9A-Za-z]{22})\\b"),
  },
  {
    name: "Blazemeter",
    regex: new RegExp(
      "(?:blazemeter|runscope).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "Blitapp",
    regex: new RegExp("(?:blitapp).{0,40}\\b([a-zA-Z0-9_-]{39})\\b"),
  },
  {
    name: "Blogger",
    regex: new RegExp("(?:blogger).{0,40}\\b([0-9A-Za-z-]{39})\\b"),
  },
  {
    name: "Bombbomb",
    regex: new RegExp("(?:bombbomb).{0,40}\\b([a-zA-Z0-9-._]{704})\\b"),
  },
  {
    name: "Boostnote",
    regex: new RegExp("(?:boostnote).{0,40}\\b([0-9a-f]{64})\\b"),
  },
  {
    name: "Borgbase",
    regex: new RegExp("(?:borgbase).{0,40}\\b([a-zA-Z0-9/_.-]{148,152})\\b"),
  },
  {
    name: "Braintree API Key",
    regex: new RegExp("access_token$production$[0-9a-z]{16}$[0-9a-f]{32}"),
  },
  {
    name: "Brandfetch",
    regex: new RegExp("(?:brandfetch).{0,40}\\b([0-9A-Za-z]{40})\\b"),
  },
  {
    name: "Browshot",
    regex: new RegExp("(?:browshot).{0,40}\\b([a-zA-Z-0-9]{28})\\b"),
  },
  {
    name: "Buddyns",
    regex: new RegExp("(?:buddyns).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Bugherd",
    regex: new RegExp("(?:bugherd).{0,40}\\b([0-9a-z]{22})\\b"),
  },
  {
    name: "Bugsnag",
    regex: new RegExp(
      "(?:bugsnag).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "Buildkite",
    regex: new RegExp("(?:buildkite).{0,40}\\b([a-z0-9]{40})\\b"),
  },
  {
    name: "Bulbul",
    regex: new RegExp("(?:bulbul).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Buttercms",
    regex: new RegExp("(?:buttercms).{0,40}\\b([a-z0-9]{40})\\b"),
  },
  {
    name: "Caflou",
    regex: new RegExp("(?:caflou).{0,40}\\b([a-bA-Z0-9\\S]{155})\\b"),
  },
  {
    name: "Calendarific",
    regex: new RegExp("(?:calendarific).{0,40}\\b([a-z0-9]{40})\\b"),
  },
  {
    name: "Calendlyapikey",
    regex: new RegExp(
      "(?:calendly).{0,40}\\b([a-zA-Z-0-9]{20}.[a-zA-Z-0-9]{171}.[a-zA-Z-0-9_]{43})\\b"
    ),
  },
  {
    name: "Calorieninja",
    regex: new RegExp("(?:calorieninja).{0,40}\\b([0-9A-Za-z]{40})\\b"),
  },
  {
    name: "Campayn",
    regex: new RegExp("(?:campayn).{0,40}\\b([a-z0-9]{64})\\b"),
  },
  {
    name: "Cannyio",
    regex: new RegExp(
      "(?:canny).{0,40}\\b([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[0-9]{4}-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Capsulecrm",
    regex: new RegExp("(?:capsulecrm).{0,40}\\b([a-zA-Z0-9-._+=]{64})\\b"),
  },
  {
    name: "Captaindata - 1",
    regex: new RegExp(
      "(?:captaindata).{0,40}\\b([0-9a-f]{8}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Captaindata - 2",
    regex: new RegExp("(?:captaindata).{0,40}\\b([0-9a-f]{64})\\b"),
  },
  {
    name: "Carboninterface",
    regex: new RegExp("(?:carboninterface).{0,40}\\b([a-zA-Z0-9]{21})\\b"),
  },
  {
    name: "Cashboard - 1",
    regex: new RegExp(
      "(?:cashboard).{0,40}\\b([0-9A-Z]{3}-[0-9A-Z]{3}-[0-9A-Z]{3}-[0-9A-Z]{3})\\b"
    ),
  },
  {
    name: "Cashboard - 2",
    regex: new RegExp("(?:cashboard).{0,40}\\b([0-9a-z]{1,})\\b"),
  },
  {
    name: "Caspio - 1",
    regex: new RegExp("(?:caspio).{0,40}\\b([a-z0-9]{8})\\b"),
  },
  {
    name: "Caspio - 2",
    regex: new RegExp("(?:caspio).{0,40}\\b([a-z0-9]{50})\\b"),
  },
  {
    name: "Censys - 1",
    regex: new RegExp("(?:censys).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Censys - 2",
    regex: new RegExp("(?:censys).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Centralstationcrm",
    regex: new RegExp("(?:centralstation).{0,40}\\b([a-z0-9]{30})\\b"),
  },
  {
    name: "Cexio - 1",
    regex: new RegExp("(?:cexio|cex.io).{0,40}\\b([a-z]{2}[0-9]{9})\\b"),
  },
  {
    name: "Cexio - 2",
    regex: new RegExp("(?:cexio|cex.io).{0,40}\\b([0-9A-Za-z]{24,27})\\b"),
  },
  {
    name: "Chatbot",
    regex: new RegExp("(?:chatbot).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "Chatfule",
    regex: new RegExp("(?:chatfuel).{0,40}\\b([a-zA-Z0-9]{128})\\b"),
  },
  {
    name: "Checio",
    regex: new RegExp("(?:checio).{0,40}\\b(pk_[a-z0-9]{45})\\b"),
  },
  {
    name: "Checklyhq",
    regex: new RegExp("(?:checklyhq).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Checkout - 1",
    regex: new RegExp(
      "(?:checkout).{0,40}\\b((sk_|sk_test_)[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\\b"
    ),
  },
  {
    name: "Checkout - 2",
    regex: new RegExp("(?:checkout).{0,40}\\b(cus_[0-9a-zA-Z]{26})\\b"),
  },
  {
    name: "Checkvist - 1",
    regex: new RegExp(
      "(?:checkvist).{0,40}\\b([\\w\\.-]+@[\\w-]+\\.[\\w\\.-]{2,5})\\b"
    ),
  },
  {
    name: "Checkvist - 2",
    regex: new RegExp("(?:checkvist).{0,40}\\b([0-9a-zA-Z]{14})\\b"),
  },
  {
    name: "Cicero",
    regex: new RegExp("(?:cicero).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  { name: "Circleci", regex: new RegExp("(?:circle).{0,40}([a-fA-F0-9]{40})") },
  {
    name: "Clearbit",
    regex: new RegExp("(?:clearbit).{0,40}\\b([0-9a-z_]{35})\\b"),
  },
  {
    name: "Clickhelp - 1",
    regex: new RegExp("\\b([0-9A-Za-z]{3,20}.try.clickhelp.co)\\b"),
  },
  {
    name: "Clickhelp - 2",
    regex: new RegExp("(?:clickhelp).{0,40}\\b([0-9A-Za-z]{24})\\b"),
  },
  {
    name: "Clicksendsms - 2",
    regex: new RegExp(
      "(?:sms).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b"
    ),
  },
  {
    name: "Clickuppersonaltoken",
    regex: new RegExp("(?:clickup).{0,40}\\b(pk_[0-9]{8}_[0-9A-Z]{32})\\b"),
  },
  {
    name: "Cliengo",
    regex: new RegExp(
      "(?:cliengo).{0,40}\\b([0-9a-f]{8}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Clinchpad",
    regex: new RegExp("(?:clinchpad).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Clockify",
    regex: new RegExp("(?:clockify).{0,40}\\b([a-zA-Z0-9]{48})\\b"),
  },
  {
    name: "Clockworksms - 1",
    regex: new RegExp(
      "(?:clockwork|textanywhere).{0,40}\\b([0-9a-zA-Z]{24})\\b"
    ),
  },
  {
    name: "Clockworksms - 2",
    regex: new RegExp("(?:clockwork|textanywhere).{0,40}\\b([0-9]{5})\\b"),
  },
  { name: "Closecrm", regex: new RegExp("\\b(api_[a-z0-9A-Z.]{45})\\b") },
  {
    name: "Cloudelements - 1",
    regex: new RegExp("(?:cloudelements).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Cloudelements - 2",
    regex: new RegExp("(?:cloudelements).{0,40}\\b([a-zA-Z0-9]{43})\\b"),
  },
  {
    name: "Cloudflareapitoken",
    regex: new RegExp("(?:cloudflare).{0,40}\\b([A-Za-z0-9_-]{40})\\b"),
  },
  {
    name: "Cloudflarecakey",
    regex: new RegExp("(?:cloudflare).{0,40}\\b(v[A-Za-z0-9._-]{173,})\\b"),
  },
  {
    name: "Cloudimage",
    regex: new RegExp("(?:cloudimage).{0,40}\\b([a-z0-9_]{30})\\b"),
  },
  {
    name: "Cloudinary Credentials",
    regex: new RegExp(
      "cloudinary://[0-9]+:[A-Za-z0-9\\-_\\.]+@[A-Za-z0-9\\-_\\.]+"
    ),
  },
  {
    name: "Cloudmersive",
    regex: new RegExp("(?:cloudmersive).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Cloudplan",
    regex: new RegExp("(?:cloudplan).{0,40}\\b([A-Z0-9-]{32})\\b"),
  },
  {
    name: "Cloverly",
    regex: new RegExp("(?:cloverly).{0,40}\\b([a-z0-9:_]{28})\\b"),
  },
  {
    name: "Cloze - 1",
    regex: new RegExp("(?:cloze).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Cloze - 2",
    regex: new RegExp(
      "(?:cloze).{0,40}\\b([\\w\\.-]+@[\\w-]+\\.[\\w\\.-]{2,5})\\b"
    ),
  },
  {
    name: "Clustdoc",
    regex: new RegExp("(?:clustdoc).{0,40}\\b([0-9a-zA-Z]{60})\\b"),
  },
  {
    name: "Codacy",
    regex: new RegExp("(?:codacy).{0,40}\\b([0-9A-Za-z]{20})\\b"),
  },
  {
    name: "Coinapi",
    regex: new RegExp("(?:coinapi).{0,40}\\b([A-Z0-9-]{36})\\b"),
  },
  {
    name: "Coinbase",
    regex: new RegExp("(?:coinbase).{0,40}\\b([a-zA-Z-0-9]{64})\\b"),
  },
  {
    name: "Coinlayer",
    regex: new RegExp("(?:coinlayer).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Coinlib",
    regex: new RegExp("(?:coinlib).{0,40}\\b([a-z0-9]{16})\\b"),
  },
  {
    name: "Column",
    regex: new RegExp("(?:column).{0,40}\\b((?:test|live)_[a-zA-Z0-9]{27})\\b"),
  },
  {
    name: "Commercejs",
    regex: new RegExp("(?:commercejs).{0,40}\\b([a-z0-9_]{48})\\b"),
  },
  {
    name: "Commodities",
    regex: new RegExp("(?:commodities).{0,40}\\b([a-zA-Z0-9]{60})\\b"),
  },
  {
    name: "Companyhub - 1",
    regex: new RegExp("(?:companyhub).{0,40}\\b([0-9a-zA-Z]{20})\\b"),
  },
  {
    name: "Companyhub - 2",
    regex: new RegExp("(?:companyhub).{0,40}\\b([a-zA-Z0-9$%^=-]{4,32})\\b"),
  },
  {
    name: "Confluent - 1",
    regex: new RegExp("(?:confluent).{0,40}\\b([a-zA-Z-0-9]{16})\\b"),
  },
  {
    name: "Confluent - 2",
    regex: new RegExp("(?:confluent).{0,40}\\b([a-zA-Z-0-9]{64})\\b"),
  },
  {
    name: "Convertkit",
    regex: new RegExp("(?:convertkit).{0,40}\\b([a-z0-9A-Z_]{22})\\b"),
  },
  {
    name: "Convier",
    regex: new RegExp("(?:convier).{0,40}\\b([0-9]{2}\\|[a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Copper - 2",
    regex: new RegExp("(?:copper).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Countrylayer",
    regex: new RegExp("(?:countrylayer).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Courier",
    regex: new RegExp(
      "(?:courier).{0,40}\\b(pk\\_[a-zA-Z0-9]{1,}\\_[a-zA-Z0-9]{28})\\b"
    ),
  },
  {
    name: "Coveralls",
    regex: new RegExp("(?:coveralls).{0,40}\\b([a-zA-Z0-9-]{37})\\b"),
  },
  {
    name: "Crowdin",
    regex: new RegExp("(?:crowdin).{0,40}\\b([0-9A-Za-z]{80})\\b"),
  },
  {
    name: "Cryptocompare",
    regex: new RegExp("(?:cryptocompare).{0,40}\\b([a-z-0-9]{64})\\b"),
  },
  {
    name: "Currencycloud - 1",
    regex: new RegExp("(?:currencycloud).{0,40}\\b([0-9a-z]{64})\\b"),
  },
  {
    name: "Currencyfreaks",
    regex: new RegExp("(?:currencyfreaks).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Currencylayer",
    regex: new RegExp("(?:currencylayer).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Currencyscoop",
    regex: new RegExp("(?:currencyscoop).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Currentsapi",
    regex: new RegExp("(?:currentsapi).{0,40}\\b([a-zA-Z0-9\\S]{48})\\b"),
  },
  {
    name: "Customerguru - 1",
    regex: new RegExp("(?:guru).{0,40}\\b([a-z0-9A-Z]{50})\\b"),
  },
  {
    name: "Customerguru - 2",
    regex: new RegExp("(?:guru).{0,40}\\b([a-z0-9A-Z]{30})\\b"),
  },
  {
    name: "Customerio",
    regex: new RegExp("(?:customer).{0,40}\\b([a-z0-9A-Z]{20})\\b"),
  },
  {
    name: "D7network",
    regex: new RegExp("(?:d7network).{0,40}\\b([a-zA-Z0-9\\W\\S]{23}\\=)"),
  },
  {
    name: "Dailyco",
    regex: new RegExp("(?:daily).{0,40}\\b([0-9a-f]{64})\\b"),
  },
  {
    name: "Dandelion",
    regex: new RegExp("(?:dandelion).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  { name: "Databricks", regex: new RegExp("dapi[a-f0-9]{32}\\b") },
  {
    name: "Datadogtoken - 1",
    regex: new RegExp("(?:datadog).{0,40}\\b([a-zA-Z-0-9]{32})\\b"),
  },
  {
    name: "Datadogtoken - 2",
    regex: new RegExp("(?:datadog).{0,40}\\b([a-zA-Z-0-9]{40})\\b"),
  },
  {
    name: "Datafire",
    regex: new RegExp("(?:datafire).{0,40}\\b([a-z0-9\\S]{175,190})\\b"),
  },
  {
    name: "Datagov",
    regex: new RegExp("(?:data.gov).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Debounce",
    regex: new RegExp("(?:debounce).{0,40}\\b([a-zA-Z0-9]{13})\\b"),
  },
  {
    name: "Deepai",
    regex: new RegExp("(?:deepai).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Deepgram",
    regex: new RegExp("(?:deepgram).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Delighted",
    regex: new RegExp("(?:delighted).{0,40}\\b([a-z0-9A-Z]{32})\\b"),
  },
  {
    name: "Deputy - 1",
    regex: new RegExp("\\b([0-9a-z]{1,}.as.deputy.com)\\b"),
  },
  {
    name: "Deputy - 2",
    regex: new RegExp("(?:deputy).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Detectlanguage",
    regex: new RegExp("(?:detectlanguage).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  { name: "Dfuse", regex: new RegExp("\\b(web\\_[0-9a-z]{32})\\b") },
  {
    name: "Diffbot",
    regex: new RegExp("(?:diffbot).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Digitaloceantoken",
    regex: new RegExp("(?:digitalocean).{0,40}\\b([A-Za-z0-9_-]{64})\\b"),
  },
  {
    name: "Discord Webhook",
    regex: new RegExp(
      "https://discordapp\\.com/api/webhooks/[0-9]+/[A-Za-z0-9\\-]+"
    ),
  },
  {
    name: "Discordbottoken - 1",
    regex: new RegExp(
      "(?:discord).{0,40}\\b([A-Za-z0-9_-]{24}\\.[A-Za-z0-9_-]{6}\\.[A-Za-z0-9_-]{27})\\b"
    ),
  },
  {
    name: "Discordbottoken - 2",
    regex: new RegExp("(?:discord).{0,40}\\b([0-9]{17})\\b"),
  },
  {
    name: "Discordwebhook",
    regex: new RegExp(
      "(https:\\/\\/discord.com\\/api\\/webhooks\\/[0-9]{18}\\/[0-9a-zA-Z-]{68})"
    ),
  },
  {
    name: "Ditto",
    regex: new RegExp(
      "(?:ditto).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12}\\.[a-z0-9]{40})\\b"
    ),
  },
  {
    name: "Dnscheck - 1",
    regex: new RegExp("(?:dnscheck).{0,40}\\b([a-z0-9A-Z-]{36})\\b"),
  },
  {
    name: "Dnscheck - 2",
    regex: new RegExp("(?:dnscheck).{0,40}\\b([a-z0-9A-Z]{32})\\b"),
  },
  {
    name: "Documo",
    regex: new RegExp(
      "\\b(ey[a-zA-Z0-9]{34}.ey[a-zA-Z0-9]{154}.[a-zA-Z0-9_-]{43})\\b"
    ),
  },
  { name: "Doppler", regex: new RegExp("\\b(dp\\.pt\\.[a-zA-Z0-9]{43})\\b") },
  {
    name: "Dotmailer - 1",
    regex: new RegExp(
      "(?:dotmailer).{0,40}\\b(apiuser-[a-z0-9]{12}@apiconnector.com)\\b"
    ),
  },
  {
    name: "Dotmailer - 2",
    regex: new RegExp("(?:dotmailer).{0,40}\\b([a-zA-Z0-9\\S]{8,24})\\b"),
  },
  {
    name: "Dovico",
    regex: new RegExp("(?:dovico).{0,40}\\b([0-9a-z]{32}\\.[0-9a-z]{1,}\\b)"),
  },
  {
    name: "Dronahq",
    regex: new RegExp("(?:dronahq).{0,40}\\b([a-z0-9]{50})\\b"),
  },
  {
    name: "Droneci",
    regex: new RegExp("(?:droneci).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Dropbox",
    regex: new RegExp("\\b(sl\\.[A-Za-z0-9\\-\\_]{130,140})\\b"),
  },
  {
    name: "Dwolla",
    regex: new RegExp("(?:dwolla).{0,40}\\b([a-zA-Z-0-9]{50})\\b"),
  },
  {
    name: "Dynalist",
    regex: new RegExp("(?:dynalist).{0,40}\\b([a-zA-Z0-9-_]{128})\\b"),
  },
  {
    name: "Dynatrace token",
    regex: new RegExp("dt0[a-zA-Z]{1}[0-9]{2}\\.[A-Z0-9]{24}\\.[A-Z0-9]{64}"),
  },
  {
    name: "Dyspatch",
    regex: new RegExp("(?:dyspatch).{0,40}\\b([A-Z0-9]{52})\\b"),
  },
  { name: "EC", regex: new RegExp("-----BEGIN EC PRIVATE KEY-----") },
  {
    name: "Eagleeyenetworks - 1",
    regex: new RegExp(
      "(?:eagleeyenetworks).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b"
    ),
  },
  {
    name: "Eagleeyenetworks - 2",
    regex: new RegExp("(?:eagleeyenetworks).{0,40}\\b([a-zA-Z0-9]{15})\\b"),
  },
  {
    name: "Easyinsight - 1",
    regex: new RegExp(
      "(?:easyinsight|easy-insight).{0,40}\\b([a-zA-Z0-9]{20})\\b"
    ),
  },
  {
    name: "Easyinsight - 2",
    regex: new RegExp(
      "(?:easyinsight|easy-insight).{0,40}\\b([0-9Aa-zA-Z]{20})\\b"
    ),
  },
  {
    name: "Edamam - 1",
    regex: new RegExp("(?:edamam).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Edamam - 2",
    regex: new RegExp("(?:edamam).{0,40}\\b([0-9a-z]{8})\\b"),
  },
  {
    name: "Edenai",
    regex: new RegExp(
      "(?:edenai).{0,40}\\b([a-zA-Z0-9]{36}.[a-zA-Z0-9]{92}.[a-zA-Z0-9_]{43})\\b"
    ),
  },
  {
    name: "Eightxeight - 1",
    regex: new RegExp("(?:8x8).{0,40}\\b([a-zA-Z0-9_]{18,30})\\b"),
  },
  {
    name: "Eightxeight - 2",
    regex: new RegExp("(?:8x8).{0,40}\\b([a-zA-Z0-9]{43})\\b"),
  },
  {
    name: "Elasticemail",
    regex: new RegExp("(?:elastic).{0,40}\\b([A-Za-z0-9_-]{96})\\b"),
  },
  {
    name: "Enablex - 1",
    regex: new RegExp("(?:enablex).{0,40}\\b([a-zA-Z0-9]{36})\\b"),
  },
  {
    name: "Enablex - 2",
    regex: new RegExp("(?:enablex).{0,40}\\b([a-z0-9]{24})\\b"),
  },
  {
    name: "Enigma",
    regex: new RegExp("(?:enigma).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Ethplorer",
    regex: new RegExp("(?:ethplorer).{0,40}\\b([a-z0-9A-Z-]{22})\\b"),
  },
  {
    name: "Etsyapikey",
    regex: new RegExp("(?:etsy).{0,40}\\b([a-zA-Z-0-9]{24})\\b"),
  },
  {
    name: "Everhour",
    regex: new RegExp(
      "(?:everhour).{0,40}\\b([0-9Aa-f]{4}-[0-9a-f]{4}-[0-9a-f]{6}-[0-9a-f]{6}-[0-9a-f]{8})\\b"
    ),
  },
  {
    name: "Exchangerateapi",
    regex: new RegExp("(?:exchangerate).{0,40}\\b([a-z0-9]{24})\\b"),
  },
  {
    name: "Exchangeratesapi",
    regex: new RegExp("(?:exchangerates).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "FCM Server Key",
    regex: new RegExp("AAAA[a-zA-Z0-9_-]{7}:[a-zA-Z0-9_-]{140}"),
  },
  {
    name: "FCM_server_key",
    regex: new RegExp("(AAAA[a-zA-Z0-9_-]{7}:[a-zA-Z0-9_-]{140})"),
  },
  {
    name: "Facebook Access Token",
    regex: new RegExp("EAACEdEose0cBA[0-9A-Za-z]+"),
  },
  {
    name: "Facebook OAuth",
    regex: new RegExp(
      "[fF][aA][cC][eE][bB][oO][oO][kK].*['|\"][0-9a-f]{32}['|\"]"
    ),
  },
  {
    name: "Facebookoauth",
    regex: new RegExp("(?:facebook).{0,40}\\b([A-Za-z0-9]{32})\\b"),
  },
  {
    name: "Faceplusplus",
    regex: new RegExp("(?:faceplusplus).{0,40}\\b([0-9a-zA-Z_-]{32})\\b"),
  },
  {
    name: "Fakejson",
    regex: new RegExp("(?:fakejson).{0,40}\\b([a-zA-Z0-9]{22})\\b"),
  },
  {
    name: "Fastforex",
    regex: new RegExp("(?:fastforex).{0,40}\\b([a-z0-9-]{28})\\b"),
  },
  {
    name: "Fastlypersonaltoken",
    regex: new RegExp("(?:fastly).{0,40}\\b([A-Za-z0-9_-]{32})\\b"),
  },
  {
    name: "Feedier",
    regex: new RegExp("(?:feedier).{0,40}\\b([a-z0-9A-Z]{32})\\b"),
  },
  {
    name: "Fetchrss",
    regex: new RegExp("(?:fetchrss).{0,40}\\b([0-9A-Za-z.]{40})\\b"),
  },
  {
    name: "Figmapersonalaccesstoken",
    regex: new RegExp(
      "(?:figma).{0,40}\\b([0-9]{6}-[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "Fileio",
    regex: new RegExp("(?:fileio).{0,40}\\b([A-Z0-9.-]{39})\\b"),
  },
  { name: "Finage", regex: new RegExp("\\b(API_KEY[0-9A-Z]{32})\\b") },
  {
    name: "Financialmodelingprep",
    regex: new RegExp(
      "(?:financialmodelingprep).{0,40}\\b([a-zA-Z0-9]{32})\\b"
    ),
  },
  {
    name: "Findl",
    regex: new RegExp(
      "(?:findl).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Finnhub",
    regex: new RegExp("(?:finnhub).{0,40}\\b([0-9a-z]{20})\\b"),
  },
  {
    name: "Firebase Database Detect - 1",
    regex: new RegExp("[a-z0-9.-]+\\.firebaseio\\.com"),
  },
  {
    name: "Firebase Database Detect - 2",
    regex: new RegExp("[a-z0-9.-]+\\.firebaseapp\\.com"),
  },
  {
    name: "Fixerio",
    regex: new RegExp("(?:fixer).{0,40}\\b([A-Za-z0-9]{32})\\b"),
  },
  { name: "Flatio", regex: new RegExp("(?:flat).{0,40}\\b([0-9a-z]{128})\\b") },
  { name: "Fleetbase", regex: new RegExp("\\b(flb_live_[0-9a-zA-Z]{20})\\b") },
  {
    name: "Flickr",
    regex: new RegExp("(?:flickr).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Flightapi",
    regex: new RegExp("(?:flightapi).{0,40}\\b([a-z0-9]{24})\\b"),
  },
  {
    name: "Flightstats - 1",
    regex: new RegExp("(?:flightstats).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Flightstats - 2",
    regex: new RegExp("(?:flightstats).{0,40}\\b([0-9a-z]{8})\\b"),
  },
  {
    name: "Float",
    regex: new RegExp("(?:float).{0,40}\\b([a-zA-Z0-9-._+=]{59,60})\\b"),
  },
  {
    name: "Flowflu - 2",
    regex: new RegExp("(?:flowflu).{0,40}\\b([a-zA-Z0-9]{51})\\b"),
  },
  { name: "Flutterwave", regex: new RegExp("\\b(FLWSECK-[0-9a-z]{32}-X)\\b") },
  {
    name: "Fmfw - 1",
    regex: new RegExp("(?:fmfw).{0,40}\\b([a-zA-Z0-9-]{32})\\b"),
  },
  {
    name: "Fmfw - 2",
    regex: new RegExp("(?:fmfw).{0,40}\\b([a-zA-Z0-9_-]{32})\\b"),
  },
  {
    name: "Formbucket",
    regex: new RegExp(
      "(?:formbucket).{0,40}\\b([0-9A-Za-z]{1,}.[0-9A-Za-z]{1,}\\.[0-9A-Z-a-z\\-_]{1,})"
    ),
  },
  {
    name: "Formio",
    regex: new RegExp(
      "(?:formio).{0,40}\\b(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\\.[0-9A-Za-z]{310}\\.[0-9A-Z-a-z\\-_]{43}[ \\r\\n]{1})"
    ),
  },
  {
    name: "Foursquare",
    regex: new RegExp("(?:foursquare).{0,40}\\b([0-9A-Z]{48})\\b"),
  },
  { name: "Frameio", regex: new RegExp("\\b(fio-u-[0-9a-zA-Z_-]{64})\\b") },
  {
    name: "Freshbooks - 1",
    regex: new RegExp("(?:freshbooks).{0,40}\\b([0-9a-z]{64})\\b"),
  },
  {
    name: "Freshbooks - 2",
    regex: new RegExp(
      "(?:freshbooks).{0,40}\\b(https://www.[0-9A-Za-z_-]{1,}.com)\\b"
    ),
  },
  {
    name: "Freshdesk - 1",
    regex: new RegExp("(?:freshdesk).{0,40}\\b([0-9A-Za-z]{20})\\b"),
  },
  {
    name: "Freshdesk - 2",
    regex: new RegExp("\\b([0-9a-z-]{1,}.freshdesk.com)\\b"),
  },
  {
    name: "Front",
    regex: new RegExp(
      "(?:front).{0,40}\\b([0-9a-zA-Z]{36}.[0-9a-zA-Z\\.\\-\\_]{188,244})\\b"
    ),
  },
  {
    name: "Fulcrum",
    regex: new RegExp("(?:fulcrum).{0,40}\\b([a-z0-9]{80})\\b"),
  },
  {
    name: "Fullstory",
    regex: new RegExp("(?:fullstory).{0,40}\\b([a-zA-Z-0-9/+]{88})\\b"),
  },
  {
    name: "Fusebill",
    regex: new RegExp("(?:fusebill).{0,40}\\b([a-zA-Z0-9]{88})\\b"),
  },
  {
    name: "Fxmarket",
    regex: new RegExp("(?:fxmarket).{0,40}\\b([0-9Aa-zA-Z-_=]{20})\\b"),
  },
  {
    name: "Gcp",
    regex: new RegExp("\\{[^{]+auth_provider_x509_cert_url[^}]+\\}"),
  },
  {
    name: "Geckoboard",
    regex: new RegExp("(?:geckoboard).{0,40}\\b([a-zA-Z0-9]{44})\\b"),
  },
  { name: "Generic - 1376", regex: new RegExp("jdbc:mysql(=| =|:| :)") },
  {
    name: "Generic - 1688",
    regex: new RegExp(
      "TOKEN[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}"
    ),
  },
  {
    name: "Generic - 1689",
    regex: new RegExp(
      "API[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}"
    ),
  },
  {
    name: "Generic - 1691",
    regex: new RegExp(
      "SECRET[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}"
    ),
  },
  {
    name: "Generic - 1692",
    regex: new RegExp(
      "AUTHORIZATION[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}"
    ),
  },
  {
    name: "Generic - 1693",
    regex: new RegExp(
      "PASSWORD[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}"
    ),
  },
  {
    name: "Generic - 1695",
    regex: new RegExp(
      "(A|a)(P|p)(Ii)[\\-|_|A-Za-z0-9]*(\\''|\")?( )*(:|=)( )*(\\''|\")?[0-9A-Za-z\\-_]+(\\''|\")?"
    ),
  },
  { name: "Generic - 1700", regex: new RegExp("BEGIN OPENSSH PRIVATE KEY") },
  { name: "Generic - 1701", regex: new RegExp("BEGIN PRIVATE KEY") },
  { name: "Generic - 1702", regex: new RegExp("BEGIN RSA PRIVATE KEY") },
  { name: "Generic - 1703", regex: new RegExp("BEGIN DSA PRIVATE KEY") },
  { name: "Generic - 1704", regex: new RegExp("BEGIN EC PRIVATE KEY") },
  { name: "Generic - 1705", regex: new RegExp("BEGIN PGP PRIVATE KEY BLOCK") },
  {
    name: "Generic - 1707",
    regex: new RegExp("[a-z0-9.-]+\\.s3-[a-z0-9-]\\.amazonaws\\.com"),
  },
  {
    name: "Generic - 1708",
    regex: new RegExp("[a-z0-9.-]+\\.s3-website[.-](eu|ap|us|ca|sa|cn)"),
  },
  { name: "Generic - 1710", regex: new RegExp("algolia_api_key") },
  { name: "Generic - 1711", regex: new RegExp("asana_access_token") },
  { name: "Generic - 1713", regex: new RegExp("azure_tenant") },
  { name: "Generic - 1714", regex: new RegExp("bitly_access_token") },
  { name: "Generic - 1715", regex: new RegExp("branchio_secret") },
  { name: "Generic - 1716", regex: new RegExp("browserstack_access_key") },
  { name: "Generic - 1717", regex: new RegExp("buildkite_access_token") },
  { name: "Generic - 1718", regex: new RegExp("comcast_access_token") },
  { name: "Generic - 1719", regex: new RegExp("datadog_api_key") },
  { name: "Generic - 1720", regex: new RegExp("deviantart_secret") },
  { name: "Generic - 1721", regex: new RegExp("deviantart_access_token") },
  { name: "Generic - 1722", regex: new RegExp("dropbox_api_token") },
  { name: "Generic - 1723", regex: new RegExp("facebook_appsecret") },
  { name: "Generic - 1724", regex: new RegExp("facebook_access_token") },
  { name: "Generic - 1725", regex: new RegExp("firebase_custom_token") },
  { name: "Generic - 1726", regex: new RegExp("firebase_id_token") },
  { name: "Generic - 1727", regex: new RegExp("github_client") },
  { name: "Generic - 1728", regex: new RegExp("github_ssh_key") },
  { name: "Generic - 1730", regex: new RegExp("gitlab_private_token") },
  { name: "Generic - 1731", regex: new RegExp("google_cm") },
  { name: "Generic - 1732", regex: new RegExp("google_maps_key") },
  { name: "Generic - 1733", regex: new RegExp("heroku_api_key") },
  { name: "Generic - 1734", regex: new RegExp("instagram_access_token") },
  { name: "Generic - 1735", regex: new RegExp("mailchimp_api_key") },
  { name: "Generic - 1736", regex: new RegExp("mailgun_api_key") },
  { name: "Generic - 1737", regex: new RegExp("mailjet") },
  { name: "Generic - 1738", regex: new RegExp("mapbox_access_token") },
  { name: "Generic - 1739", regex: new RegExp("pagerduty_api_token") },
  { name: "Generic - 1740", regex: new RegExp("paypal_key_sb") },
  { name: "Generic - 1741", regex: new RegExp("paypal_key_live") },
  { name: "Generic - 1742", regex: new RegExp("paypal_token_sb") },
  { name: "Generic - 1743", regex: new RegExp("paypal_token_live") },
  { name: "Generic - 1744", regex: new RegExp("pendo_integration_key") },
  { name: "Generic - 1745", regex: new RegExp("salesforce_access_token") },
  { name: "Generic - 1746", regex: new RegExp("saucelabs_ukey") },
  { name: "Generic - 1747", regex: new RegExp("sendgrid_api_key") },
  { name: "Generic - 1748", regex: new RegExp("slack_api_token") },
  { name: "Generic - 1749", regex: new RegExp("slack_webhook") },
  { name: "Generic - 1750", regex: new RegExp("square_secret") },
  { name: "Generic - 1751", regex: new RegExp("square_auth_token") },
  { name: "Generic - 1752", regex: new RegExp("travisci_api_token") },
  { name: "Generic - 1753", regex: new RegExp("twilio_sid_token") },
  { name: "Generic - 1754", regex: new RegExp("twitter_api_secret") },
  { name: "Generic - 1755", regex: new RegExp("twitter_bearer_token") },
  { name: "Generic - 1756", regex: new RegExp("spotify_access_token") },
  { name: "Generic - 1757", regex: new RegExp("stripe_key_live") },
  { name: "Generic - 1758", regex: new RegExp("wakatime_api_key") },
  { name: "Generic - 1759", regex: new RegExp("wompi_auth_bearer_sb") },
  { name: "Generic - 1760", regex: new RegExp("wompi_auth_bearer_live") },
  { name: "Generic - 1761", regex: new RegExp("wpengine_api_key") },
  { name: "Generic - 1762", regex: new RegExp("zapier_webhook") },
  { name: "Generic - 1763", regex: new RegExp("zendesk_access_token") },
  { name: "Generic - 1764", regex: new RegExp("ssh-rsa") },
  {
    name: "Generic - 1765",
    regex: new RegExp("s3-[a-z0-9-]+\\.amazonaws\\.com/[a-z0-9._-]+"),
  },
  {
    name: "Generic Secret",
    regex: new RegExp(
      "[sS][eE][cC][rR][eE][tT].*['|\"][0-9a-zA-Z]{32,45}['|\"]"
    ),
  },
  {
    name: "Generic webhook secret",
    regex: new RegExp("(webhook).+(secret|token|key).+"),
  },
  {
    name: "Gengo",
    regex: new RegExp(
      "(?:gengo).{0,40}([ ]{0,1}[0-9a-zA-Z\\[\\]\\-\\(\\)\\{\\}|_^@$=~]{64}[ \\r\\n]{1})"
    ),
  },
  {
    name: "Geoapify",
    regex: new RegExp("(?:geoapify).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Geocode",
    regex: new RegExp("(?:geocode).{0,40}\\b([a-z0-9]{28})\\b"),
  },
  {
    name: "Geocodify",
    regex: new RegExp("(?:geocodify).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Geocodio - 2",
    regex: new RegExp("(?:geocod).{0,40}\\b([a-z0-9]{39})\\b"),
  },
  {
    name: "Geoipifi",
    regex: new RegExp("(?:ipifi).{0,40}\\b([a-z0-9A-Z_]{32})\\b"),
  },
  {
    name: "Getemail",
    regex: new RegExp("(?:getemail).{0,40}\\b([a-zA-Z0-9-]{20})\\b"),
  },
  {
    name: "Getemails - 1",
    regex: new RegExp("(?:getemails).{0,40}\\b([a-z0-9-]{26})\\b"),
  },
  {
    name: "Getemails - 2",
    regex: new RegExp("(?:getemails).{0,40}\\b([a-z0-9-]{18})\\b"),
  },
  {
    name: "Getgeoapi",
    regex: new RegExp("(?:getgeoapi).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Getgist",
    regex: new RegExp("(?:getgist).{0,40}\\b([a-z0-9A-Z+=]{68})"),
  },
  {
    name: "Getsandbox - 1",
    regex: new RegExp("(?:getsandbox).{0,40}\\b([a-z0-9-]{40})\\b"),
  },
  {
    name: "Getsandbox - 2",
    regex: new RegExp("(?:getsandbox).{0,40}\\b([a-z0-9-]{15,30})\\b"),
  },
  {
    name: "GitHub",
    regex: new RegExp(
      "[gG][iI][tT][hH][uU][bB].*['|\"][0-9a-zA-Z]{35,40}['|\"]"
    ),
  },
  {
    name: "Github - 2",
    regex: new RegExp("\\b((?:ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36,255}\\b)"),
  },
  { name: "Github App Token", regex: new RegExp("(ghu|ghs)_[0-9a-zA-Z]{36}") },
  {
    name: "Github OAuth Access Token",
    regex: new RegExp("gho_[0-9a-zA-Z]{36}"),
  },
  {
    name: "Github Personal Access Token",
    regex: new RegExp("ghp_[0-9a-zA-Z]{36}"),
  },
  { name: "Github Refresh Token", regex: new RegExp("ghr_[0-9a-zA-Z]{76}") },
  {
    name: "Github_old",
    regex: new RegExp("(?:github)[^\\.].{0,40}[ =:'\"]+([a-f0-9]{40})\\b"),
  },
  {
    name: "Githubapp - 1",
    regex: new RegExp("(?:github).{0,40}\\b([0-9]{6})\\b"),
  },
  {
    name: "Githubapp - 2",
    regex: new RegExp(
      "(?:github).{0,40}(-----BEGIN RSA PRIVATE KEY-----\\s[A-Za-z0-9+\\/\\s]*\\s-----END RSA PRIVATE KEY-----)"
    ),
  },
  {
    name: "Gitlab",
    regex: new RegExp("(?:gitlab).{0,40}\\b([a-zA-Z0-9\\-=_]{20,22})\\b"),
  },
  {
    name: "Gitlabv2",
    regex: new RegExp("\\b(glpat-[a-zA-Z0-9\\-=_]{20,22})\\b"),
  },
  {
    name: "Gitter",
    regex: new RegExp("(?:gitter).{0,40}\\b([a-z0-9-]{40})\\b"),
  },
  {
    name: "Glassnode",
    regex: new RegExp("(?:glassnode).{0,40}\\b([0-9A-Za-z]{27})\\b"),
  },
  {
    name: "Gocanvas - 1",
    regex: new RegExp("(?:gocanvas).{0,40}\\b([0-9A-Za-z/+]{43}=[ \\r\\n]{1})"),
  },
  {
    name: "Gocanvas - 2",
    regex: new RegExp(
      "(?:gocanvas).{0,40}\\b([\\w\\.-]+@[\\w-]+\\.[\\w\\.-]{2,5})\\b"
    ),
  },
  {
    name: "Gocardless",
    regex: new RegExp("\\b(live_[0-9A-Za-z\\_\\-]{40}[ \"'\\r\\n]{1})"),
  },
  {
    name: "Goodday",
    regex: new RegExp("(?:goodday).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Google (GCP) Service Account",
    regex: new RegExp('"type": "service_account"'),
  },
  { name: "Google API Key", regex: new RegExp("AIza[0-9a-z-_]{35}") },
  {
    name: "Google Calendar URI",
    regex: new RegExp(
      "https://www\\.google\\.com/calendar/embed\\?src=[A-Za-z0-9%@&;=\\-_\\./]+"
    ),
  },
  {
    name: "Google OAuth Access Token",
    regex: new RegExp("ya29\\.[0-9A-Za-z\\-_]+"),
  },
  {
    name: "Graphcms - 1",
    regex: new RegExp("(?:graph).{0,40}\\b([a-z0-9]{25})\\b"),
  },
  {
    name: "Graphcms - 2",
    regex: new RegExp(
      "\\b(ey[a-zA-Z0-9]{73}.ey[a-zA-Z0-9]{365}.[a-zA-Z0-9_-]{683})\\b"
    ),
  },
  {
    name: "Graphhopper",
    regex: new RegExp("(?:graphhopper).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Groovehq",
    regex: new RegExp("(?:groove).{0,40}\\b([a-z0-9A-Z]{64})"),
  },
  {
    name: "Guru - 1",
    regex: new RegExp(
      "(?:guru).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b"
    ),
  },
  {
    name: "Guru - 2",
    regex: new RegExp(
      "(?:guru).{0,40}\\b([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Gyazo",
    regex: new RegExp("(?:gyazo).{0,40}\\b([0-9A-Za-z-]{43})\\b"),
  },
  { name: "Happi", regex: new RegExp("(?:happi).{0,40}\\b([a-zA-Z0-9]{56})") },
  {
    name: "Happyscribe",
    regex: new RegExp("(?:happyscribe).{0,40}\\b([0-9a-zA-Z]{24})\\b"),
  },
  {
    name: "Harvest - 1",
    regex: new RegExp("(?:harvest).{0,40}\\b([a-z0-9A-Z._]{97})\\b"),
  },
  {
    name: "Harvest - 2",
    regex: new RegExp("(?:harvest).{0,40}\\b([0-9]{4,9})\\b"),
  },
  {
    name: "Hellosign",
    regex: new RegExp("(?:hellosign).{0,40}\\b([a-zA-Z-0-9/+]{64})\\b"),
  },
  {
    name: "Helpcrunch",
    regex: new RegExp("(?:helpcrunch).{0,40}\\b([a-zA-Z-0-9+/=]{328})"),
  },
  {
    name: "Helpscout",
    regex: new RegExp("(?:helpscout).{0,40}\\b([A-Za-z0-9]{56})\\b"),
  },
  {
    name: "Hereapi",
    regex: new RegExp("(?:hereapi).{0,40}\\b([a-zA-Z0-9\\S]{43})\\b"),
  },
  {
    name: "Heroku",
    regex: new RegExp(
      "(?:heroku).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Hive - 1",
    regex: new RegExp("(?:hive).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Hive - 2",
    regex: new RegExp("(?:hive).{0,40}\\b([0-9A-Za-z]{17})\\b"),
  },
  {
    name: "Hiveage",
    regex: new RegExp("(?:hiveage).{0,40}\\b([0-9A-Za-z\\_\\-]{20})\\b"),
  },
  {
    name: "Holidayapi",
    regex: new RegExp("(?:holidayapi).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  { name: "Host", regex: new RegExp("(?:host).{0,40}\\b([a-z0-9]{14})\\b") },
  {
    name: "Html2pdf",
    regex: new RegExp("(?:html2pdf).{0,40}\\b([a-zA-Z0-9]{64})\\b"),
  },
  {
    name: "Hubspotapikey",
    regex: new RegExp(
      "(?:hubspot).{0,40}\\b([A-Za-z0-9]{8}\\-[A-Za-z0-9]{4}\\-[A-Za-z0-9]{4}\\-[A-Za-z0-9]{4}\\-[A-Za-z0-9]{12})\\b"
    ),
  },
  {
    name: "Humanity",
    regex: new RegExp("(?:humanity).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Hunter",
    regex: new RegExp("(?:hunter).{0,40}\\b([a-z0-9_-]{40})\\b"),
  },
  {
    name: "Hypertrack - 1",
    regex: new RegExp("(?:hypertrack).{0,40}\\b([0-9a-zA-Z\\_\\-]{54})\\b"),
  },
  {
    name: "Hypertrack - 2",
    regex: new RegExp("(?:hypertrack).{0,40}\\b([0-9a-zA-Z\\_\\-]{27})\\b"),
  },
  {
    name: "Ibmclouduserkey",
    regex: new RegExp("(?:ibm).{0,40}\\b([A-Za-z0-9_-]{44})\\b"),
  },
  {
    name: "Iconfinder",
    regex: new RegExp("(?:iconfinder).{0,40}\\b([a-zA-Z0-9]{64})\\b"),
  },
  {
    name: "Iexcloud",
    regex: new RegExp("(?:iexcloud).{0,40}\\b([a-z0-9_]{35})\\b"),
  },
  {
    name: "Imagekit",
    regex: new RegExp("(?:imagekit).{0,40}\\b([a-zA-Z0-9_=]{36})"),
  },
  {
    name: "Imagga",
    regex: new RegExp("(?:imagga).{0,40}\\b([a-z0-9A-Z=]{72})"),
  },
  {
    name: "Impala",
    regex: new RegExp("(?:impala).{0,40}\\b([0-9A-Za-z_]{46})\\b"),
  },
  {
    name: "Insightly",
    regex: new RegExp("(?:insightly).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Integromat",
    regex: new RegExp("(?:integromat).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Intercom",
    regex: new RegExp("(?:intercom).{0,40}\\b([a-zA-Z0-9\\W\\S]{59}\\=)"),
  },
  {
    name: "Intrinio",
    regex: new RegExp("(?:intrinio).{0,40}\\b([a-zA-Z0-9]{44})\\b"),
  },
  {
    name: "Invoiceocean - 1",
    regex: new RegExp("(?:invoiceocean).{0,40}\\b([0-9A-Za-z]{20})\\b"),
  },
  {
    name: "Invoiceocean - 2",
    regex: new RegExp("\\b([0-9a-z]{1,}.invoiceocean.com)\\b"),
  },
  { name: "Ipapi", regex: new RegExp("(?:ipapi).{0,40}\\b([a-z0-9]{32})\\b") },
  {
    name: "Ipgeolocation",
    regex: new RegExp("(?:ipgeolocation).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Ipify",
    regex: new RegExp("(?:ipify).{0,40}\\b([a-zA-Z0-9_-]{32})\\b"),
  },
  {
    name: "Ipinfodb",
    regex: new RegExp("(?:ipinfodb).{0,40}\\b([a-z0-9]{64})\\b"),
  },
  {
    name: "Ipquality",
    regex: new RegExp("(?:ipquality).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Ipstack",
    regex: new RegExp("(?:ipstack).{0,40}\\b([a-fA-f0-9]{32})\\b"),
  },
  {
    name: "JDBC Connection String",
    regex: new RegExp("jdbc:[a-z:]+://[A-Za-z0-9\\.\\-_:;=/@?,&]+"),
  },
  {
    name: "Jiratoken - 1",
    regex: new RegExp("(?:jira).{0,40}\\b([a-zA-Z-0-9]{24})\\b"),
  },
  {
    name: "Jiratoken - 2",
    regex: new RegExp(
      "(?:jira).{0,40}\\b([a-zA-Z-0-9]{5,24}\\@[a-zA-Z-0-9]{3,16}\\.com)\\b"
    ),
  },
  {
    name: "Jiratoken - 3",
    regex: new RegExp(
      "(?:jira).{0,40}\\b([a-zA-Z-0-9]{5,24}\\.[a-zA-Z-0-9]{3,16}\\.[a-zA-Z-0-9]{3,16})\\b"
    ),
  },
  {
    name: "Jotform",
    regex: new RegExp("(?:jotform).{0,40}\\b([0-9Aa-z]{32})\\b"),
  },
  {
    name: "Jumpcloud",
    regex: new RegExp("(?:jumpcloud).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  { name: "Juro", regex: new RegExp("(?:juro).{0,40}\\b([a-zA-Z0-9]{40})\\b") },
  {
    name: "Kanban - 1",
    regex: new RegExp("(?:kanban).{0,40}\\b([0-9A-Z]{12})\\b"),
  },
  {
    name: "Kanban - 2",
    regex: new RegExp("\\b([0-9a-z]{1,}.kanbantool.com)\\b"),
  },
  {
    name: "Karmacrm",
    regex: new RegExp("(?:karma).{0,40}\\b([a-zA-Z0-9]{20})\\b"),
  },
  {
    name: "Keenio - 1",
    regex: new RegExp("(?:keen).{0,40}\\b([0-9a-z]{24})\\b"),
  },
  {
    name: "Keenio - 2",
    regex: new RegExp("(?:keen).{0,40}\\b([0-9A-Z]{64})\\b"),
  },
  {
    name: "Kickbox",
    regex: new RegExp("(?:kickbox).{0,40}\\b([a-zA-Z0-9_]+[a-zA-Z0-9]{64})\\b"),
  },
  {
    name: "Klipfolio",
    regex: new RegExp("(?:klipfolio).{0,40}\\b([0-9a-f]{40})\\b"),
  },
  {
    name: "Kontent",
    regex: new RegExp("(?:kontent).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Kraken - 1",
    regex: new RegExp(
      "(?:kraken).{0,40}\\b([0-9A-Za-z\\/\\+=]{56}[ \"'\\r\\n]{1})"
    ),
  },
  {
    name: "Kraken - 2",
    regex: new RegExp(
      "(?:kraken).{0,40}\\b([0-9A-Za-z\\/\\+=]{86,88}[ \"'\\r\\n]{1})"
    ),
  },
  {
    name: "Kucoin - 1",
    regex: new RegExp("(?:kucoin).{0,40}([ \\r\\n]{1}[!-~]{7,32}[ \\r\\n]{1})"),
  },
  {
    name: "Kucoin - 2",
    regex: new RegExp(
      "(?:kucoin).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Kucoin - 3",
    regex: new RegExp("(?:kucoin).{0,40}\\b([0-9a-f]{24})\\b"),
  },
  { name: "Kylas", regex: new RegExp("(?:kylas).{0,40}\\b([a-z0-9-]{36})\\b") },
  {
    name: "Languagelayer",
    regex: new RegExp("(?:languagelayer).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Lastfm",
    regex: new RegExp("(?:lastfm).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Launchdarkly",
    regex: new RegExp("(?:launchdarkly).{0,40}\\b([a-z0-9-]{40})\\b"),
  },
  {
    name: "Leadfeeder",
    regex: new RegExp("(?:leadfeeder).{0,40}\\b([a-zA-Z0-9-]{43})\\b"),
  },
  {
    name: "Lendflow",
    regex: new RegExp(
      "(?:lendflow).{0,40}\\b([a-zA-Z0-9]{36}\\.[a-zA-Z0-9]{235}\\.[a-zA-Z0-9]{32}\\-[a-zA-Z0-9]{47}\\-[a-zA-Z0-9_]{162}\\-[a-zA-Z0-9]{42}\\-[a-zA-Z0-9_]{40}\\-[a-zA-Z0-9_]{66}\\-[a-zA-Z0-9_]{59}\\-[a-zA-Z0-9]{7}\\-[a-zA-Z0-9_]{220})\\b"
    ),
  },
  {
    name: "Lessannoyingcrm",
    regex: new RegExp("(?:less).{0,40}\\b([a-zA-Z0-9-]{57})\\b"),
  },
  {
    name: "Lexigram",
    regex: new RegExp("(?:lexigram).{0,40}\\b([a-zA-Z0-9\\S]{301})\\b"),
  },
  { name: "Linearapi", regex: new RegExp("\\b(lin_api_[0-9A-Za-z]{40})\\b") },
  {
    name: "Linemessaging",
    regex: new RegExp("(?:line).{0,40}\\b([A-Za-z0-9+/]{171,172})\\b"),
  },
  {
    name: "Linenotify",
    regex: new RegExp("(?:linenotify).{0,40}\\b([0-9A-Za-z]{43})\\b"),
  },
  {
    name: "Linkpreview",
    regex: new RegExp("(?:linkpreview).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Liveagent",
    regex: new RegExp("(?:liveagent).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Livestorm",
    regex: new RegExp(
      "(?:livestorm).{0,40}\\b(eyJhbGciOiJIUzI1NiJ9\\.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoi[0-9A-Z-a-z]{134}\\.[0-9A-Za-z\\-\\_]{43}[ \\r\\n]{1})"
    ),
  },
  { name: "Locationiq", regex: new RegExp("\\b(pk\\.[a-zA-Z-0-9]{32})\\b") },
  {
    name: "Loginradius",
    regex: new RegExp(
      "(?:loginradius).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Lokalisetoken",
    regex: new RegExp("(?:lokalise).{0,40}\\b([a-z0-9]{40})\\b"),
  },
  {
    name: "Loyverse",
    regex: new RegExp("(?:loyverse).{0,40}\\b([0-9-a-z]{32})\\b"),
  },
  {
    name: "Luno - 1",
    regex: new RegExp("(?:luno).{0,40}\\b([a-z0-9]{13})\\b"),
  },
  {
    name: "Luno - 2",
    regex: new RegExp("(?:luno).{0,40}\\b([a-zA-Z0-9_-]{43})\\b"),
  },
  { name: "M3o", regex: new RegExp("(?:m3o).{0,40}\\b([0-9A-Za-z]{48})\\b") },
  {
    name: "Macaddress",
    regex: new RegExp("(?:macaddress).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "Madkudu",
    regex: new RegExp("(?:madkudu).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Magnetic",
    regex: new RegExp(
      "(?:magnetic).{0,40}\\b([0-9Aa-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  { name: "MailChimp API Key", regex: new RegExp("[0-9a-f]{32}-us[0-9]{1,2}") },
  {
    name: "Mailboxlayer",
    regex: new RegExp("(?:mailboxlayer).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Mailerlite",
    regex: new RegExp("(?:mailerlite).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Mailgun - 2",
    regex: new RegExp("(?:mailgun).{0,40}\\b([a-zA-Z-0-9]{72})\\b"),
  },
  { name: "Mailgun API Key - 1", regex: new RegExp("key-[0-9a-zA-Z]{32}") },
  {
    name: "Mailgun API key - 2",
    regex: new RegExp("(mailgun|mg)[0-9a-z]{32}"),
  },
  {
    name: "Mailjetbasicauth",
    regex: new RegExp("(?:mailjet).{0,40}\\b([A-Za-z0-9]{87}\\=)"),
  },
  {
    name: "Mailjetsms",
    regex: new RegExp("(?:mailjet).{0,40}\\b([A-Za-z0-9]{32})\\b"),
  },
  {
    name: "Mailmodo",
    regex: new RegExp(
      "(?:mailmodo).{0,40}\\b([A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7})\\b"
    ),
  },
  {
    name: "Mailsac",
    regex: new RegExp("(?:mailsac).{0,40}\\b(k_[0-9A-Za-z]{36,})\\b"),
  },
  {
    name: "Mandrill",
    regex: new RegExp("(?:mandrill).{0,40}\\b([A-Za-z0-9_-]{22})\\b"),
  },
  {
    name: "Manifest",
    regex: new RegExp("(?:manifest).{0,40}\\b([a-zA-z0-9]{32})\\b"),
  },
  {
    name: "Mapbox - 2",
    regex: new RegExp("\\b(sk\\.[a-zA-Z-0-9\\.]{80,240})\\b"),
  },
  {
    name: "Mapquest",
    regex: new RegExp("(?:mapquest).{0,40}\\b([0-9A-Za-z]{32})\\b"),
  },
  {
    name: "Marketstack",
    regex: new RegExp("(?:marketstack).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Mattermostpersonaltoken - 1",
    regex: new RegExp(
      "(?:mattermost).{0,40}\\b([A-Za-z0-9-_]{1,}.cloud.mattermost.com)\\b"
    ),
  },
  {
    name: "Mattermostpersonaltoken - 2",
    regex: new RegExp("(?:mattermost).{0,40}\\b([a-z0-9]{26})\\b"),
  },
  {
    name: "Mavenlink",
    regex: new RegExp("(?:mavenlink).{0,40}\\b([0-9a-z]{64})\\b"),
  },
  {
    name: "Maxmindlicense - 1",
    regex: new RegExp("(?:maxmind|geoip).{0,40}\\b([0-9A-Za-z]{16})\\b"),
  },
  {
    name: "Maxmindlicense - 2",
    regex: new RegExp("(?:maxmind|geoip).{0,40}\\b([0-9]{2,7})\\b"),
  },
  {
    name: "Meaningcloud",
    regex: new RegExp("(?:meaningcloud).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Mediastack",
    regex: new RegExp("(?:mediastack).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Meistertask",
    regex: new RegExp("(?:meistertask).{0,40}\\b([a-zA-Z0-9]{43})\\b"),
  },
  {
    name: "Mesibo",
    regex: new RegExp("(?:mesibo).{0,40}\\b([0-9A-Za-z]{64})\\b"),
  },
  {
    name: "Messagebird",
    regex: new RegExp("(?:messagebird).{0,40}\\b([A-Za-z0-9_-]{25})\\b"),
  },
  {
    name: "Metaapi - 1",
    regex: new RegExp("(?:metaapi|meta-api).{0,40}\\b([0-9a-f]{64})\\b"),
  },
  {
    name: "Metaapi - 2",
    regex: new RegExp("(?:metaapi|meta-api).{0,40}\\b([0-9a-f]{24})\\b"),
  },
  {
    name: "Metrilo",
    regex: new RegExp("(?:metrilo).{0,40}\\b([a-z0-9]{16})\\b"),
  },
  {
    name: "Microsoft Teams Webhook",
    regex: new RegExp(
      "https://outlook\\.office\\.com/webhook/[A-Za-z0-9\\-@]+/IncomingWebhook/[A-Za-z0-9\\-]+/[A-Za-z0-9\\-]+"
    ),
  },
  {
    name: "Microsoftteamswebhook",
    regex: new RegExp(
      "(https:\\/\\/[a-zA-Z-0-9]+\\.webhook\\.office\\.com\\/webhookb2\\/[a-zA-Z-0-9]{8}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{12}\\@[a-zA-Z-0-9]{8}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{12}\\/IncomingWebhook\\/[a-zA-Z-0-9]{32}\\/[a-zA-Z-0-9]{8}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{12})"
    ),
  },
  { name: "Midise", regex: new RegExp("midi-662b69edd2[a-zA-Z0-9]{54}") },
  {
    name: "Mindmeister",
    regex: new RegExp("(?:mindmeister).{0,40}\\b([a-zA-Z0-9]{43})\\b"),
  },
  {
    name: "Mite - 1",
    regex: new RegExp("(?:mite).{0,40}\\b([0-9a-z]{16})\\b"),
  },
  { name: "Mite - 2", regex: new RegExp("\\b([0-9a-z-]{1,}.mite.yo.lk)\\b") },
  {
    name: "Mixmax",
    regex: new RegExp("(?:mixmax).{0,40}\\b([a-zA-Z0-9_-]{36})\\b"),
  },
  {
    name: "Mixpanel - 1",
    regex: new RegExp("(?:mixpanel).{0,40}\\b([a-zA-Z0-9.-]{30,40})\\b"),
  },
  {
    name: "Mixpanel - 2",
    regex: new RegExp("(?:mixpanel).{0,40}\\b([a-zA-Z0-9-]{32})\\b"),
  },
  {
    name: "Moderation",
    regex: new RegExp(
      "(?:moderation).{0,40}\\b([a-zA-Z0-9]{36}\\.[a-zA-Z0-9]{115}\\.[a-zA-Z0-9_]{43})\\b"
    ),
  },
  {
    name: "Monday",
    regex: new RegExp("(?:monday).{0,40}\\b(ey[a-zA-Z0-9_.]{210,225})\\b"),
  },
  {
    name: "Moonclerck",
    regex: new RegExp("(?:moonclerck).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Moonclerk",
    regex: new RegExp("(?:moonclerk).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Moosend",
    regex: new RegExp(
      "(?:moosend).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Mrticktock - 1",
    regex: new RegExp("(?:mrticktock).{0,40}\\b([a-zA-Z0-9!=@#$%()_^]{1,50})"),
  },
  {
    name: "Myfreshworks - 2",
    regex: new RegExp("(?:freshworks).{0,40}\\b([a-z0-9A-Z-]{22})\\b"),
  },
  {
    name: "Myintervals",
    regex: new RegExp("(?:myintervals).{0,40}\\b([0-9a-z]{11})\\b"),
  },
  {
    name: "Nasdaqdatalink",
    regex: new RegExp("(?:nasdaq).{0,40}\\b([a-zA-Z0-9_-]{20})\\b"),
  },
  {
    name: "Nethunt - 1",
    regex: new RegExp("(?:nethunt).{0,40}\\b([a-zA-Z0-9.-@]{25,30})\\b"),
  },
  {
    name: "Nethunt - 2",
    regex: new RegExp("(?:nethunt).{0,40}\\b([a-z0-9-\\S]{36})\\b"),
  },
  {
    name: "Netlify",
    regex: new RegExp("(?:netlify).{0,40}\\b([A-Za-z0-9_-]{43,45})\\b"),
  },
  {
    name: "Neutrinoapi - 1",
    regex: new RegExp("(?:neutrinoapi).{0,40}\\b([a-zA-Z0-9]{48})\\b"),
  },
  {
    name: "Neutrinoapi - 2",
    regex: new RegExp("(?:neutrinoapi).{0,40}\\b([a-zA-Z0-9]{6,24})\\b"),
  },
  { name: "Newrelic Admin API Key", regex: new RegExp("NRAA-[a-f0-9]{27}") },
  {
    name: "Newrelic Insights API Key",
    regex: new RegExp("NRI(?:I|Q)-[A-Za-z0-9\\-_]{32}"),
  },
  { name: "Newrelic REST API Key", regex: new RegExp("NRRA-[a-f0-9]{42}") },
  {
    name: "Newrelic Synthetics Location Key",
    regex: new RegExp("NRSP-[a-z]{2}[0-9]{2}[a-f0-9]{31}"),
  },
  {
    name: "Newrelicpersonalapikey",
    regex: new RegExp(
      "(?:newrelic).{0,40}\\b([A-Za-z0-9_\\.]{4}-[A-Za-z0-9_\\.]{42})\\b"
    ),
  },
  { name: "Newsapi", regex: new RegExp("(?:newsapi).{0,40}\\b([a-z0-9]{32})") },
  {
    name: "Newscatcher",
    regex: new RegExp("(?:newscatcher).{0,40}\\b([0-9A-Za-z_]{43})\\b"),
  },
  {
    name: "Nexmoapikey - 1",
    regex: new RegExp("(?:nexmo).{0,40}\\b([A-Za-z0-9_-]{8})\\b"),
  },
  {
    name: "Nexmoapikey - 2",
    regex: new RegExp("(?:nexmo).{0,40}\\b([A-Za-z0-9_-]{16})\\b"),
  },
  {
    name: "Nftport",
    regex: new RegExp(
      "(?:nftport).{0,40}\\b([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Nicereply",
    regex: new RegExp("(?:nicereply).{0,40}\\b([0-9a-f]{40})\\b"),
  },
  {
    name: "Nimble",
    regex: new RegExp("(?:nimble).{0,40}\\b([a-zA-Z0-9]{30})\\b"),
  },
  { name: "Nitro", regex: new RegExp("(?:nitro).{0,40}\\b([0-9a-f]{32})\\b") },
  {
    name: "Noticeable",
    regex: new RegExp("(?:noticeable).{0,40}\\b([0-9a-zA-Z]{20})\\b"),
  },
  { name: "Notion", regex: new RegExp("\\b(secret_[A-Za-z0-9]{43})\\b") },
  {
    name: "Nozbeteams",
    regex: new RegExp(
      "(?:nozbe|nozbeteams).{0,40}\\b([0-9A-Za-z]{16}_[0-9A-Za-z\\-_]{64}[ \\r\\n]{1})"
    ),
  },
  {
    name: "Numverify",
    regex: new RegExp("(?:numverify).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Nutritionix - 1",
    regex: new RegExp("(?:nutritionix).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Nutritionix - 2",
    regex: new RegExp("(?:nutritionix).{0,40}\\b([a-z0-9]{8})\\b"),
  },
  {
    name: "Nylas",
    regex: new RegExp("(?:nylas).{0,40}\\b([0-9A-Za-z]{30})\\b"),
  },
  {
    name: "Nytimes",
    regex: new RegExp("(?:nytimes).{0,40}\\b([a-z0-9A-Z-]{32})\\b"),
  },
  {
    name: "Oanda",
    regex: new RegExp("(?:oanda).{0,40}\\b([a-zA-Z0-9]{24})\\b"),
  },
  {
    name: "Omnisend",
    regex: new RegExp("(?:omnisend).{0,40}\\b([a-z0-9A-Z-]{75})\\b"),
  },
  {
    name: "Onedesk - 1",
    regex: new RegExp("(?:onedesk).{0,40}\\b([a-zA-Z0-9!=@#$%^]{8,64})"),
  },
  {
    name: "Onelogin - 2",
    regex: new RegExp("secret[a-zA-Z0-9_' \"=]{0,20}([a-z0-9]{64})"),
  },
  {
    name: "Onepagecrm - 1",
    regex: new RegExp("(?:onepagecrm).{0,40}\\b([a-zA-Z0-9=]{44})"),
  },
  {
    name: "Onepagecrm - 2",
    regex: new RegExp("(?:onepagecrm).{0,40}\\b([a-z0-9]{24})\\b"),
  },
  {
    name: "Onwaterio",
    regex: new RegExp("(?:onwater).{0,40}\\b([a-zA-Z0-9_-]{20})\\b"),
  },
  {
    name: "Oopspam",
    regex: new RegExp("(?:oopspam).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Opencagedata",
    regex: new RegExp("(?:opencagedata).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Opengraphr",
    regex: new RegExp("(?:opengraphr).{0,40}\\b([0-9Aa-zA-Z]{80})\\b"),
  },
  {
    name: "Openuv",
    regex: new RegExp("(?:openuv).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Openweather",
    regex: new RegExp("(?:openweather).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Optimizely",
    regex: new RegExp("(?:optimizely).{0,40}\\b([0-9A-Za-z-:]{54})\\b"),
  },
  {
    name: "Owlbot",
    regex: new RegExp("(?:owlbot).{0,40}\\b([a-z0-9]{40})\\b"),
  },
  {
    name: "PGP private key block",
    regex: new RegExp("-----BEGIN PGP PRIVATE KEY BLOCK-----"),
  },
  {
    name: "Pagerdutyapikey",
    regex: new RegExp(
      "(?:pagerduty).{0,40}\\b([a-z]{1}\\+[a-zA-Z]{9}\\-[a-z]{2}\\-[a-z0-9]{5})\\b"
    ),
  },
  {
    name: "Pandadoc",
    regex: new RegExp("(?:pandadoc).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Pandascore",
    regex: new RegExp(
      "(?:pandascore).{0,40}([ \\r\\n]{0,1}[0-9A-Za-z\\-\\_]{51}[ \\r\\n]{1})"
    ),
  },
  {
    name: "Paralleldots",
    regex: new RegExp("(?:paralleldots).{0,40}\\b([0-9A-Za-z]{43})\\b"),
  },
  {
    name: "Partnerstack",
    regex: new RegExp("(?:partnerstack).{0,40}\\b([0-9A-Za-z]{64})\\b"),
  },
  {
    name: "Passbase",
    regex: new RegExp("(?:passbase).{0,40}\\b([a-zA-Z0-9]{128})\\b"),
  },
  {
    name: "Password in URL",
    regex: new RegExp(
      "[a-zA-Z]{3,10}://[^/\\s:@]{3,20}:[^/\\s:@]{3,20}@.{1,100}[\"'\\s]"
    ),
  },
  {
    name: "Pastebin",
    regex: new RegExp("(?:pastebin).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "PayPal Braintree access token",
    regex: new RegExp(
      "access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}"
    ),
  },
  {
    name: "Paymoapp",
    regex: new RegExp("(?:paymoapp).{0,40}\\b([a-zA-Z0-9]{44})\\b"),
  },
  {
    name: "Paymongo",
    regex: new RegExp("(?:paymongo).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "Paypaloauth - 1",
    regex: new RegExp("\\b([A-Za-z0-9_\\.]{7}-[A-Za-z0-9_\\.]{72})\\b"),
  },
  {
    name: "Paypaloauth - 2",
    regex: new RegExp("\\b([A-Za-z0-9_\\.]{69}-[A-Za-z0-9_\\.]{10})\\b"),
  },
  {
    name: "Paystack",
    regex: new RegExp("\\b(sk\\_[a-z]{1,}\\_[A-Za-z0-9]{40})\\b"),
  },
  {
    name: "Pdflayer",
    regex: new RegExp("(?:pdflayer).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Pdfshift",
    regex: new RegExp("(?:pdfshift).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Peopledatalabs",
    regex: new RegExp("(?:peopledatalabs).{0,40}\\b([a-z0-9]{64})\\b"),
  },
  {
    name: "Pepipost",
    regex: new RegExp("(?:pepipost|netcore).{0,40}\\b([a-zA-Z-0-9]{32})\\b"),
  },
  { name: "Picatic API key", regex: new RegExp("sk_live_[0-9a-z]{32}") },
  {
    name: "Pipedream",
    regex: new RegExp("(?:pipedream).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Pipedrive",
    regex: new RegExp("(?:pipedrive).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Pivotaltracker",
    regex: new RegExp("(?:pivotal).{0,40}([a-z0-9]{32})"),
  },
  {
    name: "Pixabay",
    regex: new RegExp("(?:pixabay).{0,40}\\b([a-z0-9-]{34})\\b"),
  },
  {
    name: "Plaidkey - 1",
    regex: new RegExp("(?:plaid).{0,40}\\b([a-z0-9]{24})\\b"),
  },
  {
    name: "Plaidkey - 2",
    regex: new RegExp("(?:plaid).{0,40}\\b([a-z0-9]{30})\\b"),
  },
  {
    name: "Planviewleankit - 1",
    regex: new RegExp(
      "(?:planviewleankit|planview).{0,40}\\b([0-9a-f]{128})\\b"
    ),
  },
  {
    name: "Planviewleankit - 2",
    regex: new RegExp(
      "(?:planviewleankit|planview).{0,40}(?:subdomain).\\b([a-zA-Z][a-zA-Z0-9.-]{1,23}[a-zA-Z0-9])\\b"
    ),
  },
  {
    name: "Planyo",
    regex: new RegExp("(?:planyo).{0,40}\\b([0-9a-z]{62})\\b"),
  },
  {
    name: "Plivo - 1",
    regex: new RegExp("(?:plivo).{0,40}\\b([A-Za-z0-9_-]{40})\\b"),
  },
  { name: "Plivo - 2", regex: new RegExp("(?:plivo).{0,40}\\b([A-Z]{20})\\b") },
  {
    name: "Poloniex - 1",
    regex: new RegExp("(?:poloniex).{0,40}\\b([0-9a-f]{128})\\b"),
  },
  {
    name: "Poloniex - 2",
    regex: new RegExp(
      "(?:poloniex).{0,40}\\b([0-9A-Z]{8}-[0-9A-Z]{8}-[0-9A-Z]{8}-[0-9A-Z]{8})\\b"
    ),
  },
  {
    name: "Polygon",
    regex: new RegExp("(?:polygon).{0,40}\\b([a-z0-9A-Z]{32})\\b"),
  },
  {
    name: "Positionstack",
    regex: new RegExp("(?:positionstack).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "Postageapp",
    regex: new RegExp("(?:postageapp).{0,40}\\b([0-9A-Za-z]{32})\\b"),
  },
  { name: "Posthog", regex: new RegExp("\\b(phc_[a-zA-Z0-9_]{43})\\b") },
  { name: "Postman", regex: new RegExp("\\b(PMAK-[a-zA-Z-0-9]{59})\\b") },
  {
    name: "Postmark",
    regex: new RegExp(
      "(?:postmark).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "Powrbot",
    regex: new RegExp("(?:powrbot).{0,40}\\b([a-z0-9A-Z]{40})\\b"),
  },
  {
    name: "Privatekey",
    regex: new RegExp(
      "-----\\s*?BEGIN[ A-Z0-9_-]*?PRIVATE KEY\\s*?-----[\\s\\S]*?----\\s*?END[ A-Z0-9_-]*? PRIVATE KEY\\s*?-----"
    ),
  },
  {
    name: "Prospectcrm",
    regex: new RegExp("(?:prospect).{0,40}\\b([a-z0-9-]{32})\\b"),
  },
  {
    name: "Prospectio",
    regex: new RegExp("(?:prospect).{0,40}\\b([a-z0-9A-Z-]{50})\\b"),
  },
  {
    name: "Protocolsio",
    regex: new RegExp("(?:protocols).{0,40}\\b([a-z0-9]{64})\\b"),
  },
  {
    name: "Proxycrawl",
    regex: new RegExp("(?:proxycrawl).{0,40}\\b([a-zA-Z0-9_]{22})\\b"),
  },
  {
    name: "Pubnubpublishkey - 1",
    regex: new RegExp(
      "\\b(sub-c-[0-9a-z]{8}-[a-z]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Pubnubpublishkey - 2",
    regex: new RegExp(
      "\\b(pub-c-[0-9a-z]{8}-[0-9a-z]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Purestake",
    regex: new RegExp("(?:purestake).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Pushbulletapikey",
    regex: new RegExp("(?:pushbullet).{0,40}\\b([A-Za-z0-9_\\.]{34})\\b"),
  },
  {
    name: "Pusherchannelkey - 1",
    regex: new RegExp("(?:key).{0,40}\\b([a-z0-9]{20})\\b"),
  },
  {
    name: "Pusherchannelkey - 2",
    regex: new RegExp("(?:pusher).{0,40}\\b([a-z0-9]{20})\\b"),
  },
  {
    name: "Pusherchannelkey - 3",
    regex: new RegExp("(?:pusher).{0,40}\\b([0-9]{7})\\b"),
  },
  {
    name: "PyPI upload token",
    regex: new RegExp("pypi-AgEIcHlwaS5vcmc[A-Za-z0-9-_]{50,1000}"),
  },
  {
    name: "Qualaroo",
    regex: new RegExp("(?:qualaroo).{0,40}\\b([a-z0-9A-Z=]{64})"),
  },
  {
    name: "Qubole",
    regex: new RegExp("(?:qubole).{0,40}\\b([0-9a-z]{64})\\b"),
  },
  {
    name: "Quickmetrics",
    regex: new RegExp("(?:quickmetrics).{0,40}\\b([a-zA-Z0-9_-]{22})\\b"),
  },
  { name: "REDIS_URL", regex: new RegExp("(REDIS_URL).+") },
  { name: "RKCS8", regex: new RegExp("-----BEGIN PRIVATE KEY-----") },
  {
    name: "RSA private key",
    regex: new RegExp("-----BEGIN RSA PRIVATE KEY-----"),
  },
  {
    name: "Rapidapi",
    regex: new RegExp("(?:rapidapi).{0,40}\\b([A-Za-z0-9_-]{50})\\b"),
  },
  { name: "Raven", regex: new RegExp("(?:raven).{0,40}\\b([A-Z0-9-]{16})\\b") },
  { name: "Rawg", regex: new RegExp("(?:rawg).{0,40}\\b([0-9Aa-z]{32})\\b") },
  { name: "Razorpay - 1", regex: new RegExp("\\brzp_\\w{2,6}_\\w{10,20}\\b") },
  {
    name: "Readme",
    regex: new RegExp("(?:readme).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "Reallysimplesystems",
    regex: new RegExp(
      "\\b(ey[a-zA-Z0-9-._]{153}.ey[a-zA-Z0-9-._]{916,1000})\\b"
    ),
  },
  {
    name: "Rebrandly",
    regex: new RegExp("(?:rebrandly).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "Refiner",
    regex: new RegExp(
      "(?:refiner).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Repairshopr - 1",
    regex: new RegExp(
      "(?:repairshopr).{0,40}\\b([a-zA-Z0-9_.!+$#^*]{3,32})\\b"
    ),
  },
  {
    name: "Repairshopr - 2",
    regex: new RegExp("(?:repairshopr).{0,40}\\b([a-zA-Z0-9-]{51})\\b"),
  },
  {
    name: "Restpack",
    regex: new RegExp("(?:restpack).{0,40}\\b([a-zA-Z0-9]{48})\\b"),
  },
  {
    name: "Restpackhtmltopdfapi",
    regex: new RegExp("(?:restpack).{0,40}\\b([0-9A-Za-z]{48})\\b"),
  },
  {
    name: "Rev - 1",
    regex: new RegExp(
      "(?:rev).{0,40}\\b([0-9a-zA-Z\\/\\+]{27}\\=[ \\r\\n]{1})"
    ),
  },
  {
    name: "Rev - 2",
    regex: new RegExp("(?:rev).{0,40}\\b([0-9a-zA-Z\\-]{27}[ \\r\\n]{1})"),
  },
  {
    name: "Revampcrm - 1",
    regex: new RegExp("(?:revamp).{0,40}\\b([a-zA-Z0-9]{40}\\b)"),
  },
  {
    name: "Revampcrm - 2",
    regex: new RegExp("(?:revamp).{0,40}\\b([a-zA-Z0-9.-@]{25,30})\\b"),
  },
  {
    name: "Ringcentral - 1",
    regex: new RegExp(
      "(?:ringcentral).{0,40}\\b(https://www.[0-9A-Za-z_-]{1,}.com)\\b"
    ),
  },
  {
    name: "Ringcentral - 2",
    regex: new RegExp("(?:ringcentral).{0,40}\\b([0-9A-Za-z_-]{22})\\b"),
  },
  {
    name: "Ritekit",
    regex: new RegExp("(?:ritekit).{0,40}\\b([0-9a-f]{44})\\b"),
  },
  {
    name: "Roaring",
    regex: new RegExp("(?:roaring).{0,40}\\b([0-9A-Za-z_-]{28})\\b"),
  },
  {
    name: "Rocketreach",
    regex: new RegExp("(?:rocketreach).{0,40}\\b([a-z0-9-]{39})\\b"),
  },
  {
    name: "Roninapp - 1",
    regex: new RegExp("(?:ronin).{0,40}\\b([0-9Aa-zA-Z]{3,32})\\b"),
  },
  {
    name: "Roninapp - 2",
    regex: new RegExp("(?:ronin).{0,40}\\b([0-9a-zA-Z]{26})\\b"),
  },
  {
    name: "Route4me",
    regex: new RegExp("(?:route4me).{0,40}\\b([0-9A-Z]{32})\\b"),
  },
  {
    name: "Rownd - 1",
    regex: new RegExp(
      "(?:rownd).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Rownd - 2",
    regex: new RegExp("(?:rownd).{0,40}\\b([a-z0-9]{48})\\b"),
  },
  { name: "Rownd - 3", regex: new RegExp("(?:rownd).{0,40}\\b([0-9]{18})\\b") },
  { name: "Rubygems", regex: new RegExp("\\b(rubygems_[a-zA0-9]{48})\\b") },
  {
    name: "Runrunit - 1",
    regex: new RegExp("(?:runrunit).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Runrunit - 2",
    regex: new RegExp("(?:runrunit).{0,40}\\b([0-9A-Za-z]{18,20})\\b"),
  },
  { name: "SSH", regex: new RegExp("-----BEGIN OPENSSH PRIVATE KEY-----") },
  {
    name: "SSH (DSA) private key",
    regex: new RegExp("-----BEGIN DSA PRIVATE KEY-----"),
  },
  {
    name: "Salesblink",
    regex: new RegExp("(?:salesblink).{0,40}\\b([a-zA-Z]{16})\\b"),
  },
  {
    name: "Salescookie",
    regex: new RegExp("(?:salescookie).{0,40}\\b([a-zA-z0-9]{32})\\b"),
  },
  {
    name: "Salesflare",
    regex: new RegExp("(?:salesflare).{0,40}\\b([a-zA-Z0-9_]{45})\\b"),
  },
  {
    name: "Satismeterprojectkey - 1",
    regex: new RegExp(
      "(?:satismeter).{0,40}\\b([a-zA-Z0-9]{4,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,12})\\b"
    ),
  },
  {
    name: "Satismeterprojectkey - 2",
    regex: new RegExp("(?:satismeter).{0,40}\\b([a-zA-Z0-9]{24})\\b"),
  },
  {
    name: "Satismeterprojectkey - 3",
    regex: new RegExp("(?:satismeter).{0,40}\\b([a-zA-Z0-9!=@#$%^]{6,32})"),
  },
  {
    name: "Satismeterwritekey",
    regex: new RegExp("(?:satismeter).{0,40}\\b([a-z0-9A-Z]{16})\\b"),
  },
  {
    name: "Saucelabs - 1",
    regex: new RegExp("\\b(oauth\\-[a-z0-9]{8,}\\-[a-z0-9]{5})\\b"),
  },
  {
    name: "Saucelabs - 2",
    regex: new RegExp(
      "(?:saucelabs).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12})\\b"
    ),
  },
  {
    name: "Scalewaykey",
    regex: new RegExp(
      "(?:scaleway).{0,40}\\b([0-9a-z]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "Scrapeowl",
    regex: new RegExp("(?:scrapeowl).{0,40}\\b([0-9a-z]{30})\\b"),
  },
  {
    name: "Scraperapi",
    regex: new RegExp("(?:scraperapi).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Scraperbox",
    regex: new RegExp("(?:scraperbox).{0,40}\\b([A-Z0-9]{32})\\b"),
  },
  {
    name: "Scrapersite",
    regex: new RegExp("(?:scrapersite).{0,40}\\b([a-zA-Z0-9]{45})\\b"),
  },
  {
    name: "Scrapestack",
    regex: new RegExp("(?:scrapestack).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Scrapfly",
    regex: new RegExp("(?:scrapfly).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Scrapingant",
    regex: new RegExp("(?:scrapingant).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Scrapingbee",
    regex: new RegExp("(?:scrapingbee).{0,40}\\b([A-Z0-9]{80})\\b"),
  },
  {
    name: "Screenshotapi",
    regex: new RegExp(
      "(?:screenshotapi).{0,40}\\b([0-9A-Z]{7}\\-[0-9A-Z]{7}\\-[0-9A-Z]{7}\\-[0-9A-Z]{7})\\b"
    ),
  },
  {
    name: "Screenshotlayer",
    regex: new RegExp("(?:screenshotlayer).{0,40}\\b([a-zA-Z0-9_]{32})\\b"),
  },
  {
    name: "Securitytrails",
    regex: new RegExp("(?:securitytrails).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Segmentapikey",
    regex: new RegExp(
      "(?:segment).{0,40}\\b([A-Za-z0-9_\\-a-zA-Z]{43}\\.[A-Za-z0-9_\\-a-zA-Z]{43})\\b"
    ),
  },
  {
    name: "Selectpdf",
    regex: new RegExp("(?:selectpdf).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Semaphore",
    regex: new RegExp("(?:semaphore).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "SendGrid API Key",
    regex: new RegExp("SG\\.[\\w_]{16,32}\\.[\\w_]{16,64}"),
  },
  {
    name: "Sendbird - 1",
    regex: new RegExp("(?:sendbird).{0,40}\\b([0-9a-f]{40})\\b"),
  },
  {
    name: "Sendbird - 2",
    regex: new RegExp(
      "(?:sendbird).{0,40}\\b([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})\\b"
    ),
  },
  {
    name: "Sendbirdorganizationapi",
    regex: new RegExp("(?:sendbird).{0,40}\\b([0-9a-f]{24})\\b"),
  },
  {
    name: "Sendgrid",
    regex: new RegExp(
      "(?:sendgrid).{0,40}(SG\\.[\\w\\-_]{20,24}\\.[\\w\\-_]{39,50})\\b"
    ),
  },
  {
    name: "Sendinbluev2",
    regex: new RegExp("\\b(xkeysib\\-[A-Za-z0-9_-]{81})\\b"),
  },
  {
    name: "Sentiment - 1",
    regex: new RegExp("(?:sentiment).{0,40}\\b([0-9]{17})\\b"),
  },
  {
    name: "Sentiment - 2",
    regex: new RegExp("(?:sentiment).{0,40}\\b([a-zA-Z0-9]{20})\\b"),
  },
  {
    name: "Sentrytoken",
    regex: new RegExp("(?:sentry).{0,40}\\b([a-f0-9]{64})\\b"),
  },
  {
    name: "Serphouse",
    regex: new RegExp("(?:serphouse).{0,40}\\b([0-9A-Za-z]{60})\\b"),
  },
  {
    name: "Serpstack",
    regex: new RegExp("(?:serpstack).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Sheety - 1",
    regex: new RegExp("(?:sheety).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Sheety - 2",
    regex: new RegExp("(?:sheety).{0,40}\\b([0-9a-z]{64})\\b"),
  },
  {
    name: "Sherpadesk",
    regex: new RegExp("(?:sherpadesk).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Shipday",
    regex: new RegExp(
      "(?:shipday).{0,40}\\b([a-zA-Z0-9.]{11}[a-zA-Z0-9]{20})\\b"
    ),
  },
  {
    name: "Shodankey",
    regex: new RegExp("(?:shodan).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  { name: "Shopify access token", regex: new RegExp("shpat_[a-fA-F0-9]{32}") },
  {
    name: "Shopify custom app access token",
    regex: new RegExp("shpca_[a-fA-F0-9]{32}"),
  },
  {
    name: "Shopify private app access token",
    regex: new RegExp("shppa_[a-fA-F0-9]{32}"),
  },
  { name: "Shopify shared secret", regex: new RegExp("shpss_[a-fA-F0-9]{32}") },
  {
    name: "Shoppable Service Auth",
    regex: new RegExp("data-shoppable-auth-token.+"),
  },
  {
    name: "Shortcut",
    regex: new RegExp("(?:shortcut).{0,40}\\b([0-9a-f-]{36})\\b"),
  },
  {
    name: "Shotstack",
    regex: new RegExp("(?:shotstack).{0,40}\\b([a-zA-Z0-9]{40})\\b"),
  },
  {
    name: "Shutterstock - 1",
    regex: new RegExp("(?:shutterstock).{0,40}\\b([0-9a-zA-Z]{32})\\b"),
  },
  {
    name: "Shutterstock - 2",
    regex: new RegExp("(?:shutterstock).{0,40}\\b([0-9a-zA-Z]{16})\\b"),
  },
  {
    name: "Shutterstockoauth",
    regex: new RegExp("(?:shutterstock).{0,40}\\b(v2/[0-9A-Za-z]{388})\\b"),
  },
  {
    name: "Signalwire - 1",
    regex: new RegExp("\\b([0-9a-z-]{3,64}.signalwire.com)\\b"),
  },
  {
    name: "Signalwire - 2",
    regex: new RegExp(
      "(?:signalwire).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "Signalwire - 3",
    regex: new RegExp("(?:signalwire).{0,40}\\b([0-9A-Za-z]{50})\\b"),
  },
  {
    name: "Signaturit",
    regex: new RegExp("(?:signaturit).{0,40}\\b([0-9A-Za-z]{86})\\b"),
  },
  {
    name: "Signupgenius",
    regex: new RegExp("(?:signupgenius).{0,40}\\b([0-9A-Za-z]{32})\\b"),
  },
  {
    name: "Sigopt",
    regex: new RegExp("(?:sigopt).{0,40}\\b([A-Z0-9]{48})\\b"),
  },
  {
    name: "Simplesat",
    regex: new RegExp("(?:simplesat).{0,40}\\b([a-z0-9]{40})"),
  },
  {
    name: "Simplynoted",
    regex: new RegExp("(?:simplynoted).{0,40}\\b([a-zA-Z0-9\\S]{340,360})\\b"),
  },
  {
    name: "Simvoly",
    regex: new RegExp("(?:simvoly).{0,40}\\b([a-z0-9]{33})\\b"),
  },
  {
    name: "Sinchmessage",
    regex: new RegExp("(?:sinch).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Sirv - 1",
    regex: new RegExp("(?:sirv).{0,40}\\b([a-zA-Z0-9\\S]{88})"),
  },
  {
    name: "Sirv - 2",
    regex: new RegExp("(?:sirv).{0,40}\\b([a-zA-Z0-9]{26})\\b"),
  },
  {
    name: "Siteleaf",
    regex: new RegExp("(?:siteleaf).{0,40}\\b([0-9Aa-z]{32})\\b"),
  },
  {
    name: "Skrappio",
    regex: new RegExp("(?:skrapp).{0,40}\\b([a-z0-9A-Z]{42})\\b"),
  },
  {
    name: "Skybiometry",
    regex: new RegExp("(?:skybiometry).{0,40}\\b([0-9a-z]{25,26})\\b"),
  },
  { name: "Slack", regex: new RegExp("xox[baprs]-[0-9a-zA-Z]{10,48}") },
  {
    name: "Slack Token",
    regex: new RegExp(
      "(xox[pborsa]-[0-9]{12}-[0-9]{12}-[0-9]{12}-[a-z0-9]{32})"
    ),
  },
  { name: "Slack User token", regex: new RegExp("xoxp-[0-9A-Za-z\\-]{72}") },
  {
    name: "Slack Webhook",
    regex: new RegExp(
      "https://hooks.slack.com/services/T[a-zA-Z0-9_]{8,10}/B[a-zA-Z0-9_]{8,12}/[a-zA-Z0-9_]{23,24}"
    ),
  },
  { name: "Slack access token", regex: new RegExp("xoxb-[0-9A-Za-z\\-]{51}") },
  {
    name: "Slackwebhook",
    regex: new RegExp(
      "(https:\\/\\/hooks.slack.com\\/services\\/[A-Za-z0-9+\\/]{44,46})"
    ),
  },
  {
    name: "Smartsheets",
    regex: new RegExp("(?:smartsheets).{0,40}\\b([a-zA-Z0-9]{37})\\b"),
  },
  {
    name: "Smartystreets - 1",
    regex: new RegExp("(?:smartystreets).{0,40}\\b([a-zA-Z0-9]{20})\\b"),
  },
  {
    name: "Smartystreets - 2",
    regex: new RegExp("(?:smartystreets).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Smooch - 1",
    regex: new RegExp("(?:smooch).{0,40}\\b(act_[0-9a-z]{24})\\b"),
  },
  {
    name: "Smooch - 2",
    regex: new RegExp("(?:smooch).{0,40}\\b([0-9a-zA-Z_-]{86})\\b"),
  },
  {
    name: "Snipcart",
    regex: new RegExp("(?:snipcart).{0,40}\\b([0-9A-Za-z_]{75})\\b"),
  },
  {
    name: "Snykkey",
    regex: new RegExp(
      "(?:snyk).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b"
    ),
  },
  {
    name: "SonarQube Token",
    regex: new RegExp("sonar.{0,50}(?:\"|'|`)?[0-9a-f]{40}(?:\"|'|`)?"),
  },
  {
    name: "Splunkobservabilitytoken",
    regex: new RegExp("(?:splunk).{0,40}\\b([a-z0-9A-Z]{22})\\b"),
  },
  {
    name: "Spoonacular",
    regex: new RegExp("(?:spoonacular).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Sportsmonk",
    regex: new RegExp("(?:sportsmonk).{0,40}\\b([0-9a-zA-Z]{60})\\b"),
  },
  {
    name: "Square",
    regex: new RegExp("(?:square).{0,40}(EAAA[a-zA-Z0-9\\-\\+\\=]{60})"),
  },
  {
    name: "Square API Key",
    regex: new RegExp("sq0(atp|csp)-[0-9a-z-_]{22,43}"),
  },
  {
    name: "Square OAuth Secret",
    regex: new RegExp("sq0csp-[0-9A-Za-z\\-_]{43}"),
  },
  {
    name: "Square access token",
    regex: new RegExp("sq0atp-[0-9A-Za-z\\-_]{22}"),
  },
  {
    name: "Squareapp - 1",
    regex: new RegExp("[\\w\\-]*sq0i[a-z]{2}-[0-9A-Za-z\\-_]{22,43}"),
  },
  {
    name: "Squareapp - 2",
    regex: new RegExp("[\\w\\-]*sq0c[a-z]{2}-[0-9A-Za-z\\-_]{40,50}"),
  },
  {
    name: "Squarespace",
    regex: new RegExp(
      "(?:squarespace).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  { name: "Squareup", regex: new RegExp("\\b(sq0idp-[0-9A-Za-z]{22})\\b") },
  {
    name: "Sslmate",
    regex: new RegExp("(?:sslmate).{0,40}\\b([a-zA-Z0-9]{36})\\b"),
  },
  {
    name: "Stitchdata",
    regex: new RegExp("(?:stitchdata).{0,40}\\b([0-9a-z_]{35})\\b"),
  },
  {
    name: "Stockdata",
    regex: new RegExp("(?:stockdata).{0,40}\\b([0-9A-Za-z]{40})\\b"),
  },
  {
    name: "Storecove",
    regex: new RegExp("(?:storecove).{0,40}\\b([a-zA-Z0-9_-]{43})\\b"),
  },
  {
    name: "Stormglass",
    regex: new RegExp("(?:stormglass).{0,40}\\b([0-9Aa-z-]{73})\\b"),
  },
  {
    name: "Storyblok",
    regex: new RegExp("(?:storyblok).{0,40}\\b([0-9A-Za-z]{22}t{2})\\b"),
  },
  {
    name: "Storychief",
    regex: new RegExp("(?:storychief).{0,40}\\b([a-zA-Z0-9_\\-.]{940,1000})"),
  },
  {
    name: "Strava - 1",
    regex: new RegExp("(?:strava).{0,40}\\b([0-9]{5})\\b"),
  },
  {
    name: "Strava - 2",
    regex: new RegExp("(?:strava).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Streak",
    regex: new RegExp("(?:streak).{0,40}\\b([0-9Aa-f]{32})\\b"),
  },
  { name: "Stripe", regex: new RegExp("[rs]k_live_[a-zA-Z0-9]{20,30}") },
  { name: "Stripe API Key - 1", regex: new RegExp("sk_live_[0-9a-zA-Z]{24}") },
  {
    name: "Stripe API key - 2",
    regex: new RegExp("stripe[sr]k_live_[0-9a-zA-Z]{24}"),
  },
  {
    name: "Stripe API key - 3",
    regex: new RegExp("stripe[sk|rk]_live_[0-9a-zA-Z]{24}"),
  },
  { name: "Stripe Public Live Key", regex: new RegExp("pk_live_[0-9a-z]{24}") },
  { name: "Stripe Public Test Key", regex: new RegExp("pk_test_[0-9a-z]{24}") },
  {
    name: "Stripe Restriced Key",
    regex: new RegExp("rk_(?:live|test)_[0-9a-zA-Z]{24}"),
  },
  {
    name: "Stripe Restricted API Key",
    regex: new RegExp("rk_live_[0-9a-zA-Z]{24}"),
  },
  {
    name: "Stripe Secret Key",
    regex: new RegExp("sk_(?:live|test)_[0-9a-zA-Z]{24}"),
  },
  {
    name: "Stripe Secret Live Key",
    regex: new RegExp("(sk|rk)_live_[0-9a-z]{24}"),
  },
  {
    name: "Stripe Secret Test Key",
    regex: new RegExp("(sk|rk)_test_[0-9a-z]{24}"),
  },
  {
    name: "Stytch - 1",
    regex: new RegExp("(?:stytch).{0,40}\\b([a-zA-Z0-9-_]{47}=)"),
  },
  {
    name: "Stytch - 2",
    regex: new RegExp("(?:stytch).{0,40}\\b([a-z0-9-]{49})\\b"),
  },
  {
    name: "Sugester - 1",
    regex: new RegExp("(?:sugester).{0,40}\\b([a-zA-Z0-9_.!+$#^*%]{3,32})\\b"),
  },
  {
    name: "Sugester - 2",
    regex: new RegExp("(?:sugester).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Sumologickey - 1",
    regex: new RegExp("(?:sumo).{0,40}\\b([A-Za-z0-9]{14})\\b"),
  },
  {
    name: "Sumologickey - 2",
    regex: new RegExp("(?:sumo).{0,40}\\b([A-Za-z0-9]{64})\\b"),
  },
  {
    name: "Supernotesapi",
    regex: new RegExp(
      "(?:supernotes).{0,40}([ \\r\\n]{0,1}[0-9A-Za-z\\-_]{43}[ \\r\\n]{1})"
    ),
  },
  {
    name: "Surveyanyplace - 1",
    regex: new RegExp("(?:survey).{0,40}\\b([a-z0-9A-Z-]{36})\\b"),
  },
  {
    name: "Surveyanyplace - 2",
    regex: new RegExp("(?:survey).{0,40}\\b([a-z0-9A-Z]{32})\\b"),
  },
  {
    name: "Surveybot",
    regex: new RegExp("(?:surveybot).{0,40}\\b([A-Za-z0-9-]{80})\\b"),
  },
  {
    name: "Surveysparrow",
    regex: new RegExp("(?:surveysparrow).{0,40}\\b([a-zA-Z0-9-_]{88})\\b"),
  },
  {
    name: "Survicate",
    regex: new RegExp("(?:survicate).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Swell - 1",
    regex: new RegExp("(?:swell).{0,40}\\b([a-zA-Z0-9]{6,24})\\b"),
  },
  {
    name: "Swell - 2",
    regex: new RegExp("(?:swell).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Swiftype",
    regex: new RegExp(
      "(?:swiftype).{0,40}\\b([a-zA-z-0-9]{6}\\_[a-zA-z-0-9]{6}\\-[a-zA-z-0-9]{6})\\b"
    ),
  },
  {
    name: "Tallyfy",
    regex: new RegExp(
      "(?:tallyfy).{0,40}\\b([0-9A-Za-z]{36}\\.[0-9A-Za-z]{264}\\.[0-9A-Za-z\\-\\_]{683})\\b"
    ),
  },
  {
    name: "Tatumio",
    regex: new RegExp("(?:tatum).{0,40}\\b([0-9a-z-]{36})\\b"),
  },
  {
    name: "Taxjar",
    regex: new RegExp("(?:taxjar).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Teamgate - 1",
    regex: new RegExp("(?:teamgate).{0,40}\\b([a-z0-9]{40})\\b"),
  },
  {
    name: "Teamgate - 2",
    regex: new RegExp("(?:teamgate).{0,40}\\b([a-zA-Z0-9]{80})\\b"),
  },
  {
    name: "Teamworkcrm",
    regex: new RegExp(
      "(?:teamwork|teamworkcrm).{0,40}\\b(tkn\\.v1_[0-9A-Za-z]{71}=[ \\r\\n]{1})"
    ),
  },
  {
    name: "Teamworkdesk",
    regex: new RegExp(
      "(?:teamwork|teamworkdesk).{0,40}\\b(tkn\\.v1_[0-9A-Za-z]{71}=[ \\r\\n]{1})"
    ),
  },
  {
    name: "Teamworkspaces",
    regex: new RegExp(
      "(?:teamwork|teamworkspaces).{0,40}\\b(tkn\\.v1_[0-9A-Za-z]{71}=[ \\r\\n]{1})"
    ),
  },
  {
    name: "Technicalanalysisapi",
    regex: new RegExp("(?:technicalanalysisapi).{0,40}\\b([A-Z0-9]{48})\\b"),
  },
  {
    name: "Telegram Bot API Key",
    regex: new RegExp("[0-9]+:AA[0-9A-Za-z\\-_]{33}"),
  },
  { name: "Telegram Secret", regex: new RegExp("d{5,}:A[0-9a-z_-]{34,34}") },
  {
    name: "Telegrambottoken",
    regex: new RegExp(
      "(?:telegram).{0,40}\\b([0-9]{8,10}:[a-zA-Z0-9_-]{35})\\b"
    ),
  },
  {
    name: "Telnyx",
    regex: new RegExp("(?:telnyx).{0,40}\\b(KEY[0-9A-Za-z_-]{55})\\b"),
  },
  {
    name: "Terraformcloudpersonaltoken",
    regex: new RegExp("\\b([A-Za-z0-9]{14}.atlasv1.[A-Za-z0-9]{67})\\b"),
  },
  {
    name: "Text2data",
    regex: new RegExp(
      "(?:text2data).{0,40}\\b([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})\\b"
    ),
  },
  {
    name: "Textmagic - 1",
    regex: new RegExp("(?:textmagic).{0,40}\\b([0-9A-Za-z]{30})\\b"),
  },
  {
    name: "Textmagic - 2",
    regex: new RegExp("(?:textmagic).{0,40}\\b([0-9A-Za-z]{1,25})\\b"),
  },
  {
    name: "Theoddsapi",
    regex: new RegExp("(?:theoddsapi|the-odds-api).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Thinkific - 1",
    regex: new RegExp("(?:thinkific).{0,40}\\b([0-9a-f]{32})\\b"),
  },
  {
    name: "Thinkific - 2",
    regex: new RegExp("(?:thinkific).{0,40}\\b([0-9A-Za-z]{4,40})\\b"),
  },
  {
    name: "Thousandeyes - 1",
    regex: new RegExp("(?:thousandeyes).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Thousandeyes - 2",
    regex: new RegExp(
      "(?:thousandeyes).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b"
    ),
  },
  {
    name: "Ticketmaster",
    regex: new RegExp("(?:ticketmaster).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Tiingo",
    regex: new RegExp("(?:tiingo).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Timezoneapi",
    regex: new RegExp("(?:timezoneapi).{0,40}\\b([a-zA-Z0-9]{20})\\b"),
  },
  { name: "Tly", regex: new RegExp("(?:tly).{0,40}\\b([0-9A-Za-z]{60})\\b") },
  {
    name: "Tmetric",
    regex: new RegExp("(?:tmetric).{0,40}\\b([0-9A-Z]{64})\\b"),
  },
  {
    name: "Todoist",
    regex: new RegExp("(?:todoist).{0,40}\\b([0-9a-z]{40})\\b"),
  },
  {
    name: "Toggltrack",
    regex: new RegExp("(?:toggl).{0,40}\\b([0-9Aa-z]{32})\\b"),
  },
  {
    name: "Tomorrowio",
    regex: new RegExp("(?:tomorrow).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Tomtom",
    regex: new RegExp("(?:tomtom).{0,40}\\b([0-9Aa-zA-Z]{32})\\b"),
  },
  {
    name: "Tradier",
    regex: new RegExp("(?:tradier).{0,40}\\b([a-zA-Z0-9]{28})\\b"),
  },
  {
    name: "Travelpayouts",
    regex: new RegExp("(?:travelpayouts).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Travisci",
    regex: new RegExp("(?:travis).{0,40}\\b([a-zA-Z0-9A-Z_]{22})\\b"),
  },
  {
    name: "Trello URL",
    regex: new RegExp("https://trello.com/b/[0-9a-z]/[0-9a-z_-]+"),
  },
  {
    name: "Trelloapikey - 2",
    regex: new RegExp("(?:trello).{0,40}\\b([a-zA-Z-0-9]{32})\\b"),
  },
  {
    name: "Twelvedata",
    regex: new RegExp("(?:twelvedata).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  { name: "Twilio - 1", regex: new RegExp("\\bAC[0-9a-f]{32}\\b") },
  { name: "Twilio API Key", regex: new RegExp("SK[0-9a-fA-F]{32}") },
  {
    name: "Twitter Access Token",
    regex: new RegExp(
      "[tT][wW][iI][tT][tT][eE][rR].*[1-9][0-9]+-[0-9a-zA-Z]{40}"
    ),
  },
  { name: "Twitter Client ID", regex: new RegExp("twitter[0-9a-z]{18,25}") },
  {
    name: "Twitter OAuth",
    regex: new RegExp(
      "[tT][wW][iI][tT][tT][eE][rR].*['|\"][0-9a-zA-Z]{35,44}['|\"]"
    ),
  },
  { name: "Twitter Secret Key", regex: new RegExp("twitter[0-9a-z]{35,44}") },
  {
    name: "Tyntec",
    regex: new RegExp("(?:tyntec).{0,40}\\b([a-zA-Z0-9]{32})\\b"),
  },
  {
    name: "Typeform",
    regex: new RegExp("(?:typeform).{0,40}\\b([0-9A-Za-z]{44})\\b"),
  },
  { name: "Ubidots", regex: new RegExp("\\b(BBFF-[0-9a-zA-Z]{30})\\b") },
  {
    name: "Unifyid",
    regex: new RegExp("(?:unify).{0,40}\\b([0-9A-Za-z_=-]{44})"),
  },
  {
    name: "Unplugg",
    regex: new RegExp("(?:unplu).{0,40}\\b([a-z0-9]{64})\\b"),
  },
  {
    name: "Unsplash",
    regex: new RegExp("(?:unsplash).{0,40}\\b([0-9A-Za-z_]{43})\\b"),
  },
  {
    name: "Upcdatabase",
    regex: new RegExp("(?:upcdatabase).{0,40}\\b([A-Z0-9]{32})\\b"),
  },
  {
    name: "Uplead",
    regex: new RegExp("(?:uplead).{0,40}\\b([a-z0-9-]{32})\\b"),
  },
  {
    name: "Uploadcare",
    regex: new RegExp("(?:uploadcare).{0,40}\\b([a-z0-9]{20})\\b"),
  },
  {
    name: "Upwave",
    regex: new RegExp("(?:upwave).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Uri",
    regex: new RegExp(
      "\\b[a-zA-Z]{1,10}:?\\/\\/[-.%\\w{}]{1,50}:([-.%\\S]{3,50})@[-.%\\w\\/:]+\\b"
    ),
  },
  {
    name: "Urlscan",
    regex: new RegExp("(?:urlscan).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Userstack",
    regex: new RegExp("(?:userstack).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Vatlayer",
    regex: new RegExp("(?:vatlayer).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Vercel",
    regex: new RegExp("(?:vercel).{0,40}\\b([a-zA-Z0-9]{24})\\b"),
  },
  {
    name: "Verifier - 1",
    regex: new RegExp(
      "(?:verifier).{0,40}\\b([a-zA-Z-0-9-]{5,16}\\@[a-zA-Z-0-9]{4,16}\\.[a-zA-Z-0-9]{3,6})\\b"
    ),
  },
  {
    name: "Verifier - 2",
    regex: new RegExp("(?:verifier).{0,40}\\b([a-z0-9]{96})\\b"),
  },
  {
    name: "Verimail",
    regex: new RegExp("(?:verimail).{0,40}\\b([A-Z0-9]{32})\\b"),
  },
  {
    name: "Veriphone",
    regex: new RegExp("(?:veriphone).{0,40}\\b([0-9A-Z]{32})\\b"),
  },
  {
    name: "Versioneye",
    regex: new RegExp("(?:versioneye).{0,40}\\b([a-zA-Z0-9-]{40})\\b"),
  },
  {
    name: "Viewneo",
    regex: new RegExp(
      "(?:viewneo).{0,40}\\b([a-z0-9A-Z]{120,300}.[a-z0-9A-Z]{150,300}.[a-z0-9A-Z-_]{600,800})"
    ),
  },
  {
    name: "Virustotal",
    regex: new RegExp("(?:virustotal).{0,40}\\b([a-f0-9]{64})\\b"),
  },
  {
    name: "Visualcrossing",
    regex: new RegExp("(?:visualcrossing).{0,40}\\b([0-9A-Z]{25})\\b"),
  },
  {
    name: "Voicegain",
    regex: new RegExp(
      "(?:voicegain).{0,40}\\b(ey[0-9a-zA-Z_-]{34}.ey[0-9a-zA-Z_-]{108}.[0-9a-zA-Z_-]{43})\\b"
    ),
  },
  {
    name: "Vouchery - 1",
    regex: new RegExp("(?:vouchery).{0,40}\\b([a-z0-9-]{36})\\b"),
  },
  {
    name: "Vouchery - 2",
    regex: new RegExp("(?:vouchery).{0,40}\\b([a-zA-Z0-9-\\S]{2,20})\\b"),
  },
  {
    name: "Vpnapi",
    regex: new RegExp("(?:vpnapi).{0,40}\\b([a-z0-9A-Z]{32})\\b"),
  },
  {
    name: "Vultrapikey",
    regex: new RegExp("(?:vultr).{0,40} \\b([A-Z0-9]{36})\\b"),
  },
  { name: "Vyte", regex: new RegExp("(?:vyte).{0,40}\\b([0-9a-z]{50})\\b") },
  {
    name: "Walkscore",
    regex: new RegExp("(?:walkscore).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Weatherbit",
    regex: new RegExp("(?:weatherbit).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Weatherstack",
    regex: new RegExp("(?:weatherstack).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Webex - 1",
    regex: new RegExp("(?:error).{0,40}(redirect_uri_mismatch)"),
  },
  {
    name: "Webex - 2",
    regex: new RegExp("(?:webex).{0,40}\\b([A-Za-z0-9_-]{65})\\b"),
  },
  {
    name: "Webex - 3",
    regex: new RegExp("(?:webex).{0,40}\\b([A-Za-z0-9_-]{64})\\b"),
  },
  {
    name: "Webflow",
    regex: new RegExp("(?:webflow).{0,40}\\b([a-zA0-9]{64})\\b"),
  },
  {
    name: "Webscraper",
    regex: new RegExp("(?:webscraper).{0,40}\\b([a-zA-Z0-9]{60})\\b"),
  },
  {
    name: "Webscraping",
    regex: new RegExp("(?:webscraping).{0,40}\\b([0-9A-Za-z]{32})\\b"),
  },
  {
    name: "Wepay - 2",
    regex: new RegExp("(?:wepay).{0,40}\\b([a-zA-Z0-9_?]{62})\\b"),
  },
  { name: "Whoxy", regex: new RegExp("(?:whoxy).{0,40}\\b([0-9a-z]{33})\\b") },
  {
    name: "Worksnaps",
    regex: new RegExp("(?:worksnaps).{0,40}\\b([0-9A-Za-z]{40})\\b"),
  },
  {
    name: "Workstack",
    regex: new RegExp("(?:workstack).{0,40}\\b([0-9Aa-zA-Z]{60})\\b"),
  },
  {
    name: "Worldcoinindex",
    regex: new RegExp("(?:worldcoinindex).{0,40}\\b([a-zA-Z0-9]{35})\\b"),
  },
  {
    name: "Worldweather",
    regex: new RegExp("(?:worldweather).{0,40}\\b([0-9a-z]{31})\\b"),
  },
  {
    name: "Wrike",
    regex: new RegExp("(?:wrike).{0,40}\\b(ey[a-zA-Z0-9-._]{333})\\b"),
  },
  {
    name: "Yandex",
    regex: new RegExp("(?:yandex).{0,40}\\b([a-z0-9A-Z.]{83})\\b"),
  },
  {
    name: "Youneedabudget",
    regex: new RegExp("(?:youneedabudget).{0,40}\\b([0-9a-f]{64})\\b"),
  },
  {
    name: "Yousign",
    regex: new RegExp("(?:yousign).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Youtubeapikey - 1",
    regex: new RegExp("(?:youtube).{0,40}\\b([a-zA-Z-0-9_]{39})\\b"),
  },
  {
    name: "Zapier Webhook",
    regex: new RegExp(
      "https://(?:www.)?hooks\\.zapier\\.com/hooks/catch/[A-Za-z0-9]+/[A-Za-z0-9]+/"
    ),
  },
  {
    name: "Zapierwebhook",
    regex: new RegExp(
      "(https:\\/\\/hooks.zapier.com\\/hooks\\/catch\\/[A-Za-z0-9\\/]{16})"
    ),
  },
  {
    name: "Zendeskapi - 3",
    regex: new RegExp("(?:zendesk).{0,40}([A-Za-z0-9_-]{40})"),
  },
  {
    name: "Zenkitapi",
    regex: new RegExp("(?:zenkit).{0,40}\\b([0-9a-z]{8}\\-[0-9A-Za-z]{32})\\b"),
  },
  {
    name: "Zenscrape",
    regex: new RegExp(
      "(?:zenscrape).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b"
    ),
  },
  {
    name: "Zenserp",
    regex: new RegExp("(?:zenserp).{0,40}\\b([0-9a-z-]{36})\\b"),
  },
  {
    name: "Zeplin",
    regex: new RegExp("(?:zeplin).{0,40}\\b([a-zA-Z0-9-.]{350,400})\\b"),
  },
  {
    name: "Zerobounce",
    regex: new RegExp("(?:zerobounce).{0,40}\\b([a-z0-9]{32})\\b"),
  },
  {
    name: "Zipapi - 1",
    regex: new RegExp("(?:zipapi).{0,40}\\b([a-zA-Z0-9!=@#$%^]{7,})"),
  },
  {
    name: "Zipapi - 3",
    regex: new RegExp("(?:zipapi).{0,40}\\b([0-9a-z]{32})\\b"),
  },
  {
    name: "Zipcodeapi",
    regex: new RegExp("(?:zipcodeapi).{0,40}\\b([a-zA-Z0-9]{64})\\b"),
  },
  {
    name: "Zoho Webhook",
    regex: new RegExp(
      "https://creator\\.zoho\\.com/api/[A-Za-z0-9/\\-_\\.]+\\?authtoken=[A-Za-z0-9]+"
    ),
  },
  {
    name: "Zonkafeedback",
    regex: new RegExp("(?:zonka).{0,40}\\b([A-Za-z0-9]{36})\\b"),
  },
  {
    name: "access_key_secret",
    regex: new RegExp("access[_-]?key[_-]?secret(=| =|:| :)"),
  },
  { name: "access_secret", regex: new RegExp("access[_-]?secret(=| =|:| :)") },
  { name: "access_token", regex: new RegExp("access[_-]?token(=| =|:| :)") },
  { name: "account_sid", regex: new RegExp("account[_-]?sid(=| =|:| :)") },
  { name: "admin_email", regex: new RegExp("admin[_-]?email(=| =|:| :)") },
  {
    name: "adzerk_api_key",
    regex: new RegExp("adzerk[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "algolia_admin_key_1",
    regex: new RegExp("algolia[_-]?admin[_-]?key[_-]?1(=| =|:| :)"),
  },
  {
    name: "algolia_admin_key_2",
    regex: new RegExp("algolia[_-]?admin[_-]?key[_-]?2(=| =|:| :)"),
  },
  {
    name: "algolia_admin_key_mcm",
    regex: new RegExp("algolia[_-]?admin[_-]?key[_-]?mcm(=| =|:| :)"),
  },
  {
    name: "algolia_api_key",
    regex: new RegExp("algolia[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "algolia_api_key_mcm",
    regex: new RegExp("algolia[_-]?api[_-]?key[_-]?mcm(=| =|:| :)"),
  },
  {
    name: "algolia_api_key_search",
    regex: new RegExp("algolia[_-]?api[_-]?key[_-]?search(=| =|:| :)"),
  },
  {
    name: "algolia_search_api_key",
    regex: new RegExp("algolia[_-]?search[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "algolia_search_key",
    regex: new RegExp("algolia[_-]?search[_-]?key(=| =|:| :)"),
  },
  {
    name: "algolia_search_key_1",
    regex: new RegExp("algolia[_-]?search[_-]?key[_-]?1(=| =|:| :)"),
  },
  { name: "alias_pass", regex: new RegExp("alias[_-]?pass(=| =|:| :)") },
  {
    name: "alicloud_access_key",
    regex: new RegExp("alicloud[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "alicloud_secret_key",
    regex: new RegExp("alicloud[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "amazon_bucket_name",
    regex: new RegExp("amazon[_-]?bucket[_-]?name(=| =|:| :)"),
  },
  {
    name: "amazon_secret_access_key",
    regex: new RegExp("amazon[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "anaconda_token",
    regex: new RegExp("anaconda[_-]?token(=| =|:| :)"),
  },
  {
    name: "android_docs_deploy_token",
    regex: new RegExp("android[_-]?docs[_-]?deploy[_-]?token(=| =|:| :)"),
  },
  {
    name: "ansible_vault_password",
    regex: new RegExp("ansible[_-]?vault[_-]?password(=| =|:| :)"),
  },
  { name: "aos_key", regex: new RegExp("aos[_-]?key(=| =|:| :)") },
  { name: "aos_sec", regex: new RegExp("aos[_-]?sec(=| =|:| :)") },
  { name: "api_key", regex: new RegExp("api[_-]?key(=| =|:| :)") },
  {
    name: "api_key_secret",
    regex: new RegExp("api[_-]?key[_-]?secret(=| =|:| :)"),
  },
  { name: "api_key_sid", regex: new RegExp("api[_-]?key[_-]?sid(=| =|:| :)") },
  { name: "api_secret", regex: new RegExp("api[_-]?secret(=| =|:| :)") },
  {
    name: "apiary_api_key",
    regex: new RegExp("apiary[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "apigw_access_token",
    regex: new RegExp("apigw[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "apikey_patterns",
    regex: new RegExp("apikey[:](?:['\"]?[a-zA-Z0-9-_|]+['\"]?)"),
  },
  {
    name: "app_bucket_perm",
    regex: new RegExp("app[_-]?bucket[_-]?perm(=| =|:| :)"),
  },
  {
    name: "app_report_token_key",
    regex: new RegExp("app[_-]?report[_-]?token[_-]?key(=| =|:| :)"),
  },
  { name: "app_secrete", regex: new RegExp("app[_-]?secrete(=| =|:| :)") },
  { name: "app_token", regex: new RegExp("app[_-]?token(=| =|:| :)") },
  { name: "appclientsecret", regex: new RegExp("appclientsecret(=| =|:| :)") },
  {
    name: "apple_id_password",
    regex: new RegExp("apple[_-]?id[_-]?password(=| =|:| :)"),
  },
  { name: "argos_token", regex: new RegExp("argos[_-]?token(=| =|:| :)") },
  {
    name: "artifactory",
    regex: new RegExp("(artifactory.{0,50}(\"|')?[a-zA-Z0-9=]{112}(\"|')?)"),
  },
  {
    name: "artifactory_key",
    regex: new RegExp("artifactory[_-]?key(=| =|:| :)"),
  },
  {
    name: "artifacts_aws_access_key_id",
    regex: new RegExp("artifacts[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "artifacts_aws_secret_access_key",
    regex: new RegExp(
      "artifacts[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)"
    ),
  },
  {
    name: "artifacts_bucket",
    regex: new RegExp("artifacts[_-]?bucket(=| =|:| :)"),
  },
  { name: "artifacts_key", regex: new RegExp("artifacts[_-]?key(=| =|:| :)") },
  {
    name: "artifacts_secret",
    regex: new RegExp("artifacts[_-]?secret(=| =|:| :)"),
  },
  {
    name: "assistant_iam_apikey",
    regex: new RegExp("assistant[_-]?iam[_-]?apikey(=| =|:| :)"),
  },
  {
    name: "auth0_api_clientsecret",
    regex: new RegExp("auth0[_-]?api[_-]?clientsecret(=| =|:| :)"),
  },
  {
    name: "auth0_client_secret",
    regex: new RegExp("auth0[_-]?client[_-]?secret(=| =|:| :)"),
  },
  { name: "auth_token", regex: new RegExp("auth[_-]?token(=| =|:| :)") },
  {
    name: "author_email_addr",
    regex: new RegExp("author[_-]?email[_-]?addr(=| =|:| :)"),
  },
  {
    name: "author_npm_api_key",
    regex: new RegExp("author[_-]?npm[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "aws_access", regex: new RegExp("aws[_-]?access(=| =|:| :)") },
  {
    name: "aws_access_key",
    regex: new RegExp("aws[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "aws_access_key_id - 1",
    regex: new RegExp("aws[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "aws_config_accesskeyid",
    regex: new RegExp("aws[_-]?config[_-]?accesskeyid(=| =|:| :)"),
  },
  {
    name: "aws_config_secretaccesskey",
    regex: new RegExp("aws[_-]?config[_-]?secretaccesskey(=| =|:| :)"),
  },
  { name: "aws_key", regex: new RegExp("aws[_-]?key(=| =|:| :)") },
  {
    name: "aws_patterns",
    regex: new RegExp(
      "(?:accesskeyid|secretaccesskey|aws_access_key_id|aws_secret_access_key)"
    ),
  },
  { name: "aws_secret", regex: new RegExp("aws[_-]?secret(=| =|:| :)") },
  {
    name: "aws_secret_access_key",
    regex: new RegExp("aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "aws_secret_key",
    regex: new RegExp("aws[_-]?secret[_-]?key(=| =|:| :)"),
  },
  { name: "aws_secrets", regex: new RegExp("aws[_-]?secrets(=| =|:| :)") },
  {
    name: "aws_ses_access_key_id",
    regex: new RegExp("aws[_-]?ses[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "aws_ses_secret_access_key",
    regex: new RegExp("aws[_-]?ses[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  { name: "awsaccesskeyid", regex: new RegExp("awsaccesskeyid(=| =|:| :)") },
  {
    name: "awscn_access_key_id",
    regex: new RegExp("awscn[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "awscn_secret_access_key",
    regex: new RegExp("awscn[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  { name: "awssecretkey", regex: new RegExp("awssecretkey(=| =|:| :)") },
  { name: "b2_app_key", regex: new RegExp("b2[_-]?app[_-]?key(=| =|:| :)") },
  { name: "b2_bucket", regex: new RegExp("b2[_-]?bucket(=| =|:| :)") },
  {
    name: "bintray_api_key",
    regex: new RegExp("bintray[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "bintray_apikey",
    regex: new RegExp("bintray[_-]?apikey(=| =|:| :)"),
  },
  {
    name: "bintray_gpg_password",
    regex: new RegExp("bintray[_-]?gpg[_-]?password(=| =|:| :)"),
  },
  { name: "bintray_key", regex: new RegExp("bintray[_-]?key(=| =|:| :)") },
  { name: "bintray_token", regex: new RegExp("bintray[_-]?token(=| =|:| :)") },
  { name: "bintraykey", regex: new RegExp("bintraykey(=| =|:| :)") },
  {
    name: "bluemix_api_key",
    regex: new RegExp("bluemix[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "bluemix_auth", regex: new RegExp("bluemix[_-]?auth(=| =|:| :)") },
  { name: "bluemix_pass", regex: new RegExp("bluemix[_-]?pass(=| =|:| :)") },
  {
    name: "bluemix_pass_prod",
    regex: new RegExp("bluemix[_-]?pass[_-]?prod(=| =|:| :)"),
  },
  {
    name: "bluemix_password",
    regex: new RegExp("bluemix[_-]?password(=| =|:| :)"),
  },
  { name: "bluemix_pwd", regex: new RegExp("bluemix[_-]?pwd(=| =|:| :)") },
  {
    name: "bluemix_username",
    regex: new RegExp("bluemix[_-]?username(=| =|:| :)"),
  },
  {
    name: "brackets_repo_oauth_token",
    regex: new RegExp("brackets[_-]?repo[_-]?oauth[_-]?token(=| =|:| :)"),
  },
  {
    name: "browser_stack_access_key",
    regex: new RegExp("browser[_-]?stack[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "browserstack_access_key",
    regex: new RegExp("browserstack[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "bucketeer_aws_access_key_id",
    regex: new RegExp("bucketeer[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "bucketeer_aws_secret_access_key",
    regex: new RegExp(
      "bucketeer[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)"
    ),
  },
  {
    name: "built_branch_deploy_key",
    regex: new RegExp("built[_-]?branch[_-]?deploy[_-]?key(=| =|:| :)"),
  },
  {
    name: "bundlesize_github_token",
    regex: new RegExp("bundlesize[_-]?github[_-]?token(=| =|:| :)"),
  },
  { name: "bx_password", regex: new RegExp("bx[_-]?password(=| =|:| :)") },
  { name: "bx_username", regex: new RegExp("bx[_-]?username(=| =|:| :)") },
  {
    name: "cache_s3_secret_key",
    regex: new RegExp("cache[_-]?s3[_-]?secret[_-]?key(=| =|:| :)"),
  },
  { name: "cargo_token", regex: new RegExp("cargo[_-]?token(=| =|:| :)") },
  {
    name: "cattle_access_key",
    regex: new RegExp("cattle[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "cattle_agent_instance_auth",
    regex: new RegExp("cattle[_-]?agent[_-]?instance[_-]?auth(=| =|:| :)"),
  },
  {
    name: "cattle_secret_key",
    regex: new RegExp("cattle[_-]?secret[_-]?key(=| =|:| :)"),
  },
  { name: "censys_secret", regex: new RegExp("censys[_-]?secret(=| =|:| :)") },
  {
    name: "certificate_password",
    regex: new RegExp("certificate[_-]?password(=| =|:| :)"),
  },
  { name: "cf_password", regex: new RegExp("cf[_-]?password(=| =|:| :)") },
  {
    name: "cheverny_token",
    regex: new RegExp("cheverny[_-]?token(=| =|:| :)"),
  },
  {
    name: "chrome_client_secret",
    regex: new RegExp("chrome[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "chrome_refresh_token",
    regex: new RegExp("chrome[_-]?refresh[_-]?token(=| =|:| :)"),
  },
  {
    name: "ci_deploy_password",
    regex: new RegExp("ci[_-]?deploy[_-]?password(=| =|:| :)"),
  },
  {
    name: "ci_project_url",
    regex: new RegExp("ci[_-]?project[_-]?url(=| =|:| :)"),
  },
  {
    name: "ci_registry_user",
    regex: new RegExp("ci[_-]?registry[_-]?user(=| =|:| :)"),
  },
  {
    name: "ci_server_name",
    regex: new RegExp("ci[_-]?server[_-]?name(=| =|:| :)"),
  },
  {
    name: "ci_user_token",
    regex: new RegExp("ci[_-]?user[_-]?token(=| =|:| :)"),
  },
  {
    name: "claimr_database",
    regex: new RegExp("claimr[_-]?database(=| =|:| :)"),
  },
  { name: "claimr_db", regex: new RegExp("claimr[_-]?db(=| =|:| :)") },
  {
    name: "claimr_superuser",
    regex: new RegExp("claimr[_-]?superuser(=| =|:| :)"),
  },
  { name: "claimr_token", regex: new RegExp("claimr[_-]?token(=| =|:| :)") },
  {
    name: "cli_e2e_cma_token",
    regex: new RegExp("cli[_-]?e2e[_-]?cma[_-]?token(=| =|:| :)"),
  },
  { name: "client_secret", regex: new RegExp("client[_-]?secret(=| =|:| :)") },
  {
    name: "clojars_password",
    regex: new RegExp("clojars[_-]?password(=| =|:| :)"),
  },
  {
    name: "cloud_api_key",
    regex: new RegExp("cloud[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "cloudant_archived_database",
    regex: new RegExp("cloudant[_-]?archived[_-]?database(=| =|:| :)"),
  },
  {
    name: "cloudant_audited_database",
    regex: new RegExp("cloudant[_-]?audited[_-]?database(=| =|:| :)"),
  },
  {
    name: "cloudant_database",
    regex: new RegExp("cloudant[_-]?database(=| =|:| :)"),
  },
  {
    name: "cloudant_instance",
    regex: new RegExp("cloudant[_-]?instance(=| =|:| :)"),
  },
  {
    name: "cloudant_order_database",
    regex: new RegExp("cloudant[_-]?order[_-]?database(=| =|:| :)"),
  },
  {
    name: "cloudant_parsed_database",
    regex: new RegExp("cloudant[_-]?parsed[_-]?database(=| =|:| :)"),
  },
  {
    name: "cloudant_password",
    regex: new RegExp("cloudant[_-]?password(=| =|:| :)"),
  },
  {
    name: "cloudant_processed_database",
    regex: new RegExp("cloudant[_-]?processed[_-]?database(=| =|:| :)"),
  },
  {
    name: "cloudant_service_database",
    regex: new RegExp("cloudant[_-]?service[_-]?database(=| =|:| :)"),
  },
  {
    name: "cloudflare_api_key",
    regex: new RegExp("cloudflare[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "cloudflare_auth_email",
    regex: new RegExp("cloudflare[_-]?auth[_-]?email(=| =|:| :)"),
  },
  {
    name: "cloudflare_auth_key",
    regex: new RegExp("cloudflare[_-]?auth[_-]?key(=| =|:| :)"),
  },
  {
    name: "cloudflare_email",
    regex: new RegExp("cloudflare[_-]?email(=| =|:| :)"),
  },
  {
    name: "cloudinary_url",
    regex: new RegExp("cloudinary[_-]?url(=| =|:| :)"),
  },
  {
    name: "cloudinary_url_staging",
    regex: new RegExp("cloudinary[_-]?url[_-]?staging(=| =|:| :)"),
  },
  {
    name: "clu_repo_url",
    regex: new RegExp("clu[_-]?repo[_-]?url(=| =|:| :)"),
  },
  {
    name: "clu_ssh_private_key_base64",
    regex: new RegExp("clu[_-]?ssh[_-]?private[_-]?key[_-]?base64(=| =|:| :)"),
  },
  {
    name: "cn_access_key_id",
    regex: new RegExp("cn[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "cn_secret_access_key",
    regex: new RegExp("cn[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "cocoapods_trunk_email",
    regex: new RegExp("cocoapods[_-]?trunk[_-]?email(=| =|:| :)"),
  },
  {
    name: "cocoapods_trunk_token",
    regex: new RegExp("cocoapods[_-]?trunk[_-]?token(=| =|:| :)"),
  },
  {
    name: "codacy_project_token",
    regex: new RegExp("codacy[_-]?project[_-]?token(=| =|:| :)"),
  },
  {
    name: "codeclimate",
    regex: new RegExp("(codeclima.{0,50}(\"|')?[0-9a-f]{64}(\"|')?)"),
  },
  {
    name: "codeclimate_repo_token",
    regex: new RegExp("codeclimate[_-]?repo[_-]?token(=| =|:| :)"),
  },
  { name: "codecov_token", regex: new RegExp("codecov[_-]?token(=| =|:| :)") },
  { name: "coding_token", regex: new RegExp("coding[_-]?token(=| =|:| :)") },
  {
    name: "conekta_apikey",
    regex: new RegExp("conekta[_-]?apikey(=| =|:| :)"),
  },
  { name: "consumer_key", regex: new RegExp("consumer[_-]?key(=| =|:| :)") },
  { name: "consumerkey", regex: new RegExp("consumerkey(=| =|:| :)") },
  {
    name: "contentful_access_token",
    regex: new RegExp("contentful[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "contentful_cma_test_token",
    regex: new RegExp("contentful[_-]?cma[_-]?test[_-]?token(=| =|:| :)"),
  },
  {
    name: "contentful_integration_management_token",
    regex: new RegExp(
      "contentful[_-]?integration[_-]?management[_-]?token(=| =|:| :)"
    ),
  },
  {
    name: "contentful_php_management_test_token",
    regex: new RegExp(
      "contentful[_-]?php[_-]?management[_-]?test[_-]?token(=| =|:| :)"
    ),
  },
  {
    name: "contentful_test_org_cma_token",
    regex: new RegExp(
      "contentful[_-]?test[_-]?org[_-]?cma[_-]?token(=| =|:| :)"
    ),
  },
  {
    name: "contentful_v2_access_token",
    regex: new RegExp("contentful[_-]?v2[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "conversation_password",
    regex: new RegExp("conversation[_-]?password(=| =|:| :)"),
  },
  {
    name: "conversation_username",
    regex: new RegExp("conversation[_-]?username(=| =|:| :)"),
  },
  { name: "cos_secrets", regex: new RegExp("cos[_-]?secrets(=| =|:| :)") },
  {
    name: "coveralls_api_token",
    regex: new RegExp("coveralls[_-]?api[_-]?token(=| =|:| :)"),
  },
  {
    name: "coveralls_repo_token",
    regex: new RegExp("coveralls[_-]?repo[_-]?token(=| =|:| :)"),
  },
  {
    name: "coveralls_token",
    regex: new RegExp("coveralls[_-]?token(=| =|:| :)"),
  },
  {
    name: "coverity_scan_token",
    regex: new RegExp("coverity[_-]?scan[_-]?token(=| =|:| :)"),
  },
  {
    name: "cypress_record_key",
    regex: new RegExp("cypress[_-]?record[_-]?key(=| =|:| :)"),
  },
  {
    name: "danger_github_api_token",
    regex: new RegExp("danger[_-]?github[_-]?api[_-]?token(=| =|:| :)"),
  },
  { name: "database_host", regex: new RegExp("database[_-]?host(=| =|:| :)") },
  { name: "database_name", regex: new RegExp("database[_-]?name(=| =|:| :)") },
  {
    name: "database_password",
    regex: new RegExp("database[_-]?password(=| =|:| :)"),
  },
  { name: "database_port", regex: new RegExp("database[_-]?port(=| =|:| :)") },
  { name: "database_user", regex: new RegExp("database[_-]?user(=| =|:| :)") },
  {
    name: "database_username",
    regex: new RegExp("database[_-]?username(=| =|:| :)"),
  },
  {
    name: "datadog_api_key",
    regex: new RegExp("datadog[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "datadog_app_key",
    regex: new RegExp("datadog[_-]?app[_-]?key(=| =|:| :)"),
  },
  { name: "db_connection", regex: new RegExp("db[_-]?connection(=| =|:| :)") },
  { name: "db_database", regex: new RegExp("db[_-]?database(=| =|:| :)") },
  { name: "db_host", regex: new RegExp("db[_-]?host(=| =|:| :)") },
  { name: "db_password", regex: new RegExp("db[_-]?password(=| =|:| :)") },
  { name: "db_pw", regex: new RegExp("db[_-]?pw(=| =|:| :)") },
  { name: "db_user", regex: new RegExp("db[_-]?user(=| =|:| :)") },
  { name: "db_username", regex: new RegExp("db[_-]?username(=| =|:| :)") },
  {
    name: "ddg_test_email",
    regex: new RegExp("ddg[_-]?test[_-]?email(=| =|:| :)"),
  },
  {
    name: "ddg_test_email_pw",
    regex: new RegExp("ddg[_-]?test[_-]?email[_-]?pw(=| =|:| :)"),
  },
  {
    name: "ddgc_github_token",
    regex: new RegExp("ddgc[_-]?github[_-]?token(=| =|:| :)"),
  },
  {
    name: "deploy_password",
    regex: new RegExp("deploy[_-]?password(=| =|:| :)"),
  },
  { name: "deploy_secure", regex: new RegExp("deploy[_-]?secure(=| =|:| :)") },
  { name: "deploy_token", regex: new RegExp("deploy[_-]?token(=| =|:| :)") },
  { name: "deploy_user", regex: new RegExp("deploy[_-]?user(=| =|:| :)") },
  {
    name: "dgpg_passphrase",
    regex: new RegExp("dgpg[_-]?passphrase(=| =|:| :)"),
  },
  {
    name: "digitalocean_access_token",
    regex: new RegExp("digitalocean[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "digitalocean_ssh_key_body",
    regex: new RegExp("digitalocean[_-]?ssh[_-]?key[_-]?body(=| =|:| :)"),
  },
  {
    name: "digitalocean_ssh_key_ids",
    regex: new RegExp("digitalocean[_-]?ssh[_-]?key[_-]?ids(=| =|:| :)"),
  },
  {
    name: "docker_hub_password",
    regex: new RegExp("docker[_-]?hub[_-]?password(=| =|:| :)"),
  },
  { name: "docker_key", regex: new RegExp("docker[_-]?key(=| =|:| :)") },
  { name: "docker_pass", regex: new RegExp("docker[_-]?pass(=| =|:| :)") },
  { name: "docker_passwd", regex: new RegExp("docker[_-]?passwd(=| =|:| :)") },
  {
    name: "docker_password",
    regex: new RegExp("docker[_-]?password(=| =|:| :)"),
  },
  {
    name: "docker_postgres_url",
    regex: new RegExp("docker[_-]?postgres[_-]?url(=| =|:| :)"),
  },
  { name: "docker_token", regex: new RegExp("docker[_-]?token(=| =|:| :)") },
  {
    name: "dockerhub_password",
    regex: new RegExp("dockerhub[_-]?password(=| =|:| :)"),
  },
  {
    name: "dockerhubpassword",
    regex: new RegExp("dockerhubpassword(=| =|:| :)"),
  },
  {
    name: "doordash_auth_token",
    regex: new RegExp("doordash[_-]?auth[_-]?token(=| =|:| :)"),
  },
  {
    name: "dropbox_oauth_bearer",
    regex: new RegExp("dropbox[_-]?oauth[_-]?bearer(=| =|:| :)"),
  },
  {
    name: "droplet_travis_password",
    regex: new RegExp("droplet[_-]?travis[_-]?password(=| =|:| :)"),
  },
  { name: "dsonar_login", regex: new RegExp("dsonar[_-]?login(=| =|:| :)") },
  {
    name: "dsonar_projectkey",
    regex: new RegExp("dsonar[_-]?projectkey(=| =|:| :)"),
  },
  {
    name: "elastic_cloud_auth",
    regex: new RegExp("elastic[_-]?cloud[_-]?auth(=| =|:| :)"),
  },
  {
    name: "elasticsearch_password",
    regex: new RegExp("elasticsearch[_-]?password(=| =|:| :)"),
  },
  {
    name: "encryption_password",
    regex: new RegExp("encryption[_-]?password(=| =|:| :)"),
  },
  {
    name: "end_user_password",
    regex: new RegExp("end[_-]?user[_-]?password(=| =|:| :)"),
  },
  {
    name: "env_github_oauth_token",
    regex: new RegExp("env[_-]?github[_-]?oauth[_-]?token(=| =|:| :)"),
  },
  {
    name: "env_heroku_api_key",
    regex: new RegExp("env[_-]?heroku[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "env_key", regex: new RegExp("env[_-]?key(=| =|:| :)") },
  { name: "env_secret", regex: new RegExp("env[_-]?secret(=| =|:| :)") },
  {
    name: "env_secret_access_key",
    regex: new RegExp("env[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "env_sonatype_password",
    regex: new RegExp("env[_-]?sonatype[_-]?password(=| =|:| :)"),
  },
  {
    name: "eureka_awssecretkey",
    regex: new RegExp("eureka[_-]?awssecretkey(=| =|:| :)"),
  },
  { name: "exp_password", regex: new RegExp("exp[_-]?password(=| =|:| :)") },
  {
    name: "facebook_access_token",
    regex: new RegExp("(EAACEdEose0cBA[0-9A-Za-z]+)"),
  },
  {
    name: "facebook_oauth",
    regex: new RegExp(
      "[f|F][a|A][c|C][e|E][b|B][o|O][o|O][k|K].*['|\"][0-9a-f]{32}['|\"]"
    ),
  },
  { name: "file_password", regex: new RegExp("file[_-]?password(=| =|:| :)") },
  {
    name: "firebase_api_json",
    regex: new RegExp("firebase[_-]?api[_-]?json(=| =|:| :)"),
  },
  {
    name: "firebase_api_token",
    regex: new RegExp("firebase[_-]?api[_-]?token(=| =|:| :)"),
  },
  { name: "firebase_key", regex: new RegExp("firebase[_-]?key(=| =|:| :)") },
  {
    name: "firebase_project_develop",
    regex: new RegExp("firebase[_-]?project[_-]?develop(=| =|:| :)"),
  },
  {
    name: "firebase_token",
    regex: new RegExp("firebase[_-]?token(=| =|:| :)"),
  },
  {
    name: "firefox_secret",
    regex: new RegExp("firefox[_-]?secret(=| =|:| :)"),
  },
  {
    name: "flask_secret_key",
    regex: new RegExp("flask[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "flickr_api_key",
    regex: new RegExp("flickr[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "flickr_api_secret",
    regex: new RegExp("flickr[_-]?api[_-]?secret(=| =|:| :)"),
  },
  {
    name: "fossa_api_key",
    regex: new RegExp("fossa[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "ftp_host", regex: new RegExp("ftp[_-]?host(=| =|:| :)") },
  { name: "ftp_login", regex: new RegExp("ftp[_-]?login(=| =|:| :)") },
  { name: "ftp_password", regex: new RegExp("ftp[_-]?password(=| =|:| :)") },
  { name: "ftp_pw", regex: new RegExp("ftp[_-]?pw(=| =|:| :)") },
  { name: "ftp_user", regex: new RegExp("ftp[_-]?user(=| =|:| :)") },
  { name: "ftp_username", regex: new RegExp("ftp[_-]?username(=| =|:| :)") },
  { name: "gcloud_bucket", regex: new RegExp("gcloud[_-]?bucket(=| =|:| :)") },
  {
    name: "gcloud_project",
    regex: new RegExp("gcloud[_-]?project(=| =|:| :)"),
  },
  {
    name: "gcloud_service_key",
    regex: new RegExp("gcloud[_-]?service[_-]?key(=| =|:| :)"),
  },
  { name: "gcr_password", regex: new RegExp("gcr[_-]?password(=| =|:| :)") },
  { name: "gcs_bucket", regex: new RegExp("gcs[_-]?bucket(=| =|:| :)") },
  { name: "gh_api_key", regex: new RegExp("gh[_-]?api[_-]?key(=| =|:| :)") },
  { name: "gh_email", regex: new RegExp("gh[_-]?email(=| =|:| :)") },
  {
    name: "gh_next_oauth_client_secret",
    regex: new RegExp("gh[_-]?next[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "gh_next_unstable_oauth_client_id",
    regex: new RegExp(
      "gh[_-]?next[_-]?unstable[_-]?oauth[_-]?client[_-]?id(=| =|:| :)"
    ),
  },
  {
    name: "gh_next_unstable_oauth_client_secret",
    regex: new RegExp(
      "gh[_-]?next[_-]?unstable[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)"
    ),
  },
  {
    name: "gh_oauth_client_secret",
    regex: new RegExp("gh[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "gh_oauth_token",
    regex: new RegExp("gh[_-]?oauth[_-]?token(=| =|:| :)"),
  },
  {
    name: "gh_repo_token",
    regex: new RegExp("gh[_-]?repo[_-]?token(=| =|:| :)"),
  },
  { name: "gh_token", regex: new RegExp("gh[_-]?token(=| =|:| :)") },
  {
    name: "gh_unstable_oauth_client_secret",
    regex: new RegExp(
      "gh[_-]?unstable[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)"
    ),
  },
  { name: "ghb_token", regex: new RegExp("ghb[_-]?token(=| =|:| :)") },
  {
    name: "ghost_api_key",
    regex: new RegExp("ghost[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "git_author_email",
    regex: new RegExp("git[_-]?author[_-]?email(=| =|:| :)"),
  },
  {
    name: "git_author_name",
    regex: new RegExp("git[_-]?author[_-]?name(=| =|:| :)"),
  },
  {
    name: "git_committer_email",
    regex: new RegExp("git[_-]?committer[_-]?email(=| =|:| :)"),
  },
  {
    name: "git_committer_name",
    regex: new RegExp("git[_-]?committer[_-]?name(=| =|:| :)"),
  },
  { name: "git_email", regex: new RegExp("git[_-]?email(=| =|:| :)") },
  { name: "git_name", regex: new RegExp("git[_-]?name(=| =|:| :)") },
  { name: "git_token", regex: new RegExp("git[_-]?token(=| =|:| :)") },
  {
    name: "github_access_token - 1",
    regex: new RegExp("github[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "github_access_token - 2",
    regex: new RegExp("[a-zA-Z0-9_-]*:[a-zA-Z0-9_-]+@github.com*"),
  },
  {
    name: "github_api_key",
    regex: new RegExp("github[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "github_api_token",
    regex: new RegExp("github[_-]?api[_-]?token(=| =|:| :)"),
  },
  { name: "github_auth", regex: new RegExp("github[_-]?auth(=| =|:| :)") },
  {
    name: "github_auth_token",
    regex: new RegExp("github[_-]?auth[_-]?token(=| =|:| :)"),
  },
  {
    name: "github_client_secret",
    regex: new RegExp("github[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "github_deploy_hb_doc_pass",
    regex: new RegExp("github[_-]?deploy[_-]?hb[_-]?doc[_-]?pass(=| =|:| :)"),
  },
  {
    name: "github_deployment_token",
    regex: new RegExp("github[_-]?deployment[_-]?token(=| =|:| :)"),
  },
  {
    name: "github_hunter_token",
    regex: new RegExp("github[_-]?hunter[_-]?token(=| =|:| :)"),
  },
  {
    name: "github_hunter_username",
    regex: new RegExp("github[_-]?hunter[_-]?username(=| =|:| :)"),
  },
  { name: "github_key", regex: new RegExp("github[_-]?key(=| =|:| :)") },
  { name: "github_oauth", regex: new RegExp("github[_-]?oauth(=| =|:| :)") },
  {
    name: "github_oauth_token",
    regex: new RegExp("github[_-]?oauth[_-]?token(=| =|:| :)"),
  },
  {
    name: "github_password",
    regex: new RegExp("github[_-]?password(=| =|:| :)"),
  },
  { name: "github_pwd", regex: new RegExp("github[_-]?pwd(=| =|:| :)") },
  {
    name: "github_release_token",
    regex: new RegExp("github[_-]?release[_-]?token(=| =|:| :)"),
  },
  { name: "github_repo", regex: new RegExp("github[_-]?repo(=| =|:| :)") },
  { name: "github_token", regex: new RegExp("github[_-]?token(=| =|:| :)") },
  { name: "github_tokens", regex: new RegExp("github[_-]?tokens(=| =|:| :)") },
  {
    name: "gitlab_user_email",
    regex: new RegExp("gitlab[_-]?user[_-]?email(=| =|:| :)"),
  },
  { name: "gogs_password", regex: new RegExp("gogs[_-]?password(=| =|:| :)") },
  {
    name: "google_account_type",
    regex: new RegExp("google[_-]?account[_-]?type(=| =|:| :)"),
  },
  {
    name: "google_client_email",
    regex: new RegExp("google[_-]?client[_-]?email(=| =|:| :)"),
  },
  {
    name: "google_client_id",
    regex: new RegExp("google[_-]?client[_-]?id(=| =|:| :)"),
  },
  {
    name: "google_client_secret",
    regex: new RegExp("google[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "google_maps_api_key",
    regex: new RegExp("google[_-]?maps[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "google_oauth", regex: new RegExp("(ya29.[0-9A-Za-z-_]+)") },
  {
    name: "google_patterns",
    regex: new RegExp(
      "(?:google_client_id|google_client_secret|google_client_token)"
    ),
  },
  {
    name: "google_private_key",
    regex: new RegExp("google[_-]?private[_-]?key(=| =|:| :)"),
  },
  {
    name: "google_url",
    regex: new RegExp("([0-9]{12}-[a-z0-9]{32}.apps.googleusercontent.com)"),
  },
  {
    name: "gpg_key_name",
    regex: new RegExp("gpg[_-]?key[_-]?name(=| =|:| :)"),
  },
  { name: "gpg_keyname", regex: new RegExp("gpg[_-]?keyname(=| =|:| :)") },
  {
    name: "gpg_ownertrust",
    regex: new RegExp("gpg[_-]?ownertrust(=| =|:| :)"),
  },
  {
    name: "gpg_passphrase",
    regex: new RegExp("gpg[_-]?passphrase(=| =|:| :)"),
  },
  {
    name: "gpg_private_key",
    regex: new RegExp("gpg[_-]?private[_-]?key(=| =|:| :)"),
  },
  {
    name: "gpg_secret_keys",
    regex: new RegExp("gpg[_-]?secret[_-]?keys(=| =|:| :)"),
  },
  {
    name: "gradle_publish_key",
    regex: new RegExp("gradle[_-]?publish[_-]?key(=| =|:| :)"),
  },
  {
    name: "gradle_publish_secret",
    regex: new RegExp("gradle[_-]?publish[_-]?secret(=| =|:| :)"),
  },
  {
    name: "gradle_signing_key_id",
    regex: new RegExp("gradle[_-]?signing[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "gradle_signing_password",
    regex: new RegExp("gradle[_-]?signing[_-]?password(=| =|:| :)"),
  },
  {
    name: "gren_github_token",
    regex: new RegExp("gren[_-]?github[_-]?token(=| =|:| :)"),
  },
  { name: "grgit_user", regex: new RegExp("grgit[_-]?user(=| =|:| :)") },
  {
    name: "hab_auth_token",
    regex: new RegExp("hab[_-]?auth[_-]?token(=| =|:| :)"),
  },
  { name: "hab_key", regex: new RegExp("hab[_-]?key(=| =|:| :)") },
  {
    name: "hb_codesign_gpg_pass",
    regex: new RegExp("hb[_-]?codesign[_-]?gpg[_-]?pass(=| =|:| :)"),
  },
  {
    name: "hb_codesign_key_pass",
    regex: new RegExp("hb[_-]?codesign[_-]?key[_-]?pass(=| =|:| :)"),
  },
  {
    name: "heroku_api_key",
    regex: new RegExp("heroku[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "heroku_api_key_api_key",
    regex: new RegExp(
      "([h|H][e|E][r|R][o|O][k|K][u|U].{0,30}[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})"
    ),
  },
  { name: "heroku_email", regex: new RegExp("heroku[_-]?email(=| =|:| :)") },
  { name: "heroku_token", regex: new RegExp("heroku[_-]?token(=| =|:| :)") },
  {
    name: "hockeyapp",
    regex: new RegExp("hockey.{0,50}(\"|')?[0-9a-f]{32}(\"|')?"),
  },
  {
    name: "hockeyapp_token",
    regex: new RegExp("hockeyapp[_-]?token(=| =|:| :)"),
  },
  {
    name: "homebrew_github_api_token",
    regex: new RegExp("homebrew[_-]?github[_-]?api[_-]?token(=| =|:| :)"),
  },
  {
    name: "hub_dxia2_password",
    regex: new RegExp("hub[_-]?dxia2[_-]?password(=| =|:| :)"),
  },
  {
    name: "ij_repo_password",
    regex: new RegExp("ij[_-]?repo[_-]?password(=| =|:| :)"),
  },
  {
    name: "ij_repo_username",
    regex: new RegExp("ij[_-]?repo[_-]?username(=| =|:| :)"),
  },
  { name: "index_name", regex: new RegExp("index[_-]?name(=| =|:| :)") },
  {
    name: "integration_test_api_key",
    regex: new RegExp("integration[_-]?test[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "integration_test_appid",
    regex: new RegExp("integration[_-]?test[_-]?appid(=| =|:| :)"),
  },
  {
    name: "internal_secrets",
    regex: new RegExp("internal[_-]?secrets(=| =|:| :)"),
  },
  {
    name: "ios_docs_deploy_token",
    regex: new RegExp("ios[_-]?docs[_-]?deploy[_-]?token(=| =|:| :)"),
  },
  {
    name: "itest_gh_token",
    regex: new RegExp("itest[_-]?gh[_-]?token(=| =|:| :)"),
  },
  { name: "jdbc", regex: new RegExp("mysql: jdbc:mysql(=| =|:| :)") },
  {
    name: "jdbc_databaseurl",
    regex: new RegExp("jdbc[_-]?databaseurl(=| =|:| :)"),
  },
  { name: "jdbc_host", regex: new RegExp("jdbc[_-]?host(=| =|:| :)") },
  { name: "jwt_secret", regex: new RegExp("jwt[_-]?secret(=| =|:| :)") },
  {
    name: "kafka_admin_url",
    regex: new RegExp("kafka[_-]?admin[_-]?url(=| =|:| :)"),
  },
  {
    name: "kafka_instance_name",
    regex: new RegExp("kafka[_-]?instance[_-]?name(=| =|:| :)"),
  },
  {
    name: "kafka_rest_url",
    regex: new RegExp("kafka[_-]?rest[_-]?url(=| =|:| :)"),
  },
  { name: "keystore_pass", regex: new RegExp("keystore[_-]?pass(=| =|:| :)") },
  {
    name: "kovan_private_key",
    regex: new RegExp("kovan[_-]?private[_-]?key(=| =|:| :)"),
  },
  {
    name: "kubecfg_s3_path",
    regex: new RegExp("kubecfg[_-]?s3[_-]?path(=| =|:| :)"),
  },
  { name: "kubeconfig", regex: new RegExp("kubeconfig(=| =|:| :)") },
  {
    name: "kxoltsn3vogdop92m",
    regex: new RegExp("kxoltsn3vogdop92m(=| =|:| :)"),
  },
  { name: "leanplum_key", regex: new RegExp("leanplum[_-]?key(=| =|:| :)") },
  {
    name: "lektor_deploy_password",
    regex: new RegExp("lektor[_-]?deploy[_-]?password(=| =|:| :)"),
  },
  {
    name: "lektor_deploy_username",
    regex: new RegExp("lektor[_-]?deploy[_-]?username(=| =|:| :)"),
  },
  {
    name: "lighthouse_api_key",
    regex: new RegExp("lighthouse[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "linux_signing_key",
    regex: new RegExp("linux[_-]?signing[_-]?key(=| =|:| :)"),
  },
  {
    name: "ll_publish_url",
    regex: new RegExp("ll[_-]?publish[_-]?url(=| =|:| :)"),
  },
  {
    name: "ll_shared_key",
    regex: new RegExp("ll[_-]?shared[_-]?key(=| =|:| :)"),
  },
  {
    name: "looker_test_runner_client_secret",
    regex: new RegExp(
      "looker[_-]?test[_-]?runner[_-]?client[_-]?secret(=| =|:| :)"
    ),
  },
  {
    name: "lottie_happo_api_key",
    regex: new RegExp("lottie[_-]?happo[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "lottie_happo_secret_key",
    regex: new RegExp("lottie[_-]?happo[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "lottie_s3_secret_key",
    regex: new RegExp("lottie[_-]?s3[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "lottie_upload_cert_key_password",
    regex: new RegExp(
      "lottie[_-]?upload[_-]?cert[_-]?key[_-]?password(=| =|:| :)"
    ),
  },
  {
    name: "lottie_upload_cert_key_store_password",
    regex: new RegExp(
      "lottie[_-]?upload[_-]?cert[_-]?key[_-]?store[_-]?password(=| =|:| :)"
    ),
  },
  {
    name: "magento_auth_password",
    regex: new RegExp("magento[_-]?auth[_-]?password(=| =|:| :)"),
  },
  {
    name: "magento_auth_username",
    regex: new RegExp("magento[_-]?auth[_-]?username (=| =|:| :)"),
  },
  {
    name: "magento_password",
    regex: new RegExp("magento[_-]?password(=| =|:| :)"),
  },
  { name: "mail_password", regex: new RegExp("mail[_-]?password(=| =|:| :)") },
  {
    name: "mailchimp",
    regex: new RegExp("(W(?:[a-f0-9]{32}(-us[0-9]{1,2}))a-zA-Z0-9)"),
  },
  {
    name: "mailchimp_api_key",
    regex: new RegExp("mailchimp[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "mailchimp_key", regex: new RegExp("mailchimp[_-]?key(=| =|:| :)") },
  {
    name: "mailer_password",
    regex: new RegExp("mailer[_-]?password(=| =|:| :)"),
  },
  { name: "mailgun", regex: new RegExp("(key-[0-9a-f]{32})") },
  {
    name: "mailgun_api_key",
    regex: new RegExp("mailgun[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "mailgun_apikey",
    regex: new RegExp("mailgun[_-]?apikey(=| =|:| :)"),
  },
  {
    name: "mailgun_password",
    regex: new RegExp("mailgun[_-]?password(=| =|:| :)"),
  },
  {
    name: "mailgun_priv_key",
    regex: new RegExp("mailgun[_-]?priv[_-]?key(=| =|:| :)"),
  },
  {
    name: "mailgun_pub_apikey",
    regex: new RegExp("mailgun[_-]?pub[_-]?apikey(=| =|:| :)"),
  },
  {
    name: "mailgun_pub_key",
    regex: new RegExp("mailgun[_-]?pub[_-]?key(=| =|:| :)"),
  },
  {
    name: "mailgun_secret_api_key",
    regex: new RegExp("mailgun[_-]?secret[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "manage_key", regex: new RegExp("manage[_-]?key(=| =|:| :)") },
  { name: "manage_secret", regex: new RegExp("manage[_-]?secret(=| =|:| :)") },
  {
    name: "management_token",
    regex: new RegExp("management[_-]?token(=| =|:| :)"),
  },
  {
    name: "managementapiaccesstoken",
    regex: new RegExp("managementapiaccesstoken(=| =|:| :)"),
  },
  {
    name: "mandrill_api_key",
    regex: new RegExp("mandrill[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "manifest_app_token",
    regex: new RegExp("manifest[_-]?app[_-]?token(=| =|:| :)"),
  },
  {
    name: "manifest_app_url",
    regex: new RegExp("manifest[_-]?app[_-]?url(=| =|:| :)"),
  },
  {
    name: "mapbox_access_token",
    regex: new RegExp("mapbox[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "mapbox_api_token",
    regex: new RegExp("mapbox[_-]?api[_-]?token(=| =|:| :)"),
  },
  {
    name: "mapbox_aws_access_key_id",
    regex: new RegExp("mapbox[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "mapbox_aws_secret_access_key",
    regex: new RegExp(
      "mapbox[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)"
    ),
  },
  {
    name: "mapboxaccesstoken",
    regex: new RegExp("mapboxaccesstoken(=| =|:| :)"),
  },
  { name: "master_password", regex: new RegExp("(master_password).+") },
  { name: "mg_api_key", regex: new RegExp("mg[_-]?api[_-]?key(=| =|:| :)") },
  {
    name: "mg_public_api_key",
    regex: new RegExp("mg[_-]?public[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "mh_apikey", regex: new RegExp("mh[_-]?apikey(=| =|:| :)") },
  { name: "mh_password", regex: new RegExp("mh[_-]?password(=| =|:| :)") },
  {
    name: "mile_zero_key",
    regex: new RegExp("mile[_-]?zero[_-]?key(=| =|:| :)"),
  },
  {
    name: "minio_access_key",
    regex: new RegExp("minio[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "minio_secret_key",
    regex: new RegExp("minio[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "multi_bob_sid",
    regex: new RegExp("multi[_-]?bob[_-]?sid(=| =|:| :)"),
  },
  {
    name: "multi_connect_sid",
    regex: new RegExp("multi[_-]?connect[_-]?sid(=| =|:| :)"),
  },
  {
    name: "multi_disconnect_sid",
    regex: new RegExp("multi[_-]?disconnect[_-]?sid(=| =|:| :)"),
  },
  {
    name: "multi_workflow_sid",
    regex: new RegExp("multi[_-]?workflow[_-]?sid(=| =|:| :)"),
  },
  {
    name: "multi_workspace_sid",
    regex: new RegExp("multi[_-]?workspace[_-]?sid(=| =|:| :)"),
  },
  {
    name: "my_secret_env",
    regex: new RegExp("my[_-]?secret[_-]?env(=| =|:| :)"),
  },
  {
    name: "mysql_database",
    regex: new RegExp("mysql[_-]?database(=| =|:| :)"),
  },
  {
    name: "mysql_hostname",
    regex: new RegExp("mysql[_-]?hostname(=| =|:| :)"),
  },
  {
    name: "mysql_password",
    regex: new RegExp("mysql[_-]?password(=| =|:| :)"),
  },
  {
    name: "mysql_root_password",
    regex: new RegExp("mysql[_-]?root[_-]?password(=| =|:| :)"),
  },
  { name: "mysql_user", regex: new RegExp("mysql[_-]?user(=| =|:| :)") },
  {
    name: "mysql_username",
    regex: new RegExp("mysql[_-]?username(=| =|:| :)"),
  },
  { name: "mysqlmasteruser", regex: new RegExp("mysqlmasteruser(=| =|:| :)") },
  { name: "mysqlsecret", regex: new RegExp("mysqlsecret(=| =|:| :)") },
  { name: "nativeevents", regex: new RegExp("nativeevents(=| =|:| :)") },
  {
    name: "netlify_api_key",
    regex: new RegExp("netlify[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "new_relic_beta_token",
    regex: new RegExp("new[_-]?relic[_-]?beta[_-]?token(=| =|:| :)"),
  },
  {
    name: "nexus_password",
    regex: new RegExp("nexus[_-]?password(=| =|:| :)"),
  },
  { name: "nexuspassword", regex: new RegExp("nexuspassword(=| =|:| :)") },
  {
    name: "ngrok_auth_token",
    regex: new RegExp("ngrok[_-]?auth[_-]?token(=| =|:| :)"),
  },
  { name: "ngrok_token", regex: new RegExp("ngrok[_-]?token(=| =|:| :)") },
  { name: "node_env", regex: new RegExp("node[_-]?env(=| =|:| :)") },
  {
    name: "node_pre_gyp_accesskeyid",
    regex: new RegExp("node[_-]?pre[_-]?gyp[_-]?accesskeyid(=| =|:| :)"),
  },
  {
    name: "node_pre_gyp_github_token",
    regex: new RegExp("node[_-]?pre[_-]?gyp[_-]?github[_-]?token(=| =|:| :)"),
  },
  {
    name: "node_pre_gyp_secretaccesskey",
    regex: new RegExp("node[_-]?pre[_-]?gyp[_-]?secretaccesskey(=| =|:| :)"),
  },
  { name: "non_token", regex: new RegExp("non[_-]?token(=| =|:| :)") },
  { name: "now_token", regex: new RegExp("now[_-]?token(=| =|:| :)") },
  { name: "npm_api_key", regex: new RegExp("npm[_-]?api[_-]?key(=| =|:| :)") },
  {
    name: "npm_api_token",
    regex: new RegExp("npm[_-]?api[_-]?token(=| =|:| :)"),
  },
  {
    name: "npm_auth_token",
    regex: new RegExp("npm[_-]?auth[_-]?token(=| =|:| :)"),
  },
  { name: "npm_email", regex: new RegExp("npm[_-]?email(=| =|:| :)") },
  { name: "npm_password", regex: new RegExp("npm[_-]?password(=| =|:| :)") },
  {
    name: "npm_secret_key",
    regex: new RegExp("npm[_-]?secret[_-]?key(=| =|:| :)"),
  },
  { name: "npm_token - 1", regex: new RegExp("npm[_-]?token(=| =|:| :)") },
  { name: "nuget_api_key - 1", regex: new RegExp("(oy2[a-z0-9]{43})") },
  {
    name: "nuget_api_key - 2",
    regex: new RegExp("nuget[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "numbers_service_pass",
    regex: new RegExp("numbers[_-]?service[_-]?pass(=| =|:| :)"),
  },
  { name: "oauth_token", regex: new RegExp("oauth[_-]?token(=| =|:| :)") },
  {
    name: "object_storage_password",
    regex: new RegExp("object[_-]?storage[_-]?password(=| =|:| :)"),
  },
  {
    name: "object_storage_region_name",
    regex: new RegExp("object[_-]?storage[_-]?region[_-]?name(=| =|:| :)"),
  },
  {
    name: "object_store_bucket",
    regex: new RegExp("object[_-]?store[_-]?bucket(=| =|:| :)"),
  },
  {
    name: "object_store_creds",
    regex: new RegExp("object[_-]?store[_-]?creds(=| =|:| :)"),
  },
  { name: "oc_pass", regex: new RegExp("oc[_-]?pass(=| =|:| :)") },
  {
    name: "octest_app_password",
    regex: new RegExp("octest[_-]?app[_-]?password(=| =|:| :)"),
  },
  {
    name: "octest_app_username",
    regex: new RegExp("octest[_-]?app[_-]?username(=| =|:| :)"),
  },
  {
    name: "octest_password",
    regex: new RegExp("octest[_-]?password(=| =|:| :)"),
  },
  { name: "ofta_key", regex: new RegExp("ofta[_-]?key(=| =|:| :)") },
  { name: "ofta_region", regex: new RegExp("ofta[_-]?region(=| =|:| :)") },
  { name: "ofta_secret", regex: new RegExp("ofta[_-]?secret(=| =|:| :)") },
  {
    name: "okta_client_token",
    regex: new RegExp("okta[_-]?client[_-]?token(=| =|:| :)"),
  },
  {
    name: "okta_oauth2_client_secret",
    regex: new RegExp("okta[_-]?oauth2[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "okta_oauth2_clientsecret",
    regex: new RegExp("okta[_-]?oauth2[_-]?clientsecret(=| =|:| :)"),
  },
  { name: "omise_key", regex: new RegExp("omise[_-]?key(=| =|:| :)") },
  { name: "omise_pkey", regex: new RegExp("omise[_-]?pkey(=| =|:| :)") },
  { name: "omise_pubkey", regex: new RegExp("omise[_-]?pubkey(=| =|:| :)") },
  { name: "omise_skey", regex: new RegExp("omise[_-]?skey(=| =|:| :)") },
  {
    name: "onesignal_api_key",
    regex: new RegExp("onesignal[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "onesignal_user_auth_key",
    regex: new RegExp("onesignal[_-]?user[_-]?auth[_-]?key(=| =|:| :)"),
  },
  {
    name: "open_whisk_key",
    regex: new RegExp("open[_-]?whisk[_-]?key(=| =|:| :)"),
  },
  { name: "openwhisk_key", regex: new RegExp("openwhisk[_-]?key(=| =|:| :)") },
  { name: "os_auth_url", regex: new RegExp("os[_-]?auth[_-]?url(=| =|:| :)") },
  { name: "os_password", regex: new RegExp("os[_-]?password(=| =|:| :)") },
  {
    name: "ossrh_jira_password",
    regex: new RegExp("ossrh[_-]?jira[_-]?password(=| =|:| :)"),
  },
  { name: "ossrh_pass", regex: new RegExp("ossrh[_-]?pass(=| =|:| :)") },
  {
    name: "ossrh_password",
    regex: new RegExp("ossrh[_-]?password(=| =|:| :)"),
  },
  { name: "ossrh_secret", regex: new RegExp("ossrh[_-]?secret(=| =|:| :)") },
  {
    name: "ossrh_username",
    regex: new RegExp("ossrh[_-]?username(=| =|:| :)"),
  },
  {
    name: "outlook_team",
    regex: new RegExp("(https://outlook.office.com/webhook/[0-9a-f-]{36}@)"),
  },
  {
    name: "packagecloud_token",
    regex: new RegExp("packagecloud[_-]?token(=| =|:| :)"),
  },
  {
    name: "pagerduty_apikey",
    regex: new RegExp("pagerduty[_-]?apikey(=| =|:| :)"),
  },
  {
    name: "parse_js_key",
    regex: new RegExp("parse[_-]?js[_-]?key(=| =|:| :)"),
  },
  { name: "passwordtravis", regex: new RegExp("passwordtravis(=| =|:| :)") },
  {
    name: "paypal_braintree_access_token",
    regex: new RegExp("(access_token$production$[0-9a-z]{16}$[0-9a-f]{32})"),
  },
  {
    name: "paypal_client_secret",
    regex: new RegExp("paypal[_-]?client[_-]?secret(=| =|:| :)"),
  },
  { name: "percy_project", regex: new RegExp("percy[_-]?project(=| =|:| :)") },
  { name: "percy_token", regex: new RegExp("percy[_-]?token(=| =|:| :)") },
  { name: "personal_key", regex: new RegExp("personal[_-]?key(=| =|:| :)") },
  {
    name: "personal_secret",
    regex: new RegExp("personal[_-]?secret(=| =|:| :)"),
  },
  { name: "pg_database", regex: new RegExp("pg[_-]?database(=| =|:| :)") },
  { name: "pg_host", regex: new RegExp("pg[_-]?host(=| =|:| :)") },
  {
    name: "places_api_key",
    regex: new RegExp("places[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "places_apikey", regex: new RegExp("places[_-]?apikey(=| =|:| :)") },
  { name: "plotly_apikey", regex: new RegExp("plotly[_-]?apikey(=| =|:| :)") },
  {
    name: "plugin_password",
    regex: new RegExp("plugin[_-]?password(=| =|:| :)"),
  },
  {
    name: "postgres_env_postgres_db",
    regex: new RegExp("postgres[_-]?env[_-]?postgres[_-]?db(=| =|:| :)"),
  },
  {
    name: "postgres_env_postgres_password",
    regex: new RegExp("postgres[_-]?env[_-]?postgres[_-]?password(=| =|:| :)"),
  },
  { name: "postgresql_db", regex: new RegExp("postgresql[_-]?db(=| =|:| :)") },
  {
    name: "postgresql_pass",
    regex: new RegExp("postgresql[_-]?pass(=| =|:| :)"),
  },
  { name: "prebuild_auth", regex: new RegExp("prebuild[_-]?auth(=| =|:| :)") },
  {
    name: "preferred_username",
    regex: new RegExp("preferred[_-]?username(=| =|:| :)"),
  },
  {
    name: "pring_mail_username",
    regex: new RegExp("pring[_-]?mail[_-]?username(=| =|:| :)"),
  },
  {
    name: "private_key",
    regex: new RegExp(
      "-----(?:(?:BEGIN|END) )(?:(?:EC|PGP|DSA|RSA|OPENSSH).)?PRIVATE.KEY(.BLOCK)?-----"
    ),
  },
  {
    name: "private_signing_password",
    regex: new RegExp("private[_-]?signing[_-]?password(=| =|:| :)"),
  },
  {
    name: "prod_access_key_id",
    regex: new RegExp("prod[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  { name: "prod_password", regex: new RegExp("prod[_-]?password(=| =|:| :)") },
  {
    name: "prod_secret_key",
    regex: new RegExp("prod[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "project_config",
    regex: new RegExp("project[_-]?config(=| =|:| :)"),
  },
  {
    name: "publish_access",
    regex: new RegExp("publish[_-]?access(=| =|:| :)"),
  },
  { name: "publish_key", regex: new RegExp("publish[_-]?key(=| =|:| :)") },
  {
    name: "publish_secret",
    regex: new RegExp("publish[_-]?secret(=| =|:| :)"),
  },
  {
    name: "pushover_token",
    regex: new RegExp("pushover[_-]?token(=| =|:| :)"),
  },
  { name: "pypi_passowrd", regex: new RegExp("pypi[_-]?passowrd(=| =|:| :)") },
  { name: "qiita_token", regex: new RegExp("qiita[_-]?token(=| =|:| :)") },
  { name: "quip_token", regex: new RegExp("quip[_-]?token(=| =|:| :)") },
  {
    name: "rabbitmq_password",
    regex: new RegExp("rabbitmq[_-]?password(=| =|:| :)"),
  },
  {
    name: "randrmusicapiaccesstoken",
    regex: new RegExp("randrmusicapiaccesstoken(=| =|:| :)"),
  },
  {
    name: "redis_stunnel_urls",
    regex: new RegExp("redis[_-]?stunnel[_-]?urls(=| =|:| :)"),
  },
  {
    name: "rediscloud_url",
    regex: new RegExp("rediscloud[_-]?url(=| =|:| :)"),
  },
  { name: "refresh_token", regex: new RegExp("refresh[_-]?token(=| =|:| :)") },
  { name: "registry_pass", regex: new RegExp("registry[_-]?pass(=| =|:| :)") },
  {
    name: "registry_secure",
    regex: new RegExp("registry[_-]?secure(=| =|:| :)"),
  },
  {
    name: "release_gh_token",
    regex: new RegExp("release[_-]?gh[_-]?token(=| =|:| :)"),
  },
  { name: "release_token", regex: new RegExp("release[_-]?token(=| =|:| :)") },
  {
    name: "reporting_webdav_pwd",
    regex: new RegExp("reporting[_-]?webdav[_-]?pwd(=| =|:| :)"),
  },
  {
    name: "reporting_webdav_url",
    regex: new RegExp("reporting[_-]?webdav[_-]?url(=| =|:| :)"),
  },
  { name: "repotoken", regex: new RegExp("repotoken(=| =|:| :)") },
  {
    name: "rest_api_key",
    regex: new RegExp("rest[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "rinkeby_private_key",
    regex: new RegExp("rinkeby[_-]?private[_-]?key(=| =|:| :)"),
  },
  {
    name: "ropsten_private_key",
    regex: new RegExp("ropsten[_-]?private[_-]?key(=| =|:| :)"),
  },
  {
    name: "route53_access_key_id",
    regex: new RegExp("route53[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "rtd_key_pass",
    regex: new RegExp("rtd[_-]?key[_-]?pass(=| =|:| :)"),
  },
  {
    name: "rtd_store_pass",
    regex: new RegExp("rtd[_-]?store[_-]?pass(=| =|:| :)"),
  },
  {
    name: "rubygems_auth_token",
    regex: new RegExp("rubygems[_-]?auth[_-]?token(=| =|:| :)"),
  },
  {
    name: "s3_access_key",
    regex: new RegExp("s3[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "s3_access_key_id",
    regex: new RegExp("s3[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "s3_bucket_name_app_logs",
    regex: new RegExp("s3[_-]?bucket[_-]?name[_-]?app[_-]?logs(=| =|:| :)"),
  },
  {
    name: "s3_bucket_name_assets",
    regex: new RegExp("s3[_-]?bucket[_-]?name[_-]?assets(=| =|:| :)"),
  },
  {
    name: "s3_external_3_amazonaws_com",
    regex: new RegExp("s3[_-]?external[_-]?3[_-]?amazonaws[_-]?com(=| =|:| :)"),
  },
  { name: "s3_key", regex: new RegExp("s3[_-]?key(=| =|:| :)") },
  {
    name: "s3_key_app_logs",
    regex: new RegExp("s3[_-]?key[_-]?app[_-]?logs(=| =|:| :)"),
  },
  {
    name: "s3_key_assets",
    regex: new RegExp("s3[_-]?key[_-]?assets(=| =|:| :)"),
  },
  {
    name: "s3_secret_app_logs",
    regex: new RegExp("s3[_-]?secret[_-]?app[_-]?logs(=| =|:| :)"),
  },
  {
    name: "s3_secret_assets",
    regex: new RegExp("s3[_-]?secret[_-]?assets(=| =|:| :)"),
  },
  {
    name: "s3_secret_key",
    regex: new RegExp("s3[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "s3_user_secret",
    regex: new RegExp("s3[_-]?user[_-]?secret(=| =|:| :)"),
  },
  {
    name: "sacloud_access_token",
    regex: new RegExp("sacloud[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "sacloud_access_token_secret",
    regex: new RegExp("sacloud[_-]?access[_-]?token[_-]?secret(=| =|:| :)"),
  },
  { name: "sacloud_api", regex: new RegExp("sacloud[_-]?api(=| =|:| :)") },
  {
    name: "salesforce_bulk_test_password",
    regex: new RegExp("salesforce[_-]?bulk[_-]?test[_-]?password(=| =|:| :)"),
  },
  {
    name: "salesforce_bulk_test_security_token",
    regex: new RegExp(
      "salesforce[_-]?bulk[_-]?test[_-]?security[_-]?token(=| =|:| :)"
    ),
  },
  {
    name: "sandbox_access_token",
    regex: new RegExp("sandbox[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "sandbox_aws_access_key_id",
    regex: new RegExp("sandbox[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "sandbox_aws_secret_access_key",
    regex: new RegExp(
      "sandbox[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)"
    ),
  },
  {
    name: "sauce_access_key",
    regex: new RegExp("sauce[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "sauce_token",
    regex: new RegExp("(sauce.{0,50}(\"|')?[0-9a-f-]{36}(\"|')?)"),
  },
  {
    name: "scrutinizer_token",
    regex: new RegExp("scrutinizer[_-]?token(=| =|:| :)"),
  },
  { name: "sdr_token", regex: new RegExp("sdr[_-]?token(=| =|:| :)") },
  { name: "secret_0", regex: new RegExp("secret[_-]?0(=| =|:| :)") },
  { name: "secret_1", regex: new RegExp("secret[_-]?1(=| =|:| :)") },
  { name: "secret_10", regex: new RegExp("secret[_-]?10(=| =|:| :)") },
  { name: "secret_11", regex: new RegExp("secret[_-]?11(=| =|:| :)") },
  { name: "secret_2", regex: new RegExp("secret[_-]?2(=| =|:| :)") },
  { name: "secret_3", regex: new RegExp("secret[_-]?3(=| =|:| :)") },
  { name: "secret_4", regex: new RegExp("secret[_-]?4(=| =|:| :)") },
  { name: "secret_5", regex: new RegExp("secret[_-]?5(=| =|:| :)") },
  { name: "secret_6", regex: new RegExp("secret[_-]?6(=| =|:| :)") },
  { name: "secret_7", regex: new RegExp("secret[_-]?7(=| =|:| :)") },
  { name: "secret_8", regex: new RegExp("secret[_-]?8(=| =|:| :)") },
  { name: "secret_9", regex: new RegExp("secret[_-]?9(=| =|:| :)") },
  {
    name: "secret_key_base",
    regex: new RegExp("secret[_-]?key[_-]?base(=| =|:| :)"),
  },
  { name: "secretaccesskey", regex: new RegExp("secretaccesskey(=| =|:| :)") },
  { name: "secretkey", regex: new RegExp("secretkey(=| =|:| :)") },
  {
    name: "segment_api_key",
    regex: new RegExp("segment[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "selion_log_level_dev",
    regex: new RegExp("selion[_-]?log[_-]?level[_-]?dev(=| =|:| :)"),
  },
  {
    name: "selion_selenium_host",
    regex: new RegExp("selion[_-]?selenium[_-]?host(=| =|:| :)"),
  },
  { name: "sendgrid - 2", regex: new RegExp("sendgrid(=| =|:| :)") },
  {
    name: "sendgrid_api_key - 1",
    regex: new RegExp("sendgrid[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "sendgrid_key", regex: new RegExp("sendgrid[_-]?key(=| =|:| :)") },
  {
    name: "sendgrid_password",
    regex: new RegExp("sendgrid[_-]?password(=| =|:| :)"),
  },
  { name: "sendgrid_user", regex: new RegExp("sendgrid[_-]?user(=| =|:| :)") },
  {
    name: "sendgrid_username",
    regex: new RegExp("sendgrid[_-]?username(=| =|:| :)"),
  },
  {
    name: "sendwithus_key",
    regex: new RegExp("sendwithus[_-]?key(=| =|:| :)"),
  },
  {
    name: "sentry_auth_token",
    regex: new RegExp("sentry[_-]?auth[_-]?token(=| =|:| :)"),
  },
  {
    name: "sentry_default_org",
    regex: new RegExp("sentry[_-]?default[_-]?org(=| =|:| :)"),
  },
  {
    name: "sentry_endpoint",
    regex: new RegExp("sentry[_-]?endpoint(=| =|:| :)"),
  },
  { name: "sentry_key", regex: new RegExp("sentry[_-]?key(=| =|:| :)") },
  {
    name: "service_account_secret",
    regex: new RegExp("service[_-]?account[_-]?secret(=| =|:| :)"),
  },
  {
    name: "ses_access_key",
    regex: new RegExp("ses[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "ses_secret_key",
    regex: new RegExp("ses[_-]?secret[_-]?key(=| =|:| :)"),
  },
  { name: "setdstaccesskey", regex: new RegExp("setdstaccesskey(=| =|:| :)") },
  { name: "setdstsecretkey", regex: new RegExp("setdstsecretkey(=| =|:| :)") },
  { name: "setsecretkey", regex: new RegExp("setsecretkey(=| =|:| :)") },
  { name: "signing_key", regex: new RegExp("signing[_-]?key(=| =|:| :)") },
  {
    name: "signing_key_password",
    regex: new RegExp("signing[_-]?key[_-]?password(=| =|:| :)"),
  },
  {
    name: "signing_key_secret",
    regex: new RegExp("signing[_-]?key[_-]?secret(=| =|:| :)"),
  },
  {
    name: "signing_key_sid",
    regex: new RegExp("signing[_-]?key[_-]?sid(=| =|:| :)"),
  },
  {
    name: "slack_webhook_url",
    regex: new RegExp(
      "(hooks.slack.com/services/T[A-Z0-9]{8}/B[A-Z0-9]{8}/[a-zA-Z0-9]{1,})"
    ),
  },
  {
    name: "slash_developer_space",
    regex: new RegExp("slash[_-]?developer[_-]?space(=| =|:| :)"),
  },
  {
    name: "slash_developer_space_key",
    regex: new RegExp("slash[_-]?developer[_-]?space[_-]?key(=| =|:| :)"),
  },
  {
    name: "slate_user_email",
    regex: new RegExp("slate[_-]?user[_-]?email(=| =|:| :)"),
  },
  {
    name: "snoowrap_client_secret",
    regex: new RegExp("snoowrap[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "snoowrap_password",
    regex: new RegExp("snoowrap[_-]?password(=| =|:| :)"),
  },
  {
    name: "snoowrap_refresh_token",
    regex: new RegExp("snoowrap[_-]?refresh[_-]?token(=| =|:| :)"),
  },
  {
    name: "snyk_api_token",
    regex: new RegExp("snyk[_-]?api[_-]?token(=| =|:| :)"),
  },
  { name: "snyk_token", regex: new RegExp("snyk[_-]?token(=| =|:| :)") },
  {
    name: "socrata_app_token",
    regex: new RegExp("socrata[_-]?app[_-]?token(=| =|:| :)"),
  },
  {
    name: "socrata_password",
    regex: new RegExp("socrata[_-]?password(=| =|:| :)"),
  },
  {
    name: "sonar_organization_key",
    regex: new RegExp("sonar[_-]?organization[_-]?key(=| =|:| :)"),
  },
  {
    name: "sonar_project_key",
    regex: new RegExp("sonar[_-]?project[_-]?key(=| =|:| :)"),
  },
  { name: "sonar_token", regex: new RegExp("sonar[_-]?token(=| =|:| :)") },
  {
    name: "sonarqube_docs_api_key",
    regex: new RegExp("(sonar.{0,50}(\"|')?[0-9a-f]{40}(\"|')?)"),
  },
  {
    name: "sonatype_gpg_key_name",
    regex: new RegExp("sonatype[_-]?gpg[_-]?key[_-]?name(=| =|:| :)"),
  },
  {
    name: "sonatype_gpg_passphrase",
    regex: new RegExp("sonatype[_-]?gpg[_-]?passphrase(=| =|:| :)"),
  },
  {
    name: "sonatype_nexus_password",
    regex: new RegExp("sonatype[_-]?nexus[_-]?password(=| =|:| :)"),
  },
  { name: "sonatype_pass", regex: new RegExp("sonatype[_-]?pass(=| =|:| :)") },
  {
    name: "sonatype_password",
    regex: new RegExp("sonatype[_-]?password(=| =|:| :)"),
  },
  {
    name: "sonatype_token_password",
    regex: new RegExp("sonatype[_-]?token[_-]?password(=| =|:| :)"),
  },
  {
    name: "sonatype_token_user",
    regex: new RegExp("sonatype[_-]?token[_-]?user(=| =|:| :)"),
  },
  {
    name: "sonatypepassword",
    regex: new RegExp("sonatypepassword(=| =|:| :)"),
  },
  {
    name: "soundcloud_client_secret",
    regex: new RegExp("soundcloud[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "soundcloud_password",
    regex: new RegExp("soundcloud[_-]?password(=| =|:| :)"),
  },
  {
    name: "spaces_access_key_id",
    regex: new RegExp("spaces[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "spaces_secret_access_key",
    regex: new RegExp("spaces[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "spotify_api_access_token",
    regex: new RegExp("spotify[_-]?api[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "spotify_api_client_secret",
    regex: new RegExp("spotify[_-]?api[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "spring_mail_password",
    regex: new RegExp("spring[_-]?mail[_-]?password(=| =|:| :)"),
  },
  { name: "sqsaccesskey", regex: new RegExp("sqsaccesskey(=| =|:| :)") },
  { name: "sqssecretkey", regex: new RegExp("sqssecretkey(=| =|:| :)") },
  {
    name: "square_app_secret",
    regex: new RegExp("(sq0[a-z]{3}-[0-9A-Za-z-_]{20,50})"),
  },
  {
    name: "square_reader_sdk_repository_password",
    regex: new RegExp(
      "square[_-]?reader[_-]?sdk[_-]?repository[_-]?password(=| =|:| :)"
    ),
  },
  {
    name: "srcclr_api_token",
    regex: new RegExp("srcclr[_-]?api[_-]?token(=| =|:| :)"),
  },
  { name: "ssh_password", regex: new RegExp("(sshpass -p.*['|\"])") },
  { name: "sshpass", regex: new RegExp("sshpass(=| =|:| :)") },
  { name: "ssmtp_config", regex: new RegExp("ssmtp[_-]?config(=| =|:| :)") },
  {
    name: "staging_base_url_runscope",
    regex: new RegExp("staging[_-]?base[_-]?url[_-]?runscope(=| =|:| :)"),
  },
  {
    name: "star_test_aws_access_key_id",
    regex: new RegExp(
      "star[_-]?test[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)"
    ),
  },
  {
    name: "star_test_bucket",
    regex: new RegExp("star[_-]?test[_-]?bucket(=| =|:| :)"),
  },
  {
    name: "star_test_location",
    regex: new RegExp("star[_-]?test[_-]?location(=| =|:| :)"),
  },
  {
    name: "star_test_secret_access_key",
    regex: new RegExp("star[_-]?test[_-]?secret[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "starship_account_sid",
    regex: new RegExp("starship[_-]?account[_-]?sid(=| =|:| :)"),
  },
  {
    name: "starship_auth_token",
    regex: new RegExp("starship[_-]?auth[_-]?token(=| =|:| :)"),
  },
  {
    name: "stormpath_api_key_id",
    regex: new RegExp("stormpath[_-]?api[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "stormpath_api_key_secret",
    regex: new RegExp("stormpath[_-]?api[_-]?key[_-]?secret(=| =|:| :)"),
  },
  {
    name: "strip_publishable_key",
    regex: new RegExp("strip[_-]?publishable[_-]?key(=| =|:| :)"),
  },
  {
    name: "strip_secret_key",
    regex: new RegExp("strip[_-]?secret[_-]?key(=| =|:| :)"),
  },
  {
    name: "stripe_private",
    regex: new RegExp("stripe[_-]?private(=| =|:| :)"),
  },
  { name: "stripe_public", regex: new RegExp("stripe[_-]?public(=| =|:| :)") },
  {
    name: "stripe_restricted_api",
    regex: new RegExp("(rk_live_[0-9a-zA-Z]{24,34})"),
  },
  {
    name: "stripe_standard_api",
    regex: new RegExp("(sk_live_[0-9a-zA-Z]{24,34})"),
  },
  { name: "surge_login", regex: new RegExp("surge[_-]?login(=| =|:| :)") },
  { name: "surge_token", regex: new RegExp("surge[_-]?token(=| =|:| :)") },
  { name: "svn_pass", regex: new RegExp("svn[_-]?pass(=| =|:| :)") },
  {
    name: "tesco_api_key",
    regex: new RegExp("tesco[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "test_github_token",
    regex: new RegExp("test[_-]?github[_-]?token(=| =|:| :)"),
  },
  { name: "test_test", regex: new RegExp("test[_-]?test(=| =|:| :)") },
  {
    name: "tester_keys_password",
    regex: new RegExp("tester[_-]?keys[_-]?password(=| =|:| :)"),
  },
  {
    name: "thera_oss_access_key",
    regex: new RegExp("thera[_-]?oss[_-]?access[_-]?key(=| =|:| :)"),
  },
  {
    name: "token_core_java",
    regex: new RegExp("token[_-]?core[_-]?java(=| =|:| :)"),
  },
  {
    name: "travis_access_token",
    regex: new RegExp("travis[_-]?access[_-]?token(=| =|:| :)"),
  },
  {
    name: "travis_api_token",
    regex: new RegExp("travis[_-]?api[_-]?token(=| =|:| :)"),
  },
  { name: "travis_branch", regex: new RegExp("travis[_-]?branch(=| =|:| :)") },
  {
    name: "travis_com_token",
    regex: new RegExp("travis[_-]?com[_-]?token(=| =|:| :)"),
  },
  {
    name: "travis_e2e_token",
    regex: new RegExp("travis[_-]?e2e[_-]?token(=| =|:| :)"),
  },
  {
    name: "travis_gh_token",
    regex: new RegExp("travis[_-]?gh[_-]?token(=| =|:| :)"),
  },
  {
    name: "travis_pull_request",
    regex: new RegExp("travis[_-]?pull[_-]?request(=| =|:| :)"),
  },
  {
    name: "travis_secure_env_vars",
    regex: new RegExp("travis[_-]?secure[_-]?env[_-]?vars(=| =|:| :)"),
  },
  { name: "travis_token", regex: new RegExp("travis[_-]?token(=| =|:| :)") },
  {
    name: "trex_client_token",
    regex: new RegExp("trex[_-]?client[_-]?token(=| =|:| :)"),
  },
  {
    name: "trex_okta_client_token",
    regex: new RegExp("trex[_-]?okta[_-]?client[_-]?token(=| =|:| :)"),
  },
  {
    name: "twilio_api_key",
    regex: new RegExp("twilio[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "twilio_api_secret",
    regex: new RegExp("twilio[_-]?api[_-]?secret(=| =|:| :)"),
  },
  {
    name: "twilio_chat_account_api_service",
    regex: new RegExp(
      "twilio[_-]?chat[_-]?account[_-]?api[_-]?service(=| =|:| :)"
    ),
  },
  {
    name: "twilio_configuration_sid",
    regex: new RegExp("twilio[_-]?configuration[_-]?sid(=| =|:| :)"),
  },
  { name: "twilio_sid", regex: new RegExp("twilio[_-]?sid(=| =|:| :)") },
  { name: "twilio_token", regex: new RegExp("twilio[_-]?token(=| =|:| :)") },
  {
    name: "twine_password",
    regex: new RegExp("twine[_-]?password(=| =|:| :)"),
  },
  {
    name: "twitter_consumer_key",
    regex: new RegExp("twitter[_-]?consumer[_-]?key(=| =|:| :)"),
  },
  {
    name: "twitter_consumer_secret",
    regex: new RegExp("twitter[_-]?consumer[_-]?secret(=| =|:| :)"),
  },
  {
    name: "twitteroauthaccesssecret",
    regex: new RegExp("twitteroauthaccesssecret(=| =|:| :)"),
  },
  {
    name: "twitteroauthaccesstoken",
    regex: new RegExp("twitteroauthaccesstoken(=| =|:| :)"),
  },
  {
    name: "unity_password",
    regex: new RegExp("unity[_-]?password(=| =|:| :)"),
  },
  { name: "unity_serial", regex: new RegExp("unity[_-]?serial(=| =|:| :)") },
  { name: "urban_key", regex: new RegExp("urban[_-]?key(=| =|:| :)") },
  {
    name: "urban_master_secret",
    regex: new RegExp("urban[_-]?master[_-]?secret(=| =|:| :)"),
  },
  { name: "urban_secret", regex: new RegExp("urban[_-]?secret(=| =|:| :)") },
  {
    name: "us_east_1_elb_amazonaws_com",
    regex: new RegExp(
      "us[_-]?east[_-]?1[_-]?elb[_-]?amazonaws[_-]?com(=| =|:| :)"
    ),
  },
  { name: "use_ssh", regex: new RegExp("use[_-]?ssh(=| =|:| :)") },
  {
    name: "user_assets_access_key_id",
    regex: new RegExp("user[_-]?assets[_-]?access[_-]?key[_-]?id(=| =|:| :)"),
  },
  {
    name: "user_assets_secret_access_key",
    regex: new RegExp(
      "user[_-]?assets[_-]?secret[_-]?access[_-]?key(=| =|:| :)"
    ),
  },
  { name: "usertravis", regex: new RegExp("usertravis(=| =|:| :)") },
  {
    name: "v_sfdc_client_secret",
    regex: new RegExp("v[_-]?sfdc[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "v_sfdc_password",
    regex: new RegExp("v[_-]?sfdc[_-]?password(=| =|:| :)"),
  },
  {
    name: "vip_github_build_repo_deploy_key",
    regex: new RegExp(
      "vip[_-]?github[_-]?build[_-]?repo[_-]?deploy[_-]?key(=| =|:| :)"
    ),
  },
  {
    name: "vip_github_deploy_key",
    regex: new RegExp("vip[_-]?github[_-]?deploy[_-]?key(=| =|:| :)"),
  },
  {
    name: "vip_github_deploy_key_pass",
    regex: new RegExp("vip[_-]?github[_-]?deploy[_-]?key[_-]?pass(=| =|:| :)"),
  },
  {
    name: "virustotal_apikey",
    regex: new RegExp("virustotal[_-]?apikey(=| =|:| :)"),
  },
  {
    name: "visual_recognition_api_key",
    regex: new RegExp("visual[_-]?recognition[_-]?api[_-]?key(=| =|:| :)"),
  },
  { name: "vscetoken", regex: new RegExp("vscetoken(=| =|:| :)") },
  {
    name: "wakatime_api_key",
    regex: new RegExp("wakatime[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "watson_conversation_password",
    regex: new RegExp("watson[_-]?conversation[_-]?password(=| =|:| :)"),
  },
  {
    name: "watson_device_password",
    regex: new RegExp("watson[_-]?device[_-]?password(=| =|:| :)"),
  },
  {
    name: "watson_password",
    regex: new RegExp("watson[_-]?password(=| =|:| :)"),
  },
  {
    name: "widget_basic_password",
    regex: new RegExp("widget[_-]?basic[_-]?password(=| =|:| :)"),
  },
  {
    name: "widget_basic_password_2",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?2(=| =|:| :)"),
  },
  {
    name: "widget_basic_password_3",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?3(=| =|:| :)"),
  },
  {
    name: "widget_basic_password_4",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?4(=| =|:| :)"),
  },
  {
    name: "widget_basic_password_5",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?5(=| =|:| :)"),
  },
  {
    name: "widget_fb_password",
    regex: new RegExp("widget[_-]?fb[_-]?password(=| =|:| :)"),
  },
  {
    name: "widget_fb_password_2",
    regex: new RegExp("widget[_-]?fb[_-]?password[_-]?2(=| =|:| :)"),
  },
  {
    name: "widget_fb_password_3",
    regex: new RegExp("widget[_-]?fb[_-]?password[_-]?3(=| =|:| :)"),
  },
  {
    name: "widget_test_server",
    regex: new RegExp("widget[_-]?test[_-]?server(=| =|:| :)"),
  },
  {
    name: "wincert_password",
    regex: new RegExp("wincert[_-]?password(=| =|:| :)"),
  },
  {
    name: "wordpress_db_password",
    regex: new RegExp("wordpress[_-]?db[_-]?password(=| =|:| :)"),
  },
  {
    name: "wordpress_db_user",
    regex: new RegExp("wordpress[_-]?db[_-]?user(=| =|:| :)"),
  },
  {
    name: "wpjm_phpunit_google_geocode_api_key",
    regex: new RegExp(
      "wpjm[_-]?phpunit[_-]?google[_-]?geocode[_-]?api[_-]?key(=| =|:| :)"
    ),
  },
  {
    name: "wporg_password",
    regex: new RegExp("wporg[_-]?password(=| =|:| :)"),
  },
  {
    name: "wpt_db_password",
    regex: new RegExp("wpt[_-]?db[_-]?password(=| =|:| :)"),
  },
  { name: "wpt_db_user", regex: new RegExp("wpt[_-]?db[_-]?user(=| =|:| :)") },
  {
    name: "wpt_prepare_dir",
    regex: new RegExp("wpt[_-]?prepare[_-]?dir(=| =|:| :)"),
  },
  {
    name: "wpt_report_api_key",
    regex: new RegExp("wpt[_-]?report[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "wpt_ssh_connect",
    regex: new RegExp("wpt[_-]?ssh[_-]?connect(=| =|:| :)"),
  },
  {
    name: "wpt_ssh_private_key_base64",
    regex: new RegExp("wpt[_-]?ssh[_-]?private[_-]?key[_-]?base64(=| =|:| :)"),
  },
  {
    name: "www_googleapis_com",
    regex: new RegExp("www[_-]?googleapis[_-]?com(=| =|:| :)"),
  },
  {
    name: "yangshun_gh_password",
    regex: new RegExp("yangshun[_-]?gh[_-]?password(=| =|:| :)"),
  },
  {
    name: "yangshun_gh_token",
    regex: new RegExp("yangshun[_-]?gh[_-]?token(=| =|:| :)"),
  },
  {
    name: "yt_account_client_secret",
    regex: new RegExp("yt[_-]?account[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "yt_account_refresh_token",
    regex: new RegExp("yt[_-]?account[_-]?refresh[_-]?token(=| =|:| :)"),
  },
  { name: "yt_api_key", regex: new RegExp("yt[_-]?api[_-]?key(=| =|:| :)") },
  {
    name: "yt_client_secret",
    regex: new RegExp("yt[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "yt_partner_client_secret",
    regex: new RegExp("yt[_-]?partner[_-]?client[_-]?secret(=| =|:| :)"),
  },
  {
    name: "yt_partner_refresh_token",
    regex: new RegExp("yt[_-]?partner[_-]?refresh[_-]?token(=| =|:| :)"),
  },
  {
    name: "yt_server_api_key",
    regex: new RegExp("yt[_-]?server[_-]?api[_-]?key(=| =|:| :)"),
  },
  {
    name: "zendesk_travis_github",
    regex: new RegExp("zendesk[_-]?travis[_-]?github(=| =|:| :)"),
  },
  {
    name: "zensonatypepassword",
    regex: new RegExp("zensonatypepassword(=| =|:| :)"),
  },
  {
    name: "zhuliang_gh_token",
    regex: new RegExp("zhuliang[_-]?gh[_-]?token(=| =|:| :)"),
  },
  {
    name: "zopim_account_key",
    regex: new RegExp("zopim[_-]?account[_-]?key(=| =|:| :)"),
  },
];

export const SECRETS_ANALYZER_NAME = "secrets";

const secretsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node, ancestors) {
      if (!node.loc || typeof node.value !== "string") {
        return;
      }

      for (const pattern of SECRET_PATTERNS) {
        if (pattern.regex.test(node.value)) {
          const match: AnalyzerMatch = {
            filePath: args.filePath,
            analyzerName: SECRETS_ANALYZER_NAME,
            value: node.value,
            start: node.loc.start,
            end: node.loc.end,
            tags: {
              secret: true,
              [`secret-type-${pattern.name.toLowerCase().replace(/\s+/g, "-")}`]:
                true,
            },
          };

          matchesReturn.push(match);
        }
      }
    },
  };
};

export { secretsAnalyzerBuilder };
