import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { requireProductionEnv } from "./lib/env";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

if (process.env.NODE_ENV === "production") {
  requireProductionEnv();
}

const nextConfig: NextConfig = {
  output: "standalone",
  htmlLimitedBots:
    /Googlebot|bingbot|Twitterbot|facebookexternalhit|LinkedInBot|WhatsApp|Slackbot|Discordbot|TelegramBot|Applebot|AdsBot-Google|Mediapartners-Google|Google-PageRenderer/i,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async rewrites() {
    return [
      {
        source: "/js/statistiek.js",
        destination:
          "https://plausible.io/js/script.file-downloads.outbound-links.js",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
