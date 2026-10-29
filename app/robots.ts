import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/specimen", "/nl/specimen"] },
    ],
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
