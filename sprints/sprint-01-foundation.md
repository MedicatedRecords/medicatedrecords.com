# Sprint 01 — Foundation

- **Status:** Active
- **Started:** 2026-06-22
- **Completed:**

## Goal

Stand up the Astro + Tailwind project on Vercel, define the content model, seed real
content (2 artists, 1 release, 7 mixes), and ship a homepage with the curated featured
hierarchy and the mixed-content chronological grid.

## Scope

In scope:
- Project scaffold, deployment, content schemas, seed content, base layout, homepage,
  and minimal per-type listing/detail pages.

Out of scope:
- Self-hosted audio, search, newsletter, tag filtering, advanced SEO (see `backlog.md`).

## Tasks

### Scaffold & infra
- [x] Scaffold Astro project (TypeScript strict, static output)
- [x] Add Tailwind v4 via `@tailwindcss/vite`; wire `src/styles/global.css`
- [x] Add `@astrojs/mdx` and `@astrojs/sitemap`
- [x] Define color tokens (`--color-bg: #131313`, `--color-fg: #FEFBC2`) in CSS + Tailwind theme
- [x] Install fonts: `@fontsource-variable/space-grotesk` (body) + `@fontsource/space-mono` (accents)
- [ ] Create private GitHub repo; connect Vercel; confirm preview + production deploys *(owner — account-level)*

### Content model
- [x] Write `src/content.config.ts` with all six collections + shared/per-collection fields
- [x] Use `image()` for images and **require** alt fields; use `reference('artists')` for releases/mixes/events
- [x] Add `src/lib/feed.ts` aggregator → sorted `FeedItem[]` across all collections
- [x] Add `src/config/homepage.ts` (curated `hero` + two `subBanners` slugs)

### Seed content
- [x] 2 artist entries (placeholder bios/names, images, links)
- [x] 1 release entry (tied to its artist, tracklist, streaming links, cover art)
- [x] 7 mix entries (tied to both artists, real SoundCloud URLs/track IDs, episode numbers, images)
- [x] Placeholder event, news post, and label press kit

### UI
- [x] Base layout: `<head>`/meta, header with logo + nav, footer
- [x] Homepage featured hierarchy (CSS-grid hero + two sub-banners, responsive, no carousel)
- [x] Homepage mixed grid (square tiles, semantic links, type label)
- [x] Listing + detail pages for artists, releases, mixes, events, press, news
- [x] Artist detail lists their releases/mixes/events (via references)
- [x] Pass build + `astro check` clean; a11y baseline (alt text, heading order, focus, reduced-motion, skip link)

## Acceptance criteria

- [ ] `npm run build` succeeds; `astro check` passes with no type errors
- [ ] Production site live on Vercel; PRs produce preview deploys
- [ ] Homepage shows the curated hero + two sub-banners (no carousel) and a date-sorted mixed grid
- [ ] All 2 artists, 1 release, and 7 mixes render on their listing/detail pages
- [ ] Each artist page lists the releases/mixes/events they're referenced on
- [ ] All content images have alt text; keyboard navigation and focus states work
- [ ] Colors come only from design tokens (no hardcoded hex in components)

## Log

- 2026-06-22 — Scaffolded the full project: Astro 5 + Tailwind v4 + MDX + sitemap, design
  tokens, Space Grotesk/Space Mono fonts, line-art sun logo + favicon. Defined all six
  collections with explicit `artists` references. Built feed aggregator, curated homepage
  config, base layout/header/footer, homepage (hero + 2 sub-banners + mixed grid), and
  listing/detail pages for every type. Seeded 2 artists, 1 release, 7 real Medicated Radio
  mixes, plus placeholder event/post/press kit. Pinned Vite to v6 (`overrides`) to resolve a
  Tailwind-plugin type mismatch. `astro check` clean (0/0/0); build green (20 pages).
- Remaining: owner to create the private GitHub repo + connect Vercel; swap placeholder
  artist names/bios and imagery for real assets.

## Outcomes

> 
