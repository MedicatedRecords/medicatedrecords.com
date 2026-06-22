import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

const visible = <T extends { data: { draft: boolean } }>(entry: T): boolean =>
  import.meta.env.DEV || !entry.data.draft;

/** Resolve an array of artist references into `{ id, name }` for credits. */
export async function getArtistCredits(
  refs: { collection: 'artists'; id: string }[]
): Promise<{ id: string; name: string }[]> {
  const entries = await Promise.all(refs.map((ref) => getEntry(ref)));
  return entries
    .filter((e): e is CollectionEntry<'artists'> => Boolean(e))
    .map((e) => ({ id: e.id, name: e.data.name }));
}

type Referencing =
  | CollectionEntry<'releases'>
  | CollectionEntry<'mixes'>
  | CollectionEntry<'events'>;

const byDateDesc = (a: Referencing, b: Referencing) =>
  b.data.date.getTime() - a.data.date.getTime();

const mentionsArtist = (entry: Referencing, artistId: string): boolean =>
  entry.data.artists.some((ref) => ref.id === artistId);

/** Everything a given artist appears on, grouped by collection. */
export async function getArtistRelated(artistId: string): Promise<{
  releases: CollectionEntry<'releases'>[];
  mixes: CollectionEntry<'mixes'>[];
  events: CollectionEntry<'events'>[];
}> {
  const [releases, mixes, events] = await Promise.all([
    getCollection('releases', visible),
    getCollection('mixes', visible),
    getCollection('events', visible),
  ]);

  return {
    releases: releases.filter((e) => mentionsArtist(e, artistId)).sort(byDateDesc),
    mixes: mixes.filter((e) => mentionsArtist(e, artistId)).sort(byDateDesc),
    events: events.filter((e) => mentionsArtist(e, artistId)).sort(byDateDesc),
  };
}
