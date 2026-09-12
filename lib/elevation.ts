import type { Trip } from "@/lib/types";

export const ELEVATION_SAMPLES_PER_DAY = 120;

export function cumulativeAscent(samples: number[]): number {
  let gain = 0;

  for (let index = 1; index < samples.length; index += 1) {
    const delta = samples[index] - samples[index - 1];
    if (delta > 0) {
      gain += delta;
    }
  }

  return gain;
}

export function tripElevationDomain(trip: Trip): [number, number] {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const day of trip.itinerary) {
    for (const sample of day.elevation) {
      min = Math.min(min, sample);
      max = Math.max(max, sample);
    }
  }

  const pad = ((max - min) || 1) * 0.05;
  return [min - pad, max + pad];
}

export function concatenatedElevation(trip: Trip): number[] {
  return trip.itinerary.flatMap((day) => day.elevation);
}

export function elevationPath(
  samples: number[],
  domain: [number, number],
  width = 320,
  height = 80,
): string {
  if (samples.length === 0) {
    return "";
  }

  const [min, max] = domain;
  const range = max - min || 1;
  const last = samples.length - 1;
  const step = last === 0 ? 0 : width / last;

  return samples
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      const command = index === 0 ? "M" : "L";
      return `${command}${round(x)} ${round(y)}`;
    })
    .join(" ");
}

/**
 * Synthetic elevation series for layout and stroke-draw timing.
 * Replace with GPX-derived samples; TripDay.elevation stays number[].
 */
export function elevationSeries(options: {
  startM: number;
  ascentM: number;
  descentM: number;
}): number[] {
  const points = ELEVATION_SAMPLES_PER_DAY;
  const peakAt = Math.max(1, Math.floor((points - 1) * 0.42));
  const start = options.startM;
  const peak = start + options.ascentM;
  const end = peak - options.descentM;
  const samples: number[] = new Array(points);

  samples[0] = start;
  samples[peakAt] = peak;
  samples[points - 1] = end;

  for (let index = 1; index < peakAt; index += 1) {
    samples[index] = Math.round(start + (index / peakAt) * options.ascentM);
    if (samples[index] < samples[index - 1]) {
      samples[index] = samples[index - 1];
    }
  }

  for (let index = peakAt + 1; index < points - 1; index += 1) {
    const t = (index - peakAt) / (points - 1 - peakAt);
    samples[index] = Math.round(peak - t * options.descentM);
    if (samples[index] > samples[index - 1]) {
      samples[index] = samples[index - 1];
    }
  }

  return samples;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}
