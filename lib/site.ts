import { phones } from "@/content/phones";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const site = {
  brand: "Mura Trails",
  range: "Rila",
  /** Consumer phone (NL). Empty in dev — production fails via check:legal. */
  phone: phones.nl,
  /** Corporate phone (BG). Empty in dev — production fails via check:legal. */
  bgPhone: phones.bg,
  email: "hello@muratrails.com",
  /** Public pages: city + country only. Never a road or house number. */
  contactLocation: "Sofia, Bulgaria",
  siteUrl,
  /** Optional Belgian host for hreflang nl-BE; falls back to primary origin. */
  beSiteUrl: process.env.NEXT_PUBLIC_BE_SITE_URL || siteUrl,
} as const;
