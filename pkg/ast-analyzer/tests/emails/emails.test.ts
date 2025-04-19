import path from "path";
import { expect, test } from "vitest";
import { emailsAnalyzer } from "../../emails";
import { parseFile } from "../../index";

interface EmailsTestCase {
  jsFileName: string;
  expectedEmails: Array<{
    value: string;
    start: { line: number; column: number };
    end: { line: number; column: number };
  }>;
}

const testCases: EmailsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedEmails: [
      {
        value: "user@example.com",
        start: {
          line: 2,
          column: 22,
        },
        end: {
          line: 2,
          column: 40,
        },
      },
      {
        value: "user@subdomain.example.com",
        start: {
          line: 3,
          column: 27,
        },
        end: {
          line: 3,
          column: 55,
        },
      },
      {
        value: "user123@example.com",
        start: {
          line: 4,
          column: 25,
        },
        end: {
          line: 4,
          column: 46,
        },
      },
      {
        value: "user.name+tag@example.com",
        start: {
          line: 5,
          column: 30,
        },
        end: {
          line: 5,
          column: 57,
        },
      },
      {
        value: "user-name@example-site.com",
        start: {
          line: 6,
          column: 24,
        },
        end: {
          line: 6,
          column: 52,
        },
      },
      {
        value: "User.Name@Example.com",
        start: {
          line: 7,
          column: 27,
        },
        end: {
          line: 7,
          column: 50,
        },
      },
      {
        value: "first.last@domain.example",
        start: {
          line: 8,
          column: 25,
        },
        end: {
          line: 8,
          column: 52,
        },
      },
      {
        value: "contact@me.io",
        start: {
          line: 9,
          column: 25,
        },
        end: {
          line: 9,
          column: 40,
        },
      },
      {
        value: "user+tag@example",
        start: {
          line: 10,
          column: 23,
        },
        end: {
          line: 10,
          column: 41,
        },
      },
      {
        value: "support@company.org",
        start: {
          line: 14,
          column: 11,
        },
        end: {
          line: 14,
          column: 32,
        },
      },
      {
        value: "sales@company.org",
        start: {
          line: 15,
          column: 9,
        },
        end: {
          line: 15,
          column: 28,
        },
      },
      {
        value: "information@company.org",
        start: {
          line: 16,
          column: 8,
        },
        end: {
          line: 16,
          column: 33,
        },
      },
      {
        value: "dev@company.com",
        start: {
          line: 20,
          column: 2,
        },
        end: {
          line: 20,
          column: 19,
        },
      },
      {
        value: "marketing@company.com",
        start: {
          line: 21,
          column: 2,
        },
        end: {
          line: 21,
          column: 25,
        },
      },
      {
        value: "hr@company.com",
        start: {
          line: 22,
          column: 2,
        },
        end: {
          line: 22,
          column: 18,
        },
      },
      {
        value: "admin@${emailWithNoTLD}",
        start: {
          line: 26,
          column: 19,
        },
        end: {
          line: 26,
          column: 44,
        },
      },
      {
        value: "${department}@ourcompany.com",
        start: {
          line: 28,
          column: 9,
        },
        end: {
          line: 28,
          column: 39,
        },
      },
    ],
  },
];

test.each(testCases)(
  "emails - $jsFileName",
  ({ jsFileName, expectedEmails }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const emails = emailsAnalyzer(args);

    // Sort both arrays by value to ensure consistent comparison
    const sortedEmails = emails.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedEmails.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedEmails).toEqual(sortedExpected);
  }
);
