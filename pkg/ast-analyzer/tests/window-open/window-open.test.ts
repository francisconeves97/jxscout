import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("window-open", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("window-open", testCases[i - 1], "window-open", i);
}
