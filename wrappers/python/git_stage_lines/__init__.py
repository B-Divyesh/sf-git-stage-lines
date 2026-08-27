"""Typed subprocess wrapper for the git-stage-lines executable."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path
from typing import List, Literal, Optional, Sequence, TypedDict


class StageLinesResult(TypedDict):
    ok: Literal[True]
    mode: Literal["stage", "unstage"]
    dryRun: bool
    files: List[str]
    changedLines: int
    patch: str


def stage_lines(
    selectors: Sequence[str],
    *,
    cwd: Optional[Path | str] = None,
    dry_run: bool = False,
    unstage: bool = False,
    executable: str = "git-stage-lines",
) -> StageLinesResult:
    """Stage or unstage exact changed lines and return the JSON result.

    The executable is invoked directly without a shell. ``selectors`` use the
    documented ``path:12-18,40,-9`` grammar.
    """
    if not selectors:
        raise ValueError("selectors must not be empty")
    args = [executable, "--json"]
    if dry_run:
        args.append("--dry-run")
    if unstage:
        args.append("--unstage")
    if cwd is not None:
        args.extend(("--repo", str(cwd)))
    args.extend(selectors)
    completed = subprocess.run(args, check=True, text=True, capture_output=True)
    return json.loads(completed.stdout)


__all__ = ["StageLinesResult", "stage_lines"]
