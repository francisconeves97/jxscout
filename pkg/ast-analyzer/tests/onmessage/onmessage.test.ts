import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("onmessage", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("onmessage", testCases[i - 1], "onmessage", i);
}
