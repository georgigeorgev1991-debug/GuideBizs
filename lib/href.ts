import { routing, type AppLocale, type Pathname } from "@/i18n/routing";
import { mapStorySlugSync } from "@/content/shared/stories";
import { mapTripSlug, otherLocale } from "@/lib/content";

type StaticPath = Exclude<Pathname, "/reizen/[slug]" | "/verhalen/[slug]">;

export type AppHref =
  | StaticPath
  | { pathname: "/reizen/[slug]"; params: { slug: string } }
  | { pathname: "/verhalen/[slug]"; params: { slug: string } };

function withPrefix(locale: AppLocale, path: string) {
  if (locale === routing.defaultLocale) {
    return path;
  }
  if (path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path}`;
}

export function formatPath(locale: AppLocale, href: AppHref) {
  if (typeof href === "string") {
    const spec = routing.pathnames[href];
    const path = typeof spec === "string" ? spec : spec[locale];
    return withPrefix(locale, path);
  }
  const spec = routing.pathnames[href.pathname];
  const template = typeof spec === "string" ? spec : spec[locale];
  return withPrefix(locale, template.replace("[slug]", href.params.slug));
}

export function hrefInLocale(
  current: AppLocale,
  target: AppLocale,
  href: AppHref,
): AppHref | null {
  if (typeof href === "string") {
    return href;
  }
  if (href.pathname === "/reizen/[slug]") {
    const slug = mapTripSlug(current, target, href.params.slug);
    if (!slug) {
      return null;
    }
    return { pathname: "/reizen/[slug]", params: { slug } };
  }
  const slug = mapStorySlugSync(current, target, href.params.slug);
  if (!slug) {
    return null;
  }
  return { pathname: "/verhalen/[slug]", params: { slug } };
}

export function tripHref(slug: string) {
  return { pathname: "/reizen/[slug]", params: { slug } } as const;
}

export function storyHref(slug: string) {
  return { pathname: "/verhalen/[slug]", params: { slug } } as const;
}

export function alternateHref(locale: AppLocale, href: AppHref): string | null {
  const other = otherLocale(locale);
  const mapped = hrefInLocale(locale, other, href);
  if (!mapped) {
    return null;
  }
  return formatPath(other, mapped);
}
