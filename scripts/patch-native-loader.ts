import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const targetFile = join(
  __dirname,
  "../internal/modules/ast-analyzer/ast-analyzer.js"
);

const patchFile = join(__dirname, "patch.js");

// Read both files
let content = readFileSync(targetFile, "utf8");
let patchContent = readFileSync(patchFile, "utf8");

// Minify the patch content
const dynamicLoader = patchContent
  .replace(/\/\/.*$/gm, "") // Remove comments
  .replace(/\s+/g, " ") // Replace multiple spaces with single space
  .replace(/\s*{\s*/g, "{") // Remove spaces around braces
  .replace(/\s*}\s*/g, "}") // Remove spaces around braces
  .replace(/\s*;\s*/g, ";") // Remove spaces around semicolons
  .replace(/\s*:\s*/g, ":") // Remove spaces around colons
  .replace(/\s*,\s*/g, ",") // Remove spaces around commas
  .replace(/\s*=\s*/g, "=") // Remove spaces around equals
  .replace(/\s*===\s*/g, "===") // Remove spaces around strict equals
  .replace(/\s*==\s*/g, "==") // Remove spaces around equals
  .replace(/\s*\)\s*/g, ")") // Remove spaces around parentheses
  .replace(/\s*\(\s*/g, "(") // Remove spaces around parentheses
  .trim();

// Replace the static dlopen with our dynamic loader
const newContent = content.replace(
  /process\.dlopen\(e,\s*r\.join\(__dirname,\s*"parser\.darwin-arm64\.node"\)\)/g,
  dynamicLoader
);

// Check if the replacement was successful
if (newContent === content) {
  console.error(
    "Error: Could not find the target pattern to replace in the file"
  );
  process.exit(1);
}

// Write the modified content back
writeFileSync(targetFile, newContent);
