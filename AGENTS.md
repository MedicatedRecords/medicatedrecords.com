# AGENTS.md

> **Source of truth for AI agents and humans working on this repo.**
> `CLAUDE.md` points here. Keep this file current — when conventions change, update this file.

## Project overview

**Medicated Records** is the website for a young independent music label. The site is a
content-driven showcase, not an app. Current scale:

- **2 artists** (one with a release)
- **1 release**
- **7 DJ mixes** (podcast-style, featuring both artists)
- More of everything planned over time.

The site hosts: artist profiles, recent DJ mixes, recent releases, upcoming events, and
press kits — surfaced through a curated homepage and per-type listing pages.

**Goals:** minimal, classy, elegant, understated. Accessibility is a first-class concern.

## Tech stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | [Astro 6](https://astro.build) (static output)      |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`)           |
| Content        | Astro Content Collections (Markdown/MDX frontmatter)|
| Hosting        | Vercel (free tier)                                  |
| Repo           | Private GitHub repository                            |
| Audio (mixes)  | SoundCloud embeds now; self-hosted audio later      |

Static output (`output: 'static'`) is the default — no SSR until a feature requires it.

## Commands

> **Requires Node ≥ 22.12** (Astro 6). The repo pins this via `engines` + `.nvmrc`.
> If `node -v` is older, switch with your version manager (e.g. `n 22` / `nvm use`).

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:4321)
npm run build      # production build to ./dist
npm run preview    # preview the production build locally
npm run astro ...  # run Astro CLI commands (e.g. astro check)
```

Deployment is handled by Vercel's GitHub integration (push to `main` → production deploy,
PRs → preview deploys). No manual deploy step.

## Project structure

```
.
├── AGENTS.md                  # this file — source of truth
├── CLAUDE.md                  # pointer to AGENTS.md
├── README.md
├── docs/
│   └── FEATURES.md            # initial feature-set spec
├── sprints/                   # planning + agentic feature tracking
│   ├── README.md
│   ├── _template.md
│   ├── backlog.md
│   └── sprint-01-foundation.md
├── public/                    # static assets served as-is (favicon, og, etc.)
└── src/
    ├── components/            # reusable .astro components
    ├── config/
    │   └── homepage.ts        # curated homepage selections (hero + sub-banners)
    ├── content/               # content collections (one folder per collection)
    │   ├── artists/
    │   ├── releases/
    │   ├── mixes/
    │   ├── events/
    │   ├── pressKits/
    │   └── posts/
    ├── content.config.ts      # collection schemas (Astro 5 content layer)
    ├── layouts/
    ├── lib/                   # utilities (e.g. the mixed-content feed aggregator)
    ├── pages/                 # routes
    └── styles/                # global.css + design tokens
```

> Content images are **co-located** with their entry (e.g.
> `src/content/releases/practice/cover.jpg`) and referenced with the
> `image()` schema helper so Astro optimizes them.

## Content model

Six collections. Each entry contributes to listing pages and, optionally, the homepage
mixed-content grid.

### Shared fields (every collection)

| Field            | Type             | Notes                                              |
| ---------------- | ---------------- | -------------------------------------------------- |
| `title`          | string           | Display title                                      |
| `date`           | date             | Used for chronological sorting in the mixed grid   |
| `squareImage`    | image            | 1:1 image for grid tiles                           |
| `squareImageAlt` | string           | **Required** alt text (a11y)                       |
| `draft`          | boolean (opt)    | Excluded from production builds when `true`        |
| `tags`           | string[] (opt)   | Cross-cutting discovery: genre, mood, "live", etc. |

### Artist relationships (explicit references, not tags)

`releases`, `mixes`, and `events` are tied to artists with a **typed reference**, not
free-form tags. References are build-time checked and support multiple artists per item.

```ts
artists: reference('artists').array()   // required, >= 1 entry
```

This powers bidirectional listings — an artist page can list every release, mix, and event
they appear on. Use `tags` only for cross-cutting themes (genre, mood), never for the core
"who is this by" relationship.

### Per-collection fields (in addition to shared)

- **artists** — `name`, `bio` (body), `landscapeImage`+alt, `links` (object: soundcloud,
  instagram, bandcamp, website…), optional `pressKit` reference.
- **releases** — `artists` (ref[]), `releaseDate`, `label catalog no.` (opt), `tracklist`
  (opt), `landscapeImage`+alt, streaming `links`, `coverImage` (square reuse ok).
- **mixes** — `artists` (ref[]), `soundcloudUrl` (now), `audioFile` (opt, reserved for
  self-hosting), `duration` (opt), `episodeNumber` (opt), `landscapeImage`+alt.
- **events** — `artists` (ref[]), `startDate`, `endDate` (opt), `venue`, `city`,
  `ticketUrl` (opt), `landscapeImage`+alt.
- **pressKits** — `artist` (ref, optional — omit for a label-wide kit), `assets` (array of
  downloadable files: label, file path/url, type), `contactEmail` (opt).
- **posts** (news) — `landscapeImage`+alt, body content; optional `artists` (ref[]).

## Homepage: featured hierarchy + mixed grid

Two curated regions (full spec in [docs/FEATURES.md](docs/FEATURES.md)):

1. **Featured hierarchy (no carousel):** one large landscape **hero banner** plus **two
   smaller adjacent landscape banners** below it, laid out with CSS grid and stacking on
   mobile. Selections are **explicitly curated** in `src/config/homepage.ts` (referencing
   entry slugs) — not auto-picked — for editorial control.
2. **Mixed-content grid:** square-image tiles aggregating **all** collection types, sorted
   chronologically by `date` (Ninja Tune style — news, releases, artist profiles, mixes,
   events mixed together). Built by a feed aggregator in `src/lib/` that maps each entry to
   a common shape `{ title, date, type, squareImage, squareImageAlt, href }`.

## Design system

Minimal, classy, retro. The logo is a line-art circular sun made of empty space on a grid
of horizontal lines; the logotype is a **rounded sans-serif**, so body type should
complement it (rounded/humanist sans).

Color tokens (CSS custom properties in `src/styles/global.css`, mirrored in Tailwind
theme). **These are placeholders the owner will tune — keep them as tokens, never hardcode
hex values in components:**

```css
--color-bg: #131313;   /* background */
--color-fg: #FEFBC2;   /* foreground / text */
```

Content imagery is intentionally bright and colorful to pop against the dark background.
Keep chrome (nav, type, lines) restrained so imagery leads.

## Accessibility rules (non-negotiable)

- **Alt text is required** in schemas for all images — no decorative-only content images.
- Use semantic HTML: real `<a>` for links (never clickable `<div>`s), one `<h1>` per page,
  logical heading order.
- **No carousels / auto-advancing content.**
- Honor `prefers-reduced-motion` for any transition or animation.
- Maintain visible focus states and sufficient color contrast (verify the bg/fg pair and
  any future tokens against WCAG AA).
- Provide text alternatives/labels for embedded media (mixes).

## Agent working rules

- **Plan in `sprints/`.** Pick up work from the active sprint file; add new ideas to
  `sprints/backlog.md`. Create new sprints from `sprints/_template.md`.
- **Update this file** when stack, structure, or conventions change.
- Add content by creating entries in the matching `src/content/<collection>/` folder with
  co-located images; never invent fields not in the schema without updating
  `content.config.ts` **and** this doc.
- Respect the design tokens and accessibility rules above in every UI change.
- Keep changes minimal and scoped to the requested work.
