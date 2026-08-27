import { execFile } from "node:child_process";

/**
 * Run git-stage-lines without invoking a shell.
 * @param {string[]} selectors
 * @param {{cwd?: string, dryRun?: boolean, unstage?: boolean, executable?: string}} options
 * @returns {Promise<import('./index.js').StageLinesResult>}
 */
export function stageLines(selectors, options = {}) {
  if (!Array.isArray(selectors) || selectors.length === 0) {
    return Promise.reject(new TypeError("selectors must be a non-empty array"));
  }
  const args = ["--json"];
  if (options.dryRun) args.push("--dry-run");
  if (options.unstage) args.push("--unstage");
  if (options.cwd) args.push("--repo", options.cwd);
  args.push(...selectors);

  return new Promise((resolve, reject) => {
    execFile(options.executable ?? "git-stage-lines", args, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        error.message = `${error.message}${stderr ? `\n${stderr.trim()}` : ""}`;
        reject(error);
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (cause) {
        reject(new Error("git-stage-lines returned invalid JSON", { cause }));
      }
    });
  });
}
