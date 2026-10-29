import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";
import { formatPath, hrefInLocale, type AppHref } from "@/lib/href";
import { site } from "@/lib/site";

export function origin(url: string) {
  return url.replace(/\/$/, "");
}

export function absoluteUrl(pathname: string) {
  const base = origin(site.siteUrl);
  if (pathname === "/") {
    return base;
  }
  return `${base}${pathname.replace(/\/$/, "")}`;
}

export function beAbsoluteUrl(pathname: string) {
  const base = origin(site.beSiteUrl);
  if (pathname === "/") {
    return base;
  }
  return `${base}${pathname.replace(/\/$/, "")}`;
}

export function publicPath(locale: AppLocale, href: AppHref) {
  return formatPath(locale, href);
}

/**
 * hreflang: en (+ x-default), nl-NL, nl-BE — only when both locales exist.
 * Pass `bilingual: false` for EN-only routes (e.g. /companies later).
 */
export function routeAlternates(
  locale: AppLocale,
  href: AppHref,
  options: { bilingual?: boolean } = {},
): NonNullable<Metadata["alternates"]> {
  const bilingual = options.bilingual !== false;
  const selfHref =
    (locale === "en"
      ? hrefInLocale(locale, "en", href)
      : hrefInLocale(locale, "nl", href)) ?? href;
  const selfPath = publicPath(locale, selfHref);
  const canonical = absoluteUrl(selfPath);

  if (!bilingual) {
    return {
      canonical,
      languages: {
        en: canonical,
        "x-default": canonical,
      },
    };
  }

  const nlHref = hrefInLocale(locale, "nl", href) ?? href;
  const enHref = hrefInLocale(locale, "en", href);
  if (!enHref) {
    return {
      canonical,
      languages: {
        "nl-NL": absoluteUrl(publicPath("nl", nlHref)),
        "nl-BE": beAbsoluteUrl(publicPath("nl", nlHref)),
      },
    };
  }

  const nlPath = publicPath("nl", nlHref);
  const enPath = publicPath("en", enHref);
  return {
    canonical,
    languages: {
      "nl-NL": absoluteUrl(nlPath),
      "nl-BE": beAbsoluteUrl(nlPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(enPath),
    },
  };
}

export function routeMetadata({
  locale,
  href,
  title,
  description,
  absoluteTitle = false,
  ogType = "website",
  bilingual = true,
}: {
  locale: AppLocale;
  href: AppHref;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
  bilingual?: boolean;
}): Metadata {
  const path = publicPath(locale, href);
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ? title : `${title} — ${site.brand}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: routeAlternates(locale, href, { bilingual }),
    openGraph: {
      type: ogType,
      locale: locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale:
        bilingual
          ? locale === "nl"
            ? ["nl_BE", "en_GB"]
            : ["nl_NL", "nl_BE"]
          : undefined,
      url,
      title: ogTitle,
      description,
      siteName: site.brand,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export function htmlLang(locale: AppLocale) {
  return locale === "nl" ? "nl" : "en";
}

export function jsonLdLanguage(locale: AppLocale) {
  return locale === "nl" ? "nl" : "en";
}
