import { tripsCopy } from "@/content/nl/trips";
import { site } from "@/lib/site";
import type { FaqGroup } from "@/lib/types";

const trip = tripsCopy[0];

export const faq: FaqGroup[] = [
  {
    title: "Aankomst",
    items: [
      {
        question: "Hoe kom ik er?",
        answer: `Je vliegt naar Sofia. Wij halen je op met onze bus van negen zitplaatsen en rijden naar het dal onder de ${site.range}. De rit duurt ongeveer twee uur. Terugzetten doen we ook: je eindigt weer op de luchthaven.`,
      },
      {
        question: "Welke vluchten?",
        answer:
          "Kies een vlucht die in de ochtend of vroege middag in Sofia landt op de startdag, zodat we nog bij daglicht het dal in rijden. Terug een vlucht in de avond van de laatste dag, of de ochtend erna als je zelf een nacht in Sofia boekt. We sturen de exacte ophaaltijd zodra de groep rond is.",
      },
    ],
  },
  {
    title: "De tocht",
    items: [
      {
        question: "Hoe fit moet ik zijn?",
        answer: trip.fitnessBenchmark,
      },
      {
        question: "Waar slapen we?",
        answer:
          "Een Bulgaarse berghut is geen hotel — en dat is precies de bedoeling. Twee nachten slaap je in een slaapzaal met stapelbedden, wollen dekens, een gemeenschappelijke eettafel. Eén nacht in een eenvoudig guesthouse in het dal, met een echt bed en een douche. Neem een lakenzak of lichte slaapzak mee.",
      },
      {
        question: "Wat eten we?",
        answer:
          "Brood en kaas uit het dal, fruit, noten — dat gaat mee als picknick op de graat. In de hut koken we ’s avonds een warme maaltijd, eenvoudig en genoeg na zes uur lopen. In het guesthouse zit je aan een gewone tafel: soep, een stoofschotel, salade. Geen restaurantketen, geen buffet.",
      },
      {
        question: "Wat neem ik mee?",
        answer:
          "Stevige bergschoenen die je al hebt ingelopen, telescopische stokken als je die gewend bent, een dagrugzak van ongeveer 25 liter, regenjas, warme laag, lakenzak, zonpet, zonnebril, persoonlijke medicatie. Een paklijst sturen we na boeking. Je zware tas blijft bij de bus of in het guesthouse; op pad draag je alleen de dag.",
      },
      {
        question: "Wat als het weer slecht is?",
        answer: `In de ${site.range} kan de middag onweer brengen. We starten vroeg, dalen af als de lucht dichttrekt, en hebben een lager alternatief voor elke etappe. Bij aanhoudend gevaarlijk weer korten we in. De tocht gaat niet “ten koste van alles”.`,
      },
    ],
  },
  {
    title: "Vertrouwen",
    items: [
      {
        question: "Is het veilig?",
        answer: `Het terrein is hooggebergte zonder gletsjeroversteek of klimpas. Paden zijn gemarkeerd. Op stukken waar lokale kennis telt, lopen we met een gecertificeerde gids. Bulgarije is een EU-land; noodhulpdiensten zijn bereikbaar. We dragen een groepsapotheek en een satellietcommunicatieapparaat.`,
      },
      {
        question: "Hoe zit het met verzekering?",
        answer: `${site.brand} is ingeschreven in het Bulgaarse nationale toerismeregister (${site.registrationNumber}) en heeft de verplichte aansprakelijkheidsverzekering voor touroperators (Bulgaarse Toerismewet, art. 97), die reizigers dekt, ook bij insolventie. Omdat we in de EU gevestigd zijn, geldt de Pakketreizenrichtlijn. Sluit zelf een reis- en bergverzekering af die heli-evacuatie dekt. We zijn geen lid van ANVR of SGR; dat zeggen we graag hardop.`,
      },
      {
        question: "Wie zijn jullie precies?",
        answer: `Lotte en Niels. Allebei Nederlandstalig, woonachtig in Bulgarije, jaren op deze paden. ${site.brand} is de werknaam van ons tweetal. Geen callcenter, geen onderaannemer die je nog nooit gezien heeft. Bel ${site.phone} als je ons eerst wilt horen.`,
      },
    ],
  },
  {
    title: "Boeken",
    items: [
      {
        question: "Ik kom alleen — kan dat?",
        answer:
          "Ja. De groep is maximaal acht, vaak met stellen en vriendengroepen, en alleen reizen is gewoon. We delen slaapzalen in de hut; in het guesthouse kijken we of een eenpersoonskamer lukt, zonder belofte.",
      },
      {
        question: "Hoe boek en betaal ik?",
        answer: `Stuur een aanvraag via het formulier. We bevestigen de plaats per e-mail${site.email ? ` (${site.email})` : ""}. Je betaalt een aanbetaling, de rest voor vertrek, op onze Bulgaarse bedrijfsrekening. Geen webwinkel, geen nachtelijk afrekenen. Liever bellen: ${site.phone}.`,
      },
      {
        question: "Annuleringsvoorwaarden",
        answer:
          "Tot 56 dagen voor vertrek krijg je de aanbetaling terug minus administratiekosten. Daarna verrekenen we wat we nog kunnen terugdraaien bij hutten en vervoer. Een eigen annuleringsverzekering is verstandig. Als wij annuleren omdat het weer of een te kleine groep het niet toelaat, krijg je het volledige bedrag terug of een plaats op een volgende datum.",
      },
    ],
  },
];
