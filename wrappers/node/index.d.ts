export interface StageLinesOptions {
  cwd?: string;
  dryRun?: boolean;
  unstage?: boolean;
  executable?: string;
}

export interface StageLinesResult {
  ok: true;
  mode: "stage" | "unstage";
  dryRun: boolean;
  files: string[];
  changedLines: number;
  patch: string;
}

export function stageLines(
  selectors: string[],
  options?: StageLinesOptions,
): Promise<StageLinesResult>;
