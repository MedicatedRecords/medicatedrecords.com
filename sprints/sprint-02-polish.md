# Sprint 02 — Polish & Upgrade

- **Status:** Active
- **Started:** 2026-06-22
- **Completed:**

## Goal

Tighten the homepage/header UX, upgrade to Astro 6, and replace placeholder artist
identities with real content.

## Scope

In scope:
- Sticky header on tablet/desktop.
- Correct featured-banner hierarchy on mobile.
- Astro 5 → 6.4.8 upgrade (+ integrations).
- Real artist names/bios.

Out of scope:
- New features (see `backlog.md`).

## Tasks

- [x] Sticky header at `sm+` with bg/blur (no sticky on mobile)
- [x] Sub-banners shorter than hero on mobile (aspect-ratio fix)
- [x] Set real artist names (cory without, Jozeppi)
- [ ] Replace placeholder artist bios + imagery with real assets
- [x] Upgrade astro@^6.4.8 + @astrojs/mdx/sitemap/check
- [x] Remove/re-pin the Vite override after the upgrade
- [x] `npm run check` + `npm run build` clean post-upgrade

## Acceptance criteria

- [x] Header stays pinned while scrolling on tablet/desktop; scrolls normally on mobile
- [x] On mobile the hero reads larger than the two sub-banners
- [x] Build + type-check pass on Astro 6
- [ ] No placeholder artist names remain on the live site

## Log

- 2026-06-22 — Sprint opened. Header now sticky at `sm+`; hero/sub aspect ratios fixed for
  mobile hierarchy (hero `3/2`, subs `16/9`). Artist names set to "cory without" and
  "Jozeppi" (bios/imagery still placeholder). Astro 6 upgrade pending.
- 2026-06-22 — Upgraded to Astro 6.4.8 (+ @astrojs/mdx/sitemap/check). Removed the Vite
  override (Astro 6 ships a single Vite 7). Astro 6 requires Node ≥ 22.12 — installed Node
  22.23 via `n` (writable `~/.n` prefix; the prior 22.x had landed in a sudo-only prefix).
  Migrated content schema off deprecated `astro:content` `z` re-export (→ `astro/zod`) and
  Zod 4 deprecations (`z.string().url()/.email()` → `z.url()/z.email()`). Pinned Node via
  `engines` + `.nvmrc`. `astro check` + build clean (0/0/0, 20 pages).

## Outcomes

> Polish + Astro 6 upgrade shipped and verified on Node 22. Remaining open item: replace
> placeholder artist bios/imagery with real assets (carry forward).
