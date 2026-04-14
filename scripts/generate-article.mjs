import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY environment variable is required');
  process.exit(1);
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
const ROOT = join(import.meta.dirname, '..');
const QUEUE_PATH = join(import.meta.dirname, 'topic-queue.json');
const AMAZON_TAG = 'your-affiliate-tag';

// Amazon product suggestions by cluster
const AMAZON_PRODUCTS = {
  'proxmox': [
    { name: 'Beelink Mini PC (Intel N100)', search: 'Beelink+Mini+PC+N100', context_en: 'mini PC for Proxmox home lab', context_it: 'mini PC per home lab Proxmox' },
    { name: 'Samsung 870 EVO SSD 1TB', search: 'Samsung+870+EVO+1TB', context_en: 'SSD for VM storage', context_it: 'SSD per storage VM' },
    { name: 'Crucial RAM 32GB DDR4', search: 'Crucial+32GB+DDR4+SODIMM', context_en: 'RAM upgrade for virtualization', context_it: 'upgrade RAM per virtualizzazione' },
    { name: 'TP-Link 2.5G Ethernet Switch', search: 'TP-Link+2.5G+switch', context_en: '2.5GbE switch for lab networking', context_it: 'switch 2.5GbE per il lab' },
  ],
  'home-assistant': [
    { name: 'Sonoff Zigbee 3.0 USB Dongle', search: 'Sonoff+Zigbee+3.0+dongle', context_en: 'Zigbee coordinator for Home Assistant', context_it: 'coordinatore Zigbee per Home Assistant' },
    { name: 'Shelly Plus 1PM', search: 'Shelly+Plus+1PM', context_en: 'smart relay with energy monitoring', context_it: 'relè smart con monitoraggio energia' },
    { name: 'ESP32 Development Board', search: 'ESP32+development+board', context_en: 'ESP32 board for ESPHome sensors', context_it: 'scheda ESP32 per sensori ESPHome' },
    { name: 'Aqara Temperature Sensor', search: 'Aqara+temperature+sensor+Zigbee', context_en: 'Zigbee temperature/humidity sensor', context_it: 'sensore temperatura/umidità Zigbee' },
    { name: 'Beelink Mini PC (Intel N100)', search: 'Beelink+Mini+PC+N100', context_en: 'mini PC to run Home Assistant', context_it: 'mini PC per Home Assistant' },
  ],
  'claude-code': [
    { name: 'Logitech MX Keys S', search: 'Logitech+MX+Keys+S', context_en: 'keyboard for productive coding sessions', context_it: 'tastiera per sessioni di coding produttive' },
    { name: 'Samsung 49" Ultra-Wide Monitor', search: 'Samsung+49+ultrawide+monitor', context_en: 'ultra-wide monitor for side-by-side coding', context_it: 'monitor ultra-wide per coding side-by-side' },
  ],
  'ai-agents-mcp': [],
  'prompt-engineering': [],
  'ai-italiano': [],
};

function getAmazonLink(product) {
  return `https://www.amazon.it/s?k=${product.search}&linkCode=ll2&tag=${AMAZON_TAG}`;
}

function buildAmazonSection(cluster, lang) {
  const products = AMAZON_PRODUCTS[cluster] || [];
  if (products.length === 0) return '';
  const heading = lang === 'it' ? '## Prodotti Consigliati' : '## Recommended Gear';
  const intro = lang === 'it'
    ? "Se stai costruendo il tuo setup, ecco l'hardware che consiglio:"
    : "If you're building your own setup, here's the hardware I recommend:";
  const items = products.map(p => {
    const ctx = lang === 'it' ? p.context_it : p.context_en;
    return `- **[${p.name}](${getAmazonLink(p)})** — ${ctx}`;
  }).join('\n');
  return `${heading}\n\n${intro}\n\n${items}\n`;
}

function buildExistingPostsContext(lang) {
  const posts = getExistingPostTitles(lang);
  if (posts.length === 0) return '';
  return posts.map(p => `- "${p.title}" -> /${lang}/blog/${p.slug}/`).join('\n');
}

function getSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getExistingPosts(lang) {
  const dir = join(ROOT, 'src', 'content', 'blog', lang);
  try {
    return readdirSync(dir).map(f => f.replace('.md', ''));
  } catch {
    return [];
  }
}

function getExistingPostTitles(lang) {
  const dir = join(ROOT, 'src', 'content', 'blog', lang);
  const titles = [];
  try {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const content = readFileSync(join(dir, f), 'utf-8');
      const match = content.match(/^title:\s*"(.+)"/m);
      if (match) titles.push({ slug: f.replace('.md', ''), title: match[1], lang });
    }
  } catch {}
  return titles;
}

function loadQueue() {
  return JSON.parse(readFileSync(QUEUE_PATH, 'utf-8'));
}

function saveQueue(queue) {
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + '\n');
}

function pickTopic(queue, topicId) {
  if (topicId) {
    const topic = queue.topics.find(t => t.id === topicId);
    if (!topic) throw new Error(`Topic "${topicId}" not found in queue`);
    if (topic.status === 'generated') throw new Error(`Topic "${topicId}" already generated`);
    return topic;
  }
  const pending = queue.topics
    .filter(t => t.status === 'pending')
    .sort((a, b) => a.priority - b.priority);
  if (pending.length === 0) throw new Error('No pending topics in queue');
  return pending[0];
}

function buildInternalLinks(cluster, lang) {
  const posts = getExistingPostTitles(lang);
  return posts
    .filter(p => {
      const filePath = join(ROOT, 'src', 'content', 'blog', lang, `${p.slug}.md`);
      try {
        const content = readFileSync(filePath, 'utf-8');
        return content.includes(`cluster: "${cluster}"`);
      } catch {
        return false;
      }
    })
    .map(p => `- [${p.title}](/${lang}/blog/${p.slug}/)`)
    .join('\n');
}

async function callGeminiJSON(prompt, schema, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 16384,
          responseMimeType: 'application/json',
          responseSchema: schema,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      if (attempt < retries && (res.status === 503 || res.status === 429)) {
        console.log(`API error ${res.status}, retrying in 10s (attempt ${attempt}/${retries})...`);
        await new Promise(r => setTimeout(r, 10000));
        continue;
      }
      throw new Error(`Gemini API error ${res.status}: ${err}`);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini: ' + JSON.stringify(data));
    try {
      return JSON.parse(text);
    } catch (e) {
      if (attempt < retries) {
        console.log(`JSON parse error, retrying (attempt ${attempt}/${retries})...`);
        continue;
      }
      throw e;
    }
  }
}

const ARTICLE_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'SEO-friendly title, max 70 chars. Must contain the target keyword.' },
    description: { type: 'string', description: 'Meta description, 120-155 chars. Must contain the target keyword naturally.' },
    readingTime: { type: 'integer', description: 'Estimated reading time in minutes' },
    tags: { type: 'array', items: { type: 'string' }, description: '3-5 relevant topic tags for related-posts matching' },
    content: { type: 'string', description: 'Full article in markdown, starting with ## heading. No frontmatter, no # title.' },
  },
  required: ['title', 'description', 'readingTime', 'tags', 'content'],
};

const TRANSLATION_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Italian translation of the title, max 70 chars' },
    description: { type: 'string', description: 'Italian meta description, 120-155 chars' },
    content: { type: 'string', description: 'Italian translation of the full markdown article' },
  },
  required: ['title', 'description', 'content'],
};

const IT_ARTICLE_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'SEO-friendly Italian title, max 70 chars. Must contain the target keyword.' },
    description: { type: 'string', description: 'Italian meta description, 120-155 chars. Must contain the target keyword.' },
    readingTime: { type: 'integer', description: 'Estimated reading time in minutes' },
    tags: { type: 'array', items: { type: 'string' }, description: '3-5 relevant topic tags' },
    content: { type: 'string', description: 'Full article in Italian markdown, starting with ## heading. No frontmatter, no # title.' },
  },
  required: ['title', 'description', 'readingTime', 'tags', 'content'],
};

function addRelatedSection(content, cluster, lang) {
  let extra = '';

  // Amazon product recommendations
  const amazonSection = buildAmazonSection(cluster, lang);
  if (amazonSection) extra += '\n\n' + amazonSection;

  // Related articles from same cluster
  const links = buildInternalLinks(cluster, lang);
  if (links) {
    const heading = lang === 'it' ? '## Articoli Correlati' : '## Related Articles';
    extra += '\n\n' + heading + '\n\n' + links + '\n';
  }

  return extra ? content.trim() + extra : content;
}

async function generateArticle(topic) {
  const today = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const existingEn = getExistingPosts('en');
  const existingIt = getExistingPosts('it');
  const isItalianOnly = topic.title_en === null;

  console.log(`\nGenerating: ${topic.title_it || topic.title_en} [${topic.cluster}] (priority ${topic.priority})`);

  const escapeYaml = (s) => s.replace(/"/g, '\\"');

  const existingPostsEN = buildExistingPostsContext('en');
  const existingPostsIT = buildExistingPostsContext('it');

  const linkInstructions = (lang) => {
    const posts = lang === 'it' ? existingPostsIT : existingPostsEN;
    const extSources = {
      'claude-code': 'docs.anthropic.com, claude.ai/docs',
      'ai-agents-mcp': 'modelcontextprotocol.io, docs.anthropic.com',
      'proxmox': 'pve.proxmox.com/wiki, ollama.com',
      'prompt-engineering': 'docs.anthropic.com/en/docs/build-with-claude/prompt-engineering',
      'home-assistant': 'home-assistant.io/docs, esphome.io',
      'ai-italiano': 'docs.anthropic.com, home-assistant.io/docs',
    }[topic.cluster] || '';

    return `
LINKING RULES (critical for SEO):
- Add 2-4 inline markdown links to other articles on the blog where naturally relevant. Here are the existing posts:
${posts}
- Add 2-3 links to authoritative external sources (official docs, e.g. ${extSources}). Use real URLs to official documentation pages.
- Links must be contextual and natural, not forced. Link relevant phrases, not "click here".`;
  };

  if (isItalianOnly) {
    const it = await callGeminiJSON(
      `Write a comprehensive, practical blog article in Italian about "${topic.title_it}" for a tech-savvy Italian audience.

The current year is ${currentYear}. If you reference any year in the title, content, or examples, it MUST be ${currentYear} or later.

TARGET KEYWORD: "${topic.target_keyword_it}" — this MUST appear in the title, at least one ## heading, the first paragraph, and naturally 3-5 more times throughout.
SECONDARY KEYWORDS: ${topic.secondary_keywords.join(', ')} — weave these naturally into subheadings and body text.
${linkInstructions('it')}

Requirements:
- 800-1500 words
- Include code examples where relevant (use markdown code fences with language tags)
- Clear sections with ## headings (no # title)
- Practical and actionable, not theoretical
- Brief introduction and conclusion
- Professional but approachable Italian tone
- SEO-optimized: target keyword in title, headings, first paragraph
- If you include a year in the title it MUST be ${currentYear}

Return JSON with: title, description (120-155 chars), readingTime, tags (3-5), content (markdown body starting with ## heading).`,
      IT_ARTICLE_SCHEMA
    );

    const itSlug = getSlug(it.title);
    if (existingIt.includes(itSlug)) {
      console.log(`Article "${itSlug}" already exists in IT, skipping.`);
      return false;
    }

    const tags = Array.isArray(it.tags) && it.tags.length >= 3 ? it.tags.slice(0, 5) : ['AI', 'Tutorial'];
    const contentWithLinks = addRelatedSection(it.content, topic.cluster, 'it');

    const itFrontmatter = `---
title: "${escapeYaml(it.title)}"
description: "${escapeYaml(it.description)}"
date: "${today}"
lang: it
cluster: "${topic.cluster}"
tags: ${JSON.stringify(tags)}
readingTime: ${it.readingTime}
---

${contentWithLinks.trim()}
`;

    const itPath = join(ROOT, 'src', 'content', 'blog', 'it', `${itSlug}.md`);
    writeFileSync(itPath, itFrontmatter);
    console.log(`Written: ${itPath}`);

  } else {
    const keywordInstructions = topic.target_keyword_en
      ? `TARGET KEYWORD: "${topic.target_keyword_en}" — this MUST appear in the title, at least one ## heading, the first paragraph, and naturally 3-5 more times throughout.
SECONDARY KEYWORDS: ${topic.secondary_keywords.join(', ')} — weave these naturally into subheadings and body text.`
      : '';

    const en = await callGeminiJSON(
      `Write a comprehensive, practical blog article about "${topic.title_en}" for a tech-savvy audience.

The current year is ${currentYear}. If you reference any year in the title, content, or examples, it MUST be ${currentYear} or later.

${keywordInstructions}
${linkInstructions('en')}

Requirements:
- 800-1500 words
- Include code examples where relevant (use markdown code fences with language tags)
- Clear sections with ## headings (no # title — that becomes the frontmatter title)
- Practical and actionable, not theoretical
- Brief introduction and conclusion
- Professional but approachable tone
- SEO-optimized: use the main keyword naturally in headings and first paragraph
- If you include a year in the title it MUST be ${currentYear}

Return JSON with: title, description (120-155 chars), readingTime, tags (3-5), content (markdown body starting with ## heading).`,
      ARTICLE_SCHEMA
    );

    const enSlug = getSlug(en.title);
    console.log(`EN title: ${en.title} (slug: ${enSlug})`);

    if (existingEn.includes(enSlug)) {
      console.log(`Article "${enSlug}" already exists in EN, skipping.`);
      return false;
    }

    const itKeywordInstructions = topic.target_keyword_it
      ? `The Italian version MUST include the keyword "${topic.target_keyword_it}" naturally in the title and content.`
      : '';

    const it = await callGeminiJSON(
      `Translate the following blog article into Italian. Keep the same structure, code examples, and technical terms. Adapt the tone for an Italian audience while staying professional and approachable.

${itKeywordInstructions}

Return JSON with: title (Italian, max 70 chars), description (Italian meta description, 120-155 chars), content (Italian markdown body).

Original title: ${en.title}
Original description: ${en.description}

Original content:

${en.content}`,
      TRANSLATION_SCHEMA
    );

    const itSlug = getSlug(it.title);
    console.log(`IT title: ${it.title} (slug: ${itSlug})`);

    const tags = Array.isArray(en.tags) && en.tags.length >= 3 ? en.tags.slice(0, 5) : ['AI', 'Tutorial'];
    const enContentWithLinks = addRelatedSection(en.content, topic.cluster, 'en');
    const itContentWithLinks = addRelatedSection(it.content, topic.cluster, 'it');

    const enFrontmatter = `---
title: "${escapeYaml(en.title)}"
description: "${escapeYaml(en.description)}"
date: "${today}"
lang: en
cluster: "${topic.cluster}"
tags: ${JSON.stringify(tags)}
readingTime: ${en.readingTime}
---

${enContentWithLinks.trim()}
`;

    const enPath = join(ROOT, 'src', 'content', 'blog', 'en', `${enSlug}.md`);
    writeFileSync(enPath, enFrontmatter);
    console.log(`Written: ${enPath}`);

    const itFrontmatter = `---
title: "${escapeYaml(it.title)}"
description: "${escapeYaml(it.description)}"
date: "${today}"
lang: it
cluster: "${topic.cluster}"
tags: ${JSON.stringify(tags)}
readingTime: ${en.readingTime}
---

${itContentWithLinks.trim()}
`;

    const itPath = join(ROOT, 'src', 'content', 'blog', 'it', `${itSlug}.md`);
    writeFileSync(itPath, itFrontmatter);
    console.log(`Written: ${itPath}`);
  }

  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const topicIdArg = args.find(a => a.startsWith('--topic-id='));
  const topicId = topicIdArg ? topicIdArg.split('=')[1] : null;

  const queue = loadQueue();
  const topic = pickTopic(queue, topicId);

  const success = await generateArticle(topic);

  if (success) {
    topic.status = 'generated';
    topic.generated_date = new Date().toISOString().split('T')[0];
    saveQueue(queue);
    console.log(`\nTopic "${topic.id}" marked as generated in queue.`);
  }

  console.log('\nArticle generation complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
