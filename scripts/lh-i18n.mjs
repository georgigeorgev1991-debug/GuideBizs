import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const origin = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const outDir = path.join(process.cwd(), "audit-frames", "i18n-lh-fix");
mkdirSync(outDir, { recursive: true });

const jobs = [
  ["home", "/", "mobile"],
  ["home", "/", "desktop"],
  ["en", "/en", "mobile"],
  ["en", "/en", "desktop"],
];

for (const [name, route, form] of jobs) {
  const label = `${name}-${form}`;
  const file = path.join(outDir, `${label}.json`);
  const userData = path.join(outDir, `.chrome-${label}`);
  const args = [
    "--yes",
    "lighthouse@12.6.0",
    `${origin}${route}`,
    "--quiet",
    `--chrome-flags=--headless --no-first-run --disable-extensions --user-data-dir=${userData}`,
    "--output=json",
    `--output-path=${file}`,
    "--only-categories=performance,accessibility,best-practices,seo",
  ];
  if (form === "mobile") {
    args.push("--form-factor=mobile", "--screenEmulation.mobile");
  } else {
    args.push("--preset=desktop");
  }
  console.log("running", label);
  const result = spawnSync("npx", args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.log(JSON.stringify({ label, error: result.status }));
    continue;
  }
  const report = JSON.parse(readFileSync(file, "utf8"));
  const a11yFails = (report.categories.accessibility.auditRefs || [])
    .filter((ref) => {
      const audit = report.audits[ref.id];
      return audit && audit.scoreDisplayMode === "binary" && audit.score !== null && audit.score < 1;
    })
    .map((ref) => ref.id);
  const bpFails = (report.categories["best-practices"].auditRefs || [])
    .filter((ref) => {
      const audit = report.audits[ref.id];
      return audit && audit.scoreDisplayMode === "binary" && audit.score !== null && audit.score < 1;
    })
    .map((ref) => ref.id);
  const row = {
    label,
    p: report.categories.performance.score,
    a: report.categories.accessibility.score,
    bp: report.categories["best-practices"].score,
    seo: report.categories.seo.score,
    lcp: report.audits["largest-contentful-paint"].numericValue,
    fcp: report.audits["first-contentful-paint"].numericValue,
    a11yFails,
    bpFails,
  };
  console.log(JSON.stringify(row));
  writeFileSync(path.join(outDir, `${label}-summary.json`), JSON.stringify(row, null, 2));
}
