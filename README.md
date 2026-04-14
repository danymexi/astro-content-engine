# Astro Content Engine

A production-ready, SEO-optimized content generation pipeline for Astro blogs. Generates bilingual articles (EN/IT) using Google Gemini, with automatic keyword targeting, internal linking, OG image generation, and scheduled publishing via GitHub Actions.

Built and battle-tested on [daniele-messi.com](https://daniele-messi.com).

## Features

- **AI-powered article generation** via Google Gemini 2.5 Flash (structured JSON output)
- **Bilingual support** — generates EN + IT versions simultaneously, or IT-only articles
- **SEO-first approach**:
  - Target keyword injection (title, headings, first paragraph)
  - Secondary keyword distribution
  - Auto-generated meta descriptions (120-155 chars)
  - Internal cross-linking between articles
  - External authority links to official docs
  - JSON-LD structured data (Article, Person, Breadcrumb)
  - Open Graph + Twitter Card meta tags
  - Hreflang for multilingual SEO
- **Topic queue system** — JSON-based editorial calendar with priorities and status tracking
- **Content clusters** — pillar/satellite architecture for topical authority
- **Auto-generated OG images** — 1200x630 PNG cards per post
- **LLM-friendly** — generates `llms.txt` and `llms-full.txt` for AI discoverability
- **GitHub Actions** — automated publishing 3x/week (Mon/Wed/Fri)
- **Affiliate-ready** — configurable product recommendations per cluster

## Quick Start

```bash
# Clone
git clone https://github.com/danymexi/astro-content-engine.git
cd astro-content-engine

# Install
npm install

# Configure
cp .env.example .env
# Edit .env with your GEMINI_API_KEY

# Generate your first article
node scripts/generate-article.mjs

# Or target a specific topic
node scripts/generate-article.mjs --topic-id=your-topic-id

# Build
npm run build

# Preview
npm run preview
```

## Project Structure

```
astro-content-engine/
├── scripts/
│   ├── generate-article.mjs    # Main content pipeline
│   ├── generate-post-og.mjs    # OG image generator
│   ├── generate-llms.mjs       # LLM context file generator
│   ├── retrofix-links.mjs      # Batch add inline links to existing posts
│   └── topic-queue.json        # Editorial calendar with keyword targets
├── src/
│   ├── content/
│   │   └── blog/
│   │       ├── en/             # English articles
│   │       └── it/             # Italian articles
│   ├── components/
│   │   ├── seo/                # JSON-LD components
│   │   └── blog/               # Blog UI components
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Master layout with full SEO meta
│   │   └── PostLayout.astro    # Article template with TOC
│   └── i18n/
│       └── translations.ts     # i18n strings
├── .github/
│   └── workflows/
│       └── generate-article.yml # Automated publishing
└── astro.config.mjs
```

## How It Works

### 1. Topic Queue

Define your content plan in `scripts/topic-queue.json`:

```json
{
  "topics": [
    {
      "id": "my-topic",
      "title_en": "Your Article Title",
      "title_it": "Il Tuo Titolo",
      "cluster": "your-cluster",
      "priority": 1,
      "target_keyword_en": "main keyword",
      "target_keyword_it": "parola chiave",
      "secondary_keywords": ["related", "terms"],
      "status": "pending",
      "generated_date": null
    }
  ]
}
```

### 2. Content Generation

The pipeline:
1. Picks the highest-priority pending topic from the queue
2. Generates an SEO-optimized article via Gemini (keyword-targeted)
3. Translates to Italian (or generates IT-only for Italian cluster)
4. Adds internal links to related cluster posts
5. Adds product recommendations (if configured)
6. Appends related articles section
7. Writes markdown files with full frontmatter
8. Marks topic as "generated" in the queue

### 3. Content Clusters

Articles are organized into clusters for topical authority:

```typescript
cluster: z.enum([
  'your-cluster-1',
  'your-cluster-2',
  // ...
]).optional()
```

The `RelatedPosts` component prioritizes same-cluster articles (+10 score boost).

### 4. Affiliate Integration

Configure product recommendations per cluster in `generate-article.mjs`:

```javascript
const AFFILIATE_TAG = 'your-tag';
const AFFILIATE_PRODUCTS = {
  'your-cluster': [
    { name: 'Product Name', search: 'search+terms', context_en: 'why this product', context_it: 'perche questo prodotto' },
  ],
};
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key |
| `GEMINI_MODEL` | No | Model name (default: `gemini-2.5-flash`) |

### Customization

1. **Languages** — modify `src/i18n/translations.ts` and `astro.config.mjs` i18n config
2. **Clusters** — update the enum in `src/content.config.ts`
3. **Styling** — Tailwind CSS classes throughout, fully customizable
4. **Affiliate** — edit `AFFILIATE_PRODUCTS` in `generate-article.mjs`
5. **Scheduling** — adjust cron in `.github/workflows/generate-article.yml`

### GitHub Actions Setup

Add `GEMINI_API_KEY` as a repository secret:
Settings → Secrets → Actions → New repository secret

The workflow runs Mon/Wed/Fri at 08:00 UTC by default.

## SEO Checklist

This template includes:

- [x] Semantic HTML with proper heading hierarchy
- [x] Meta title + description per page
- [x] Open Graph tags (title, description, image, type, locale)
- [x] Twitter Card tags (summary_large_image)
- [x] Canonical URLs
- [x] Hreflang tags for multilingual
- [x] JSON-LD structured data (Person, Article, Breadcrumb, WebSite)
- [x] XML sitemap with i18n alternates
- [x] robots.txt with AI bot allows
- [x] RSS feeds per language
- [x] Auto-generated OG images (1200x630)
- [x] `llms.txt` for LLM discoverability
- [x] Internal cross-linking via clusters
- [x] External authority links

## Tech Stack

- [Astro](https://astro.build) 6.x — static site generator
- [Tailwind CSS](https://tailwindcss.com) 4.x — styling
- [Google Gemini](https://ai.google.dev) — content generation
- [Zod](https://zod.dev) — content schema validation

## License

MIT — use it, fork it, build on it.

## Author

**Daniele Messi** — [daniele-messi.com](https://daniele-messi.com) · [LinkedIn](https://www.linkedin.com/in/danielemessi/) · [GitHub](https://github.com/danymexi)
