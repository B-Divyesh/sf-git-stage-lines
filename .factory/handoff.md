# Handoff — git-stage-lines review 1

Completed the requested adversarial first-read QA review without modifying product code. The review is in .factory/review-1.md.

## Result

**FAIL.** Blocking issues are: no audience/safe first action on the first screen, no isolated CLI sample demo, no .factory/claims.json or tagged claim tests, and /demo/unknown URLs serving the home page instead of their routes.

## Verification performed

- Cold live-site checks in fresh 390px and desktop Chromium contexts.
- Direct checks of /demo, ?demo=1, legal routes, unknown route, metadata, local/session storage, service-worker cache, offline reload, and visible home-page links.
- CLI --demo and demo checks in a new temporary directory.
- npm ci && npm test from a fresh local clone; it passed but does not include required claim-tagged demo tests.

## Remaining work

Implement the concrete B1–B4 fixes and all high/copy/structure findings in the review, then rerun this review from a clean clone and an actual isolated demo entry point. No deployment or product changes were made by this review.
