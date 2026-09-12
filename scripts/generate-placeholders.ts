import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const GRANITE = "#1B2320";
const SNOWFIELD = "#ECEFEA";
const OUT_DIR = path.join(process.cwd(), "public", "images", "placeholders");

const photos = [
  { name: "hero-16x9", width: 1920, height: 1080 },
  { name: "portret-a-4x5", width: 800, height: 1000 },
  { name: "portret-b-4x5", width: 800, height: 1000 },
  { name: "portret-marleen-4x5", width: 800, height: 1000 },
  { name: "portret-thomas-4x5", width: 800, height: 1000 },
  { name: "portret-anouk-4x5", width: 800, height: 1000 },
  { name: "hutslaapzaal-3x2", width: 1500, height: 1000 },
  { name: "graat-3x2", width: 1500, height: 1000 },
  { name: "meer-3x2", width: 1500, height: 1000 },
  { name: "dal-3x2", width: 1500, height: 1000 },
  { name: "prive-groep-3x2", width: 1500, height: 1000 },
  { name: "over-ons-samen-3x2", width: 1500, height: 1000 },
] as const;

const ridges = [
  { name: "ridge-far", width: 2400, height: 900, y: 0.42 },
  { name: "ridge-mid", width: 2400, height: 700, y: 0.28 },
  { name: "ridge-fore", width: 2400, height: 600, y: 0.38 },
] as const;

function photoSvg(file: (typeof photos)[number]) {
  const filename = `${file.name}.avif`;
  const fontSize = Math.max(28, Math.round(file.width / 22));
  const w = file.width;
  const h = file.height;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d5c56"/>
      <stop offset="55%" stop-color="#243832"/>
      <stop offset="100%" stop-color="${GRANITE}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#sky)"/>
  <polygon points="0,${h * 0.72} ${w * 0.18},${h * 0.38} ${w * 0.32},${h * 0.52} ${w * 0.48},${h * 0.22} ${w * 0.63},${h * 0.48} ${w * 0.78},${h * 0.3} ${w},${h * 0.58} ${w},${h} 0,${h}" fill="#2C4034"/>
  <polygon points="0,${h * 0.86} ${w * 0.22},${h * 0.62} ${w * 0.4},${h * 0.74} ${w * 0.58},${h * 0.54} ${w * 0.8},${h * 0.7} ${w},${h * 0.6} ${w},${h} 0,${h}" fill="#15201c"/>
  <ellipse cx="${w * 0.28}" cy="${h * 0.7}" rx="${w * 0.16}" ry="${h * 0.06}" fill="#9FBDB6" opacity="0.35"/>
  <text x="50%" y="50%" fill="${SNOWFIELD}" font-family="ui-monospace, monospace" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${filename}</text>
</svg>
`;
}

function ridgeSvg(file: (typeof ridges)[number]) {
  const w = file.width;
  const h = file.height;
  const y = h * file.y;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <polygon points="0,${h} 0,${y + 80} ${w * 0.12},${y} ${w * 0.28},${y + 120} ${w * 0.46},${y - 40} ${w * 0.62},${y + 90} ${w * 0.78},${y - 10} ${w},${y + 70} ${w},${h}" fill="#2C4034"/>
  <polygon points="0,${h} 0,${y + 200} ${w * 0.2},${y + 140} ${w * 0.4},${y + 210} ${w * 0.65},${y + 90} ${w},${y + 160} ${w},${h}" fill="#15201c"/>
</svg>
`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const file of photos) {
    const svg = photoSvg(file);
    await writeFile(path.join(OUT_DIR, `${file.name}.svg`), svg);
    await sharp(Buffer.from(svg)).avif({ quality: 45 }).toFile(path.join(OUT_DIR, `${file.name}.avif`));
    console.log(`${file.name}.avif`);
  }

  for (const file of ridges) {
    const svg = ridgeSvg(file);
    const avifPath = path.join(OUT_DIR, `${file.name}.avif`);
    await sharp(Buffer.from(svg))
      .ensureAlpha()
      .avif({ quality: 50 })
      .toFile(avifPath);
    console.log(`${file.name}.avif`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
