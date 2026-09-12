"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import "lenis/dist/lenis.css";

function setMotionFlag(reduce: boolean) {
  document.documentElement.dataset.motion = reduce ? "reduce" : "full";
}

function shouldSkipLenis(pathname: string) {
  const params = new URLSearchParams(window.location.search);
  const diag = params.get("diag");
  if (diag === "nolenis" || diag === "both") {
    return true;
  }
  return /^\/reizen\/.+/.test(pathname);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let idleId = 0;

    const tick = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
        idleId = 0;
      }
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      lenis?.destroy();
      lenis = undefined;
    };

    const start = async () => {
      if (lenis || shouldSkipLenis(pathname)) {
        return;
      }

      const { default: Lenis } = await import("lenis");
      if (shouldSkipLenis(pathname) || mediaQuery.matches) {
        return;
      }

      lenis = new Lenis({
        autoRaf: false,
        respectReducedMotion: false,
      });
      frame = requestAnimationFrame(tick);
    };

    const apply = () => {
      setMotionFlag(mediaQuery.matches);
      if (mediaQuery.matches || shouldSkipLenis(pathname)) {
        stop();
        return;
      }
      void start();
    };

    const deferApply = () => {
      setMotionFlag(mediaQuery.matches);
      if (mediaQuery.matches || shouldSkipLenis(pathname)) {
        return;
      }
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(apply, { timeout: 2500 });
        return;
      }
      idleId = 0;
      setTimeout(apply, 1);
    };

    deferApply();
    mediaQuery.addEventListener("change", apply);

    return () => {
      mediaQuery.removeEventListener("change", apply);
      stop();
    };
  }, [pathname]);

  return <>{children}</>;
}
