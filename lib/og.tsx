import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { primaryTrip } from "@/lib/content";
import { formatNumber } from "@/lib/dates";
import type { AppLocale } from "@/i18n/routing";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function hashSeed(seed: string) {
  let n = 0;
  for (const char of seed) {
    n = (n * 31 + char.charCodeAt(0)) >>> 0;
  }
  return n;
}

async function archivo() {
  const woff = path.join(process.cwd(), "assets/fonts/Archivo-Bold.woff");
  const ttf = path.join(process.cwd(), "assets/fonts/Archivo-Bold.ttf");
  try {
    return await readFile(woff);
  } catch {
    return readFile(ttf);
  }
}

export async function ogImage({
  locale,
  kicker,
  title,
  seed,
  strip,
}: {
  locale: AppLocale;
  kicker: string;
  title: string;
  seed: string;
  strip?: string;
}) {
  const trip = primaryTrip(locale);
  const n = hashSeed(seed);
  const left = 40 + (n % 120);
  const ridgeTop = 280 + (n % 70);
  const font = await archivo();
  const dataStrip =
    strip ??
    `${trip.days} · ${trip.nights} · ${trip.totalDistanceKm} km · ${formatNumber(locale, trip.totalAscentM)} hm · max ${trip.maxParticipants} · €${trip.priceEUR}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#1B2320",
          color: "#ECEFEA",
          display: "flex",
          flexDirection: "column",
          padding: "56px 64px 48px",
          fontFamily: "Archivo",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left,
            bottom: 0,
            width: 900,
            height: ridgeTop,
            background: "#2C4034",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: left + 160,
            bottom: 0,
            width: 780,
            height: ridgeTop - 80,
            background: "#15201c",
          }}
        />
        <div
          style={{
            display: "flex",
            width: 28,
            height: 28,
            background: "#B8402F",
            marginBottom: 28,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.14em",
            color: "#9FBDB6",
            fontWeight: 700,
          }}
        >
          {kicker.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: title.length > 48 ? 52 : 64,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 22,
            fontWeight: 700,
            color: "#9FBDB6",
          }}
        >
          {dataStrip}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
            fontSize: 18,
            color: "#ECEFEA",
            opacity: 0.7,
          }}
        >
          {site.range}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "Archivo",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
