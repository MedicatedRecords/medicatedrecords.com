# Backlog

Running list of features and ideas not yet scheduled into a sprint. Roughly prioritized
top-to-bottom. Pull items into a sprint when ready.

## Near-term

- [ ] Per-artist press kit downloads (zip/PDF bundling)
- [ ] Mixed-grid filtering by `tags` (genre/mood/type)
- [ ] Past vs. upcoming split on the events page
- [ ] Open Graph / social share images per entry
- [ ] Sitemap + RSS feed (releases and mixes)
- [ ] Basic SEO meta + structured data (MusicAlbum / Event)

## Content & media

- [ ] Tracklist display + timestamps for mixes
- [ ] Streaming-link buttons (Spotify, Bandcamp, Apple Music) component

## Roadmap: self-hosted audio for mixes

Goal: replace SoundCloud embeds with self-hosted audio for better quality and an on-brand
player. The schema already reserves an `audioFile` field on the `mixes` collection, and the
`SoundCloudPlayer` component is intentionally swappable.

- [ ] Decide audio hosting + delivery (e.g. Vercel Blob / object storage + CDN; large files
      should NOT live in the git repo)
- [ ] Settle on format(s) + bitrate (e.g. 320kbps MP3, optional Opus) and a naming scheme
- [ ] Extend the `mixes` schema: make `audioFile` (URL) authoritative, keep `soundcloudUrl`
      optional as a fallback/secondary link
- [ ] Build an accessible custom `<AudioPlayer>` (native `<audio>` base: real controls,
      keyboard support, labelled, honors `prefers-reduced-motion`)
- [ ] Render `audioFile` when present, else fall back to the SoundCloud embed
- [ ] Backfill the 7 existing Medicated Radio episodes; verify on the mixes pages
- [ ] (Later) waveform/scrubbing, download option, and play-count analytics

## Site-wide

- [ ] Header logo recoloring: inline the logo SVG with `currentColor` so it tracks the
      `--color-fg` token (currently a flat-fill `#fefbc2` `<img>`); or, if a webfont license
      is obtained, switch the heading to live text styled with the logotype font
- [ ] Newsletter signup
- [ ] On-site search
- [ ] Analytics (privacy-friendly)
- [ ] Label-wide press page (in addition to per-artist kits)
- [ ] Theming pass once final colors are chosen
- [ ] Internationalization (if needed)

## Possible later

- [ ] Merch / e-commerce
- [ ] Headless CMS for non-technical editing
