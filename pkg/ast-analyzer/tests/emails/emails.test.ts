import path from "path";
import { expect, test } from "vitest";
import { emailsAnalyzerBuilder } from "../../emails";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";

interface EmailsTestCase {
  jsFileName: string;
  expectedEmails: AnalyzerMatch[];
}

const testCases: EmailsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedEmails: [
      {
        analyzerName: "emails",
        value: "user@example.com",
        start: {
          line: 2,
          column: 22,
        },
        end: {
          line: 2,
          column: 40,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "user@subdomain.example.com",
        start: {
          line: 3,
          column: 27,
        },
        end: {
          line: 3,
          column: 55,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "user123@example.com",
        start: {
          line: 4,
          column: 25,
        },
        end: {
          line: 4,
          column: 46,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "user.name+tag@example.com",
        start: {
          line: 5,
          column: 30,
        },
        end: {
          line: 5,
          column: 57,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "user-name@example-site.com",
        start: {
          line: 6,
          column: 24,
        },
        end: {
          line: 6,
          column: 52,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "User.Name@Example.com",
        start: {
          line: 7,
          column: 27,
        },
        end: {
          line: 7,
          column: 50,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "first.last@domain.example",
        start: {
          line: 8,
          column: 25,
        },
        end: {
          line: 8,
          column: 52,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "contact@me.io",
        start: {
          line: 9,
          column: 25,
        },
        end: {
          line: 9,
          column: 40,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "user+tag@example",
        start: {
          line: 10,
          column: 23,
        },
        end: {
          line: 10,
          column: 41,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "support@company.org",
        start: {
          line: 14,
          column: 11,
        },
        end: {
          line: 14,
          column: 32,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "sales@company.org",
        start: {
          line: 15,
          column: 9,
        },
        end: {
          line: 15,
          column: 28,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "information@company.org",
        start: {
          line: 16,
          column: 8,
        },
        end: {
          line: 16,
          column: 33,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "dev@company.com",
        start: {
          line: 20,
          column: 2,
        },
        end: {
          line: 20,
          column: 19,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "marketing@company.com",
        start: {
          line: 21,
          column: 2,
        },
        end: {
          line: 21,
          column: 25,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "hr@company.com",
        start: {
          line: 22,
          column: 2,
        },
        end: {
          line: 22,
          column: 18,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "admin@${emailWithNoTLD}",
        start: {
          line: 26,
          column: 19,
        },
        end: {
          line: 26,
          column: 44,
        },
        tags: {},
      },
      {
        analyzerName: "emails",
        value: "${department}@ourcompany.com",
        start: {
          line: 28,
          column: 9,
        },
        end: {
          line: 28,
          column: 39,
        },
        tags: {},
      },
    ],
  },
];

test.each(testCases)(
  "emails - $jsFileName",
  ({ jsFileName, expectedEmails }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const results: AnalyzerMatch[] = [];
    const emailsAnalyzer = emailsAnalyzerBuilder(args, results);

    traverse(args.ast, {
      Literal(node, state, ancestors) {
        emailsAnalyzer.Literal?.(node, state, ancestors);
      },
      TemplateLiteral(node, state, ancestors) {
        emailsAnalyzer.TemplateLiteral?.(node, state, ancestors);
      },
    });

    // Sort both arrays by value to ensure consistent comparison
    const sortedEmails = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedEmails.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedEmails).toEqual(sortedExpected);
  }
);
