# Sprint 03 — Branding

- **Status:** Done
- **Started:** 2026-06-22
- **Completed:** 2026-06-22

## Goal

Drop in the exported logo artwork, add the label's Instagram, and fix the cramped
copyright glyph in the footer.

## Scope

In scope:
- Replace the header logo (inline mark + text) with the exported `medicated_records_logo.svg`.
- Add an Instagram link (label account, temporary handle).
- Fix the tiny `©` by removing `font-mono` from the footer text.

Out of scope:
- Final color/token tuning; real artist bios + imagery (carried from sprint-02).

## Tasks

- [x] Use `public/medicated_records_logo.svg` as the header logo
- [x] Add Instagram → https://www.instagram.com/medicatedradio (until the medicatedrecords account is live)
- [x] Remove `font-mono` from both footer text blocks (fixes small `©`)
- [x] `npm run check` + `npm run build` clean

## Acceptance criteria

- [x] Header shows the exported logotype, linking home, with accessible alt text
- [x] Footer lists SoundCloud + Instagram
- [x] Copyright line renders in the sans font at a comfortable size
- [x] Build + type-check pass

## Log

- 2026-06-22 — Sprint opened.
- 2026-06-22 — Header now uses `medicated_records_logo.svg` (`<img>`, alt "Medicated
  Records", `h-7 sm:h-8`), replacing the inline mark + wordmark. Added Instagram to the
  footer social list. Removed `font-mono` from both footer blocks so the `©` renders in
  Space Grotesk at a comfortable size. `Logo.astro` is now unused but left in place for
  potential reuse. Check + build clean (0/0/0, 20 pages).

## Outcomes

> Branding pass shipped: exported logotype in the header, Instagram link added, footer
> copyright legibility fixed. `Logo.astro` retained but unreferenced.
