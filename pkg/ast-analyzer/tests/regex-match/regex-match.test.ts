import path from "path";
import { expect, test } from "vitest";
import {
  regexMatchAnalyzerBuilder,
  REGEX_MATCH_ANALYZER_NAME,
} from "../../regex-match";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";

interface RegexMatchTestCase {
  jsFileName: string;
  expectedMatches: AnalyzerMatch[];
}

const testCases: RegexMatchTestCase[] = [
  {
    jsFileName: "1.js",
    expectedMatches: [
      {
        analyzerName: "regex-match",
        value: '"asd".match(/world/)',
        start: { line: 5, column: 0 },
        end: { line: 5, column: 20 },
        tags: { "regex-match": true, "string-match": true },
      },
      {
        analyzerName: "regex-match",
        value: 'regex.exec("hello world")',
        start: { line: 10, column: 16 },
        end: { line: 10, column: 41 },
        tags: { "regex-match": true, "regex-exec": true },
      },
      {
        analyzerName: "regex-match",
        value: 'regex.test("hello world")',
        start: { line: 9, column: 16 },
        end: { line: 9, column: 41 },
        tags: { "regex-match": true, "regex-test": true },
      },
      {
        analyzerName: "regex-match",
        value: 'RegExp.test("hello world")',
        start: { line: 13, column: 16 },
        end: { line: 13, column: 42 },
        tags: { "regex-match": true, "regex-test": true },
      },
      {
        analyzerName: "regex-match",
        value: "str.match(/world/)",
        start: { line: 3, column: 16 },
        end: { line: 3, column: 34 },
        tags: { "regex-match": true, "string-match": true },
      },
    ],
  },
];

test.each(testCases)(
  "regex-match - $jsFileName",
  ({ jsFileName, expectedMatches }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const results: AnalyzerMatch[] = [];
    const regexMatchAnalyzer = regexMatchAnalyzerBuilder(args, results);

    traverse(args.ast, {
      CallExpression(node, state, ancestors) {
        regexMatchAnalyzer.CallExpression?.(node, state, ancestors);
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
