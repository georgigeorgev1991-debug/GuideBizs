import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/ui/Section";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { Link } from "@/i18n/navigation";
import { getContact, getSeo, getTeam, primaryTrip } from "@/lib/content";
import { issueFormStamp } from "@/lib/forms/guards";
import { resolveLocale } from "@/lib/locale";
import { routeMetadata } from "@/lib/seo";
import { languageSwitcher } from "@/lib/switcher";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

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
    href: "/contact",
    title: seo.contact.title,
    description: seo.contact.description,
  });
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const locale = await resolveLocale(params);
  const trip = primaryTrip(locale);
  const contactPage = getContact(locale);
  const team = getTeam(locale);
  const tCommon = await getTranslations("common");
  const switcher = await languageSwitcher(locale, "/contact");
  const { issuedAt, stamp } = issueFormStamp();

  return (
    <>
      <SiteHeader tripSlug={trip.slug} {...switcher} />
      <section className="px-6 pt-28 pb-16 md:px-12 lg:px-16">
        <h1 className="font-display-hero max-w-[var(--measure)] text-4xl md:text-5xl">
          {contactPage.h1}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base">{contactPage.lead}</p>
        <dl className="mt-10 max-w-[var(--measure)] space-y-4 text-base">
          <div>
            <dt className="text-sm text-glacier">{contactPage.phoneLabel}</dt>
            <dd>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-glacier">{contactPage.emailLabel}</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-glacier">{contactPage.addressLabel}</dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt className="text-sm text-glacier">{contactPage.namesLabel}</dt>
            <dd>
              {team[0].firstName} {tCommon("and")} {team[1].firstName}
            </dd>
          </div>
        </dl>
      </section>
      <Section id="formulier" tone="snowfield">
        <h2 className="font-display text-2xl">{contactPage.formHeading}</h2>
        <ContactForm
          issuedAt={issuedAt}
          stamp={stamp}
          locale={locale}
          consent={contactPage.consent}
        />
        <p className="mt-12 text-sm text-ink/70">
          <Link href="/privacy" className="underline underline-offset-4">
            {contactPage.privacyLink}
          </Link>
          {" · "}
          <Link href="/algemene-voorwaarden" className="underline underline-offset-4">
            {contactPage.termsLink}
          </Link>
        </p>
      </Section>
    </>
  );
}
