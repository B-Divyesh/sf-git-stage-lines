# @git-stage-lines/node

Typed, zero-dependency Node wrapper for `git-stage-lines` 0.1.x. Install the
Rust executable on `PATH`, then:

```js
import { stageLines } from "@git-stage-lines/node";

const result = await stageLines(["src/app.ts:12-18,40"], { dryRun: true });
console.log(result.patch);
```

The wrapper uses `execFile`, not a shell, and always requests JSON.
