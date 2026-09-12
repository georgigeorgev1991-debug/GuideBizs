import type { Metadata } from "next";

import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { getFaq, getPages, getSeo, primaryTrip } from "@/lib/content";
import { faqPageJsonLd } from "@/lib/jsonld";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
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
    href: "/praktisch",
    title: seo.praktisch.title,
    description: seo.praktisch.description,
  });
}

export default async function PracticalPage({ params }: { params: Promise<Params> }) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const faq = getFaq(locale);
  const copy = getPages(locale);
  const switcher = await languageSwitcher(locale, "/praktisch");

  return (
    <>
      <JsonLd data={faqPageJsonLd(locale, faq)} />
      <SiteHeader tripSlug={trip.slug} {...switcher} />
      <section className="px-6 pt-28 pb-16 md:px-12 lg:px-16">
        <h1 className="font-display-hero max-w-[var(--measure)] text-4xl md:text-5xl">
          {copy.practical.h1}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base">{copy.practical.lead}</p>
      </section>
      <Section id="vragen" tone="granite">
        <FaqAccordion groups={faq} />
      </Section>
    </>
  );
}
