"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { elevationPath, tripElevationDomain } from "@/lib/elevation";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Sleeps, Trip } from "@/lib/types";

const WIDTH = 240;
const HEIGHT = 96;

export type ItineraryLabels = {
  dayPrefix: string;
  distance: string;
  ascent: string;
  descent: string;
  walking: string;
  sleep: string;
  sleeps: Record<Sleeps, string>;
};

export function daySpanPx(
  samples: number[],
  domain: [number, number],
  height: number,
) {
  if (samples.length === 0) {
    return 0;
  }
  const [min, max] = domain;
  const range = max - min || 1;
  const localMin = Math.min(...samples);
  const localMax = Math.max(...samples);
  const yMax = height - ((localMax - min) / range) * height;
  const yMin = height - ((localMin - min) / range) * height;
  return Math.abs(yMin - yMax);
}

function DayProfile({
  d,
  spanPx,
  reduced,
  draw,
}: {
  d: string;
  spanPx: number;
  reduced: boolean;
  draw: boolean;
}) {
  const offset = reduced || draw ? 0 : 1;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="mt-4 h-24 w-full max-w-xs"
      fill="none"
      aria-hidden
      data-day-span={spanPx.toFixed(1)}
    >
      <path
        d={d}
        pathLength={1}
        stroke="var(--color-glacier)"
        strokeWidth="1.5"
        data-stroke-draw
        style={{
          strokeDasharray: 1,
          strokeDashoffset: offset,
          transition: reduced ? "none" : "stroke-dashoffset 1000ms ease-out",
        }}
      />
    </svg>
  );
}

export function ItinerarySticky({
  trip,
  labels,
}: {
  trip: Trip;
  labels: ItineraryLabels;
}) {
  const reduced = usePrefersReducedMotion();
  const domain = tripElevationDomain(trip);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) {
      return;
    }

    const nodes = [...document.querySelectorAll<HTMLElement>("[data-trip-day]")];
    if (nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) {
          return;
        }
        const day = Number(visible.target.getAttribute("data-trip-day"));
        if (!Number.isNaN(day)) {
          setActive(day - 1);
        }
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: [0.25, 0.5, 0.75] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reduced, trip.slug]);

  return (
    <div className="min-[1024px]:grid min-[1024px]:grid-cols-[minmax(14rem,0.9fr)_minmax(0,1.4fr)] min-[1024px]:gap-16">
      <div className="hidden min-[1024px]:block">
        <div className="min-[1024px]:sticky min-[1024px]:top-24">
          {trip.itinerary.map((day, index) => {
            const d = elevationPath(day.elevation, domain, WIDTH, HEIGHT);
            const span = daySpanPx(day.elevation, domain, HEIGHT);
            const isActive = index === active;
            const past = index < active;
            if (!reduced && !isActive && !past) {
              return null;
            }
            if (!reduced && past && index !== active - 1) {
              return null;
            }
            const opacity = reduced ? 1 : isActive ? 1 : 0.25;

            return (
              <div
                key={day.day}
                className={reduced ? "mb-10 last:mb-0" : "mb-6 last:mb-0"}
                aria-hidden
              >
                <p className="font-mono text-sm tabular-nums text-glacier">
                  {labels.dayPrefix} {day.day}
                </p>
                <p className="font-display mt-2 text-xl">{day.title}</p>
                <div data-day-stack style={{ opacity }}>
                  <DayProfile
                    d={d}
                    spanPx={span}
                    reduced={reduced}
                    draw={isActive || past || reduced}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ol className="space-y-20">
        {trip.itinerary.map((day) => {
          const d = elevationPath(day.elevation, domain, WIDTH, HEIGHT);
          const span = daySpanPx(day.elevation, domain, HEIGHT);
          return (
            <li
              key={day.day}
              id={`day-${day.day}`}
              data-trip-day={day.day}
              className="scroll-mt-24"
            >
              <div className="min-[1024px]:hidden">
                <p className="font-mono text-sm tabular-nums text-glacier">
                  {labels.dayPrefix} {day.day}
                </p>
                <DayProfile d={d} spanPx={span} reduced={reduced} draw />
              </div>
              <h3 className="font-display text-xl">{day.title}</h3>
              <p className="mt-6 max-w-[var(--measure)] text-base">
                {day.narrative}
              </p>
              <dl className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-glacier">{labels.distance}</dt>
                  <dd className="font-mono tabular-nums">{day.distanceKm} km</dd>
                </div>
                <div>
                  <dt className="text-glacier">{labels.ascent}</dt>
                  <dd className="font-mono tabular-nums">{day.ascentM} hm</dd>
                </div>
                <div>
                  <dt className="text-glacier">{labels.descent}</dt>
                  <dd className="font-mono tabular-nums">{day.descentM} hm</dd>
                </div>
                <div>
                  <dt className="text-glacier">{labels.walking}</dt>
                  <dd className="font-mono tabular-nums">{day.walkingHours}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-glacier">{labels.sleep}</dt>
                  <dd>{labels.sleeps[day.sleeps]}</dd>
                </div>
              </dl>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {day.images.map((image) => (
                  <div key={image.src} className="relative aspect-[3/2]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={75}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function dayProfileSpanPx(trip: Trip, dayIndex: number) {
  const domain = tripElevationDomain(trip);
  const day = trip.itinerary[dayIndex];
  return day ? daySpanPx(day.elevation, domain, HEIGHT) : 0;
}
