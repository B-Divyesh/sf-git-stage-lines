# Polish round 3 — git-stage-lines

Product repair commits: `a2151bc`, `a5b3b93`, and `ee202e0`.

The repair was deployed as Azure Static Web Apps deployment
`1deb317c-575e-44ef-ae6e-f7c52a60102c`. The cold live evidence is in
`/tmp/gsl-polish3-live/`; the final clean-clone claim log is
`/tmp/gsl-polish3-release-claims.log`.

## Finding map

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| Review 1 B1 | Kept the task-led headline, named developers and coding agents, and made the first-screen action the isolated sample. | `@claim:demo-entry`; `/tmp/gsl-polish3-live/live-home-desktop.png`; live `https://git-stage-lines.sociobot.in/` check. |
| Review 1 B2 | Kept the direct `?demo=1` entry, self-hosted sample recording, Reset demo, bundled `--demo`, and temporary-repository isolation. | `@claim:demo-entry`, `@claim:demo-isolation`; `/tmp/gsl-polish3-live/live-demo-mobile.png`; live demo/reset check. |
| Review 1 B3 | Kept the claims register and made every browser claim command build its routed static site from an unbuilt clone. | All 19 manifest commands: `/tmp/gsl-polish3-release-claims.log`; live demo/privacy/offline checks. |
| Review 1 B4 | Kept real demo/legal documents, route metadata, heading focus, and the HTTP 404 override. | `direct routes have unique metadata and unknown routes return the designed 404`; live `not-a-real-route` returned 404. |
| Review 1 H1 | Kept all visitor-facing operational/privacy/license claims registered; removed the later unregistered account promise. | `.factory/claims.json`; final 19/19 log; live copy audit in `/tmp/gsl-polish3-live/live-audit.json`. |
| Review 1 C1 | Kept the direct task headline; the old “scriptable primitive” language remains absent. | `.factory/copy-audit.md`; live home screenshot. |
| Review 1 C2 | Kept direct command-builder/mechanics language; old choreography and decorative color wording remain absent. | `.factory/copy-audit.md`; live home check. |
| Review 1 C3 | Kept result-naming sample and copy actions. | `@claim:demo-entry`; live demo check. |
| Review 1 C4 | Kept operation-led mechanics headings. | `.factory/copy-audit.md`; live home check. |
| Review 1 C5 | Replaced remaining mixed working-file names and unexplained implementation wording with one term and plain outcomes. | `every public page has no axe accessibility violations in light or dark mode`; live copy assertions. |
| Review 1 C6 | Kept literal install wording and the tested Git-source install command. | `@claim:install-from-git`; live install section check. |
| Review 1 C7 | Kept the JSON-result section and simplified its wording to “print one JSON result.” | `@claim:json-output`; live home check. |
| Review 1 C8 | Kept plain result-led CTAs. | `.factory/copy-audit.md`; live home check. |
| Review 1 C9 | Kept unavailable archive promises removed. | `@claim:install-from-git`; live install section check. |
| Review 1 C10 | Kept short exit-code copy and its observable status-code test. | `@claim:exit-codes`; README audit. |
| Review 1 C11 | Kept result-naming copy controls. | `range builder reports errors and updates a valid command`; live home check. |
| Review 1 structure failures | Kept route-specific titles/canonicals, legal links, common chrome, focus restoration, favicon/social assets, and designed 404. | Browser route/focus test; `verify-url.sh`; live audit JSON. |
| Review 2 B1 | Kept only the verified Git-source Cargo installation path. | `@claim:install-from-git`; live install section. |
| Review 2 M1 | Kept plain explanations of Git preparation and comparison. | `.factory/copy-audit.md`; live home check. |
| Review 2 M2 | Kept the explicit “View installation steps” demo exit. | `@claim:demo-entry`; live demo screenshot. |
| F-3-1 | Playwright’s web server now runs `npm run build:site` and browser specs are isolated from Node tests; each browser claim is self-contained. | Final clean clone ran all 19 exact manifest commands after only `npm ci`: `/tmp/gsl-polish3-release-claims.log`. |
| F-3-2 | Extended `@claim:line-number-semantics` to unstage one minus-prefixed deleted last-commit line; extended `@claim:text-safety` to assert exact LF-normalized index bytes. | Both named claim tests passed in the final clean-clone log and `npm test`. |
| F-3-3 | Removed “No account” and the related untested terms wording rather than leave an unregistered account claim. | `.factory/copy-audit.md`; live audit asserts old copy is absent. |
| F-3-4 | Renamed the builder label to “File path in the repository.” | `range builder reports errors and updates a valid command`; live audit assertion and home screenshot. |
| F-3-5 | Standardized explanatory copy, labels, table, alt text, README, and CLI help on “working file.” | `.factory/copy-audit.md`; live audit rejects old terms. |
| F-3-6 | Rewrote deleted-last-commit, JSON, file-conversion, and scope wording in plain language. | `.factory/copy-audit.md`; live audit assertions; `@claim:text-safety` and `@claim:json-output`. |
| F-3-7 | Replaced the nested `aside` with a normal package-facts block; added zero-violation axe checks for every route in light and dark themes. | `every public page has no axe accessibility violations in light or dark mode`; live audit reports zero axe violations. |
| F-3-8 | Made all links 44×44px minimum hit areas and added a 390px measurement test for all visible links, buttons, and inputs. | `every visible mobile control has a 44px touch target`; `/tmp/gsl-polish3-live/screenshot-mobile.png`; live audit target check. |
| Verification low: service-worker shell cache | Generated service-worker assets include hashed JS/CSS and fall back to HTML only for navigations. | `@claim:offline-reload`; final clean-clone log; live four-route offline reload. |
| Verification low: cache/security headers | Preserved immutable asset caching, CSP, referrer policy, nosniff, and frame protection in `staticwebapp.config.json`. | Live `verify-url.sh`; live Lighthouse report; static config review. |

## Final evidence

- Full local suite: `npm test` passed: 6 Rust unit tests, 7 Git integration
  tests, 1 doctest, Node/Python wrapper tests, 16 CLI claim tests, and 22
  desktop/mobile browser tests.
- Quality/package checks passed: `cargo fmt --check`,
  `cargo clippy --all-targets -- -D warnings`, `cargo package --allow-dirty`,
  `npm pack --dry-run ./wrappers/node`, and Python sdist/wheel build.
- Clean clone: all 19 exact `.factory/claims.json` commands passed after only
  `npm ci`, with no manual static-site build.
- Live: `verify-url.sh` found no console errors and confirmed title, `lang`,
  one H1, main landmark, and image alt text. The full live audit confirmed
  storage/privacy, routes, metadata, 404, demo/reset focus, offline reload,
  zero axe violations in both themes, and 44px mobile targets.
- Live mobile Lighthouse: performance 100, accessibility 100, best practices
  100, SEO 100; LCP 0.91s and CLS 0. Evidence:
  `/tmp/gsl-polish3-live/lighthouse.json`.
