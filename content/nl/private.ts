import { site } from "@/lib/site";

export const privateCopy = {
  h1: "Jouw groep, jouw datum, jouw tempo",
  lead: "Met een wandelclub, een vriendengroep of een verjaardag die om iets beters vraagt dan een etentje? Dan rijden we de bus alleen voor jullie.",
  organiserLine:
    "Organiseer je de reis? Vanaf 7 betalende deelnemers reis je zelf gratis mee.",
  invitations: [
    "wandelclubs",
    "vriendengroepen",
    "een 50e verjaardag",
    "een teamuitje",
    "families",
  ],
  blocks: [
    {
      title: "Eigen datum",
      body: "Geen vaste kalender. Jullie kiezen het weekend of die dagen, wij rijden de bus.",
    },
    {
      title: "Eigen tempo en niveau",
      body: "Korter, langer, meer dalen, minder graat: we zetten de etappes naar jullie benen, niet naar een folder.",
    },
    {
      title: "Alleen je eigen gezelschap",
      body: "Geen vreemden in de slaapzaal, geen wachten op een groep die je niet kent. De negen zitplaatsen zijn van jullie.",
    },
  ],
  consent:
    `Jullie gegevens gebruiken we alleen om deze aanvraag te beantwoorden. Geen nieuwsbrief, tenzij je die apart vraagt. Afmelden of wissen: een mail naar ${site.email}.`,
  vanLabel: "De hele bus, tot {max} mensen",
  vanNote: "Eén bedrag voor de van. Niet per persoon — dan gaat niemand rekenen.",
  forWhom: "Voor wie",
  formHeading: "Plan je voor 2027? Vertel ons over je groep",
  formLead: "Geen winkelwagen. Je schrijft ons; wij mailen terug over een privé-reis in 2027.",
} as const;
