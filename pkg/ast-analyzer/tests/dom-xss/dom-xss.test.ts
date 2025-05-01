import path from "path";
import { expect, test } from "vitest";
import { domXssAnalyzerBuilder } from "../../dom-xss";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";

interface DomXssTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: DomXssTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "dom-xss",
        value: 'document.domain = "example.com"',
        start: { line: 8, column: 0 },
        end: { line: 8, column: 31 },
        tags: { "dom-xss": true },
      },
      {
        analyzerName: "dom-xss",
        value: 'document.write("<script>alert(1)</script>")',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 43 },
        tags: { "dom-xss": true },
      },
      {
        analyzerName: "dom-xss",
        value: 'document.writeln("<script>alert(1)</script>")',
        start: { line: 5, column: 0 },
        end: { line: 5, column: 45 },
        tags: { "dom-xss": true },
      },
      {
        analyzerName: "dom-xss",
        value: 'element.innerHTML = "<script>alert(1)</script>"',
        start: { line: 11, column: 0 },
        end: { line: 11, column: 47 },
        tags: { "dom-xss": true },
      },
      {
        analyzerName: "dom-xss",
        value:
          'element.insertAdjacentHTML("beforeend", "<script>alert(1)</script>")',
        start: { line: 17, column: 0 },
        end: { line: 17, column: 68 },
        tags: { "dom-xss": true },
      },
      {
        analyzerName: "dom-xss",
        value: 'element.onclick = "alert(1)"',
        start: { line: 20, column: 0 },
        end: { line: 20, column: 28 },
        tags: { "dom-xss": true },
      },
      {
        analyzerName: "dom-xss",
        value: 'element.outerHTML = "<script>alert(1)</script>"',
        start: { line: 14, column: 0 },
        end: { line: 14, column: 47 },
        tags: { "dom-xss": true },
      },
    ],
  },
];

test.each(testCases)(
  "dom-xss - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const results: AnalyzerMatch[] = [];
    const domXssAnalyzer = domXssAnalyzerBuilder(args, results);

    traverse(args.ast, {
      CallExpression(node, state, ancestors) {
        domXssAnalyzer.CallExpression?.(node, state, ancestors);
      },
      AssignmentExpression(node, state, ancestors) {
        domXssAnalyzer.AssignmentExpression?.(node, state, ancestors);
      },
    });

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
