import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

const root = path.join(import.meta.dirname, '..');

function staticPages(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name === 'index.html') out.push(full);
    }
  };
  walk(path.join(root, 'public'));
  return out;
}

test('static pages never load a partner booking widget before consent', () => {
  for (const file of staticPages()) {
    const html = fs.readFileSync(file, 'utf8');
    const live = html.match(/<script\b[^>]*\ssrc="https:\/\/(tpembd\.com|tp\.media)\//g) ?? [];
    assert.deepEqual(live, [], `${path.relative(root, file)} loads a widget script without consent`);
  }
});

test('sitemap leaves out the noindex privacy page and lists About and Contact', () => {
  const src = fs.readFileSync(path.join(root, 'src/app/sitemap.ts'), 'utf8');
  const routes = src.match(/export const nextRoutes = \[([\s\S]*?)\];/)?.[1] ?? '';
  assert.ok(!routes.includes("'/privacy/'"));
  assert.ok(routes.includes("'/about/'"));
  assert.ok(routes.includes("'/contact/'"));
});

test('no fake newsletter form remains', () => {
  assert.ok(!fs.existsSync(path.join(root, 'src/components/Newsletter.tsx')));
});

test('footer has no placeholder "#" social links', () => {
  const footer = fs.readFileSync(path.join(root, 'src/components/SiteFooter.tsx'), 'utf8');
  assert.ok(!footer.includes('href="#"'));
});

test('canonical-host redirects only match samori.net hostnames', () => {
  const htaccess = fs.readFileSync(path.join(root, 'public/.htaccess'), 'utf8');
  const hostConds = htaccess.match(/RewriteCond %\{HTTP_HOST\} .*/g) ?? [];
  assert.ok(hostConds.length >= 2);
  for (const cond of hostConds) assert.match(cond, /samori\\\.net\$/);
  for (const rule of htaccess.match(/RewriteRule \^ \S+/g) ?? []) assert.match(rule, /https:\/\/www\.samori\.net%/);
});

test('Google Analytics only loads through consent.js', () => {
  const consent = fs.readFileSync(path.join(root, 'public/consent.js'), 'utf8');
  assert.match(consent, /ga: function/);
  assert.match(consent, /clearGaCookies/);
  const layout = fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8');
  assert.ok(!layout.includes('googletagmanager'));
  assert.match(layout, /'ga'/);
});

test('no static page loads Google Analytics inline', () => {
  // The Stover pages (hand-built, ad landing pages) carry their own consent-gated GA loader plus assets/page-consent.js.
  // They are kept exactly as they were live; every other static page must use consent.js.
  const ownLoader = /\/public\/stover(-women)?\/index\.html$/;
  for (const page of staticPages().filter((p) => !ownLoader.test(p))) {
    const html = fs.readFileSync(page, 'utf8');
    assert.ok(!/<script[^>]*googletagmanager\.com/i.test(html), `${path.relative(root, page)} loads GA directly; it must go through consent.js`);
    assert.ok(!html.includes('G-LKMZFYPFHW'), `${path.relative(root, page)} has an inline GA ID`);
  }
});

test('static pages that had the Shop link on the live site keep it', () => {
  const pages = [
    ...['abu-dhabi', 'doha', 'dubai', 'kenya', 'kinshasa', 'kuala-lumpur', 'manchester', 'mauritius', 'new-york', 'paris', 'seychelles', 'singapore'].map(
      (p) => `public/destinations/${p}/index.html`,
    ),
    'public/things-to-do/index.html',
  ];
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.ok(html.includes('href="https://shop.samori.net/">Shop</a></nav>'), `${page} is missing the header Shop link`);
  }
});
