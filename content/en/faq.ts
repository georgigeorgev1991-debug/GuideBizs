import { enCopy } from "@/content/en/placeholder";
import { tripsCopy } from "@/content/en/trips";
import {
  faqBookingPayAnswer,
  faqInsuranceAnswer,
  faqWhoAreYouAnswer,
} from "@/lib/trust-copy";
import { site } from "@/lib/site";
import type { FaqGroup } from "@/lib/types";

const trip = tripsCopy[0];

export const faq: FaqGroup[] = enCopy([
  {
    title: "Arrival",
    items: [
      {
        question: "How do I get there?",
        answer: `You fly to Sofia. We pick you up in our nine-seat van and drive to the valley under the ${site.range}. About two hours. We drop you back at the airport too.`,
      },
      {
        question: "Which flights?",
        answer:
          "Pick a flight that lands in Sofia in the morning or early afternoon on day one, so we still drive into the valley in daylight. Return in the evening of the last day, or the next morning if you book a night in Sofia yourself. We send the exact pickup time once the group is set.",
      },
    ],
  },
  {
    title: "The walk",
    items: [
      {
        question: "How fit do I need to be?",
        answer: trip.fitnessBenchmark,
      },
      {
        question: "Where do we sleep?",
        answer:
          "A Bulgarian mountain hut is not a hotel — and that is the point. Two nights in a dormitory with bunks, wool blankets, a shared table. One night in a simple valley guesthouse, with a real bed and a shower. Bring a liner or a light sleeping bag.",
      },
      {
        question: "What do we eat?",
        answer:
          "Bread and cheese from the valley, fruit, nuts — that comes as a picnic on the ridge. In the hut we cook a hot meal at night, simple and enough after six hours. At the guesthouse you sit at a normal table: soup, stew, salad. No chain restaurant, no buffet.",
      },
      {
        question: "What do I pack?",
        answer:
          "Broken-in mountain boots, poles if you use them, a daypack around 25 litres, rain jacket, warm layer, liner, sun cap, sunglasses, personal medicine. A packing list follows after booking. Your heavy bag stays with the van or at the guesthouse; on the trail you carry only the day.",
      },
      {
        question: "What if the weather is bad?",
        answer: `Afternoon storms happen in the ${site.range}. We start early, drop if the sky closes, and have a lower option for each stage. If danger lasts, we shorten. The trip does not go “at all costs”.`,
      },
    ],
  },
  {
    title: "Trust",
    items: [
      {
        question: "Is it safe?",
        answer:
          "High mountains without a glacier crossing or a climbing pass. Paths are marked. Where local knowledge counts, we walk with a certified guide. Bulgaria is an EU country; emergency services are reachable. We carry a group first-aid kit and a satellite communicator.",
      },
      {
        question: "What about insurance?",
        answer: faqInsuranceAnswer("en"),
      },
      {
        question: "Who are you exactly?",
        answer: faqWhoAreYouAnswer("en"),
      },
    ],
  },
  {
    title: "Booking",
    items: [
      {
        question: "I travel alone — is that possible?",
        answer:
          "Yes. The group is max eight, often couples and friend groups, and solo travel is normal. We share dorms in the hut; at the guesthouse we try for a single room, without a promise.",
      },
      {
        question: "How do I book and pay?",
        answer: faqBookingPayAnswer("en"),
      },
      {
        question: "Cancellation terms",
        answer:
          "Until 56 days before departure you get the deposit back minus admin costs. After that we settle what we can still reverse with huts and transport. Your own cancellation cover is wise. If we cancel because weather or a too-small group does not allow it, you get the full amount back or a place on a later date.",
      },
    ],
  },
]);
