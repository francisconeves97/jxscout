import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("document-domain", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("document-domain", testCases[i - 1], "document-domain", i);
}
