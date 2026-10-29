import type { MetadataRoute } from "next";

import { routing, type AppLocale } from "@/i18n/routing";
import { getTripById, getTrips } from "@/lib/content";
import { formatPath, storyHref, tripHref, type AppHref } from "@/lib/href";
import { beAbsoluteUrl, origin, publicPath } from "@/lib/seo";
import { site } from "@/lib/site";
import { listStories } from "@/lib/stories";

const STATIC: AppHref[] = [
  "/",
  "/over-ons",
  "/praktisch",
  "/prive-reizen",
  "/reizen",
  "/verhalen",
  "/contact",
  "/algemene-voorwaarden",
  "/privacy",
];

function abs(locale: AppLocale, href: AppHref) {
  const path = formatPath(locale, href);
  return path === "/" ? origin(site.siteUrl) : `${origin(site.siteUrl)}${path}`;
}

function languageMap(nlHref: AppHref, enHref: AppHref) {
  const nlPath = publicPath("nl", nlHref);
  const enPath = publicPath("en", enHref);
  return {
    "nl-NL": abs("nl", nlHref),
    "nl-BE": beAbsoluteUrl(nlPath),
    en: abs("en", enHref),
    "x-default": abs("en", enHref),
  };
}

function row(locale: AppLocale, nlHref: AppHref, enHref: AppHref): MetadataRoute.Sitemap[number] {
  return {
    url: abs(locale, locale === "nl" ? nlHref : enHref),
    changeFrequency: "weekly",
    alternates: { languages: languageMap(nlHref, enHref) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rows: MetadataRoute.Sitemap = [];
  const nlStories = await listStories("nl");
  const enStories = await listStories("en");

  for (const locale of routing.locales) {
    for (const href of STATIC) {
      rows.push(row(locale, href, href));
    }
    for (const trip of getTrips("nl")) {
      const en = getTripById("en", trip.id);
      if (!en) {
        continue;
      }
      rows.push(row(locale, tripHref(trip.slug), tripHref(en.slug)));
    }
    for (const story of nlStories) {
      const en = enStories.find((item) => item.id === story.id);
      if (!en) {
        continue;
      }
      rows.push(row(locale, storyHref(story.slug), storyHref(en.slug)));
    }
  }

  return rows;
}
