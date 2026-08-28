# Polish round 5 handoff

## Delivered

Repair commit: `ff18b2717312ac7255d78ee34320f8c808107499`.

- Corrected the browser-only demo reset announcement to **“Demo recording
  reset.”** It no longer claims that a repository was created in the browser.
- Strengthened `@claim:demo-entry` to assert that exact live-region status,
  output restoration, and output focus. The dynamic status is included in the
  copy audit and the claim sandbox now describes the assertion.
- Removed entrance opacity animation from all readable hero content. Only the
  decorative ceramic artwork reveals, at the documented 240ms duration. The
  Back-navigation test now asserts the hero text is fully opaque before it
  performs axe.
- Updated the catalog description to a verb-first, 76-character sentence.
- Preserved the existing recorded browser demo, real `--demo` temporary-repo
  path, claims register, routed legal pages, designed 404, privacy posture,
  mobile treatment, and glacial-ceramic visual identity.

## Verification

- `npm ci && npm test` passed after the final motion change: 6 Rust unit
  tests, 7 real-Git integration tests, 1 doctest, Node and Python wrapper
  tests, all 19 claim tests, and 22 desktop/mobile Playwright tests.
- Release checks passed: `cargo fmt --check`,
  `cargo clippy --all-targets -- -D warnings`, `cargo package --allow-dirty`,
  `npm pack --dry-run ./wrappers/node`, and a Python sdist/wheel build in
  `/tmp/gsl-polish5-pybuild`.
- Fresh clone `/tmp/gsl-polish5-clean-4rq13q/repo`: after only `npm ci`, every
  exact `test` string from all 19 `.factory/claims.json` entries exited 0.
  This includes the self-building browser demo, privacy, and offline claims.
- Static deployment succeeded as Azure Static Web Apps deployment
  `e05b9d4a-e7f1-41ff-8876-655fe398b60d` at
  <https://git-stage-lines.sociobot.in/>.
- Cold live audit evidence is in `/tmp/gsl-polish5-live-j7oSUZ/`:
  [live audit](/tmp/gsl-polish5-live-j7oSUZ/live-audit.json),
  [desktop home](/tmp/gsl-polish5-live-j7oSUZ/live-home-desktop.png), and
  [mobile demo](/tmp/gsl-polish5-live-j7oSUZ/live-demo-mobile-cold.png). It
  confirmed immediate hero opacity `1`, the truthful reset status, same-origin
  requests, empty user storage, direct `?demo=1`, all route metadata, 404,
  zero axe violations in both themes, 44px mobile targets, no overflow, and
  offline reloads for `/`, `/demo/`, `/privacy/`, and `/terms/`.
- `verify-url.sh` passed for each public route with zero console errors and
  confirmed title, lang, one H1, main landmark, and image alternatives. Mobile
  Lighthouse report
  [lighthouse-retry.json](/tmp/gsl-polish5-live-j7oSUZ/lighthouse-retry.json)
  scored Performance 99, Accessibility 100, Best Practices 100, and SEO 100;
  LCP was 1.08s and CLS was 0.

## Run and deploy

```sh
npm ci
npm test
npm run build
cargo run -- --demo
/opt/fleet/lib/deploy-static.sh git-stage-lines dist/site
```

## Known gaps and next steps

No product, claim, accessibility, routing, privacy, or deployment gaps remain.
The CLI package is ready for factory-controlled registry publication; do not
publish it from this repository worker.

## Review 6 handoff

Independent review completed; `.factory/review-6.md` is committed with a PASS
verdict. No product code, dependencies, deployment configuration, or live
service changed in this work order.

- Fresh clone: `/tmp/gsl-review6-tlC8I0/repo`; setup was `npm ci` only.
- Every one of the 19 exact `.factory/claims.json` commands passed separately
  under `set -e`.
- `npm test` passed in that clone. It covered Rust units/integrations/doctest,
  Node/Python wrappers, claims, production site build, and 22 Playwright tests;
  `test-results/.last-run.json` recorded `passed` with no failed tests.
- Cold live Chromium checks at 390×844 and 1440×1000 confirmed first-read
  clarity, demo/reset/focus, same-origin requests, empty user storage, offline
  public routes, no console errors, zero axe violations, 44px mobile controls,
  route focus, metadata, link crawl, and designed HTTP 404.
- The real CLI `--demo` ran from an unrelated changed caller repository,
  created a separate temporary sample repository, and left caller state intact.

Run locally with `npm ci`, `npm test`, `npm run build`, and
`cargo run -- --demo`. No known product, claims, privacy, accessibility,
routing, copy, or deployment gaps remain. Preserve the recorded-browser-demo
and isolated-CLI-demo distinction in future changes.
