import { site } from "@/lib/site";

export const pages = {
  home: {
    whyHeading: `Waarom ${site.range}`,
    why: [
      "Je hebt de Alpen gelopen. Spanje, Portugal, misschien de Dolomieten. Je kent het gevoel van een goede bergdag — en je kent inmiddels ook het gevoel van een pad dat vol staat.",
      `In de ${site.range} loop je een hele dag zonder iemand tegen te komen. Gletsjermeren, granieten graten, dennenbossen die naar hars ruiken, en 's avonds een berghut waar de hutbaas je naam onthoudt. Bulgarije heeft de bergen van de Alpen zonder de drukte van de Alpen.`,
    ],
    facts: ["2925 m — hoogste top", "41 gletsjermeren", "0 kabelbaanrestaurants"],
    departuresHeading: "De eerstvolgende vertrekdata",
    guaranteeLine: "Gegarandeerd vertrek vanaf 4 deelnemers",
    whoHeading: "Wie zijn wij",
    moreAbout: "Meer over ons",
    guestsHeading: "Drie gasten",
    listHeading: "Wil je de nieuwe data als eerste weten?",
    listBody:
      "We versturen een paar mails per jaar. Nieuwe vertrekdata, en af en toe een route die de moeite waard is. Verder niets.",
    trustHeading: "Bij wie boek je?",
    trustLead:
      "Je belt ons, je schrijft ons, en de wettelijke dekking voor pakketreizen geldt — geen keurmerk ertussen.",
    trustItems: [
      "Bulgaars nationaal toerismeregister, nummer {registration}",
      "Aansprakelijkheidsverzekering touroperator (Toerismewet art. 97), inclusief insolventie",
      "Europese Pakketreizenrichtlijn",
    ],
    heroHeadline: ["De", "verborgen", "bergen", "van", "Bulgarije"],
    heroSubline:
      "Kleinschalige wandel- en bergavonturen, begeleid door mensen die Bulgarije écht kennen.",
    heroMeta: [
      "4 dagen",
      "maximaal 8 personen",
      "vanaf €895",
      "alles inclusief behalve je vlucht",
    ],
    heroCtaTrip: "Bekijk de reis",
    heroCtaPrivate: "Privé met je eigen groep",
    emailHint: "Je krijgt meteen de GPX-track van onze mooiste dagtocht.",
    emailSubmit: "Houd me op de hoogte",
    listConsent: `Ik wil de vertrekdata per mail. Geen andere post. Afmelden via ${site.email}.`,
    gpxConsent: `Ik vraag de GPX-track. Jullie gebruiken dit adres alleen daarvoor. Afmelden: ${site.email}.`,
  },
  trip: {
    introHeading: "Vier dagen, in het kort",
    daysHeading: "Dag voor dag",
    fitHeading: "Hoe fit moet je zijn?",
    sleepHeading:
      "Een Bulgaarse berghut is geen hotel — en dat is precies de bedoeling.",
    foodHeading: "Wat eten we?",
    includedSection: "Wat zit erbij in?",
    included: "Inbegrepen",
    notIncluded: "Niet inbegrepen",
    datesHeading: "Vertrekdata",
    bookHeading: "Vraag deze reis aan",
    bookLead: "Stuur een mail. We bevestigen je plek met de hand, geen winkelwagen.",
    bookCta: "Vraag deze reis aan",
    privateCross: "Liever met je eigen groep?",
    gpxHeading: "De GPX-track",
    gpxLead: "Laat je e-mailadres achter. Je krijgt de track van deze overtocht.",
    gpxHint: "Alleen de GPX, geen nieuwsbrief tenzij je die apart vraagt.",
    gpxSubmit: "Stuur de GPX",
    guarantee: "Gegarandeerd vertrek vanaf {n} deelnemers",
    audienceType: "Ervaren wandelaars",
  },
  tripsIndex: {
    viewTrip: "Bekijk de reis",
  },
  practical: {
    h1: "Praktisch",
    lead:
      "Dertien vragen, gegroepeerd. Tik een vraag open — of gebruik de entertoets of de spatiebalk op de samenvatting.",
  },
  stories: {
    h1: "Verhalen",
    lead: "Zes stukken, op datum. Geen labels, geen zoekbalk.",
  },
  specimen: {
    title: "Letterproef",
    description: `Typografische schaal, kleurentokens en contrast van ${site.brand}.`,
  },
} as const;
