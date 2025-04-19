// ===== VALID EMAIL FORMATS =====
const standardEmail = "user@example.com";
const emailWithSubdomain = "user@subdomain.example.com";
const emailWithNumbers = "user123@example.com";
const emailWithSpecialChars = "user.name+tag@example.com";
const emailWithHyphen = "user-name@example-site.com";
const emailWithUppercase = "User.Name@Example.com";
const emailWithPeriods = "first.last@domain.example";
const shortDomainEmail = "contact@me.io";
const emailWithNoTLD = "user+tag@example";

// ===== EMAIL OBJECTS AND ARRAYS =====
const contactEmails = {
  support: "support@company.org",
  sales: "sales@company.org",
  info: "information@company.org",
};

const teamEmails = [
  "dev@company.com",
  "marketing@company.com",
  "hr@company.com",
];

// ===== EMAIL IN TEMPLATE STRINGS =====
const adminEmail = `admin@${emailWithNoTLD}`;
function getContactEmail(department) {
  return `${department}@ourcompany.com`;
}

// ===== INVALID EMAILS (SHOULD NOT DETECT) =====
const missingAtSymbol = "userexample.com";
const missingDomain = "user@";
const missingUsername = "@example.com";
const invalidCharacters = "user!@example.com";
const spacesInEmail = "user name@example.com";

// ===== NON-EMAIL TEXT THAT MIGHT CONFUSE DETECTORS =====
const urlWithAt = "https://example.com/user@page";
const textWithAt = "Look @username for more info";
const filePathWithAt = "/users/@admin/profile";
const atSignInText = "Please contact us @ our office";
const codeWithAt = "const atSign = '@';";

// ===== OTHER TEXT =====
const normalText = "This is just normal text with no emails.";
const apiEndpoint = "/api/v1/users/123";
const phoneNumber = "+1 (555) 123-4567";
const ipAddress = "192.168.1.1";
const lib = "@mylib/asd";
