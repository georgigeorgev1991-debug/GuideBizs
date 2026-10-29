import Image from "next/image";

import { PrivateEnquiryForm } from "@/components/forms/PrivateEnquiryForm";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { getImages, getPrivate, primaryTrip } from "@/lib/content";
import { issueFormStamp } from "@/lib/forms/guards";
import { resolveLocale } from "@/lib/locale";
import { languageSwitcher } from "@/lib/switcher";
import { formatNumber } from "@/lib/dates";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function PrivateTripsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const offer = getPrivate(locale);
  const images = getImages(locale);
  const switcher = await languageSwitcher(locale, "/prive-reizen");
  const { issuedAt, stamp } = issueFormStamp();

  return (
    <>
      <SiteHeader tripSlug={trip.slug} {...switcher} />
      <section className="px-6 pt-28 pb-16 md:px-12 lg:px-16">
        <h1 className="font-display-hero max-w-[var(--measure)] text-4xl md:text-5xl">
          {offer.h1}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base">{offer.lead}</p>
        <div className="relative mt-10 aspect-[3/2] w-full max-w-[var(--measure)] overflow-hidden bg-pine">
          <Image
            src={images.priveGroep.src}
            alt={images.priveGroep.alt}
            fill
            quality={75}
            sizes="(min-width: 768px) 68ch, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <Section id="drie" tone="snowfield">
        <div className="grid gap-12 md:grid-cols-3">
          {offer.blocks.map((block) => (
            <article key={block.title}>
              <h2 className="font-display text-2xl">{block.title}</h2>
              <Prose className="mt-4">
                <p>{block.body}</p>
              </Prose>
            </article>
          ))}
        </div>
      </Section>

      <Section id="prijs" tone="granite">
        <p className="text-sm text-glacier">
          {offer.vanLabel.replace("{max}", String(offer.maxParticipants))}
        </p>
        <p className="font-display mt-4 text-4xl tabular-nums">
          €{formatNumber(locale, offer.vanPriceEUR)}
        </p>
        <p className="mt-4 max-w-[var(--measure)] text-base">{offer.vanNote}</p>
      </Section>

      <Section id="organiseer" tone="pine">
        <div className="flex max-w-[var(--measure)] items-start gap-4">
          <span className="mt-2 size-3 shrink-0 bg-blaze-ui" aria-hidden />
          <p className="font-display text-2xl text-snowfield md:text-3xl">
            {offer.organiserLine}
          </p>
        </div>
      </Section>

      <Section id="voor-wie" tone="granite">
        <h2 className="font-display text-2xl">{offer.forWhom}</h2>
        <p className="mt-6 max-w-[var(--measure)] text-base">
          {offer.invitations.join(" · ")}
        </p>
      </Section>

      <Section id="aanvraag" tone="snowfield">
        <h2 className="font-display text-2xl">{offer.formHeading}</h2>
        <Prose className="mt-6">
          <p>
            {offer.formLead}
            {site.phone.trim() ? ` ${site.phone}` : ""}
          </p>
        </Prose>
        <PrivateEnquiryForm
          issuedAt={issuedAt}
          stamp={stamp}
          locale={locale}
          consent={offer.consent}
          maxParticipants={offer.maxParticipants}
        />
      </Section>
    </>
  );
}
