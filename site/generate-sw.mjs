import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("../dist/site/", import.meta.url).pathname;
const source = new URL("./public/sw.js", import.meta.url).pathname;

async function files(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await files(path));
    else found.push(path);
  }
  return found;
}

const assets = (await files(join(root, "assets")))
  .filter((path) => /\.(?:css|js)$/.test(path))
  .map((path) => `/${relative(root, path)}`);
const template = await readFile(source, "utf8");
await writeFile(join(root, "sw.js"), template.replace('"__BUILD_ASSETS__"', assets.map(JSON.stringify).join(", ")));
