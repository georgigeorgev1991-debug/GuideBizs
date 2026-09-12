"use client";

const PATHS = [
  "M-20 420 C 180 360, 320 390, 520 300 C 720 210, 880 250, 1100 180 C 1280 120, 1480 150, 1700 90",
  "M-40 520 C 200 470, 380 510, 600 430 C 820 350, 980 390, 1200 310 C 1400 240, 1600 280, 1760 210",
  "M-10 610 C 160 560, 340 590, 540 520 C 760 440, 940 490, 1160 420 C 1360 360, 1540 400, 1740 330",
  "M 40 700 C 220 650, 400 680, 620 610 C 840 540, 1020 580, 1240 500 C 1440 440, 1580 470, 1720 430",
];

export function HeroContours({ play }: { play: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {PATHS.map((d, index) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          fill="none"
          stroke="var(--color-glacier)"
          strokeWidth="1.25"
          strokeOpacity="0.35"
          data-stroke-draw
          className={play ? "hero-contour" : undefined}
          style={{ animationDelay: play ? `${1.8 + index * 0.05}s` : "0s" }}
        />
      ))}
      <circle
        cx="1240"
        cy="500"
        r="4"
        fill="var(--color-blaze-ui)"
        data-hero-fade
        className={play ? "hero-contour-dot" : undefined}
        opacity={play ? 0 : 0.35}
      />
    </svg>
  );
}
