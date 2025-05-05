import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("regex-pattern", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("regex-pattern", testCases[i - 1], "regex-pattern", i);
}
