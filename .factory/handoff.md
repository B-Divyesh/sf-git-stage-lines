# Handoff: git-stage-lines v0.1.0

Work order: `git-stage-lines-build-1`  
Completed: 2026-08-27  
Deploy directory: `dist/site/`

## What shipped

- A Rust 1.80+ / clap single binary exposed as both `git-stage-lines` and the
  Git subcommand `git stage-lines`.
- Exact positive new-side ranges (`12-18,40`) and negative old-side deletion
  ranges (`-20--24`), including whole-line pairing for replacements.
- Atomic multi-file index updates: the complete generated patch is checked
  before a single `git apply --cached` mutation.
- Symmetric `--unstage`, patch-printing `--dry-run`, stable `--json`, `-C`,
  actionable errors, and documented exit statuses.
- Git clean-filter normalization for CRLF and attributes, plus explicit
  rejection of binary/non-UTF-8 data, conflicts, ignored files, symlinks,
  submodules, unsafe paths, and unchanged/out-of-range selections.
- Typed, shell-free Node and Python agent wrappers.
- A Vite static documentation site with a local-only range lab, responsive
  light/dark ceramic visual system, generated WebP hero, designed focus/error/
  offline states, service-worker caching, privacy/terms/404 pages, and no
  runtime third parties, analytics, cookies, or storage beyond the cache.

## Line semantics

In stage mode, positive numbers refer to working-tree lines and minus-prefixed
numbers refer to index lines that were deleted. In unstage mode, positive
numbers refer to current-index lines and minus-prefixed numbers refer to
deleted `HEAD` lines. Every requested line must be changed or the full command
fails without touching the index.

## Verification

- `npm test`: pass.
  - Rust: 6 unit tests (including a deterministic 200-case mixed add/delete/
    replace + LF/CRLF matrix), 7 real-Git integration tests, and 1 doctest.
  - Wrappers: documented Node flow against a real repository and Python
    subprocess contract both pass.
  - Browser: 8 Playwright tests across desktop Chromium and Pixel 5, including
    axe serious/critical = 0, console/page errors = 0, keyboard skip path,
    form error announcements, legal navigation, and 390px overflow = 0.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173 .factory/evidence`:
  HTTP 200; title/lang/main present; exactly one h1; image alt complete;
  unlabeled buttons 0; console errors 0.
- Lighthouse 13.4.1 mobile against the production preview:
  Performance **100**, Accessibility **100**, Best Practices **100**, SEO
  **100**; FCP 0.9s, LCP 1.1s, CLS 0, TBT 0ms, Speed Index 0.9s.
- Production payload: initial JS 2.78KB (1.29KB gzip), CSS 12.21KB (3.74KB
  gzip), hero 40KB desktop / 13KB mobile, no webfont payload.
- `npm audit --omit=dev`: 0 vulnerabilities.
- `npm run build`: pass both in-place and from a clean `git archive`; produces
  `target/release/git-stage-lines` (783KB) and `dist/site/index.html` at the
  required static deploy root.
- Package checks: Cargo crate packaged and recompiled (69KB); Node `npm pack
  --dry-run` passed (1.2KB); Python sdist and universal wheel built (2.4KB
  each). No registry publication was attempted.

## Reproduce

```sh
npm ci
npm test
npm run build

cargo package --allow-dirty
npm pack --dry-run ./wrappers/node
python -m build wrappers/python
```

`cargo package --allow-dirty` is used after `npm ci` because Cargo reports
ignored files under `node_modules` as workspace changes in this environment;
the package's explicit include list contains only Rust sources, tests, and
project documentation.

## Asset provenance

The original 1536×1024 PNG, generator metadata, full prompt, palette, motion
policy, and licensing note are in `.factory/design.md` and `.factory/assets/`.
It was generated with the required `factory-image` deployment and locally
encoded to WebP. No stock or third-party visual assets are present.

## Known limits and next steps

- v0.1 deliberately handles regular UTF-8 text only; binaries, submodules,
  symlinks, merge-conflict stages, history rewriting, and interactive commit
  splitting are out of scope.
- Registry credentials belong to the factory. Publish the verified Cargo,
  npm-wrapper, and Python-wrapper packages, then create platform release
  archives/checksums from the release binary.
- The site’s Cargo command becomes immediately usable after that registry
  publication. Source installation already works.
