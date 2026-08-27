import "./styles.css";

const copyButtons = document.querySelectorAll("[data-copy], [data-copy-target]");
const liveMessage = document.createElement("div");
liveMessage.className = "sr-only";
liveMessage.setAttribute("aria-live", "polite");
document.body.append(liveMessage);

for (const button of copyButtons) {
  button.addEventListener("click", async () => {
    const target = button.dataset.copyTarget && document.getElementById(button.dataset.copyTarget);
    const value = button.dataset.copy ?? target?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = "Copied";
      liveMessage.textContent = "Command copied to clipboard";
      setTimeout(() => { button.textContent = original; }, 1600);
    } catch {
      liveMessage.textContent = "Copy failed. Select the command and copy it manually.";
    }
  });
}

const pathInput = document.querySelector("#file-path");
const rangeInput = document.querySelector("#ranges");
const commandOutput = document.querySelector("#assembled-command");
const rangeError = document.querySelector("#range-error");
const rows = [...document.querySelectorAll("#code-lines li")];

function parseRanges(value) {
  if (!value.trim()) throw new Error("Enter at least one changed line.");
  const selected = new Set();
  for (const raw of value.split(",")) {
    const token = raw.trim();
    if (/^-\d+(?:--\d+)?$/.test(token)) continue;
    const match = token.match(/^(\d+)(?:-(\d+))?$/);
    if (!match) throw new Error(`“${token || "empty"}” is not a line or range.`);
    const start = Number(match[1]);
    const end = Number(match[2] ?? start);
    if (start < 1 || end < start) throw new Error("Ranges start at 1 and run from low to high.");
    for (let line = start; line <= end; line += 1) selected.add(line);
  }
  return selected;
}

function updateLab() {
  const path = pathInput.value.trim() || "path/to/file";
  const ranges = rangeInput.value.trim();
  commandOutput.textContent = `git stage-lines ${path}:${ranges || "…"}`;
  try {
    const selected = parseRanges(ranges);
    rangeError.textContent = "";
    rangeInput.removeAttribute("aria-invalid");
    for (const row of rows) row.classList.toggle("selected", selected.has(Number(row.firstElementChild.textContent)) && row.classList.contains("changed"));
  } catch (error) {
    rangeError.textContent = error.message;
    rangeInput.setAttribute("aria-invalid", "true");
    for (const row of rows) row.classList.remove("selected");
  }
}

if (pathInput && rangeInput && commandOutput && rangeError) {
  pathInput.addEventListener("input", updateLab);
  rangeInput.addEventListener("input", updateLab);
  updateLab();
}

const offlineNote = document.querySelector("#offline-note");
function updateNetworkState() {
  if (offlineNote) offlineNote.hidden = navigator.onLine;
}
window.addEventListener("online", updateNetworkState);
window.addEventListener("offline", updateNetworkState);
updateNetworkState();

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
