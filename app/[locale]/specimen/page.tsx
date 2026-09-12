import type { Metadata } from "next";

import { getPages, primaryTrip } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
import { languageSwitcher } from "@/lib/switcher";
import { SiteHeader } from "@/components/ui/SiteHeader";

import { SpecimenView } from "./specimen-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = getPages(locale);
  return {
    ...routeMetadata({
      locale,
      href: "/specimen",
      title: copy.specimen.title,
      description: copy.specimen.description,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function SpecimenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const switcher = await languageSwitcher(locale, "/specimen");
  return (
    <>
      <SiteHeader tripSlug={trip.slug} {...switcher} />
      <SpecimenView />
    </>
  );
}
