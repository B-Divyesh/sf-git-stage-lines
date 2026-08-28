# Independent verification — PASS

Candidate: `ceee7043ff4590f926cb4cd77f4741088ff07426`  
Live URL: <https://git-stage-lines.sociobot.in/>  
Verified: 2026-08-28 UTC (`git-stage-lines-verify-1`)

## Verdict

**PASS.** The candidate satisfies the researched v1 CLI contract, and all
checked live deployment files match the candidate production build exactly.
No blocking defects were found; two low-severity hardening items follow.

## Evidence

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 0 npm vulnerabilities reported. |
| `npm test` | PASS: 6 Rust units, 7 real-Git integrations, 1 doctest, Node/Python wrapper tests, 8 Playwright tests. |
| `npm run build` | PASS; release binary and `dist/site/` produced. |
| `cargo fmt --check` | PASS. |
| `cargo clippy --all-targets -- -D warnings` | PASS. |
| `cargo package --allow-dirty` | PASS; package compiled from its archive. |
| Node/Python packaging | PASS: Node pack dry-run; Python sdist/wheel in a fresh verifier venv. |
| Lighthouse 13.4.1 | PASS: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.10 s, CLS 0, TBT 11.5 ms. |

Release-binary tests in a new Git repository staged exact mixed new-side and
old-side selections, preserved the worktree, verified `--dry-run` index
immutability, selectively unstaged one line, rejected zero/backward/unmatched
selectors with exit 2, rejected binary content with exit 1 and no mutation,
and exercised `git stage-lines` discovery. Clean consumers installed and used
both the packed Node wrapper and built Python wheel successfully.

Browser evidence: axe serious/critical findings = 0; console/page errors = 0;
keyboard skip path and visible 3 px focus ring work; reduced motion disables
the reveal animation; desktop and 390 px views have no horizontal overflow.
Runtime requests were same-origin only. There are no runtime CDN assets,
analytics, cookies, local/session storage, or telemetry; Cache Storage is the
documented service-worker persistence. A controlled live session activated and
updated the service worker and successfully reloaded `/` offline.

Built payloads: JS 2.78 KB (1.29 KB gzip), CSS 12.21 KB (3.74 KB gzip), mobile
hero 12.7 KB, desktop hero 40.8 KB, no webfonts. SHA-256 of live `/`, hashed
JS/CSS, both hero assets, `sw.js`, Privacy, and Terms exactly matched `dist/site/`.
Homepage SHA-256: `b60b8454b50053c320ff76b892436c55f08a4cce82ffafbff8d73d3ed69426ff`.
Live responses include HSTS, strict referrer policy, and `nosniff`.

## Defects by severity

### Low — PWA shell cache is incomplete

`sw.js` precaches documents/images but not hashed JS/CSS and uses the HTML shell
as a generic failed-GET fallback. Live offline reload passed using retained HTTP
cache. Under the same worker in no-cache Vite preview, offline reload returned
HTML for the module URL and logged a strict-MIME error. Precache JS/CSS and
limit the HTML fallback to navigations.

### Low — deploy cache/security headers can be stronger

Hashed assets use `Cache-Control: public, must-revalidate, max-age=30`, not
immutable long-lived caching. The host also sends no CSP or clickjacking policy.
No functional or privacy failure was observed; immutable caching and a static
CSP are recommended hardening.

## Reproduce

```sh
npm ci && npm test && npm run build
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo package --allow-dirty
npm pack --dry-run ./wrappers/node
python3 -m venv /tmp/gsl-qa-venv
/tmp/gsl-qa-venv/bin/pip install build
/tmp/gsl-qa-venv/bin/python -m build wrappers/python
```
