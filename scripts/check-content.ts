import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { STORY_IDS, storySlugs } from "../content/shared/stories";
import { departureFacts } from "../content/shared/departures";
import { tripFacts } from "../content/shared/trips";
import { EN_PLACEHOLDER_TOKEN } from "../content/en/placeholder";
import { getFaq, getTrips, primaryTrip } from "../lib/content";
import { FITNESS_LIMITS } from "../lib/fitness";
import { cumulativeAscent, ELEVATION_SAMPLES_PER_DAY } from "../lib/elevation";
import type { AppLocale } from "../i18n/routing";
import type { Image } from "../lib/types";

const ENGLISH =
  /\b(the|this|that|with|from|your|you|are|isn't|hiking|hike|trail|please|welcome|click|included|breakfast|dinner|lunch|weather|insurance|flights?|booking|experience|about|contact|walking|nights?|group|mountain)\b/i;

const DUTCH =
  /\b(het|een|niet|naar|jullie|jouw|geen|nog|bij|aan|uit|ook|dit|dat|als|worden|wordt|kunnen|moet|wandelen|berghut|overtocht|vertrek|deelnemers|inbegrepen|voorwaarden|praktisch|verhalen|reizen)\b/i;

const SKIP_KEYS = new Set([
  "path",
  "slug",
  "src",
  "gpxUrl",
  "startDate",
  "endDate",
  "publishedAt",
  "status",
  "sleeps",
  "difficulty",
  "id",
  "portraitKey",
  "heroImageKey",
  "galleryKeys",
  "imageKeys",
]);

const errors: string[] = [];

function visit(value: unknown, trail: string, pattern: RegExp, label: string) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => visit(entry, `${trail}[${index}]`, pattern, label));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      const next = trail ? `${trail}.${key}` : key;
      if (SKIP_KEYS.has(key) || key === "name" || key === "firstName") {
        continue;
      }
      if (key === "alt" && typeof nested === "string" && nested.trim() === "") {
        errors.push(`Lege alt bij ${next}`);
      }
      visit(nested, next, pattern, label);
    }
    return;
  }

  if (typeof value !== "string") {
    return;
  }

  const match = value.match(pattern);
  if (match) {
    errors.push(`${label} “${match[0]}” bij ${trail}`);
  }
}

function keyTree(value: unknown, trail = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => keyTree(entry, `${trail}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, nested]) => {
      const next = trail ? `${trail}.${key}` : key;
      return [next, ...keyTree(nested, next)];
    });
  }
  return [];
}

function assertSameKeys(nl: unknown, en: unknown, label: string) {
  const a = keyTree(nl).map((key) => key.replace(/\[\d+]/g, "[]")).sort();
  const b = keyTree(en).map((key) => key.replace(/\[\d+]/g, "[]")).sort();
  const uniqueA = [...new Set(a)];
  const uniqueB = [...new Set(b)];
  for (const key of uniqueA) {
    if (!uniqueB.includes(key)) {
      errors.push(`${label}: sleutel ${key} ontbreekt in en`);
    }
  }
  for (const key of uniqueB) {
    if (!uniqueA.includes(key)) {
      errors.push(`${label}: sleutel ${key} ontbreekt in nl`);
    }
  }
}

function assertImage(image: Image, trail: string) {
  if (!image.alt.trim()) {
    errors.push(`Lege alt bij ${trail}`);
  }
}

async function loadModule(locale: AppLocale, file: string) {
  return import(`../content/${locale}/${file}`);
}

async function scanStories(locale: AppLocale, pattern: RegExp, label: string) {
  const storiesDir = path.join(process.cwd(), "content", locale, "stories");
  const storyFiles = (await readdir(storiesDir)).filter((file) => file.endsWith(".mdx"));
  if (storyFiles.length < 6) {
    errors.push(`${locale}: verwacht minstens 6 MDX-stukken, vond ${storyFiles.length}`);
  }

  const ids = new Set<string>();
  for (const file of storyFiles) {
    const raw = await readFile(path.join(storiesDir, file), "utf8");
    const idMatch = raw.match(/^id:\s*([^\s]+)/m);
    const slugMatch = raw.match(/^slug:\s*([^\s]+)/m);
    if (idMatch) {
      ids.add(idMatch[1]);
      const expected = storySlugs[idMatch[1] as keyof typeof storySlugs]?.[locale];
      if (expected && slugMatch && slugMatch[1] !== expected) {
        errors.push(`${locale}/stories/${file}: slug ${slugMatch[1]} ≠ ${expected}`);
      }
    }
    const lines = raw.split(/\r?\n/);
    for (const [index, line] of lines.entries()) {
      if (/^\s*import\s/.test(line) || /^\s*export\s/.test(line)) {
        continue;
      }
      if (/^\s*(id|slug|titel|title|description)\s*:/.test(line)) {
        continue;
      }
      const match = line.match(pattern);
      if (match) {
        errors.push(`${label} “${match[0]}” in ${locale}/stories/${file}:${index + 1}`);
      }
    }
    if (
      locale === "en" &&
      raw.includes(EN_PLACEHOLDER_TOKEN) &&
      process.env.NODE_ENV === "production"
    ) {
      errors.push(`placeholder-Engels ${EN_PLACEHOLDER_TOKEN} in ${locale}/stories/${file}`);
    }
  }
  return ids;
}

function countPlaceholderStrings(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce((sum: number, entry) => sum + countPlaceholderStrings(entry), 0);
  }
  if (value && typeof value === "object") {
    return Object.values(value).reduce(
      (sum: number, nested) => sum + countPlaceholderStrings(nested),
      0,
    );
  }
  if (typeof value === "string" && value.includes(EN_PLACEHOLDER_TOKEN)) {
    return 1;
  }
  return 0;
}

async function main() {
  const modules = [
    "trips",
    "seo",
    "faq",
    "about",
    "private",
    "contact",
    "legal",
    "team",
    "testimonials",
    "pages",
    "alts",
  ] as const;

  const nlMods: Record<string, unknown> = {};
  const enMods: Record<string, unknown> = {};

  for (const file of modules) {
    nlMods[file] = await loadModule("nl", file);
    enMods[file] = await loadModule("en", file);
    assertSameKeys(nlMods[file], enMods[file], file);
    visit(nlMods[file], `nl/${file}`, ENGLISH, "Engels woord");
    visit(enMods[file], `en/${file}`, DUTCH, "Nederlands woord");
    const placeholders = countPlaceholderStrings(enMods[file]);
    if (placeholders > 0 && process.env.NODE_ENV === "production") {
      errors.push(
        `placeholder-Engels ${EN_PLACEHOLDER_TOKEN} in en/${file} (${placeholders} strings) — production build gestopt`,
      );
    }
  }

  const enMessages = await readFile(path.join(process.cwd(), "messages", "en.json"), "utf8");
  if (enMessages.includes(EN_PLACEHOLDER_TOKEN) && process.env.NODE_ENV === "production") {
    errors.push(`placeholder-Engels ${EN_PLACEHOLDER_TOKEN} in messages/en.json`);
  }

  const nlIds = await scanStories("nl", ENGLISH, "Engels woord");
  const enIds = await scanStories("en", DUTCH, "Nederlands woord");
  for (const id of STORY_IDS) {
    if (!nlIds.has(id)) {
      errors.push(`story id ${id} ontbreekt in nl`);
    }
    if (!enIds.has(id)) {
      errors.push(`story id ${id} ontbreekt in en`);
    }
  }

  const nlTrips = getTrips("nl");
  const enTrips = getTrips("en");

  if (nlTrips.length !== enTrips.length) {
    errors.push(`trip-aantal nl ${nlTrips.length} ≠ en ${enTrips.length}`);
  }

  for (const facts of tripFacts) {
    const nl = nlTrips.find((trip) => trip.id === facts.id);
    const en = enTrips.find((trip) => trip.id === facts.id);
    if (!nl || !en) {
      errors.push(`trip ${facts.id} ontbreekt in een locale`);
      continue;
    }
    const numeric = (trip: typeof nl) =>
      JSON.stringify({
        days: trip.days,
        nights: trip.nights,
        priceEUR: trip.priceEUR,
        maxParticipants: trip.maxParticipants,
        minToGuarantee: trip.minToGuarantee,
        difficulty: trip.difficulty,
        totalDistanceKm: trip.totalDistanceKm,
        totalAscentM: trip.totalAscentM,
        itinerary: trip.itinerary.map((day) => ({
          day: day.day,
          distanceKm: day.distanceKm,
          ascentM: day.ascentM,
          descentM: day.descentM,
          sleeps: day.sleeps,
          startM: day.startM,
          elevation: day.elevation,
        })),
      });
    if (numeric(nl) !== numeric(en)) {
      errors.push(`${facts.id}: gedeelde cijfers verschillen tussen nl en en`);
    }
  }

  for (const locale of ["nl", "en"] as const) {
    const trips = getTrips(locale);
    const faq = getFaq(locale);
    for (const trip of trips) {
      if (trip.maxParticipants !== 8) {
        errors.push(`${locale}/${trip.slug}: maxParticipants is ${trip.maxParticipants}, moet 8 zijn`);
      }
      const distance = trip.itinerary.reduce((sum, day) => sum + day.distanceKm, 0);
      const ascent = trip.itinerary.reduce((sum, day) => sum + day.ascentM, 0);
      if (distance !== trip.totalDistanceKm) {
        errors.push(`${locale}/${trip.slug}: som dagen ${distance} km ≠ totalDistanceKm`);
      }
      if (ascent !== trip.totalAscentM) {
        errors.push(`${locale}/${trip.slug}: som stijging ${ascent} hm ≠ totalAscentM`);
      }
      if (!trip.fitnessBenchmark.includes(String(FITNESS_LIMITS.ascentM))) {
        errors.push(`${locale}/${trip.slug}: fitnessBenchmark noemt ${FITNESS_LIMITS.ascentM} niet`);
      }
      if (!trip.fitnessBenchmark.includes(String(FITNESS_LIMITS.descentM))) {
        errors.push(`${locale}/${trip.slug}: fitnessBenchmark noemt ${FITNESS_LIMITS.descentM} niet`);
      }
      for (const [index, day] of trip.itinerary.entries()) {
        if (day.ascentM > FITNESS_LIMITS.ascentM) {
          errors.push(`${locale}/${trip.slug} dag ${day.day}: stijging te hoog`);
        }
        if (day.descentM > FITNESS_LIMITS.descentM) {
          errors.push(`${locale}/${trip.slug} dag ${day.day}: daling te hoog`);
        }
        const seriesAscent = cumulativeAscent(day.elevation);
        if (seriesAscent !== day.ascentM) {
          errors.push(`${locale}/${trip.slug} dag ${day.day}: reeks stijgt ${seriesAscent} ≠ ${day.ascentM}`);
        }
        if (day.elevation.length !== ELEVATION_SAMPLES_PER_DAY) {
          errors.push(`${locale}/${trip.slug} dag ${day.day}: verkeerd aantal samples`);
        }
        const expectedEnd = day.startM + day.ascentM - day.descentM;
        if (day.elevation[0] !== day.startM) {
          errors.push(`${locale}/${trip.slug} dag ${day.day}: eerste sample klopt niet`);
        }
        if (day.elevation[day.elevation.length - 1] !== expectedEnd) {
          errors.push(`${locale}/${trip.slug} dag ${day.day}: laatste sample klopt niet`);
        }
        const next = trip.itinerary[index + 1];
        if (next && expectedEnd !== next.startM) {
          errors.push(`${locale}/${trip.slug}: dag ${day.day} sluit niet aan op dag ${next.day}`);
        }
        day.images.forEach((image, imageIndex) =>
          assertImage(image, `${locale}.${trip.slug}.dag${day.day}.images[${imageIndex}]`),
        );
      }
      assertImage(trip.heroImage, `${locale}.${trip.slug}.heroImage`);
      trip.gallery.forEach((image, index) =>
        assertImage(image, `${locale}.${trip.slug}.gallery[${index}]`),
      );
    }

    const faqCount = faq.reduce((sum, group) => sum + group.items.length, 0);
    if (faqCount !== 13) {
      errors.push(`${locale} faq heeft ${faqCount} vragen, §6.5 vraagt 13`);
    }
  }

  const tripIds = new Set(tripFacts.map((trip) => trip.id));
  for (const departure of departureFacts) {
    if (!tripIds.has(departure.tripId)) {
      errors.push(`Vertrek ${departure.startDate}: onbekende tripId`);
    }
  }

  if (errors.length > 0) {
    console.error("check:content gefaald:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  const trip = primaryTrip("nl");
  console.log("check:content ok");
  console.log(`- ${getTrips("nl").length} reis × 2 locales, maxParticipants=${trip.maxParticipants}`);
  console.log(
    `- afstand ${trip.itinerary.reduce((sum, day) => sum + day.distanceKm, 0)} km, stijging ${trip.itinerary.reduce((sum, day) => sum + day.ascentM, 0)} hm`,
  );
  console.log(`- ${departureFacts.length} vertrekken (gedeeld)`);
  if (process.env.NODE_ENV === "production") {
    console.log("- Engelse copy: ⟦EN⟧ scan active (production)");
  } else {
    console.log("- Engelse copy: ⟦EN⟧ scan soft in non-production (Sprint 4 hardens copy)");
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
