import { Archivo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import { Plausible } from "@/components/analytics/Plausible";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { organizationJsonLd } from "@/lib/jsonld";
import { resolveLocale } from "@/lib/locale";
import { htmlLang } from "@/lib/seo";
import { site } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
  preload: true,
  adjustFontFallback: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await resolveLocale(params);
  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: site.brand,
      template: `%s — ${site.brand}`,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <html
      lang={htmlLang(locale)}
      className={`${archivo.variable} ${archivo.className}`}
      data-motion="full"
      suppressHydrationWarning
    >
      <body className="bg-granite text-snowfield antialiased">
        <JsonLd data={organizationJsonLd()} />
        <Script id="motion-pref" strategy="beforeInteractive">
          {`try{document.documentElement.dataset.motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'full'}catch(e){}`}
        </Script>
        <a
          href="#inhoud"
          className="bg-blaze text-snowfield sr-only z-50 px-4 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider
          locale={locale}
          messages={{
            forms: messages.forms,
            difficulty: messages.difficulty,
          }}
        >
          <SmoothScroll>
            <main id="inhoud">{children}</main>
          </SmoothScroll>
        </NextIntlClientProvider>
        <Plausible />
      </body>
    </html>
  );
}
