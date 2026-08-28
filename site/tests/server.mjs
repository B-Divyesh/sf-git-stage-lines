import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = new URL("../../dist/site/", import.meta.url).pathname;
const types = { ".css": "text/css", ".html": "text/html", ".jpg": "image/jpeg", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".txt": "text/plain", ".webp": "image/webp", ".xml": "application/xml" };

createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const clean = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let path = join(root, clean);
  try {
    if (statSync(path).isDirectory()) path = join(path, "index.html");
    if (!statSync(path).isFile()) throw new Error("not a file");
    response.writeHead(200, { "Content-Type": types[extname(path)] ?? "application/octet-stream", "Cache-Control": "no-cache" });
    createReadStream(path).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html", "Cache-Control": "no-cache" });
    createReadStream(join(root, "404.html")).pipe(response);
  }
}).listen(4173, "127.0.0.1");
