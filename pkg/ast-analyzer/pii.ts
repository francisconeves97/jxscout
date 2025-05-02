import { createRegexAnalyzer } from "./regex-analyzer";

// Define the patterns for secrets detection

// All taken from https://github.com/mazen160/secrets-patterns-db - all credits to them
const PII_PATTERNS = [
  {
    name: "times",
    regex: new RegExp("\\d{1,2}:\\d{2} ?(?:[ap]\\.?m\\.?)?|\\d[ap]\\.?m\\.?"),
  },
  {
    name: "phones",
    regex: new RegExp(
      "((?:(?<![\\d-])(?:\\+?\\d{1,3}[-.\\s*]?)?(?:\\(?\\d{3}\\)?[-.\\s*]?)?\\d{3}[-.\\s*]?\\d{4}(?![\\d-]))|(?:(?<![\\d-])(?:(?:\\(\\+?\\d{2}\\))|(?:\\+?\\d{2}))\\s*\\d{2}\\s*\\d{3}\\s*\\d{4}(?![\\d-])))"
    ),
  },
  {
    name: "phones_with_exts",
    regex: new RegExp(
      "((?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*(?:[2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*\\)|(?:[2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)?(?:[2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?(?:[0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(?:\\d+)?))"
    ),
  },
  {
    name: "emails",
    regex: new RegExp(
      "([a-z0-9!#$%&'*+\\/=?^_`{|.}~-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)"
    ),
  },
  {
    name: "street_addresses",
    regex: new RegExp(
      "\\d{1,4} [\\w\\s]{1,20}(?:street|st|avenue|ave|road|rd|highway|hwy|square|sq|trail|trl|drive|dr|court|ct|park|parkway|pkwy|circle|cir|boulevard|blvd)\\W?(?=\\s|$)"
    ),
  },
  { name: "po_boxes", regex: new RegExp("P\\.? ?O\\.? Box \\d+") },
  {
    name: "ukphones",
    regex: new RegExp(
      "^\\s*\\(?(020[7,8]{1}\\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\\)?[]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\\s*$"
    ),
  },
  { name: "email - 3", regex: new RegExp("\\b[\\w\\-+.]+@+\\w+.+[A-z]{3}") },
  {
    name: "ssn - 3",
    regex: new RegExp(
      "(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}"
    ),
  },
  {
    name: "ssn_number",
    regex: new RegExp(
      "(?!000|666|333)0*(?:[0-6][0-9][0-9]|[0-7][0-6][0-9]|[0-7][0-7][0-2])[-](?!00)[0-9]{2}[- ](?!0000)[0-9]{4}"
    ),
  },
  { name: "visa_credit_card", regex: new RegExp("4[0-9]{15}") },
  { name: "american_express_credit-card", regex: new RegExp("3[47][0-9]{13}") },
  { name: "otp", regex: new RegExp("^[0-9]{6}$") },
  {
    name: "credit card - 2",
    regex: new RegExp(
      "4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12} |3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\\d{3})\\d{11}"
    ),
  },
  {
    name: "UK Phone Numbers",
    regex: new RegExp("\\b([0O]?[1lI][1lI])?[4A][4A][\\dOIlZEASB]{10,11}\\b"),
  },
  {
    name: "US Phone Numbers",
    regex: new RegExp(
      "\\b((\\+|\\b)[1l][\\-\\. ])?\\(?\\b[\\dOlZSB]{3,5}([\\-\\. ]|\\) ?)[\\dOlZSB]{3}[\\-\\. ][\\dOlZSB]{4}\\b"
    ),
  },
  {
    name: "Email Addresses",
    regex: new RegExp(
      "\\b[a-z0-9._%\\+\\-—|]+@[a-z0-9.\\-—|]+\\.[a-z|]{2,6}\\b"
    ),
  },
  {
    name: "Credit card - 3",
    regex: new RegExp(
      "\\b((4\\d{3}|5[1-5]\\d{2}|2\\d{3}|3[47]\\d{1,2})[\\s\\-]?\\d{4,6}[\\s\\-]?\\d{4,6}?([\\s\\-]\\d{3,4})?(\\d{3})?)\\b"
    ),
  },
  { name: "Amex Card", regex: new RegExp("\\b3[47][0-9]{13}\\b") },
  { name: "BCGlobal", regex: new RegExp("\\b(6541|6556)[0-9]{12}\\b") },
  { name: "Carte Blanche Card", regex: new RegExp("\\b389[0-9]{11}\\b") },
  {
    name: "Diners Club Card",
    regex: new RegExp("\\b3(?:0[0-5]|[68][0-9])[0-9]{11}\\b"),
  },
  {
    name: "Discover Card",
    regex: new RegExp(
      "\\b65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})\\b"
    ),
  },
  { name: "Insta Payment Card", regex: new RegExp("\\b63[7-9][0-9]{13}\\b") },
  {
    name: "JCB Card",
    regex: new RegExp("\\b(?:2131|1800|35\\d{3})\\d{11}\\b"),
  },
  { name: "Korean Local Card", regex: new RegExp("\\b9[0-9]{15}\\b") },
  {
    name: "Laser Card",
    regex: new RegExp("\\b(6304|6706|6709|6771)[0-9]{12,15}\\b"),
  },
  {
    name: "Maestro Card",
    regex: new RegExp("\\b(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}\\b"),
  },
  {
    name: "MasterCard",
    regex: new RegExp(
      "\\b(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})\\b"
    ),
  },
  {
    name: "Solo Card",
    regex: new RegExp(
      "\\b(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}\\b"
    ),
  },
  {
    name: "Switch Card",
    regex: new RegExp(
      "\\b(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]"
    ),
  },
  {
    name: "Argentina National Identity (DNI) Number",
    regex: new RegExp("\\d{2}\\.\\d{3}\\.\\d{3}"),
  },
  { name: "Canada Passport ID", regex: new RegExp("\\b[\\w]{2}[\\d]{6}\\b") },
  { name: "Croatia Vat ID card number", regex: new RegExp("\\bHR\\d{11}\\b") },
  {
    name: "Czech Republic Vat ID card number",
    regex: new RegExp("\\bCZ\\d{8,10}\\b"),
  },
  {
    name: "Denmark Personal ID number",
    regex: new RegExp("\\b\\d{10}|\\d{6}[-\\s]\\d{4}\\b"),
  },
  { name: "France National ID card (CNI)", regex: new RegExp("\\b\\d{12}\\b") },
  {
    name: "France Social Security Number (INSEE)",
    regex: new RegExp("\\b\\d{13}|\\d{13}\\s\\d{2}\\b"),
  },
  { name: "France Passport ID", regex: new RegExp("\\b\\d{2}11\\d{5}\\b") },
  { name: "Germany ID card number", regex: new RegExp("\\bl\\d{8}\\b") },
  {
    name: "Germany Passport ID",
    regex: new RegExp("\\b[cfghjk]\\d{3}\\w{5}\\d\\b"),
  },
  {
    name: "Germany Driver's License ID",
    regex: new RegExp("\\b[\\d\\w]\\d{2}[\\d\\w]{6}\\d[\\d\\w]\\b"),
  },
  {
    name: "Ireland Personal Public Service (PPS) Number",
    regex: new RegExp("\\b\\d{7}\\w{1,2}\\b"),
  },
  {
    name: "Netherlands Citizen's Service (BSN) number",
    regex: new RegExp("\\b\\d{8}|\\d{3}[-\\.\\s]\\d{3}[-\\.\\s]\\d{3}\\b"),
  },
  { name: "Poland National ID (PESEL)", regex: new RegExp("\\b\\d{11}\\b") },
  {
    name: "Portugal Citizen Card Number",
    regex: new RegExp("\\d{9}[\\w\\d]{2}|\\d{8}-\\d[\\d\\w]{2}\\d"),
  },
  {
    name: "Spain Social Security Number (SSN)",
    regex: new RegExp("\\b\\d{2}\\/?\\d{8}\\/?\\d{2}\\b"),
  },
  {
    name: "Spain Social Security Number (SSN) - 2",
    regex: new RegExp("\\b\\d{3}[ -.]\\d{2}[ -.]\\d{4}\\b`"),
  },
  { name: "Sweden Passport ID", regex: new RegExp("\\b\\d{8}\\b") },
  { name: "United Kingdom Passport ID", regex: new RegExp("\\b\\d{9}\\b") },
  {
    name: "United Kingdom Driver's license ID",
    regex: new RegExp("\\b[\\w9]{5}\\d{6}[\\w9]{2}\\d{5}\\b"),
  },
  {
    name: "United Kingdom National Health Service (NHS) number",
    regex: new RegExp("\\b\\d{3}\\s\\d{3}\\s\\d{4}\\b"),
  },
  {
    name: "ipv4",
    regex: new RegExp(
      "(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"
    ),
  },
  {
    name: "prices",
    regex: new RegExp(
      "[$]\\s?[+-]?[0-9]{1,3}(?:(?:,?[0-9]{3}))*(?:\\.[0-9]{1,2})?"
    ),
  },
  {
    name: "hex_colors",
    regex: new RegExp("(#(?:[0-9a-fA-F]{8})|#(?:[0-9a-fA-F]{3}){1,2})\\b"),
  },
  {
    name: "credit_cards",
    regex: new RegExp("((?:(?:\\d{4}[- ]?){3}\\d{4}|\\d{15,16}))(?![\\d])"),
  },
  {
    name: "visa_cards",
    regex: new RegExp("4\\d{3}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}"),
  },
  {
    name: "master_cards",
    regex: new RegExp("5[1-5]\\d{2}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}"),
  },
  {
    name: "btc_addresses",
    regex: new RegExp(
      "(?<![a-km-zA-HJ-NP-Z0-9])[13][a-km-zA-HJ-NP-Z0-9]{26,33}(?![a-km-zA-HJ-NP-Z0-9])"
    ),
  },
  { name: "ssn_number - 3", regex: new RegExp("(?:\\d{3}-\\d{2}-\\d{4})") },
  { name: "md5_hashes", regex: new RegExp("[0-9a-fA-F]{32}") },
  { name: "sha1_hashes", regex: new RegExp("[0-9a-fA-F]{40}") },
  { name: "sha256_hashes", regex: new RegExp("[0-9a-fA-F]{64}") },
  { name: "isbn13", regex: new RegExp("(?:[\\d]-?){12}[\\dxX]") },
  { name: "isbn10", regex: new RegExp("(?:[\\d]-?){9}[\\dxX]") },
  {
    name: "mac_addresses",
    regex: new RegExp("(([0-9a-fA-F]{2}[:-]){5}([0-9a-fA-F]{2}))"),
  },
  {
    name: "iban_numbers",
    regex: new RegExp("[A-Z]{2}\\d{2}[A-Z0-9]{4}\\d{7}([A-Z\\d]?){0,16}"),
  },
  {
    name: "git_repos",
    regex: new RegExp(
      "((git|ssh|http(s)?)|(git@[\\w\\.]+))(:(\\/\\/)?)([\\w\\.@\\:/\\-~]+)(\\.git)(\\/)?"
    ),
  },
  {
    name: "Driver's License Number (simplified)",
    regex: new RegExp("^[A-Z]{2}-\\d{6}$"),
  },
  {
    name: "Passport Number (simplified) - 3",
    regex: new RegExp("^[A-Z]\\d{7}$"),
  },
  {
    name: "Social Security Number (SSN) - 3",
    regex: new RegExp("^\\d{3}-\\d{2}-\\d{4}$"),
  },
  {
    name: "Social Security Number (SSN) - 4",
    regex: new RegExp("(?:\\\\b\\\\d{3}-?\\\\d{2}-?(\\\\d{4})\\\\b)"),
  },
  {
    name: "Date of Birth",
    regex: new RegExp("^\\d{2}/\\d{2}/\\d{4}$|^\\d{4}-\\d{2}-\\d{2}$"),
  },
  {
    name: "Arista network configuration",
    regex: new RegExp(
      "via\\ \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3},\\ \\d{2}:\\d{2}:\\d{2}"
    ),
  },
  {
    name: "BBVA Compass Routing Number - California",
    regex: new RegExp("^321170538$"),
  },
  {
    name: "Bank of America Routing Numbers - California",
    regex: new RegExp("^(?:121|026)00(?:0|9)(?:358|593)$"),
  },
  { name: "Box Links", regex: new RegExp("https://app.box.com/[s|l]/\\S+") },
  { name: "CVE Number", regex: new RegExp("CVE-\\d{4}-\\d{4,7}") },
  { name: "California Drivers License", regex: new RegExp("^[A-Z]{1}\\d{7}$") },
  {
    name: "Chase Routing Numbers - California",
    regex: new RegExp("^322271627$"),
  },
  {
    name: "Cisco Router Config",
    regex: new RegExp(
      "service\\ timestamps\\ [a-z]{3,5}\\ datetime\\ msec|boot-[a-z]{3,5}-marker|interface\\ [A-Za-z0-9]{0,10}[E,e]thernet"
    ),
  },
  {
    name: "Citibank Routing Numbers - California",
    regex: new RegExp("^32(?:11|22)71(?:18|72)4$"),
  },
  {
    name: "DSA Private Key",
    regex: new RegExp(
      "-----BEGIN DSA PRIVATE KEY-----(?:[a-zA-Z0-9\\+\\=\\/\"']|\\s)+?-----END DSA PRIVATE KEY-----"
    ),
  },
  {
    name: "Dropbox Links",
    regex: new RegExp("https://www.dropbox.com/(?:s|l)/\\S+"),
  },
  {
    name: "EC Private Key",
    regex: new RegExp(
      "-----BEGIN (?:EC|ECDSA) PRIVATE KEY-----(?:[a-zA-Z0-9\\+\\=\\/\"']|\\s)+?-----END (?:EC|ECDSA) PRIVATE KEY-----"
    ),
  },
  {
    name: "Encrypted DSA Private Key",
    regex: new RegExp(
      "-----BEGIN DSA PRIVATE KEY-----\\s.*,ENCRYPTED(?:.|\\s)+?-----END DSA PRIVATE KEY-----"
    ),
  },
  {
    name: "Encrypted EC Private Key",
    regex: new RegExp(
      "-----BEGIN (?:EC|ECDSA) PRIVATE KEY-----\\s.*,ENCRYPTED(?:.|\\s)+?-----END (?:EC|ECDSA) PRIVATE KEY-----"
    ),
  },
  {
    name: "Encrypted Private Key",
    regex: new RegExp(
      "-----BEGIN ENCRYPTED PRIVATE KEY-----(?:.|\\s)+?-----END ENCRYPTED PRIVATE KEY-----"
    ),
  },
  {
    name: "Encrypted PuTTY SSH DSA Key",
    regex: new RegExp(
      "PuTTY-User-Key-File-2: ssh-dss\\s*Encryption: aes(?:.|\\s?)*?Private-MAC:"
    ),
  },
  {
    name: "Encrypted RSA Private Key",
    regex: new RegExp(
      "-----BEGIN RSA PRIVATE KEY-----\\s.*,ENCRYPTED(?:.|\\s)+?-----END RSA PRIVATE KEY-----"
    ),
  },
  {
    name: "Google Application Identifier",
    regex: new RegExp("[0-9]+-\\w+.apps.googleusercontent.com"),
  },
  {
    name: "HIPAA PHI National Drug Code",
    regex: new RegExp("^\\d{4,5}-\\d{3,4}-\\d{1,2}$"),
  },
  {
    name: "Huawei config file",
    regex: new RegExp(
      "sysname\\ HUAWEI|set\\ authentication\\ password\\ simple\\ huawei"
    ),
  },
  {
    name: "Individual Taxpayer Identification Numbers (ITIN)",
    regex: new RegExp("^9\\d{2}(?:[ \\-]?)[7,8]\\d(?:[ \\-]?)\\d{4}$"),
  },
  {
    name: "John the Ripper",
    regex: new RegExp(
      "[J,j]ohn\\ [T,t]he\\ [R,r]ipper|john-[1-9].[1-9].[1-9]|Many\\ salts:|Only\\ one\\ salt:|openwall.com/john/|List.External:[0-9a-zA-Z]*|Loaded\\ [0-9]*\\ password hash|guesses:\\ \\d*\\ \\ time:\\ \\d*:\\d{2}:\\d{2}:\\d{2}|john\\.pot"
    ),
  },
  {
    name: "KeePass 1.x CSV Passwords",
    regex: new RegExp(
      '"Account","Login Name","Password","Web Site","Comments"'
    ),
  },
  {
    name: "KeePass 1.x XML Passwords",
    regex: new RegExp(
      "<pwlist>\\s*?<pwentry>[\\S\\s]*?<password>[\\S\\s]*?<\\/pwentry>\\s*?<\\/pwlist>"
    ),
  },
  {
    name: "Large number of US Phone Numbers",
    regex: new RegExp("\\d{3}-\\d{3}-\\d{4}|\\(\\d{3}\\)\\ ?\\d{3}-?\\d{4}"),
  },
  {
    name: "Large number of US Zip Codes",
    regex: new RegExp("^(\\d{5}-\\d{4}|\\d{5})$"),
  },
  {
    name: "Lightweight Directory Access Protocol",
    regex: new RegExp("(?:dn|cn|dc|sn):\\s*[a-zA-Z0-9=, ]*"),
  },
  {
    name: "Metasploit Module",
    regex: new RegExp(
      "require\\ 'msf/core'|class\\ Metasploit|include\\ Msf::Exploit::\\w+::\\w+"
    ),
  },
  {
    name: "MySQL database dump",
    regex: new RegExp(
      "DROP DATABASE IF EXISTS(?:.|\\n){5,300}CREATE DATABASE(?:.|\\n){5,300}DROP TABLE IF EXISTS(?:.|\\n){5,300}CREATE TABLE"
    ),
  },
  {
    name: "MySQLite database dump",
    regex: new RegExp(
      "DROP\\ TABLE\\ IF\\ EXISTS\\ \\[[a-zA-Z]*\\];|CREATE\\ TABLE\\ \\[[a-zA-Z]*\\];"
    ),
  },
  {
    name: "Network Proxy Auto-Config",
    regex: new RegExp(
      "proxy\\.pac|function\\ FindProxyForURL\\(\\w+,\\ \\w+\\)"
    ),
  },
  {
    name: "Nmap Scan Report",
    regex: new RegExp("Nmap\\ scan\\ report\\ for\\ [a-zA-Z0-9.]+"),
  },
  {
    name: "PGP Header",
    regex: new RegExp("-{5}(?:BEGIN|END)\\ PGP\\ MESSAGE-{5}"),
  },
  {
    name: "PGP Private Key Block",
    regex: new RegExp(
      "-----BEGIN PGP PRIVATE KEY BLOCK-----(?:.|\\s)+?-----END PGP PRIVATE KEY BLOCK-----"
    ),
  },
  {
    name: "PKCS7 Encrypted Data",
    regex: new RegExp(
      "(?:Signer|Recipient)Info(?:s)?\\ ::=\\ \\w+|[D|d]igest(?:Encryption)?Algorithm|EncryptedKey\\ ::= \\w+"
    ),
  },
  {
    name: "Password etc passwd",
    regex: new RegExp(
      '[a-zA-Z0-9\\-]+:[x|\\*]:\\d+:\\d+:[a-zA-Z0-9/\\- "]*:/[a-zA-Z0-9/\\-]*:/[a-zA-Z0-9/\\-]+'
    ),
  },
  {
    name: "Password etc shadow",
    regex: new RegExp(
      "[a-zA-Z0-9\\-]+:(?:(?:!!?)|(?:\\*LOCK\\*?)|\\*|(?:\\*LCK\\*?)|(?:\\$.*\\$.*\\$.*?)?):\\d*:\\d*:\\d*:\\d*:\\d*:\\d*:"
    ),
  },
  {
    name: "PlainText Private Key",
    regex: new RegExp(
      "-----BEGIN PRIVATE KEY-----(?:.|\\s)+?-----END PRIVATE KEY-----"
    ),
  },
  {
    name: "PuTTY SSH DSA Key",
    regex: new RegExp(
      "PuTTY-User-Key-File-2: ssh-dss\\s*Encryption: none(?:.|\\s?)*?Private-MAC:"
    ),
  },
  {
    name: "PuTTY SSH RSA Key",
    regex: new RegExp(
      "PuTTY-User-Key-File-2: ssh-rsa\\s*Encryption: none(?:.|\\s?)*?Private-MAC:"
    ),
  },
  {
    name: "Public Key Cryptography System (PKCS)",
    regex: new RegExp('protocol="application/x-pkcs[0-9]{0,2}-signature"'),
  },
  {
    name: "Public encrypted key",
    regex: new RegExp(
      "-----BEGIN PUBLIC KEY-----(?:.|\\s)+?-----END PUBLIC KEY-----"
    ),
  },
  {
    name: "RSA Private Key",
    regex: new RegExp(
      "-----BEGIN RSA PRIVATE KEY-----(?:[a-zA-Z0-9\\+\\=\\/\"']|\\s)+?-----END RSA PRIVATE KEY-----"
    ),
  },
  {
    name: "SSL Certificate",
    regex: new RegExp(
      "-----BEGIN CERTIFICATE-----(?:.|\\n)+?\\s-----END CERTIFICATE-----"
    ),
  },
  {
    name: "SWIFT Codes",
    regex: new RegExp("[A-Za-z]{4}(?:GB|US|DE|RU|CA|JP|CN)[0-9a-zA-Z]{2,5}$"),
  },
  {
    name: "Samba Password config file",
    regex: new RegExp("[a-z]*:\\d{3}:[0-9a-zA-Z]*:[0-9a-zA-Z]*:\\[U\\ \\]:.*"),
  },
  {
    name: "Slack 2FA Backup Codes",
    regex: new RegExp(
      "Two-Factor\\s*\\S*Authentication\\s*\\S*Backup\\s*\\S*Codes(?:.|\\n)*[Ss]lack(?:.|\\n)*\\d{9}"
    ),
  },
  {
    name: "UK Drivers License Numbers",
    regex: new RegExp("[A-Z]{5}\\d{6}[A-Z]{2}\\d{1}[A-Z]{2}"),
  },
  {
    name: "UK Passport Number",
    regex: new RegExp("\\d{10}GB[RP]\\d{7}[UMF]{1}\\d{9}"),
  },
  {
    name: "USBank Routing Numbers - California",
    regex: new RegExp("^12(?:1122676|2235821)$"),
  },
  {
    name: "United Bank Routing Number - California",
    regex: new RegExp("^122243350$"),
  },
  {
    name: "Wells Fargo Routing Numbers - California",
    regex: new RegExp("^121042882$"),
  },
  {
    name: "aws_access_key",
    regex: new RegExp(
      "((access[-_]?key[-_]?id)|(ACCESS[-_]?KEY[-_]?ID)|([Aa]ccessKeyId)|(access[_-]?id)).{0,20}AKIA[a-zA-Z0-9+/]{16}[^a-zA-Z0-9+/]"
    ),
  },
  {
    name: "aws_credentials_context",
    regex: new RegExp("access_key_id|secret_access_key|AssetSync.configure"),
  },
  {
    name: "aws_secret_key",
    regex: new RegExp(
      "((secret[-_]?access[-_]?key)|(SECRET[-_]?ACCESS[-_]?KEY|(private[-_]?key))|([Ss]ecretAccessKey)).{0,20}[^a-zA-Z0-9+/][a-zA-Z0-9+/]{40}\\b"
    ),
  },
  {
    name: "facebook_secret",
    regex: new RegExp(
      "(facebook_secret|FACEBOOK_SECRET|facebook_app_secret|FACEBOOK_APP_SECRET)[a-z_ =\\s\"'\\:]{0,5}[^a-zA-Z0-9][a-f0-9]{32}[^a-zA-Z0-9]"
    ),
  },
  {
    name: "github_key",
    regex: new RegExp(
      "(GITHUB_SECRET|GITHUB_KEY|github_secret|github_key|github_token|GITHUB_TOKEN|github_api_key|GITHUB_API_KEY)[a-z_ =\\s\"'\\:]{0,10}[^a-zA-Z0-9][a-zA-Z0-9]{40}[^a-zA-Z0-9]"
    ),
  },
  {
    name: "google_two_factor_backup",
    regex: new RegExp(
      "(?:BACKUP VERIFICATION CODES|SAVE YOUR BACKUP CODES)[\\s\\S]{0,300}@"
    ),
  },
  {
    name: "heroku_key",
    regex: new RegExp(
      "(heroku_api_key|HEROKU_API_KEY|heroku_secret|HEROKU_SECRET)[a-z_ =\\s\"'\\:]{0,10}[^a-zA-Z0-9-]\\w{8}(?:-\\w{4}){3}-\\w{12}[^a-zA-Z0-9\\-]"
    ),
  },
  {
    name: "microsoft_office_365_oauth_context",
    regex: new RegExp(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token|https://login.windows.net/common/oauth2/token"
    ),
  },
  {
    name: "pgSQL Connection Information",
    regex: new RegExp("(?:postgres|pgsql)\\:\\/\\/"),
  },
  {
    name: "slack_api_key",
    regex: new RegExp(
      "(slack_api_key|SLACK_API_KEY|slack_key|SLACK_KEY)[a-z_ =\\s\"'\\:]{0,10}[^a-f0-9][a-f0-9]{32}[^a-f0-9]"
    ),
  },
  {
    name: "slack_api_token",
    regex: new RegExp("(xox[pb](?:-[a-zA-Z0-9]+){4,})"),
  },
  { name: "ssh_dss_public", regex: new RegExp("ssh-dss [0-9A-Za-z+/]+[=]{2}") },
  {
    name: "ssh_rsa_public",
    regex: new RegExp("ssh-rsa AAAA[0-9A-Za-z+/]+[=]{0,3} [^@]+@[^@]+"),
  },
  {
    name: "IBAN",
    regex: new RegExp(
      "[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}"
    ),
  },
  {
    name: "GPS Data",
    regex: new RegExp(
      "^([-+]?)([\\d]{1,2})(((\\.)(\\d+)(,)))(\\s*)(([-+]?)([\\d]{1,3})((\\.)(\\d+))?)"
    ),
  },
  { name: "Blood Type", regex: new RegExp("^(A|B|AB|O)[-+]$") },
  {
    name: "Date of Birth  - 2",
    regex: new RegExp(
      "^([1-9]|[12][0-9]|3[01])(\\/?\\.\\-?\\-?\\s?)(0[1-9]|1[12])(\\/?\\.?\\-?\\s?)(19[0-9][0-9]|20[0][0-9]|20[1][0-8])$"
    ),
  },
  { name: "Tax Number", regex: new RegExp("^[0-9]{10}$") },
  {
    name: "Bitcoin Address",
    regex: new RegExp("^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$"),
  },
];

export const PII_ANALYZER_NAME = "pii";

const piiAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: PII_ANALYZER_NAME,
  regex: /./,
  filter: (match) => {
    // Test each pattern individually
    for (const pattern of PII_PATTERNS) {
      if (pattern.regex.test(match.value)) {
        match.tags["pii"] = true;
        match.tags[pattern.name.toLowerCase().replace(/\s+/g, "-")] = true;
        return true;
      }
    }

    return false;
  },
});

export { piiAnalyzerBuilder };
