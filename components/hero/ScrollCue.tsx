"use client";

export function ScrollCue({ visible }: { visible: boolean }) {
  if (!visible) {
    return null;
  }

  return (
    <div
      data-scroll-cue
      className="pointer-events-none absolute bottom-6 left-6 z-10 h-8 w-px bg-glacier/80 md:left-12 lg:left-16"
      aria-hidden
    />
  );
}
