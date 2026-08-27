import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { stageLines } from "./index.js";

test("documented Node wrapper stages a line", async () => {
  const repo = mkdtempSync(join(tmpdir(), "git-stage-lines-node-"));
  const git = (...args) => execFileSync("git", ["-C", repo, ...args]);
  git("init", "-q");
  git("config", "user.name", "Test");
  git("config", "user.email", "test@example.com");
  writeFileSync(join(repo, "app.ts"), "one\n");
  git("add", "app.ts");
  git("commit", "-qm", "fixture");
  writeFileSync(join(repo, "app.ts"), "one\ntwo\nthree\n");

  const result = await stageLines(["app.ts:2"], {
    cwd: repo,
    executable: resolve("target/debug/git-stage-lines"),
  });
  assert.equal(result.ok, true);
  assert.equal(result.changedLines, 1);
  assert.equal(git("show", ":app.ts").toString(), "one\ntwo\n");
  assert.equal(readFileSync(join(repo, "app.ts"), "utf8"), "one\ntwo\nthree\n");
});
