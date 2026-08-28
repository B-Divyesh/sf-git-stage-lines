# Polish round 2 handoff

## Delivered

- Repair commit `e07fc118641c1ced94005fc8269a9f97fae64796` removes the unavailable crates.io installation promise. The site and README now document the tested Git-source command only.
- Added `install-from-git` to `.factory/claims.json` and an observable clean temporary-Cargo-root test that installs the command and verifies `git-stage-lines 0.1.0`.
- Rewrote the two remaining Git-internal mechanics sentences and changed the demo exit action to **View installation steps**.
- Updated the copy audit and verb-first catalog description. The ceramic/glacial visual system, isolated demo, legal routes, metadata, 404, offline support, and mobile layout remain intact.

## Verification evidence

From the working tree:

```sh
npm test
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo package --allow-dirty
npm pack --dry-run ./wrappers/node
git diff --check
```

All commands passed. `npm test` covered 6 Rust unit tests, 7 Rust integration tests, 1 doctest, both wrapper suites, 16 CLI claim tests, the site build, and 20 desktop/mobile Playwright checks (including axe serious/critical, keyboard/focus, routing/404, privacy, and offline reload).

Fresh clone evidence: `/tmp/gsl-clean-41GbOd` ran `npm ci`, `npm run build`, then all 19 exact commands from `.factory/claims.json`; all passed. The detailed output is `/tmp/gsl-clean-claims.log`.

Visual evidence: `/tmp/gsl-polish-evidence/mobile-home-settled.png`, `/tmp/gsl-polish-evidence/mobile-demo-settled.png`, and `/tmp/gsl-polish-evidence/desktop-install.png`.

## Deployment and final live check

Pushed `e07fc11` to `origin/main`, built `dist/site` with the work-order command, and deployed it with the factory static deployment helper. Azure Static Web Apps deployment `92e3ab30-bccd-4431-a9fd-3a439b9f6e3e` succeeded.

Cold live verification at `https://git-stage-lines.sociobot.in/` passed:

- the current page serves **Install from this repository** and no crates.io install command;
- `/?demo=1` reaches `/demo/`, has the no-save banner, reset control, and **View installation steps**;
- `/`, `/demo/`, `/privacy/`, and `/terms/` return 200 with expected title/H1; the missing route returns 404 with the designed page;
- normal public routes have no console errors; axe has no serious/critical violations; cookies, local/session storage, and IndexedDB are empty in the demo context;
- Lighthouse recorded Performance 100, Accessibility 100, LCP 1.0 s, and CLS 0.

Live artifacts are `/tmp/gsl-live-evidence-p47PPD/` and `/tmp/gsl-live-lighthouse.json`. There are no known gaps or deferred findings.
