# Demo contract

## Entry points

- Browser: <https://git-stage-lines.sociobot.in/?demo=1>, which enters `/demo/`.
- CLI from this repository: `cargo run -- --demo`.
- Installed CLI: `git-stage-lines --demo`.

## Sample data and result

The sample files are `examples/sprint-board.initial.ts` and
`examples/sprint-board.working.ts`. They describe three assigned tickets and
two comments in a small TypeScript sprint board.

The CLI creates a new Git repository in the operating system’s temporary
directory. It commits the initial file, copies the working file, and runs:

```sh
git stage-lines sprint-board.ts:5,10
```

The added `GSL-24` ticket and urgent-ticket comment enter the index. The
follow-up comment stays unstaged so the selected boundary is visible.

## Isolation and reset

Each CLI run uses a unique `git-stage-lines-demo-*` directory. It never opens
the caller’s repository. Run `--demo` again to reset into another new directory.

The browser demo is a self-hosted recording of the same bundled operation. It
has no mutable data namespace because it stores nothing in local storage,
session storage, cookies, IndexedDB, or OPFS. **Reset demo** restores the
recording in memory. **Start for real** leaves demo mode and opens installation.
