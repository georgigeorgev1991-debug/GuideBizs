import { getTranslations } from "next-intl/server";

import { getSeo, getTripBySlug, primaryTrip } from "@/lib/content";
import { formatNumber } from "@/lib/dates";
import { resolveLocale } from "@/lib/locale";
import { ogImage } from "@/lib/og";
import { getStory } from "@/lib/stories";
import type { AppLocale } from "@/i18n/routing";

export async function ogFor(
  params: Promise<{ locale: string; slug?: string }>,
  kickerKey: string,
  title: string,
  seed: string,
) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "og" });
  const trip = primaryTrip(locale);
  const strip = t("strip", {
    days: trip.days,
    nights: trip.nights,
    km: trip.totalDistanceKm,
    hm: formatNumber(locale, trip.totalAscentM),
    max: trip.maxParticipants,
    price: trip.priceEUR,
  });
  return ogImage({
    locale,
    kicker: t(kickerKey as "homeKicker"),
    title,
    seed: `${locale}:${seed}`,
    strip,
  });
}

export async function seoTitle(
  params: Promise<{ locale: string }>,
  key: keyof ReturnType<typeof getSeo>,
) {
  const locale = await resolveLocale(params);
  const seo = getSeo(locale);
  const entry = seo[key];
  return typeof entry === "object" && entry && "title" in entry ? String(entry.title) : "";
}

export function ogAlt(locale: AppLocale, title: string) {
  return title;
}

export { getSeo, getTripBySlug, getStory, primaryTrip, resolveLocale };
