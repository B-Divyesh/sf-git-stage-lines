# Adversarial first-read review 5 — git-stage-lines

**Verdict: FAIL.** Reviewed 2026-08-28 against
<https://git-stage-lines.sociobot.in> in fresh Chromium contexts at 390×844
and 1440×1000. Product code was not changed. Two blocking findings remain:
one false demo announcement and one reproducible accessibility/quality-gate
failure. All registered claim commands, routes, links, and CLI isolation
checks passed.

## First 30 seconds

Before scrolling, I understood this as a Git command that stages only the
changed line numbers named by a script. It is for developers and coding agents
that need a non-interactive alternative to `git add -p`. I should click
**Try it with sample data** first.

The first viewport at both widths contains the job-led headline, audience,
primary action, an accurate action note, and three facts. At 390px there is no
horizontal overflow; the artwork begins below the facts without hiding them.
This check passes.

## Findings, ordered by severity

### F-5-1 / reopened F-4-1 — BLOCKING — Reset falsely announces that the browser created a repository

**Exact quote/location:** after activating **Reset demo** on live `/demo/`, the
polite live region announces **“Demo reset with a fresh sample repository.”**
The same text is set in `site/src/main.js:81`.

**Evidence:** the browser reset assigns the original terminal-recording HTML
back to `#demo-output`; the HTML before and after reset was byte-for-byte
identical. The live page had no cookies, local/session storage, IndexedDB, or
OPFS entries. The real CLI `--demo` path separately created two distinct
`/tmp/git-stage-lines-demo-*` repositories and left a changed caller repository
untouched. The browser therefore resets a recording; it does not create a
fresh repository.

This is the same browser-execution ambiguity as Review 4 F-4-1. The visible
hero note was corrected, but the false behavior promise remained in the
screen-reader-only reset status, so that earlier finding was only partially
fixed. It is also an unlisted claim: `demo-entry` promises a resettable
**recorded** demo, and its test checks output and focus but never checks this
announcement.

**Why a first-time visitor is misled:** a screen-reader user is explicitly told
that Reset performed a real isolated repository operation that never happened.
That contradicts the page’s otherwise clear distinction between the browser
recording and CLI execution.

**Concrete fix:** change the announcement to **“Demo recording reset.”** Add an
assertion for that exact live-region text to `@claim:demo-entry`, and add the
dynamic message to `.factory/copy-audit.md`. Do not say “repository” in browser
reset feedback unless the browser actually provisions one.

### F-5-2 — BLOCKING — the entrance fade drops first-screen text below minimum contrast and fails `npm test`

**Exact location:** `.reveal { animation: reveal 480ms both; }` animates the
entire `.hero-copy` from `opacity: 0`. This includes the audience sentence,
action note, and three product facts.

**Evidence:** the required local `npm test` gate failed in the mobile
`keyboard path, legal routes, metadata, and history focus work` test. Axe
reported a serious `color-contrast` violation after Back navigation: the
muted hero text composited to `#74827e` on `#f3f5f2`, a 3.65:1 ratio instead
of 4.5:1. The targeted command reproduced the failure. On the deployed site,
an immediate audit after entering home measured `.hero-copy` opacity 0.02 and
contrast failures as low as 3.1:1. The same audit passes only after the 480ms
animation settles.

**Why a first-time visitor is lost:** key first-screen explanation and facts
briefly render too faint to meet the mandatory contrast floor. The failure is
especially relevant on a cold load or Back navigation—the exact first-read
states this review checks. It also means the repository’s required `npm test`
quality gate is red.

**Concrete fix:** do not animate opacity on text. Limit the entrance motion to
the decorative artwork, or animate a non-opacity property while keeping the
text at full contrast. Retain the reduced-motion rule, then require the mobile
history/focus test and full `npm test` to pass without inserting a wait for the
animation.

## Copy audit

Counts are whitespace-delimited. Code tokens and URLs count as one word each.
Executable code blocks are not sentences. Repeated navigation labels are
listed once. No landing or README sentence exceeds 22 words, contains a banned
marketing adjective, or uses inconsistent product terminology. All landing
buttons name their result. F-5-1 is on the demo route and is audited above.

### Landing page — every sentence

| Sentence | Words | Result |
| --- | ---: | --- |
| For developers and coding agents that need selected changes without `git add -p`. | 13 | Pass |
| Shows a recorded sample run. | 5 | Pass |
| Your files stay unchanged. | 4 | Pass |
| Use file line numbers for additions. | 6 | Pass |
| Use `-` plus the original line number for deletions. | 9 | Pass |
| Try `3-4,7` or a deletion such as `-2`. | 8 | Pass |
| Git prepares the file using its own rules, then applies the selected lines to the index. | 16 | Pass |
| It does not rewrite the working file. | 7 | Pass |
| Compare Git’s saved version with your working file. | 8 | Pass |
| Keep the requested additions, deletions, and paired replacements. | 8 | Pass |
| Validate one patch before updating the index. | 7 | Pass |
| A bad line, binary file, or conflict stops the full command before the index changes. | 15 | Pass |
| Either line selects the paired replacement. | 6 | Pass |
| The CLI runs Git locally. | 5 | Pass |
| It has no network calls. | 5 | Pass |
| Text files only. | 3 | Pass |
| Binary data is rejected without changing the index. | 8 | Pass |
| No history changes. | 3 | Pass |
| The command does not commit, rebase, or split commits. | 9 | Pass |
| Private site. | 2 | Pass |
| The site makes same-origin requests and uses no cookies, local storage, or session storage. | 14 | Pass |
| Git exposes the `git-stage-lines` executable as `git stage-lines`. | 8 | Pass |
| Pass `--json` to print one JSON result. | 7 | Pass |
| Stage selected Git lines from scripts. | 6 | Pass |
| Built by Param Factory · v0.1.0 | 5 | Pass |
| You’re offline. | 2 | Pass |
| The visited pages still work. | 5 | Pass |
| Enter at least one changed line. | 6 | Pass — dynamic error |
| “`<token>`” is not a line or range. | 7 | Pass — dynamic error |
| Ranges start at 1 and run from low to high. | 10 | Pass — dynamic error |
| Command copied to clipboard. | 4 | Pass — dynamic status |
| Copy failed. | 2 | Pass — dynamic error |
| Select the command and copy it manually. | 8 | Pass — dynamic recovery |

### Landing headings, labels, and controls

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to content / git-stage-lines | 3 / 1 | Pass |
| Demo / Install / Privacy / GitHub | 1 / 1 / 1 / 1 | Pass |
| Non-interactive Git staging | 3 | Pass |
| Stage exact Git lines from a script | 7 | Pass — task-led H1 |
| Try it with sample data | 5 | Pass — result-naming primary action |
| Stages selected changed lines / No prompts or network calls / Free under the MIT License | 4 / 5 / 5 | Pass |
| working file / selected range / index | 2 / 2 / 1 | Pass |
| Porcelain layers show selected lines moving from a working file into the Git index | 14 | Pass — descriptive image alternative |
| Sample command builder / Build a staging command | 3 / 4 | Pass |
| File path in the repository / Changed lines to stage / Your command | 5 / 4 / 2 | Pass |
| Copy staging command / Copied | 3 / 1 | Pass — action and completion state |
| working file / selected lines | 2 / 2 | Pass |
| How it works / Change only the index | 3 / 4 | Pass |
| Read the change / Select file lines / Check and apply | 3 / 3 / 3 | Pass |
| Line reference / Choose either side of a change | 2 / 6 | Pass |
| Line numbers in stage and unstage modes | 7 | Pass |
| Token / Stage / Unstage / Replacement | 1 / 1 / 1 / 1 | Pass |
| Working file lines / Current index lines / Deleted index lines / Deleted lines from the last commit (`HEAD`) | 3 / 3 / 3 / 7 | Pass |
| Scope and privacy / Keep the operation local | 3 / 4 | Pass |
| Install / v0.1.0 / Install one Git subcommand | 1 / 1 / 4 | Pass |
| Install from this repository / Copy install command | 4 / 3 | Pass — result-naming button |
| Package facts / Price / Free / Network calls / None / License / MIT | 2 / 1 / 1 / 2 / 1 / 1 / 1 | Pass |
| For coding agents / Read a JSON result / Command / Result | 3 / 4 / 1 / 1 | Pass |
| Run the sample first / See the staged lines | 4 / 4 | Pass |
| Primary navigation / Product facts / Example diff preview / Scrollable line-number reference table | 2 / 2 / 3 / 4 | Pass — accessible labels |
| Privacy / Terms / MIT license | 1 / 1 / 2 | Pass |

### README — every prose sentence, heading, and label

| Copy | Words | Result |
| --- | ---: | --- |
| git-stage-lines | 1 | Pass — title |
| Stage selected Git lines from scripts and coding agents without an interactive patch prompt. | 14 | Pass |
| The command changes the Git index and leaves the working file unchanged. | 12 | Pass |
| It is free under the MIT License and contains no network calls. | 12 | Pass |
| Try the isolated sample | 4 | Pass — heading |
| Every run creates a new repository under the system temporary directory. | 11 | Pass |
| It copies the files in `examples`, stages lines 5 and 10, and leaves one sample change unstaged. | 17 | Pass |
| The command prints the repository path for review. | 8 | Pass |
| The matching browser recording is at `https://git-stage-lines.sociobot.in/?demo=1`. | 7 | Pass |
| Reset demo restores the recording. | 5 | Pass |
| The page uses no cookies, local storage, or session storage. | 10 | Pass |
| Install | 1 | Pass — heading |
| Install directly from this repository with Cargo: | 7 | Pass |
| Git discovers the `git-stage-lines` executable as `git stage-lines`. | 8 | Pass |
| Use line ranges | 3 | Pass — heading |
| Positive numbers select changed lines in the working file. | 9 | Pass |
| Prefix a range with `-` to select deleted original lines. | 10 | Pass |
| Selecting either side of a replacement selects the paired replacement. | 10 | Pass |
| An invalid line rejects the command before the index changes. | 10 | Pass |
| Git’s file-conversion rules determine the text compared. | 7 | Pass |
| Binary data is rejected without changing the index. | 8 | Pass |
| Success exits `0`. | 3 | Pass |
| Bad arguments or unmatched lines exit `2`. | 7 | Pass |
| Other file or Git failures exit `1`. | 8 | Pass |
| Use typed wrappers | 3 | Pass — heading |
| The repository includes small Node and Python wrappers: | 8 | Pass |
| See `wrappers/node` and `wrappers/python`. | 4 | Pass |
| Develop and verify | 3 | Pass — heading |
| The static site is built with `npm run build:site` and deployed from `dist/site`. | 13 | Pass — repository instruction |
| See `.factory/claims.json` for claim-level commands and `.factory/demo.md` for isolation details. | 10 | Pass — repository instruction |
| Scope | 1 | Pass — heading |
| Version 0.1.0 supports ordinary text-file changes between the last commit, index, and working file. | 14 | Pass |
| It does not rewrite history, create commits, or stage binary data. | 11 | Pass |
| License | 1 | Pass — heading |
| MIT. | 1 | Pass |
| See `LICENSE`. | 2 | Pass |

The technical terms `index`, `HEAD`, and `git add -p` are appropriate for the
stated Git-developer audience and are explained by the surrounding line and
working-file language. The same concepts use `index`, `working file`,
`selected lines`, `deletion`, `demo`, and `JSON result` consistently.

## Demo and sandbox verification

- One click from the first screen and direct `/?demo=1` both reached `/demo/`.
  The first demo screen already showed a realistic `sprint-board.ts` run, two
  staged lines, and one intentionally unstaged follow-up line.
- The visible banner says **Demo — sample data, nothing is saved** and offers
  **Reset demo** and **View installation steps**. Reset restored the recording
  and focused `#demo-output`. Its inaccurate live announcement is F-5-1.
- The complete live demo flow made only same-origin requests. Cookies,
  local/session storage, IndexedDB, and OPFS remained empty. Cache Storage held
  only the public service-worker cache `git-stage-lines-v2`.
- After a first visit, `/`, `/demo/`, `/privacy/`, and `/terms/` each reloaded
  offline with the expected H1.
- Two real `cargo run -- --demo` runs created distinct temporary repositories
  and left a deliberately changed caller repository unchanged.

## Claims verification

Fresh clone: `/tmp/gsl-review5-clean-CG2qKa`. Setup was `npm ci` only. Every
`test` string from `.factory/claims.json` was then run separately and exactly
as listed.

| Claim ID | Result | Observable evidence |
| --- | --- | --- |
| exact-selection | Pass | Cached diff contained only the requested lines and the process completed without a prompt. |
| worktree-unchanged | Pass | Working-file bytes matched before and after staging. |
| dry-run | Pass | Patch printed; index tree ID stayed unchanged. |
| unstage | Pass | Only the selected staged line was removed. |
| reject-atomic | Pass | Invalid selection exited 2 and preserved the index tree. |
| json-output | Pass | Stdout parsed as one object with the documented keys; stderr was empty. |
| line-number-semantics | Pass | Additions, deletions, paired replacements, and minus-prefixed unstage deletion were asserted. |
| text-safety | Pass | LF-normalized index bytes were asserted; binary/conflict indexes stayed unchanged. |
| git-subcommand | Pass | `git stage-lines` found and ran the built executable. |
| install-from-git | Pass | The documented Git-source install completed and reported version 0.1.0. |
| cli-no-network | Pass | The socket/connect interceptor recorded no call during CLI demo. |
| demo-isolation | Pass | Two runs produced distinct temporary paths and preserved caller state. |
| demo-entry | Pass, incomplete copy coverage | Browser opened and reset the recording; the test does not inspect the false reset announcement in F-5-1. |
| site-private | Pass | Demo requests were same-origin and browser user storage was empty. |
| offline-reload | Pass | All four visited routes reloaded offline. |
| mit-license | Pass | Cargo metadata and LICENSE grant matched MIT. |
| exit-codes | Pass | Success, bad selection, and file failure returned 0, 2, and 1. |
| scope-boundaries | Pass | HEAD and commit count stayed unchanged. |
| typed-wrappers | Pass | Node and Python wrappers invoked the executable without a shell. |

No landing or README claim-like sentence is unlisted. The demo reset status in
F-5-1 is the sole unlisted claim-like sentence found on the live product.

## Earlier-finding regression check

Every earlier review, polish record, and handoff was read. Each prior finding
was checked against live output and current source.

| Earlier finding | Live and code verification in this round |
| --- | --- |
| Review 1 B1 | Fixed: the job, developers/coding agents, sample action, and click consequence are above the fold at both widths. |
| Review 1 B2 | Fixed: browser recording, banner, reset, bundled sample, CLI `--demo`, and separate temporary repositories exist. |
| Review 1 B3 | Fixed: 19 manifest entries and tagged tests exist; all exact commands passed from a clean clone. |
| Review 1 B4 | Fixed: demo/legal deep links resolve and an unknown path returns the designed page with HTTP 404. |
| Review 1 H1 | Fixed for its quoted claims: every landing/README product claim maps to the current register. F-5-1 is a later unlisted demo status. |
| Review 1 C1 | Fixed: the headline names the staging job; the old “scriptable primitive” wording is absent live and in source. |
| Review 1 C2 | Fixed: “terminal choreography” and “glazed blue” are absent. |
| Review 1 C3 | Fixed: the demo and command-builder actions name their results. |
| Review 1 C4 | Fixed: the actual H2s describe index changes, line choice, privacy, installation, and JSON output. |
| Review 1 C5 | Fixed: plain line guidance precedes the detailed Git reference; explanatory prose consistently says “working file.” |
| Review 1 C6 | Fixed: installation wording is literal and its command is tested. |
| Review 1 C7 | Fixed: the coding-agent section names the JSON result. |
| Review 1 C8 | Fixed: the old marketing imperatives and slogan are absent. |
| Review 1 C9 | Fixed: no unavailable release archive is promised. |
| Review 1 C10 | Fixed: exit codes are three short sentences. |
| Review 1 C11 | Fixed: controls say **Copy staging command** and **Copy install command**. |
| Review 1 social metadata | Fixed: canonical, OG/Twitter metadata, 1200×630 image, SVG favicon, and 180px touch icon are present. |
| Review 1 route metadata | Fixed: home, demo, privacy, terms, and 404 have route-specific titles, descriptions, and canonicals. |
| Review 1 designed 404 | Fixed: an unknown live path returns HTTP 404 and “Find a valid page.” |
| Review 1 route/back/focus | Fixed: deep links reload; forward navigation and Back focus the destination H1. |
| Review 1 shared chrome | Fixed: all routes retain the wordmark/nav and footer one-liner, legal links, factory credit, and version. |
| Review 2 B1 | Fixed: the false registry install is absent; the sole Git-source install passed from a fresh Cargo root. |
| Review 2 M1 | Fixed: the quoted “clean filters / patch engine” prose is absent. |
| Review 2 M2 | Fixed: the demo exit says **View installation steps** in live output, source, and `.factory/demo.md`. |
| Review 3 F-3-1 | Fixed: all three browser claim commands self-build and pass from an otherwise unbuilt clone. |
| Review 3 F-3-2 | Fixed: tagged tests assert deleted-line unstage semantics and exact LF-normalized index text. |
| Review 3 F-3-3 | Fixed: “No account” is absent. |
| Review 3 F-3-4 | Fixed: the builder label says **File path in the repository**. |
| Review 3 F-3-5 | Fixed: “working file” is the consistent explanatory term. |
| Review 3 F-3-6 | Fixed: last-commit, JSON, file-conversion, and scope copy use the recorded plain rewrites. |
| Review 3 F-3-7 | The original nested-`aside` defect is fixed. F-5-2 is a separate axe contrast failure during the hero entrance. |
| Review 3 F-3-8 | Fixed: every visible link, button, and input measured at least 44×44px at 390px. |
| Review 4 F-4-1 | **Reopened as F-5-1:** visible copy distinguishes the recording, but reset still announces a fresh repository that the browser did not create. |
| Review 4 F-4-2 | Fixed: source and demo contract both say **View installation steps**. |

## Structure, accessibility, links, and identity

- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` each have `lang=en`,
  exactly one H1, one `main`, a route-specific title and description,
  canonical, OG/Twitter image metadata, SVG favicon, and touch icon.
- Titles follow the required product/action or route/product pattern. The four
  public routes are in `sitemap.xml`; `robots.txt` points to it.
- Direct loads and reloads work. Privacy navigation focused its H1; Back
  returned to and focused the landing H1. The designed unknown route returned
  HTTP 404.
- Every discovered internal and external link returned 200. No normal-route
  console error occurred. No 390px route overflowed, and all visible mobile
  controls were at least 44×44px.
- Axe found zero violations after pages settled, but the immediate home
  entrance/Back state has the serious contrast failure in F-5-2. The full
  suite ended with 21 passed and 1 failed browser test.
- The ceramic-layer artwork, mineral palette, range mark, asymmetric type
  scale, code-sheet layout, and night-ice terminal are product-specific and
  match `.factory/design.md`. The site does not resemble a generic SaaS card
  template.
- `npm run build` passed and produced the release binary plus `dist/site`.
  The separate `npm test` failure is F-5-2.

## Missed leverage

No obvious AI, import/export, or sync feature is missing. This is a local,
deterministic, safety-sensitive Git operation. AI-selected staging would make
the stated job less predictable. Multi-file selectors, unstage, dry-run, JSON,
and typed wrappers cover the useful adjacent workflow. No decorative AI or
embedded provider key is present.

## What would make this perfect

Replace the false reset announcement with **“Demo recording reset.”**, assert
that status in the `demo-entry` test, and include it in the maintained copy
audit. Remove opacity animation from readable hero content and rerun the
targeted mobile history test, full `npm test`, all 19 registered commands from
another clean clone, and the live demo reset check. There is nothing else
identified in this round.
