# git-stage-lines for Python

Typed, dependency-free Python wrapper for `git-stage-lines` 0.1.x. Install the
Rust executable on `PATH`, then:

```python
from git_stage_lines import stage_lines

result = stage_lines(["src/app.py:12-18,40"], dry_run=True)
print(result["patch"])
```

The wrapper invokes the binary directly without a shell and requests JSON.
