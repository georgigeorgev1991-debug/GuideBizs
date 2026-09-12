import type { Metadata } from "next";

import { ConceptBanner } from "@/components/legal/ConceptBanner";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { getConceptMark, getSeo, getTerms, primaryTrip } from "@/lib/content";
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
    href: "/algemene-voorwaarden",
    title: seo.voorwaarden.title,
    description: seo.voorwaarden.description,
  });
}

export default async function TermsPage({ params }: { params: Promise<Params> }) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const termsPage = getTerms(locale);
  const switcher = await languageSwitcher(locale, "/algemene-voorwaarden");

  return (
    <>
      <SiteHeader tripSlug={trip.slug} tone="snowfield" {...switcher} />
      <article className="bg-snowfield px-6 pt-28 pb-24 text-ink md:px-12 lg:px-16">
        <ConceptBanner mark={getConceptMark(locale)} />
        <h1 className="font-display-hero mt-10 max-w-[var(--measure)] text-4xl md:text-5xl">
          {termsPage.h1}
        </h1>
        {termsPage.sections.map((section) => (
          <section key={section.title} className="mt-12 max-w-[var(--measure)]">
            <h2 className="font-display text-2xl">{section.title}</h2>
            {section.body.length === 1 ? (
              <p className="mt-4 text-base">{section.body[0]}</p>
            ) : (
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base">
                {section.body.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <ConceptBanner mark={getConceptMark(locale)} />
      </article>
    </>
  );
}
