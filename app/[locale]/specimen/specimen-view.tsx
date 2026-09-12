"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { site } from "@/lib/site";

const TYPE_STEPS = [
  { name: "xs", step: "13", className: "text-xs" },
  { name: "sm", step: "16", className: "text-sm" },
  { name: "base", step: "20", className: "text-base" },
  { name: "lg", step: "25", className: "text-lg" },
  { name: "xl", step: "31", className: "text-xl" },
  { name: "2xl", step: "39", className: "text-2xl" },
  { name: "3xl", step: "49", className: "text-3xl" },
  { name: "4xl", step: "61", className: "text-4xl" },
  { name: "5xl", step: "76", className: "text-5xl" },
] as const;

const COLOURS = [
  {
    token: "granite",
    hex: "#1B2320",
    className: "bg-granite",
    pairing: "granite op snowfield",
    ratio: "13.84:1",
    note: "Tekst op lichte vlakken",
  },
  {
    token: "pine",
    hex: "#2C4034",
    className: "bg-pine",
    pairing: "snowfield op pine",
    ratio: "9.58:1",
    note: "Secundair vlak",
  },
  {
    token: "glacier",
    hex: "#9FBDB6",
    className: "bg-glacier",
    pairing: "glacier op granite",
    ratio: "7.97:1",
    note: "Contouren, data, hairlines",
  },
  {
    token: "snowfield",
    hex: "#ECEFEA",
    className: "bg-snowfield",
    pairing: "snowfield op granite",
    ratio: "13.84:1",
    note: "Bodytekst op donkere basis",
  },
  {
    token: "blaze",
    hex: "#B8402F",
    className: "bg-blaze",
    pairing: "snowfield op blaze",
    ratio: "4.75:1",
    note: "Tekst-CTA. blaze als tekst op granite: 2.92:1 — niet gebruiken",
  },
  {
    token: "blaze-ui",
    hex: "#C96E61",
    className: "bg-blaze-ui",
    pairing: "blaze-ui op granite / pine",
    ratio: "4.50:1 / 3.11:1",
    note: "Waymark en contourstrepen. Niet voor bodytekst",
  },
  {
    token: "ink",
    hex: "#0E1412",
    className: "bg-ink",
    pairing: "ink op snowfield",
    ratio: "16.05:1",
    note: "Tekst op lichte leesvlakken",
  },
] as const;

function ComputedSize({ className }: { className: string }) {
  const probe = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<string>("…");

  useLayoutEffect(() => {
    const node = probe.current;
    if (!node) {
      return;
    }

    const measure = () => {
      const value = Number.parseFloat(getComputedStyle(node).fontSize);
      setSize(`${value.toFixed(2)}px`);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [className]);

  return (
    <span className="relative inline-block">
      <span
        ref={probe}
        className={`${className} invisible absolute whitespace-nowrap`}
        aria-hidden
      >
        Hg
      </span>
      <span>{size}</span>
    </span>
  );
}

function LenisRemountProbe() {
  const mountId = useRef<string | null>(null);
  const [id, setId] = useState("wacht");
  const [clicks, setClicks] = useState(0);

  useLayoutEffect(() => {
    if (!mountId.current) {
      mountId.current =
        typeof crypto !== "undefined" ? crypto.randomUUID() : "probe";
    }
    setId(mountId.current);
  }, []);

  return (
    <div className="max-w-[var(--measure)]">
      <p className="font-mono text-sm tabular-nums">
        boom-id: {id}
      </p>
      <button
        type="button"
        className="mt-4 inline-flex min-h-11 items-center bg-blaze px-5 text-sm font-semibold text-snowfield"
        onClick={() => setClicks((value) => value + 1)}
      >
        Teller {clicks}
      </button>
      <p className="mt-4 text-sm text-glacier">
        Zet gereduceerde beweging aan en uit zonder te herladen. Als id en
        teller blijven staan, is de boom niet hermount.
      </p>
    </div>
  );
}

export function SpecimenView() {
  return (
    <div className="px-6 py-12 md:px-12 lg:px-16">
      <header className="max-w-[var(--measure)]">
        <p className="text-sm text-glacier">
          {site.brand} · specimen · foundation
        </p>
        <h1 className="font-display-hero mt-4 text-4xl">
          Type specimen
        </h1>
        <p className="mt-4 text-base">
          Tokens, schaal en contrast — geen paginalayout, geen motion.
        </p>
        <nav className="mt-8 flex flex-wrap gap-4" aria-label="Specimen">
          <a
            href="#schaal"
            className="inline-flex min-h-11 items-center text-glacier underline decoration-glacier/40 underline-offset-4"
          >
            Schaal
          </a>
          <a
            href="#display"
            className="inline-flex min-h-11 items-center text-glacier underline decoration-glacier/40 underline-offset-4"
          >
            Display
          </a>
          <a
            href="#kleur"
            className="inline-flex min-h-11 items-center text-glacier underline decoration-glacier/40 underline-offset-4"
          >
            Kleur
          </a>
          <a
            href="#vlakken"
            className="inline-flex min-h-11 items-center text-glacier underline decoration-glacier/40 underline-offset-4"
          >
            Vlakken
          </a>
          <a
            href="#lenis-proef"
            className="inline-flex min-h-11 items-center text-glacier underline decoration-glacier/40 underline-offset-4"
          >
            Lenis
          </a>
        </nav>
      </header>

      <section id="schaal" className="mt-16">
        <h2
          className="font-display text-2xl"
        >
          Typografische schaal
        </h2>
        <p className="mt-2 text-sm text-glacier">
          Negen stappen, 1.25-ratio, clamp 390–1920px. Body (text-base) nooit
          onder 17px.
        </p>
        <aside className="mt-6 max-w-[var(--measure)] border border-glacier/25 p-4 text-sm">
          <p>
            <strong className="font-semibold">Tokenregel.</strong>{" "}
            <code className="font-mono text-sm">--text-xs</code> (13px) is
            alleen toegestaan voor niet-essentiële meta: eenheden in een
            datastrook, beeldcredits, formulierhints. Nooit body, nooit iets
            dat de koper moet lezen om te beslissen.
          </p>
        </aside>
        <ol className="mt-8 space-y-6">
          {TYPE_STEPS.map((step) => (
            <li
              key={step.name}
              className="grid grid-cols-1 gap-3 border-t border-glacier/25 pt-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start"
            >
              <div className="font-mono text-sm text-glacier tabular-nums">
                --text-{step.name}
                <br />
                stap {step.step}
                <br />
                <ComputedSize className={step.className} />
              </div>
              <p className={`${step.className} min-w-0 font-normal break-words`}>
                De verborgen bergen van Bulgarije
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="display" className="mt-20">
        <h2
          className="font-display text-2xl"
        >
          Archivo: display versus body
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm text-glacier">
              Display · wdth 112 · gewicht 600 · tracking −0.02em
            </p>
            <p
              className="font-display mt-3 text-3xl"
            >
              De verborgen bergen van Bulgarije
            </p>
            <p className="mt-8 text-sm text-glacier">
              Display · wdth 125 · gewicht 700 · tracking −0.02em
            </p>
            <p
              className="font-display-hero mt-3 text-3xl"
            >
              De verborgen bergen van Bulgarije
            </p>
          </div>
          <div>
            <p className="text-sm text-glacier">
              Body · wdth 100 · gewicht 400 · regelhoogte 1.6 · maat 68ch
            </p>
            <div className="mt-3 max-w-[var(--measure)] space-y-4 text-base font-normal">
              <p>
                Je hebt de Alpen gelopen. Spanje, Portugal, misschien de
                Dolomieten. Je kent het gevoel van een goede bergdag — en je
                kent inmiddels ook het gevoel van een pad dat vol staat.
              </p>
              <p>
                In de {site.range} loop je een hele dag zonder iemand tegen te
                komen. Gletsjermeren, granieten graten, dennenbossen die naar
                hars ruiken, en &apos;s avonds een berghut waar de hutbaas je
                naam onthoudt. Bulgarije heeft de bergen van de Alpen zonder de
                drukte van de Alpen.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-sm text-glacier">
          Traildata · Archivo wdth 112 · tabular-nums (JetBrains Mono weggelaten)
        </p>
        <p className="mt-3 font-mono text-lg tabular-nums">
          58 km · 3.100 hm · 5–6 uur
        </p>
      </section>

      <section id="kleur" className="mt-20">
        <h2
          className="font-display text-2xl"
        >
          Kleurtokens
        </h2>
        <p className="mt-2 max-w-[var(--measure)] text-sm text-glacier">
          Contrast volgens WCAG 2.2. Bodytekst snowfield op granite ≥ 7:1.
          Focusring is blaze plus een snowfield halo van 4px.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLOURS.map((colour) => (
            <li key={colour.token} className="border border-glacier/25">
              <div className={`h-28 ${colour.className}`} />
              <div className="p-4">
                <p className="font-mono text-sm">{colour.token}</p>
                <p className="font-mono text-sm text-glacier tabular-nums">
                  {colour.hex}
                </p>
                <p className="mt-3 text-sm">
                  {colour.pairing}:{" "}
                  <span className="font-mono tabular-nums">{colour.ratio}</span>
                </p>
                <p className="mt-1 text-sm text-glacier">{colour.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="vlakken" className="mt-20">
        <h2
          className="font-display text-2xl"
        >
          Donker is de standaard
        </h2>
        <p className="mt-2 max-w-[var(--measure)] text-sm text-glacier">
          granite als basis, snowfield als uitzondering voor langere leestekst.
          Tab door de knoppen: de ring moet op elk vlak leesbaar zijn.
        </p>
        <div className="mt-8 grid gap-0 lg:grid-cols-3">
          <article className="bg-granite p-8 text-snowfield">
            <p className="text-sm text-glacier">granite</p>
            <h3
              className="font-display mt-4 text-xl"
            >
              Waarom {site.range}
            </h3>
            <p className="mt-4 max-w-[var(--measure)] text-base">
              Je hebt de Alpen gelopen. Spanje, Portugal, misschien de
              Dolomieten. Je kent het gevoel van een goede bergdag — en je kent
              inmiddels ook het gevoel van een pad dat vol staat.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex min-h-11 items-center bg-blaze px-5 text-sm font-semibold text-snowfield"
            >
              Bekijk de reis
            </button>
          </article>
          <article className="bg-pine p-8 text-snowfield">
            <p className="text-sm text-glacier">pine</p>
            <h3
              className="font-display mt-4 text-xl"
            >
              Waarom {site.range}
            </h3>
            <p className="mt-4 max-w-[var(--measure)] text-base">
              In de {site.range} loop je een hele dag zonder iemand tegen te
              komen. Gletsjermeren, granieten graten, dennenbossen die naar
              hars ruiken.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex min-h-11 items-center bg-blaze px-5 text-sm font-semibold text-snowfield"
            >
              Bekijk de reis
            </button>
          </article>
          <article className="bg-snowfield p-8 text-ink">
            <p className="text-sm text-pine">snowfield</p>
            <h3
              className="font-display mt-4 text-xl"
            >
              Waarom {site.range}
            </h3>
            <p className="mt-4 max-w-[var(--measure)] text-base">
              Bulgarije heeft de bergen van de Alpen zonder de drukte van de
              Alpen. &apos;s Avonds een berghut waar de hutbaas je naam
              onthoudt.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex min-h-11 items-center bg-blaze px-5 text-sm font-semibold text-snowfield"
            >
              Bekijk de reis
            </button>
          </article>
        </div>
      </section>

      <section id="lenis-proef" className="mt-20">
        <h2
          className="font-display text-2xl"
        >
          Lenis zonder hermount
        </h2>
        <p className="mt-2 max-w-[var(--measure)] text-sm text-glacier">
          SmoothScroll rendert kinderen altijd op dezelfde plek in de boom.
        </p>
        <div className="mt-8 border border-glacier/25 p-8">
          <LenisRemountProbe />
        </div>
      </section>
    </div>
  );
}
