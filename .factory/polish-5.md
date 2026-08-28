# Polish round 5 — cumulative closure

Repair commit: `ff18b2717312ac7255d78ee34320f8c808107499`.
Deployment: Azure Static Web Apps `e05b9d4a-e7f1-41ff-8876-655fe398b60d`.

All evidence below was rechecked on the deployed cold site at
<https://git-stage-lines.sociobot.in/>. Shared live evidence:
`/tmp/gsl-polish5-live-j7oSUZ/live-audit.json`,
`live-home-desktop.png`, and `live-demo-mobile-cold.png` in that directory.

| Finding ID | Change made or retained | Evidence |
| --- | --- | --- |
| Review 1 B1 | Retained the task-led headline, named developers and coding agents, primary sample action, accurate recording note, and three facts. | Live `/` first-screen audit; `@claim:demo-entry`; `live-home-desktop.png`. |
| Review 1 B2 | Retained direct `?demo=1` routing, browser recording/banner/reset, bundled realistic sample, and real isolated `--demo` temporary repositories. | `@claim:demo-entry`; `@claim:demo-isolation`; live `/demo/` reset and storage audit. |
| Review 1 B3 | Retained the 19-entry claims register and exactly one tagged observable test for every listed claim. | All 19 exact manifest commands passed from `/tmp/gsl-polish5-clean-4rq13q/repo`. |
| Review 1 B4 | Retained direct demo/legal documents, route-specific metadata, H1 focus behavior, and designed HTTP 404. | Browser route suite; live `/demo/`, `/privacy/`, `/terms/`, and `/not-a-real-route` audit. |
| Review 1 H1 | Retained claim coverage for visitor-facing product/privacy/scope/license statements; the reset status is now covered by `demo-entry`. | `.factory/claims.json`; `@claim:demo-entry`; copy audit. |
| Review 1 C1 | Retained “Stage exact Git lines from a script” and the stated audience. | Live `/`; `live-home-desktop.png`. |
| Review 1 C2 | Retained direct prompt/selected-line wording; the old metaphors remain absent. | `.factory/copy-audit.md`; live `/`. |
| Review 1 C3 | Retained result-naming sample and command-builder actions. | `@claim:demo-entry`; range-builder browser test. |
| Review 1 C4 | Retained operation-led mechanics headings. | Copy audit; live `/`. |
| Review 1 C5 | Retained plain addition/deletion guidance and consistent “working file” terminology. | `@claim:line-number-semantics`; copy audit. |
| Review 1 C6 | Retained literal, tested Git-source installation wording. | `@claim:install-from-git`; live install section. |
| Review 1 C7 | Retained the JSON-result explanation for coding agents. | `@claim:json-output`; live `/`. |
| Review 1 C8 | Retained outcome-led calls to action and factual factory footer. | Copy audit; live `/`. |
| Review 1 C9 | Retained removal of unavailable archive/registry promises. | `@claim:install-from-git`; install browser test. |
| Review 1 C10 | Retained short, separate exit-code statements. | `@claim:exit-codes`; README audit. |
| Review 1 C11 | Retained result-naming copy controls. | Browser accessibility suite; live `/`. |
| Review 1 structure: social/route metadata | Retained canonical, OG/Twitter, favicon/touch assets, titles, descriptions, sitemap, and robots. | `direct routes have unique metadata`; live route audit. |
| Review 1 structure: chrome/focus/404 | Retained common header/footer, skip link, legal links, H1 focus restoration, deep links, and 404 recovery. | `keyboard path, legal routes, metadata, and history focus work`; live 404 check. |
| Review 2 B1 | Retained the sole verified Git-source Cargo command; no crates.io claim remains. | `@claim:install-from-git` in clean clone; live install section. |
| Review 2 M1 | Retained plain Git preparation/comparison language instead of filter/engine jargon. | Copy audit; live mechanics section. |
| Review 2 M2 | Retained **View installation steps** as the named demo exit. | `@claim:demo-entry`; live `/demo/`; `.factory/demo.md`. |
| Review 3 F-3-1 | Retained self-building Playwright claim commands from an unbuilt clone. | Fresh-clone browser claim commands passed after only `npm ci`. |
| Review 3 F-3-2 | Retained tagged assertions for deleted-line unstage semantics and normalized LF index text. | `@claim:line-number-semantics`; `@claim:text-safety`. |
| Review 3 F-3-3 | Retained removal of the untestable account claim. | Copy audit; landing live check. |
| Review 3 F-3-4 | Retained the correct “File path in the repository” label. | Range-builder browser test; live `/`. |
| Review 3 F-3-5 | Retained “working file” as the single explanatory term. | Copy terminology table; live pages/README audit. |
| Review 3 F-3-6 | Retained plain last-commit, JSON, file-conversion, and scope wording. | Copy audit; `@claim:text-safety`; `@claim:json-output`. |
| Review 3 F-3-7 | Retained the normal package-facts block and axe coverage for every route/theme. | `every public page has no axe accessibility violations in light or dark mode`; live axe 0. |
| Review 3 F-3-8 | Retained 44px interactive targets and 390px mobile measurement coverage. | `every visible mobile control has a 44px touch target`; live mobile audit. |
| Review 4 F-4-1 | Retained truthful first-action language: it shows a recorded sample, while only CLI `--demo` creates a temporary repository. | `@claim:demo-entry`; live `?demo=1`; first-screen audit. |
| Review 4 F-4-2 | Retained matching demo contract and visible **View installation steps** label. | `.factory/demo.md`; live `/demo/`. |
| Review 5 F-5-1 / reopened F-4-1 | Changed the browser reset live-region text to **“Demo recording reset.”** and asserted it exactly in `@claim:demo-entry`; audited the dynamic message. | `@claim:demo-entry`; live `live-audit.json` reports exact status and output focus. |
| Review 5 F-5-2 | Removed the hero-copy reveal class and narrowed animation CSS to `.hero-art.reveal` at 240ms; Back-navigation test now asserts hero opacity `1` before axe. | `keyboard path, legal routes, metadata, and history focus work`; full `npm test`; live first-screen opacity 1 and axe 0. |
| Verification low: service-worker cache | Retained route-aware generated worker cache and navigation-only fallback. | `@claim:offline-reload`; live offline audit of all four public routes. |
| Verification low: cache/security headers | Retained immutable assets plus CSP, referrer policy, nosniff, frame policy, and permissions policy. | `site/public/staticwebapp.config.json`; deployed route checks. |

## Final verification

- Full release suite: `npm test` passed after the final code change: 6 Rust
  units, 7 integrations, 1 doctest, Node/Python wrappers, 19 claims, and 22
  desktop/mobile browser tests.
- Clean clone: every exact `.factory/claims.json` command passed after only
  `npm ci` in `/tmp/gsl-polish5-clean-4rq13q/repo`.
- Package checks: format, clippy, Cargo package, npm pack dry-run, and Python
  sdist/wheel all passed.
- Cold production: `verify-url.sh` passed for all four public routes; all
  routes plus 404 had correct structure and metadata, no normal-route console
  errors, and zero axe violations in light and dark. The live audit confirmed
  direct demo routing/reset, same-origin network behavior, empty user storage,
  offline reload, 390px layout, and touch targets.
- Mobile Lighthouse report
  `/tmp/gsl-polish5-live-j7oSUZ/lighthouse-retry.json`: Performance 99,
  Accessibility 100, Best Practices 100, SEO 100; LCP 1.08s and CLS 0.
