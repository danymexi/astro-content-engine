import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    updatedDate: z.string().optional(),
    lang: z.enum(['en', 'it']),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    readingTime: z.number().optional(),
    cluster: z.enum([
      'claude-code',
      'ai-agents-mcp',
      'proxmox',
      'prompt-engineering',
      'home-assistant',
      'ai-italiano',
    ]).optional(),
  }),
});

export const collections = { blog };
