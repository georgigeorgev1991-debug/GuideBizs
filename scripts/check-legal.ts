/**
 * Build guard for /content/legal.ts and related truthfulness rules (§7).
 *
 * Failure modes:
 * 1. vatRegistered true without vatNumber (and inverse noise)
 * 2. entity 'company' without companyName / eik; individuals with those set
 * 3. tourOperator.route 'own' without registrationNumber
 * 4. tourOperator.route 'partner' without partnerName + registrationNumber
 * 5. tourOperator.route 'none' with leftover registration/partner/insurer fields
 * 6. liabilityInsurance set without insurer/description
 * 7. phones.nl / phones.bg empty when NODE_ENV=production
 * 8. Hard-coded operator claim phrases outside trust/legal allowlist
 * 9. PENDING / TODO / [BRACKET] placeholders in content or messages
 * 10. Street-address keywords on public surfaces
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { legal } from "../content/legal";
import { phones } from "../content/phones";

const errors: string[] = [];

function fail(message: string) {
  errors.push(message);
}

if (legal.vatRegistered && !legal.vatNumber?.trim()) {
  fail("vatRegistered is true but vatNumber is missing");
}
if (!legal.vatRegistered && legal.vatNumber) {
  fail("vatNumber is set while vatRegistered is false");
}
if (legal.entity === "company") {
  if (!legal.companyName?.trim()) {
    fail("entity is 'company' but companyName is missing");
  }
  if (!legal.eik?.trim()) {
    fail("entity is 'company' but eik is missing");
  }
}
if (legal.entity === "individuals") {
  if (legal.companyName || legal.eik) {
    fail("entity is 'individuals' but companyName/eik are set");
  }
}

const { route, registrationNumber, partnerName, insurer } = legal.tourOperator;
if (route === "none") {
  if (registrationNumber || partnerName || insurer) {
    fail("tourOperator.route is 'none' but registration/partner/insurer fields are set");
  }
}
if (route === "own") {
  if (!registrationNumber?.trim()) {
    fail("tourOperator.route is 'own' but registrationNumber is missing");
  }
  if (partnerName) {
    fail("tourOperator.route is 'own' but partnerName is set");
  }
}
if (route === "partner") {
  if (!registrationNumber?.trim()) {
    fail("tourOperator.route is 'partner' but registrationNumber is missing");
  }
  if (!partnerName?.trim()) {
    fail("tourOperator.route is 'partner' but partnerName is missing");
  }
}

if (legal.liabilityInsurance) {
  if (!legal.liabilityInsurance.insurer?.trim()) {
    fail("liabilityInsurance is set but insurer is empty");
  }
  if (!legal.liabilityInsurance.description?.trim()) {
    fail("liabilityInsurance is set but description is empty");
  }
}

if (process.env.NODE_ENV === "production") {
  if (!phones.nl.trim()) {
    fail(
      "phones.nl is empty — set a Dutch consumer number in content/phones.ts before production",
    );
  }
  if (!phones.bg.trim()) {
    fail(
      "phones.bg is empty — set a Bulgarian corporate number in content/phones.ts before production",
    );
  }
}

/** Operator claim phrases that must only appear via trust components + legal.ts */
const CLAIM_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\bEIK\b/, label: "EIK" },
  { re: /\bVAT\b/, label: "VAT" },
  { re: /VAT invoice/i, label: "VAT invoice" },
  { re: /VAT number/i, label: "VAT number" },
  { re: /registered company/i, label: "registered company" },
  { re: /Bulgarian-registered operator/i, label: "Bulgarian-registered operator" },
  { re: /National Tourism Register/i, label: "National Tourism Register" },
  { re: /nationaal toerismeregister/i, label: "nationaal toerismeregister" },
  { re: /Tourism Act\s*,?\s*art\.?\s*97/i, label: "Tourism Act art. 97" },
  { re: /Toerismewet\s*,?\s*art\.?\s*97/i, label: "Toerismewet art. 97" },
  { re: /Package Travel Directive/i, label: "Package Travel Directive" },
  { re: /Pakketreizenrichtlijn/i, label: "Pakketreizenrichtlijn" },
  { re: /tour[- ]operator liability/i, label: "tour-operator liability" },
  { re: /aansprakelijkheidsverzekering touroperator/i, label: "aansprakelijkheidsverzekering touroperator" },
  { re: /registration number/i, label: "registration number" },
  { re: /BTW-nummer/i, label: "BTW-nummer" },
  { re: /BTW-factuur/i, label: "BTW-factuur" },
];

const ALLOW_HARDCODE = new Set(
  [
    "content/legal.ts",
    "scripts/check-legal.ts",
    "components/trust/ConsumerTrust.tsx",
    "components/trust/CorporateTrust.tsx",
    "lib/trust-copy.ts",
  ].map((p) => path.normalize(p)),
);

function walkFiles(target: string, out: string[]) {
  let info;
  try {
    info = statSync(target);
  } catch {
    return;
  }
  if (info.isDirectory()) {
    for (const entry of readdirSync(target)) {
      if (
        entry === "node_modules" ||
        entry === ".next" ||
        entry === ".git" ||
        entry === "audit-frames"
      ) {
        continue;
      }
      walkFiles(path.join(target, entry), out);
    }
    return;
  }
  if (/\.(ts|tsx|js|jsx|mdx|json)$/.test(target)) {
    out.push(target);
  }
}

const scanRoots = [
  path.join(process.cwd(), "app"),
  path.join(process.cwd(), "components"),
  path.join(process.cwd(), "content"),
  path.join(process.cwd(), "lib"),
];

const files: string[] = [];
for (const root of scanRoots) {
  walkFiles(root, files);
}

for (const file of files) {
  const rel = path.normalize(path.relative(process.cwd(), file));
  if (ALLOW_HARDCODE.has(rel)) {
    continue;
  }
  const text = readFileSync(file, "utf8");
  for (const { re, label } of CLAIM_PATTERNS) {
    if (re.test(text)) {
      fail(`${rel}: hard-coded claim "${label}" — use trust components / legal.ts`);
    }
  }
}

const PLACEHOLDER = /\bPENDING\b|\bTODO\b|\[[A-Z][A-Z0-9_]{2,}\]/;
const contentFiles: string[] = [];
walkFiles(path.join(process.cwd(), "content"), contentFiles);
walkFiles(path.join(process.cwd(), "messages"), contentFiles);
for (const file of contentFiles) {
  const rel = path.relative(process.cwd(), file);
  if (rel.endsWith("phones.ts") || rel.endsWith("placeholder.ts")) {
    continue;
  }
  const text = readFileSync(file, "utf8");
  if (PLACEHOLDER.test(text)) {
    fail(`${rel}: contains PENDING, TODO, or [PLACEHOLDER]`);
  }
}

const STREETISH =
  /\b(straat|street|boulevard|blvd\.?|laan|avenue|ul\.|ул\.)\b/i;
const publicFiles: string[] = [];
for (const root of [
  path.join(process.cwd(), "lib", "site.ts"),
  path.join(process.cwd(), "components"),
  path.join(process.cwd(), "app"),
  path.join(process.cwd(), "content", "en"),
  path.join(process.cwd(), "content", "nl"),
]) {
  walkFiles(root, publicFiles);
}
for (const file of publicFiles) {
  const rel = path.relative(process.cwd(), file);
  if (/content[\\/](en|nl)[\\/]legal\.ts$/.test(rel)) {
    continue;
  }
  const text = readFileSync(file, "utf8");
  if (STREETISH.test(text)) {
    fail(
      `${rel}: looks like a street address — public pages may only show "Sofia, Bulgaria"`,
    );
  }
}

if (errors.length > 0) {
  console.error("check:legal failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("check:legal ok");
