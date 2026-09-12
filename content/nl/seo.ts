import { site } from "@/lib/site";

export const seo = {
  home: {
    title: `De verborgen bergen van Bulgarije — ${site.brand}`,
    description:
      "Je hebt de Alpen gelopen. Hier is dezelfde bergdag, zonder de rij bij de pas. Kleine groep, een bus uit Sofia.",
    absoluteTitle: true,
  },
  reizen: {
    title: "De overtocht",
    description:
      "Eén route, niet een brochure vol keuzes. Vier dagen over de graat, max acht, ophalen in Sofia. Bekijk het programma voor je een plek vraagt.",
  },
  trip: {
    title: "Vier dagen over de granietgraat",
    description:
      "58 km, 3100 hm, max acht. Twee nachten hut, één in het dal. €895, bus van en naar Sofia. Geen Alpen-drukte, wel een gids waar het glad is.",
  },
  prive: {
    title: "Privé-reizen voor jouw groep",
    description:
      "Jullie datum, jullie tempo, de hele bus. Vanaf €6400 tot acht mensen. Organiseer je het, vanaf zeven betalers reis je zelf gratis mee.",
  },
  overOns: {
    title: "Wie jullie ophaalt in Sofia",
    description:
      "Lotte en Niels. Nederlandstalig, woonachtig in het dal, bus van negen zelf. Geen kantoor in de Randstad, geen stem op een bandje.",
  },
  praktisch: {
    title: "Vlucht, hut, fitheid, verzekering",
    description:
      "Vlucht, hut, fitheid, eten, veiligheid, verzekering, boeken. Dertien vragen, gegroepeerd, voor je een plaats vraagt.",
  },
  verhalen: {
    title: "Verhalen uit het dal",
    description:
      "Seizoen, hutten, de vlucht, het verschil met de Alpen. Zes stukken op datum. Geen labels, geen zoekbalk, geen catalogus.",
  },
  contact: {
    title: "Bel of mail — je krijgt ons",
    description:
      "Lotte of Niels leest mee. Op werkdagen, als we bereik hebben; anders de eerste avond terug in het dal. Geen ticketnummer, geen chatrobot.",
  },
  voorwaarden: {
    title: "Algemene voorwaarden (concept)",
    description:
      "Schets van onderwerpen, geen contract. Zichtbaar gemarkeerd als concept, nog niet juridisch gecontroleerd.",
  },
  privacy: {
    title: "Privacy (concept)",
    description:
      "Wat de formulieren vragen, Resend, Plausible zonder cookiebanner, bewaartermijn als voorstel, rechten 15 tot 22. Nog niet juridisch gecontroleerd.",
  },
  stories: {
    "hiking-in-bulgaria": {
      title: "Wandelen in Bulgarije: wat je wilt weten",
      description:
        "Seizoen, fitheid, hutten, de vlucht naar Sofia. Geen landengids van dertig pagina’s — wat telt vóór je een plek op de bus vraagt.",
    },
    "versus-the-alps": {
      title: `${site.range} versus de Alpen`,
      description:
        "Zelfde soort bergdag, geen rij bij de pas, geen terras op 2000 meter. Wat er wél anders is als je de Alpen al kent.",
    },
    "is-bulgaria-safe": {
      title: "Is Bulgarije veilig om te wandelen?",
      description:
        "Markering, weer, hond, hutbaas. Geen brochure-zin. Wat we zelf doen op glad graniet en in de mist.",
    },
    "mountain-huts": {
      title: "Berghutten: wat je écht krijgt",
      description:
        "Stapelbed, wollen deken, emmerdouche als er water is. Oordoppen meenemen. Geen chaletweek, wel een naam die de hutbaas onthoudt.",
    },
    "amsterdam-to-the-mountains": {
      title: "Van Amsterdam naar de berg in één dag",
      description:
        "Ochtendvlucht, twee uur in onze bus, ’s middags het dal in. Geen huurauto, geen verloren dag op de snelweg.",
    },
    "multi-day-routes": {
      title: `Meerdaagse routes in de ${site.range}`,
      description:
        "Waarom wij één overtocht rijden in plaats van tien varianten. 58 km, rode markering, meren, graat.",
    },
  },
} as const;
