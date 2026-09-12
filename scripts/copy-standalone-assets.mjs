import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(join(standalone, "server.js"))) {
  console.error("Missing .next/standalone/server.js — run npm run build first.");
  process.exit(1);
}

cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), {
  recursive: true,
});
const fonts = join(root, "assets", "fonts");
if (existsSync(fonts)) {
  cpSync(fonts, join(standalone, "assets", "fonts"), { recursive: true });
}
