# git-stage-lines

Stage selected Git lines from scripts and coding agents without an interactive
patch prompt.

```sh
git stage-lines src/app.ts:12-18,40 tests/app.test.ts:7
```

The command changes the Git index and leaves the working file unchanged. It is
free under the MIT License and contains no network calls.

## Try the isolated sample

```sh
cargo run -- --demo
```

Every run creates a new repository under the system temporary directory. It
copies the files in [`examples`](examples), stages lines 5 and 10, and leaves
one sample change unstaged. The command prints the repository path for review.

The matching browser recording is at
<https://git-stage-lines.sociobot.in/?demo=1>. **Reset demo** restores the
recording. The page uses no cookies, local storage, or session storage.

## Install

Install directly from this repository with Cargo:

```sh
cargo install --git https://github.com/B-Divyesh/sf-git-stage-lines
git stage-lines --version
```

Git discovers the `git-stage-lines` executable as `git stage-lines`.

## Use line ranges

```text
git stage-lines [OPTIONS] <FILE:RANGES>...

Options:
      --demo        Run bundled sample data in a new temporary repository
      --unstage     Remove selected lines from the index
      --dry-run     Print the patch without changing the index
      --json        Print one JSON result object
  -C, --repo <DIR>  Run in this repository
```

Positive numbers select changed lines in the working file. Prefix a range with
`-` to select deleted original lines.

```sh
git stage-lines src/app.ts:12-18,40,-9
git stage-lines src/app.ts:-20--24
git stage-lines --dry-run src/app.ts:12,40
git stage-lines --unstage src/app.ts:12-18,-9
git stage-lines --json src/app.ts:12
```

Selecting either side of a replacement selects the paired replacement. An
invalid line rejects the command before the index changes. Git’s
file-conversion rules determine the text compared. Binary data is rejected
without changing the index.

Success exits `0`. Bad arguments or unmatched lines exit `2`. Other file or
Git failures exit `1`.

## Use typed wrappers

The repository includes small Node and Python wrappers:

```ts
import { stageLines } from "@git-stage-lines/node";
await stageLines(["src/app.ts:12-18,40"], { dryRun: true });
```

```python
from git_stage_lines import stage_lines
result = stage_lines(["src/app.py:12-18,40"], dry_run=True)
```

See [`wrappers/node`](wrappers/node) and
[`wrappers/python`](wrappers/python).

## Develop and verify

```sh
npm ci
npm test
npm run build          # release binary and dist/site
npm run test:claims    # every registered product claim
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo package --allow-dirty
npm pack --dry-run ./wrappers/node
```

The static site is built with `npm run build:site` and deployed from
`dist/site`. See [`.factory/claims.json`](.factory/claims.json) for claim-level
commands and [`.factory/demo.md`](.factory/demo.md) for isolation details.

## Scope

Version 0.1.0 supports ordinary text-file changes between the last commit,
index, and working file. It does not rewrite history, create commits, or
stage binary data.

## License

MIT. See [LICENSE](LICENSE).
