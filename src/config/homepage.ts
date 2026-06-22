/**
 * Curated homepage featured hierarchy.
 *
 * Explicit editorial control — these are NOT auto-selected. Each value is a
 * `{ collection, slug }` pointing at a content entry. The referenced entry must
 * have a `landscapeImage` + `landscapeImageAlt`.
 *
 *   hero        → one large landscape banner
 *   subBanners  → two smaller landscape banners below the hero
 */

export type FeaturedRef = {
  collection: 'artists' | 'releases' | 'mixes' | 'events' | 'posts';
  slug: string;
};

export const homepage: {
  hero: FeaturedRef;
  subBanners: [FeaturedRef, FeaturedRef];
} = {
  hero: { collection: 'mixes', slug: 'medicated-radio-07' },
  subBanners: [
    { collection: 'releases', slug: 'first-release' },
    { collection: 'artists', slug: 'artist-one' },
  ],
};
