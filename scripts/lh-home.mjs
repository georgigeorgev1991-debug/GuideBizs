import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const label = process.argv[2] || "run";
const url = process.argv[3] || "http://localhost:3003/";
const outDir = path.join(process.cwd(), "audit-frames", "lcp-bisect");
mkdirSync(outDir, { recursive: true });
const file = path.join(outDir, `${label}.json`);
const userData = path.join(process.cwd(), "audit-frames", `.lh-${label}`);

const args = [
  "--yes",
  "lighthouse",
  url,
  "--quiet",
  `--chrome-flags=--headless --no-first-run --disable-extensions --user-data-dir=${userData}`,
  "--output=json",
  `--output-path=${file}`,
  "--only-categories=performance",
  "--form-factor=mobile",
  "--screenEmulation.mobile",
];

const result = spawnSync("npx", args, { stdio: "inherit", shell: true });
if (result.status !== 0) {
  console.error("lighthouse exit", result.status);
}
const report = JSON.parse(readFileSync(file, "utf8"));
const row = {
  label,
  p: report.categories.performance.score,
  lcp: Math.round(report.audits["largest-contentful-paint"].numericValue),
  fcp: Math.round(report.audits["first-contentful-paint"].numericValue),
};
writeFileSync(path.join(outDir, `${label}-summary.json`), JSON.stringify(row, null, 2));
console.log(JSON.stringify(row));
