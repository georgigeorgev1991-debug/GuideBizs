"use client";

import { useEffect, useState } from "react";

function readReduce() {
  if (typeof document === "undefined") {
    return false;
  }
  return document.documentElement.dataset.motion === "reduce";
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(readReduce);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      document.documentElement.dataset.motion = mediaQuery.matches
        ? "reduce"
        : "full";
      setReduced(mediaQuery.matches);
    };
    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
  }, []);

  return reduced;
}
