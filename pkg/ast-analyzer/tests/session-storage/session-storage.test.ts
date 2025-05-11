import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("session-storage", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("session-storage", testCases[i - 1], "session-storage", i);
}
