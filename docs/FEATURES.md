# Feature Set — Medicated Records

The initial functional spec for the site. Pairs with [AGENTS.md](../AGENTS.md) (conventions
& content model) and the sprint files in [`/sprints`](../sprints). Scope here is the
**foundation**: model content, curate a homepage, and list each content type.

---

## 1. Content types

All content lives in Astro Content Collections (Markdown/MDX + frontmatter), with images
co-located per entry. Schemas are defined in `src/content.config.ts`.

### Shared fields (all collections)

| Field            | Type           | Required | Purpose                                  |
| ---------------- | -------------- | -------- | ---------------------------------------- |
| `title`          | string         | ✅       | Display title                            |
| `date`           | date           | ✅       | Chronological sort key for mixed grid    |
| `squareImage`    | image          | ✅       | 1:1 tile image                           |
| `squareImageAlt` | string         | ✅       | Alt text (accessibility)                 |
| `draft`          | boolean        | —        | Hide from production when `true`         |
| `tags`           | string[]       | —        | Cross-cutting discovery (genre, mood…)   |

### Artist relationships

`releases`, `mixes`, and `events` reference artists explicitly and type-safely:

```ts
artists: reference('artists').array()   // required, >= 1
```

- Supports **multiple artists** per item (e.g. the 7 mixes feature both artists).
- Enables artist pages to list **everything they appear on** (releases, mixes, events).
- `tags` are **not** used for this relationship — only for themes/genres.

### Per-collection fields

| Collection   | Adds                                                                                  |
| ------------ | ------------------------------------------------------------------------------------- |
| `artists`    | `name`, bio (body), `landscapeImage`+alt, `links{}`, optional `pressKit` ref          |
| `releases`   | `artists[]`, `releaseDate`, `catalogNumber?`, `tracklist?`, `landscapeImage`+alt, `links{}` |
| `mixes`      | `artists[]`, `soundcloudUrl`, `audioFile?` (future self-host), `duration?`, `episodeNumber?`, `landscapeImage`+alt |
| `events`     | `artists[]`, `startDate`, `endDate?`, `venue`, `city`, `ticketUrl?`, `landscapeImage`+alt |
| `pressKits`  | `artist?` (omit for label-wide), `assets[]` (label, file, type), `contactEmail?`      |
| `posts`      | body content, `landscapeImage`+alt, optional `artists[]`                               |

---

## 2. Homepage

### 2a. Featured hierarchy (no carousel)

Editorially curated, accessibility-first layout:

```
┌─────────────────────────────────────────┐
│                                         │
│            HERO  (landscape)            │   ← 1 large featured item
│                                         │
├──────────────────────┬──────────────────┤
│   SUB-BANNER A       │   SUB-BANNER B   │   ← 2 smaller featured items
│   (landscape)        │   (landscape)    │
└──────────────────────┴──────────────────┘
```

- Implemented with **CSS grid**; collapses to a single stacked column on mobile.
- Selections are **explicitly curated** in `src/config/homepage.ts`, referencing entry
  slugs (one `hero`, two `subBanners`). Not auto-selected — gives the label editorial
  control over what leads.
- Each featured item uses its `landscapeImage` + alt and links to its detail page.
- **No carousel, no auto-advance.** All three items are visible at once.

### 2b. Mixed-content chronological grid

Below the featured hierarchy — a unified feed of square tiles mixing **all** content types
in date order (inspired by Ninja Tune): news, releases, artist profiles, mixes, events
interleaved.

- A feed aggregator in `src/lib/feed.ts` loads every collection, maps each entry to a
  common shape, and sorts by `date` descending:

  ```ts
  type FeedItem = {
    title: string;
    date: Date;
    type: 'artist' | 'release' | 'mix' | 'event' | 'pressKit' | 'post';
    squareImage: ImageMetadata;
    squareImageAlt: string;
    href: string;
  };
  ```

- Tiles show the square image, a small type label, and title; the whole tile is a single
  semantic link. A future enhancement may add type filtering via `tags`.

---

## 3. Listing & detail pages

| Route                    | Purpose                                              |
| ------------------------ | ---------------------------------------------------- |
| `/`                      | Homepage (featured hierarchy + mixed grid)           |
| `/artists` `/artists/[slug]` | Artist index + profile (lists their releases/mixes/events) |
| `/releases` `/releases/[slug]` | Release index + detail (tracklist, streaming links) |
| `/mixes` `/mixes/[slug]` | Mix index + detail (SoundCloud embed)                |
| `/events` `/events/[slug]` | Upcoming/past events                                |
| `/press` `/press/[slug]` | Press kits (per-artist now; label-wide later)        |

Global layout provides header/nav (logo + primary links), footer, and shared `<head>`
(meta/OG). All pages inherit the design tokens and accessibility rules from
[AGENTS.md](../AGENTS.md).

---

## 4. Out of scope (for now)

Self-hosted audio pipeline, headless CMS, on-site search, newsletter signup, e-commerce,
analytics, and internationalization. Tracked in [`/sprints/backlog.md`](../sprints/backlog.md)
for future consideration.
