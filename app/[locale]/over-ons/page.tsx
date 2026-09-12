import type { Metadata } from "next";
import Image from "next/image";

import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { getAbout, getImages, getSeo, getTeam, primaryTrip } from "@/lib/content";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
import { languageSwitcher } from "@/lib/switcher";
import { site } from "@/lib/site";

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
    href: "/over-ons",
    title: seo.overOns.title,
    description: seo.overOns.description,
  });
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const about = getAbout(locale);
  const team = getTeam(locale);
  const images = getImages(locale);
  const switcher = await languageSwitcher(locale, "/over-ons");

  return (
    <>
      <SiteHeader tripSlug={trip.slug} {...switcher} />
      <section className="px-6 pt-28 pb-16 md:px-12 lg:px-16">
        <h1 className="font-display-hero max-w-[var(--measure)] text-4xl md:text-5xl">
          {about.h1}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base">{about.lead}</p>
      </section>

      <Section id="verhaal" tone="snowfield">
        <div className="relative mb-12 aspect-[3/2] w-full max-w-[var(--measure)] overflow-hidden bg-pine">
          <Image
            src={images.overOnsSamen.src}
            alt={images.overOnsSamen.alt}
            fill
            quality={75}
            sizes="(min-width: 768px) 68ch, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {team.map((member) => (
            <figure key={member.firstName}>
              <div className="relative aspect-[4/5] overflow-hidden bg-pine">
                <Image
                  src={member.portrait.src}
                  alt={member.portrait.alt}
                  fill
                  quality={75}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 font-display text-xl text-ink">
                {member.firstName}
              </figcaption>
            </figure>
          ))}
        </div>
        <Prose className="mt-12">
          {about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Prose>
        <p className="mt-10 max-w-[var(--measure)] text-base text-ink">
          {site.phone} · {site.email}
        </p>
      </Section>
    </>
  );
}
