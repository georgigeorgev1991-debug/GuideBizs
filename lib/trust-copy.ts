import {
  hasTourOperatorRoute,
  isWaitlistMode,
  legal,
} from "@/content/legal";
import type { AppLocale } from "@/i18n/routing";
import { site } from "@/lib/site";

export function consumerTrustLead(locale: AppLocale): string {
  if (legal.tourOperator.route === "none") {
    return locale === "nl"
      ? "De boekingen voor 2027 gaan binnenkort open. Voordat je iets betaalt, vertellen we je precies wie je reis organiseert en hoe je geld beschermd is."
      : "Bookings for 2027 open soon. Before you pay anything, we'll tell you exactly who organises your trip and how your money is protected.";
  }
  if (locale === "nl") {
    return "Je belt ons, je schrijft ons, en de wettelijke dekking voor pakketreizen geldt — geen keurmerk ertussen.";
  }
  return "If you are looking for ABTA or ATOL, we are not members. We are established in the EU. You telephone us, you email us, and you get a real person.";
}

export function consumerTrustItems(locale: AppLocale): string[] {
  const items: string[] = [];
  const { route, registrationNumber, partnerName, insurer } = legal.tourOperator;

  if (route === "own" && registrationNumber) {
    items.push(
      locale === "nl"
        ? `Bulgaars nationaal toerismeregister, nummer ${registrationNumber}`
        : `Bulgarian National Tourism Register, number ${registrationNumber}`,
    );
    if (insurer) {
      items.push(
        locale === "nl"
          ? `Aansprakelijkheidsverzekering touroperator (${insurer}; Toerismewet art. 97), inclusief insolventie`
          : `Compulsory tour-operator liability insurance (${insurer}; Tourism Act art. 97), covering travellers including in insolvency`,
      );
    }
    items.push(
      locale === "nl"
        ? "Europese Pakketreizenrichtlijn"
        : "EU Package Travel Directive, because we are established in the Union",
    );
  }

  if (route === "partner" && partnerName && registrationNumber) {
    items.push(
      locale === "nl"
        ? `Deze reis wordt georganiseerd onder de licentie van ${partnerName}, geregistreerd touroperator nr. ${registrationNumber}`
        : `This trip is organised under the licence of ${partnerName}, registered tour operator no. ${registrationNumber}`,
    );
    if (insurer) {
      items.push(
        locale === "nl"
          ? `Aansprakelijkheidsverzekering van de partner (${insurer})`
          : `Partner tour-operator liability insurance (${insurer})`,
      );
    }
    items.push(
      locale === "nl"
        ? "Europese Pakketreizenrichtlijn"
        : "EU Package Travel Directive",
    );
  }

  return items;
}

export function consumerTrustHeading(locale: AppLocale): string {
  return locale === "nl" ? "Bij wie boek je?" : "Who you pay";
}

export function faqInsuranceAnswer(locale: AppLocale): string {
  const own =
    locale === "nl"
      ? "Sluit zelf een reis- en bergverzekering af die heli-evacuatie dekt. We zijn geen lid van ANVR of SGR; dat zeggen we graag hardop."
      : "Take your own travel and mountain insurance that covers helicopter evacuation. We are not members of ANVR or SGR; we say that out loud.";

  if (!hasTourOperatorRoute()) {
    return locale === "nl"
      ? `Zolang de boekingen voor 2027 nog niet open zijn, claimen we geen touroperator-dekking op deze site. ${own}`
      : `While 2027 bookings are not open yet, we make no tour-operator protection claims on this site. ${own}`;
  }

  const items = consumerTrustItems(locale);
  return `${items.join(" ")} ${own}`;
}

export function faqBookingPayAnswer(locale: AppLocale): string {
  const phone = site.phone ? ` ${site.phone}.` : "";
  if (isWaitlistMode()) {
    return locale === "nl"
      ? `De boekingen voor 2027 zijn nog niet open. Laat je e-mail achter op de reispagina om de data als eerste te krijgen. Voordat je iets betaalt, vertellen we je precies wie je reis organiseert en hoe je geld beschermd is.${phone ? ` Liever bellen:${phone}` : ""}`
      : `Bookings for 2027 are not open yet. Leave your email on the trip page to get the dates first. Before you pay anything, we'll tell you exactly who organises your trip and how your money is protected.${phone ? ` Prefer to call:${phone}` : ""}`;
  }
  return locale === "nl"
    ? `Stuur een aanvraag via het formulier. We bevestigen de plaats per e-mail (${site.email}). We sturen de betaalinstructies per mail zodra de plek rond is. Geen webwinkel.${phone ? ` Liever bellen:${phone}` : ""}`
    : `Send an enquiry via the form. We confirm the place by email (${site.email}). Payment instructions follow by email once your place is set. No web shop.${phone ? ` Prefer to call:${phone}` : ""}`;
}

export function faqWhoAreYouAnswer(locale: AppLocale): string {
  const phoneBit = site.phone
    ? locale === "nl"
      ? ` Bel ${site.phone} als je ons eerst wilt horen.`
      : ` Call ${site.phone} if you want to hear us first.`
    : "";
  return locale === "nl"
    ? `Lotte en Niels. Allebei Nederlandstalig, woonachtig in Bulgarije, jaren op deze paden. ${site.brand} is de werknaam van ons tweetal. Geen callcenter.${phoneBit}`
    : `Lotte and Niels. Both native Dutch speakers, living in Bulgaria, years on these paths. ${site.brand} is the working name of the two of us. No call centre.${phoneBit}`;
}

export function corporateTrustItems(): string[] {
  const items: string[] = [
    "Named lead guide with a face",
    "Written safety and weather plan",
    "Stated guide-to-guest ratio",
    "One written contract, one final price, no VAT added",
  ];
  if (legal.firstAidCertified) {
    items.push("First-aid trained guides");
  }
  if (legal.liabilityInsurance) {
    items.push(
      `Liability cover: ${legal.liabilityInsurance.insurer} — ${legal.liabilityInsurance.description}`,
    );
  }
  return items;
}

export function waitlistTripCta(locale: AppLocale) {
  return {
    heading:
      locale === "nl"
        ? "Ontvang de data voor 2027 als eerste"
        : "Get the 2027 dates first",
    lead:
      locale === "nl"
        ? "Laat je e-mail achter. Zodra de boekingen openen, hoor je het als eerste. Voordat je iets betaalt, vertellen we je precies wie je reis organiseert en hoe je geld beschermd is."
        : "Leave your email. When bookings open, you hear first. Before you pay anything, we'll tell you exactly who organises your trip and how your money is protected.",
    submit:
      locale === "nl"
        ? "Ontvang de data voor 2027 als eerste"
        : "Get the 2027 dates first",
  };
}

export function enquiryTripCta(locale: AppLocale) {
  return {
    heading: locale === "nl" ? "Vraag deze reis aan" : "Ask for this trip",
    lead:
      locale === "nl"
        ? "Stuur een mail. We bevestigen je plek met de hand, geen winkelwagen."
        : "Send an email. We confirm your place by hand, no shopping cart.",
    submit: locale === "nl" ? "Vraag deze reis aan" : "Ask for this trip",
  };
}

export function tripBookCopy(locale: AppLocale) {
  return isWaitlistMode() ? waitlistTripCta(locale) : enquiryTripCta(locale);
}

export function waitlistPrivateHeading(locale: AppLocale) {
  return locale === "nl"
    ? "Plan je voor 2027? Vertel ons over je groep"
    : "Planning for 2027? Tell us about your group";
}

export function plannedStatusLabel(locale: AppLocale) {
  return locale === "nl" ? "gepland 2027" : "planned 2027";
}
