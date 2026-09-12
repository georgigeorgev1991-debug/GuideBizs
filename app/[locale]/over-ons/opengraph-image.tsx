import { getSeo } from "@/lib/content";
import { ogContentType, ogSize } from "@/lib/og";
import { ogFor, resolveLocale } from "@/lib/og-route";

export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  return [{ alt: getSeo(locale).overOns.title }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  return ogFor(params, "aboutKicker", getSeo(locale).overOns.title, "/over-ons");
}
