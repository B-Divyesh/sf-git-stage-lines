use std::fs;
use std::path::Path;
use std::process::{Command, Output};
use tempfile::TempDir;

fn git(repo: &Path, args: &[&str]) -> Output {
    let output = Command::new("git")
        .arg("-C")
        .arg(repo)
        .args(args)
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "git {:?} failed: {}",
        args,
        String::from_utf8_lossy(&output.stderr)
    );
    output
}

fn init() -> TempDir {
    let temp = tempfile::tempdir().unwrap();
    git(temp.path(), &["init", "-q"]);
    git(temp.path(), &["config", "user.name", "Test"]);
    git(temp.path(), &["config", "user.email", "test@example.com"]);
    temp
}

fn commit_file(repo: &Path, path: &str, content: &[u8]) {
    let full = repo.join(path);
    if let Some(parent) = full.parent() {
        fs::create_dir_all(parent).unwrap();
    }
    fs::write(full, content).unwrap();
    git(repo, &["add", "--", path]);
    git(repo, &["commit", "-qm", "fixture"]);
}

fn cli(repo: &Path, args: &[&str]) -> Output {
    Command::new(env!("CARGO_BIN_EXE_git-stage-lines"))
        .arg("-C")
        .arg(repo)
        .args(args)
        .output()
        .unwrap()
}

fn index_text(repo: &Path, path: &str) -> String {
    String::from_utf8(git(repo, &["show", &format!(":{path}")]).stdout).unwrap()
}

#[test]
fn stages_exact_additions_and_replacement() {
    let repo = init();
    commit_file(repo.path(), "notes.txt", b"one\ntwo\nthree\nfour\n");
    fs::write(
        repo.path().join("notes.txt"),
        b"zero\none\nTWO\nthree\nthree-and-half\nfour\nfive\n",
    )
    .unwrap();

    let output = cli(repo.path(), &["notes.txt:1,3,7"]);
    assert!(
        output.status.success(),
        "{}",
        String::from_utf8_lossy(&output.stderr)
    );
    assert_eq!(
        index_text(repo.path(), "notes.txt"),
        "zero\none\nTWO\nthree\nfour\nfive\n"
    );
    assert_eq!(
        fs::read_to_string(repo.path().join("notes.txt")).unwrap(),
        "zero\none\nTWO\nthree\nthree-and-half\nfour\nfive\n"
    );
}

#[test]
fn stages_deletion_by_old_side_number() {
    let repo = init();
    commit_file(repo.path(), "delete.txt", b"one\ntwo\nthree\nfour\n");
    fs::write(repo.path().join("delete.txt"), b"one\nfour\n").unwrap();

    let output = cli(repo.path(), &["delete.txt:-2"]);
    assert!(
        output.status.success(),
        "{}",
        String::from_utf8_lossy(&output.stderr)
    );
    assert_eq!(index_text(repo.path(), "delete.txt"), "one\nthree\nfour\n");
}

#[test]
fn unstages_only_requested_line() {
    let repo = init();
    commit_file(repo.path(), "undo.txt", b"one\ntwo\n");
    fs::write(repo.path().join("undo.txt"), b"zero\none\ntwo\nthree\n").unwrap();
    git(repo.path(), &["add", "undo.txt"]);

    let output = cli(repo.path(), &["--unstage", "undo.txt:1"]);
    assert!(
        output.status.success(),
        "{}",
        String::from_utf8_lossy(&output.stderr)
    );
    assert_eq!(index_text(repo.path(), "undo.txt"), "one\ntwo\nthree\n");
}

#[test]
fn dry_run_and_json_do_not_touch_index() {
    let repo = init();
    commit_file(repo.path(), "preview.txt", b"one\n");
    fs::write(repo.path().join("preview.txt"), b"one\ntwo\n").unwrap();

    let output = cli(repo.path(), &["--dry-run", "--json", "preview.txt:2"]);
    assert!(
        output.status.success(),
        "{}",
        String::from_utf8_lossy(&output.stderr)
    );
    let result: serde_json::Value = serde_json::from_slice(&output.stdout).unwrap();
    assert_eq!(result["ok"], true);
    assert_eq!(result["dryRun"], true);
    assert!(result["patch"].as_str().unwrap().contains("+two"));
    assert_eq!(index_text(repo.path(), "preview.txt"), "one\n");
}

#[test]
fn supports_crlf_filters_and_paths_with_spaces() {
    let repo = init();
    fs::write(repo.path().join(".gitattributes"), b"*.txt text eol=lf\n").unwrap();
    fs::write(repo.path().join("space name.txt"), b"one\r\ntwo\r\n").unwrap();
    git(repo.path(), &["add", ".gitattributes", "space name.txt"]);
    git(repo.path(), &["commit", "-qm", "fixture"]);
    fs::write(
        repo.path().join("space name.txt"),
        b"one\r\ninserted\r\ntwo\r\nlast\r\n",
    )
    .unwrap();

    let output = cli(repo.path(), &["space name.txt:2"]);
    assert!(
        output.status.success(),
        "{}",
        String::from_utf8_lossy(&output.stderr)
    );
    assert_eq!(
        index_text(repo.path(), "space name.txt"),
        "one\ninserted\ntwo\n"
    );
}

#[test]
fn rejects_binary_and_keeps_index_atomic_on_bad_selector() {
    let repo = init();
    commit_file(repo.path(), "safe.txt", b"one\n");
    fs::write(repo.path().join("safe.txt"), b"one\ntwo\n").unwrap();
    fs::write(repo.path().join("binary.dat"), b"one\0two\n").unwrap();

    let binary = cli(repo.path(), &["binary.dat:1"]);
    assert!(!binary.status.success());
    assert!(String::from_utf8_lossy(&binary.stderr).contains("binary"));

    let invalid = cli(repo.path(), &["safe.txt:2", "safe.txt:99"]);
    assert_eq!(invalid.status.code(), Some(2));
    assert_eq!(index_text(repo.path(), "safe.txt"), "one\n");
}
