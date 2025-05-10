import { SourceMapConsumer } from "source-map";
import path from "path";
import fs from "fs-extra";

const cleanFileName = (fileName = "") => {
  fileName = fileName.replace("//", "/");
  return (fileName.match(/[\w\-. /]+/giu) || []).join("");
};

const writeSources = (
  filename: string,
  content: string,
  outdir: string
): string => {
  const AFTER_QUESTION = /(\?\S+)/gu;
  filename = filename
    .replace(AFTER_QUESTION, "")
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/[|\&#,+()?$~%'":*?<>{}]/g, "")
    .replace(" ", ".");
  const outputFilepath = path.normalize(path.join(outdir, filename));

  fs.ensureDirSync(path.dirname(outputFilepath));

  fs.writeFileSync(outputFilepath, content, "utf8");

  return outputFilepath;
};

export async function reverseSourcemap(mapPath: string, outputDir: string) {
  try {
    const mapContent = fs.readFileSync(mapPath, "utf8");
    const consumer = await new SourceMapConsumer(JSON.parse(mapContent));

    const sources = consumer.sources;
    for (const source of sources) {
      const fileName = source;
      const cleanName = cleanFileName(fileName);
      const contents = consumer.sourceContentFor(source, true);

      if (!contents) {
        continue;
      }

      try {
        const filePath = writeSources(cleanName, contents, outputDir);
        console.log(filePath);
      } catch (error) {}
    }
  } catch (error) {
    throw new Error(
      `Failed to reverse sourcemap: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

// CLI entry point

const [, , mapPath, outputDir] = process.argv;

if (!mapPath || !outputDir) {
  process.stderr.write("Usage: sourcemap-reverse <map-file> <output-dir>\n");
  process.exit(1);
}

reverseSourcemap(mapPath, outputDir).catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
