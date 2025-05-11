import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("onhashchange", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("onhashchange", testCases[i - 1], "onhashchange", i);
}
