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

export function routeAlternates(
  locale: AppLocale,
  href: AppHref,
): NonNullable<Metadata["alternates"]> {
  const nlHref = hrefInLocale(locale, "nl", href) ?? href;
  const enHref = hrefInLocale(locale, "en", href);
  const nlPath = publicPath("nl", nlHref);
  const enPath = enHref ? publicPath("en", enHref) : nlPath;
  const selfPath = locale === "nl" ? nlPath : enPath;
  const canonical = absoluteUrl(selfPath);
  return {
    canonical,
    languages: {
      "nl-NL": absoluteUrl(nlPath),
      "nl-BE": beAbsoluteUrl(nlPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(nlPath),
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
}: {
  locale: AppLocale;
  href: AppHref;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
}): Metadata {
  const path = publicPath(locale, href);
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ? title : `${title} — ${site.brand}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: routeAlternates(locale, href),
    openGraph: {
      type: ogType,
      locale: locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale:
        locale === "nl" ? ["nl_BE", "en_GB"] : ["nl_NL", "nl_BE"],
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
