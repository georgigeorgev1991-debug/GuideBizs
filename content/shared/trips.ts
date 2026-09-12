import type { Difficulty, Sleeps, TripId } from "@/lib/types";
import type { ImageKey } from "@/content/shared/images";

export const TRIP_ID = "granite-crossing" satisfies TripId;

export type SharedDay = {
  day: number;
  distanceKm: number;
  ascentM: number;
  descentM: number;
  sleeps: Sleeps;
  startM: number;
  imageKeys: ImageKey[];
};

export type SharedTrip = {
  id: TripId;
  days: number;
  nights: number;
  priceEUR: number;
  maxParticipants: number;
  minToGuarantee: number;
  difficulty: Difficulty;
  totalDistanceKm: number;
  totalAscentM: number;
  gpxUrl: string;
  heroImageKey: ImageKey;
  galleryKeys: ImageKey[];
  itinerary: SharedDay[];
};

export const tripFacts: SharedTrip[] = [
  {
    id: TRIP_ID,
    days: 4,
    nights: 3,
    priceEUR: 895,
    maxParticipants: 8,
    minToGuarantee: 4,
    difficulty: "pittig",
    totalDistanceKm: 58,
    totalAscentM: 3100,
    gpxUrl: "/gpx/vier-dagen-overtocht.gpx",
    heroImageKey: "hero",
    galleryKeys: ["graat", "meer", "dal", "hutslaapzaal"],
    itinerary: [
      {
        day: 1,
        distanceKm: 14,
        ascentM: 800,
        descentM: 50,
        sleeps: "berghut",
        startM: 1550,
        imageKeys: ["graat", "hutslaapzaal"],
      },
      {
        day: 2,
        distanceKm: 16,
        ascentM: 800,
        descentM: 870,
        sleeps: "berghut",
        startM: 2300,
        imageKeys: ["meer", "graat"],
      },
      {
        day: 3,
        distanceKm: 15,
        ascentM: 750,
        descentM: 1150,
        sleeps: "guesthouse",
        startM: 2230,
        imageKeys: ["dal", "meer"],
      },
      {
        day: 4,
        distanceKm: 13,
        ascentM: 750,
        descentM: 1030,
        sleeps: "guesthouse",
        startM: 1830,
        imageKeys: ["graat"],
      },
    ],
  },
];
