import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(),
    heroTitle: z.string().optional(),
    heroCtaLabel: z.string().optional(),
    heroCtaHref: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    role: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    draft: z.boolean().default(false),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.url(),
        }),
      )
      .default([]),
  }),
});

const bside = defineCollection({
  loader: glob({ base: './src/content/bside', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    year: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    orientation: z.enum(['landscape', 'portrait', 'square', 'wide']).default('landscape'),
    order: z.number().int().default(0),
    draft: z.boolean().default(false),
  }),
});

const timeline = defineCollection({
  loader: glob({ base: './src/content/timeline', pattern: '**/*.md' }),
  schema: z.object({
    period: z.string(),
    title: z.string(),
    summary: z.string(),
    category: z.enum(['personal', 'work', 'project']),
    order: z.number().int(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    project: z.string().optional(),
  }),
});

export const collections = { pages, work, bside, timeline };
