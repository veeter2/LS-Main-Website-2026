# LongStrider Website — Canonical Repo

**This is the live production repo for longstrider.ai.**

- GitHub: `veeter2/LS-Main-Website-2026`
- Deployed to: Vercel → https://www.longstrider.ai
- Owner: Matt Veitch (matt@longstrider.ai)
- Stack: Next.js (App Router), TypeScript, Tailwind

## Important

There is an **old, abandoned repo** at `veeter2/longstrider-website` (and a local clone at `~/Documents/LongStrider LLC/LS GitHub Repo/longstrider-website`). **Do not edit it.** It is not deployed and has diverged content. If you find yourself there, stop and switch to this repo.

To verify you are in the right place:
```
git remote -v   # should show veeter2/LS-Main-Website-2026
```

## Layout

- `app/` — Next.js App Router pages (manifesto, technology, partners, labs, briefs, case-studies, agents, blog, pilot, etc.)
- `components/` — shared React components (navigation, footer, hero, story-timeline, etc.)
- `app/globals.css` — design tokens (colors, fonts, radii)
- `public/` — static assets

## Deployment

Pushes to `main` deploy automatically via Vercel. Always verify changes against the live site after deploy.
