# First-read review 2 — git-stage-lines

**Verdict: FAIL.** Reviewed 2026-08-28 against <https://git-stage-lines.sociobot.in> in independent fresh Chromium contexts at 390×844 and 1440×1000. This review changed no product code.

## First 30 seconds

Before scrolling, I understood: this is a Git command that stages only the changed line numbers chosen by a script; it is for developers and coding agents that cannot use `git add -p`; click **“Try it with sample data”** first. The 390px context showed the headline, audience sentence, action, and action note fully in the initial viewport (the action occupied y=445–493). The desktop result was equally clear. This first-read check passes.

## Findings, ordered by severity

### B1 — The primary advertised Cargo installation command is false and has no claim entry

**Quote:** “**Install from Cargo**” followed by `cargo install git-stage-lines`.

**Why this fails first-read honesty:** This presents a normal registry installation as available. In a clean clone on 2026-08-28, `cargo search git-stage-lines --limit 5` returned no package, and `cargo install git-stage-lines --version 0.1.0 --root <fresh-temp-dir>` failed with: `could not find git-stage-lines in registry crates-io with version =0.1.0`. The README instead says “Install from source with Cargo”, so the site and README give conflicting installation paths. This is an operational promise visitors can rely on, but it has no `.factory/claims.json` entry or tagged test.

**Concrete fix:** Until a crate is published, remove the registry card and make the verified command the sole install action: `cargo install --git https://github.com/B-Divyesh/sf-git-stage-lines`. If a crates.io release is intended, publish it first, then add an `install-from-cargo` claim whose clean temporary-directory test installs the version advertised on the page and runs `git-stage-lines --version`.

### M1 — Two landing explanations use internal Git terms before explaining them

**Quotes:** “The command uses Git’s clean filters and patch engine.” and “Compare the index with Git’s cleaned working file.”

**Why this adds friction:** “clean filters”, “patch engine”, and “cleaned working file” are implementation terms. A visitor can understand the product without them, and the surrounding headings promise plain explanation.

**Concrete rewrite:** Use “Git prepares the file using its own rules, then applies the selected lines to the index.” and “Compare Git’s saved version with your edited file.” Keep the detailed terms in the reference section only.

### M2 — “Start for real” does not name the result

**Quote:** “Start for real”.

**Why this adds friction:** The demo control navigates to installation, but its label does not say that. A person who is ready to use the tool cannot predict the destination.

**Concrete rewrite:** Change the control to **“View installation steps”**.

No sentence exceeds 22 words. No banned marketing adjective was found. `index`, `working file`, `selected lines`, `demo`, and `JSON result` are used consistently in prose. The two Git-internal expressions above are the copy-jargon flags.

## Copy audit

Counts are whitespace-delimited. Commands, code/diff/JSON examples, URLs, and repeated header/footer navigation are not sentences and are omitted; all visible prose, headings, labels, and controls are listed below.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Non-interactive Git staging | 3 | Pass |
| Stage exact Git lines from a script | 7 | Pass |
| For developers and coding agents that need selected changes without `git add -p`. | 13 | Pass |
| Try it with sample data | 5 | Pass |
| Runs a sample repository in a temporary directory. | 8 | Pass |
| Your files stay unchanged. | 4 | Pass |
| Stages selected changed lines | 4 | Pass |
| No prompts or network calls | 5 | Pass |
| Free under the MIT License | 5 | Pass |
| Sample command builder | 3 | Pass |
| Build a staging command | 4 | Pass |
| Use file line numbers for additions. | 6 | Pass |
| Use `-` plus the original line number for deletions. | 9 | Pass |
| Repository path | 2 | Pass |
| Changed lines to stage | 4 | Pass |
| Try `3-4,7` or a deletion such as `-2`. | 8 | Pass |
| Your command | 2 | Pass |
| Copy staging command | 3 | Pass |
| working tree / selected range / index | 2 / 2 / 1 | Pass |
| How it works | 3 | Pass |
| Change only the index | 4 | Pass |
| The command uses Git’s clean filters and patch engine. | 9 | M1 jargon |
| It does not rewrite the working file. | 7 | Pass |
| Read the change | 3 | Pass |
| Compare the index with Git’s cleaned working file. | 8 | M1 jargon |
| Select file lines | 3 | Pass |
| Keep the requested additions, deletions, and paired replacements. | 8 | Pass |
| Check and apply | 3 | Pass |
| Validate one patch before updating the index. | 7 | Pass |
| Line reference | 2 | Pass |
| Choose either side of a change | 6 | Pass |
| A bad line, binary file, or conflict stops the full command before the index changes. | 15 | Pass |
| Line numbers in stage and unstage modes | 7 | Pass |
| Token / Stage / Unstage | 1 / 1 / 1 | Pass |
| Working-file lines / Current index lines / Deleted index lines / Deleted `HEAD` lines | 2 / 3 / 3 / 3 | Pass |
| Replacement / Either line selects the paired replacement | 1 / 6 | Pass |
| Scope and privacy | 3 | Pass |
| Keep the operation local | 4 | Pass |
| The CLI runs Git locally. | 5 | Pass |
| It has no network calls. | 6 | Pass |
| Text files only. | 3 | Pass |
| Binary data is rejected without changing the index. | 8 | Pass |
| No history changes. | 3 | Pass |
| The command does not commit, rebase, or split commits. | 9 | Pass |
| No account. | 2 | Pass |
| The site makes same-origin requests and uses no cookies, local storage, or session storage. | 14 | Pass |
| Install / v0.1.0 | 3 | Pass |
| Install one Git subcommand | 4 | Pass |
| Git exposes the `git-stage-lines` executable as `git stage-lines`. | 8 | Pass |
| Install from Cargo | 3 | B1 |
| Copy Cargo command | 3 | B1 |
| Install from source | 3 | Pass |
| Copy source command | 3 | Pass |
| Package facts / Price / Free / Network calls / None / License / MIT | 2 / 1 / 1 / 2 / 1 / 1 / 1 | Pass |
| For coding agents | 3 | Pass |
| Read a JSON result | 4 | Pass |
| Pass `--json` to receive one object on standard output. | 9 | Pass |
| Run the sample first | 4 | Pass |
| See the staged lines | 4 | Pass |
| Stage selected Git lines from scripts. | 6 | Pass |
| Built by Param Factory · v0.1.0 | 5 | Pass |
| You’re offline. | 2 | Pass |
| The visited pages still work. | 5 | Pass |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| git-stage-lines | 1 | Pass |
| Stage selected Git lines from scripts and coding agents without an interactive patch prompt. | 14 | Pass |
| Try the isolated sample | 4 | Pass |
| Every run creates a new repository under the system temporary directory. | 11 | Pass |
| It copies the files in `examples`, stages lines 5 and 10, and leaves one sample change unstaged. | 17 | Pass |
| The command prints the repository path for review. | 8 | Pass |
| The matching browser recording is at <https://git-stage-lines.sociobot.in/?demo=1>. | 7 | Pass |
| Reset demo restores the recording. | 5 | Pass |
| The page uses no cookies, local storage, or session storage. | 10 | Pass |
| Install | 1 | Pass |
| Install from source with Cargo: | 5 | Pass |
| Git discovers the `git-stage-lines` executable as `git stage-lines`. | 8 | Pass |
| Use line ranges | 3 | Pass |
| Positive numbers select changed lines in the working file. | 8 | Pass |
| Prefix a range with `-` to select deleted original lines. | 10 | Pass |
| Selecting either side of a replacement selects the paired replacement. | 10 | Pass |
| An invalid line rejects the command before the index changes. | 10 | Pass |
| Git clean filters determine text contents. | 6 | Pass |
| Binary data is rejected without changing the index. | 8 | Pass |
| Success exits `0`. | 3 | Pass |
| Bad arguments or unmatched lines exit `2`. | 7 | Pass |
| Other file or Git failures exit `1`. | 8 | Pass |
| Use typed wrappers | 3 | Pass |
| The repository includes small Node and Python wrappers: | 8 | Pass |
| See `wrappers/node` and `wrappers/python`. | 4 | Pass |
| Develop and verify | 3 | Pass |
| The static site is built with `npm run build:site` and deployed from `dist/site`. | 13 | Pass |
| See `.factory/claims.json` for claim-level commands and `.factory/demo.md` for isolation details. | 10 | Pass |
| Scope | 1 | Pass |
| Version 0.1.0 supports regular text files in the worktree, index, and `HEAD` flow. | 13 | Pass |
| It does not rewrite history, create commits, or stage binary data. | 11 | Pass |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See `LICENSE`. | 2 | Pass |

## Demo and sandbox checks

- The first-screen **“Try it with sample data”** link reached `/demo/` in one click on mobile and desktop.
- The first demo screen immediately showed a realistic sample command, two staged ticket/comment lines, and one explicitly unstaged follow-up comment.
- The persistent banner read **“Demo — sample data, nothing is saved”** and contained **Reset demo** and **Start for real**. Reset restored the sample and moved focus to its terminal output.
- Fresh browser contexts had zero cookies, local storage, session storage, IndexedDB databases, and OPFS entries. Captured browser traffic used only `https://git-stage-lines.sociobot.in`. Cache Storage contained only the expected service-worker cache.
- After visiting all four public routes and activating the service worker, `/`, `/demo/`, `/privacy/`, and `/terms/` all reloaded offline with their expected H1s.
- From a fresh temporary caller directory, the actual `target/debug/git-stage-lines --demo` command created `/tmp/git-stage-lines-demo-*`, printed the staged and still-unstaged diff, and did not use the caller directory as a repository.

## Claims verification

I used a fresh clone at `/tmp/git-stage-lines-review-2-1tO13L`, ran `npm ci`, then `npm run build` before executing every exact command registered in `.factory/claims.json`. All 18 passed:

| Claim IDs | Result |
| --- | --- |
| exact-selection; worktree-unchanged; dry-run; unstage; reject-atomic; json-output; line-number-semantics; text-safety; git-subcommand; cli-no-network; demo-isolation | Pass |
| demo-entry; site-private; offline-reload | Pass |
| mit-license; exit-codes; scope-boundaries; typed-wrappers | Pass |

The registered claims cover the landing/README behavior claims about exact selection, immutability, no prompt/network, demo isolation, storage/privacy, offline behavior, license, JSON, range semantics, safety, and scope. B1 is the one unlisted, failed operational promise found when rereading the live page.

## Structure, accessibility, and identity checks

| Check | Result | Evidence |
| --- | --- | --- |
| Metadata and landmarks | Pass | All checked public pages have `lang=en`, one H1, `main`, title, plain description, canonical, OG/Twitter image metadata, SVG favicon, and apple touch icon. Route titles are distinct. |
| 404 and deep links | Pass | `/not-a-real-route` returned HTTP 404 with “Find a valid page”; direct `/demo/`, `/privacy/`, and `/terms/` loads succeeded. |
| Back/focus behavior | Pass | Demo → Back and Privacy → Back returned to the landing H1 and focused it. |
| Link crawl | Pass | Home, demo, privacy, terms, 404 asset, robots, sitemap, repository, and LICENSE links returned 200. |
| Header/footer | Pass | Header/nav and footer include the wordmark, Demo, Install, Privacy, Privacy, Terms, Param Factory attribution, and version consistently. |
| Mobile, console, accessibility | Pass | No horizontal overflow at 390px, no console errors, and axe reported no serious or critical violations on the landing page. |
| Visual identity | Pass | The ceramic layers, range mark, restrained mineral palette, and code-sheet/terminal treatment are distinct and align with `.factory/design.md`; this is not a generic SaaS template. |

Acceptance requires B1 to be fixed and verified. The demo, claim suite, privacy/offline behavior, and information architecture otherwise passed this review.
