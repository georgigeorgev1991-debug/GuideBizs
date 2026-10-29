import { corporateTrustItems } from "@/lib/trust-copy";
import { site } from "@/lib/site";
import type { TeamMember } from "@/lib/types";

/**
 * Corporate trust block — claims only from legal.ts via corporateTrustItems().
 * Mounted on /companies in Sprint 2; shipped here so the legal surface exists.
 */
export function CorporateTrust({
  heading = "What you can forward to your boss",
  lead = "One written contract. One final price. No VAT added.",
  team,
}: {
  heading?: string;
  lead?: string;
  team: TeamMember[];
}) {
  const items = corporateTrustItems();
  const phone = site.bgPhone.trim() || site.phone.trim();

  return (
    <section id="corporate-trust" className="bg-pine px-6 py-16 text-snowfield md:px-12 md:py-24 lg:px-16">
      <h2 className="font-display text-2xl">{heading}</h2>
      <p className="mt-6 max-w-[var(--measure)] text-base">{lead}</p>
      <ul className="mt-10 max-w-[var(--measure)] space-y-3 text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
        <li>
          {team[0]?.firstName}
          {phone ? ` · ${phone}` : ""} · {site.contactLocation}
        </li>
      </ul>
    </section>
  );
}
