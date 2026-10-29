import { consumerTrustHeading, consumerTrustItems, consumerTrustLead } from "@/lib/trust-copy";
import type { AppLocale } from "@/i18n/routing";
import { site } from "@/lib/site";
import type { TeamMember } from "@/lib/types";

export function ConsumerTrust({
  locale,
  team,
  andWord,
}: {
  locale: AppLocale;
  team: TeamMember[];
  andWord: string;
}) {
  const heading = consumerTrustHeading(locale);
  const lead = consumerTrustLead(locale);
  const items = consumerTrustItems(locale);
  const phone = site.phone.trim();

  return (
    <section id="vertrouwen" className="bg-pine px-6 py-16 text-snowfield md:px-12 md:py-24 lg:px-16">
      <h2 className="font-display text-2xl">{heading}</h2>
      <p className="mt-6 max-w-[var(--measure)] text-base">{lead}</p>
      <ul className="mt-10 max-w-[var(--measure)] space-y-3 text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
        <li>
          {team[0].firstName} {andWord} {team[1].firstName}
          {phone ? ` · ${phone}` : ""} · {site.contactLocation}
        </li>
      </ul>
    </section>
  );
}
