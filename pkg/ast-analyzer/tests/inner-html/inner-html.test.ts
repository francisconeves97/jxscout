import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("inner-html", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("inner-html", testCases[i - 1], "inner-html", i);
}
