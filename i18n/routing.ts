import { defineRouting } from "next-intl/routing";

export const locales = ["en", "nl"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/reizen": {
      nl: "/reizen",
      en: "/trips",
    },
    "/reizen/[slug]": {
      nl: "/reizen/[slug]",
      en: "/trips/[slug]",
    },
    "/prive-reizen": {
      nl: "/prive-reizen",
      en: "/private-trips",
    },
    "/over-ons": {
      nl: "/over-ons",
      en: "/about",
    },
    "/praktisch": {
      nl: "/praktisch",
      en: "/practical",
    },
    "/verhalen": {
      nl: "/verhalen",
      en: "/stories",
    },
    "/verhalen/[slug]": {
      nl: "/verhalen/[slug]",
      en: "/stories/[slug]",
    },
    "/contact": {
      nl: "/contact",
      en: "/contact",
    },
    "/algemene-voorwaarden": {
      nl: "/algemene-voorwaarden",
      en: "/terms",
    },
    "/privacy": {
      nl: "/privacy",
      en: "/privacy",
    },
    "/specimen": "/specimen",
  },
});

export type Pathname = keyof typeof routing.pathnames;
