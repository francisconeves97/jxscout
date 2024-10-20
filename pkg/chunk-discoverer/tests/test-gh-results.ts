import * as fs from "fs";
import * as path from "path";
import { discoverChunks } from "../discoverer/discoverer";

const readFile = (path: string): string => {
  return fs.readFileSync(path, "utf-8");
};

const writeFile = (path: string, content: string): void => {
  fs.writeFileSync(path, content);
};

const findJsFiles = (dir: string): string[] => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findJsFiles(file));
    } else if (path.extname(file) === ".js") {
      results.push(file);
    }
  });

  return results;
};

const directories = ["scripts/get-github-webpack-examples/github_results"];

directories.forEach((dir) => {
  const jsFiles = findJsFiles(dir);

  jsFiles.forEach((file) => {
    try {
      const code = readFile(file);
      const result = discoverChunks(code, 10);
      const resultFileName = `${path.basename(file, ".js")}-result.txt`;
      const resultFilePath = path.join(path.dirname(file), resultFileName);

      if (code.includes(".js") && result.length === 0) {
        console.log(">>> probably should have found something?", file, "\n");
      }

      writeFile(resultFilePath, JSON.stringify(result));
      console.log(
        `Processed ${file} and saved results to ${resultFilePath}\n\n`
      );
    } catch (err) {
      console.error(">>> failed to process", err, file);
    }
  });
});
