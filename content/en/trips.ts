import { enCopy } from "@/content/en/placeholder";
import { TRIP_ID } from "@/content/shared/trips";
import { site } from "@/lib/site";
import type { TripCopy } from "@/content/nl/trips";

export const tripsCopy: TripCopy[] = enCopy([
  {
    id: TRIP_ID,
    slug: "four-day-crossing",
    name: "Four days on the granite ridge",
    region: site.range,
    fitnessBenchmark:
      "You need to walk five to six hours a day for four days, with days up to 800 metres of ascent and 1200 metres of descent, carrying an 8 kilo daypack. Climbing skill is not required.",
    introduction: [
      "Placeholder. Four days, three nights, eight people in a nine-seat van. Pickup in Sofia, drop-off there too. Granite, lakes, pine — without a crowded path.",
    "Placeholder. Same kind of mountain day as the Alps, without the queue at the pass. Red marks, a hut keeper who remembers your name, dinner at a long table.",
      "Placeholder. Two nights in a staffed mountain hut, one in a valley guesthouse. 58 kilometres, 3100 metres of ascent, a guide where the rock is slick.",
    ],
    sleepNarrative:
      "Placeholder. Dormitory bunks, a wool blanket, a window that leaks air. A bucket shower if there is water. Bring earplugs. The valley guesthouse has real beds for one night only.",
    foodNarrative:
      "Placeholder. We pack bread and cheese from the valley. Hut breakfast and dinner are soup and stew. The guesthouse serves whatever the valley has that week. We cannot conjure a restaurant at 2000 metres.",
    included: [
      "Transport to and from Sofia airport in our nine-seat van",
      "Three nights: two in a staffed mountain hut, one in a valley guesthouse",
      "Breakfast and dinner in the huts, picnic for the trail",
      "Guiding by us, plus a certified local guide on technical ground",
      "GPX track of the route, beforehand and to take home",
      "Group first-aid kit and emergency comms",
    ],
    notIncluded: [
      "Your flight to Sofia",
      "Personal travel and mountain insurance",
      "Sleeping bag or liner (huts ask for it)",
      "Drinks in the hut and extra snacks",
      "Tips, if you want to leave them",
    ],
    heroAlt: `Sunrise over granite peaks and a still glacial lake in the ${site.range}`,
    galleryAlts: [
      `A narrow granite ridge in the ${site.range}, red paint on the rock`,
      "Turquoise glacial lake among scree, no buildings on the shore",
      "Wooden guesthouse in a valley meadow, washing lines and a woodpile",
      "Bunks in a Bulgarian mountain hut, wool blankets, a small window onto pines",
    ],
    itinerary: [
      {
        day: 1,
        title: "Out of the valley, to hizha Ivan Vazov",
        narrative:
          "Placeholder. We leave the van at the end of the road and walk into the forest. Above the trees the granite appears, with the red marks you follow all week. About eight kilos on your back. The hut keeper stands in the doorway. This is not a hotel.",
        walkingHours: "5–6 hours",
        imageAlts: [
          `A narrow granite ridge in the ${site.range}, red paint on the rock`,
          "Bunks in a Bulgarian mountain hut, wool blankets, a small window onto pines",
        ],
      },
      {
        day: 2,
        title: "Along the ridge to the fish lakes",
        narrative:
          "Placeholder. High ground, lake to lake, wind off the summit. No rope needed. Bread and cheese on a granite slab. No cable car, no terrace, no queue. Down to hizha Ribni ezera. The hut keeper remembers your name with the soup.",
        walkingHours: "6 hours",
        imageAlts: [
          "Turquoise glacial lake among scree, no buildings on the shore",
          `A narrow granite ridge in the ${site.range}, red paint on the rock`,
        ],
      },
      {
        day: 3,
        title: "Descent to the valley, arrival at the guesthouse",
        narrative:
          "Placeholder. A morning among the lakes, then a honest descent through pine. Knees notice it; we split the descent over two days. Real beds, a shower if the boiler cooperates, a proper meal at a small table.",
        walkingHours: "5–6 hours",
        imageAlts: [
          "Wooden guesthouse in a valley meadow, washing lines and a woodpile",
          "Turquoise glacial lake among scree, no buildings on the shore",
        ],
      },
      {
        day: 4,
        title: "Last metres of ascent, back to the van",
        narrative:
          "Placeholder. An early start, finish the descent, a short climb to a viewpoint, a quiet traverse to the van. No fourth night: we drive to Sofia. Four days without a crowded path.",
        walkingHours: "5 hours",
        imageAlts: [
          `A narrow granite ridge in the ${site.range}, red paint on the rock`,
        ],
      },
    ],
  },
]);
