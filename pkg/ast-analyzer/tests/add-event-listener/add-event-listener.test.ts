import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("add-event-listener", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest(
    "add-event-listener",
    testCases[i - 1],
    "add-event-listener",
    i
  );
}
