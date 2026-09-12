import { imageAssets, type ImageKey } from "@/content/shared/images";
import { departureFacts } from "@/content/shared/departures";
import { privateFacts } from "@/content/shared/private";
import { tripFacts } from "@/content/shared/trips";
import { imageAlts as enAlts } from "@/content/en/alts";
import { about as enAbout } from "@/content/en/about";
import { contactPage as enContact } from "@/content/en/contact";
import { faq as enFaq } from "@/content/en/faq";
import { CONCEPT_MARK as enConcept, privacyPage as enPrivacy, termsPage as enTerms } from "@/content/en/legal";
import { pages as enPages } from "@/content/en/pages";
import { privateCopy as enPrivate } from "@/content/en/private";
import { seo as enSeo } from "@/content/en/seo";
import { teamCopy as enTeam } from "@/content/en/team";
import { testimonialsCopy as enTestimonials } from "@/content/en/testimonials";
import { tripsCopy as enTrips } from "@/content/en/trips";
import { imageAlts as nlAlts } from "@/content/nl/alts";
import { about as nlAbout } from "@/content/nl/about";
import { contactPage as nlContact } from "@/content/nl/contact";
import { faq as nlFaq } from "@/content/nl/faq";
import { CONCEPT_MARK as nlConcept, privacyPage as nlPrivacy, termsPage as nlTerms } from "@/content/nl/legal";
import { pages as nlPages } from "@/content/nl/pages";
import { privateCopy as nlPrivate } from "@/content/nl/private";
import { seo as nlSeo } from "@/content/nl/seo";
import { teamCopy as nlTeam } from "@/content/nl/team";
import { testimonialsCopy as nlTestimonials } from "@/content/nl/testimonials";
import { tripsCopy as nlTrips } from "@/content/nl/trips";
import { elevationSeries } from "@/lib/elevation";
import type {
  AppLocale,
  Departure,
  FaqGroup,
  Image,
  StoryId,
  TeamMember,
  Testimonial,
  Trip,
  TripId,
} from "@/lib/types";

const alts = { nl: nlAlts, en: enAlts };
const tripCopy = { nl: nlTrips, en: enTrips };
const seoCopy = { nl: nlSeo, en: enSeo };
const faqCopy = { nl: nlFaq, en: enFaq };
const aboutCopy = { nl: nlAbout, en: enAbout };
const privateLocale = { nl: nlPrivate, en: enPrivate };
const contactCopy = { nl: nlContact, en: enContact };
const pagesCopy = { nl: nlPages, en: enPages };
const teamLocale = { nl: nlTeam, en: enTeam };
const testimonialLocale = { nl: nlTestimonials, en: enTestimonials };
const conceptMark = { nl: nlConcept, en: enConcept };
const termsCopy = { nl: nlTerms, en: enTerms };
const privacyCopy = { nl: nlPrivacy, en: enPrivacy };

export function isLocale(value: string): value is AppLocale {
  return value === "nl" || value === "en";
}

export function otherLocale(locale: AppLocale): AppLocale {
  return locale === "nl" ? "en" : "nl";
}

export function getImages(locale: AppLocale): Record<ImageKey, Image> {
  const labels = alts[locale];
  return Object.fromEntries(
    (Object.keys(imageAssets) as ImageKey[]).map((key) => [
      key,
      { ...imageAssets[key], alt: labels[key] },
    ]),
  ) as Record<ImageKey, Image>;
}

function asset(locale: AppLocale, key: ImageKey): Image {
  return { ...imageAssets[key], alt: alts[locale][key] };
}

export function getTrips(locale: AppLocale): Trip[] {
  const images = getImages(locale);
  return tripFacts.map((facts) => {
    const copy = tripCopy[locale].find((item) => item.id === facts.id);
    if (!copy) {
      throw new Error(`Missing trip copy ${facts.id} for ${locale}`);
    }
    return {
      id: facts.id,
      slug: copy.slug,
      name: copy.name,
      region: copy.region,
      days: facts.days,
      nights: facts.nights,
      priceEUR: facts.priceEUR,
      maxParticipants: facts.maxParticipants,
      minToGuarantee: facts.minToGuarantee,
      difficulty: facts.difficulty,
      fitnessBenchmark: copy.fitnessBenchmark,
      introduction: copy.introduction,
      sleepNarrative: copy.sleepNarrative,
      foodNarrative: copy.foodNarrative,
      totalDistanceKm: facts.totalDistanceKm,
      totalAscentM: facts.totalAscentM,
      included: copy.included,
      notIncluded: copy.notIncluded,
      gpxUrl: facts.gpxUrl,
      heroImage: { ...images[facts.heroImageKey], alt: copy.heroAlt },
      gallery: facts.galleryKeys.map((key, index) => ({
        ...images[key],
        alt: copy.galleryAlts[index] ?? images[key].alt,
      })),
      itinerary: facts.itinerary.map((day, index) => {
        const dayCopy = copy.itinerary[index];
        return {
          day: day.day,
          title: dayCopy.title,
          narrative: dayCopy.narrative,
          distanceKm: day.distanceKm,
          ascentM: day.ascentM,
          descentM: day.descentM,
          walkingHours: dayCopy.walkingHours,
          sleeps: day.sleeps,
          startM: day.startM,
          elevation: elevationSeries({
            startM: day.startM,
            ascentM: day.ascentM,
            descentM: day.descentM,
          }),
          images: day.imageKeys.map((key, imageIndex) => ({
            ...images[key],
            alt: dayCopy.imageAlts[imageIndex] ?? images[key].alt,
          })),
        };
      }),
    };
  });
}

export function getTripBySlug(locale: AppLocale, slug: string) {
  return getTrips(locale).find((trip) => trip.slug === slug);
}

export function getTripById(locale: AppLocale, id: TripId) {
  return getTrips(locale).find((trip) => trip.id === id);
}

export function primaryTrip(locale: AppLocale) {
  const trip = getTrips(locale)[0];
  if (!trip) {
    throw new Error(`No trips for ${locale}`);
  }
  return trip;
}

export function mapTripSlug(from: AppLocale, to: AppLocale, slug: string) {
  const trip = getTripBySlug(from, slug);
  if (!trip) {
    return null;
  }
  return getTripById(to, trip.id)?.slug ?? null;
}

export function getDepartures(locale: AppLocale): Departure[] {
  return departureFacts.map((row) => {
    const trip = getTripById(locale, row.tripId);
    if (!trip) {
      throw new Error(`Departure ${row.startDate}: missing trip ${row.tripId}`);
    }
    return { ...row, tripSlug: trip.slug };
  });
}

export function getSeo(locale: AppLocale) {
  return seoCopy[locale];
}

export function getFaq(locale: AppLocale): FaqGroup[] {
  return faqCopy[locale];
}

export function getAbout(locale: AppLocale) {
  return aboutCopy[locale];
}

export function getPrivate(locale: AppLocale) {
  return { ...privateFacts, ...privateLocale[locale] };
}

export function getContact(locale: AppLocale) {
  return contactCopy[locale];
}

export function getPages(locale: AppLocale) {
  return pagesCopy[locale];
}

export function getTeam(locale: AppLocale): TeamMember[] {
  return teamLocale[locale].map((member) => ({
    firstName: member.firstName,
    bio: member.bio,
    portrait: asset(locale, member.portraitKey),
  }));
}

export function getTestimonials(locale: AppLocale): Testimonial[] {
  return testimonialLocale[locale].map((item) => ({
    name: item.name,
    quote: item.quote,
    portrait: asset(locale, item.portraitKey),
  }));
}

export function getConceptMark(locale: AppLocale) {
  return conceptMark[locale];
}

export function getTerms(locale: AppLocale) {
  return termsCopy[locale];
}

export function getPrivacy(locale: AppLocale) {
  return privacyCopy[locale];
}

export function storySeo(locale: AppLocale, id: StoryId) {
  return getSeo(locale).stories[id];
}
