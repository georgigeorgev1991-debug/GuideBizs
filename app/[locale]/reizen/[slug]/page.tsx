import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { EmailCapture } from "@/components/home/EmailCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { ItinerarySticky } from "@/components/trip/ItinerarySticky";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getDepartures,
  getPages,
  getSeo,
  getTripBySlug,
  getTrips,
  primaryTrip,
} from "@/lib/content";
import { formatDeparture, formatNumber } from "@/lib/dates";
import { issueFormStamp } from "@/lib/forms/guards";
import { tripHref } from "@/lib/href";
import { touristTripJsonLd } from "@/lib/jsonld";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
import { languageSwitcher } from "@/lib/switcher";
import { site } from "@/lib/site";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getTrips(locale).map((trip) => ({ locale, slug: trip.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const trip = getTripBySlug(locale, slug);
  const seo = getSeo(locale);
  if (!trip) {
    return { title: seo.reizen.title };
  }
  return routeMetadata({
    locale,
    href: tripHref(trip.slug),
    title: seo.trip.title,
    description: seo.trip.description,
  });
}

export default async function TripPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const trip = getTripBySlug(locale, slug);
  if (!trip) {
    notFound();
  }

  const copy = getPages(locale);
  const tTrip = await getTranslations("trip");
  const tSleeps = await getTranslations("sleeps");
  const tCommon = await getTranslations("common");
  const switcher = await languageSwitcher(locale, tripHref(trip.slug));
  const tripDepartures = getDepartures(locale).filter((item) => item.tripId === trip.id);
  const { issuedAt, stamp } = issueFormStamp();
  const home = primaryTrip(locale);

  return (
    <>
      <JsonLd
        data={touristTripJsonLd(
          locale,
          trip,
          copy.trip.audienceType,
          (n) => tCommon("day", { n }),
        )}
      />
      <SiteHeader tripSlug={home.slug} {...switcher} />

      <section className="relative min-h-[70svh] text-snowfield">
        <Image
          src={trip.heroImage.src}
          alt={trip.heroImage.alt}
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-granite/55" />
        <div className="relative z-10 flex min-h-[70svh] flex-col justify-start px-6 pt-16 pb-16 md:px-12 md:pt-20 lg:px-16">
          <h1 className="font-display-hero max-w-[var(--measure)] text-2xl md:text-5xl">
            {trip.name}
          </h1>
          <p className="mt-3 max-w-[var(--measure)] text-sm">
            <span className="font-mono tabular-nums">{trip.days}</span> {tTrip("days")}
            <span className="mx-2">·</span>
            <span className="font-mono tabular-nums">{trip.nights}</span> {tTrip("nights")}
            <span className="mx-2">·</span>
            <span className="font-mono tabular-nums">{trip.totalDistanceKm}</span> km
            <span className="mx-2">·</span>
            <span className="font-mono tabular-nums">
              {formatNumber(locale, trip.totalAscentM)}
            </span>{" "}
            hm
            <span className="mx-2">·</span>
            {tTrip("max")}{" "}
            <span className="font-mono tabular-nums">{trip.maxParticipants}</span>{" "}
            {tTrip("people")}
            <span className="mx-2">·</span>
            €<span className="font-mono tabular-nums">{trip.priceEUR}</span>
          </p>
          <p
            id="garantie"
            className="mt-2 max-w-[var(--measure)] text-sm font-semibold text-blaze-ui"
          >
            {copy.trip.guarantee.replace("{n}", String(trip.minToGuarantee))}
          </p>
        </div>
      </section>

      <Section id="verhaal" tone="snowfield">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(12rem,0.8fr)]">
          <div>
            <h2 className="font-display text-2xl">{copy.trip.introHeading}</h2>
            <Prose className="mt-6">
              {trip.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </div>
          <dl className="font-mono text-sm tabular-nums lg:pt-16">
            <div>
              <dt className="text-ink/70">{tTrip("distance")}</dt>
              <dd>{trip.totalDistanceKm} km</dd>
            </div>
            <div className="mt-4">
              <dt className="text-ink/70">{tTrip("ascent")}</dt>
              <dd>{formatNumber(locale, trip.totalAscentM)} hm</dd>
            </div>
            <div className="mt-4">
              <dt className="text-ink/70">{tTrip("group")}</dt>
              <dd>
                {tTrip("max")} {trip.maxParticipants}
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section id="etappes" tone="granite">
        <h2 className="font-display text-2xl">{copy.trip.daysHeading}</h2>
        <div className="mt-10">
          <ItinerarySticky
            trip={trip}
            labels={{
              dayPrefix: tCommon("dayPrefix"),
              distance: tTrip("distance"),
              ascent: tTrip("ascent"),
              descent: tTrip("descent"),
              walking: tTrip("walking"),
              sleep: tTrip("sleep"),
              sleeps: {
                berghut: tSleeps("berghut"),
                guesthouse: tSleeps("guesthouse"),
              },
            }}
          />
        </div>
      </Section>

      <Section id="fit" tone="pine">
        <h2 className="font-display text-2xl">{copy.trip.fitHeading}</h2>
        <p className="mt-6 max-w-[var(--measure)] text-base">{trip.fitnessBenchmark}</p>
      </Section>

      <Section id="slapen" tone="granite">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div>
            <h2 className="font-display text-2xl">{copy.trip.sleepHeading}</h2>
            <Prose className="mt-6">
              <p>{trip.sleepNarrative}</p>
            </Prose>
          </div>
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={trip.gallery[3]?.src ?? trip.heroImage.src}
              alt={trip.gallery[3]?.alt ?? trip.heroImage.alt}
              fill
              quality={75}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section id="eten" tone="snowfield">
        <h2 className="font-display text-2xl">{copy.trip.foodHeading}</h2>
        <Prose className="mt-6">
          <p>{trip.foodNarrative}</p>
        </Prose>
      </Section>

      <Section id="inbegrepen" tone="granite">
        <h2 className="font-display text-2xl">{copy.trip.includedSection}</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl">{copy.trip.included}</h3>
            <ul className="mt-6 max-w-[var(--measure)] list-disc space-y-3 pl-5 text-base">
              {trip.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl">{copy.trip.notIncluded}</h3>
            <ul className="mt-6 max-w-[var(--measure)] list-disc space-y-3 pl-5 text-base">
              {trip.notIncluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="data" tone="pine">
        <h2 className="font-display text-2xl">{copy.trip.datesHeading}</h2>
        <ol className="mt-10 space-y-6">
          {tripDepartures.map((departure) => (
            <li
              key={departure.startDate}
              className="flex flex-wrap items-baseline justify-between gap-4 border-t border-glacier/25 pt-4"
            >
              <p className="text-sm tabular-nums">
                {formatDeparture(locale, departure.startDate, departure.endDate)}
              </p>
              <p className="text-sm">{tCommon("spotsLeft", { count: departure.spotsLeft })}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="boeken" tone="granite">
        <h2 className="font-display text-2xl">{copy.trip.bookHeading}</h2>
        <p className="mt-6 max-w-[var(--measure)] text-base">{copy.trip.bookLead}</p>
        <div className="mt-8">
          <Button href={`mailto:${site.email}?subject=${encodeURIComponent(trip.name)}`}>
            {copy.trip.bookCta}
          </Button>
        </div>
        <p className="mt-8">
          <Link href="/prive-reizen" prefetch={false} className="underline underline-offset-4">
            {copy.trip.privateCross}
          </Link>
        </p>
      </Section>

      <Section id="gpx" tone="pine">
        <h2 className="font-display text-2xl">{copy.trip.gpxHeading}</h2>
        <p className="mt-6 max-w-[var(--measure)] text-base">{copy.trip.gpxLead}</p>
        <EmailCapture
          source="gpx"
          issuedAt={issuedAt}
          stamp={stamp}
          locale={locale}
          hint={copy.trip.gpxHint}
          submitLabel={copy.trip.gpxSubmit}
          consentText={getPages(locale).home.gpxConsent}
          variant="secondary"
        />
      </Section>
    </>
  );
}
