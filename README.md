# Mura Trails

English-first site for small-group hiking trips and (Sprint 2) Sofia corporate mountain days. Stack: Next.js 15 (App Router), `next-intl`, Tailwind v4, Resend, Plausible.

Domain: **muratrails.com** — English at `/`, Dutch at `/nl`.

## Install and run

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local`. Then:

```bash
npm run dev      # development, http://localhost:3000
npm run build    # check:legal (prebuild), check:content, production build, RSC check
npm start        # standalone server.js
npm run check:runtime  # every route in Chrome; console must be empty
npm run check:legal    # legal.ts consistency + claim hard-code scan
```

Phones live in `/content/phones.ts` and stay **empty in development**. A production build fails while they are empty.

## Environment variables

| Variable | Role |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (sitemap, canonicals, `en` + `x-default`) |
| `NEXT_PUBLIC_BE_SITE_URL` | Optional host used only for `hreflang="nl-BE"`. Empty = same origin |
| `RESEND_API_KEY` | Form delivery |
| `CONTACT_TO_EMAIL` | Inbox for consumer forms |
| `CORPORATE_TO_EMAIL` | Inbox for corporate proposal form (Sprint 2 UI) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain. Empty = no script, no cookie banner |

Production build (`NODE_ENV=production`) stops if `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CORPORATE_TO_EMAIL` or `NEXT_PUBLIC_SITE_URL` is missing, if `check:legal` fails, if phones in `/content/phones.ts` are empty, or if English copy still contains `⟦EN⟧` placeholders.

Locally, `RESEND_API_KEY` may start with `build-placeholder`: forms succeed without sending mail (dry run). Real Resend send test is Sprint 5 (DNS/SPF/DKIM for muratrails.com).

Photos: replace files in `public/images/placeholders/` per `PHOTOGRAPHY.md`.

## Content

No CMS. Shared numbers in `/content/shared`. Prose per locale in `/content/nl` and `/content/en`. Chrome UI in `/messages`.

- **Add a trip:** `content/shared/trips.ts`, then copy in `content/nl/trips.ts` and `content/en/trips.ts` (own slugs).
- **Add a departure:** `content/shared/departures.ts` (`tripId`, ISO dates, `status`). Use `planned` while waitlist mode is on.
- **Stories:** MDX in `content/nl/stories/` and `content/en/stories/`, same `id`, locale-own slug.
- **Corporate package:** Sprint 2 — `content/corporatePackages.ts`.

### Changing the legal status

Edit **`/content/legal.ts` only**. Every trust claim on the site reads from that file.

Launch values:

```ts
entity: 'individuals'
vatRegistered: false
tourOperator.route: 'none'
consumerBookingMode: 'waitlist'
offsiteBookable: false
// liabilityInsurance unset
firstAidCertified: false
```

When a tour-operator route exists, set `tourOperator.route` to `'own'` or `'partner'` with the matching fields, then switch `consumerBookingMode` to `'enquiry'`. The production build fails on inconsistent combinations (see `npm run check:legal`).

Public contact line: **Sofia, Bulgaria** + email + phone. No street address anywhere on the site.

## Plausible goals

Prefixed by product:

- `trip_enquiry`
- `private_enquiry`
- `corporate_proposal`
- `email_captured`
- `email_gpx`

## Deploy

### Container

```bash
docker build -t mura-trails .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://muratrails.com \
  -e RESEND_API_KEY=re_live_xxx \
  -e CONTACT_TO_EMAIL=hello@muratrails.com \
  -e CORPORATE_TO_EMAIL=corporate@muratrails.com \
  -e NEXT_PUBLIC_PLAUSIBLE_DOMAIN=muratrails.com \
  mura-trails
```

Phones must be filled in `/content/phones.ts` before the image build succeeds.

### Domain

`muratrails.com` is the only launch domain. English unprefixed; Dutch under `/nl`. Optional later: `.nl` / `.be` pointing at the same deploy and redirecting to `/nl`.
