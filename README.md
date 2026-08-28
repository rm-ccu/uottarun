# uOttaRun

Website for **uOttaRun** (uOttaCours in French), the University of Ottawa's official running club. Open to all students — all paces, all levels. We run Tuesdays and Saturdays and host races, socials, and special events throughout the year.

Live site: [uoc-uor.ca](https://uoc-uor.ca)

---

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animations
- Custom EN/FR i18n (no external library)
- Deployed on **Vercel**

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # ESLint
```

---

## Updating Content

All content is managed in **Sanity**, a browser-based CMS — no code, no local setup, no developer.

**Studio:** [uoc-uor.ca/studio](https://uoc-uor.ca/studio) (or `localhost:3000/studio` when running locally)

### Read the handbook first

There is a step-by-step guide for editors — cancelling a run, adding events, setting up a new
exec year, swapping headshots, handing over to the next team.

It lives in **two places**, so it survives losing either one:

1. **A formatted page** — the link is in the `Handbook` document in the Studio sidebar.
2. **Inside the Studio itself** — open **Handbook**, pinned at the top of the sidebar. Same
   content, always reachable as long as you can log in.

Non-technical execs should start there and can ignore the rest of this README.

### What is where

| Studio section | Controls |
|---|---|
| `Handbook` | The editor's guide (read-only reference) |
| `Site Settings` | Contact email, socials, form URLs, brand colours, fonts |
| `Home Page` | Hero photo, headline, the stats bar |
| `Weekly Runs` | Tuesday/Saturday runs and their seasonal date ranges |
| `Cancellations & Changes` | One-off cancellations, time and location changes |
| `Events` | Races, socials, one-off events |
| `Event Labels` | The Guru / Coffee / Trail badges |
| `Team Years` | Each year's exec and pacer roster |
| `People` | One record per person, with their headshot |
| `Exec Roles` | Job titles, translated once and reused |
| `Collabs & Sponsors` | Sponsors, charities, partner clubs |
| `Awards` | Awards shown on the home page |

Interface text (nav labels, buttons) stays in `locales/{en,fr}/common.json` — it changes rarely
and does not belong in the CMS. Editable *content* is in Sanity.

### Notes for developers

- Schemas live in `sanity/schemas/`; queries in `sanity/queries.ts`
- Pages are server components fetching from Sanity with 60s revalidation
- `person` is one document per human, referenced by each `teamYear` with a per-year role, so a
  returning exec's headshot is uploaded once
- A weekly run appears only when the next occurrence of its weekday falls inside one of its
  seasons — see `lib/runSchedule.ts`
- Translatable fields use `localeString` / `localeText`; read them with `loc()` from
  `sanity/locale.ts`, which falls back to English
- Fonts are a fixed list — `next/font` needs build-time literals, so adding one means editing
  both `lib/fonts.ts` and `FONT_CHOICES` in the `siteSettings` schema
- `scripts/seed-handbook.mjs` regenerates the in-Studio handbook
- Environment variables: copy `.env.local.example` to `.env.local`

---

## Deployment

The site auto-deploys to Vercel on every push to `main`.

To set up for the first time:
1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. No build configuration needed — Vercel detects Next.js automatically
3. Add the custom domain `uoc-uor.ca` in the Vercel project settings
