import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/ui/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getSeo, primaryTrip, storySeo } from "@/lib/content";
import { formatDay } from "@/lib/dates";
import { storyHref } from "@/lib/href";
import { articleJsonLd } from "@/lib/jsonld";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
import { getStory, listStories } from "@/lib/stories";
import { languageSwitcher } from "@/lib/switcher";

type Params = { locale: string; slug: string };

export async function generateStaticParams() {
  const locales = routing.locales;
  const rows = await Promise.all(
    locales.map(async (locale) => {
      const stories = await listStories(locale);
      return stories.map((story) => ({ locale, slug: story.slug }));
    }),
  );
  return rows.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const story = await getStory(locale, slug);
  if (!story) {
    return { title: getSeo(locale).verhalen.title };
  }
  const extra = storySeo(locale, story.meta.id);
  return routeMetadata({
    locale,
    href: storyHref(story.meta.slug),
    title: extra?.title ?? story.meta.titel,
    description: extra?.description ?? story.meta.description,
    ogType: "article",
  });
}

export default async function StoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const story = await getStory(locale, slug);
  if (!story) {
    notFound();
  }

  const trip = primaryTrip(locale);
  const tNav = await getTranslations("storiesNav");
  const switcher = await languageSwitcher(locale, storyHref(story.meta.slug));

  return (
    <>
      <JsonLd data={articleJsonLd(locale, story.meta)} />
      <SiteHeader tripSlug={trip.slug} tone="snowfield" {...switcher} />
      <article className="bg-snowfield px-6 pt-28 pb-24 text-ink md:px-12 lg:px-16">
        <p className="text-sm text-ink/70">
          <time {...{ datetime: story.meta.publishedAt }}>
            {formatDay(locale, story.meta.publishedAt)}
          </time>
        </p>
        <div className="mt-6">{story.content}</div>
        <nav aria-label={tNav("label")} className="mt-16 max-w-[var(--measure)] text-sm">
          <ul className="space-y-4">
            {story.previous ? (
              <li>
                {tNav("earlier")}:{" "}
                <Link href={storyHref(story.previous.slug)} className="underline underline-offset-4">
                  {story.previous.titel}
                </Link>
              </li>
            ) : null}
            {story.next ? (
              <li>
                {tNav("later")}:{" "}
                <Link href={storyHref(story.next.slug)} className="underline underline-offset-4">
                  {story.next.titel}
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </article>
    </>
  );
}
