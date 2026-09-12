import type { AppLocale } from "@/i18n/routing";

function localeTag(locale: AppLocale) {
  return locale === "nl" ? "nl-NL" : "en-GB";
}

export function formatDeparture(locale: AppLocale, start: string, end: string) {
  const from = new Date(`${start}T12:00:00`);
  const to = new Date(`${end}T12:00:00`);
  const tag = localeTag(locale);
  const month = new Intl.DateTimeFormat(tag, { month: "long" });
  const day = new Intl.DateTimeFormat(tag, { day: "numeric" });

  if (from.getMonth() === to.getMonth()) {
    return `${day.format(from)}–${day.format(to)} ${month.format(from)}`;
  }

  return `${day.format(from)} ${month.format(from)} – ${day.format(to)} ${month.format(to)}`;
}

export function formatDay(locale: AppLocale, iso: string) {
  return new Intl.DateTimeFormat(localeTag(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

export function formatNumber(locale: AppLocale, value: number) {
  return value.toLocaleString(localeTag(locale));
}
