export function LanguageSwitcher({
  href,
  hrefLang,
  label,
}: {
  href: string | null;
  hrefLang: "en" | "nl";
  label: string;
}) {
  if (!href) {
    return null;
  }
  return (
    <a
      href={href}
      hrefLang={hrefLang}
      lang={hrefLang}
      className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-4"
    >
      {label}
    </a>
  );
}
