import { getSeo, getTripBySlug } from "@/lib/content";
import { ogContentType, ogSize } from "@/lib/og";
import { ogFor, resolveLocale } from "@/lib/og-route";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const trip = getTripBySlug(locale, slug);
  const seo = getSeo(locale);
  return ogFor(params, "tripKicker", trip?.name ?? seo.trip.title, `/reizen/${slug}`);
}
