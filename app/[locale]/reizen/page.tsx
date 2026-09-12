import type { Metadata } from "next";
import Image from "next/image";

import { SiteHeader } from "@/components/ui/SiteHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPages, getSeo, primaryTrip } from "@/lib/content";
import { tripHref } from "@/lib/href";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
import { languageSwitcher } from "@/lib/switcher";
import { site } from "@/lib/site";

type Params = { locale: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const seo = getSeo(locale);
  return routeMetadata({
    locale,
    href: "/reizen",
    title: seo.reizen.title,
    description: seo.reizen.description,
  });
}

export default async function ReizenIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const copy = getPages(locale);
  const switcher = await languageSwitcher(locale, "/reizen");

  return (
    <>
      <SiteHeader tripSlug={trip.slug} {...switcher} />
      <article className="px-6 py-28 md:px-12 lg:px-16">
        <p className="text-sm text-glacier">{site.range}</p>
        <h1 className="font-display-hero mt-4 max-w-[var(--measure)] text-4xl">
          {trip.name}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base">{trip.introduction[0]}</p>
        <div className="relative mt-10 aspect-[16/9] max-w-4xl">
          <Image
            src={trip.heroImage.src}
            alt={trip.heroImage.alt}
            fill
            priority
            quality={75}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-10">
          <Link href={tripHref(trip.slug)} className="underline underline-offset-4">
            {copy.tripsIndex.viewTrip}
          </Link>
        </p>
      </article>
    </>
  );
}
