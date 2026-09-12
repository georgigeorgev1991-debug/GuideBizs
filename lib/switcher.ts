import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { otherLocale } from "@/lib/content";
import { alternateHref, type AppHref } from "@/lib/href";

export async function languageSwitcher(locale: AppLocale, href: AppHref) {
  const t = await getTranslations("language");
  const other = otherLocale(locale);
  return {
    alternateHref: alternateHref(locale, href),
    alternateLang: other,
    alternateLabel: other === "en" ? t("toEn") : t("toNl"),
  };
}
