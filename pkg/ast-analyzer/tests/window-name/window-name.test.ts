import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("window-name", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("window-name", testCases[i - 1], "window-name", i);
}
