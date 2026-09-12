import { site } from "@/lib/site";
import type { TeamMember } from "@/lib/types";

export function TrustBlock({
  heading,
  lead,
  items,
  team,
  andWord,
}: {
  heading: string;
  lead: string;
  items: string[];
  team: TeamMember[];
  andWord: string;
}) {
  return (
    <section id="vertrouwen" className="bg-pine px-6 py-16 text-snowfield md:px-12 md:py-24 lg:px-16">
      <h2 className="font-display text-2xl">{heading}</h2>
      <p className="mt-6 max-w-[var(--measure)] text-base">{lead}</p>
      <ul className="mt-10 max-w-[var(--measure)] space-y-3 text-base">
        {items.map((item) => (
          <li key={item}>{item.replace("{registration}", site.registrationNumber)}</li>
        ))}
        <li>
          {team[0].firstName} {andWord} {team[1].firstName} · {site.phone} ·{" "}
          {site.address}
        </li>
      </ul>
    </section>
  );
}
