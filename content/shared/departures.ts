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

/** All departures are planned 2027 dates while consumerBookingMode is waitlist. */
export const departureFacts: SharedDeparture[] = [
  {
    tripId: TRIP_ID,
    startDate: "2027-06-12",
    endDate: "2027-06-15",
    spotsTotal: 8,
    spotsLeft: 8,
    status: "planned",
  },
  {
    tripId: TRIP_ID,
    startDate: "2027-07-03",
    endDate: "2027-07-06",
    spotsTotal: 8,
    spotsLeft: 8,
    status: "planned",
  },
  {
    tripId: TRIP_ID,
    startDate: "2027-08-14",
    endDate: "2027-08-17",
    spotsTotal: 8,
    spotsLeft: 8,
    status: "planned",
  },
];
