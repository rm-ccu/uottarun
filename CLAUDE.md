# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/info site for uOttaRun, University of Ottawa's run club.
Goals: look professional to sponsors, display events/team, link to socials.

## Commands

```bash
npm run dev       # Dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for hero/section animations
- i18next + react-i18next for EN / FR
- Deployment: Vercel (free tier), custom domain `uoc-uor.ca`
- No backend — static content only

## Localization

- Supported locales: `en`, `fr`
- Translation strings in `locales/{en,fr}/common.json`
- i18next configured in `lib/i18n.ts`
- Never hardcode EN/FR text in JSX — all strings go through i18next

## Design

- Modern, athletic aesthetic — clean whites, bold typography
- Brand colors: #215D7A, #9ABD74, #FFCE00, #FFFFF4
- Mobile-first — most visitors will be on phones
- Smooth scroll, subtle entrance animations via Framer Motion
- Fonts: Header Font = Klein (Black), Body Type = Canvas Sans (Regular)

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
- Email: `contact@uoc-uor.ca`