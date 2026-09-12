import { useTranslations } from "next-intl";

export function Honeypot() {
  const t = useTranslations("forms");
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
      <label htmlFor="bedrijf">{t("honeypot")}</label>
      <input id="bedrijf" name="bedrijf" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
