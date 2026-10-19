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
