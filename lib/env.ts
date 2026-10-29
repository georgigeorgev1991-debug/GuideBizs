import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export function requireMailEnv() {
  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!key) {
    throw new Error("RESEND_API_KEY ontbreekt — production build gestopt");
  }

  if (!to) {
    throw new Error("CONTACT_TO_EMAIL ontbreekt — production build gestopt");
  }

  return { key, to };
}

export function requireCorporateMailEnv() {
  const to = process.env.CORPORATE_TO_EMAIL?.trim();
  if (!to) {
    throw new Error("CORPORATE_TO_EMAIL ontbreekt — production build gestopt");
  }
  return { to };
}

export function requireProductionEnv() {
  requireMailEnv();
  requireCorporateMailEnv();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL ontbreekt — production build gestopt");
  }

  const leftover = englishPlaceholderHits();
  if (leftover.length > 0) {
    throw new Error(
      `English copy still contains ⟦EN⟧ placeholders (${leftover.length}) — production build gestopt. Eerste: ${leftover[0]}`,
    );
  }
}

function englishPlaceholderHits() {
  const token = "⟦EN⟧";
  const hits: string[] = [];
  const roots = [
    path.join(process.cwd(), "content", "en"),
    path.join(process.cwd(), "messages", "en.json"),
  ];

  function walk(target: string) {
    const info = statSync(target);
    if (info.isDirectory()) {
      for (const entry of readdirSync(target)) {
        if (entry === "placeholder.ts") {
          continue;
        }
        walk(path.join(target, entry));
      }
      return;
    }
    if (!/\.(ts|tsx|json|mdx)$/.test(target)) {
      return;
    }
    const text = readFileSync(target, "utf8");
    if (text.includes(token)) {
      hits.push(path.relative(process.cwd(), target));
    }
  }

  for (const root of roots) {
    walk(root);
  }
  return hits;
}
