"use client";

import { LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";

import {
  concatenatedElevation,
  elevationPath,
  tripElevationDomain,
} from "@/lib/elevation";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Trip } from "@/lib/types";

const WIDTH = 48;
const HEIGHT = 560;

function yAt(value: number, domain: [number, number], height: number) {
  const [min, max] = domain;
  const range = max - min || 1;
  return height - ((value - min) / range) * height;
}

export default function ElevationRail({ trip }: { trip: Trip }) {
  const reduced = usePrefersReducedMotion();
  const domain = tripElevationDomain(trip);
  const samples = concatenatedElevation(trip);
  const d = elevationPath(samples, domain, WIDTH, HEIGHT);
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const waymarkY = useTransform(scrollYProgress, (progress) => {
    if (samples.length === 0) {
      return HEIGHT;
    }
    const index = Math.min(
      samples.length - 1,
      Math.max(0, Math.round(progress * (samples.length - 1))),
    );
    return yAt(samples[index], domain, HEIGHT);
  });

  return (
    <LazyMotion features={domAnimation} strict>
    <div
      className="pointer-events-none fixed top-[15vh] right-3 z-20 hidden h-[70vh] w-12 min-[1024px]:block"
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-full w-full"
        fill="none"
      >
        <m.path
          d={d}
          stroke="var(--color-glacier)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          data-stroke-draw
          style={reduced ? { pathLength: 1 } : { pathLength }}
        />
        <m.circle
          cx="0"
          r="3.5"
          fill="var(--color-blaze-ui)"
          cy={
            reduced
              ? samples.length
                ? yAt(samples[0], domain, HEIGHT)
                : HEIGHT
              : waymarkY
          }
        />
      </svg>
    </div>
    </LazyMotion>
  );
}
