import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";
import { AnalyzerType } from "../../index";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("fetch", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("fetch" as AnalyzerType, testCases[i - 1], "fetch", i);
}
