export type AppLocale = "nl" | "en";

export type Difficulty = "gemiddeld" | "pittig" | "zwaar";

export type Sleeps = "berghut" | "guesthouse";

export type DepartureStatus =
  | "planned"
  | "open"
  | "bijna-vol"
  | "vol"
  | "gegarandeerd";

export type TripId = "granite-crossing";

export type StoryId =
  | "hiking-in-bulgaria"
  | "versus-the-alps"
  | "is-bulgaria-safe"
  | "mountain-huts"
  | "amsterdam-to-the-mountains"
  | "multi-day-routes";

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

export interface Image extends ImageAsset {
  alt: string;
}

export interface TripDay {
  day: number;
  title: string;
  narrative: string;
  distanceKm: number;
  ascentM: number;
  descentM: number;
  walkingHours: string;
  sleeps: Sleeps;
  startM: number;
  elevation: number[];
  images: Image[];
}

export interface Trip {
  id: TripId;
  slug: string;
  name: string;
  region: string;
  days: number;
  nights: number;
  priceEUR: number;
  maxParticipants: number;
  minToGuarantee: number;
  difficulty: Difficulty;
  fitnessBenchmark: string;
  introduction: [string, string, string];
  sleepNarrative: string;
  foodNarrative: string;
  totalDistanceKm: number;
  totalAscentM: number;
  included: string[];
  notIncluded: string[];
  itinerary: TripDay[];
  gpxUrl: string;
  heroImage: Image;
  gallery: Image[];
}

export interface Departure {
  tripId: TripId;
  tripSlug: string;
  startDate: string;
  endDate: string;
  spotsTotal: number;
  spotsLeft: number;
  status: DepartureStatus;
}

export interface Testimonial {
  name: string;
  quote: string;
  portrait: Image;
}

export interface TeamMember {
  firstName: string;
  bio: string;
  portrait: Image;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export interface StoryMeta {
  id: StoryId;
  slug: string;
  titel: string;
  description: string;
  publishedAt: string;
}
