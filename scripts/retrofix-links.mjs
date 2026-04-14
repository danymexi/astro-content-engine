import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');

// External authority links - map keywords to official doc URLs
const EXTERNAL_LINKS = {
  en: [
    { pattern: /\bClaude Code\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://docs.anthropic.com/en/docs/claude-code', once: true },
    { pattern: /\bCLAUDE\.md\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://docs.anthropic.com/en/docs/claude-code/claude-md', once: true },
    { pattern: /\bModel Context Protocol\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://modelcontextprotocol.io', once: true },
    { pattern: /\bMCP server(?:s)?\b(?![^\[]*\])(?![^\(]*\))/i, url: 'https://modelcontextprotocol.io/introduction', once: true },
    { pattern: /\bHome Assistant\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://www.home-assistant.io', once: true },
    { pattern: /\bESPHome\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://esphome.io', once: true },
    { pattern: /\bProxmox VE\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://pve.proxmox.com/wiki/Main_Page', once: true },
    { pattern: /\bOllama\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://ollama.com', once: true },
    { pattern: /\bAnthropic\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://www.anthropic.com', once: true },
    { pattern: /\bLangChain\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://www.langchain.com', once: true },
    { pattern: /\bCrewAI\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://www.crewai.com', once: true },
  ],
  it: [
    { pattern: /\bClaude Code\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://docs.anthropic.com/en/docs/claude-code', once: true },
    { pattern: /\bCLAUDE\.md\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://docs.anthropic.com/en/docs/claude-code/claude-md', once: true },
    { pattern: /\bModel Context Protocol\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://modelcontextprotocol.io', once: true },
    { pattern: /\b[Ss]erver MCP\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://modelcontextprotocol.io/introduction', once: true },
    { pattern: /\bHome Assistant\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://www.home-assistant.io', once: true },
    { pattern: /\bESPHome\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://esphome.io', once: true },
    { pattern: /\bProxmox VE\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://pve.proxmox.com/wiki/Main_Page', once: true },
    { pattern: /\bOllama\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://ollama.com', once: true },
    { pattern: /\bAnthropic\b(?![^\[]*\])(?![^\(]*\))/, url: 'https://www.anthropic.com', once: true },
  ],
};

// Build internal link map from existing posts
function getPostMap(lang) {
  const dir = join(ROOT, 'src', 'content', 'blog', lang);
  const posts = [];
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const content = readFileSync(join(dir, f), 'utf-8');
    const titleMatch = content.match(/^title:\s*"(.+)"/m);
    const clusterMatch = content.match(/^cluster:\s*"(.+)"/m);
    if (titleMatch) {
      posts.push({
        slug: f.replace('.md', ''),
        title: titleMatch[1],
        cluster: clusterMatch ? clusterMatch[1] : null,
      });
    }
  }
  return posts;
}

// Keywords that should link to specific internal posts
function buildInternalLinkPatterns(lang, posts, currentSlug) {
  const patterns = [];
  for (const post of posts) {
    if (post.slug === currentSlug) continue;
    // Create keyword patterns based on post topics
    const title = post.title.toLowerCase();
    const slug = post.slug;
    const url = `/${lang}/blog/${slug}/`;

    // Map specific keywords to posts
    if (title.includes('hook')) {
      const kw = lang === 'it' ? 'hooks' : 'hooks';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('claude.md') || title.includes('claude-md')) {
      patterns.push({ keyword: 'CLAUDE.md', url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('sub-agent') || title.includes('sub agent')) {
      const kw = lang === 'it' ? 'sub-agent' : 'sub-agents';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('cursor') && title.includes('copilot')) {
      patterns.push({ keyword: 'Cursor', url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('mcp') && title.includes('security')) {
      const kw = lang === 'it' ? 'sicurezza MCP' : 'MCP security';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('mcp') && (title.includes('build') || title.includes('costrui'))) {
      const kw = lang === 'it' ? 'costruire un server MCP' : 'build an MCP server';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('context engineering')) {
      patterns.push({ keyword: 'context engineering', url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('ollama') && title.includes('proxmox')) {
      patterns.push({ keyword: 'Ollama', url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('prompt') && title.includes('testing')) {
      const kw = lang === 'it' ? 'test dei prompt' : 'prompt testing';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('solar') || title.includes('solare')) {
      const kw = lang === 'it' ? 'automazione solare' : 'solar automation';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('ev charging') || title.includes('ricarica')) {
      const kw = lang === 'it' ? 'ricarica EV' : 'EV charging';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('home assistant') && title.includes('proxmox')) {
      const kw = lang === 'it' ? 'Home Assistant su Proxmox' : 'Home Assistant on Proxmox';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
    if (title.includes('prompt engineering') && !title.includes('context') && !title.includes('testing')) {
      const kw = 'prompt engineering';
      patterns.push({ keyword: kw, url, title: post.title, cluster: post.cluster });
    }
  }
  return patterns;
}

function addInternalLinks(content, patterns, maxLinks = 3) {
  let linksAdded = 0;
  const lines = content.split('\n');
  const result = [];

  for (const line of lines) {
    // Skip frontmatter, headings, code blocks, lines that already have links
    if (line.startsWith('---') || line.startsWith('#') || line.startsWith('```') || 
        line.startsWith('- **[') || line.includes('](') || line.trim() === '') {
      result.push(line);
      continue;
    }

    let modified = line;
    for (const p of patterns) {
      if (linksAdded >= maxLinks) break;
      // Case-insensitive search, but only if not already in a link
      const regex = new RegExp(`\\b(${p.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?![^\\[]*\\])(?![^\\(]*\\))`, 'i');
      if (regex.test(modified)) {
        modified = modified.replace(regex, `[$1](${p.url})`);
        linksAdded++;
        // Remove this pattern so we don't link it again
        patterns.splice(patterns.indexOf(p), 1);
        break; // One link per line max
      }
    }
    result.push(modified);
  }

  return { content: result.join('\n'), linksAdded };
}

function addExternalLinks(content, lang) {
  const links = EXTERNAL_LINKS[lang] || [];
  let linksAdded = 0;
  const lines = content.split('\n');
  const result = [];
  const usedUrls = new Set();

  // Collect already-used URLs
  const existingUrls = content.match(/\]\((https?:\/\/[^\)]+)\)/g) || [];
  for (const m of existingUrls) {
    const url = m.match(/\((https?:\/\/[^\)]+)\)/);
    if (url) usedUrls.add(url[1]);
  }

  for (const line of lines) {
    if (line.startsWith('---') || line.startsWith('#') || line.startsWith('```') ||
        line.startsWith('- **[') || line.trim() === '') {
      result.push(line);
      continue;
    }

    let modified = line;
    for (const link of links) {
      if (link.once && usedUrls.has(link.url)) continue;
      if (linksAdded >= 3) break;
      
      if (link.pattern.test(modified)) {
        modified = modified.replace(link.pattern, `[$&](${link.url})`);
        usedUrls.add(link.url);
        linksAdded++;
        link.once = false; // Mark as used
        break;
      }
    }
    result.push(modified);
  }

  return { content: result.join('\n'), linksAdded };
}

// Main
let totalUpdated = 0;
for (const lang of ['en', 'it']) {
  const posts = getPostMap(lang);
  const dir = join(ROOT, 'src', 'content', 'blog', lang);

  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const fp = join(dir, f);
    let content = readFileSync(fp, 'utf-8');
    const slug = f.replace('.md', '');

    // Split frontmatter from body
    const parts = content.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
    if (!parts) continue;
    const frontmatter = parts[1];
    let body = parts[2];

    // Count existing inline links (not in Related/Recommended sections)
    const mainBody = body.split(/## (?:Related Articles|Articoli Correlati|Recommended Gear|Prodotti Consigliati)/)[0];
    const existingLinks = (mainBody.match(/\]\(/g) || []).length;
    
    // Skip if already has 3+ inline links
    if (existingLinks >= 3) {
      continue;
    }

    const internalPatterns = buildInternalLinkPatterns(lang, posts, slug);
    
    // Add internal links first
    const internal = addInternalLinks(body, internalPatterns, 3 - existingLinks);
    body = internal.content;

    // Add external links
    const external = addExternalLinks(body, lang);
    body = external.content;

    if (internal.linksAdded > 0 || external.linksAdded > 0) {
      writeFileSync(fp, frontmatter + body);
      console.log(`${lang}/${f}: +${internal.linksAdded} internal, +${external.linksAdded} external`);
      totalUpdated++;
    }
  }
}
console.log(`\nTotal files updated: ${totalUpdated}`);
