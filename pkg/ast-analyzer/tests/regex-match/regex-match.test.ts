import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("regex-match", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("regex-match", testCases[i - 1], "regex-match", i);
}
