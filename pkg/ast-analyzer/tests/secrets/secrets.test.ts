import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("secrets", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("secrets", testCases[i - 1], "secrets", i);
}
