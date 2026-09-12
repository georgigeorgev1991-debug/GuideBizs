import { getSeo } from "@/lib/content";
import { ogFor, resolveLocale } from "@/lib/og-route";
import { ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  return [{ alt: getSeo(locale).home.title }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  return ogFor(params, "homeKicker", getSeo(locale).home.title, "/");
}
