# Handoff — perfection loop round 1

## Outcome

All blocking findings in `.factory/review-1.md` are resolved at clean-clone
commit `74cdedb01ce2aa11fca640183ccc15c8e7d68237`.

- The first screen names the job and audience, then offers **Try it with sample
  data** beside a plain isolation note.
- `git-stage-lines --demo` creates a unique temporary repository from the
  shipped `examples/` files, stages lines 5 and 10, leaves one change unstaged,
  and prints the repository path.
- `/?demo=1` enters the real `/demo/` route. Its persistent banner includes
  **Reset demo** and **Start for real**.
- `.factory/claims.json` registers 18 visitor-facing claims. Each ID appears in
  exactly one `@claim:<id>` test.
- `/demo/`, `/privacy/`, `/terms/`, and the 404 have distinct titles,
  descriptions, canonicals, social metadata, shared navigation, and footers.
- Route changes and browser history focus the destination H1 and announce it.
- Unknown paths return the designed 404 with HTTP 404 under the production
  configuration and the test server.
- Mobile layouts stack the hero, demo controls, boundaries, terminal, and
  footer without horizontal overflow at 390px.
- The service worker precaches the complete built shell, including hashed JS
  and CSS, and uses HTML fallback only for navigation requests.

## Exact verification evidence

Clean clone: `/tmp/git-stage-lines-clean-lz2MzX` at
`74cdedb01ce2aa11fca640183ccc15c8e7d68237`.

- Every command in `.factory/claims.json`: **18/18 passed individually**.
  Per-claim output is in `/work/.evidence/claim-<id>.log`.
- `npm test`: **passed** — 6 Rust unit tests, 7 real-Git integration tests,
  1 doctest, Node and Python wrapper tests, 15 CLI claim tests, and 18
  Playwright checks across desktop and mobile.
- Browser coverage: one-click demo/reset, direct routes, reload, Back/H1 focus,
  HTTP 404, 390px overflow, console errors, same-origin privacy, empty cookie/
  local/session/IndexedDB/OPFS state, service-worker offline reloads, and axe.
- Axe serious/critical findings: **0** on home, demo, privacy, terms, and 404.
- `npm run build`: **passed**; release binary and `dist/site/` produced.
- Initial built JS: **3.61 KB (1.62 KB gzip)**. CSS: **14.96 KB (4.30 KB
  gzip)**. No webfonts. Desktop hero: 40.8 KB; mobile hero: 12.7 KB.
- Lighthouse 13 mobile: **Performance 100, Accessibility 100, Best Practices
  100, SEO 100**. LCP 1.1 s, CLS 0, total blocking time 0 ms. JSON evidence:
  `/work/.evidence/lighthouse.json`.
- Factory URL verifier: **passed** with title, `lang=en`, one H1, main landmark,
  image alt text, labeled buttons, and zero console errors. Evidence:
  `/work/.evidence/local-verify/verify.json`.
- `cargo fmt --check`: **passed**.
- `cargo clippy --all-targets -- -D warnings`: **passed**.
- `cargo package --allow-dirty`: **passed**, including archive compilation.
- `npm pack --dry-run ./wrappers/node`: **passed**.
- Python sdist and wheel build in a fresh virtual environment: **passed**.
- Manual screenshots reviewed at 1440px and 390×844 for home and demo.

## Run and verify

```sh
npm ci
npm test
npm run build
npm run test:claims
cargo run -- --demo
```

To run one registered claim, copy its `test` command from
`.factory/claims.json`.

## Deployment

Static build command: `npm ci && npm run build:site`.
Artifact directory: `dist/site`.
Target: <https://git-stage-lines.sociobot.in>.

## Known gaps and next steps

No known blocking or high-severity findings remain. Registry publishing stays
with the factory; no package was published from this worker.
