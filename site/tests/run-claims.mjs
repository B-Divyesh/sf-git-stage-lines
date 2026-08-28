import { spawnSync } from "node:child_process";

const marker = process.argv.indexOf("--grep");
const pattern = marker >= 0 ? process.argv[marker + 1] : undefined;
const build = spawnSync("cargo", ["build", "--quiet"], { stdio: "inherit" });
if (build.status !== 0) process.exit(build.status ?? 1);
const args = ["--test"];
if (pattern) args.push(`--test-name-pattern=${pattern}`);
args.push("site/tests/claims.test.js");
const tests = spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(tests.status ?? 1);
