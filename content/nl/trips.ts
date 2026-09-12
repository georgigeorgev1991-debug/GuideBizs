import { TRIP_ID } from "@/content/shared/trips";
import { site } from "@/lib/site";
import type { TripId } from "@/lib/types";

export type TripCopy = {
  id: TripId;
  slug: string;
  name: string;
  region: string;
  fitnessBenchmark: string;
  introduction: [string, string, string];
  sleepNarrative: string;
  foodNarrative: string;
  included: string[];
  notIncluded: string[];
  heroAlt: string;
  galleryAlts: string[];
  itinerary: {
    day: number;
    title: string;
    narrative: string;
    walkingHours: string;
    imageAlts: string[];
  }[];
};

export const tripsCopy: TripCopy[] = [
  {
    id: TRIP_ID,
    slug: "vier-dagen-overtocht",
    name: "Vier dagen over de granietgraat",
    region: site.range,
    fitnessBenchmark:
      "Je moet vier dagen achter elkaar 5 tot 6 uur kunnen lopen, met dagen tot 800 hoogtemeters omhoog en tot 1200 hoogtemeters omlaag, met een dagrugzak van 8 kilo. Klimervaring is niet nodig.",
    introduction: [
      "Vier dagen, drie nachten, acht mensen in een bus van negen zitplaatsen. We halen je op in Sofia en zetten je daar weer af. Daartussen loop je over graniet, langs meren, door dennenbos — zonder dat het pad vol staat.",
      "Je hebt de Alpen gelopen, misschien de Dolomieten. Dit is hetzelfde soort bergdag, zonder de rij bij de pas, zonder het terras op 2000 meter. De markering is rood, de hutbaas onthoudt je naam, en 's avonds eet je aan een lange tafel.",
      "Twee nachten in een bemande berghut, één in een guesthouse in het dal. Geen hotelweek. Wel een route die klopt: 58 kilometer, 3100 hoogtemeters, en een gids op het terrein waar je die nodig hebt.",
    ],
    sleepNarrative:
      "De hut is een slaapzaal: stapelbedden, een wollen deken, een raam dat kiert. Douchen is een emmer of een boorput, als de hutbaas water heeft. Oordoppen meenemen. Het guesthouse in het dal heeft echte bedden en een douche die warm wordt als de boiler meewerkt — één nacht, niet de standaard.",
    foodNarrative:
      "Wij koken de picknick zelf: brood en kaas uit het dal, fruit, noten, iets zoets voor de graat. Ontbijt en avondeten in de hut is soep, stoofschotel, thee — geen menukaart. In het guesthouse eet je wat de vallei die week geeft. Wie speciale wensen heeft, zegt dat vooraf; we toveren geen restaurant tevoorschijn op 2000 meter.",
    included: [
      "Vervoer van en naar de luchthaven van Sofia in onze bus van negen zitplaatsen",
      "Drie overnachtingen: twee in een bemande berghut, één in een guesthouse in het dal",
      "Ontbijt en avondeten in de hutten, picknick voor onderweg",
      "Begeleiding door ons, plus een gecertificeerde lokale gids op technisch terrein",
      "GPX-track van de route, vooraf en om mee naar huis te nemen",
      "Groepsapotheek en noodcommunicatie",
    ],
    notIncluded: [
      "Je vlucht naar Sofia",
      "Persoonlijke reis- en bergverzekering",
      "Slaapzak of lakenzak (de hutten vragen daarom)",
      "Drank in de hut en extra snacks",
      "Fooien, als je die wilt geven",
    ],
    heroAlt: `Zonsopkomst over granieten toppen en een still gletsjermeer in de ${site.range}`,
    galleryAlts: [
      `Een smalle granieten graat in de ${site.range}, rode markering op de rots`,
      "Turkoois gletsjermeer tussen puinhellingen, geen bebouwing aan de oever",
      "Houten guesthouse in een dalweide, waslijnen en een houtstapel naast de deur",
      "Stapelbedden in een Bulgaarse berghut, wollen dekens, klein raam met uitzicht op dennen",
    ],
    itinerary: [
      {
        day: 1,
        title: "Het dal uit, naar hizha Ivan Vazov",
        narrative:
          "We laten de bus achter bij het einde van de weg en lopen meteen het bos in. De eerste uren ruiken naar hars en natte aarde. Boven de boomgrens komt het graniet tevoorschijn: glad, koud, met de rode markering die je de hele week volgt. Je dagrugzak weegt ongeveer acht kilo — middageten, water, een extra laag. Aan het eind van de middag staat de hutbaas in de deuropening. De slaapzaal is een rij stapelbedden, de eetzaal een lange tafel. Dit is geen hotel, en dat merkte je al bij de drempel.",
        walkingHours: "5–6 uur",
        imageAlts: [
          `Een smalle granieten graat in de ${site.range}, rode markering op de rots`,
          "Stapelbedden in een Bulgaarse berghut, wollen dekens, klein raam met uitzicht op dennen",
        ],
      },
      {
        day: 2,
        title: "Over de graat naar de vismeren",
        narrative:
          "Vandaag blijft het pad hoog. We lopen van meer naar meer: stil water, puinhellingen, een wind die van de top komt. Op de graat is het terrein onmiskenbaar, maar nergens heb je een touw nodig. We pauzeren op een vlakke plaat graniet en eten brood en kaas uit het dal. In de verte zie je geen kabelbaan, geen terras, geen rij wandelaars. Aan het eind daal je af naar hizha Ribni ezera. De hutbaas onthoudt je naam bij het uitserveren van de soep.",
        walkingHours: "6 uur",
        imageAlts: [
          "Turkoois gletsjermeer tussen puinhellingen, geen bebouwing aan de oever",
          `Een smalle granieten graat in de ${site.range}, rode markering op de rots`,
        ],
      },
      {
        day: 3,
        title: "Afdaal naar het dal, aankomst in het guesthouse",
        narrative:
          "Een ochtend nog tussen de meren, daarna een eerlijke afdaling door dennenbos. De knieën merken het, maar we splitsen de daling over twee dagen. Beneden ruikt het weer naar houtrook en nat gras. Het guesthouse heeft echte bedden, een douche die warm wordt als de boiler meewerkt, en vanavond een warme maaltijd aan een kleine tafel — geen slaapzaal meer. We eten daar wat de vallei die week geeft: groente, kaas, soms een stoofschotel. Je lichaam is moe op de goede manier.",
        walkingHours: "5–6 uur",
        imageAlts: [
          "Houten guesthouse in een dalweide, waslijnen en een houtstapel naast de deur",
          "Turkoois gletsjermeer tussen puinhellingen, geen bebouwing aan de oever",
        ],
      },
      {
        day: 4,
        title: "Laatste hoogtemeters, terug naar de bus",
        narrative:
          "De laatste ochtend beginnen we vroeg. We maken de afdaling af, dan een korte klim naar een uitzichtpunt boven het dal, en een rustige traverse terug naar het punt waar de bus ons opwacht. Geen vierde nacht: na de afdaling rijden we naar Sofia. Onderweg praten we de route nog eens door — wat zwaar was, wat stil was. Je hebt vier dagen gelopen zonder dat het pad vol stond.",
        walkingHours: "5 uur",
        imageAlts: [
          `Een smalle granieten graat in de ${site.range}, rode markering op de rots`,
        ],
      },
    ],
  },
];
