import path from "path";
import { expect, test } from "vitest";
import { fileExtensionsAnalyzerBuilder } from "../../extensions";
import { analyzeFile, parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";
import fs from "fs";
interface ExtensionsTestCase {
  jsFileName: string;
  expectedExtensions: AnalyzerMatch[];
}

const testCases: ExtensionsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedExtensions: JSON.parse(
      fs.readFileSync(path.join(__dirname, "expected.json"), "utf-8")
    ),
  },
];

test.each(testCases)(
  "extensions - $jsFileName",
  ({ jsFileName, expectedExtensions }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["extensions"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedExtensions.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    // const outputPath = path.join(__dirname, "expected.json");
    // fs.writeFileSync(outputPath, JSON.stringify(sortedCalls, null, 2));

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
