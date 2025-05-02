import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface UrlsTestCase {
  jsFileName: string;
  expectedUrls: AnalyzerMatch[];
}

const testCases: UrlsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedUrls: [
      {
        analyzerName: "urls",
        value: "ftp://files.example.com/download",
        start: { line: 4, column: 15 },
        end: { line: 4, column: 49 },
        tags: { ftp: true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/urls/files/1.js",
      },
      {
        analyzerName: "urls",
        value: "http://example.com",
        start: { line: 2, column: 16 },
        end: { line: 2, column: 36 },
        tags: { http: true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/urls/files/1.js",
      },
      {
        analyzerName: "urls",
        value: "https://api.example.com/v1/users",
        start: { line: 3, column: 17 },
        end: { line: 3, column: 51 },
        tags: { https: true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/urls/files/1.js",
      },
      {
        analyzerName: "urls",
        value: "https://example.com/page#section",
        start: { line: 11, column: 16 },
        end: { line: 11, column: 50 },
        tags: { https: true, fragment: true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/urls/files/1.js",
      },
      {
        analyzerName: "urls",
        value: "https://example.com/search?q=test",
        start: { line: 8, column: 18 },
        end: { line: 8, column: 53 },
        tags: { https: true, query: true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/urls/files/1.js",
      },
      {
        analyzerName: "urls",
        value: "sftp://files.example.com:22/backup",
        start: { line: 17, column: 16 },
        end: { line: 17, column: 52 },
        tags: { sftp: true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/urls/files/1.js",
      },
      {
        analyzerName: "urls",
        value: "ws://chat.example.com",
        start: { line: 5, column: 14 },
        end: { line: 5, column: 37 },
        tags: { ws: true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/urls/files/1.js",
      },
    ],
  },
];

test.each(testCases)("urls - $jsFileName", ({ jsFileName, expectedUrls }) => {
  const filePath = path.join(__dirname, "files", jsFileName);
  const results = analyzeFile(filePath, ["urls"]);

  // Sort both arrays by value to ensure consistent comparison
  const sortedUrls = results.sort((a, b) => a.value.localeCompare(b.value));
  const sortedExpected = expectedUrls.sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  expect(sortedUrls).toEqual(sortedExpected);
});
