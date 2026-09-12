"use client";

import dynamic from "next/dynamic";

import type { Trip } from "@/lib/types";

const ElevationRail = dynamic(() => import("@/components/trip/ElevationRail"), {
  ssr: false,
});
const Ridge = dynamic(() => import("@/components/home/Ridge"), { ssr: false });

export function HomeRail({ trip }: { trip: Trip }) {
  return <ElevationRail trip={trip} />;
}

export function HomeRidge({
  alts,
  heading,
}: {
  alts: { ridgeFar: string; ridgeMid: string; ridgeFore: string };
  heading: string;
}) {
  return <Ridge alts={alts} heading={heading} />;
}
