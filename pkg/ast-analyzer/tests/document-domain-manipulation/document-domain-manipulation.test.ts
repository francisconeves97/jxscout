import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface DocumentDomainManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: DocumentDomainManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "document-domain-manipulation",
        value: "document.domain",
        start: { line: 1, column: 0 },
        end: { line: 1, column: 15 },
        tags: { "document-domain-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/document-domain-manipulation/files/1.js",
      },
      {
        analyzerName: "document-domain-manipulation",
        value: "document.domain",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 15 },
        tags: { "document-domain-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/document-domain-manipulation/files/1.js",
      },
    ],
  },
];

test.each(testCases)(
  "document-domain-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["document-domain-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
