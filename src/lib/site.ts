import { z } from 'astro/zod';
import data from '../data/site.json';

const siteSchema = z.object({
  displayName: z.string(),
  shortName: z.string(),
  headline: z.string(),
  description: z.string(),
  email: z.email(),
  location: z.string(),
  availability: z.string(),
  resume: z.string(),
  socialImage: z.string(),
  socials: z.array(
    z.object({
      label: z.string(),
      url: z.url(),
    }),
  ),
});

export const site = siteSchema.parse(data);
