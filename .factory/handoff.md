# Review 4 handoff

## Delivered

- Wrote the independent adversarial review in `.factory/review-4.md`.
- Did not modify product code, assets, tests, deployment configuration, or
  claims. This handoff and the review are the only intended repository changes.

## Verification

- Fresh live Chromium checks at 390×844 and 1440×900 confirmed the first-screen
  task, audience, and action; zero horizontal overflow; realistic demo output;
  reset focus; same-origin traffic; empty cookies/local/session/IndexedDB/OPFS;
  all public routes reloading offline; valid metadata/routes/links; and zero
  axe violations in light and dark themes.
- Fresh clone `/tmp/git-stage-lines-review-4-TSnDjH`: after `npm ci`, all 19
  exact commands in `.factory/claims.json` passed. The actual `--demo` command
  was also run twice and left a prepared caller repository unchanged.
- In the review checkout, `npm test`, `npm run build`, and `git diff --check`
  passed.

## Remaining work

The review verdict is **FAIL** for two documentation/copy fixes:

1. The landing action says it “Runs a sample repository” although the browser
   action displays a recording. Describe the recording accurately and align the
   `demo-entry` claim wording.
2. `.factory/demo.md` still calls the demo exit control “Start for real”; the
   live/code label is “View installation steps”.

See `.factory/review-4.md` for exact quotes and rewrites. After those changes,
rerun the `demo-entry` claim command and the copy audit.
