import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("postmessage", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("postmessage", testCases[i - 1], "postmessage", i);
}
