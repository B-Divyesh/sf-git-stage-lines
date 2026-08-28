# Review 5 handoff

## Delivered

- Completed a cold live review at 390×844 and 1440×1000 before scrolling.
- Audited every landing and README sentence plus headings, labels, controls,
  dynamic landing messages, terminology, and claim coverage.
- Ran all 19 exact `.factory/claims.json` commands separately after only
  `npm ci` in a fresh clone.
- Exercised the live browser demo, reset, storage isolation, same-origin
  network behavior, offline reloads, metadata, routing, Back/focus behavior,
  links, mobile sizing, and axe checks.
- Ran the real CLI demo twice from a changed temporary caller repository.
- Rechecked every finding from Reviews 1–4 against both live output and code.
- Wrote the evidence and verdict to `.factory/review-5.md`. No product code was
  modified.

## Verdict and remaining work

**FAIL.** Two blocking findings remain. F-5-1 reopens Review 4 F-4-1. After
**Reset demo**, the screen-reader live region says “Demo reset with a fresh
sample repository,” although the browser only restores a static recording.

Change that status to **“Demo recording reset.”**, assert the exact live-region
message in `@claim:demo-entry`, and add it to `.factory/copy-audit.md`.

F-5-2 records a reproducible `npm test` failure. The 480ms opacity entrance on
`.hero-copy` temporarily lowers key first-screen text below 4.5:1 contrast;
axe measured 3.65:1 in the failing mobile Back-navigation test and as low as
3.1:1 on an immediate live audit. Keep readable text fully opaque and limit
entrance motion to decorative content, then rerun the full gate.

## Verification evidence

- Fresh clone: `/tmp/gsl-review5-clean-CG2qKa`; all 19 registered commands
  exited 0.
- Cold screenshots and extracted first-screen text:
  `/tmp/gsl-review5-live-1KR0PC/first-mobile.png`,
  `/tmp/gsl-review5-live-1KR0PC/first-desktop.png`, and
  `/tmp/gsl-review5-live-1KR0PC/first-read.json`.
- Live audit: all public routes and the 404 had the expected title, H1,
  description, canonical, social image, favicon, no mobile overflow, and no
  sub-44px visible controls. Settled pages had no axe violations, but immediate
  home entrance had F-5-2. All crawled links returned 200; the unknown route
  returned 404. No normal-route console error occurred.
- Privacy/offline: demo requests were same-origin; cookies, local/session
  storage, IndexedDB, and OPFS were empty; all four visited routes reloaded
  offline. Cache Storage contained only `git-stage-lines-v2`.
- CLI isolation: two runs produced distinct
  `/tmp/git-stage-lines-demo-*` paths; caller `git status --porcelain=v1`
  remained ` M caller.txt`.
- Aggregate gate: `npm test` failed with 21 browser tests passed and 1 failed;
  the targeted mobile history/focus test reproduced the same serious contrast
  violation. `npm run build` passed and produced the release binary plus
  `dist/site`.

## Run and verify

```sh
npm ci
npm test
npm run build
cargo run -- --demo
```

The review artifacts should be committed together. Product repair and
deployment are intentionally outside this reviewer work order.
