# git-stage-lines

Stage exact changed lines from a script, one command, or a coding agent—without
driving `git add -p`.

```sh
git stage-lines src/app.ts:12-18,40 tests/app.test.ts:7
```

`git-stage-lines` is a non-interactive Git subcommand for developers and
automation that need a precise index. It computes the text diff, builds one
minimal patch, validates it with Git, and applies it to the index atomically.
It never changes the working tree, commits, calls a network service, or emits
an interactive prompt.

## Install

Requires Git 2.30 or newer. Prebuilt release archives are intended for normal
installation. To install from source with Rust 1.80+:

```sh
cargo install --path .
git stage-lines --version
```

Git discovers any `git-stage-lines` executable on `PATH` as `git stage-lines`.

## Usage

```text
git stage-lines [OPTIONS] <FILE:RANGES>...

Arguments:
  <FILE:RANGES>...  A path and comma-separated ranges, for example
                    src/app.ts:12-18,40,-9

Options:
      --unstage     Remove only these lines from the index (compare HEAD → index)
      --dry-run     Print the patch without changing the index
      --json        Emit one stable JSON result object to stdout
  -C, --repo <DIR>  Run as if started in this repository
  -h, --help        Print help
  -V, --version     Print version
```

Positive numbers select changed lines on the **new side** of the comparison.
Prefix a number or range with `-` to select a deletion by its **old-side** line
number:

```sh
# Stage working-tree lines 12–18 and 40, plus index deletion line 9.
git stage-lines src/app.ts:12-18,40,-9

# Deletion range: old-side lines 20 through 24.
git stage-lines src/app.ts:-20--24

# Preview the exact patch; the index is untouched.
git stage-lines --dry-run src/app.ts:12,40

# Unstage index lines 12–18 and a deletion originally at HEAD line 9.
git stage-lines --unstage src/app.ts:12-18,-9

# Machine-readable status for an agent.
git stage-lines --json src/app.ts:12
```

In normal staging mode, the old side is the current index and the new side is
the filtered working-tree file. In `--unstage` mode, the old side is `HEAD` and
the new side is the current index. A changed replacement is indivisible at the
line level: selecting either its old or new line stages/unstages that paired
whole-line replacement. Adjacent pure additions and deletions remain
individually selectable. Every requested number must name a changed line;
otherwise the command fails before modifying the index.

CRLF files are compared after Git's configured clean filters, so line numbers
match Git's own diff. Binary and non-UTF-8 blobs are rejected with a useful
error and no partial update. Paths are repository-relative and may contain
spaces; `..`, absolute paths, unresolved conflicts, and submodules are rejected.

Exit codes are `0` for success (including a valid no-op), `2` for invalid
arguments or unmatched lines, and `1` for repository/Git/apply failures. With
`--json`, stdout is a single object containing `ok`, `mode`, `dryRun`, `files`,
`changedLines`, and `patch`; diagnostics go to stderr.

## Agent wrappers

Thin typed wrappers invoke the same executable, so agent harnesses do not need
to parse shell quoting:

```ts
import { stageLines } from "@git-stage-lines/node";
await stageLines(["src/app.ts:12-18,40"], { dryRun: true });
```

```python
from git_stage_lines import stage_lines
result = stage_lines(["src/app.py:12-18,40"], dry_run=True)
```

See [`wrappers/node`](wrappers/node) and [`wrappers/python`](wrappers/python).
Both require `git-stage-lines` on `PATH` and request the stable JSON output.

## Develop and verify

```sh
npm install
npm test                 # Rust unit/integration tests + site checks
npm run build            # release binary + static site in dist/site/
cargo test
cargo package --allow-dirty
npm run dev              # local documentation site
```

The zero-telemetry landing page at
<https://git-stage-lines.sociobot.in> documents the same grammar and includes a
local-only range visualizer. It has no runtime CDN requests or user storage.

## Design limits

Version 0.1.0 operates on text files in the regular worktree/index/HEAD flow.
It intentionally does not rewrite history, split commits, stage binary data,
resolve merge conflicts, or provide an interactive UI.

## License

MIT. See [LICENSE](LICENSE).
