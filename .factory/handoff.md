# Review 2 handoff

## What was done

- Performed the requested adversarial first-read QA review without changing product code.
- Added `.factory/review-2.md` with cold mobile/desktop, copy, demo, sandbox, claim, routing, accessibility, link, and identity evidence.
- Found one blocking issue: the landing page advertises `cargo install git-stage-lines`, but the package is not published on crates.io. The source install works.

## How verified

From a fresh clone at `/tmp/git-stage-lines-review-2-1tO13L`:

```sh
npm ci
npm run build
```

Every command listed in `.factory/claims.json` passed (18 claim IDs). Fresh browser checks covered 390px and desktop first screens, demo/reset, storage isolation, same-origin requests, offline reload, route history focus, 404, and axe serious/critical issues. The real CLI demo was run from a temporary caller directory.

The failed installation proof was:

```sh
cargo install git-stage-lines --version 0.1.0 --root /tmp/<fresh-dir>
# error: could not find git-stage-lines in registry crates-io with version =0.1.0
```

The working alternative was verified:

```sh
cargo install --git https://github.com/B-Divyesh/sf-git-stage-lines --root /tmp/<fresh-dir>
```

## Next step

Remove the unavailable registry install command or publish the crate and add a clean-install registered claim test. Review 2 remains **FAIL** until then.
