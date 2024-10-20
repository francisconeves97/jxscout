import * as acorn from "acorn";
import walk from "acorn-walk";
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

const resultsDir = "../get-github-webpack-examples/github_results";
const outputDir = "unique_functions";

interface UniqueFunctions {
  [hash: string]: string;
}

function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const uniqueFunctions: UniqueFunctions = {};

  walkDir(resultsDir, (filePath: string) => {
    if (path.extname(filePath) === ".js") {
      try {
        processFile(filePath, uniqueFunctions);
      } catch (err) {
        console.error("failed to process file", filePath);
      }
    }
  });

  for (const [hash, functionContent] of Object.entries(uniqueFunctions)) {
    const outputPath = path.join(outputDir, `${hash.slice(0, 8)}.js`);
    fs.writeFileSync(outputPath, functionContent);
    console.log(`Wrote unique function to: ${outputPath}`);
  }
}

function walkDir(dir: string, callback: (filePath: string) => void) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  }
}

function processFile(filePath: string, uniqueFunctions: UniqueFunctions) {
  const content = fs.readFileSync(filePath, "utf-8");
  const ast = acorn.parse(content, {
    ecmaVersion: "latest",
    locations: true,
  });

  walk.ancestor(ast, {
    FunctionDeclaration(node: any, ancestors) {
      processFunctionNode(content, node, uniqueFunctions, filePath);
    },
    FunctionExpression(node: any, ancestors) {
      processFunctionNode(content, node, uniqueFunctions, filePath);
    },
    ArrowFunctionExpression(node: any, ancestors) {
      processFunctionNode(content, node, uniqueFunctions, filePath);
    },
    MethodDefinition(node: any, ancestors) {
      if (node.value.type === "FunctionExpression") {
        processFunctionNode(content, node.value, uniqueFunctions, filePath);
      }
    },
    Property(node: any, ancestors) {
      if (
        node.value.type === "FunctionExpression" ||
        node.value.type === "ArrowFunctionExpression"
      ) {
        processFunctionNode(content, node.value, uniqueFunctions, filePath);
      }
    },
  });
}

function processFunctionNode(
  content: string,
  node: acorn.Node,
  uniqueFunctions: UniqueFunctions,
  filePath: string
) {
  const functionContent = content.slice(node.start, node.end);

  if (
    functionContent.includes("return url for filenames based on template") &&
    !functionContent.includes("webpack/runtime/get")
  ) {
    const hash = hashFunction(functionContent);
    uniqueFunctions[hash] = `// ${filePath}\n${functionContent}`;
  }
}

function hashFunction(content: string): string {
  const normalized = content.replace(/\s+/g, "");
  const hash = crypto.createHash("sha256");
  hash.update(normalized);
  return hash.digest("hex");
}

main();
