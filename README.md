# Guiding website

Nederlandstalige site voor kleinschalige bergreizen. Stack: Next.js 15 (App Router), Tailwind v4, Resend.

## Installeren en draaien

```bash
npm install
cp .env.example .env.local
```

Vul `.env.local`. Daarna:

```bash
npm run dev      # development, http://localhost:3000
npm run build    # check:content, production build, RSC length-prefix check
npm start        # standalone server.js
npm run check:runtime  # elke route in Chrome, console moet leeg zijn
```

`npm run build` slagen is niet hetzelfde als een pagina die werkt. Na elke production build: `npm start` en `npm run check:runtime` (of `node scripts/check-runtime.mjs http://127.0.0.1:3000`). Geen zoek-vervang in `.next` of `.rsc` na de build — React Flight prefixeert strings met hun bytelengte.

## Omgevingsvariabelen

Vijf die in `.env.example` staan:

| Variabele | Rol |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonieke origin (sitemap, canonicals, `nl-NL`, `x-default`) |
| `NEXT_PUBLIC_BE_SITE_URL` | Belgische host (`nl-BE`). Leeg = zelfde origin als `.nl` |
| `RESEND_API_KEY` | Versturen van formulieren |
| `CONTACT_TO_EMAIL` | Postbus die de aanvragen ontvangt |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible-domein. Leeg = geen script, geen cookiebanner |

Production-build (`NODE_ENV=production`) stopt hard als `RESEND_API_KEY`, `CONTACT_TO_EMAIL` of `NEXT_PUBLIC_SITE_URL` ontbreekt, als `NEXT_PUBLIC_REGISTRATION_NUMBER` / `NEXT_PUBLIC_SITE_ADDRESS` ontbreken of nog `PENDING` zijn, of als Engelse copy nog `⟦EN⟧` placeholders bevat.

Lokaal mag `RESEND_API_KEY` met `build-placeholder` beginnen: formulieren slagen dan zonder echte mail (droog).

Foto’s: vervang bestanden in `public/images/placeholders/` volgens `PHOTOGRAPHY.md`. Geen code.

## Content

Geen CMS. Gedeelde cijfers in `/content/shared`. Proza per locale in `/content/nl` en `/content/en`. Chrome-UI (navigatie, formulierfouten) in `/messages`.

- **Reis toevoegen:** eerst `content/shared/trips.ts` (id, km, hm, prijs, etappes), daarna copy in `content/nl/trips.ts` én `content/en/trips.ts` (eigen slugs). Ontbrekende locale = buildfout via `check:content`.
- **Vertrek toevoegen:** `content/shared/departures.ts` (`tripId`, datums ISO).
- **Verhalen:** MDX in `content/nl/stories/` en `content/en/stories/`, zelfde `id`, locale-eigen slug.

`npm run check:content` weigert Engelse stopwoorden in Dutch files, Nederlandse restwoorden in English files, ontbrekende sleutels tussen locales, cijfers die tussen nl/en uit elkaar lopen, en **`⟦EN⟧` placeholders**. Zolang die token in `content/en`, `messages/en.json` of de Engelse MDX staat, stopt de production-build — hetzelfde harde stop als `PENDING` bij registratie en adres. Haal `enCopy()` en `⟦EN⟧` weg als de echte vertaling erin gaat.

## Launch blockers

Niet live gaan voor dit af is:

- Echte Engelse marketingcopy (nu overal gemarkeerd **`⟦EN⟧`**; `npm run build` faalt tot die tokens weg zijn)
- Juridische review van `/algemene-voorwaarden` en `/privacy` (gemarkeerd **CONCEPT — nog niet juridisch gecontroleerd**)
- Aparte juridische review van `/en/terms` en `/en/privacy` (gemarkeerd **CONCEPT — not yet legally reviewed**). Een Nederlandse advocaat-goedkeuring dekt de Engelse tekst niet.
- `NEXT_PUBLIC_REGISTRATION_NUMBER` (niet `PENDING`)
- `NEXT_PUBLIC_SITE_ADDRESS` (niet `PENDING`)
- `site.phone` — nu een placeholder
- Merknaam bevestigen (`lib/site.ts` → `brand`; enige plek voor die letterlijke naam)
- Echte fotografie in plaats van placeholders (hero moet de LCP-candidate zijn; zie `PHOTOGRAPHY.md`)
- Live Resend-sleutel (`re_…`), geen `build-placeholder`

## Deploy

### Container

Multi-stage image: `node:20-alpine`, non-root `nextjs`, `output: 'standalone'`, healthcheck op `/`.

```bash
docker build -t bergpad .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://bergpad.nl \
  -e NEXT_PUBLIC_BE_SITE_URL=https://bergpad.be \
  -e RESEND_API_KEY=re_live_xxx \
  -e CONTACT_TO_EMAIL=hallo@bergpad.nl \
  -e NEXT_PUBLIC_PLAUSIBLE_DOMAIN=bergpad.nl \
  -e NEXT_PUBLIC_REGISTRATION_NUMBER=KVK-of-ondernemingsnummer \
  -e NEXT_PUBLIC_SITE_ADDRESS="straat, plaats" \
  bergpad
```

Lokaal zonder Docker, na `npm run build`:

```bash
npm start
```

`npm start` kopieert `public` en `.next/static` naar de standalone-output (anders 404’t CSS en blijft de pagina wit). `next start` weigert (of waarschuwt) bij `output: 'standalone'`.

### Twee domeinen, één deployment

Wijs **bergpad.nl** en **bergpad.be** naar dezelfde host (zelfde Vercel-project of dezelfde container). Zet:

- `NEXT_PUBLIC_SITE_URL=https://bergpad.nl` — canonieke origin, `nl-NL`, `en`, `x-default` (x-default = Nederlands), sitemap
- `NEXT_PUBLIC_BE_SITE_URL=https://bergpad.be` — alleen `hreflang="nl-BE"`

Beide hosts dienen dezelfde HTML. Canonicals blijven `.nl`.

### Als `.be` live gaat

1. DNS A/CNAME van `bergpad.be` naar dezelfde deploy als `.nl`.
2. `NEXT_PUBLIC_BE_SITE_URL=https://bergpad.be` in de production-env (niet leeg laten, anders is `nl-BE` gelijk aan `.nl` en concurreren de twee URLs).
3. Rebuild/redeploy — hreflang wordt bij de build in de metadata gebakken.
4. In Google Search Console beide properties toevoegen; sitemap blijft `https://bergpad.nl/sitemap.xml`.
5. Plausible: extra site of alias voor `.be` als je die host wilt meten; `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is één domein (meestal `.nl`).
