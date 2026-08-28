# Adversarial first-read review 3 — git-stage-lines

**Verdict: FAIL.** Reviewed 2026-08-28 against
<https://git-stage-lines.sociobot.in> in fresh Chromium contexts at 390×844
and 1440×900. Product code was not changed. Eight findings remain: two
blocking claim-verification failures, one unlisted claim, three copy issues,
and two accessibility issues.

## First 30 seconds

Before scrolling, I understood the product as: a Git command that lets a
script stage only named changed lines. It is for developers and coding agents
that need a non-interactive alternative to `git add -p`. I should click
**Try it with sample data** first. Both widths show the task, audience, action,
action consequence, and three facts in the first viewport. This check passes.

## Findings, ordered by severity

### F-3-1 — BLOCKING — three registered claim commands fail in a clean clone

**Location:** `.factory/claims.json`, claims `demo-entry`, `site-private`, and
`offline-reload`.

**Exact evidence:** after `git clone --no-local /work/repo <fresh-dir>` and
`npm ci`, each registered command failed before running its assertion:

```text
npx playwright test --grep @claim:demo-entry --project=desktop
npx playwright test --grep @claim:site-private --project=desktop
npx playwright test --grep @claim:offline-reload --project=desktop

Error: ENOENT: no such file or directory, open '<fresh-dir>/dist/site/404.html'
Error: Process from config.webServer was not able to start. Exit code: 1
```

**Why this misleads a verifier:** the manifest presents these as complete test
commands, but none works from the clean state mandated by the claims contract.
The demo, privacy, and offline promises therefore have failing registered
tests. Running `npm run build:site` first made all three commands pass; that
unlisted prerequisite does not erase the original failures.

**Concrete fix:** make each registered browser command self-contained, for
example `npm run build:site && npx playwright test ...`, or make the Playwright
web server build the site before serving it. Re-run all 19 manifest commands
without a manual build step in a fresh clone.

### F-3-2 — BLOCKING — tagged tests do not prove all registered line and text semantics

**Exact quotes/locations:** the landing reference table promises
“**Deleted HEAD lines**” in unstage mode. The `line-number-semantics` sandbox
says it will assert additions, deletions, and replacements, and the
`text-safety` sandbox says it will “**assert normalized text**.”

**Evidence:** `@claim:line-number-semantics` exercises only normal staging;
`@claim:unstage` exercises only a positive current-index line. No registered
tagged test exercises a minus-prefixed deleted `HEAD` line in unstage mode.
`@claim:text-safety` checks only status `0` for the CRLF/filter case and never
asserts the resulting normalized index contents. Untagged Rust integration
tests cover both outcomes, but they are not the one tagged observable test the
manifest tells a verifier to run.

**Why this misleads a visitor:** the reference table states exact selector
semantics. A passing claim label currently overstates what its assertion
proves, leaving two visitor-relevant outcomes untested.

**Concrete fix:** extend the tagged line-semantics test with a staged deletion
from `HEAD`, run `--unstage file:-<old-line>`, and assert only that deletion is
restored. In `@claim:text-safety`, assert the exact LF-normalized index bytes
after staging the CRLF fixture.

### F-3-3 — MAJOR — “No account” is an unlisted claim

**Exact quote/location:** landing page, Scope and privacy: “**No account.**”

**Evidence:** no `.factory/claims.json` entry claims or tests that the product
requires no account. `site-private` covers requests and browser storage;
`cli-no-network` covers sockets. Neither claim says or asserts account-free
use.

**Why this misleads a visitor:** “No account” is a product promise a visitor
can rely on, but the claims register does not own it.

**Concrete fix:** either remove the sentence or add an `account-free` claim
whose fresh demo/install flow asserts that no sign-in form, authentication
redirect, credential prompt, or account endpoint is required.

### F-3-4 — MINOR — the command builder asks for the wrong path

**Exact quote/location:** landing command builder label: “**Repository path**”;
the supplied value is `src/app.ts` and the result is
`git stage-lines src/app.ts:3-4,7`.

**Why this loses a first-time visitor:** `src/app.ts` is a file path relative
to a repository, not the repository directory. The label tells the visitor to
enter a different kind of value from the one the command requires.

**Concrete rewrite:** **File path in the repository**.

### F-3-5 — MINOR — one concept uses five inconsistent terms

**Exact quotes/locations:** the landing page uses “**working tree**,”
“**working-file lines**,” “**working file**,” and “**edited file**.” The README
also uses “**worktree**.” `.factory/copy-audit.md` nevertheless records the
single term as “working file.”

**Why this adds friction:** a first-time visitor must decide whether these are
five Git states or several names for the same edited file.

**Concrete fix:** use **working file** in explanatory prose, labels, the table,
and README. If the Git term is necessary, introduce it once as “working file
(Git worktree)” and use one term afterward. Update the terminology audit to
match the rendered copy.

### F-3-6 — MINOR — avoidable Git and process jargon remains unexplained

**Exact quotes/locations:** landing: “**Deleted HEAD lines**” and “one object on
**standard output**.” README: “**Git clean filters determine text contents**”
and “the **worktree, index, and HEAD flow**.”

**Why this adds friction:** these phrases assume internal Git and Unix
vocabulary even where a shorter outcome statement is available.

**Concrete rewrites:**

- “Deleted lines from the last commit (`HEAD`).”
- “Pass `--json` to print one JSON result.”
- “Git’s file-conversion rules determine the text compared.”
- “Version 0.1.0 supports ordinary text-file changes between the last commit,
  staging area, and working file.”

### F-3-7 — MINOR — the landing page has an axe landmark violation

**Exact location:** `<aside class="requirements" aria-label="Package facts">`
inside the labelled Install section.

**Evidence:** Playwright axe reports
`landmark-complementary-is-top-level` with moderate impact in both light and
dark modes: “Aside should not be contained in another landmark.” All other
audited routes had zero axe violations.

**Why this matters:** screen-reader landmark navigation exposes an incorrectly
nested complementary landmark for a small facts list that is not independent
complementary content.

**Concrete fix:** render Package facts as a normal `div` or description-list
block inside the Install section, then require zero axe violations on every
route.

### F-3-8 — MINOR — several mobile links miss the 44px target rule

**Exact locations at 390px:** header/footer wordmarks are 182×32; the Demo nav
link is 42×44; footer Privacy, Terms, and MIT license links are 47×20, 38×20,
and 73×20.

**Why this matters:** the supplied accessibility and site-structure contracts
require 44px touch targets. The footer links and wordmarks are unnecessarily
hard to tap on a phone.

**Concrete fix:** give every interactive link a minimum 44×44 hit area, using
block padding without changing the visible type size. Add a 390px test that
measures every visible `a`, `button`, and form control.

## Copy audit

Counts are whitespace-delimited. Commands, code/diff/JSON output, URLs, and
repeated navigation labels are not sentences. They are audited separately as
controls or technical labels. No sentence exceeds 22 words, no banned
marketing adjective appears, all buttons use result-naming verbs, and the
headings make sense in the page outline. Flags are the terminology, jargon,
and field-label findings above.

### Landing page — every sentence

| Sentence | Words | Result |
| --- | ---: | --- |
| For developers and coding agents that need selected changes without `git add -p`. | 13 | Pass |
| Runs a sample repository in a temporary directory. | 8 | Pass |
| Your files stay unchanged. | 4 | Pass |
| Use file line numbers for additions. | 6 | Pass |
| Use `-` plus the original line number for deletions. | 9 | Pass |
| Try `3-4,7` or a deletion such as `-2`. | 8 | Pass |
| Git prepares the file using its own rules, then applies the selected lines to the index. | 16 | Pass |
| It does not rewrite the working file. | 7 | F-3-5 term |
| Compare Git’s saved version with your edited file. | 8 | F-3-5 term |
| Keep the requested additions, deletions, and paired replacements. | 8 | Pass |
| Validate one patch before updating the index. | 7 | Pass |
| A bad line, binary file, or conflict stops the full command before the index changes. | 15 | Pass |
| Either line selects the paired replacement | 6 | Pass |
| The CLI runs Git locally. | 5 | Pass |
| It has no network calls. | 6 | Pass |
| Text files only. | 3 | Pass |
| Binary data is rejected without changing the index. | 8 | Pass |
| No history changes. | 3 | Pass |
| The command does not commit, rebase, or split commits. | 9 | Pass |
| No account. | 2 | F-3-3 claim |
| The site makes same-origin requests and uses no cookies, local storage, or session storage. | 14 | Pass |
| Git exposes the `git-stage-lines` executable as `git stage-lines`. | 8 | Pass |
| Pass `--json` to receive one object on standard output. | 9 | F-3-6 jargon |
| Stage selected Git lines from scripts. | 6 | Pass |
| Built by Param Factory · v0.1.0 | 5 | Pass |
| You’re offline. | 2 | Pass |
| The visited pages still work. | 5 | Pass |

Dynamic landing/demo messages: “Enter at least one changed line.” (6),
“`<token>` is not a line or range.” (7), “Ranges start at 1 and run from low
to high.” (10), “Command copied to clipboard.” (4), “Copy failed.” (2),
“Select the command and copy it manually.” (8), and “Demo reset with a fresh
sample repository.” (7). None is over 22 words or uses a banned term.

### Landing headings, labels, and controls

| Copy | Words | Result |
| --- | ---: | --- |
| Non-interactive Git staging / Stage exact Git lines from a script | 3 / 7 | Pass |
| Try it with sample data | 5 | Pass, result-naming action |
| Stages selected changed lines / No prompts or network calls / Free under the MIT License | 4 / 5 / 5 | Pass |
| working tree / selected range / index | 2 / 2 / 1 | F-3-5 terms |
| Sample command builder / Build a staging command | 3 / 4 | Pass |
| Repository path / Changed lines to stage / Your command | 2 / 4 / 2 | F-3-4 / Pass / Pass |
| Copy staging command | 3 | Pass, result-naming button |
| working tree / selected lines | 2 / 2 | F-3-5 / Pass |
| How it works / Change only the index | 3 / 4 | Pass |
| Read the change / Select file lines / Check and apply | 3 / 3 / 3 | Pass |
| Line reference / Choose either side of a change | 2 / 6 | Pass |
| Line numbers in stage and unstage modes | 7 | Pass |
| Token / Stage / Unstage / Replacement | 1 / 1 / 1 / 1 | Pass |
| Working-file lines / Current index lines / Deleted index lines / Deleted HEAD lines | 2 / 3 / 3 / 3 | F-3-5 and F-3-6 |
| Scope and privacy / Keep the operation local | 3 / 4 | Pass |
| Install / v0.1.0 / Install one Git subcommand | 3 / 4 | Pass |
| Install from this repository / Copy install command | 4 / 3 | Pass |
| Package facts / Price / Free / Network calls / None / License / MIT | 2 / 1 / 1 / 2 / 1 / 1 / 1 | Pass |
| For coding agents / Read a JSON result / Command / Result | 3 / 4 / 1 / 1 | Pass |
| Run the sample first / See the staged lines | 4 / 4 | Pass |

### README — every prose sentence

| Sentence | Words | Result |
| --- | ---: | --- |
| Stage selected Git lines from scripts and coding agents without an interactive patch prompt. | 14 | Pass |
| The command changes the Git index and leaves the working file unchanged. | 12 | Pass |
| It is free under the MIT License and contains no network calls. | 12 | Pass |
| Every run creates a new repository under the system temporary directory. | 11 | Pass |
| It copies the files in `examples`, stages lines 5 and 10, and leaves one sample change unstaged. | 17 | Pass |
| The command prints the repository path for review. | 8 | Pass |
| The matching browser recording is at `https://git-stage-lines.sociobot.in/?demo=1`. | 7 | Pass |
| Reset demo restores the recording. | 5 | Pass |
| The page uses no cookies, local storage, or session storage. | 10 | Pass |
| Install directly from this repository with Cargo: | 6 | Pass |
| Git discovers the `git-stage-lines` executable as `git stage-lines`. | 8 | Pass |
| Positive numbers select changed lines in the working file. | 8 | Pass |
| Prefix a range with `-` to select deleted original lines. | 10 | Pass |
| Selecting either side of a replacement selects the paired replacement. | 10 | Pass |
| An invalid line rejects the command before the index changes. | 10 | Pass |
| Git clean filters determine text contents. | 6 | F-3-6 jargon |
| Binary data is rejected without changing the index. | 8 | Pass |
| Success exits `0`. | 3 | Pass |
| Bad arguments or unmatched lines exit `2`. | 7 | Pass |
| Other file or Git failures exit `1`. | 8 | Pass |
| The repository includes small Node and Python wrappers. | 8 | Pass |
| See `wrappers/node` and `wrappers/python`. | 4 | Pass |
| The static site is built with `npm run build:site` and deployed from `dist/site`. | 13 | Pass |
| See `.factory/claims.json` for claim-level commands and `.factory/demo.md` for isolation details. | 10 | Pass |
| Version 0.1.0 supports regular text files in the worktree, index, and `HEAD` flow. | 13 | F-3-5 and F-3-6 |
| It does not rewrite history, create commits, or stage binary data. | 11 | Pass |
| MIT. | 1 | Pass |
| See `LICENSE`. | 2 | Pass |

README headings/labels are `git-stage-lines` (1), Try the isolated sample (4),
Install (1), Use line ranges (3), Use typed wrappers (3), Develop and verify
(3), Scope (1), and License (1). CLI help labels are “Run bundled sample data
in a new temporary repository” (9), “Remove selected lines from the index”
(6), “Print the patch without changing the index” (7), “Write one JSON result
object to stdout” (7, F-3-6 jargon), and “Run in this repository” (4).

## Demo and sandbox verification

- One click on **Try it with sample data** reached `/demo/` and immediately
  showed a realistic sprint-board command, two staged lines, one line left
  unstaged, and the temporary path pattern.
- The banner reads **Demo — sample data, nothing is saved**. **Reset demo**
  restores the terminal markup in memory, moves focus to the output, and
  announces the reset. **View installation steps** leaves demo mode and names
  its result.
- Fresh live demo storage contained zero cookies, local/session entries,
  IndexedDB databases, and OPFS entries. Cache Storage contained only the
  public service-worker cache `git-stage-lines-v2`. Captured requests were
  same-origin.
- After visiting the four routes and switching the browser context offline,
  `/`, `/demo/`, `/privacy/`, and `/terms/` each reloaded with the expected H1.
- Running the actual `git-stage-lines --demo` binary from a changed temporary
  caller repository created `/tmp/git-stage-lines-demo-*`, printed the exact
  staged and unstaged diffs, and left the caller status byte-for-byte equal.

The demo itself passes. F-3-1 concerns the registered clean-clone commands,
not the observed live behavior.

## Claims verification

Fresh clone: `/tmp/git-stage-lines-review3-IVlJwu`; setup: `npm ci` only, then
each manifest `test` string separately and exactly as listed.

| Claim | Result | Evidence |
| --- | --- | --- |
| exact-selection | Pass | Exact cached diff; no prompt |
| worktree-unchanged | Pass | Working bytes unchanged |
| dry-run | Pass | Patch printed; tree ID unchanged |
| unstage | Pass | One positive index line removed |
| reject-atomic | Pass | Exit 2; index unchanged |
| json-output | Pass | One parsed object; empty stderr |
| line-number-semantics | Pass, incomplete | Normal-stage addition/deletion/replacement only; F-3-2 |
| text-safety | Pass, incomplete | Binary/conflict atomicity; CRLF result not asserted; F-3-2 |
| git-subcommand | Pass | Invoked through `git stage-lines` |
| install-from-git | Pass | Git-source install and version succeeded |
| cli-no-network | Pass | Socket interceptor logged nothing |
| demo-isolation | Pass | Distinct temp paths; caller unchanged |
| demo-entry | **Fail** | Preview server missing `dist/site/404.html`; F-3-1 |
| site-private | **Fail** | Preview server missing `dist/site/404.html`; F-3-1 |
| offline-reload | **Fail** | Preview server missing `dist/site/404.html`; F-3-1 |
| mit-license | Pass | Cargo metadata and grant text |
| exit-codes | Pass | 0, 2, and 1 observed |
| scope-boundaries | Pass | HEAD and commit count unchanged |
| typed-wrappers | Pass | Node run and Python subprocess contract |

Summary: **16/19 registered commands passed from the clean state.** After the
unregistered `npm run build:site` prerequisite, all three browser commands
passed. F-3-3 is the one unlisted live claim.

## Earlier-finding audit

Every earlier review, polish record, and handoff was read. Exact earlier
findings were checked in both live output and current code.

| Earlier ID | Current status and evidence |
| --- | --- |
| Review 1 B1 | Fixed: task, audience, sample action, and consequence are above the fold at both widths. |
| Review 1 B2 | Fixed: `/demo/`, `--demo`, bundled `examples/`, banner, reset, and isolation all work. |
| Review 1 B3 | Fixed as originally stated: claims register and tagged tests now exist. F-3-1/F-3-2 are new verification defects. |
| Review 1 B4 | Fixed: real routes return correct pages; unknown route returns designed HTTP 404. |
| Review 1 H1 | Fixed for the old quoted claims. “No account” is newer unlisted copy; see F-3-3. |
| Review 1 C1 | Fixed: old “missing scriptable primitive” copy is absent. |
| Review 1 C2 | Fixed: “terminal choreography” and “glazed blue” are absent. |
| Review 1 C3 | Fixed: sample command builder and sample action name results. |
| Review 1 C4 | Fixed: mechanics headings now describe the operation. |
| Review 1 C5 | Fixed for the earlier quoted internal phrases. New residual jargon is F-3-6. |
| Review 1 C6 | Fixed: install heading is literal. |
| Review 1 C7 | Fixed: the agent section names JSON output. |
| Review 1 C8 | Fixed: old marketing imperatives are absent. |
| Review 1 C9 | Fixed: unavailable archive promise is absent. |
| Review 1 C10 | Fixed: exit-code copy is split into three short sentences. |
| Review 1 C11 | Fixed: buttons say Copy staging/install command. |
| Review 1 structure failures | Fixed: route metadata, OG/Twitter/touch assets, 404, focus, and common chrome are present. |
| Review 2 B1 | Fixed: no crates.io command remains; Git-source install claim passed. |
| Review 2 M1 | Fixed: both quoted clean-filter/patch-engine landing sentences were replaced. |
| Review 2 M2 | Fixed: demo exit reads View installation steps. |

No earlier finding is being reopened under its old ID.

## Structure, accessibility, and identity

| Check | Result | Evidence |
| --- | --- | --- |
| Titles, descriptions, canonical, H1, outline | Pass | `/`, demo, privacy, terms, and 404 have unique titles, one H1, metadata, and ordered headings. |
| OG/Twitter/favicon/touch image | Pass | Shared original 1200×630 OG art, SVG favicon, and 180×180 touch icon. |
| Routes, 404, back, focus | Pass | Deep links/reloads work; unknown URL returns 404; Privacy → Back focuses the landing H1. |
| Link crawl | Pass | All intended internal and external destinations returned 200. The current-document skip link on the intentional 404 still targets `#main`. |
| Header/footer | Pass | Common wordmark/nav and footer include Privacy, Terms, Param Factory, and v0.1.0 on every route. |
| Security and privacy | Pass | Same-origin CSP, HSTS, Referrer-Policy, nosniff, permissions policy; no third-party runtime request. |
| Console/layout | Pass | No console errors on normal routes; no horizontal overflow at 390px. |
| JS and motion | Pass | Live JS is about 1.6KB gzip; reduced-motion removes animation and smooth scrolling. |
| Axe | Fail | One moderate nested-aside violation on landing; F-3-7. |
| Touch targets | Fail | Several links are below 44px; F-3-8. |
| Visual identity | Pass | Original porcelain/glacial layers, mineral palette, range mark, and terminal slab match `.factory/design.md` and are not a generic SaaS template. |

## Missed leverage

No missing AI, import/export, or sync feature is indicated by the brief. Exact
line selection is deterministic and safety-sensitive; an AI staging decision
would add uncertainty without helping the stated job. Multi-file staging,
unstage, dry-run, JSON, and typed wrappers cover the obvious adjacent uses.
No runtime AI feature or embedded provider key exists.

## What would make this perfect

Make the three browser claim commands run from an unbuilt clone, strengthen
the two incomplete tagged assertions, register or remove “No account,” use one
plain term for the working file, correct the file-path label, replace the four
unexplained technical phrases, remove the nested `aside` landmark, and make
every mobile target at least 44×44px. Then rerun all 19 exact claim commands
from a new clone and require zero axe violations. Until all eight findings are
closed, the required verdict remains **FAIL**.
