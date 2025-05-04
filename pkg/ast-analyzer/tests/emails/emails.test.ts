import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import fs from "fs";

interface EmailsTestCase {
  jsFileName: string;
  expectedEmails: AnalyzerMatch[];
}

const testCases: EmailsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedEmails: JSON.parse(
      fs.readFileSync(path.join(__dirname, "expected.json"), "utf-8")
    ),
  },
];

test.each(testCases)(
  "emails - $jsFileName",
  ({ jsFileName, expectedEmails }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["emails"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedEmails = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedEmails.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    // const outputPath = path.join(__dirname, "expected.json");
    // fs.writeFileSync(outputPath, JSON.stringify(sortedEmails, null, 2));

    expect(sortedEmails).toEqual(sortedExpected);
  }
);
