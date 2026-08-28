# Review 3 handoff

## Delivered

- Added `.factory/review-3.md`, an independent adversarial live and repository
  review. No product code was changed.
- Verdict: **FAIL** with eight findings. The blockers are three registered
  browser claim commands that fail from an unbuilt clean clone and tagged
  tests that do not assert all advertised line/text semantics.
- Confirmed that the live first screen, isolated demo, CLI temp-directory
  behavior, offline reload, storage/privacy behavior, routes, metadata, 404,
  back/focus handling, links, and distinct visual identity work.

## Verification performed

- Fresh live Chromium at 390×844 and 1440×900 before scrolling.
- Fresh clone `/tmp/git-stage-lines-review3-IVlJwu`: `npm ci`, then all 19
  `.factory/claims.json` test commands separately. Result: 16 pass, 3 fail.
- Built that clone with `npm run build:site` and confirmed the three browser
  claims then pass, isolating the missing prerequisite.
- `npm test` passed in the review working tree, including the release build
  and all 20 desktop/mobile Playwright tests.
- Ran the real `git-stage-lines --demo` binary from a changed temporary Git
  repository and confirmed the caller stayed unchanged.
- Intercepted live requests, inspected cookies/localStorage/sessionStorage/
  IndexedDB/OPFS, switched offline, crawled links, checked route metadata and
  focus, and ran Playwright axe in light and dark modes.

## Remaining work

Resolve F-3-1 through F-3-8 in `.factory/review-3.md`, then run every exact
claim command from a new unbuilt clone. Acceptance requires 19/19 commands,
complete observable assertions, no unlisted claim, zero copy flags, zero axe
violations, and 44×44px mobile targets.
