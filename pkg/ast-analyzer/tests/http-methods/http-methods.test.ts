import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("http-methods", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("http-methods", testCases[i - 1], "http-methods", i);
}
