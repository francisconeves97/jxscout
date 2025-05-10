import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("react-dangerously-set-inner-html", 1),
  },
  {
    jsFileName: "1.jsx",
    expectedResults: loadExpectedResults("react-dangerously-set-inner-html", 2),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest(
    "react-dangerously-set-inner-html",
    testCases[i - 1],
    "dangerous-html",
    i
  );
}
