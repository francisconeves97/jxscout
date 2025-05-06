import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("urls", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("urls", testCases[i - 1], "urls", i);
}
