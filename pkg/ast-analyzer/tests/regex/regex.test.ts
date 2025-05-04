import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import fs from "fs";

interface RegexTestCase {
  jsFileName: string;
  expectedMatches: AnalyzerMatch[];
}

const testCases: RegexTestCase[] = [
  {
    jsFileName: "1.js",
    expectedMatches: JSON.parse(
      fs.readFileSync(path.join(__dirname, "expected.json"), "utf-8")
    ),
  },
];

test.each(testCases)(
  "regex - $jsFileName",
  ({ jsFileName, expectedMatches }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["regex"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedResults = results.sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    const sortedExpected = expectedMatches.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    // const outputPath = path.join(__dirname, "expected.json");
    // fs.writeFileSync(outputPath, JSON.stringify(sortedResults, null, 2));

    expect(sortedResults).toEqual(sortedExpected);
  }
);
