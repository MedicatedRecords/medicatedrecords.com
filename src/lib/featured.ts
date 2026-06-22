import { getEntry } from 'astro:content';
import { hrefFor, typeMeta, type FeedType } from './feed';
import { homepage, type FeaturedRef } from '../config/homepage';

export type FeaturedItem = {
  title: string;
  href: string;
  typeLabel: string;
  landscapeImage: ImageMetadata;
  landscapeImageAlt: string;
};

const collectionToType: Record<FeaturedRef['collection'], FeedType> = {
  artists: 'artist',
  releases: 'release',
  mixes: 'mix',
  events: 'event',
  posts: 'post',
};

async function resolve(ref: FeaturedRef): Promise<FeaturedItem> {
  const entry = await getEntry(ref.collection, ref.slug);
  if (!entry) {
    throw new Error(
      `Homepage featured entry not found: ${ref.collection}/${ref.slug}. ` +
        `Check src/config/homepage.ts.`
    );
  }

  const type = collectionToType[ref.collection];
  const data = entry.data as {
    title: string;
    landscapeImage: ImageMetadata;
    landscapeImageAlt: string;
  };

  return {
    title: data.title,
    href: hrefFor(type, entry.id),
    typeLabel: typeMeta[type].label,
    landscapeImage: data.landscapeImage,
    landscapeImageAlt: data.landscapeImageAlt,
  };
}

/** Resolve the curated hero + two sub-banners from `src/config/homepage.ts`. */
export async function getFeatured(): Promise<{
  hero: FeaturedItem;
  subBanners: [FeaturedItem, FeaturedItem];
}> {
  const [hero, subA, subB] = await Promise.all([
    resolve(homepage.hero),
    resolve(homepage.subBanners[0]),
    resolve(homepage.subBanners[1]),
  ]);

  return { hero, subBanners: [subA, subB] };
}
