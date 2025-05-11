import * as fs from "fs";

// Pattern to match: s = t(NUMBER)(process.env.NAPI_RS_NATIVE_LIBRARY_PATH)
const pattern =
  /(\w+)\s*=\s*t\((\d+)\)\(process\.env\.NAPI_RS_NATIVE_LIBRARY_PATH\)/g;

// Replacement pattern
const replacement =
  "e = t.nmd(e); return process.dlopen(e, process.env.NAPI_RS_NATIVE_LIBRARY_PATH)";

function patchFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const patchedContent = content.replaceAll(pattern, replacement);

    if (content === patchedContent) {
      console.error(`Error: No matching pattern found in file: ${filePath}`);
      process.exit(1);
    }

    fs.writeFileSync(filePath, patchedContent);
    console.log(`Patched file: ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    process.exit(1);
  }
}

// Main execution
const targetFile = process.argv[2];
if (!targetFile) {
  console.error("Please provide a target file path");
  process.exit(1);
}

if (!fs.existsSync(targetFile)) {
  console.error(`File ${targetFile} does not exist`);
  process.exit(1);
}

console.log(`Starting patch process for file: ${targetFile}`);
patchFile(targetFile);
console.log("Patch process completed");
