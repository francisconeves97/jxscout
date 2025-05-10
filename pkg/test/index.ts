import { parseSync } from "oxc-parser";
import { ancestors as traverse } from "../ast-analyzer/walker";

const source = "const a = () => <div></div>";
const result = parseSync("test.js", source, {
  lang: "jsx",
});

// Create a helper function to convert positions
function getPosition(source: string, pos: number) {
  const lines = source.slice(0, pos).split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
}

traverse(source, result.program, {
  Identifier: (node, ancestors) => {
    console.log(node.name);
    console.log(getPosition(source, node.start));
    console.log(ancestors);
  },

  // if (node.type === "Identifier") {
  //   console.log(node.name);
  // }
});
