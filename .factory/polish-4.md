# Polish round 4 — closure record

Repair source deployed: `a6e9c791a88930ed975d393fded7e2a0c2982919`
(`92b9fb3` repaired the demo copy; `a6e9c79` added metadata regression
coverage). The static work-order build was deployed to
<https://git-stage-lines.sociobot.in/>.

## Evidence used throughout

- Clean clone `/tmp/gsl-polish4-clean-tYQlRO`: all 19 exact commands from
  `.factory/claims.json` passed after `npm ci`; full output:
  `/tmp/gsl-polish4-clean-claims.log`.
- Full local suite: `/tmp/gsl-polish4-npm-test.log` — Rust 6 unit tests, 7
  real-Git integration tests, 1 doctest, Node/Python wrapper tests, 16 CLI
  claim tests, and 22 desktop/mobile browser tests passed.
- Live browser audit: `/tmp/gsl-polish4-live/live-audit.json`; screenshots:
  `/tmp/gsl-polish4-live/live-home-mobile.png`,
  `/tmp/gsl-polish4-live/live-demo-mobile.png`.
- Live base checks: `/tmp/gsl-polish4-live/home/verify.json` and
  `/tmp/gsl-polish4-live/demo/verify.json`. Lighthouse:
  `/tmp/gsl-polish4-live/lighthouse-retry.json`.

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| Review 1 B1 | Kept the task-led headline, named developers and coding agents, and made the truthful sample-recording action primary. | `@claim:demo-entry`; `live-home-mobile.png`; live `/`. |
| Review 1 B2 | Kept `?demo=1` → `/demo/`, the persistent no-save banner, reset focus, self-hosted recording, bundled `--demo`, and fresh CLI temp repositories. | `@claim:demo-entry`, `@claim:demo-isolation`; `live-demo-mobile.png`; live `/?demo=1`. |
| Review 1 B3 | Kept the 19-entry claim register and one tagged observable test per entry. | 19/19 exact clean-clone commands in `gsl-polish4-clean-claims.log`. |
| Review 1 B4 | Kept direct demo/legal routes, route-specific metadata, h1 focus behavior, and HTTP 404 recovery. | `direct routes have unique metadata and unknown routes return the designed 404`; live audit. |
| Review 1 H1 | Kept every visitor-facing operational/privacy/scope claim tied to a manifest entry; changed the browser-demo claim to say “recorded”. | `claims.json`; 19/19 claim run; live audit network/storage check. |
| Review 1 C1 | Kept “Stage exact Git lines from a script” and the stated audience. | Copy audit; live `/`. |
| Review 1 C2 | Kept direct wording for prompts and selected lines; removed the old choreography/glaze metaphors. | Copy audit; live `/`. |
| Review 1 C3 | Kept result-naming sample action and “Sample command builder”. | `@claim:demo-entry`; range-builder browser test. |
| Review 1 C4 | Kept operation-led mechanics headings and plain Git explanation. | Copy audit; live `/`. |
| Review 1 C5 | Kept plain addition/deletion line guidance before the reference table. | `@claim:line-number-semantics`; live `/`. |
| Review 1 C6 | Kept literal installation language and one Git-source install path. | `@claim:install-from-git`; `installation copy uses the verified Git-source command`. |
| Review 1 C7 | Kept the coding-agent section focused on one JSON result. | `@claim:json-output`; live `/`. |
| Review 1 C8 | Kept outcome-led copy and a factual footer. | Copy audit; live `/`. |
| Review 1 C9 | Kept the unavailable archive/registry promise removed. | `@claim:install-from-git`; live `/`. |
| Review 1 C10 | Kept short, separate exit-code sentences. | `@claim:exit-codes`; README audit. |
| Review 1 C11 | Kept result-naming copy controls. | Browser accessibility suite; live audit. |
| Review 1 structure | Kept common header/footer, metadata, canonical/OG assets, robots/sitemap, legal links, focus, and designed 404. | Route/metadata browser test; live audit; `verify-url.sh`. |
| Review 2 B1 | Kept only the tested Git-source Cargo install command. | `@claim:install-from-git`; clean-clone log. |
| Review 2 M1 | Kept plain descriptions of Git preparation and comparison. | Copy audit; live `/`. |
| Review 2 M2 | The visible and documented exit now consistently says “View installation steps”. | `@claim:demo-entry`; `.factory/demo.md`; live `/demo/`. |
| Review 3 F-3-1 | Kept self-building Playwright claim commands, so an unbuilt clone works after only `npm ci`. | All three browser claim commands and all 19 manifest commands passed from the clean clone. |
| Review 3 F-3-2 | Kept tagged assertions for minus-prefixed unstage deletions and exact LF-normalized filtered text. | `@claim:line-number-semantics`, `@claim:text-safety`; clean-clone log. |
| Review 3 F-3-3 | Kept the untestable “No account” claim removed. | Copy audit; live home audit rejects no unlisted account claim. |
| Review 3 F-3-4 | Kept “File path in the repository” on the command builder. | `range builder reports errors and updates a valid command`; live `/`. |
| Review 3 F-3-5 | Kept “working file” as the one explanatory term. | Copy audit terminology table; live `/`. |
| Review 3 F-3-6 | Kept plain last-commit, JSON, file-conversion, and scope wording. | Copy audit; `@claim:text-safety`; `@claim:json-output`. |
| Review 3 F-3-7 | Kept the package facts out of a nested complementary landmark and retained axe checks across every route/theme. | `every public page has no axe accessibility violations in light or dark mode`; live audit reports zero violations. |
| Review 3 F-3-8 | Kept 44px minimum link/control hit areas and the 390px measurement test. | `every visible mobile control has a 44px touch target`; live audit; mobile screenshots. |
| Review 4 F-4-1 | Replaced the false action note with “Shows a recorded sample run. Your files stay unchanged.” Rewrote demo metadata/isolation copy to distinguish the browser recording from CLI `--demo`; updated the claim and assertion. | `@claim:demo-entry`; `live-home-mobile.png`; `live-demo-mobile.png`; live `/?demo=1`. |
| Review 4 F-4-2 | Replaced stale “Start for real” in the demo contract with “View installation steps”. | `.factory/demo.md`; `@claim:demo-entry`; live `/demo/`. |

## Final live result

In a fresh browser context, the first screen has the job, audience, truthful
sample action, action note, and three facts at 390px without overflow. One
click and direct `?demo=1` both enter the resettable recording; the recording
does not read repositories or store user data, while CLI `--demo` is documented
as the separate temporary-repository execution path. The live audit checked
the landing, demo, Privacy, Terms, and 404 pages in light and dark treatments;
it found no console errors or axe violations, and verified 44px targets, route
titles/H1s, offline reloads, and the HTTP 404 response.
