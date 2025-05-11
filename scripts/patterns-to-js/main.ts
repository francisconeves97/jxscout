import { readFile, writeFile } from "fs/promises";
import YAML from "yaml";
import RandExp from "randexp";

type Pattern = {
  name: string;
  regex: string;
  confidence?: string;
};

type PatternYaml = {
  patterns: { pattern: Pattern }[];
};

function sanitizeVarName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

async function main(inputYamlPath: string) {
  const yamlText = await readFile(inputYamlPath, "utf-8");
  const parsed = YAML.parse(yamlText) as PatternYaml;

  const regexArrayEntries: string[] = [];
  const testFileEntries: string[] = [];

  for (const { pattern } of parsed.patterns) {
    const { name, regex } = pattern;
    const varName = sanitizeVarName(name);

    // Escape regex string for JavaScript string
    const escapedRegex = regex.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    regexArrayEntries.push(
      `  { name: "${name}", regex: new RegExp("${escapedRegex}") }`
    );

    // Generate example value using RandExp
    let example = "example_value";
    try {
      const randexp = new RandExp(new RegExp(regex));
      example = randexp.gen();
    } catch (e) {
      console.warn(`⚠️ Could not generate example for ${name}: ${regex}`, e);
    }

    // Use JSON.stringify to escape any special characters in the generated value
    const safeString = JSON.stringify(example);
    testFileEntries.push(`const ${varName} = ${safeString}; // ${name}`);
  }

  // Write patterns.js (safe regex array)
  const patternsJS = `export const patterns = [\n${regexArrayEntries.join(",\n")}\n];\n`;
  await writeFile("patterns.js", patternsJS);

  // Write test_samples.js (example constants)
  const testSamples = `${testFileEntries.join("\n")}\n`;
  await writeFile("test_samples.js", testSamples);

  console.log("✅ Generated patterns.js and test_samples.js");
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: bun generate.ts <input.yaml>");
  process.exit(1);
}

main(args[0]);
