import json
import unittest
from unittest.mock import patch

from git_stage_lines import stage_lines


class WrapperTest(unittest.TestCase):
    @patch("git_stage_lines.subprocess.run")
    def test_documented_python_wrapper_uses_json_without_a_shell(self, run):
        run.return_value.stdout = json.dumps(
            {
                "ok": True,
                "mode": "stage",
                "dryRun": True,
                "files": ["src/app.py"],
                "changedLines": 7,
                "patch": "diff --git",
            }
        )
        result = stage_lines(["src/app.py:12-18"], dry_run=True)
        self.assertTrue(result["ok"])
        run.assert_called_once_with(
            ["git-stage-lines", "--json", "--dry-run", "src/app.py:12-18"],
            check=True,
            text=True,
            capture_output=True,
        )


if __name__ == "__main__":
    unittest.main()
