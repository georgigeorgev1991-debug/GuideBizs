import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { EmailCapture } from "@/components/home/EmailCapture";
import { HomeRail, HomeRidge } from "@/components/home/BelowFoldMotion";
import { Hero } from "@/components/hero/Hero";
import { TrustBlock } from "@/components/trust/TrustBlock";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { Link } from "@/i18n/navigation";
import {
  getDepartures,
  getImages,
  getPages,
  getSeo,
  getTeam,
  getTestimonials,
  primaryTrip,
} from "@/lib/content";
import { formatDeparture } from "@/lib/dates";
import { issueFormStamp } from "@/lib/forms/guards";
import { tripHref } from "@/lib/href";
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
    href: "/",
    title: seo.home.title,
    description: seo.home.description,
    absoluteTitle: seo.home.absoluteTitle,
  });
}

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const copy = getPages(locale);
  const team = getTeam(locale);
  const testimonials = getTestimonials(locale);
  const departures = getDepartures(locale);
  const images = getImages(locale);
  const tCommon = await getTranslations("common");
  const tRidge = await getTranslations("ridge");
  const switcher = await languageSwitcher(locale, "/");
  const { issuedAt, stamp } = issueFormStamp();

  return (
    <>
      <HomeRail trip={trip} />
      <SiteHeader tripSlug={trip.slug} {...switcher} />

      <Hero
        image={trip.heroImage}
        tripHref={tripHref(trip.slug)}
        privateHref="/prive-reizen"
        headline={copy.home.heroHeadline}
        subline={copy.home.heroSubline}
        meta={copy.home.heroMeta}
        ctaTrip={copy.home.heroCtaTrip}
        ctaPrivate={copy.home.heroCtaPrivate}
      />

      <Section id="waarom" tone="snowfield">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(12rem,0.8fr)] lg:items-start">
          <div>
            <h2 className="font-display text-2xl">{copy.home.whyHeading}</h2>
            <Prose className="mt-6">
              {copy.home.why.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
          <ul className="font-mono text-sm tabular-nums lg:pt-16">
            {copy.home.facts.map((fact) => (
              <li key={fact} className="mt-4 first:mt-0">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <HomeRidge
        heading={tRidge("sr")}
        alts={{
          ridgeFar: images.ridgeFar.alt,
          ridgeMid: images.ridgeMid.alt,
          ridgeFore: images.ridgeFore.alt,
        }}
      />

      <Section id="vertrekdata" tone="granite">
        <h2 className="font-display text-2xl">{copy.home.departuresHeading}</h2>
        <p className="mt-4 max-w-[var(--measure)] text-sm text-glacier">
          {copy.home.guaranteeLine}
        </p>
        <ol className="mt-10 space-y-6">
          {departures.map((departure) => (
            <li
              key={departure.startDate}
              className="flex flex-wrap items-baseline justify-between gap-4 border-t border-glacier/25 pt-4"
            >
              <p className="text-sm tabular-nums">
                {formatDeparture(locale, departure.startDate, departure.endDate)}
              </p>
              <p className="text-sm">
                {tCommon("spotsLeft", { count: departure.spotsLeft })}
                {departure.status === "gegarandeerd" ? (
                  <span className="ml-3 text-glacier">{tCommon("guaranteed")}</span>
                ) : null}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="wie" tone="pine">
        <h2 className="font-display text-2xl">{copy.home.whoHeading}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {team.map((member) => (
            <article key={member.firstName}>
              <div className="relative aspect-[4/5] w-full max-w-sm">
                <Image
                  src={member.portrait.src}
                  alt={member.portrait.alt}
                  fill
                  quality={75}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-display mt-5 text-xl">{member.firstName}</h3>
              <Prose className="mt-3">
                <p>{member.bio}</p>
              </Prose>
            </article>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/over-ons" prefetch={false} className="underline underline-offset-4">
            {copy.home.moreAbout}
          </Link>
        </p>
      </Section>

      <Section id="gasten" tone="granite">
        <h2 className="font-display text-2xl">{copy.home.guestsHeading}</h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.name}>
              <div className="relative aspect-[4/5] w-full max-w-[16rem]">
                <Image
                  src={item.portrait.src}
                  alt={item.portrait.alt}
                  fill
                  quality={75}
                  sizes="(min-width: 768px) 25vw, 60vw"
                  className="object-cover"
                />
              </div>
              <blockquote className="mt-5 max-w-[var(--measure)] text-base">
                <p>{item.quote}</p>
                <footer className="mt-4 text-sm text-glacier">{item.name}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </Section>

      <TrustBlock
        heading={copy.home.trustHeading}
        lead={copy.home.trustLead}
        items={[...copy.home.trustItems]}
        team={team}
        andWord={tCommon("and")}
      />

      <Section id="lijst" tone="granite">
        <h2 className="font-display text-2xl">{copy.home.listHeading}</h2>
        <Prose className="mt-6">
          <p>{copy.home.listBody}</p>
        </Prose>
        <EmailCapture
          issuedAt={issuedAt}
          stamp={stamp}
          locale={locale}
          hint={copy.home.emailHint}
          submitLabel={copy.home.emailSubmit}
          consentText={copy.home.listConsent}
        />
      </Section>
    </>
  );
}
