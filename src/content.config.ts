import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Shared frontmatter every collection contributes to the homepage mixed grid.
 * `image` is injected per-collection via the schema `image()` helper.
 */
const sharedFields = (image: SchemaContext['image']) => ({
  title: z.string(),
  date: z.coerce.date(),
  squareImage: image(),
  squareImageAlt: z.string(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

const links = z
  .object({
	website: z.url().optional(),
    instagram: z.url().optional(),
    bandcamp: z.url().optional(),
    soundcloud: z.url().optional(),
    spotify: z.url().optional(),
    appleMusic: z.url().optional(),
	youtube: z.url().optional(),
	twitch: z.url().optional(),
  })
  .partial()
  .default({});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artists' }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      name: z.string(),
      landscapeImage: image(),
      landscapeImageAlt: z.string(),
      links,
      pressKit: reference('pressKits').optional(),
    }),
});

const releases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/releases' }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      artists: z.array(reference('artists')).nonempty(),
      releaseDate: z.coerce.date(),
      catalogNumber: z.string().optional(),
      tracklist: z.array(z.string()).optional(),
      landscapeImage: image(),
      landscapeImageAlt: z.string(),
      links,
    }),
});

const mixes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/mixes' }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      artists: z.array(reference('artists')).nonempty(),
      // SoundCloud now; `audioFile` reserved for future self-hosting.
      soundcloudUrl: z.url(),
      soundcloudTrackId: z.string(),
      audioFile: z.string().optional(),
      duration: z.string().optional(),
      episodeNumber: z.number().optional(),
      landscapeImage: image(),
      landscapeImageAlt: z.string(),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      artists: z.array(reference('artists')).nonempty(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      venue: z.string(),
      city: z.string(),
      ticketUrl: z.url().optional(),
      landscapeImage: image(),
      landscapeImageAlt: z.string(),
    }),
});

const pressKits = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pressKits' }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      // Omit `artist` for a label-wide kit.
      artist: reference('artists').optional(),
      assets: z
        .array(
          z.object({
            label: z.string(),
            file: z.string(),
            type: z.string(),
          })
        )
        .default([]),
      contactEmail: z.email().optional(),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      ...sharedFields(image),
      landscapeImage: image(),
      landscapeImageAlt: z.string(),
      artists: z.array(reference('artists')).optional(),
    }),
});

export const collections = { artists, releases, mixes, events, pressKits, posts };
