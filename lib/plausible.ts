export const plausibleEvents = {
  tripEnquiry: "trip_enquiry",
  privateEnquiry: "private_enquiry",
  corporateProposal: "corporate_proposal",
  emailCaptured: "email_captured",
  emailGpx: "email_gpx",
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
