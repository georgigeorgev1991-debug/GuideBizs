import type { FaqGroup, StoryMeta, Trip } from "@/lib/types";
import type { AppLocale } from "@/i18n/routing";
import { jsonLdLanguage, publicPath } from "@/lib/seo";
import { site } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: site.siteUrl,
    email: site.email,
    telephone: site.phone,
    logo: `${site.siteUrl.replace(/\/$/, "")}/icon`,
    image: `${site.siteUrl.replace(/\/$/, "")}/icon`,
    ...(site.address !== "PENDING"
      ? {
          address: {
            "@type": "PostalAddress",
            addressCountry: "BG",
            streetAddress: site.address,
          },
        }
      : {
          address: {
            "@type": "PostalAddress",
            addressCountry: "BG",
          },
        }),
  };
}

export function faqPageJsonLd(locale: AppLocale, groups: FaqGroup[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: jsonLdLanguage(locale),
    mainEntity: groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };
}

export function articleJsonLd(locale: AppLocale, story: StoryMeta) {
  const path = publicPath(locale, {
    pathname: "/verhalen/[slug]",
    params: { slug: story.slug },
  });
  const url = `${site.siteUrl.replace(/\/$/, "")}${path === "/" ? "" : path}`;
  const image = `${url}/opengraph-image`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.titel,
    description: story.description,
    image: [image],
    datePublished: story.publishedAt,
    dateModified: story.publishedAt,
    inLanguage: jsonLdLanguage(locale),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: site.brand,
      url: site.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: site.brand,
      logo: {
        "@type": "ImageObject",
        url: `${site.siteUrl.replace(/\/$/, "")}/icon`,
      },
    },
  };
}

export function touristTripJsonLd(locale: AppLocale, trip: Trip, audienceType: string, dayLabel: (n: number) => string) {
  const path = publicPath(locale, {
    pathname: "/reizen/[slug]",
    params: { slug: trip.slug },
  });
  const url = `${site.siteUrl.replace(/\/$/, "")}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.introduction[0],
    url,
    image: `${site.siteUrl.replace(/\/$/, "")}${trip.heroImage.src}`,
    inLanguage: jsonLdLanguage(locale),
    touristType: {
      "@type": "Audience",
      audienceType,
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: trip.itinerary.length,
      itemListElement: trip.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        item: {
          "@type": "TouristAttraction",
          name: `${dayLabel(day.day)}: ${day.title}`,
          description: day.narrative,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      price: trip.priceEUR,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url,
      eligibleRegion: ["NL", "BE"],
    },
    provider: {
      "@type": "Organization",
      name: site.brand,
      url: site.siteUrl,
    },
  };
}
