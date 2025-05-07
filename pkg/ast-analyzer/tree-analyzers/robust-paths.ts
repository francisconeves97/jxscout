import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";
import { COMMON_MIME_TYPES } from "./paths";

function isHighEntropy(str: string, threshold = 4.9): boolean {
  const freq: Record<string, number> = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  let entropy = 0;
  const len = str.length;

  for (const char in freq) {
    const p = freq[char] / len;
    entropy -= p * Math.log2(p);
  }

  return entropy >= threshold;
}

// most logic stolen from https://github.com/BishopFox/jsluice
// all credit to them

export const ROBUST_PATHS_ANALYZER_NAME = "robust-paths";

// Common file extensions that should be tagged as extensions
const FILE_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".html",
  ".css",
  ".scss",
  ".less",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".webp",
  ".mp3",
  ".mp4",
  ".wav",
  ".ogg",
  ".webm",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".zip",
  ".tar",
  ".gz",
  ".rar",
  ".7z",
  ".md",
  ".txt",
  ".csv",
  ".xml",
  ".yaml",
  ".yml",
  ".env",
  ".config",
  ".conf",
  ".ini",
  ".sh",
  ".bash",
  ".zsh",
  ".fish",
  ".py",
  ".rb",
  ".php",
  ".java",
  ".c",
  ".cpp",
  ".go",
  ".rs",
  ".sql",
  ".db",
  ".sqlite",
  ".sqlite3",
  ".log",
  ".lock",
  ".map",
  ".min",
  ".bundle",
]);

function containsAny(str: string, chars: string): boolean {
  return chars.split("").some((char) => str.includes(char));
}

function hasPrefix(str: string, prefix: string): boolean {
  return str.startsWith(prefix);
}

function isValidPath(value: string): boolean {
  // Check if path starts with a letter or forward slash
  if (!/^[a-zA-Z/]/.test(value)) {
    return false;
  }

  // Check if path contains at least one letter
  if (!/[a-zA-Z]/.test(value)) {
    return false;
  }

  // Basic path-like check
  if (!value.includes("/")) {
    return false;
  }

  // Exclude strings with special characters
  if (containsAny(value, " ()!<>'\"`{}^$,")) {
    return false;
  }

  // Exclude paths that are just "./" or "../"
  if (/^\.\.?\/?$/.test(value)) {
    return false;
  }

  // Check if at least one path segment is longer than 3 characters
  const parts = value.split("/").filter(Boolean);
  if (!parts.some((part) => part.length > 3)) {
    return false;
  }

  // Paths starting with slash are likely valid
  if (hasPrefix(value, "/") && !value.startsWith("//")) {
    return true;
  }

  // Try to parse as URL first
  if (value.includes("://") || value.startsWith("//")) {
    try {
      const url = new URL(value.startsWith("//") ? `http:${value}` : value);

      // Check scheme
      const scheme = url.protocol.toLowerCase().replace(":", "");
      if (scheme !== "http" && scheme !== "https") {
        return false;
      }

      // Must have a path component
      if (url.pathname.trim() === "" || url.pathname.trim() === "/") {
        return false;
      }

      if (url.hostname === "www.w3.org") {
        return false;
      }

      // Check hostname
      if (url.hostname.split(".").length > 1) {
        return true;
      }

      // Check query parameters
      if (url.searchParams.toString()) {
        return true;
      }

      // Check for file extension
      if (containsAny(url.pathname, ".")) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  if (value.includes("www.w3.org")) {
    return false;
  }

  // For relative paths, check if they have a valid structure
  if (parts.length === 0) {
    return false;
  }

  // Check if any part contains a dot (potential file extension)
  if (containsAny(value, ".")) {
    return true;
  }

  // Check if it has query parameters
  if (value.includes("?")) {
    return true;
  }

  if (isHighEntropy(value)) {
    return false;
  }

  // If it has multiple segments, it's likely a path
  return parts.length > 1;
}

function getFileExtension(path: string): string | null {
  const lastDotIndex = path.lastIndexOf(".");
  if (lastDotIndex === -1) return null;

  const extension = path.slice(lastDotIndex).toLowerCase();
  return FILE_EXTENSIONS.has(extension) ? extension.replace(".", "") : null;
}

function processTemplateLiteral(template: string): string {
  return template.replace(/\${[^}]+}/g, ":EXPR");
}

interface BinaryExpression extends Node {
  type: "BinaryExpression";
  operator: string;
  left: Node;
  right: Node;
}

interface CallExpression extends Node {
  type: "CallExpression";
  callee: {
    type: "MemberExpression";
    property: {
      name: string;
    };
    object: Node;
  };
  arguments: Node[];
}

interface Literal extends Node {
  type: "Literal";
  value: string;
}

function processStringConcatenation(node: Node): string {
  if (
    node.type === "BinaryExpression" &&
    (node as BinaryExpression).operator === "+"
  ) {
    const binaryNode = node as BinaryExpression;
    const left = processStringConcatenation(binaryNode.left);
    const right = processStringConcatenation(binaryNode.right);
    return left + right;
  } else if (node.type === "CallExpression") {
    const callNode = node as CallExpression;
    if (
      callNode.callee.type === "MemberExpression" &&
      callNode.callee.property.name === "concat"
    ) {
      const base = processStringConcatenation(callNode.callee.object);
      const args = callNode.arguments
        .map((arg) =>
          arg.type === "Literal" ? (arg as Literal).value : "EXPR"
        )
        .join("");
      return base + args;
    }
  } else if (
    node.type === "Literal" &&
    typeof (node as Literal).value === "string"
  ) {
    return (node as Literal).value;
  }
  return "EXPR";
}

function createPathMatch(
  args: AnalyzerParams,
  node: Node,
  value: string,
  isTemplate = false
): AnalyzerMatch {
  const isUrl = value.includes("://") || value.startsWith("//");
  const extension = getFileExtension(value);
  const isMimeType = COMMON_MIME_TYPES.has(value);

  return {
    filePath: args.filePath,
    analyzerName: ROBUST_PATHS_ANALYZER_NAME,
    value: isTemplate ? value : args.source.slice(node.start, node.end),
    start: node.loc!.start,
    end: node.loc!.end,
    tags: {
      ...(isMimeType && { "mime-type": true }),
      ...(extension && { [`extension-${extension}`]: true }),
      ...(extension && { "is-extension": true }),
      ...(isUrl && { "is-url": true }),
      ...(!isUrl && !isMimeType && !extension && { "is-path-only": true }),
      ...(value.includes("api") && { api: true }),
      ...(value.includes("?") && { query: true }),
      ...(value.includes("#") && { fragment: true }),
    },
  };
}

const robustPathsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node) {
      if (!node.loc || typeof (node as Literal).value !== "string") {
        return;
      }

      const value = (node as Literal).value;
      if (isValidPath(value)) {
        matchesReturn.push(createPathMatch(args, node, value));
      }
    },

    TemplateLiteral(node) {
      if (!node.loc) {
        return;
      }

      // Get the raw template literal value and process expressions
      const rawValue = args.source
        .slice(node.start, node.end)
        .replaceAll("`", "");
      const processedValue = processTemplateLiteral(rawValue);

      if (isValidPath(processedValue)) {
        matchesReturn.push(createPathMatch(args, node, rawValue, true));
      }
    },

    BinaryExpression(node) {
      const binaryNode = node as BinaryExpression;
      if (binaryNode.operator === "+") {
        const processedValue = processStringConcatenation(node);
        if (isValidPath(processedValue)) {
          matchesReturn.push(createPathMatch(args, node, processedValue));
        }
      }
    },

    CallExpression(node) {
      const callNode = node as CallExpression;
      if (
        callNode.callee.type === "MemberExpression" &&
        callNode.callee.property.name === "concat"
      ) {
        const processedValue = processStringConcatenation(node);
        if (isValidPath(processedValue)) {
          matchesReturn.push(createPathMatch(args, node, processedValue));
        }
      }
    },
  };
};

export { robustPathsAnalyzerBuilder };
