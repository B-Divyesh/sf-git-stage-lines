import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const binary = resolve("target/debug/git-stage-lines");
const initial = readFileSync("examples/sprint-board.initial.ts", "utf8");
const working = readFileSync("examples/sprint-board.working.ts", "utf8");

function git(repo, ...args) {
  return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8" });
}

function fixture() {
  const repo = mkdtempSync(join(tmpdir(), "gsl-claim-"));
  git(repo, "init", "-q");
  git(repo, "config", "user.name", "Claim test");
  git(repo, "config", "user.email", "claim@example.invalid");
  writeFileSync(join(repo, "sprint-board.ts"), initial);
  git(repo, "add", "sprint-board.ts");
  git(repo, "commit", "-qm", "sample");
  writeFileSync(join(repo, "sprint-board.ts"), working);
  return repo;
}

function cli(repo, ...args) {
  return spawnSync(binary, ["-C", repo, ...args], { encoding: "utf8" });
}

test("@claim:exact-selection stages only requested changed lines without a prompt", () => {
  const repo = fixture();
  const result = cli(repo, "sprint-board.ts:5,10");
  assert.equal(result.status, 0);
  assert.match(result.stderr, /staged 2 selected lines in 1 file/);
  const staged = git(repo, "diff", "--cached");
  assert.match(staged, /GSL-24/);
  assert.match(staged, /Keep urgent tickets/);
  assert.doesNotMatch(staged, /Follow-up/);
});

test("@claim:worktree-unchanged leaves the working file unchanged", () => {
  const repo = fixture();
  assert.equal(cli(repo, "sprint-board.ts:5,10").status, 0);
  assert.equal(readFileSync(join(repo, "sprint-board.ts"), "utf8"), working);
});

test("@claim:dry-run prints a patch without changing the index", () => {
  const repo = fixture();
  const before = git(repo, "write-tree");
  const result = cli(repo, "--dry-run", "sprint-board.ts:5");
  assert.equal(result.status, 0);
  assert.match(result.stdout, /GSL-24/);
  assert.equal(git(repo, "write-tree"), before);
});

test("@claim:unstage removes only the selected index line", () => {
  const repo = fixture();
  assert.equal(cli(repo, "sprint-board.ts:5,10").status, 0);
  assert.equal(cli(repo, "--unstage", "sprint-board.ts:5").status, 0);
  const staged = git(repo, "diff", "--cached");
  assert.doesNotMatch(staged, /GSL-24/);
  assert.match(staged, /Keep urgent tickets/);
});

test("@claim:reject-atomic rejects a bad line without changing the index", () => {
  const repo = fixture();
  const before = git(repo, "write-tree");
  const result = cli(repo, "sprint-board.ts:5,99");
  assert.equal(result.status, 2);
  assert.match(result.stderr, /line 99 is not changed/);
  assert.equal(git(repo, "write-tree"), before);
});

test("@claim:json-output returns one machine-readable result", () => {
  const repo = fixture();
  const result = cli(repo, "--json", "sprint-board.ts:5");
  assert.equal(result.status, 0);
  assert.deepEqual(Object.keys(JSON.parse(result.stdout)).sort(), ["changedLines", "dryRun", "files", "mode", "ok", "patch"].sort());
  assert.equal(result.stderr, "");
});

test("@claim:line-number-semantics supports additions, deletions, paired replacements, and unstage deletions", () => {
  const repo = fixture();
  writeFileSync(join(repo, "sides.txt"), "one\ntwo\nthree\n");
  git(repo, "add", "sides.txt"); git(repo, "commit", "-qm", "sides");
  writeFileSync(join(repo, "sides.txt"), "one\nTWO\nfour\n");
  assert.equal(cli(repo, "sides.txt:-2,3").status, 0);
  assert.equal(git(repo, "show", ":sides.txt"), "one\nTWO\nfour\n");

  writeFileSync(join(repo, "unstage-delete.txt"), "one\ntwo\nthree\nfour\n");
  git(repo, "add", "unstage-delete.txt"); git(repo, "commit", "-qm", "unstage deletion");
  writeFileSync(join(repo, "unstage-delete.txt"), "one\nfour\n");
  assert.equal(cli(repo, "unstage-delete.txt:-2,-3").status, 0);
  assert.equal(git(repo, "show", ":unstage-delete.txt"), "one\nfour\n");
  assert.equal(cli(repo, "--unstage", "unstage-delete.txt:-2").status, 0);
  assert.equal(git(repo, "show", ":unstage-delete.txt"), "one\ntwo\nfour\n");
});

test("@claim:text-safety honors Git text filters and rejects binary data", () => {
  const repo = fixture();
  writeFileSync(join(repo, ".gitattributes"), "*.txt text eol=lf\n");
  writeFileSync(join(repo, "space name.txt"), "one\r\ntwo\r\n");
  git(repo, "add", ".gitattributes", "space name.txt"); git(repo, "commit", "-qm", "text fixture");
  writeFileSync(join(repo, "space name.txt"), "one\r\nselected\r\ntwo\r\n");
  assert.equal(cli(repo, "space name.txt:2").status, 0);
  assert.equal(git(repo, "show", ":space name.txt"), "one\nselected\ntwo\n");
  writeFileSync(join(repo, "binary.dat"), Buffer.from("one\0two\n"));
  const before = git(repo, "write-tree");
  const rejected = cli(repo, "binary.dat:1");
  assert.equal(rejected.status, 1);
  assert.match(rejected.stderr, /binary/);
  assert.equal(git(repo, "write-tree"), before);

  const conflict = mkdtempSync(join(tmpdir(), "gsl-conflict-"));
  git(conflict, "init", "-q"); git(conflict, "config", "user.name", "Claim test"); git(conflict, "config", "user.email", "claim@example.invalid");
  writeFileSync(join(conflict, "conflict.txt"), "base\n"); git(conflict, "add", "conflict.txt"); git(conflict, "commit", "-qm", "base");
  git(conflict, "checkout", "-qb", "side"); writeFileSync(join(conflict, "conflict.txt"), "side\n"); git(conflict, "commit", "-qam", "side");
  git(conflict, "checkout", "-q", "master"); writeFileSync(join(conflict, "conflict.txt"), "main\n"); git(conflict, "commit", "-qam", "main");
  spawnSync("git", ["-C", conflict, "merge", "side"], { encoding: "utf8" });
  const conflictIndex = git(conflict, "ls-files", "--stage", "--", "conflict.txt");
  assert.equal(cli(conflict, "conflict.txt:1").status, 1);
  assert.equal(git(conflict, "ls-files", "--stage", "--", "conflict.txt"), conflictIndex);
});

test("@claim:git-subcommand runs through Git command discovery", () => {
  const repo = fixture();
  const env = { ...process.env, PATH: `${resolve("target/debug")}:${process.env.PATH}` };
  const result = spawnSync("git", ["-C", repo, "stage-lines", "sprint-board.ts:5"], { encoding: "utf8", env });
  assert.equal(result.status, 0);
  assert.match(git(repo, "diff", "--cached"), /GSL-24/);
});

test("@claim:install-from-git installs the documented Git-source command", () => {
  const root = mkdtempSync(join(tmpdir(), "gsl-install-"));
  const result = spawnSync(
    "cargo",
    ["install", "--git", "https://github.com/B-Divyesh/sf-git-stage-lines", "--root", root],
    { encoding: "utf8", timeout: 180_000 },
  );
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const installed = process.platform === "win32" ? join(root, "bin", "git-stage-lines.exe") : join(root, "bin", "git-stage-lines");
  const version = spawnSync(installed, ["--version"], { encoding: "utf8" });
  assert.equal(version.status, 0, version.stderr);
  assert.match(version.stdout, /^git-stage-lines 0\.1\.0\s*$/);
});

test("@claim:cli-no-network runs the demo without opening a network socket", () => {
  const dir = mkdtempSync(join(tmpdir(), "gsl-socket-audit-"));
  const source = join(dir, "block.c");
  const library = join(dir, "block.so");
  const log = join(dir, "network.log");
  writeFileSync(source, `#define _GNU_SOURCE\n#include <dlfcn.h>\n#include <sys/socket.h>\n#include <fcntl.h>\n#include <unistd.h>\n#include <stdlib.h>\nstatic void note(){const char*p=getenv("GSL_NET_LOG");if(p){int f=open(p,O_WRONLY|O_CREAT|O_APPEND,0600);if(f>=0){write(f,"network\\n",8);close(f);}}}\nint socket(int d,int t,int p){static int(*real)(int,int,int);if(!real)real=dlsym(RTLD_NEXT,"socket");note();return real(d,t,p);}\nint connect(int f,const struct sockaddr*a,socklen_t l){static int(*real)(int,const struct sockaddr*,socklen_t);if(!real)real=dlsym(RTLD_NEXT,"connect");note();return real(f,a,l);}\n`);
  execFileSync("cc", ["-shared", "-fPIC", source, "-o", library, "-ldl"]);
  const result = spawnSync(binary, ["--demo"], { encoding: "utf8", env: { ...process.env, LD_PRELOAD: library, GSL_NET_LOG: log } });
  assert.equal(result.status, 0);
  assert.throws(() => readFileSync(log));
});

test("@claim:demo-isolation creates a fresh temporary repository for each run", () => {
  const caller = fixture();
  const callerBefore = git(caller, "status", "--porcelain=v1");
  const first = spawnSync(binary, ["--demo"], { encoding: "utf8", cwd: caller });
  const second = spawnSync(binary, ["--demo"], { encoding: "utf8" });
  assert.equal(first.status, 0); assert.equal(second.status, 0);
  const path = (value) => value.match(/Sample repository: (.+)/)?.[1];
  assert.ok(path(first.stdout)?.startsWith(tmpdir()));
  assert.notEqual(path(first.stdout), path(second.stdout));
  assert.match(first.stdout, /Still unstaged:[\s\S]*Follow-up/);
  assert.equal(git(caller, "status", "--porcelain=v1"), callerBefore);
});

test("@claim:mit-license verifies the package license and full license text", () => {
  assert.match(readFileSync("Cargo.toml", "utf8"), /license = "MIT"/);
  assert.match(readFileSync("LICENSE", "utf8"), /Permission is hereby granted, free of charge/);
});

test("@claim:exit-codes returns documented status codes", () => {
  const repo = fixture();
  assert.equal(cli(repo, "sprint-board.ts:5").status, 0);
  assert.equal(cli(repo, "sprint-board.ts:99").status, 2);
  writeFileSync(join(repo, "binary.dat"), Buffer.from("one\0two\n"));
  assert.equal(cli(repo, "binary.dat:1").status, 1);
});

test("@claim:scope-boundaries leaves HEAD unchanged and creates no commit", () => {
  const repo = fixture();
  const before = git(repo, "rev-parse", "HEAD");
  assert.equal(cli(repo, "sprint-board.ts:5,10").status, 0);
  assert.equal(git(repo, "rev-parse", "HEAD"), before);
  assert.equal(git(repo, "rev-list", "--count", "HEAD").trim(), "1");
});

test("@claim:typed-wrappers invokes the Node and Python adapters without a shell", async () => {
  const repo = fixture();
  const { stageLines } = await import("../../wrappers/node/index.js");
  const nodeResult = await stageLines(["sprint-board.ts:5"], { cwd: repo, executable: binary });
  assert.equal(nodeResult.changedLines, 1);
  const python = spawnSync("python3", ["-m", "unittest", "discover", "-s", "wrappers/python/tests"], { encoding: "utf8", env: { ...process.env, PYTHONPATH: "wrappers/python" } });
  assert.equal(python.status, 0, python.stderr);
});
