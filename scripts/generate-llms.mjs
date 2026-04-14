import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, 'src/content/blog');
const TPL = join(ROOT, 'public/llms.txt.tpl');
const OUT = join(ROOT, 'public/llms.txt');
const OUT_FULL = join(ROOT, 'public/llms-full.txt');
const SITE = 'https://daniele-messi.com';

function loadPosts(lang) {
  const dir = join(BLOG_DIR, lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf8');
      const { data, content } = matter(raw);
      const slug = f.replace(/\.md$/, '');
      return { slug, lang, data, content };
    })
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
}

const en = loadPosts('en');
const it = loadPosts('it');

const tpl = existsSync(TPL) ? readFileSync(TPL, 'utf8') : '';

function section(title, posts) {
  const lines = [`\n## ${title}\n`];
  for (const p of posts) {
    const url = `${SITE}/${p.lang}/blog/${p.slug}/`;
    lines.push(`- [${p.data.title}](${url}) — ${p.data.description || ''}`);
  }
  return lines.join('\n');
}

const articlesSection =
  section('Articles (English)', en) + '\n' + section('Articles (Italian)', it) + '\n';

writeFileSync(OUT, tpl.trimEnd() + '\n' + articlesSection);

// llms-full.txt: full bodies per article
function fullSection(title, posts) {
  const parts = [`\n## ${title}\n`];
  for (const p of posts) {
    const url = `${SITE}/${p.lang}/blog/${p.slug}/`;
    parts.push(`\n### ${p.data.title}\n`);
    parts.push(`URL: ${url}`);
    parts.push(`Date: ${p.data.date}`);
    if (p.data.tags) parts.push(`Tags: ${p.data.tags.join(', ')}`);
    if (p.data.description) parts.push(`\n> ${p.data.description}\n`);
    parts.push(p.content.trim());
    parts.push('\n---\n');
  }
  return parts.join('\n');
}

const fullContent =
  tpl.trimEnd() +
  '\n' +
  fullSection('Articles (English) — Full Text', en) +
  '\n' +
  fullSection('Articles (Italian) — Full Text', it) +
  '\n';

writeFileSync(OUT_FULL, fullContent);

console.log(`Wrote llms.txt (${en.length} EN + ${it.length} IT) and llms-full.txt`);
