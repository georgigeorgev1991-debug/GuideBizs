"use client";

import { m } from "motion/react";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function RevealText({
  text,
  play,
  className = "",
}: {
  text: string;
  play: boolean;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");
  const instant = reduced || !play;

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <m.span
            data-hero-word
            className="inline-block"
            initial={instant ? { y: 0 } : { y: "100%" }}
            animate={{ y: 0 }}
            transition={
              instant
                ? { duration: 0 }
                : { delay: 0.4 + index * 0.06, duration: 0.9, ease: EASE }
            }
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : null}
          </m.span>
        </span>
      ))}
    </span>
  );
}
