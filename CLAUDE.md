# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/info site for uOttaRun, University of Ottawa's run club.
Goals: look professional to sponsors, display events/team, link to socials.

## Commands

```bash
npm run dev       # Dev server at http://localhost:3000 (Studio at /studio)
npm run build     # Production build
npm run lint      # ESLint
npm run migrate:sanity   # One-time import of data/*.json into Sanity
```

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for hero/section animations
- i18next + react-i18next for EN / FR
- Deployment: Vercel (free tier), custom domain `uoc-uor.ca`
- Sanity as CMS — Studio embedded at `/studio`, schemas in `/sanity/schemas`
- No custom backend

## Sanity

- Config: `sanity.config.ts`, env in `.env.local` (see `.env.local.example`)
- Schemas: `/sanity/schemas` — `documents/` and `objects/`
- Singletons (`siteSettings`, `homePage`, `weeklyRuns`) are pinned in the Studio
  sidebar and cannot be deleted or duplicated
- `person` is one document per human, referenced by each `teamYear` with a
  per-year role — so a returning exec's headshot is uploaded once
- Event labels (Guru/Coffee/Trail) are `eventTag` documents, not free text
- Images use hotspot cropping; always render through `urlFor()` in `sanity/image.ts`

## Localization

- Supported locales: `en`, `fr`
- Translation strings in `locales/{en,fr}/common.json`
- i18next configured in `lib/i18n.ts`
- Never hardcode EN/FR text in JSX — all strings go through i18next
- UI chrome (nav, buttons) stays in i18next; editable *content* lives in Sanity
  as `localeString` / `localeText` objects — read them with `loc()` from
  `sanity/locale.ts`, which falls back to English when French is missing

## Design

- Modern, athletic aesthetic — clean whites, bold typography
- Brand colors: #215D7A, #9ABD74, #FFCE00, #FFFFF4
- Mobile-first — most visitors will be on phones
- Smooth scroll, subtle entrance animations via Framer Motion
- Fonts (via `next/font/google` in `app/layout.tsx`): heading = Barlow Condensed, body = DM Sans, display = Playfair Display

## Code Standards

- TypeScript throughout
- Functional components + hooks only
- Named exports over default exports
- No inline styles — Tailwind classes only
- Keep components small and composable

## File Structure

- `/app`        → Next.js App Router pages
- `/components` → Reusable UI components
- `/data`       → JSON files for events, team members, sponsors
- `/locales`    → EN/FR translation strings
- `/public`     → Static assets (logos, photos)
- `/lib`        → i18n config and shared utilities

## Content Strategy

- Events, team members, and sponsors live in `/data` as JSON
- Site-wide settings (contact email, social links, form URLs) live in `data/site.json` — never hardcode these in JSX
- To update content, edit the JSON — never hardcode content in JSX
- This means non-devs (future execs) can update the site without touching React code

## Key Pages

| Route | Purpose |
|---|---|
| `/` | Hero, quick stats, upcoming events preview, sponsors strip |
| `/events` | Cards with date, distance, location, Strava link |
| `/team` | Exec + pacer grid with headshots and roles |
| `/sponsors` | Tier breakdown, current sponsors, contact CTA |
| `/join` | Google Form embed + Discord/Linktree links |

## External Links

- Member form: https://forms.gle/3biUb65D5A6UXwmE7
- Linktree: https://linktr.ee/uottarun
- Discord: https://discord.com/invite/rEbdhWf2VH
- Strava club: https://www.strava.com/clubs/1287320/
- Email: `uottarun@gmail.com` (set in `data/site.json`; `uoc-uor.ca` email is not set up yet)