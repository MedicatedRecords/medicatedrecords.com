import { getCollection, type CollectionEntry } from 'astro:content';

export type FeedType =
  | 'artist'
  | 'release'
  | 'mix'
  | 'event'
  | 'pressKit'
  | 'post';

export type FeedItem = {
  id: string;
  title: string;
  date: Date;
  type: FeedType;
  typeLabel: string;
  squareImage: ImageMetadata;
  squareImageAlt: string;
  href: string;
};

/** Per-type display label + route base. Single source for linking/labelling. */
export const typeMeta: Record<FeedType, { label: string; base: string }> = {
  artist: { label: 'Artist', base: '/artists' },
  release: { label: 'Release', base: '/releases' },
  mix: { label: 'Mix', base: '/mixes' },
  event: { label: 'Event', base: '/events' },
  pressKit: { label: 'Press', base: '/press' },
  post: { label: 'News', base: '/news' },
};

export function hrefFor(type: FeedType, slug: string): string {
  return `${typeMeta[type].base}/${slug}`;
}

/** Drop drafts in production; keep them while developing. */
const visible = <T extends { data: { draft: boolean } }>(entry: T): boolean =>
  import.meta.env.DEV || !entry.data.draft;

type AnyEntry =
  | CollectionEntry<'artists'>
  | CollectionEntry<'releases'>
  | CollectionEntry<'mixes'>
  | CollectionEntry<'events'>
  | CollectionEntry<'posts'>;

function toFeedItem(type: FeedType, entry: AnyEntry): FeedItem {
  return {
    id: `${type}:${entry.id}`,
    title: entry.data.title,
    date: entry.data.date,
    type,
    typeLabel: typeMeta[type].label,
    squareImage: entry.data.squareImage,
    squareImageAlt: entry.data.squareImageAlt,
    href: hrefFor(type, entry.id),
  };
}

/**
 * Aggregate every collection into a single chronological feed of square tiles
 * (Ninja Tune style). Press kits are intentionally excluded from the mixed grid.
 */
export async function getFeed(): Promise<FeedItem[]> {
  const [artists, releases, mixes, events, posts] = await Promise.all([
    getCollection('artists', visible),
    getCollection('releases', visible),
    getCollection('mixes', visible),
    getCollection('events', visible),
    getCollection('posts', visible),
  ]);

  const items: FeedItem[] = [
    ...artists.map((e) => toFeedItem('artist', e)),
    ...releases.map((e) => toFeedItem('release', e)),
    ...mixes.map((e) => toFeedItem('mix', e)),
    ...events.map((e) => toFeedItem('event', e)),
    ...posts.map((e) => toFeedItem('post', e)),
  ];

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}
