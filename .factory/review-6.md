# Adversarial first-read review 6 — git-stage-lines

**Verdict: PASS.** Reviewed 2026-08-28 against
<https://git-stage-lines.sociobot.in> in fresh Chromium contexts at 390×844
and 1440×1000. This review changed no product code. There are no findings and
no untested registered claims.

## First 30 seconds

Before scrolling, I understood: this is a Git command that stages exact changed
lines for a script; it is for developers and coding agents that need to avoid
the interactive `git add -p` flow; click **Try it with sample data** first.

The first mobile viewport contained the task-led H1, audience sentence, primary
action, immediate consequence, and the three facts. The action was a 48px-high
target beginning at y=445, with no horizontal overflow. Desktop showed the same
information. The copy that made those answers clear is: “**Stage exact Git
lines from a script**”, “**For developers and coding agents that need selected
changes without git add -p.**”, and “**Try it with sample data**” beside
“**Shows a recorded sample run. Your files stay unchanged.**”

## Copy audit

Counts use whitespace-delimited words. Commands, paths, URLs, diff rows, and
JSON examples are not sentences. No listed sentence exceeds 22 words, uses a
banned marketing adjective, or needs a rewrite.

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
| Stage selected Git lines from scripts. Built by Param Factory · v0.1.0 | 12 | Pass |
| You’re offline. | 2 | Pass |
| The visited pages still work. | 5 | Pass |
| Enter at least one changed line. | 6 | Pass — dynamic error |
| “`<token>`” is not a line or range. | 7 | Pass — dynamic error |
| Ranges start at 1 and run from low to high. | 10 | Pass — dynamic error |
| Command copied to clipboard. | 4 | Pass — dynamic status |
| Copy failed. | 2 | Pass — dynamic error |
| Select the command and copy it manually. | 8 | Pass — dynamic recovery |

### README — every sentence

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
| Install directly from this repository with Cargo: | 7 | Pass |
| Git discovers the `git-stage-lines` executable as `git stage-lines`. | 8 | Pass |
| Positive numbers select changed lines in the working file. | 9 | Pass |
| Prefix a range with `-` to select deleted original lines. | 10 | Pass |
| Selecting either side of a replacement selects the paired replacement. | 10 | Pass |
| An invalid line rejects the command before the index changes. | 10 | Pass |
| Git’s file-conversion rules determine the text compared. | 7 | Pass |
| Binary data is rejected without changing the index. | 8 | Pass |
| Success exits `0`. | 3 | Pass |
| Bad arguments or unmatched lines exit `2`. | 7 | Pass |
| Other file or Git failures exit `1`. | 8 | Pass |
| The repository includes small Node and Python wrappers: | 8 | Pass |
| See `wrappers/node` and `wrappers/python`. | 4 | Pass |
| The static site is built with `npm run build:site` and deployed from `dist/site`. | 13 | Pass |
| See `.factory/claims.json` for claim-level commands and `.factory/demo.md` for isolation details. | 10 | Pass |
| Version 0.1.0 supports ordinary text-file changes between the last commit, index, and working file. | 14 | Pass |
| It does not rewrite history, create commits, or stage binary data. | 11 | Pass |
| MIT. | 1 | Pass |
| See `LICENSE`. | 2 | Pass |

### Headings, labels, and controls

The remaining visible landing text was checked as headings, labels, or controls:
**Non-interactive Git staging**; **Stage exact Git lines from a script**;
**Try it with sample data**; **Sample command builder**; **Build a staging
command**; **File path in the repository**; **Changed lines to stage**;
**Copy staging command**; **How it works**; **Change only the index**; **Read
the change**; **Select file lines**; **Check and apply**; **Line reference**;
**Choose either side of a change**; **Scope and privacy**; **Keep the operation
local**; **Install one Git subcommand**; **Install from this repository**;
**Copy install command**; **For coding agents**; **Read a JSON result**;
**Run the sample first**; and **See the staged lines**. All are ≤7 words,
stand alone in a heading list, and action controls use result-naming verbs.

The terms are consistent: **index** for the staging area, **working file** for
the edited file, **selected lines** for requested changes, **deletion** for an
original-side removal, **demo** for the sample path, and **JSON result** for
machine-readable output. The necessary Git audience terms (`index`, `HEAD`,
and `git add -p`) are explained by nearby copy. No decorative or unexplained AI
feature exists.

## Demo and sandbox verification

- A fresh mobile and desktop context reached `/demo/` in one click from the
  first-screen action. Direct `/?demo=1` also entered `/demo/`.
- The first demo screen immediately showed an actual `git-stage-lines --demo`
  sample: `sprint-board.ts`, two staged lines (a ticket and a comment), and an
  explicitly still-unstaged follow-up comment. This is realistic bundled data,
  not placeholder text.
- The persistent banner read **“Demo — sample data, nothing is saved”** and
  provided **Reset demo** and **View installation steps**. Reset restored the
  recording, moved focus to `#demo-output`, and announced exactly **“Demo
  recording reset.”**
- In each fresh browser context, traffic throughout the demo flow was
  same-origin only. Cookies were empty; local storage, session storage, and
  IndexedDB all contained zero entries. The one Cache Storage entry is the
  documented public-site service-worker cache; the recording has no real-data
  namespace to read or mutate.
- After visiting the four public routes, setting the browser offline, and
  navigating again, `/`, `/demo/`, `/privacy/`, and `/terms/` each loaded its
  expected H1 from the cache.
- From an unrelated changed Git repository, the real
  `target/debug/git-stage-lines --demo` command created a new
  `/tmp/git-stage-lines-demo-*` repository, staged only lines 5 and 10, left
  the follow-up comment unstaged, and left the caller’s changed `caller.txt`
  unchanged.

## Claims verification

I cloned the current checkout with `git clone --no-local` to
`/tmp/gsl-review6-tlC8I0/repo`, ran only `npm ci`, then ran each exact `test`
command from `.factory/claims.json` under `set -e`. All 19 passed:

| Claim IDs | Result |
| --- | --- |
| exact-selection; worktree-unchanged; dry-run; unstage; reject-atomic; json-output | Pass |
| line-number-semantics; text-safety; git-subcommand; install-from-git | Pass |
| cli-no-network; demo-isolation; demo-entry; site-private; offline-reload | Pass |
| mit-license; exit-codes; scope-boundaries; typed-wrappers | Pass |

The full `npm test` gate also passed in that clean clone: 6 Rust unit tests, 7
Rust integration tests, 1 doctest, Node/Python wrapper tests, claims, and 22
Playwright tests. `test-results/.last-run.json` reported `"status": "passed"`
with no failed tests.

I reread the deployed landing page and README. Every visitor-relevant claim
maps to a registered entry: selection/prompt, working-file safety, line
semantics, text/binary safety, history boundaries, installation, JSON/wrappers,
MIT, CLI no-network, browser privacy, demo isolation, and offline reload. No
unlisted claim finding remains.

## Structure, accessibility, and links

- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` have `lang=en`, one
  H1, a main landmark, route-appropriate title, plain description, canonical,
  OG/Twitter fields, SVG favicon, and Apple touch icon.
- The landing title is **“git-stage-lines — stage exact Git lines”**; Demo,
  Privacy, Terms, and 404 use clear route-specific title patterns.
- Cold browser checks found no console/page errors, no mobile overflow, zero
  axe violations on home and demo, and no visible mobile link, button, or input
  below 44×44px.
- Demo → installation → Back restored focus to the demo H1. Direct loads and
  reloads worked. An unknown URL returned HTTP 404 with the designed “Find a
  valid page” recovery view.
- Crawling every rendered home, demo, legal, 404, repository, and license link
  returned HTTP 200 (apart from the intentionally checked unknown-route 404).
- Header, skip link, navigation, footer one-liner, Privacy, Terms, Param
  Factory attribution, and version are consistent across routes.
- The porcelain-layer art, mineral palette, CSS line-range mark, code-sheet
  layout, and restrained terminal surface follow the glacial-ceramic design
  thesis. They are product-specific rather than a generic SaaS template.

## Earlier-finding regression check

Every earlier review, polish record, and prior handoff was read. The following
is current live/source verification, not reliance on an earlier “fixed” label.

| Earlier finding | Current verification |
| --- | --- |
| Review 1 B1 | Fixed: task, audience, truthful sample action, consequence, and facts are visible at both widths. |
| Review 1 B2 | Fixed: one-click recording/banner/reset and isolated CLI `--demo` work with bundled sample data. |
| Review 1 B3 | Fixed: 19 claim entries exist and every exact clean-clone command passed. |
| Review 1 B4 | Fixed: demo/legal links, metadata, H1 focus, and designed HTTP 404 work live. |
| Review 1 H1 | Fixed: current landing/README claim-like text maps to the manifest; no unlisted claim remained. |
| Review 1 C1 | Fixed: H1 names the task; “scriptable primitive” is absent. |
| Review 1 C2 | Fixed: prompt/selection language is literal and old decorative metaphors are absent. |
| Review 1 C3 | Fixed: sample, builder, and copy controls name results. |
| Review 1 C4 | Fixed: mechanics headings state the operation. |
| Review 1 C5 | Fixed: additions/deletions are explained plainly and prose uses “working file.” |
| Review 1 C6 | Fixed: source installation is literal and tested. |
| Review 1 C7 | Fixed: `--json` is described as one JSON result. |
| Review 1 C8 | Fixed: CTAs/footer are factual and outcome-led. |
| Review 1 C9 | Fixed: unavailable registry/archive promises are absent. |
| Review 1 C10 | Fixed: exit-code copy is short and tested. |
| Review 1 C11 | Fixed: copy controls identify what they copy. |
| Review 1 structure failures | Fixed: social metadata, favicon/touch icon, shared chrome, robots/sitemap, focus, and 404 verified live. |
| Review 2 B1 | Fixed: only the passing Git-source Cargo install command remains. |
| Review 2 M1 | Fixed: old filter/engine jargon is replaced by plain file-preparation/comparison wording. |
| Review 2 M2 | Fixed: the demo exit says “View installation steps.” |
| Review 3 F-3-1 | Fixed: browser claim commands self-build and passed from an unbuilt clean clone. |
| Review 3 F-3-2 | Fixed: tagged tests cover minus-prefixed unstage deletion and normalized filtered text. |
| Review 3 F-3-3 | Fixed: the untestable account claim is absent. |
| Review 3 F-3-4 | Fixed: builder label is “File path in the repository.” |
| Review 3 F-3-5 | Fixed: rendered explanatory text and README use “working file.” |
| Review 3 F-3-6 | Fixed: last-commit, JSON, conversion, and scope copy remains plain. |
| Review 3 F-3-7 | Fixed: live axe found no violation; package facts are not a nested landmark. |
| Review 3 F-3-8 | Fixed: all visible 390px controls measured at least 44px in both dimensions. |
| Review 4 F-4-1 | Fixed: page distinguishes browser recording from separately created CLI temporary repository. |
| Review 4 F-4-2 | Fixed: demo contract and visible exit both say “View installation steps.” |
| Review 5 F-5-1 | Fixed: live Reset says “Demo recording reset.” and claim test asserts it and focus. |
| Review 5 F-5-2 | Fixed: only decorative art reveals; text is immediately opaque, axe is clear, and `npm test` passes. |

## Missed leverage

No AI, import/export, or sync feature is implied by the brief. The job is
deterministic local line-range staging; sending repository content to an AI
service would weaken its privacy and precision. The useful integrations are
already present: Git subcommand discovery, JSON output, and Node/Python wrappers.

## What would make this perfect

This round found nothing left to implement. Preserve the recorded-browser-demo
versus CLI-demo distinction, claim tests, and product-specific visual system in
future changes.
