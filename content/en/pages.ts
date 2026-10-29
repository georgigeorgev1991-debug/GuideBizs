import { site } from "@/lib/site";

export const pages = {
  home: {
    whyHeading: `Why the ${site.range}`,
    why: [
      "Much Better Adventures and 57hours will sell you a well-run trip in a range you already know. This is one crossing in a range most British and Irish walkers have not put on the list: the Rila, granite and glacial lakes, two hours from Sofia.",
      "We live in the valley. We drive the nine-seat van. The group is eight, not a coach. You walk a long day without a terrace, a cable car, or a queue at the col. That is the whole offer.",
    ],
    facts: ["2925 m — highest summit", "Glacial lakes", "0 cable-car restaurants"],
    departuresHeading: "The next departures",
    guaranteeLine: "Planned 2027 dates — bookings open soon",
    whoHeading: "Who drives",
    moreAbout: "More about us",
    guestsHeading: "Three people who came",
    listHeading: "Want the next dates first?",
    listBody:
      "A few emails a year: new departure dates, and sometimes a line worth walking. Nothing else.",
    heroHeadline: ["One", "ridge.", "Eight", "people.", "We", "drive."],
    heroSubline:
      "A four-day crossing in the Rila. We pick you up in Sofia. The owners are in the van.",
    heroMeta: [
      "4 days",
      "maximum 8 people",
      "from €895",
      "everything included except your flight",
    ],
    heroCtaTrip: "See the crossing",
    heroCtaPrivate: "Take the whole van",
    emailHint: "You get the GPX of our finest day walk as soon as you join.",
    emailSubmit: "Keep me posted",
    listConsent: `Send me departure dates by email. No other post. Stop at any time via ${site.email}.`,
    gpxConsent: `Send me the GPX. Use this address only for that. Stop: ${site.email}.`,
  },
  trip: {
    introHeading: "Four days, in short",
    daysHeading: "Day by day",
    fitHeading: "How fit do you need to be?",
    sleepHeading: "A Bulgarian mountain hut is not a hotel — and that is the point.",
    foodHeading: "What do we eat?",
    includedSection: "What is included?",
    included: "Included",
    notIncluded: "Not included",
    datesHeading: "Departure dates",
    bookHeading: "Get the 2027 dates first",
    bookLead:
      "Leave your email. When bookings open, you hear first. Before you pay anything, we'll tell you exactly who organises your trip and how your money is protected.",
    bookCta: "Get the 2027 dates first",
    privateCross: "Rather with your own group?",
    gpxHeading: "The GPX track",
    gpxLead: "Leave your email address. You get the track of this crossing.",
    gpxHint: "Only the GPX, no newsletter unless you ask separately.",
    gpxSubmit: "Send the GPX",
    guarantee: "Guaranteed departure from {n} participants",
    audienceType: "Experienced walkers",
  },
  tripsIndex: {
    viewTrip: "See the trip",
  },
  practical: {
    h1: "Practical",
    lead: "Thirteen questions, grouped. Open a question — or use Enter or Space on the summary.",
  },
  stories: {
    h1: "Stories",
    lead: "Six pieces, by date. No tags, no search bar.",
  },
  specimen: {
    title: "Type specimen",
    description: `Type scale, colour tokens and contrast for ${site.brand}.`,
  },
} as const;
