import type { Metadata } from "next";

import { SiteHeader } from "@/components/ui/SiteHeader";
import { Link } from "@/i18n/navigation";
import { getPages, getSeo, primaryTrip } from "@/lib/content";
import { formatDay } from "@/lib/dates";
import { storyHref } from "@/lib/href";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
import { listStories } from "@/lib/stories";
import { languageSwitcher } from "@/lib/switcher";

type Params = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const seo = getSeo(locale);
  return routeMetadata({
    locale,
    href: "/verhalen",
    title: seo.verhalen.title,
    description: seo.verhalen.description,
  });
}

export default async function StoriesIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const copy = getPages(locale);
  const stories = await listStories(locale);
  const switcher = await languageSwitcher(locale, "/verhalen");

  return (
    <>
      <SiteHeader tripSlug={trip.slug} {...switcher} />
      <section className="px-6 pt-28 pb-16 md:px-12 lg:px-16">
        <h1 className="font-display-hero max-w-[var(--measure)] text-4xl md:text-5xl">
          {copy.stories.h1}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base">{copy.stories.lead}</p>
      </section>
      <section className="bg-snowfield px-6 py-16 text-ink md:px-12 md:py-24 lg:px-16">
        <ol className="max-w-[var(--measure)] space-y-12">
          {stories.map((story) => (
            <li key={story.slug}>
              <p className="text-sm text-ink/70">
                <time {...{ datetime: story.publishedAt }}>{formatDay(locale, story.publishedAt)}</time>
              </p>
              <h2 className="font-display mt-2 text-2xl">
                <Link href={storyHref(story.slug)} className="underline-offset-4 hover:underline">
                  {story.titel}
                </Link>
              </h2>
              <p className="mt-3 text-base">{story.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
