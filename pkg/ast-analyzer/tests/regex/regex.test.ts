import path from "path";
import { expect, test } from "vitest";
import { regexAnalyzerBuilder, REGEX_ANALYZER_NAME } from "../../regex";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";

interface RegexTestCase {
  jsFileName: string;
  expectedMatches: AnalyzerMatch[];
}

const testCases: RegexTestCase[] = [
  {
    jsFileName: "1.js",
    expectedMatches: [
      {
        analyzerName: "regex",
        value:
          '"^(https?://)?([\\\\da-z.-]+)\\\\.([a-z.]{2,6})([/\\\\w .-]*)*/?$"',
        start: { line: 13, column: 12 },
        end: { line: 13, column: 72 },
        tags: { regex: true, "regex-like-string": true },
      },
      {
        analyzerName: "regex",
        value:
          '"^(https?://)?([\\\\da-z.-]+)\\\\.([a-z.]{2,6})([/\\\\w .-]*)*/?$"',
        start: { line: 18, column: 2 },
        end: { line: 18, column: 62 },
        tags: { regex: true, "regex-like-string": true },
      },
      {
        analyzerName: "regex",
        value: "/[0-9]+/i",
        start: { line: 4, column: 15 },
        end: { line: 4, column: 24 },
        tags: { regex: true, "regex-literal": true },
      },
      {
        analyzerName: "regex",
        value: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/",
        start: { line: 16, column: 19 },
        end: { line: 16, column: 69 },
        tags: { regex: true, "regex-literal": true },
      },
      {
        analyzerName: "regex",
        value: "/^start.*end$/m",
        start: { line: 5, column: 15 },
        end: { line: 5, column: 30 },
        tags: { regex: true, "regex-literal": true },
      },
      {
        analyzerName: "regex",
        value: "/hello/",
        start: { line: 2, column: 15 },
        end: { line: 2, column: 22 },
        tags: { regex: true, "regex-literal": true },
      },
      {
        analyzerName: "regex",
        value: "/world/g",
        start: { line: 3, column: 15 },
        end: { line: 3, column: 23 },
        tags: { regex: true, "regex-literal": true },
      },
      {
        analyzerName: "regex",
        value:
          'new RegExp(\n  "^(https?://)?([\\\\da-z.-]+)\\\\.([a-z.]{2,6})([/\\\\w .-]*)*/?$",\n  "i"\n)',
        start: { line: 17, column: 17 },
        end: { line: 20, column: 1 },
        tags: { regex: true, "regex-constructor": true },
      },
      {
        analyzerName: "regex",
        value: 'new RegExp("case-insensitive", "i")',
        start: { line: 9, column: 15 },
        end: { line: 9, column: 50 },
        tags: { regex: true, "regex-constructor": true },
      },
      {
        analyzerName: "regex",
        value: 'new RegExp("global", "g")',
        start: { line: 10, column: 15 },
        end: { line: 10, column: 40 },
        tags: { regex: true, "regex-constructor": true },
      },
      {
        analyzerName: "regex",
        value: 'new RegExp("multiline", "m")',
        start: { line: 11, column: 15 },
        end: { line: 11, column: 43 },
        tags: { regex: true, "regex-constructor": true },
      },
      {
        analyzerName: "regex",
        value: 'new RegExp("pattern")',
        start: { line: 8, column: 15 },
        end: { line: 8, column: 36 },
        tags: { regex: true, "regex-constructor": true },
      },
    ],
  },
];

test.each(testCases)(
  "regex - $jsFileName",
  ({ jsFileName, expectedMatches }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const results: AnalyzerMatch[] = [];
    const regexAnalyzer = regexAnalyzerBuilder(args, results);

    traverse(args.ast, {
      Literal(node, state, ancestors) {
        regexAnalyzer.Literal?.(node, state, ancestors);
      },
      NewExpression(node, state, ancestors) {
        regexAnalyzer.NewExpression?.(node, state, ancestors);
      },
    });

    // Sort both arrays by value to ensure consistent comparison
    const sortedResults = results.sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    const sortedExpected = expectedMatches.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedResults).toEqual(sortedExpected);
  }
);
