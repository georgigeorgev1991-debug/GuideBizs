"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function RevealImage({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  return (
    <m.div
      data-editorial
      initial={reduced ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={reduced ? undefined : { clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </m.div>
  );
}
