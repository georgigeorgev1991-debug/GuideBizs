"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { imageAssets } from "@/content/shared/images";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const LAYER_META = [
  {
    speed: 0.2,
    key: "ridgeFar" as const,
    z: "z-0",
    inset: "inset-0",
    object: "object-cover object-top",
  },
  {
    speed: 0.5,
    key: "ridgeMid" as const,
    z: "z-10",
    inset: "inset-x-[4%] top-[12%] bottom-[22%]",
    object: "object-cover object-bottom",
  },
  {
    speed: 0.8,
    key: "ridgeFore" as const,
    z: "z-20",
    inset: "inset-x-0 top-[48%] bottom-0",
    object: "object-cover object-bottom",
  },
] as const;

export default function Ridge({
  alts,
  heading,
}: {
  alts: { ridgeFar: string; ridgeMid: string; ridgeFore: string };
  heading: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ySlow = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const yMid = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yFast = useTransform(scrollYProgress, [0, 1], [96, -96]);
  const ys = [ySlow, yMid, yFast];

  return (
    <LazyMotion features={domAnimation} strict>
    <section
      ref={ref}
      id="graat"
      className="relative h-[70vh] min-h-[28rem] overflow-hidden bg-granite"
    >
      <h2 className="sr-only">{heading}</h2>
      {LAYER_META.map((layer, index) => (
        <m.div
          key={layer.speed}
          data-parallax
          className={`absolute ${layer.inset} ${layer.z}`}
          style={reduced ? undefined : { y: ys[index] }}
        >
          <Image
            src={imageAssets[layer.key].src}
            alt={alts[layer.key]}
            fill
            quality={75}
            sizes="100vw"
            className={layer.object}
          />
        </m.div>
      ))}
    </section>
    </LazyMotion>
  );
}
