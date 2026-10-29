# GAP REPORT — Sprint 0 (Revision 3)

Source of truth: `/cursor/stores/self/docs/PROJECT_BRIEF.md` (Revision 3, 29 Oct 2026).  
Repo `PROJECT_BRIEF.md` is still Revision 1 (Dutch-only / Bergpad).  
Audit commit: `rev1-final` / branch `rev3` @ `a3c42c7` + this file only.

---

## A. Current state (with evidence)

### A.1 Route map as built

| Locale | Default? | Prefix | How |
|---|---|---|---|
| `nl` | **yes** | unprefixed (`localePrefix: "as-needed"`) | `i18n/routing.ts` `defaultLocale: "nl"` |
| `en` | no | `/en/...` | same file |

Localised slugs via `routing.pathnames` (`i18n/routing.ts`):

| Internal key | NL URL | EN URL |
|---|---|---|
| `/` | `/` | `/en` |
| `/reizen` | `/reizen` | `/en/trips` |
| `/reizen/[slug]` | `/reizen/vier-dagen-overtocht` | `/en/trips/four-day-crossing` |
| `/prive-reizen` | `/prive-reizen` | `/en/private-trips` |
| `/over-ons` | `/over-ons` | `/en/about` |
| `/praktisch` | `/praktisch` | `/en/practical` |
| `/verhalen` | `/verhalen` | `/en/stories` |
| `/verhalen/[slug]` | `/verhalen/{nl-slug}` | `/en/stories/{en-slug}` |
| `/contact` | `/contact` | `/en/contact` |
| `/algemene-voorwaarden` | `/algemene-voorwaarden` | `/en/terms` |
| `/privacy` | `/privacy` | `/en/privacy` |
| `/specimen` | `/specimen` | `/en/specimen` |

Trip slug sources: `content/nl/trips.ts` (`vier-dagen-overtocht`), `content/en/trips.ts` (`four-day-crossing`).  
Story slugs: `content/shared/stories.ts` `storySlugs`.  
Sitemap / hreflang: `app/sitemap.ts`, `lib/seo.ts` (`x-default` → NL).  
**Missing vs Rev3:** `/companies`, `/companies/[package]`; EN-default unprefixed; NL under `/nl`; no corporate-only EN routes.

### A.2 Brand string `Bergpad` / provisional brand

**Literal `Bergpad` / `bergpad` as brand (17 hits in 5 files):**

| File | Count | Notes |
|---|---|---|
| `lib/site.ts` | 2 | `brand: "Bergpad"`; `email: "hallo@bergpad.nl"` |
| `Dockerfile` | 1 | `CONTACT_TO_EMAIL=hallo@bergpad.nl` |
| `package.json` | 1 | `"name": "bergpad"` |
| `README.md` | 12 | docker tag, domains `bergpad.nl`/`.be`, Plausible, examples |
| `PROJECT_BRIEF.md` | 1 | Rev1 placeholder note (repo copy is not Rev3) |

**False positives (Dutch common noun “bergpad” = mountain path, not brand):**  
`content/nl/alts.ts:6`, `content/nl/stories/is-bulgarije-veilig.mdx:11`.

**Propagated via `site.brand` → renders “Bergpad” (no second literal):**

| Surface | Evidence |
|---|---|
| Header wordmark | `components/ui/SiteHeader.tsx` |
| Title template / default | `app/[locale]/layout.tsx` |
| Metadata / OG `siteName` / titles | `lib/seo.ts` |
| JSON-LD Organization / Article / TouristTrip | `lib/jsonld.ts` |
| Resend `from:` | `lib/forms/process.ts` `` `${site.brand} <onboarding@resend.dev>` `` |
| FAQ / about / team / SEO / specimen copy | `content/{nl,en}/faq.ts`, `about.ts`, `team.ts`, `seo.ts`, `pages.ts` |
| MDX `{site.brand}` replace | `lib/stories.tsx` |
| OG image body | `lib/og.tsx` uses `site.range` not brand; brand still in surrounding metadata |

**Not present:** `Mura Trails`, `muratrails.com` anywhere in app code.

### A.3 Legal / trust claims rendered + data source

| Claim | Where rendered | Data source |
|---|---|---|
| National Tourism Register + number | Home TrustBlock items; FAQ insurance | `content/{nl,en}/pages.ts` `trustItems` + `site.registrationNumber` (`lib/site.ts` ← `NEXT_PUBLIC_REGISTRATION_NUMBER` \|\| `"PENDING"`); `components/trust/TrustBlock.tsx` |
| Tour Operator Liability / Tourism Act art. 97 | TrustBlock; FAQ; terms outline | Hard-coded strings in `pages.ts` / `faq.ts` / `content/{nl,en}/legal.ts` (terms sketch) |
| EU Package Travel Directive / Pakketreizenrichtlijn | TrustBlock; FAQ; terms | Hard-coded in same files |
| “Bulgarian-registered operator” / ABTA/ATOL denial | EN trust lead | `content/en/pages.ts` `trustLead` |
| ANVR / SGR “we are not members” | FAQ insurance answers | `content/{nl,en}/faq.ts` (hard-coded) |
| “Bulgaarse bedrijfsrekening” / “Bulgarian business account” | FAQ booking | `content/{nl,en}/faq.ts` |
| Phone + address in trust footer line | TrustBlock | `site.phone`, `site.address` (`lib/site.ts`) |
| EIK / VAT number / “VAT invoice” | — | **not found** as rendered claims |
| Calamiteitenfonds | — | **not found** |
| `/content/legal.ts` `LegalStatus` | — | **Missing** (only locale terms/privacy: `content/{nl,en}/legal.ts`) |

Launch Rev3 requires `route: 'none'` → **no** registration / insurance / Package Travel claims. Current site asserts all three.

### A.4 Build guards

| Guard | Where | Blocks |
|---|---|---|
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` required | `lib/env.ts` `requireMailEnv` via `requireProductionEnv` | Production build (`next.config.ts` when `NODE_ENV=production`) |
| `NEXT_PUBLIC_SITE_URL` required | `lib/env.ts` | Production build |
| `NEXT_PUBLIC_REGISTRATION_NUMBER` ≠ `PENDING` | `lib/env.ts` | Production build (**conflicts with Rev3** — launch has no registration) |
| `NEXT_PUBLIC_SITE_ADDRESS` ≠ `PENDING` | `lib/env.ts` | Production build |
| English `⟦EN⟧` leftovers | `lib/env.ts` `englishPlaceholderHits` | Production build |
| Content parity / locale leakage / elevation | `scripts/check-content.ts` via `npm run build` | Build |
| RSC length-prefix sanity | `scripts/check-rsc.mjs` | Post-build |
| Dry-run mail | `lib/forms/process.ts` key starts with `build-placeholder` | Skips Resend send |
| `legal.ts` consistency / no hard-coded VAT/EIK/insurance strings | — | **Missing** (Rev3 §7) |

### A.5 Content model vs brief §5

| Type | Status | Evidence |
|---|---|---|
| `Trip` / `TripDay` | Present, **diverges** | `lib/types.ts`: Dutch `Difficulty`/`Sleeps`; `elevation: number[]` not `elevationPath`; separate locale files not `Localised<>` |
| `Departure` | Present, **diverges** | Status union lacks `'planned'`; Dutch statuses; no `guideLanguages` — `lib/types.ts`, `content/shared/departures.ts` |
| `Departure.status 'planned'` | **Missing** | — |
| `CorporatePackage` | **Missing** | no `content/corporatePackages.ts`, no `components/corporate` |
| `LegalStatus` | **Missing** | no `/content/legal.ts` |
| `Testimonial.product` | **Missing** | flat testimonials only |
| `Locale` / `Localised<T>` | Partial | `AppLocale` exists; content split `content/nl` + `content/en` instead of `Localised` |

### A.6 Forms

| Form | UI | Server action | Sends to | Env |
|---|---|---|---|---|
| Newsletter / email capture | `components/home/EmailCapture.tsx` (home) | `submitNieuwsbrief` → `processListSignup` | Resend → `CONTACT_TO_EMAIL` | `RESEND_API_KEY`, `CONTACT_TO_EMAIL` |
| GPX gated download | EmailCapture on trip page | `submitGpx` | same | same |
| Contact | `ContactForm` on `/contact` | `submitContact` | same | same |
| Private enquiry | `PrivateEnquiryForm` on `/prive-reizen` | `submitPrivateEnquiry` | same | same |
| Trip “booking” | mailto button only | none | `mailto:site.email` | none |
| Corporate proposal | **Missing** | — | — | Rev3 also needs `CORPORATE_TO_EMAIL` |

From header: `` `${site.brand} <onboarding@resend.dev>` `` (`lib/forms/process.ts`).  
Plausible goals: `lib/plausible.ts` — `enquiry`, `email`, `gpx`, `private` (no corporate).

### A.7 Hard-coded numbers Rev3 no longer states

| Claim | Path |
|---|---|
| `41 gletsjermeren` / `41 glacial lakes` | `content/nl/pages.ts:10`, `content/en/pages.ts:10` |
| Single range framing (`site.range = "Rila"` only) | `lib/site.ts`; home “Waarom Rila” / “Why the Rila” in `content/{nl,en}/pages.ts` |
| Rev3 data facts replace lake count with trip meta / “gletsjermeren” without count | brief §6.1–6.2 — not implemented |

(Product numbers €895 / 8 / 4 days / 2925 m / 0 cable-car restaurants still match brief and are OK.)

### A.8 Lighthouse + Docker

| Route | Last known Lighthouse |
|---|---|
| `/` (and all consumer routes) | **never measured** — runners exist (`scripts/lh-all.mjs`, `lh-home.mjs`, `lh-i18n.mjs`) writing to `audit-frames/` which is **not in the repo**; no JSON reports committed; `PHOTOGRAPHY.md` references “performancerapportage” without scores |
| Trip page specifically | **never measured** (script lists it; no output artifacts) |
| `/companies` | N/A (route missing) |

| Docker | Evidence |
|---|---|
| `Dockerfile` present | multi-stage standalone, healthcheck |
| Image ever built/run | **unverified** — `docker` CLI absent in this environment; no `.next` / image artifacts; single git commit; README documents `docker build -t bergpad` only |

---

## B. Gap table (§0–§10)

| § | Status | Evidence | Work needed | Size | Sprint |
|---|---|---|---|---|---|
| 0 Placeholders | Partial | `lib/site.ts` still Bergpad/TODO phone; no `legal.ts` | Replace brand/domain/phones; drive legal from `legal.ts` | M | 1 |
| 1 Business (two products + legal launch) | Partial | Consumer site only; no corporate; trust asserts company/TO | Waitlist mode; remove false company claims; add corporate later | L | 1–2 |
| 2 Trust / competitive | Conflicts | `TrustBlock` + FAQ assert register/insurance/PTD | Rewrite trust from `LegalStatus`; waitlist copy | M | 1 |
| 3 Design | Partial | Tokens/Archivo/dark OK; no brush SVGs; no speech-bubble hero; NL-only home doors | Brush assets + hero bubble + EN two-door home | L | 2–3 |
| 4 Motion | Done | Hero/parallax/rail/itinerary/reduced-motion present under `components/hero`, `motion`, `trip` | Keep; light corporate timeline later | S | 2 |
| 5 Tech / routes / model | Partial | `next-intl` NL-default; types lack `planned`/`CorporatePackage`/`LegalStatus` | EN-first routing; extend types; add companies routes | L | 1–2 |
| 6 Page specs / copy | Conflicts | NL hero “De verborgen bergen…”; EN placeholders `⟦EN⟧`; no `/companies` | Rev3 hero + EN copy + corporate pages | L | 2,4 |
| 7 Non-negotiables | Partial | SEO exists wrong default; build requires registration; fonts `latin` only; LH never measured | Flip guards; hreflang; `latin-ext`; measure LH | M | 1,5 |
| 8 Build order / sprints | Done (this) | Rev1 phases shipped per brief §8; this audit | Execute sprints 1–5 | S | 0 |
| 9 Deployment | Partial | `Dockerfile`/`README`; bergpad domains; no `CORPORATE_TO_EMAIL` | muratrails.com; env docs; Resend domain | M | 1,5 |
| 10 Definition of done | Missing | Waitlist/legal/corporate/LH/brush unchecked vs Rev3 §10 | Meet checklist after sprints 1–5 | L | 5 |

---

## C. Conflicts (built vs Revision 3 — remove/rewrite)

| Conflict | Built today | Rev3 requires | Action |
|---|---|---|---|
| **Routing default** | `nl` unprefixed; `en` under `/en` (`i18n/routing.ts`) | `en` unprefixed; `nl` under `/nl` | Rewrite routing, href helpers, sitemap, middleware behaviour |
| **Brand** | `Bergpad`, `hallo@bergpad.nl`, bergpad domains | **Mura Trails** / `muratrails.com` | Replace `lib/site.ts`, package name, Dockerfile, README, email from |
| **Hero copy (NL)** | `De verborgen bergen van Bulgarije` (`content/nl/pages.ts`) | Brand line `Out of office. Up a mountain.` in speech bubble (`lang="en"`) | Rewrite hero component + copy |
| **Hero copy (EN)** | `One ridge. Eight people. We drive.` (`content/en/pages.ts`) | Same brand line + two doors | Rewrite |
| **Home structure** | Single consumer home both locales | EN: Hiking trips + For companies doors; NL: consumer only | Restructure `app/[locale]/page.tsx` |
| **Trust: registration number** | Always shown via `{registration}` | Only if `tourOperator.route` ≠ `'none'` | Remove hard-coded items; gate on `legal.ts` |
| **Trust: TO liability insurance** | Always claimed | Only if route own/partner + insurer set | Remove / gate |
| **Trust: Package Travel Directive** | Always claimed | Only when a TO route exists | Remove / gate |
| **Trust lead (EN)** | “Bulgarian-registered operator” | Individuals; waitlist protection copy | Rewrite |
| **FAQ insurance / booking** | Register + insurance + business account | Waitlist / individuals wording from `legal.ts` | Rewrite |
| **ANVR/SGR line** | OK to keep as denial | Still fine; ensure no false positives around it | Keep denial; drop false TO claims |
| **Build guard** | Fails if registration `PENDING` | Must **not** require registration at launch; validate `legal.ts` instead | Invert / replace `lib/env.ts` |
| **Departures UX** | Spots left + booking mailto; statuses open/gegarandeerd/… | Waitlist: `planned`, no spots stamp, email capture CTA | Change model + UI |
| **Lake count “41”** | Home facts | Do not state fixed lake count | Remove number |
| **Single range “Rila”** | `site.range` / “Waarom Rila” | Rila **and** Pirin (+ Vitosha for corporate) | Rewrite copy; drop single-range fact framing |
| **Domains / hreflang** | `.nl` + `.be` story; `x-default` = NL | `muratrails.com` only; `x-default` = EN | Rewrite `lib/seo.ts`, README |
| **Corporate product** | Absent | First to go live | Add in Sprint 2 (gap, not delete) |
| **Terms sketch** | Assumes company registration number | Individuals / civil contracts | Rewrite outline copy |

---

## D. Sprint 1 plan

### D.1 Order (routing → rebrand → `legal.ts`) — why

1. **Routing flip first** — Almost every SEO/nav surface keys off default locale and pathnames (`i18n/routing.ts`, `lib/href.ts`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, internal `Link` hrefs, OG routes, Plausible path assumptions, form success contexts). Doing brand/legal first on NL-root URLs doubles the rewrite.
2. **Rebrand second** — Centralise on `lib/site.ts` (`brand`, `email`, `siteUrl` defaults) then package/Dockerfile/README; metadata/JSON-LD/Resend `from` follow `site.brand` automatically.
3. **`legal.ts` + trust + waitlist third** — After URLs/brand stabilize, add `/content/legal.ts`, rewrite `TrustBlock`/FAQ, flip build guards, set `consumerBookingMode: 'waitlist'`, add `CORPORATE_TO_EMAIL` plumbing (form UI can wait for Sprint 2).

Language switcher tightening (only where translation exists) rides with the routing flip.

### D.2 What the routing flip touches

| Area | Files / notes |
|---|---|
| Pathnames / default | `i18n/routing.ts` (`defaultLocale: "en"`, NL prefix) |
| Href / switcher | `lib/href.ts`, `lib/switcher.ts`, `i18n/navigation.ts`, `components/ui/LanguageSwitcher.tsx` |
| Sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |
| Canonicals / hreflang | `lib/seo.ts` (`x-default` → EN; drop `.be`-as-primary story or keep optional) |
| OG routes | `app/[locale]/**/opengraph-image.tsx`, `lib/og-route.ts` |
| Internal links | All `href="/prive-reizen"` etc. under `app/`, `components/` |
| Plausible goals | Event names OK; domain env → `muratrails.com`; path filters if any |
| Form redirects / locale hidden fields | `locale` in forms (`lib/forms/process.ts`); success copy URLs if any |
| Audit scripts | `scripts/audit-i18n.mjs`, `lh-*.mjs` expected paths |

**Old Dutch-at-root redirects:** **Not needed.** Rev3 §8 states Rev1 was staging over a temporary tunnel; this repo has no evidence of a public indexed `bergpad.nl` deployment (unverified DNS). Tunnel URLs are ephemeral → no permanent `/reizen` → `/nl/reizen` redirects required. If owners later confirm a public `.nl` index, add redirects then — out of Sprint 1 unless proven.

### D.3 Risks + verification

| Risk | Verify |
|---|---|
| Broken locale links / 404s | `npm run build`; hit every sitemap URL; language switcher both ways on trip + story slugs |
| Wrong canonical / hreflang | Inspect `<link rel="alternate">` on `/`, `/nl`, `/trips/...`, `/nl/reizen/...` |
| Trust still claiming registration | Grep rendered HTML for register/insurance/PTD/EIK/VAT with launch `legal.ts` |
| Production build blocked without registration | Build with launch legal values and **no** `NEXT_PUBLIC_REGISTRATION_NUMBER` |
| Waitlist still showing spots/booking mailto | Trip + home departures: no spots line; CTA = email capture |
| Brand leftovers | `rg -i bergpad` excluding Dutch common-noun paths |
| Forms still send | Dry-run + live Resend once key exists; Plausible events fire |

---

## E. Questions that block Sprint 1

1. **Public URL history:** Was any non-tunnel URL (`bergpad.nl` / other) ever indexed or shared publicly? (Determines whether Dutch-root → `/nl` redirects are mandatory after all.)
2. **Launch phones:** Final `[NL_PHONE]` and `[BG_PHONE]` values for `legal`/site (or confirm keep placeholders through Sprint 1)?
3. **`liabilityInsurance` / `firstAidCertified`:** Confirm both stay unset/`false` at Sprint 1 so trust UI must omit those lines?
4. **Contact address while `entity: 'individuals'`:** What string (if any) replaces today’s `NEXT_PUBLIC_SITE_ADDRESS` requirement for the trust footer?
5. **Resend from-domain for Sprint 1:** Stay on `onboarding@resend.dev` until `muratrails.com` SPF/DKIM is ready, or block rebrand email `from:` until DNS is done?

---

## Acceptance evidence

- Tag `rev1-final` → `a3c42c7`; branch `rev3` from that commit; both pushed to `origin`.
- This file is the only intentional application-tree addition on `rev3`.
