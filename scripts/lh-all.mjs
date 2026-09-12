import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const origin = (process.argv[2] || "http://localhost:3003").replace(/\/$/, "");
const routes = [
  "/",
  "/reizen",
  "/reizen/vier-dagen-overtocht",
  "/prive-reizen",
  "/over-ons",
  "/praktisch",
  "/verhalen",
  "/verhalen/wandelen-in-bulgarije",
  "/contact",
  "/algemene-voorwaarden",
  "/privacy",
];
const forms = ["mobile", "desktop"];
const outDir = path.join(process.cwd(), "audit-frames", "phase9-lh");
mkdirSync(outDir, { recursive: true });
const rows = [];

for (const route of routes) {
  for (const form of forms) {
    const label = `${form}${route.replaceAll("/", "-") || "-home"}`;
    const file = path.join(outDir, `${label}.json`);
    const userData = path.join(process.cwd(), "audit-frames", `.lh-p9-${label}`);
    const args = [
      "--yes",
      "lighthouse",
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
    const result = spawnSync("npx", args, { stdio: "inherit", shell: true });
    if (result.status !== 0) {
      rows.push({ route, form, error: result.status });
      continue;
    }
    const report = JSON.parse(readFileSync(file, "utf8"));
    const a11y = report.categories.accessibility;
    const failed = Object.values(report.audits)
      .filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode === "binary")
      .filter((a) => (a11y.auditRefs || []).some((ref) => ref.id === a.id && (ref.group === "a11y-color-contrast" || true)))
      .map((a) => a.id);
    const a11yFails = (a11y.auditRefs || [])
      .filter((ref) => {
        const audit = report.audits[ref.id];
        return audit && audit.score !== null && audit.score < 1;
      })
      .map((ref) => ref.id);
    const row = {
      route,
      form,
      p: report.categories.performance.score,
      a: a11y.score,
      bp: report.categories["best-practices"].score,
      seo: report.categories.seo.score,
      lcp: Math.round(report.audits["largest-contentful-paint"].numericValue),
      fcp: Math.round(report.audits["first-contentful-paint"].numericValue),
      cls: report.audits["cumulative-layout-shift"].numericValue,
      a11yFails,
    };
    rows.push(row);
    console.log(JSON.stringify(row));
  }
}

writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(rows, null, 2));
console.log("wrote", path.join(outDir, "summary.json"));
