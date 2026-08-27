//! Library engine for the `git-stage-lines` Git subcommand.
//!
//! The public parser and selector use the same range semantics as the CLI:
//!
//! ```
//! use git_stage_lines::{parse_range_list, select_text};
//!
//! let ranges = parse_range_list("2").unwrap();
//! let (selected, count) = select_text("one\nthree\n", "one\ntwo\nthree\n", &ranges, true).unwrap();
//! assert_eq!(selected, "one\ntwo\nthree\n");
//! assert_eq!(count, 1);
//! ```

use serde::Serialize;
use similar::{DiffTag, TextDiff};
use std::collections::{BTreeMap, HashSet};
use std::ffi::OsStr;
use std::fs;
use std::path::{Component, Path, PathBuf};
use std::process::{Command, Stdio};

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
pub enum Side {
    Old,
    New,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub struct LineRange {
    pub side: Side,
    pub start: usize,
    pub end: usize,
}

#[derive(Clone, Debug, Default)]
pub struct Selection {
    pub ranges: Vec<LineRange>,
}

impl Selection {
    fn selects(&self, side: Side, line: usize) -> bool {
        self.ranges
            .iter()
            .any(|range| range.side == side && range.start <= line && line <= range.end)
    }

    fn expected_lines(&self) -> impl Iterator<Item = (Side, usize)> + '_ {
        self.ranges
            .iter()
            .flat_map(|range| (range.start..=range.end).map(move |line| (range.side, line)))
    }
}

#[derive(Debug)]
pub struct CliError {
    pub message: String,
    pub usage: bool,
}

impl CliError {
    fn usage(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
            usage: true,
        }
    }

    fn runtime(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
            usage: false,
        }
    }
}

impl std::fmt::Display for CliError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.message)
    }
}

impl std::error::Error for CliError {}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RunResult {
    pub ok: bool,
    pub mode: &'static str,
    pub dry_run: bool,
    pub files: Vec<String>,
    pub changed_lines: usize,
    pub patch: String,
}

#[derive(Clone, Debug)]
struct Entry {
    exists: bool,
    mode: String,
    content: String,
}

pub fn parse_range_list(input: &str) -> Result<Selection, CliError> {
    if input.is_empty() {
        return Err(CliError::usage("the range list is empty"));
    }
    let mut selection = Selection::default();
    for raw in input.split(',') {
        if raw.is_empty() {
            return Err(CliError::usage(format!("empty range in '{input}'")));
        }
        let (side, value) = if let Some(rest) = raw.strip_prefix('-') {
            (Side::Old, rest)
        } else {
            (Side::New, raw)
        };
        let separator = if side == Side::Old { "--" } else { "-" };
        let (start, end) = if let Some((left, right)) = value.split_once(separator) {
            if right.contains(separator) {
                return Err(CliError::usage(format!("invalid range '{raw}'")));
            }
            (parse_line(left, raw)?, parse_line(right, raw)?)
        } else {
            let line = parse_line(value, raw)?;
            (line, line)
        };
        if start > end {
            return Err(CliError::usage(format!(
                "range '{raw}' runs backwards; use {end}-{start}"
            )));
        }
        if end - start > 1_000_000 {
            return Err(CliError::usage(format!("range '{raw}' is too large")));
        }
        selection.ranges.push(LineRange { side, start, end });
    }
    Ok(selection)
}

fn parse_line(value: &str, raw: &str) -> Result<usize, CliError> {
    let line = value
        .parse::<usize>()
        .map_err(|_| CliError::usage(format!("invalid line range '{raw}'")))?;
    if line == 0 {
        return Err(CliError::usage("line numbers start at 1"));
    }
    Ok(line)
}

pub fn parse_spec(input: &str) -> Result<(String, Selection), CliError> {
    for (index, _) in input.match_indices(':').rev() {
        let (path, suffix) = input.split_at(index);
        if let Ok(selection) = parse_range_list(&suffix[1..]) {
            validate_path(path)?;
            return Ok((path.to_owned(), selection));
        }
    }
    Err(CliError::usage(format!(
        "invalid selector '{input}'; expected PATH:12-18,40,-9"
    )))
}

fn validate_path(path: &str) -> Result<(), CliError> {
    if path.is_empty() || path.contains(['\0', '\n', '\r']) {
        return Err(CliError::usage(
            "paths must be non-empty single-line values",
        ));
    }
    let candidate = Path::new(path);
    if candidate.is_absolute()
        || candidate
            .components()
            .any(|part| !matches!(part, Component::Normal(_)))
    {
        return Err(CliError::usage(format!(
            "'{path}' must be a repository-relative path without '.' or '..'"
        )));
    }
    Ok(())
}

/// Build the partially changed text represented by `selection`.
///
/// When `keep_selected` is true, selected changes are applied to `old`.
/// When false, every change except the selected changes is applied. The latter
/// is the inverse operation used by `--unstage`.
pub fn select_text(
    old: &str,
    new: &str,
    selection: &Selection,
    keep_selected: bool,
) -> Result<(String, usize), CliError> {
    let old_lines: Vec<&str> = old.split_inclusive('\n').collect();
    let new_lines: Vec<&str> = new.split_inclusive('\n').collect();
    let diff = TextDiff::from_lines(old, new);
    let mut result = String::new();
    let mut matched = HashSet::new();
    let mut changed = HashSet::new();

    for op in diff.ops() {
        let old_range = op.old_range();
        let new_range = op.new_range();
        match op.tag() {
            DiffTag::Equal => {
                for line in &old_lines[old_range] {
                    result.push_str(line);
                }
            }
            DiffTag::Delete => {
                for (offset, line) in old_lines[old_range].iter().enumerate() {
                    let number = op.old_range().start + offset + 1;
                    let selected = selection.selects(Side::Old, number);
                    if selected {
                        matched.insert((Side::Old, number));
                        changed.insert((Side::Old, number));
                    }
                    let keep_change = if keep_selected { selected } else { !selected };
                    if !keep_change {
                        result.push_str(line);
                    }
                }
            }
            DiffTag::Insert => {
                for (offset, line) in new_lines[new_range].iter().enumerate() {
                    let number = op.new_range().start + offset + 1;
                    let selected = selection.selects(Side::New, number);
                    if selected {
                        matched.insert((Side::New, number));
                        changed.insert((Side::New, number));
                    }
                    let keep_change = if keep_selected { selected } else { !selected };
                    if keep_change {
                        result.push_str(line);
                    }
                }
            }
            DiffTag::Replace => {
                let old_slice = &old_lines[old_range.clone()];
                let new_slice = &new_lines[new_range.clone()];
                for offset in 0..old_slice.len().max(new_slice.len()) {
                    let old_number = old_range.start + offset + 1;
                    let new_number = new_range.start + offset + 1;
                    let old_selected =
                        offset < old_slice.len() && selection.selects(Side::Old, old_number);
                    let new_selected =
                        offset < new_slice.len() && selection.selects(Side::New, new_number);
                    if old_selected {
                        matched.insert((Side::Old, old_number));
                        changed.insert((Side::Old, old_number));
                    }
                    if new_selected {
                        matched.insert((Side::New, new_number));
                        changed.insert((Side::New, new_number));
                    }
                    let selected = old_selected || new_selected;
                    let keep_change = if keep_selected { selected } else { !selected };
                    if keep_change {
                        if let Some(line) = new_slice.get(offset) {
                            result.push_str(line);
                        }
                    } else if let Some(line) = old_slice.get(offset) {
                        result.push_str(line);
                    }
                }
            }
        }
    }

    for (side, line) in selection.expected_lines() {
        if !matched.contains(&(side, line)) {
            let prefix = if side == Side::Old { "-" } else { "" };
            return Err(CliError::usage(format!(
                "requested line {prefix}{line} is not changed on that side of the diff"
            )));
        }
    }

    Ok((result, changed.len()))
}

pub fn run(
    repo: &Path,
    specs: &[String],
    unstage: bool,
    dry_run: bool,
) -> Result<RunResult, CliError> {
    let root_output = git(repo, ["rev-parse", "--show-toplevel"], None)?;
    let root = PathBuf::from(trim_newline(&root_output));
    let mut requested: BTreeMap<String, Selection> = BTreeMap::new();
    for spec in specs {
        let (path, selection) = parse_spec(spec)?;
        requested
            .entry(path)
            .or_default()
            .ranges
            .extend(selection.ranges);
    }

    let mut patch = String::new();
    let mut changed_lines = 0;
    for (path, selection) in &requested {
        ensure_clean_stage(&root, path)?;
        let index = read_index(&root, path)?;
        let (old, new, base, keep_selected, target_source_exists) = if unstage {
            let head = read_head(&root, path)?;
            (head.clone(), index.clone(), index, false, head.exists)
        } else {
            let worktree = read_worktree(&root, path, index.exists)?;
            (
                index.clone(),
                worktree.clone(),
                index,
                true,
                worktree.exists,
            )
        };
        ensure_text(path, &old.content)?;
        ensure_text(path, &new.content)?;
        let (target_content, file_changed_lines) =
            select_text(&old.content, &new.content, selection, keep_selected)
                .map_err(|error| CliError::usage(format!("{path}: {}", error.message)))?;
        changed_lines += file_changed_lines;

        let target_exists = !target_content.is_empty() || target_source_exists;
        let target_mode = if target_exists {
            if base.exists {
                base.mode.as_str()
            } else if unstage && old.exists {
                old.mode.as_str()
            } else if new.exists {
                new.mode.as_str()
            } else {
                "100644"
            }
        } else {
            "100644"
        };
        patch.push_str(&make_patch(
            path,
            &base.content,
            &target_content,
            base.exists,
            target_exists,
            &base.mode,
            target_mode,
        ));
    }

    if !dry_run && !patch.is_empty() {
        git_apply(&root, &patch, true)?;
        git_apply(&root, &patch, false)?;
    }

    Ok(RunResult {
        ok: true,
        mode: if unstage { "unstage" } else { "stage" },
        dry_run,
        files: requested.keys().cloned().collect(),
        changed_lines,
        patch,
    })
}

fn ensure_clean_stage(root: &Path, path: &str) -> Result<(), CliError> {
    let output = git(root, ["ls-files", "--stage", "--", path], None)?;
    let entries = String::from_utf8_lossy(&output).lines().count();
    if entries > 1 {
        return Err(CliError::runtime(format!(
            "{path}: unresolved index entries are not supported; resolve the conflict first"
        )));
    }
    if let Some(mode) = String::from_utf8_lossy(&output).split_whitespace().next() {
        if mode != "100644" && mode != "100755" {
            return Err(CliError::runtime(format!(
                "{path}: only regular text files are supported (found mode {mode})"
            )));
        }
    }
    Ok(())
}

fn read_index(root: &Path, path: &str) -> Result<Entry, CliError> {
    let listing = git(root, ["ls-files", "--stage", "--", path], None)?;
    if listing.is_empty() {
        return Ok(Entry {
            exists: false,
            mode: "100644".into(),
            content: String::new(),
        });
    }
    let text = String::from_utf8_lossy(&listing);
    let mut fields = text.split_whitespace();
    let mode = fields.next().unwrap_or("100644").to_owned();
    let content = git(root, ["show", &format!(":{path}")], None)?;
    Ok(Entry {
        exists: true,
        mode,
        content: decode(path, content)?,
    })
}

fn read_head(root: &Path, path: &str) -> Result<Entry, CliError> {
    let spec = format!("HEAD:{path}");
    let exists = git_status(root, ["cat-file", "-e", &spec], None)?.0;
    if !exists {
        return Ok(Entry {
            exists: false,
            mode: "100644".into(),
            content: String::new(),
        });
    }
    let tree = git(root, ["ls-tree", "HEAD", "--", path], None)?;
    let mode = String::from_utf8_lossy(&tree)
        .split_whitespace()
        .next()
        .unwrap_or("100644")
        .to_owned();
    if mode != "100644" && mode != "100755" {
        return Err(CliError::runtime(format!(
            "{path}: only regular text files are supported in HEAD (found mode {mode})"
        )));
    }
    let content = git(root, ["show", &spec], None)?;
    Ok(Entry {
        exists: true,
        mode,
        content: decode(path, content)?,
    })
}

fn read_worktree(root: &Path, path: &str, tracked: bool) -> Result<Entry, CliError> {
    let full = root.join(path);
    if !full.exists() {
        return Ok(Entry {
            exists: false,
            mode: "100644".into(),
            content: String::new(),
        });
    }
    let metadata = fs::symlink_metadata(&full).map_err(|error| {
        CliError::runtime(format!("{path}: cannot read file metadata: {error}"))
    })?;
    if !metadata.file_type().is_file() {
        return Err(CliError::runtime(format!(
            "{path}: only regular files are supported"
        )));
    }
    if !tracked && git_status(root, ["check-ignore", "-q", "--", path], None)?.0 {
        return Err(CliError::runtime(format!(
            "{path}: ignored files are not staged; use Git's force-add flow if intended"
        )));
    }
    let hash = git(
        root,
        ["hash-object", "-w", "--path", path, "--", path],
        None,
    )?;
    let oid = trim_newline(&hash);
    let content = git(root, ["cat-file", "blob", oid], None)?;
    #[cfg(unix)]
    let executable = {
        use std::os::unix::fs::PermissionsExt;
        metadata.permissions().mode() & 0o111 != 0
    };
    #[cfg(not(unix))]
    let executable = false;
    Ok(Entry {
        exists: true,
        mode: if executable { "100755" } else { "100644" }.into(),
        content: decode(path, content)?,
    })
}

fn ensure_text(path: &str, content: &str) -> Result<(), CliError> {
    if content.as_bytes().contains(&0) {
        return Err(CliError::runtime(format!(
            "{path}: binary files cannot be staged by line"
        )));
    }
    Ok(())
}

fn decode(path: &str, bytes: Vec<u8>) -> Result<String, CliError> {
    if bytes.contains(&0) {
        return Err(CliError::runtime(format!(
            "{path}: binary files cannot be staged by line"
        )));
    }
    String::from_utf8(bytes).map_err(|_| {
        CliError::runtime(format!(
            "{path}: non-UTF-8 text is not supported; the index was not changed"
        ))
    })
}

fn make_patch(
    path: &str,
    base: &str,
    target: &str,
    base_exists: bool,
    target_exists: bool,
    base_mode: &str,
    target_mode: &str,
) -> String {
    if base == target && base_exists == target_exists {
        return String::new();
    }
    let a = format!("a/{path}");
    let b = format!("b/{path}");
    let mut patch = format!("diff --git {} {}\n", quote_path(&a), quote_path(&b));
    if !base_exists && target_exists {
        patch.push_str(&format!("new file mode {target_mode}\n"));
    } else if base_exists && !target_exists {
        patch.push_str(&format!("deleted file mode {base_mode}\n"));
    } else if base_mode != target_mode {
        patch.push_str(&format!("old mode {base_mode}\nnew mode {target_mode}\n"));
    }
    let old_header = if base_exists { a } else { "/dev/null".into() };
    let new_header = if target_exists { b } else { "/dev/null".into() };
    patch.push_str(
        &TextDiff::from_lines(base, target)
            .unified_diff()
            .context_radius(3)
            .header(&quote_path(&old_header), &quote_path(&new_header))
            .to_string(),
    );
    patch
}

fn quote_path(path: &str) -> String {
    if path
        .bytes()
        .all(|byte| byte.is_ascii_graphic() && byte != b'"' && byte != b'\\')
    {
        return path.to_owned();
    }
    let mut quoted = String::from("\"");
    for byte in path.bytes() {
        match byte {
            b'\\' => quoted.push_str("\\\\"),
            b'"' => quoted.push_str("\\\""),
            b'\t' => quoted.push_str("\\t"),
            0x20..=0x7e => quoted.push(byte as char),
            _ => quoted.push_str(&format!("\\{:03o}", byte)),
        }
    }
    quoted.push('"');
    quoted
}

fn git_apply(root: &Path, patch: &str, check: bool) -> Result<(), CliError> {
    let mut args = vec!["apply", "--cached", "--whitespace=nowarn"];
    if check {
        args.push("--check");
    }
    let (success, _, stderr) = git_status(root, args, Some(patch.as_bytes()))?;
    if !success {
        return Err(CliError::runtime(format!(
            "Git could not {} the generated patch: {}",
            if check { "validate" } else { "apply" },
            trim_newline(&stderr)
        )));
    }
    Ok(())
}

fn git<I, S>(root: &Path, args: I, input: Option<&[u8]>) -> Result<Vec<u8>, CliError>
where
    I: IntoIterator<Item = S>,
    S: AsRef<OsStr>,
{
    let (success, stdout, stderr) = git_status(root, args, input)?;
    if !success {
        return Err(CliError::runtime(format!(
            "Git command failed: {}",
            trim_newline(&stderr)
        )));
    }
    Ok(stdout)
}

fn git_status<I, S>(
    root: &Path,
    args: I,
    input: Option<&[u8]>,
) -> Result<(bool, Vec<u8>, Vec<u8>), CliError>
where
    I: IntoIterator<Item = S>,
    S: AsRef<OsStr>,
{
    let mut command = Command::new("git");
    command.arg("-C").arg(root).args(args);
    if input.is_some() {
        command.stdin(Stdio::piped());
    }
    let mut child = command
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|error| CliError::runtime(format!("could not start Git: {error}")))?;
    if let Some(bytes) = input {
        use std::io::Write;
        child
            .stdin
            .take()
            .expect("piped stdin")
            .write_all(bytes)
            .map_err(|error| CliError::runtime(format!("could not send patch to Git: {error}")))?;
    }
    let output = child
        .wait_with_output()
        .map_err(|error| CliError::runtime(format!("could not wait for Git: {error}")))?;
    Ok((output.status.success(), output.stdout, output.stderr))
}

fn trim_newline(bytes: &[u8]) -> &str {
    std::str::from_utf8(bytes)
        .unwrap_or("")
        .trim_end_matches(['\r', '\n'])
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_positive_and_negative_ranges() {
        let selection = parse_range_list("12-18,40,-9,-20--24").unwrap();
        assert_eq!(selection.ranges.len(), 4);
        assert_eq!(
            selection.ranges[0],
            LineRange {
                side: Side::New,
                start: 12,
                end: 18
            }
        );
        assert_eq!(
            selection.ranges[2],
            LineRange {
                side: Side::Old,
                start: 9,
                end: 9
            }
        );
        assert_eq!(
            selection.ranges[3],
            LineRange {
                side: Side::Old,
                start: 20,
                end: 24
            }
        );
    }

    #[test]
    fn selects_individual_additions() {
        let old = "one\nfour\n";
        let new = "one\ntwo\nthree\nfour\n";
        let selection = parse_range_list("3").unwrap();
        let (result, _) = select_text(old, new, &selection, true).unwrap();
        assert_eq!(result, "one\nthree\nfour\n");
    }

    #[test]
    fn replacement_selection_carries_paired_old_line() {
        let old = "one\nOLD\nthree\n";
        let new = "one\nNEW\nthree\n";
        let selection = parse_range_list("2").unwrap();
        assert_eq!(select_text(old, new, &selection, true).unwrap().0, new);
        let selection = parse_range_list("-2").unwrap();
        assert_eq!(select_text(old, new, &selection, true).unwrap().0, new);
    }

    #[test]
    fn inverse_selection_removes_only_requested_change() {
        let old = "one\ntwo\n";
        let new = "zero\none\ntwo\nthree\n";
        let selection = parse_range_list("1").unwrap();
        assert_eq!(
            select_text(old, new, &selection, false).unwrap().0,
            "one\ntwo\nthree\n"
        );
    }

    #[test]
    fn rejects_unchanged_line() {
        let selection = parse_range_list("1").unwrap();
        assert!(select_text("same\n", "same\nnew\n", &selection, true).is_err());
    }

    #[test]
    fn two_hundred_case_fixture_matrix() {
        for case in 0..200 {
            let ending = if case % 4 == 0 { "\r\n" } else { "\n" };
            let lines: Vec<String> = (1..=20)
                .map(|line| format!("line-{line:02}{ending}"))
                .collect();
            let old = lines.concat();
            let position = case % 18 + 2;
            let (new, selector, expected) = match case % 3 {
                0 => {
                    let mut changed = lines.clone();
                    changed.insert(position - 1, format!("insert-{case}{ending}"));
                    let mut selected = lines.clone();
                    selected.insert(position - 1, format!("insert-{case}{ending}"));
                    (changed.concat(), position.to_string(), selected.concat())
                }
                1 => {
                    let mut changed = lines.clone();
                    changed.remove(position - 1);
                    let expected = changed.concat();
                    (expected.clone(), format!("-{position}"), expected)
                }
                _ => {
                    let mut changed = lines.clone();
                    changed[position - 1] = format!("replace-{case}{ending}");
                    let expected = changed.concat();
                    (expected.clone(), position.to_string(), expected)
                }
            };
            let selection = parse_range_list(&selector).unwrap();
            assert_eq!(
                select_text(&old, &new, &selection, true).unwrap().0,
                expected,
                "fixture {case}"
            );
        }
    }
}
