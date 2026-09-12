import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), ".next", "server", "app");

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (entry.name.endsWith(".rsc")) {
      acc.push(full);
    }
  }
  return acc;
}

const files = walk(root);
const failures = [];

for (const file of files) {
  const buf = readFileSync(file);
  const text = buf.toString("utf8");
  for (const line of text.split("\n")) {
    const header = line.match(/^([0-9a-f]+):T([0-9a-f]+),/i);
    if (!header) {
      continue;
    }
    const declared = Number.parseInt(header[2], 16);
    const start = header[0].length;
    const payload = Buffer.from(line.slice(start), "utf8").subarray(0, declared);
    if (payload[0] !== 0x7b) {
      continue;
    }
    try {
      JSON.parse(payload.toString("utf8"));
    } catch (error) {
      failures.push({
        file: path.relative(process.cwd(), file),
        id: header[1],
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

if (failures.length) {
  console.error("RSC JSON-LD/T-string payload is not valid JSON — Flight prefix is stale:");
  for (const row of failures) {
    console.error(`  ${row.file} row ${row.id}: ${row.message}`);
  }
  process.exit(1);
}

console.log("check:rsc ok");
