import { parse, Position, Program } from "acorn";
import { simple as traverse } from "acorn-walk";
import * as fs from "fs";

interface PathFinderConfig {
  urlPathRegex: RegExp;
}

const DEFAULT_CONFIG: PathFinderConfig = {
  urlPathRegex:
    /^[a-zA-Z0-9-_~:/?#[\]@!$&'()*+,;={}]*\/[a-zA-Z0-9-_~:/?#[\]@!$&'()*+,;={}]*$/,
};

interface FoundPath {
  value: string;
  start: Position;
  end: Position;
}

export function findUrlPaths(
  filePath: string,
  config: Partial<PathFinderConfig> = {}
): FoundPath[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const fileContent = fs.readFileSync(filePath, "utf-8");

  let ast: Program;

  try {
    ast = parse(fileContent, {
      ecmaVersion: "latest",
      sourceType: "module",
      locations: true,
    });
  } catch (err) {
    ast = parse(fileContent, {
      ecmaVersion: "latest",
      sourceType: "script",
      locations: true,
    });
  }

  const foundPaths: FoundPath[] = [];

  traverse(ast, {
    Literal(node) {
      const stringValue = node.value;
      if (typeof stringValue !== "string") {
        return;
      }

      if (!finalConfig.urlPathRegex.test(stringValue)) {
        return;
      }

      if (!node.loc) {
        return;
      }

      foundPaths.push({
        value: stringValue,
        start: node.loc.start,
        end: node.loc.end,
      });
    },

    TemplateLiteral(node) {
      const templateValue = fileContent
        .slice(node.start, node.end)
        .replaceAll("`", "");

      if (!finalConfig.urlPathRegex.test(templateValue)) {
        return;
      }

      if (!node.loc) {
        return;
      }

      foundPaths.push({
        value: templateValue,
        start: node.loc.start,
        end: node.loc.end,
      });
    },
  });

  return foundPaths;
}
