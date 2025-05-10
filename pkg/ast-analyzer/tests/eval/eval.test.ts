import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("eval", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("eval", testCases[i - 1], "eval", i);
}
