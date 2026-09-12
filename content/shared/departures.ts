import { TRIP_ID } from "@/content/shared/trips";
import type { DepartureStatus, TripId } from "@/lib/types";

export type SharedDeparture = {
  tripId: TripId;
  startDate: string;
  endDate: string;
  spotsTotal: number;
  spotsLeft: number;
  status: DepartureStatus;
};

export const departureFacts: SharedDeparture[] = [
  {
    tripId: TRIP_ID,
    startDate: "2027-06-12",
    endDate: "2027-06-15",
    spotsTotal: 8,
    spotsLeft: 4,
    status: "gegarandeerd",
  },
  {
    tripId: TRIP_ID,
    startDate: "2027-07-03",
    endDate: "2027-07-06",
    spotsTotal: 8,
    spotsLeft: 7,
    status: "open",
  },
  {
    tripId: TRIP_ID,
    startDate: "2027-08-14",
    endDate: "2027-08-17",
    spotsTotal: 8,
    spotsLeft: 2,
    status: "bijna-vol",
  },
];
