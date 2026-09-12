import { getSeo } from "@/lib/content";
import { ogContentType, ogSize } from "@/lib/og";
import { ogFor, getStory, resolveLocale } from "@/lib/og-route";

export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const story = await getStory(locale, slug);
  const title = story?.meta.titel ?? getSeo(locale).verhalen.title;
  return ogFor(params, "storyKicker", title, `/verhalen/${slug}`);
}
