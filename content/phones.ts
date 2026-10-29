/**
 * Phone numbers live in content, not env.
 * Leave empty in development. Production build fails while empty (check:legal).
 */
export const phones = {
  /** Dutch virtual number — consumer / Dutch pages. */
  nl: "",
  /** Bulgarian mobile — corporate / English pages. */
  bg: "",
} as const;
