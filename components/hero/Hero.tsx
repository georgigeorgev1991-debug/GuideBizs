"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { HeroContours } from "@/components/hero/HeroContours";
import { ScrollCue } from "@/components/hero/ScrollCue";
import {
  heroSequenceHasPlayed,
  markHeroSequencePlayed,
} from "@/components/hero/heroSequence";
import { Button } from "@/components/ui/Button";
import type { AppHref } from "@/lib/href";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { Image as SiteImage } from "@/lib/types";

type HeroProps = {
  image: SiteImage;
  tripHref: AppHref;
  privateHref: AppHref;
  headline: readonly string[];
  subline: string;
  meta: readonly string[];
  ctaTrip: string;
  ctaPrivate: string;
};

export function Hero({
  image,
  tripHref,
  privateHref,
  headline,
  subline,
  meta,
  ctaTrip,
  ctaPrivate,
}: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const [alreadyPlayed] = useState(() => heroSequenceHasPlayed());
  const [skipMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const diag = new URLSearchParams(window.location.search).get("diag");
    return diag === "nomotion" || diag === "both";
  });
  const play = !reduced && !alreadyPlayed && !skipMotion;
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const contourRef = useRef<HTMLDivElement>(null);
  const [cueVisible, setCueVisible] = useState(true);

  useEffect(() => {
    if (play) {
      markHeroSequencePlayed();
    }
  }, [play]);

  useEffect(() => {
    const hide = () => setCueVisible(false);
    window.addEventListener("scroll", hide, { passive: true, once: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced || skipMotion) {
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const max = Math.max(1, rect.height);
      const progress = Math.min(1, Math.max(0, -rect.top / max));
      const photo = photoRef.current;
      const overlay = overlayRef.current;
      const copy = copyRef.current;
      const contour = contourRef.current;
      if (photo) {
        photo.style.transform = `translate3d(0, ${progress * 35}%, 0)`;
      }
      if (overlay) {
        overlay.style.opacity = String(progress * 0.55);
      }
      if (copy) {
        copy.style.transform = `translate3d(0, ${progress * 15}%, 0)`;
        copy.style.opacity = String(1 - Math.min(1, progress / 0.6));
      }
      if (contour) {
        contour.style.transform = `scale(${1 + progress * 0.08})`;
        contour.style.opacity = String(1 - progress);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced, skipMotion]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[100svh] overflow-hidden text-snowfield ${play ? "hero-play" : "hero-done"}`}
    >
      <div ref={photoRef} className="absolute inset-0 will-change-transform">
        <div data-kenburns className="absolute inset-0 origin-center">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] bg-granite"
        style={{ opacity: reduced ? 0.55 : 0 }}
      />
      <div ref={contourRef} className="absolute inset-0 z-[2]">
        <HeroContours play={play} />
      </div>
      <div
        ref={copyRef}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24 lg:px-16"
      >
        <h1 className="font-display-hero text-center text-4xl md:text-5xl">
          {headline.map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
              <span
                data-hero-word
                className="inline-block"
                style={{ animationDelay: play ? `${0.4 + index * 0.06}s` : "0s" }}
              >
                {word}
                {index < headline.length - 1 ? "\u00a0" : null}
              </span>
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-base">{subline}</p>
        <p className="mt-4 text-sm text-glacier lg:whitespace-nowrap">
          {meta.map((part, index) => (
            <span key={part} className="max-lg:block">
              {index > 0 ? (
                <span className="mx-2 max-lg:hidden" aria-hidden>
                  ·
                </span>
              ) : null}
              {part}
            </span>
          ))}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div data-hero-cta>
            <Button href={tripHref} prefetch={false}>
              {ctaTrip}
            </Button>
          </div>
          <Button href={privateHref} variant="secondary" prefetch={false}>
            {ctaPrivate}
          </Button>
        </div>
      </div>
      <ScrollCue visible={cueVisible} />
    </section>
  );
}
