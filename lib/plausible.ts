export const plausibleEvents = {
  enquiry: "enquiry submitted",
  email: "email captured",
  gpx: "GPX requested",
  private: "private-trips enquiry",
} as const;

declare global {
  interface Window {
    plausible?: ((
      event: string,
      options?: { props?: Record<string, string> },
    ) => void) & { q?: unknown[] };
  }
}

export function trackPlausible(event: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.plausible?.(event);
}
