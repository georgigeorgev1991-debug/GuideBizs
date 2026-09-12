# PROJECT BRIEF — Bulgarian mountain adventures, Dutch-language website

> **How to use this file.** Drop it in the project root. Open a new Cursor chat in this folder and paste the contents of `KICKOFF_PROMPT.md` as your first message. This brief is the source of truth for the agent — it should read this file fully before writing any code, and re-read the relevant section before starting each phase.

---

## 0. Placeholders to replace before you start

| Placeholder | Replace with |
|---|---|
| `[MERKNAAM]` | The brand name (not yet chosen). Used as `Bergpad` throughout as a working default — find-and-replace when decided. |
| `[BERGKETEN]` | The mountain range (Rila or Pirin). |
| `[TELEFOON]` | Dutch virtual phone number. |
| `[REGISTRATIENUMMER]` | Bulgarian tour operator registration number. |

---

## 1. The business, in one page

Two partners based in Bulgaria run small-group mountain trips for **Dutch and Flemish customers**. One is a native Dutch speaker. They own a 9-seat van, so the group is **never larger than 8**.

**The product:** a 4-day / 3-night mountain trip. Two nights in a mountain hut, one in a guesthouse. Around **€895 per person**, everything included except the flight.

**The buyer:** Dutch or Flemish, 35–60, fit, has already walked the Alps, Spain and Portugal, and wants somewhere less obvious. Travels as a couple or with friends. Owns a GPS watch. Reads elevation profiles for pleasure. Will pay for logistics being handled — but is wary of paying a stranger in Bulgaria.

**The single job of this website:** close the trust gap. Nothing else. A visitor arrives sceptical and leaves either booking or on the mailing list.

**The second, commercially critical job:** sell *private trips*. One buyer booking the whole van is worth more than seven individual bookings and costs a fraction of the effort to sell. The private-trips page is not a footnote — treat it as a primary landing page.

---

## 2. Competitive analysis: what to take, what to avoid

### The international benchmarks
Much Better Adventures, 57hours, Wilderness Travel, Intrepid.

**Take:**
- Dark, atmospheric base palettes with one disciplined accent colour. Outdoor brands go dark; travel agencies go bright and blue. Go dark.
- Explicit difficulty grading, shown visually rather than described vaguely.
- Trust signals placed early and repeatedly, not buried in a footer.
- Real testimonials with faces and full names near decision points.
- Editorial article content as an SEO engine, treated as a first-class part of the site.

**Avoid:**
- Trip-grid catalogues with filters. They have 200 trips; you have one. Filtering is an admission of indecision.
- Hero carousels. They exist because nobody could choose. Choose.
- Generic "adventure" stock photography. Every photograph on this site must be from the actual mountain.

### The Dutch market: SNP, Oad, ANWB
SNP is the dominant Dutch walking-holiday operator. Their site is a well-organised catalogue: dense filters, huge trip lists, trip counts, functional and visually forgettable. Oad and ANWB are more dated still.

**Take (because Dutch buyers expect it):**
- GPX tracks named as an included feature.
- Guaranteed-departure promise stated on the trip page.
- Explicit fitness levels with concrete benchmarks, not adjectives.
- Detailed accommodation descriptions — Dutch buyers read these carefully.

**Beat them on:** everything visual. A design-led site is a credibility signal in a market where every incumbent looks like a database with a header image.

### The trust problem you must solve on-page
Dutch travellers use **ANVR / SGR / Calamiteitenfonds** membership as trust shorthand. As a Bulgarian-registered operator you will not have those. Do not hide this. Build a short, confident trust block that names:
- Registration in the Bulgarian National Tourism Register, with the number
- Compulsory Tour Operator Liability insurance (Bulgarian Tourism Act, Art. 97), which covers travellers including in insolvency
- The EU Package Travel Directive protections that apply because the operator is EU-established
- Real names, real faces, a Dutch phone number, a physical address

Answering this openly converts better than avoiding it. Sceptical buyers who find the answer trust you *more* than buyers who never thought to ask.

---

## 3. Design direction

The instinct for a premium outdoor brand is warm cream, a high-contrast serif, and a terracotta accent. **Do not build that.** It is the current default look and it will read as generic. The direction below is grounded in the actual subject matter: Bulgarian granite, glacial lakes, pine forest, and the painted trail blazes that mark every route in the [BERGKETEN].

### Concept: cartographic

The site is built like a **map and a route**, not like a brochure. Contour lines, elevation profiles, painted waymarks and real trail data are the visual language. This is honest to the product and it flatters a buyer who genuinely enjoys route data.

### Colour tokens

| Token | Hex | Use |
|---|---|---|
| `granite` | `#1B2320` | Primary dark base. Cold grey-green, the colour of wet Rila granite. Not tinted black. |
| `pine` | `#2C4034` | Secondary surface, section shifts, cards on dark. |
| `glacier` | `#9FBDB6` | Cool desaturated blue-green from the cirque lakes. Used for contour lines, data, hairlines, quiet UI. |
| `snowfield` | `#ECEFEA` | Light base for reading sections. **Cool, not cream.** |
| `blaze` | `#B8402F` | The single accent. Taken from the red painted trail blazes on the rock. Reserved for the primary CTA, the active waymark, and nothing else. |
| `ink` | `#0E1412` | Text on light surfaces. |

Rules: dark is the default state and light sections are the exception used for long reading passages. `blaze` appears at most twice per viewport. No gradient washes. No tinted greys standing in for black.

### Typography

**One family, two widths.** Use `Archivo` (variable, Google Fonts).

- **Display:** Archivo, expanded width (`wdth` ~112–125), weight 600–700, tight tracking (`-0.02em`). Reads like mountain signage and route markers. Not a serif — deliberately.
- **Body:** Archivo, normal width, weight 400, `line-height: 1.6`, max line length **68 characters**.
- **Trail data only:** `Archivo Expanded` at small size with tabular figures, or `JetBrains Mono` strictly for numeric route data — distances, elevation gain, walking hours, coordinates. This is real instrument data, so a technical face is justified. Never use mono for decorative labels.

Type scale (1.25 ratio, clamped): `13 / 16 / 20 / 25 / 31 / 39 / 49 / 61 / 76`. Body must never be below **17px** — the buyer is 35–60 and reading on a laptop.

Forbidden: tracked-out all-caps eyebrow labels above headings; a single word in a headline coloured or italicised for emphasis; meta strings joined with middle dots; arrows appended to button text.

### Layout

Left-aligned throughout. Centred text only for the hero headline and one pull-quote. Asymmetric two-column grids for the trip content — narrative left, data right — so the route data reads like a map margin.

```
HOME
┌────────────────────────────────────────────┐
│  full-bleed dawn photograph                │
│                                            │
│         De verborgen bergen                │  ← hero, centred, mask reveal
│           van Bulgarije                    │
│                                            │
│      4 dagen · max 8 personen · €895       │
│         [ Bekijk de reis ]                 │
└────────────────────────────────────────────┘   ┃ ← elevation progress rail
┌────────────────────────────────────────────┐   ┃    (fixed, right edge)
│ Waarom [BERGKETEN]                         │   ┃
│ ────────────────────                       │   ┃
│ two columns: narrative | three trail-data  │   ┃
│ facts set in mono                          │   ┃
└────────────────────────────────────────────┘   ┃
┌────────────────────────────────────────────┐   ┃
│  parallax ridge section — layered photos   │   ┃
└────────────────────────────────────────────┘   ┃
┌────────────────────────────────────────────┐   ┃
│  De eerstvolgende vertrekdata              │   ┃
│  ▪ 12–15 juni    nog 4 plaatsen            │   ┃
│  ▪ 3–6 juli      nog 7 plaatsen            │   ┃
└────────────────────────────────────────────┘   ┃
┌────────────────────────────────────────────┐   ┃
│  Wie zijn wij  — two portraits, wide       │   ┃
└────────────────────────────────────────────┘   ┃
┌────────────────────────────────────────────┐   ┃
│  Testimonials, faces, names                │   ┃
└────────────────────────────────────────────┘   ┃
┌────────────────────────────────────────────┐   ┃
│  Trust block  ·  Email capture              │  ┃
└────────────────────────────────────────────┘
```

### The one memorable thing

**A fixed elevation-profile progress rail** on the right edge of the viewport. Instead of a generic scroll bar, a thin SVG elevation profile of the actual route draws itself as the visitor scrolls, with a small `blaze` waymark marking their position on the ascent.

Everything else stays quiet so this lands. Spend the boldness here.

---

## 4. Motion specification

The client has asked for parallax, background motion and a hero animation. Deliver those — but as **one orchestrated sequence plus three restrained scroll effects**, not scattered fade-ups on every section. Section-by-section fade-and-slide is the generic default and must not be used.

### 4.1 Hero sequence (page load) — the signature moment
Runs once, ~2.2s total:

1. `0.0s` Photograph fades in from black at `scale(1.06)`, then begins a continuous 20-second drift to `scale(1.0)` (Ken Burns, easing `linear`).
2. `0.4s` Headline reveals **per word**, each word masked and translating up from `100%` inside `overflow: hidden`, stagger `60ms`, `cubic-bezier(0.16, 1, 0.3, 1)`, duration `900ms`.
3. `1.1s` Subline and the trip meta line fade up together, `400ms`.
4. `1.4s` Primary CTA scales in from `0.96` with opacity, `300ms`.
5. `1.8s` Contour lines: 3–4 SVG paths traced over the ridgeline draw themselves via `stroke-dashoffset`, `1400ms`, `ease-out`, at `0.35` opacity in `glacier`. They then hold.
6. Scroll cue at the bottom, gentle 8px vertical loop, disappears on first scroll.

### 4.2 Hero exit parallax (on scroll)
As the hero leaves:
- Photograph translates at `0.35×` scroll speed (moves slower than the page)
- Headline block translates at `1.15×` (moves faster) and fades to 0 by 60% scroll-out
- Dark overlay opacity `0 → 0.55`
- Contour SVG scales to `1.08` and fades out

Use `transform` and `opacity` only. Never animate `top`, `background-position` or `filter` on scroll.

### 4.3 Layered ridge parallax (mid-page)
One section only. Three photographic layers — foreground rock, mid ridge, far peaks — each with its own scroll speed (`0.2` / `0.5` / `0.8`). Real photographic cut-outs, not SVG mountain silhouettes, which read as clip-art.

### 4.4 Sticky itinerary with elevation draw (trip page)
The strongest UX moment on the site.

- Left column sticks: day number, day title, and the day's elevation profile
- Right column scrolls through the day's narrative, distance, ascent, hours and photographs
- As each day enters view, its SVG elevation profile draws via `stroke-dashoffset` over `1000ms`, and the previous day's profile dims to `0.25` opacity
- On mobile this degrades to a simple stacked list with the profile above each day — **no sticky, no scroll-jacking on mobile**

### 4.5 Image reveals
`clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)` over `900ms`, triggered once at 25% viewport entry. Applied only to the large editorial photographs, not to every image on the page.

### 4.6 Explicitly forbidden
- Scroll-jacking or hijacked wheel events
- A custom cursor — the audience is 35–60 and it damages usability
- Hover-lift and shadow-grow on every card
- Counters that tick up
- Any animation that delays the LCP element
- Autoplaying video with sound

### 4.7 Reduced motion
`prefers-reduced-motion: reduce` must disable all scroll-linked transforms, the Ken Burns drift, and the stroke-draw animations. Content appears immediately at final state. Test this — it is a hard requirement, not a nicety.

---

## 5. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15, App Router, TypeScript** | React, runs on any Node host. Server rendering is non-negotiable: the marketing plan depends on ranking for Dutch long-tail search, and a client-only SPA would undermine it. |
| Styling | **Tailwind CSS v4** with design tokens in `@theme` | Tokens from §3 defined once as CSS variables. |
| Animation | **`motion`** (Framer Motion v11+) | `useScroll`, `useTransform`, `whileInView`. |
| Smooth scroll | **`lenis`** | Required for parallax to feel right. Must respect reduced motion. |
| Images | `next/image`, AVIF + WebP | |
| Forms | Next.js server actions → **Resend** | No third-party form embeds. |
| Analytics | **Plausible** | GDPR-compliant without a cookie banner. A cookie banner costs conversions and this audience is privacy-aware. |
| Content | Typed TS files in `/content` | No CMS. The owners edit one typed file to add a trip. |
| Maps | Static rendered route image + downloadable GPX | Do not embed a live map. It is slow and adds no value. |

### Project structure
```
/app
  layout.tsx                 fonts, metadata, Lenis provider, analytics
  page.tsx                   home
  reizen/page.tsx            trip overview
  reizen/[slug]/page.tsx     trip detail
  prive-reizen/page.tsx      private groups  ← commercially critical
  over-ons/page.tsx
  praktisch/page.tsx         FAQ
  verhalen/page.tsx
  verhalen/[slug]/page.tsx
  contact/page.tsx
  algemene-voorwaarden/page.tsx
  privacy/page.tsx
  sitemap.ts
  robots.ts
/components
  /hero        Hero, HeroContours, ScrollCue
  /motion      RevealText, RevealImage, ParallaxLayer, ElevationRail
  /trip        ItinerarySticky, ElevationProfile, DayCard, IncludedList, DepartureList
  /trust       TrustBlock, Testimonial, GuaranteeBadge
  /ui          Button, Field, Accordion, Section, Prose
/content
  trips.ts  departures.ts  testimonials.ts  faq.ts  team.ts  stories/
/lib
  types.ts  seo.ts  gpx.ts
/public
  /images  /gpx  /og
```

### Content model — build these types first
```ts
export type Difficulty = 'gemiddeld' | 'pittig' | 'zwaar';

export interface TripDay {
  day: number;
  title: string;            // "Over de graat naar hizha [naam]"
  narrative: string;
  distanceKm: number;
  ascentM: number;
  descentM: number;
  walkingHours: string;     // "5–6 uur"
  sleeps: 'berghut' | 'guesthouse';
  elevationPath: string;    // SVG path 'd' for the day profile
  images: Image[];
}

export interface Trip {
  slug: string;
  name: string;
  region: string;
  days: number;
  nights: number;
  priceEUR: number;
  maxParticipants: number;   // 8
  minToGuarantee: number;    // 4
  difficulty: Difficulty;
  fitnessBenchmark: string;  // concrete, e.g. "5–6 uur lopen met 800 hoogtemeters"
  totalDistanceKm: number;
  totalAscentM: number;
  included: string[];
  notIncluded: string[];
  itinerary: TripDay[];
  gpxUrl: string;
  heroImage: Image;
  gallery: Image[];
}

export interface Departure {
  tripSlug: string;
  startDate: string;        // ISO
  endDate: string;
  spotsTotal: number;
  spotsLeft: number;
  status: 'open' | 'bijna-vol' | 'vol' | 'gegarandeerd';
}
```

---

## 6. Page specs with real Dutch copy

Use this copy. Do not generate placeholder text — placeholder copy makes the design impossible to judge.

### 6.1 Home `/`

**Hero**
- H1: `De verborgen bergen van Bulgarije`
- Sub: `Kleinschalige wandel- en bergavonturen, begeleid door locals die Bulgarije écht kennen.`
- Meta: `4 dagen · maximaal 8 personen · vanaf €895 · alles inclusief behalve je vlucht`
- CTA: `Bekijk de reis` (primary, `blaze`) · `Privé met je eigen groep` (secondary, outline)

**Waarom [BERGKETEN]**
> Je hebt de Alpen gelopen. Spanje, Portugal, misschien de Dolomieten. Je kent het gevoel van een goede bergdag — en je kent inmiddels ook het gevoel van een pad dat vol staat.
>
> In de [BERGKETEN] loop je een hele dag zonder iemand tegen te komen. Gletsjermeren, granieten graten, dennenbossen die naar hars ruiken, en 's avonds een berghut waar de hutbaas je naam onthoudt. Bulgarije heeft de bergen van de Alpen zonder de drukte van de Alpen.

Three data facts, set in the technical face:
`2925 m — hoogste top` · `41 gletsjermeren` · `0 kabelbaanrestaurants`

**Eerstvolgende vertrekdata** — three departures, dates, spots remaining, `Gegarandeerd vertrek vanaf 4 deelnemers` badge.

**Wie zijn wij** — two portraits, first names, one paragraph, link to `/over-ons`.

**Testimonials** — three, with faces and full names.

**Trust block** — see §2.

**Email capture**
- Heading: `Wil je de nieuwe data als eerste weten?`
- Body: `We versturen een paar mails per jaar. Nieuwe vertrekdata, en af en toe een route die de moeite waard is. Verder niets.`
- Field: `Je e-mailadres` · Button: `Houd me op de hoogte`
- Lead magnet: `Je krijgt meteen de GPX-track van onze mooiste dagtocht.`

### 6.2 Trip detail `/reizen/[slug]`

Order, top to bottom:
1. Hero photograph, trip name, key data strip: `4 dagen · 3 nachten · 58 km · 3.100 hm · max 8 personen · €895`
2. `Gegarandeerd vertrek vanaf 4 deelnemers` — prominent, near the top. This kills the biggest silent objection.
3. Narrative introduction, 3 paragraphs
4. **Sticky day-by-day itinerary** (§4.4) with per-day distance, ascent, hours, sleeping place, elevation profile
5. **Hoe fit moet je zijn?** — concrete benchmark, never adjectives: `Je moet vier dagen achter elkaar 5 tot 6 uur kunnen lopen, met dagen tot 800 hoogtemeters, met een dagrugzak van 8 kilo. Klimervaring is niet nodig.`
6. **Waar slaap je?** — honest, with real photographs of the bunk room. Heading: `Een Bulgaarse berghut is geen hotel — en dat is precies de bedoeling.` Under-promise here.
7. **Wat eten we?** — the self-catering story told as a feature, not a saving: bread and cheese from the valley, a picnic on the ridge, one proper dinner in the guesthouse.
8. `Inbegrepen` / `Niet inbegrepen` — two clear lists
9. Departure dates with spots remaining
10. Booking CTA + `Liever met je eigen groep?` cross-link to `/prive-reizen`
11. GPX download (email-gated)

### 6.3 Private trips `/prive-reizen`

Written at the **organiser**, not the group. This page carries the business.

- H1: `Jouw groep, jouw datum, jouw tempo`
- Lead: `Met een wandelclub, een vriendengroep of een verjaardag die om iets beters vraagt dan een etentje? Dan rijden we de bus alleen voor jullie.`
- Three blocks: `Eigen datum` · `Eigen tempo en niveau` · `Alleen je eigen gezelschap`
- **One flat price for the whole van, up to 8 people.** Quote a single number so nobody compares per person.
- `Organiseer je de reis? Vanaf 7 betalende deelnemers reis je zelf gratis mee.`
- Named invitations: `wandelclubs · vriendengroepen · een 50e verjaardag · een teamuitje · families`
- Form: name, club or group, preferred period, group size, walking level, free text. Not a generic contact form.

### 6.4 About `/over-ons`
First person, both names, both faces, properly photographed in the mountains. Must state plainly: native Dutch speakers, based in Bulgaria, how long they've walked these mountains, and that certified local guides are used on technical terrain. Written as a story, not a CV.

### 6.5 Practical `/praktisch`
Accordion FAQ, grouped. Minimum questions:
`Hoe kom ik er? · Welke vluchten? · Hoe fit moet ik zijn? · Waar slapen we? · Wat eten we? · Wat neem ik mee? · Is het veilig? · Hoe zit het met verzekering? · Wat als het weer slecht is? · Ik kom alleen — kan dat? · Hoe boek en betaal ik? · Annuleringsvoorwaarden · Wie zijn jullie precies?`

Emit `FAQPage` JSON-LD from this content.

### 6.6 Stories `/verhalen`
Editorial index. Ship with these six SEO articles as MDX stubs with real Dutch H1s:
- `Wandelen in Bulgarije: alles wat je moet weten`
- `[BERGKETEN] versus de Alpen: wat is het verschil?`
- `Is Bulgarije veilig om te wandelen?`
- `Berghutten in Bulgarije: wat kun je echt verwachten?`
- `Van Amsterdam naar de Bulgaarse bergen in één dag`
- `De mooiste meerdaagse wandelroutes in [BERGKETEN]`

---

## 7. Non-negotiable requirements

### Performance
- LCP under 2.0s on 4G. The hero image is the LCP element — `priority`, preloaded, AVIF, no animation blocking it.
- No hero video on mobile. Poster image only.
- Total JS on the home route under 180kb gzipped.
- Lighthouse 95+ on performance, accessibility, best practices, SEO.
- Fonts: `next/font`, `display: swap`, subset to `latin` + `latin-ext`.

### Accessibility
- Visible keyboard focus everywhere, `blaze` outline at 2px
- All contrast AA minimum; body text on `granite` must hit 7:1
- Semantic landmarks, one `h1` per page, logical heading order
- Alt text on every photograph, written in Dutch and descriptive
- Fully operable with reduced motion enabled
- Minimum 17px body, 44px touch targets

### SEO
- `lang="nl"`, `hreflang` for `nl-NL` and `nl-BE`
- Unique Dutch title and description per route
- JSON-LD: `Organization`, `TouristTrip` on trip pages, `FAQPage` on `/praktisch`, `Article` on stories
- `sitemap.ts` and `robots.ts`
- OG images per route, 1200×630, generated with `next/og`
- Canonical URLs, no trailing-slash duplicates

### Responsive
Breakpoints `390 / 768 / 1024 / 1440 / 1920`. Design mobile-first for content order, desktop-first for the motion. All sticky and parallax behaviour degrades gracefully below 1024px.

---

## 8. Build order

Work in phases. **Stop after each phase and show the result before continuing.**

1. **Foundation** — Next.js + TS + Tailwind v4, design tokens as CSS variables, Archivo via `next/font`, base layout, Lenis provider with reduced-motion guard. Deliverable: a styled type-specimen page proving the tokens.
2. **Content model** — types in `/lib/types.ts`, populate `/content` with one full trip using the real Dutch copy from §6 and placeholder images at correct aspect ratios.
3. **Home, static** — full page, no motion. Prove the layout and typography first. Motion on a bad layout is lipstick.
4. **Motion** — hero sequence (§4.1), hero exit parallax (§4.2), elevation rail, ridge parallax, image reveals. Reduced-motion path built at the same time, not afterwards.
5. **Trip page** — including the sticky itinerary and elevation draw.
6. **Private trips + forms** — server actions, Resend, validation, success and error states in Dutch.
7. **Remaining pages** — about, practical, stories, contact, legal.
8. **SEO, OG images, analytics, performance pass.**
9. **Deploy.**

---

## 9. Deployment

Target: any Node host, or Vercel.

```js
// next.config.js
module.exports = { output: 'standalone' }
```

Provide a `Dockerfile` and a `README.md` covering: install, dev, build, start, required env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`), and how to add a new trip or departure by editing `/content`.

Domains: point both the `.nl` and the `.be` at the same deployment. A Flemish visitor trusts a `.be` more than a `.com`.

---

## 10. Definition of done

- [ ] Every page renders correct Dutch copy — zero lorem ipsum, zero English strings
- [ ] Hero sequence runs once and cleanly on a cold load
- [ ] Reduced motion disables every scroll-linked effect, verified
- [ ] Lighthouse 95+ across all four categories on `/` and `/reizen/[slug]`
- [ ] Keyboard-navigable end to end with visible focus
- [ ] Both forms send and show Dutch success and error states
- [ ] Trust block present with registration number and insurance statement
- [ ] `Gegarandeerd vertrek vanaf 4 deelnemers` appears above the fold on the trip page
- [ ] Adding a trip requires editing one file in `/content` and nothing else
- [ ] Tested at 390px, 768px, 1440px

---

## 11. Out of scope

Online payment, a booking calendar, user accounts, a CMS, an English version, multi-currency, live chat. Bookings start as an enquiry form and are closed by email or phone — at this volume that converts better than a checkout, and it is how the trust gets closed.
