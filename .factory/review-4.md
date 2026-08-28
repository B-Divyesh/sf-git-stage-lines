# Adversarial first-read review 4 — git-stage-lines

**Verdict: FAIL.** Reviewed 2026-08-28 against
<https://git-stage-lines.sociobot.in> from fresh Chromium contexts at 390×844
and 1440×900. Product code was not changed. Two copy/documentation findings
remain; all functional, claim, demo-isolation, route, and accessibility checks
in this round passed.

## First 30 seconds

Before scrolling, I understood this as a Git command that stages only selected
changed lines. It is for developers and coding agents that cannot use an
interactive patch prompt. I should click **Try it with sample data** first.

At both widths the first viewport contained the headline, audience sentence,
action, action note, and three facts. At 390px the action was a 48px-high
target at y=445 with no horizontal overflow. This first-read check passes.

## Findings, ordered by severity

### F-4-1 — MAJOR — the first action promises an execution that the browser does not perform

**Exact quote/location:** landing hero action note: “**Runs a sample repository
in a temporary directory.**”

**Evidence:** Clicking **Try it with sample data** opens `/demo/`. That page
correctly calls itself “**This recording**” and presents a self-hosted terminal
recording. It does not create or run a repository in the browser. Separately,
the actual CLI command `git-stage-lines --demo` does create a unique temporary
repository, and it was verified twice from a changed caller repository without
altering that caller.

**Why a first-time visitor is misled:** The immediate note says what the click
will do. In this product class a recording is an appropriate one-click browser
demo, but it must be described as a recording rather than as an executed local
command. The statement is also broader than the registered `demo-entry` claim,
which asserts opening a resettable demo, not browser-side repository creation.

**Concrete fix:** Replace the action note with **“Shows a recorded sample run.
Your files stay unchanged.”** Update the `demo-entry` claim text to name the
recording and keep its current observable output/reset assertion.

### F-4-2 — MINOR — the demo contract retains the old control name

**Exact quote/location:** `.factory/demo.md`, Isolation and reset: “**Start for
real** leaves demo mode and opens installation.”

**Evidence:** The live control and `site/demo/index.html` use **“View
installation steps”**, the label introduced to resolve Review 2 M2. No control
named “Start for real” remains.

**Why a verifier is misled:** The documented reset/exit flow refers to a button
that does not exist and reintroduces inconsistent terminology after the product
copy was made explicit.

**Concrete fix:** Change the sentence to **“View installation steps leaves demo
mode and opens installation.”**

## Copy audit

Counts are whitespace-delimited. Commands, code/diff/JSON examples, URLs, and
repeated header/footer navigation labels are excluded. Headings and controls
are included because they are read by a cold visitor. No item exceeds 22 words
and no banned marketing adjective was found. `working file`, `index`,
`selected lines`, `demo`, and `JSON result` are consistently used in rendered
landing and README copy.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Non-interactive Git staging | 3 | Pass |
| Stage exact Git lines from a script | 7 | Pass |
| For developers and coding agents that need selected changes without git add -p. | 13 | Pass |
| Try it with sample data | 5 | Pass — required demo action |
| Runs a sample repository in a temporary directory. | 8 | F-4-1 |
| Your files stay unchanged. | 4 | Pass |
| Stages selected changed lines | 4 | Pass |
| No prompts or network calls | 5 | Pass — `exact-selection`, `cli-no-network` |
| Free under the MIT License | 5 | Pass — `mit-license` |
| Sample command builder | 3 | Pass |
| Build a staging command | 4 | Pass |
| Use file line numbers for additions. | 6 | Pass |
| Use - plus the original line number for deletions. | 9 | Pass |
| File path in the repository | 5 | Pass |
| Changed lines to stage | 4 | Pass |
| Try 3-4,7 or a deletion such as -2. | 8 | Pass |
| Your command | 2 | Pass |
| Copy staging command | 3 | Pass — result-naming verb |
| working file / selected range / index | 2 / 2 / 1 | Pass |
| How it works / Change only the index | 3 / 4 | Pass |
| Git prepares the file using its own rules, then applies the selected lines to the index. | 16 | Pass — `text-safety`, `exact-selection` |
| It does not rewrite the working file. | 7 | Pass — `worktree-unchanged` |
| Read the change / Compare Git’s saved version with your working file. | 3 / 8 | Pass |
| Select file lines / Keep the requested additions, deletions, and paired replacements. | 3 / 8 | Pass |
| Check and apply / Validate one patch before updating the index. | 3 / 7 | Pass |
| Line reference / Choose either side of a change | 2 / 6 | Pass |
| A bad line, binary file, or conflict stops the full command before the index changes. | 15 | Pass — `reject-atomic`, `text-safety` |
| Line numbers in stage and unstage modes | 7 | Pass |
| Token / Stage / Unstage | 1 / 1 / 1 | Pass |
| Working file lines / Current index lines / Deleted index lines / Deleted lines from the last commit (HEAD) | 3 / 3 / 3 / 7 | Pass — `line-number-semantics` |
| Replacement / Either line selects the paired replacement | 1 / 6 | Pass |
| Scope and privacy / Keep the operation local | 3 / 4 | Pass |
| The CLI runs Git locally. | 5 | Pass — `cli-no-network` |
| It has no network calls. | 6 | Pass — `cli-no-network` |
| Text files only. | 3 | Pass |
| Binary data is rejected without changing the index. | 8 | Pass — `text-safety` |
| No history changes. | 3 | Pass |
| The command does not commit, rebase, or split commits. | 9 | Pass — `scope-boundaries` |
| Private site. | 2 | Pass |
| The site makes same-origin requests and uses no cookies, local storage, or session storage. | 14 | Pass — `site-private` |
| Install / v0.1.0 / Install one Git subcommand | 1 / 1 / 4 | Pass |
| Git exposes the git-stage-lines executable as git stage-lines. | 8 | Pass — `git-subcommand` |
| Install from this repository | 4 | Pass |
| Copy install command | 3 | Pass — result-naming verb |
| Package facts / Price / Free / Network calls / None / License / MIT | 2 / 1 / 1 / 2 / 1 / 1 / 1 | Pass |
| For coding agents / Read a JSON result | 3 / 4 | Pass |
| Pass --json to print one JSON result. | 7 | Pass — `json-output` |
| Run the sample first / See the staged lines | 4 / 4 | Pass |
| Stage selected Git lines from scripts. | 6 | Pass |
| Built by Param Factory · v0.1.0 | 5 | Pass |
| You’re offline. / The visited pages still work. | 2 / 5 | Pass — `offline-reload` |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| git-stage-lines | 1 | Pass |
| Stage selected Git lines from scripts and coding agents without an interactive patch prompt. | 14 | Pass |
| The command changes the Git index and leaves the working file unchanged. | 12 | Pass — `worktree-unchanged` |
| It is free under the MIT License and contains no network calls. | 11 | Pass — `mit-license`, `cli-no-network` |
| Try the isolated sample | 4 | Pass |
| Every run creates a new repository under the system temporary directory. | 11 | Pass — `demo-isolation` |
| It copies the files in examples, stages lines 5 and 10, and leaves one sample change unstaged. | 17 | Pass — `demo-isolation` |
| The command prints the repository path for review. | 8 | Pass — `demo-isolation` |
| The matching browser recording is at ?demo=1. | 7 | Pass — `demo-entry` |
| Reset demo restores the recording. | 5 | Pass — `demo-entry` |
| The page uses no cookies, local storage, or session storage. | 10 | Pass — `site-private` |
| Install / Install directly from this repository with Cargo: | 1 / 7 | Pass |
| Git discovers the git-stage-lines executable as git stage-lines. | 8 | Pass — `git-subcommand` |
| Use line ranges | 3 | Pass |
| Positive numbers select changed lines in the working file. | 9 | Pass — `line-number-semantics` |
| Prefix a range with - to select deleted original lines. | 10 | Pass — `line-number-semantics` |
| Selecting either side of a replacement selects the paired replacement. | 10 | Pass — `line-number-semantics` |
| An invalid line rejects the command before the index changes. | 10 | Pass — `reject-atomic` |
| Git’s file-conversion rules determine the text compared. | 7 | Pass — `text-safety` |
| Binary data is rejected without changing the index. | 8 | Pass — `text-safety` |
| Success exits 0. | 3 | Pass — `exit-codes` |
| Bad arguments or unmatched lines exit 2. | 7 | Pass — `exit-codes` |
| Other file or Git failures exit 1. | 8 | Pass — `exit-codes` |
| Use typed wrappers / The repository includes small Node and Python wrappers: | 3 / 8 | Pass |
| See wrappers/node and wrappers/python. | 4 | Pass |
| Develop and verify | 3 | Pass |
| The static site is built with npm run build:site and deployed from dist/site. | 13 | Pass — repository instruction |
| See claims.json for claim-level commands and demo.md for isolation details. | 10 | Pass — repository instruction |
| Scope | 1 | Pass |
| Version 0.1.0 supports ordinary text-file changes between the last commit, index, and working file. | 14 | Pass — `scope-boundaries`, `text-safety` |
| It does not rewrite history, create commits, or stage binary data. | 11 | Pass — `scope-boundaries`, `text-safety` |
| License / MIT. / See LICENSE. | 1 / 1 / 2 | Pass |

No additional landing or README claim-like statement lacks a corresponding
entry in `.factory/claims.json`. F-4-1 is the one action-note promise whose
specific browser behavior is not represented in that manifest.

## Demo, sandbox, and claims verification

- The first-screen action reached `/demo/` in one click at mobile and desktop.
  The initial demo screen already showed realistic ticket data: two selected
  staged lines and a visibly unstaged follow-up line.
- The persistent banner read **“Demo — sample data, nothing is saved”**. Reset
  restored the terminal recording and moved focus to `#demo-output`.
- In a fresh live browser context, the entire demo flow made same-origin
  requests only. Cookies, local storage, session storage, IndexedDB, and OPFS
  were empty. The only persistent browser facility was the disclosed
  service-worker cache of public site files.
- After first visiting `/`, `/demo/`, `/privacy/`, and `/terms/`, all four
  routes reloaded offline with the expected H1.
- The actual `--demo` CLI command produced two distinct
  `/tmp/git-stage-lines-demo-*` repositories on consecutive runs and left a
  separately prepared caller repository unchanged.
- From fresh clone `/tmp/git-stage-lines-review-4-TSnDjH`, after only `npm ci`,
  every one of the 19 exact manifest commands passed: `exact-selection`,
  `worktree-unchanged`, `dry-run`, `unstage`, `reject-atomic`, `json-output`,
  `line-number-semantics`, `text-safety`, `git-subcommand`, `install-from-git`,
  `cli-no-network`, `demo-isolation`, `demo-entry`, `site-private`,
  `offline-reload`, `mit-license`, `exit-codes`, `scope-boundaries`, and
  `typed-wrappers`.
- `npm test`, `npm run build`, and `git diff --check` also passed in the review
  checkout. The browser suite’s final status was `passed` with no failed tests.

## Earlier finding regression check

| Earlier finding | Live and code verification in this round |
| --- | --- |
| Review 1 B1 | Pass: task-led headline, stated audience, and sample action occupy the first viewport at 390px and desktop. |
| Review 1 B2 | Pass: `/demo/`, visible banner, Reset demo, self-hosted terminal recording, bundled `--demo`, and fresh temporary repositories all work. |
| Review 1 B3 and H1 | Pass except F-4-1: all 19 registered tests pass; the action-note wording is the sole new unlisted behavior promise. |
| Review 1 B4 and structure failures | Pass: direct demo/legal routes, route titles/canonicals, focused Back navigation, static 404 with HTTP 404, shared chrome, favicon, OG/Twitter metadata, robots, and sitemap work. |
| Review 1 C1–C11 | Pass: old jargon/metaphors, generic copy buttons, unavailable archive wording, and long exit-code sentence remain absent. |
| Review 2 B1 and M1 | Pass: only the tested Git-source install appears; implementation wording remains plain. |
| Review 2 M2 | Pass in live product/code: the actual control is **View installation steps**. F-4-2 records the stale demo-contract reference. |
| Review 3 F-3-1 and F-3-2 | Pass: browser claims build from a clean clone and the tagged line/filter tests assert the documented outcomes. |
| Review 3 F-3-3 through F-3-6 | Pass: account claim is absent; builder label, terminology, and Git/Unix phrasing remain corrected. |
| Review 3 F-3-7 and F-3-8 | Pass: axe reported zero violations on all public/404 documents in light and dark modes; every visible 390px link, button, and input measured at least 44×44px. |

## Structure, links, and identity

- `/`, `/demo/`, `/privacy/`, `/terms/`, `/404.html`, robots, sitemap, the
  repository, and the LICENSE link all returned 200. A nonexistent route
  returned the designed 404 with HTTP 404.
- Every public page had `lang=en`, one H1, one main landmark, description,
  canonical, OG/Twitter image metadata, SVG favicon, and apple-touch icon. The
  landing title is `git-stage-lines — stage exact Git lines`; legal/demo titles
  follow the permitted route pattern.
- Direct links and reloads worked. Demo → installation → Back restored and
  focused the demo H1; the live scripted route tests additionally cover legal
  Back focus.
- No non-404 console errors occurred. The intentional unknown-route request
  naturally logs its 404 in a browser if it is used as a navigation check.
- The mineral palette, CSS range mark, porcelain-layer hero, code-sheet layout,
  and restrained terminal slab match `.factory/design.md` and are clearly
  product-specific rather than a generic SaaS template.
- No AI feature is present or expected here: the brief is a local, precise Git
  primitive, and AI, import/export, or sync would not improve the stated job.

## What would make this perfect

Correct F-4-1 and F-4-2, then rerun the `demo-entry` claim command and this
copy audit. The recording-based browser demo is appropriate for this CLI; its
first-screen description and its contract must simply say that it is a
recording, while reserving temporary-repository execution for `--demo`.
