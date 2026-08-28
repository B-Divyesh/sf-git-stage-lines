# First-read review 1 — git-stage-lines

**Verdict: FAIL.** Reviewed 2026-08-28 against https://git-stage-lines.sociobot.in in fresh Chromium contexts at 390×844 and 1440×1000, before scrolling. This is an independent QA record; product code was not changed.

## First 30 seconds

I understood approximately “a Git command that selects specific changed lines for the index.” I could not answer who it is for from the first screen: “**Git’s missing scriptable primitive**” names neither a person nor a situation. I could not identify a safe first action to try the product: the primary action is “**Install the CLI**” beside “cargo install git-stage-lines”; “**Try the grammar**” only scrolls to a syntax form.

The visual treatment is product-specific, not a generic SaaS template: the ceramic/layer image, range mark, restrained palette, and code-sheet layout are distinct. The failure is clarity and verifiability.

## Findings, ordered by severity

### B1 — First screen omits audience and a safe first action

**Quote:** “Git’s missing scriptable primitive”; “Install the CLI”; “Try the grammar”.

**Why a first-time visitor is lost:** A cold phone visitor has no stated audience and is asked to install Cargo before seeing a real staging operation. “Scriptable primitive” is Git/Unix jargon, not an audience. The apparent try action is a grammar form, not the product doing its job.

**Concrete fix:** Replace the copy with “Stage exact Git lines from a script” and “For developers and coding agents that need to stage selected changes without git add -p.” Make **Try it with sample data** the primary action, beside “Runs a sample repository in a temporary directory; your files stay unchanged.”

### B2 — No one-click, isolated CLI demo exists

**Evidence/quote:** No “Try it with sample data” action exists. /demo and /?demo=1 both return the ordinary landing page. No .factory/demo.md or examples/ directory exists. In a new temporary directory, “git-stage-lines --demo” exited 2 with “unexpected argument '--demo'”; “git-stage-lines demo” returned the ordinary non-repository error. The landing page has no terminal recording, **“Demo — sample data, nothing is saved”**, **Reset demo**, or **Start for real**.

**Why a first-time visitor is lost:** They cannot exercise line-range staging without installing software and preparing a repository. The required isolated path cannot be checked for reset, storage separation, or protection of real data.

**Concrete fix:** Ship examples/ with a realistic small repository and a git stage-lines --demo (or git stage-lines demo) command that copies it to a temporary directory, stages representative selected lines, and prints the output location. Add a self-hosted terminal recording, link **Try it with sample data** to /demo or that command, and document sample/reset/isolation in .factory/demo.md.

### B3 — Required claims register and tests are absent

**Evidence:** .factory/claims.json is missing and search found no @claim: test tags. Therefore no listed claim tests could run. A full npm ci && npm test from fresh local clone /tmp/git-stage-lines-review-PaacED passed (Rust 6 unit + 7 integration + 1 doctest; Node/Python; 8 Playwright), but it is not a claim-by-claim sandbox suite.

**Why a first-time visitor is misled:** Operational, privacy, atomicity, and offline claims have no executable record of where each is made, what outcome proves it, or whether it holds from a clean demo state.

**Concrete fix:** Add .factory/claims.json and one @claim:<id> test per statement, all run from --demo in a fresh temporary directory. Cover exact selection, index/worktree immutability, --dry-run, --unstage, rejection without mutation, JSON, and no-network/privacy. Delete any assertion that cannot be tested.

### B4 — /demo and unknown URLs silently serve the home page

**Evidence:** GET /demo, GET /?demo=1, and GET /not-a-real-route returned HTTP 200 with the home canonical and home H1. A designed 404.html exists in the repository but is not served for the unknown live URL.

**Why a first-time visitor is misled:** A direct demo link does not enter a demo and a bad address pretends to be home. Address-bar verification, back-button routing, and recovery are broken.

**Concrete fix:** Deploy real /demo, /privacy, and /terms routes with route-specific title/canonical metadata. Configure the host to serve the designed 404 with HTTP 404. Add direct-load, reload, Back, destination-H1-focus, and 404 tests.

### H1 — Every visitor-relevant claim is unlisted

No claims register exists, so each quoted assertion below is an **unlisted claim** finding. Add one manifest entry and tagged observable test for each, or remove it.

| Location | Unlisted claim-like copy |
| --- | --- |
| Landing | “Put exactly lines 12–18 and 40 in the index.”; “No patch prompts, no hand-built diffs, no terminal choreography.”; “One atomic patch”; “Zero prompts”; “Zero telemetry”; “MIT licensed”. |
| Landing | Positive/new-side and deletion/old-index line-number assertions; “The CLI uses the repository’s own filters and patch engine.”; “Your working copy is never rewritten.”; paired replacement, atomic patch, and no-apply-on-error assertions. |
| Landing | Git-subcommand discovery; “Network Never”; JSON/wrapper/no-shell assertions; “The docs and range lab still work locally.” |
| README | Exact staging; diff/minimal-patch/atomicity; no-worktree/network/prompt; Git version; Git discovery; all range semantics; CRLF/filter matching; binary/path rejection; exit-code and JSON contracts. |
| README | Typed-wrapper/shell-quoting statements; zero-telemetry/local-only visualizer; no CDN/storage; and v0.1 text-file/scope statements. |

A live browser capture for /?demo=1 used only the product origin; local/session storage were empty, Cache Storage held git-stage-lines-v1, and an offline reload rendered. This is **not** valid claim verification: /?demo=1 was not a demo, no sample CLI job ran, and no claim test records the observation.

## Copy audit

Counts are whitespace-delimited. Commands, code-diff rows, JSON output, and URLs are excluded; headings, controls, and labels are included because a cold visitor reads them.

### Landing page — every prose/UI sentence and label

| Copy | Words | Flag |
| --- | ---: | --- |
| Git’s missing scriptable primitive | 4 | C1 |
| Stage the lines. / Only the lines. | 3 / 3 | — |
| Put exactly lines 12–18 and 40 in the index. | 8 | H1 |
| No patch prompts, no hand-built diffs, no terminal choreography. | 9 | C2, H1 |
| Install the CLI / Try the grammar | 3 / 3 | B1, C3 |
| One atomic patch / Zero prompts / Zero telemetry / MIT licensed | 3 / 2 / 2 / 2 | H1 |
| Range lab / local only / A tiny grammar with exact edges. | 4 / 6 | C3 |
| Positive numbers address working-tree lines. | 5 | H1 |
| Prefix deletions with - to address their old index line numbers. | 10 | H1 |
| Repository path / Changed lines to stage / Try 3-4,7 or a deletion such as -2. | 2 / 4 / 8 | — |
| Your command / Copy command / selected lines are glazed blue | 2 / 2 / 5 | C2 |
| Under the glaze / Git stays in charge. | 3 / 4 | C4 |
| The CLI uses the repository’s own filters and patch engine. / Your working copy is never rewritten. | 10 / 6 | H1 |
| Read both sides / Compare the current index to Git’s filtered working-tree blob. | 3 / 9 | C5 |
| Cut on line boundaries / Keep only the requested changed lines and their paired replacements. | 4 / 9 | H1 |
| Validate, then apply / Check one combined patch before atomically updating the index. | 3 / 8 | H1 |
| No hidden semantics / Each number names one side. | 3 / 6 | C5 |
| Line numbering in stage and unstage modes | 7 | — |
| Working-tree lines / Current index lines / Deleted index lines / Deleted HEAD lines | 3 / 3 / 3 / 3 | C5 |
| Either side selects the paired whole-line change. | 7 | H1 |
| Safety edge: if any number is unchanged, out of range, binary, or conflicted, nothing is applied. | 16 | H1 |
| Install / v0.1.0 / One binary. Then it speaks Git. | 3 / 6 | C6 |
| Git automatically exposes an executable named git-stage-lines as git stage-lines. | 11 | H1 |
| From Cargo / From source / Requires | 2 / 2 / 1 | — |
| Git 2.30+ / Runtime None / Network Never / License MIT | 2 / 2 / 2 / 2 | H1 |
| Built for agents, too / A stable answer for tool calls. | 4 / 6 | C7 |
| Use --json directly or the included typed wrappers. / No shell and no prompt parsing. | 8 / 6 | H1 |
| Stop editing patches by hand / Make the index exact. | 5 / 4 | C8, H1 |
| View source on GitHub / Small, sharp software from Sociobot. | 4 / 5 | C8 |
| You’re offline. / The docs and range lab still work locally. | 2 / 8 | H1 |

### README — every prose sentence

| Copy | Words | Flag |
| --- | ---: | --- |
| Stage exact changed lines from a script, one command, or a coding agent—without driving git add -p. | 17 | H1 |
| git-stage-lines is a non-interactive Git subcommand for developers and automation that need a precise index. | 15 | C5, H1 |
| It computes the text diff, builds one minimal patch, validates it with Git, and applies it to the index atomically. | 20 | H1 |
| It never changes the working tree, commits, calls a network service, or emits an interactive prompt. | 16 | H1 |
| Requires Git 2.30 or newer. / Prebuilt release archives are intended for normal installation. | 5 / 8 | H1, C9 |
| To install from source with Rust 1.80+: / Git discovers any git-stage-lines executable on PATH as git stage-lines. | 7 / 11 | H1 |
| Positive numbers select changed lines on the new side of the comparison. | 12 | H1 |
| Prefix a number or range with - to select a deletion by its old-side line number. | 16 | H1 |
| In normal staging mode, the old side is the current index and the new side is the filtered working-tree file. | 17 | C5, H1 |
| In --unstage mode, the old side is HEAD and the new side is the current index. | 16 | C5, H1 |
| A changed replacement is indivisible at the line level: selecting either its old or new line stages/unstages that paired whole-line replacement. | 22 | C5, H1 |
| Adjacent pure additions and deletions remain individually selectable. | 8 | H1 |
| Every requested number must name a changed line; otherwise the command fails before modifying the index. | 16 | H1 |
| CRLF files are compared after Git's configured clean filters, so line numbers match Git's own diff. | 18 | C5, H1 |
| Binary and non-UTF-8 blobs are rejected with a useful error and no partial update. | 14 | H1 |
| Paths are repository-relative and may contain spaces; .., absolute paths, unresolved conflicts, and submodules are rejected. | 15 | H1 |
| Exit codes are 0 for success (including a valid no-op), 2 for invalid arguments or unmatched lines, and 1 for repository/Git/apply failures. | 24 | C10, H1 |
| With --json, stdout is a single object containing ok, mode, dryRun, files, changedLines, and patch; diagnostics go to stderr. | 19 | C5, H1 |
| Thin typed wrappers invoke the same executable, so agent harnesses do not need to parse shell quoting. | 15 | H1 |
| Both require git-stage-lines on PATH and request the stable JSON output. | 11 | H1 |
| The zero-telemetry landing page at git-stage-lines.sociobot.in documents the same grammar and includes a local-only range visualizer. | 16 | H1 |
| It has no runtime CDN requests or user storage. | 9 | H1 |
| Version 0.1.0 operates on text files in the regular worktree/index/HEAD flow. | 10 | C5, H1 |
| It intentionally does not rewrite history, split commits, stage binary data, resolve merge conflicts, or provide an interactive UI. | 19 | H1 |

README headings/labels: git-stage-lines (1), Install (1), Usage (1), Agent wrappers (2), Develop and verify (3), Design limits (2), License (1).

### Copy findings and required rewrites

| ID | Quote | Why a first-time visitor is lost or misled | Concrete rewrite |
| --- | --- | --- | --- |
| C1 | “Git’s missing scriptable primitive” | Jargon; no job/audience. | “Stage exact Git lines from a script”. |
| C2 | “terminal choreography”; “glazed blue” | Metaphor hides task. | “without interactive prompts”; “selected lines”. |
| C3 | “Try the grammar”; “Range lab”; “exact edges” | Result is unnamed. | “Build a sample staging command”; “Sample command builder — runs in this page”. |
| C4 | “Under the glaze”; “Git stays in charge.” | Headings do not stand alone. | “How the command changes the index”; “Git applies the selected patch”. |
| C5 | “filtered working-tree blob”, “old/new side”, “No hidden semantics”, “stable JSON output” | Dense Git terms precede a plain explanation. | “Use file line numbers for additions. Use - plus the original line number for deletions.” Move detailed Git terms to reference copy. |
| C6 | “One binary. Then it speaks Git.” | Metaphor obscures outcome. | “Install one executable, then run git stage-lines.” |
| C7 | “Built for agents, too”; “A stable answer for tool calls.” | Audience and benefit undefined. | “For coding agents: --json returns a machine-readable result.” |
| C8 | “Stop editing patches by hand”; “Small, sharp software …” | Marketing/imperative, not outcome. | “Stage only the changed lines you choose”; “A small Git command from Sociobot.” |
| C9 | “Prebuilt release archives are intended for normal installation.” | Promises a path with no archive link. | Link a release archive, or say “Install from source with Cargo.” |
| C10 | 24-word exit-code sentence | Exceeds the 22-word cap and combines three contracts. | “Success exits 0. Bad ranges exit 2. Git or apply failures exit 1.” |
| C11 | Visible “Copy” buttons (three) | Generic action does not name its result. | “Copy install command”, “Copy Cargo command”, “Copy source command”. |

No prohibited word from the supplied banned list was found. C1–C11 still fail the plain-language requirements for jargon, metaphor, generic controls, promise clarity, and sentence length.

## Structure and platform checks

| Check | Result | Evidence / concrete fix |
| --- | --- | --- |
| Title, lang, one H1, main, description, favicon on / | Pass | Requested product/action title, lang=en, one H1, main, description, canonical, and SVG favicon present. |
| Canonical/OG/Twitter/apple-touch metadata | Fail | No Open Graph tags, Twitter card tags, or 180px apple-touch icon. Add product-art metadata on every route. |
| Route metadata | Fail | /demo has home title/canonical; Privacy and Terms lack canonical. Add route-specific metadata. |
| Designed 404 | Fail | /404.html is designed but unknown live URL returns home with 200. See B4. |
| Direct routes, Back, focus announcement | Fail | No real demo route, so direct demo/Back/H1-focus cannot be confirmed. Add B4 tests. |
| Link crawl | Pass | Home, Privacy, Terms, GitHub repository, LICENSE, and Sociobot returned 200. |
| Header/footer consistency | Fail | Legal pages replace navigation with “Back to product”; footers omit product one-liner, “Built by Param Factory”, and version/build id. Home header omits Demo and Privacy. |
| Visual identity | Pass | Distinct; not a generic SaaS template. |

## Verification record

- Fresh live Chromium checks at 390×844 and 1440×1000: no console errors and no horizontal overflow at 390px.
- Demo/storage: /demo and ?demo=1 were ordinary home pages; no demo banner/reset/start controls; local/session storage empty; Cache Storage contained git-stage-lines-v1.
- Privacy/offline observation: ?demo=1 requested only same-origin resources and reloaded offline after service-worker activation; it is not a demo-based claim test.
- Fresh-clone check: npm ci && npm test passed in /tmp/git-stage-lines-review-PaacED. No claim test was runnable because the manifest is missing.
- CLI demo check: in /tmp/git-stage-lines-demo-Nhdj5a, --demo exited 2 and demo did not load sample data.

Acceptance requires B1–B4 to be resolved. Under the stated rule, this review cannot pass regardless of the otherwise passing generic suite.

