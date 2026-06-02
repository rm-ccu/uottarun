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

All site content lives in JSON files — no React knowledge needed.

| File | What it controls |
|---|---|
| `data/team.json` | Exec team, alumni, pacers, pacer form URL |
| `data/events.json` | Weekly run config (time, location, type) + special events |
| `data/sponsors.json` | Sponsor tiers and logos |
| `locales/en/common.json` | All English strings |
| `locales/fr/common.json` | All French strings |

### Adding a special event
Copy `_eventTemplate` in `data/events.json` into the `events` array and fill in the fields.

### Switching Saturday run type
Change `"type"` in `data/events.json` under `recurring.saturday` between `"coffee"` and `"guru"`.

### Adding a team member
- **Exec**: add an object to `exec` in `data/team.json` following the existing format. `bioFr` can be `null` to fall back to the English bio.
- **Pacer**: add an object to `pacers`. Copy `_pacerTemplate` for the field names.
- **Alumni**: add an object to `alumni`. The `roles` array supports multiple entries (e.g. held two roles across years).

### Adding photos
Drop images into `public/team/` and set the `image` field to `/team/filename.jpg`.

---

## Deployment

The site auto-deploys to Vercel on every push to `main`.

To set up for the first time:
1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. No build configuration needed — Vercel detects Next.js automatically
3. Add the custom domain `uoc-uor.ca` in the Vercel project settings
