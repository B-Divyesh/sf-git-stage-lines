# Polish round 2 — git-stage-lines

Repair commit: `e07fc118641c1ced94005fc8269a9f97fae64796`.

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| Review 1 B1 / C1 | Replaced the first screen with the job-led headline, named developers and coding agents, and made the isolated sample the primary action. | `@claim:demo-entry`; `site/tests/site.spec.js` mobile check; `/tmp/gsl-polish-evidence/mobile-home-settled.png`. |
| Review 1 B2 | Shipped `--demo`, bundled sprint-board sample files, the direct `?demo=1` redirect, a self-hosted terminal recording, and resettable no-save banner. | `@claim:demo-isolation`, `@claim:demo-entry`, `@claim:site-private`; `/tmp/gsl-polish-evidence/mobile-demo-settled.png`. |
| Review 1 B3 / H1 | Added the claims registry and an observable tagged test for every visitor-facing operational, privacy, scope, wrapper, license, routing, and installation statement. | Fresh clone `/tmp/gsl-clean-41GbOd`; all 19 manifest commands passed in `/tmp/gsl-clean-claims.log`. |
| Review 1 B4 | Added real demo/legal/404 documents with route-specific metadata, canonical URLs, focus restoration, and a 404 response override. | `direct routes have unique metadata and unknown routes return the designed 404`; `keyboard path, legal routes, metadata, and history focus work`. |
| Review 1 C2–C8 | Rewrote the command builder, mechanics, install, agent, and CTA copy in direct task language. | `.factory/copy-audit.md`; browser semantics and mobile tests. |
| Review 1 C9 | Removed the unavailable release-archive promise; README now documents only an available source install route. | README installation section; `@claim:install-from-git`. |
| Review 1 C10–C11 | Split the exit-code copy and renamed copy controls to state their result. | README; `@claim:exit-codes`; `landing page is semantic and accessible`. |
| Review 2 B1 | Removed the false crates.io command and card. The page and README now show only `cargo install --git https://github.com/B-Divyesh/sf-git-stage-lines`; it is tested in a fresh temporary Cargo root. | `@claim:install-from-git` passed locally and in the clean clone; `installation copy uses the verified Git-source command`; `/tmp/gsl-polish-evidence/desktop-install.png`. |
| Review 2 M1 | Replaced internal “clean filters / patch engine” wording with plain explanation of Git preparing the file and comparing saved and edited versions. | `.factory/copy-audit.md`; `landing page is semantic and accessible`. |
| Review 2 M2 | Renamed the demo exit control to **View installation steps**. | `@claim:demo-entry`; `/tmp/gsl-polish-evidence/mobile-demo-settled.png`. |

## Verification

- Local release suite: `npm test` passed: 6 Rust unit, 7 Rust integration, 1 doctest, Node/Python wrapper tests, 16 CLI claim tests, production build, and 20 desktop/mobile Playwright tests.
- Release/package checks passed: `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`, `cargo package --allow-dirty`, `npm pack --dry-run ./wrappers/node`, and `git diff --check`.
- Fresh clone: `npm ci`, `npm run build`, then every `test` command in `.factory/claims.json` ran separately; 19/19 passed. Full log: `/tmp/gsl-clean-claims.log`.
- Mobile visual evidence: `/tmp/gsl-polish-evidence/mobile-home-settled.png` and `/tmp/gsl-polish-evidence/mobile-demo-settled.png`. The release preserves the glacial ceramic identity specified in `.factory/design.md`.

## Live check

- Deployed with the work-order static configuration: `npm ci && npm run build:site`, then `/opt/fleet/lib/deploy-static.sh git-stage-lines dist/site`. Azure Static Web Apps deployment `92e3ab30-bccd-4431-a9fd-3a439b9f6e3e` succeeded.
- Cold live audit at `https://git-stage-lines.sociobot.in/`: `/`, `/demo/`, `/privacy/`, and `/terms/` returned 200 with their expected route titles and H1s. `/not-a-real-route` returned 404 with “Find a valid page.” The direct `/?demo=1` entry redirected to `/demo/`, showed the banner and **View installation steps**, and Reset demo focused terminal output.
- Live storage was empty (`localStorage`, `sessionStorage`, cookies, IndexedDB); normal public routes had no console errors; axe reported no serious or critical violations on all five audited documents. Evidence: `/tmp/gsl-live-evidence-p47PPD/live-audit.json`, `/tmp/gsl-live-evidence-p47PPD/screenshot-desktop.png`, `/tmp/gsl-live-evidence-p47PPD/screenshot-mobile.png`, and `/tmp/gsl-live-evidence-p47PPD/live-demo-mobile.png`.
- Live Lighthouse: Performance 100, Accessibility 100, LCP 1.0 s, CLS 0. Evidence: `/tmp/gsl-live-lighthouse.json`.
