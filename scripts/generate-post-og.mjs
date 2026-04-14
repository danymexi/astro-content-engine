import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, 'src/content/blog');
const OUT_DIR = join(ROOT, 'public/og');
const LANGS = ['en', 'it'];

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;' }[c]));
}

function wrapTitle(title, maxCharsPerLine = 32, maxLines = 4) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const candidate = cur ? cur + ' ' + w : w;
    if (candidate.length > maxCharsPerLine && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length === maxLines - 1) break;
    } else {
      cur = candidate;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  // If we truncated, ellipsize last
  const joined = lines.join(' ');
  if (joined.length < title.length) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = (last.length > maxCharsPerLine - 1 ? last.slice(0, maxCharsPerLine - 1) : last) + '…';
  }
  return lines;
}

function buildSvg({ title, date, lang }) {
  const lines = wrapTitle(title);
  const startY = 240;
  const lineH = 92;
  const titleTspans = lines.map((l, i) => {
    const y = startY + i * lineH;
    const last = i === lines.length - 1;
    return `<text x="60" y="${y}" font-family="'Inter Tight','Inter',system-ui,sans-serif" font-weight="900" font-size="76" letter-spacing="-3" fill="#1A1A1A">${escapeXml(l)}${last ? '<tspan fill="#FF5B1F">.</tspan>' : ''}</text>`;
  }).join('\n');
  const badge = `${date} · ${lang.toUpperCase()}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFF8F0"/>
  <rect x="60" y="110" width="44" height="6" fill="#FF5B1F"/>
  <text x="60" y="90" font-family="'JetBrains Mono',ui-monospace,monospace" font-size="22" fill="#5C4A3A" letter-spacing="2">— DANIELE MESSI · WRITING</text>
  ${titleTspans}
  <line x1="60" y1="560" x2="1140" y2="560" stroke="#1A1A1A" stroke-width="2"/>
  <text x="60" y="595" font-family="'JetBrains Mono',ui-monospace,monospace" font-size="18" fill="#5C4A3A">${escapeXml(badge)}</text>
  <text x="1140" y="595" text-anchor="end" font-family="'JetBrains Mono',ui-monospace,monospace" font-size="18" fill="#5C4A3A">DANIELE-MESSI.COM</text>
</svg>`;
}

let generated = 0, skipped = 0;

for (const lang of LANGS) {
  const dir = join(BLOG_DIR, lang);
  if (!existsSync(dir)) continue;
  const outLangDir = join(OUT_DIR, lang);
  mkdirSync(outLangDir, { recursive: true });
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const src = join(dir, file);
    const slug = file.replace(/\.md$/, '');
    const outPath = join(outLangDir, `${slug}.png`);
    const srcMtime = statSync(src).mtimeMs;
    if (existsSync(outPath) && statSync(outPath).mtimeMs >= srcMtime) {
      skipped++;
      continue;
    }
    const raw = readFileSync(src, 'utf8');
    const { data } = matter(raw);
    const title = data.title || slug;
    const date = data.date || '';
    const svg = buildSvg({ title, date, lang });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    writeFileSync(outPath, png);
    generated++;
  }
}

console.log(`Generated ${generated} / skipped ${skipped} OG images`);
