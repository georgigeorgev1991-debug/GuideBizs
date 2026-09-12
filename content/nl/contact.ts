import { site } from "@/lib/site";

export const contactPage = {
  h1: "Schrijf of bel. Je krijgt ons.",
  lead: `Geen ticketnummer. Lotte of Niels leest mee. Op werkdagen, als we bereik hebben; anders de eerste avond terug in het dal.`,
  consent: `Jullie bericht gebruiken we alleen om te antwoorden. Geen nieuwsbrief, tenzij je die apart vraagt. Afmelden of wissen: een mail naar ${site.email}.`,
  phoneLabel: "Telefoon",
  emailLabel: "E-mail",
  addressLabel: "Adres",
  namesLabel: "Namen",
  formHeading: "Stuur een bericht",
  privacyLink: "Privacy",
  termsLink: "Algemene voorwaarden",
} as const;
