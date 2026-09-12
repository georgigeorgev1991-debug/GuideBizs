const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

export const site = {
  brand: "Bergpad",
  range: "Rila",
  phone: "+31 00 000 0000", // TODO
  registrationNumber: process.env.NEXT_PUBLIC_REGISTRATION_NUMBER?.trim() || "PENDING",
  email: "hallo@bergpad.nl",
  address: process.env.NEXT_PUBLIC_SITE_ADDRESS?.trim() || "PENDING",
  siteUrl,
  beSiteUrl: process.env.NEXT_PUBLIC_BE_SITE_URL || siteUrl,
} as const;
