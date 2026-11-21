// Post-build checks for the static export in ./out. Run with `npm run verify` after `npm run build`.
// Fails (exit 1) if a placeholder reaches the build, a page lacks a self-referencing canonical,
// the sitemap points at pages that do not exist, JSON-LD is invalid, or crawl files are missing.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = new URL('../out/', import.meta.url).pathname;
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.samori.co.uk').replace(/\/$/, '');
const PLACEHOLDER = /REPLACE_WITH|example-affiliate-network|Placeholder verdict|not yet confirmed|>TBD<|\bTBD\b/i;
const BLOCKED_SLUGS = ['neo2', 'lito1', 'mini2', 'umitec', 'ninja-ultracrush'];

const problems = [];
const fail = (msg) => problems.push(msg);

if (!existsSync(OUT)) {
  console.error('No ./out directory. Run `npm run build` first.');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(OUT);
const isErrorPage = (f) => /\/(404|_not-found)(\/index)?\.html$/.test(f);
const htmlFiles = files.filter((f) => f.endsWith('.html') && !isErrorPage(f) && !f.includes('/_next/'));
const textFiles = files.filter((f) => /\.(html|txt|xml)$/.test(f) && !f.includes('/_next/'));

// 1. No placeholder text anywhere in shipped HTML, txt or xml.
for (const f of textFiles) {
  const body = readFileSync(f, 'utf8');
  const hit = body.match(PLACEHOLDER);
  if (hit) fail(`Placeholder text "${hit[0]}" in ${relative(OUT, f)}`);
}

// 2. Unverified review pages must not be built.
for (const slug of BLOCKED_SLUGS) {
  if (existsSync(join(OUT, slug))) fail(`Unverified page /${slug}/ was built`);
}

// 3. Every page has a self-referencing canonical, title, description and valid JSON-LD.
const sitemapXml = existsSync(join(OUT, 'sitemap.xml')) ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8') : '';
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const noindexPages = new Set();

for (const f of htmlFiles) {
  const rel = relative(OUT, f);
  const path = rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`;
  const html = readFileSync(f, 'utf8');

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) fail(`No canonical on ${path}`);
  else if (canonical !== `${SITE}${path}`) fail(`Canonical on ${path} is ${canonical}, expected ${SITE}${path}`);

  if (!/<title>[^<]+<\/title>/.test(html)) fail(`No <title> on ${path}`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) fail(`No meta description on ${path}`);

  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (noindex) noindexPages.add(path);

  if (!noindex) {
    if (!/<meta property="og:title"/.test(html)) fail(`No Open Graph title on ${path}`);
    if (!/<meta name="twitter:card"/.test(html)) fail(`No Twitter card on ${path}`);
    if (!sitemapUrls.includes(`${SITE}${path}`)) fail(`Indexable page ${path} is missing from the sitemap`);
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail(`Invalid JSON-LD on ${path}`);
    }
  }
}

// 4. Sitemap: only canonical, existing, indexable pages; no build-time lastmod.
if (!sitemapUrls.length) fail('sitemap.xml is missing or empty');
for (const url of sitemapUrls) {
  if (!url.startsWith(`${SITE}/`)) {
    fail(`Sitemap URL outside ${SITE}: ${url}`);
    continue;
  }
  const path = url.slice(SITE.length);
  const file = path === '/' ? join(OUT, 'index.html') : join(OUT, path, 'index.html');
  if (!existsSync(file)) fail(`Sitemap URL has no built page: ${url}`);
  if (noindexPages.has(path)) fail(`Sitemap lists a noindex page: ${url}`);
}
if (/<lastmod>/.test(sitemapXml)) fail('Sitemap contains lastmod values; use real edit dates or omit them');

// 5. Crawl files.
const robots = existsSync(join(OUT, 'robots.txt')) ? readFileSync(join(OUT, 'robots.txt'), 'utf8') : '';
if (!robots) fail('robots.txt is missing');
else if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('robots.txt does not reference the sitemap');

const llms = existsSync(join(OUT, 'llms.txt')) ? readFileSync(join(OUT, 'llms.txt'), 'utf8') : '';
if (!llms) fail('llms.txt is missing');
for (const m of llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
  if (!sitemapUrls.includes(m[1])) fail(`llms.txt links to a URL that is not in the sitemap: ${m[1]}`);
}

if (problems.length) {
  console.error(`verify-build: ${problems.length} problem(s)\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`verify-build: OK (${htmlFiles.length} pages, ${sitemapUrls.length} sitemap URLs)`);
