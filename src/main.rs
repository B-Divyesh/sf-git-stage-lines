use clap::Parser;
use git_stage_lines::{run, run_demo};
use std::path::PathBuf;

#[derive(Debug, Parser)]
#[command(
    name = "git-stage-lines",
    version,
    about = "Stage exact changed lines without an interactive prompt",
    long_about = "Stage exact changed lines without an interactive prompt.\n\nPositive ranges address the new side (working tree; index with --unstage). A leading minus addresses an old-side deletion: path:-12--18. Every requested line must be changed.",
    after_help = "Examples:\n  git stage-lines src/app.ts:12-18,40,-9\n  git stage-lines --dry-run 'src/my file.ts:12'\n  git stage-lines --unstage --json src/app.ts:40"
)]
struct Args {
    /// Run an isolated sample repository in a new temporary directory
    #[arg(long, conflicts_with_all = ["unstage", "dry_run", "json", "repo"])]
    demo: bool,

    /// Remove only these lines from the index (compare HEAD to index)
    #[arg(long)]
    unstage: bool,

    /// Print the patch without changing the index
    #[arg(long)]
    dry_run: bool,

    /// Emit a stable JSON result object
    #[arg(long)]
    json: bool,

    /// Run as if started in this repository
    #[arg(short = 'C', long = "repo", value_name = "DIR", default_value = ".")]
    repo: PathBuf,

    /// Path and comma-separated ranges (example: src/app.ts:12-18,40,-9)
    #[arg(required_unless_present = "demo", value_name = "FILE:RANGES")]
    specs: Vec<String>,
}

fn main() {
    let args = Args::parse();
    if args.demo {
        match run_demo() {
            Ok(output) => print!("{output}"),
            Err(error) => {
                eprintln!("git-stage-lines: {error}");
                std::process::exit(1);
            }
        }
        return;
    }
    match run(&args.repo, &args.specs, args.unstage, args.dry_run) {
        Ok(result) => {
            if args.json {
                println!(
                    "{}",
                    serde_json::to_string(&result).expect("serializable result")
                );
            } else if args.dry_run {
                print!("{}", result.patch);
            } else {
                eprintln!(
                    "{} {} selected line{} in {} file{}",
                    if args.unstage { "unstaged" } else { "staged" },
                    result.changed_lines,
                    if result.changed_lines == 1 { "" } else { "s" },
                    result.files.len(),
                    if result.files.len() == 1 { "" } else { "s" }
                );
            }
        }
        Err(error) => {
            eprintln!("git-stage-lines: {error}");
            std::process::exit(if error.usage { 2 } else { 1 });
        }
    }
}
