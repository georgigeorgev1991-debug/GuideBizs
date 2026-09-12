import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { tripHref, type AppHref } from "@/lib/href";
import { site } from "@/lib/site";

export async function SiteHeader({
  tripSlug,
  tone = "granite",
  alternateHref,
  alternateLang,
  alternateLabel,
}: {
  tripSlug: string;
  tone?: "granite" | "snowfield";
  alternateHref: string | null;
  alternateLang: "en" | "nl";
  alternateLabel: string;
}) {
  const t = await getTranslations("nav");
  const onSnow = tone === "snowfield";
  const trip: AppHref = tripHref(tripSlug);
  return (
    <header
      className={`absolute top-0 right-0 left-0 z-30 flex flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12 lg:px-16 ${
        onSnow ? "bg-snowfield text-ink" : ""
      }`}
    >
      <Link href="/" className="font-display text-sm">
        {site.brand}
      </Link>
      <nav aria-label={t("main")}>
        <ul className="flex flex-wrap items-center gap-6 text-sm">
          <li>
            <Link href={trip}>{t("trip")}</Link>
          </li>
          <li>
            <Link href="/prive-reizen" prefetch={false}>
              {t("private")}
            </Link>
          </li>
          <li>
            <Link href="/over-ons" prefetch={false}>
              {t("about")}
            </Link>
          </li>
          <li>
            <Link href="/praktisch" prefetch={false}>
              {t("practical")}
            </Link>
          </li>
          <li>
            <Link href="/verhalen" prefetch={false}>
              {t("stories")}
            </Link>
          </li>
          <li>
            <Link href="/contact" prefetch={false}>
              {t("contact")}
            </Link>
          </li>
          <li>
            <LanguageSwitcher
              href={alternateHref}
              hrefLang={alternateLang}
              label={alternateLabel}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
