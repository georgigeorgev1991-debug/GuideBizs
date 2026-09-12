import type { AppLocale, StoryId } from "@/lib/types";

export const STORY_IDS: StoryId[] = [
  "hiking-in-bulgaria",
  "versus-the-alps",
  "is-bulgaria-safe",
  "mountain-huts",
  "amsterdam-to-the-mountains",
  "multi-day-routes",
];

export const storySlugs: Record<StoryId, Record<AppLocale, string>> = {
  "hiking-in-bulgaria": {
    nl: "wandelen-in-bulgarije",
    en: "hiking-in-bulgaria",
  },
  "versus-the-alps": {
    nl: "versus-de-alpen",
    en: "versus-the-alps",
  },
  "is-bulgaria-safe": {
    nl: "is-bulgarije-veilig",
    en: "is-bulgaria-safe",
  },
  "mountain-huts": {
    nl: "berghutten-in-bulgarije",
    en: "mountain-huts-in-bulgaria",
  },
  "amsterdam-to-the-mountains": {
    nl: "van-amsterdam-naar-de-bergen",
    en: "from-amsterdam-to-the-mountains",
  },
  "multi-day-routes": {
    nl: "meerdaagse-wandelroutes",
    en: "multi-day-walking-routes",
  },
};

export function storyIdFromSlug(locale: AppLocale, slug: string): StoryId | null {
  const entry = (Object.entries(storySlugs) as [StoryId, Record<AppLocale, string>][]).find(
    ([, slugs]) => slugs[locale] === slug,
  );
  return entry?.[0] ?? null;
}

export function mapStorySlugSync(from: AppLocale, to: AppLocale, slug: string) {
  const id = storyIdFromSlug(from, slug);
  if (!id) {
    return null;
  }
  return storySlugs[id][to];
}
