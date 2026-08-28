# Polish round 4 handoff

## Delivered

- Repaired Review 4 F-4-1: the first action now accurately says **“Shows a
  recorded sample run. Your files stay unchanged.”** The `/demo/` metadata,
  page label, isolation explanation, `demo-entry` claim, and claim assertion
  now consistently distinguish the browser recording from CLI `--demo`, which
  creates the temporary repository.
- Repaired Review 4 F-4-2: `.factory/demo.md` now calls the exit action
  **“View installation steps”**, matching the real control.
- Added route-description regression coverage and refreshed the claim/copy
  audit/catalog records. The catalog line is verb-first and 66 characters:
  “Stage selected Git lines from scripts without interactive prompts.”
- Preserved the glacial-ceramic visual system and the CLI/static-site artifact
  class. No analytics, CDN assets, account flow, or runtime AI feature was
  introduced.

## Source and deployment

The deployed repair source is
`a6e9c791a88930ed975d393fded7e2a0c2982919` (`92b9fb3` plus `a6e9c79`). It
was pushed to `origin/main`, built with the work-order command
`npm ci && npm run build:site`, and deployed with:

```sh
/opt/fleet/lib/deploy-static.sh git-stage-lines dist/site
```

The Azure Static Web App upload succeeded (deployment id
`51827d55-8dfd-404b-a5df-fe196b979efc`) at
<https://git-stage-lines.sociobot.in/>.

## Verification

- Fresh clone `/tmp/gsl-polish4-clean-tYQlRO`: after only `npm ci`, every one
  of the 19 exact `.factory/claims.json` commands passed. Evidence:
  `/tmp/gsl-polish4-clean-claims.log` (19 claim sections, 19 `EXIT 0` lines).
- `npm test` passed: 6 Rust unit tests, 7 real-Git integration tests, 1
  doctest, Node/Python wrapper tests, 16 CLI claim tests, and 22 browser tests.
  Evidence: `/tmp/gsl-polish4-npm-test.log`.
- `npm run build` (release CLI plus static site), `cargo fmt --check`,
  `cargo clippy --all-targets -- -D warnings`,
  `cargo package --allow-dirty`, `npm pack --dry-run ./wrappers/node`, and
  `python -m build wrappers/python` all passed.
- Live `verify-url.sh` passed for `/` and `/demo/` with no console errors,
  `lang=en`, a title, one h1/main landmark, and no missing image alt text.
  Evidence: `/tmp/gsl-polish4-live/home/verify.json` and
  `/tmp/gsl-polish4-live/demo/verify.json`.
- A fresh live Playwright + axe audit passed: truthful first-screen copy,
  one-click and direct `?demo=1`, demo banner/reset focus, no cookies/local or
  session storage/IndexedDB/OPFS, same-origin requests, route titles/H1s,
  designed HTTP 404, zero axe violations in light and dark themes, no 390px
  overflow, 44px visible controls, and offline reloads of `/`, `/demo/`,
  `/privacy/`, and `/terms/`. Evidence:
  `/tmp/gsl-polish4-live/live-audit.json`,
  `/tmp/gsl-polish4-live/live-home-mobile.png`, and
  `/tmp/gsl-polish4-live/live-demo-mobile.png`.
- Live Lighthouse (mobile) scored Performance 100, Accessibility 100, Best
  Practices 100, SEO 100; LCP 0.9 s and CLS 0. Evidence:
  `/tmp/gsl-polish4-live/lighthouse-retry.json`.

## Run and release

```sh
npm ci
npm test
npm run build
cargo run -- --demo
```

To prepare the published packages without publishing them, use
`cargo package`, `npm pack ./wrappers/node`, and `python -m build
wrappers/python`. The factory owns registry credentials.

## Remaining work

None. All findings in Reviews 1–4 are mapped in `.factory/polish-4.md` and
were rechecked on the deployed site.
