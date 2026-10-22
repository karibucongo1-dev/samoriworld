#!/usr/bin/env python3
"""Idempotent compliance edits for karibucongo/site (22 Oct 2026). Safe to re-run after
scripts/pull-karibucongo.sh: it only changes what is not already changed.
Usage: python3 scripts/karibucongo-compliance-fixes.py"""
import os, re, sys
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'karibucongo', 'site')
IMG = 'https://www.karibucongo.com/images/karibucongo-hero-bg.jpg'
SUBS = [
 ("Karibu Congo — Explore More. Pay Less.", "Karibu Congo | Travel Guides and Deals for Congo and Africa"),
 ("Flights, cars, activities and everything in between — all in one place, all at the best price we can find.", "Compare flights, hotels, car rental and eSIMs for trips to Congo and across Africa, with practical destination guides. Some links earn us a commission."),
 ("Compare 6+ providers, best price guaranteed", "Compare 6+ providers"),
 ("We check 6+ providers so you get the best price, every time — no hidden fees, ever.", "We compare 6+ providers so you can see the options side by side. Prices and terms are set by the provider you book with."),
 ("Best price guarantee", "Compare providers"),
 ("We compare flights, cars, activities and eSIMs across dozens of providers so you can spend less time booking and more time exploring.", "We compare flights, cars, activities and eSIMs across dozens of providers so you can spend less time booking and more time exploring. Some links are affiliate links: if you book through them we may earn a commission at no extra cost to you."),
]
CONSENT_JS = r"""  /* Booking widgets (Travelpayouts tpembd.com). The page HTML holds them as
     <script type="text/plain" data-consent-src="...">; they are switched on only after Accept. */
  loaders.widgets = function () {
    var list = document.querySelectorAll('script[data-consent-src]');
    for (var i = 0; i < list.length; i++) {
      var old = list[i];
      var s = document.createElement('script');
      s.async = true;
      s.charset = 'utf-8';
      s.src = old.getAttribute('data-consent-src');
      old.parentNode.replaceChild(s, old);
    }
    var notes = document.querySelectorAll('[data-consent-note]');
    for (var j = 0; j < notes.length; j++) notes[j].parentNode.removeChild(notes[j]);
  };
  function widgetNotes() {
    if (read() === 'granted') return;
    var list = document.querySelectorAll('script[data-consent-src]');
    for (var i = 0; i < list.length; i++) {
      var prev = list[i].previousElementSibling;
      if (!prev || prev.tagName.toLowerCase() !== 'tp-cascoon') continue;
      var p = document.createElement('p');
      p.setAttribute('data-consent-note', '');
      css(p, { margin: '8px 0', padding: '12px 14px', border: '1px dashed rgba(20,20,28,.35)', borderRadius: '8px', font: '400 14px/1.5 ' + FONT });
      p.appendChild(document.createTextNode('This booking search box is provided by a partner and stays hidden until you allow optional partner scripts. '));
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = 'Cookie settings';
      css(b, { background: 'none', border: '0', padding: '0', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' });
      b.addEventListener('click', function () { showBanner(); });
      p.appendChild(b);
      prev.parentNode.insertBefore(p, prev);
    }
  }

"""
changed = {}
def mark(k): changed[k] = changed.get(k, 0) + 1
def rw(p, fn):
    s = open(p, encoding='utf-8').read(); n = fn(s)
    if n != s: open(p, 'w', encoding='utf-8').write(n); return True
    return False

# 1. consent.js
p = os.path.join(ROOT, 'consent.js')
def f_consent(s):
    if 'loaders.widgets' not in s:
        s = s.replace("  var wanted = [];", CONSENT_JS + "  var wanted = [];", 1)
        s = s.replace("    footerLinks();\n    var attr", "    footerLinks();\n    widgetNotes();\n    request('widgets');\n    var attr", 1)
    return s
if rw(p, f_consent): mark('consent.js')

for d, _, fs in os.walk(ROOT):
    rel = os.path.relpath(d, ROOT)
    if rel.startswith('_next'): continue
    for f in fs:
        if not f.endswith(('.html', '.txt')): continue
        p = os.path.join(d, f)
        def fn(s):
            for a, b in SUBS:
                if b.startswith(a) and b in s: continue  # already applied (new text contains the old)
                s = s.replace(a, b)
            if f == 'index.html' and not rel.startswith('privacy'):
                s = s.replace('<script async src="https://tpembd.com', '<script async type="text/plain" data-consent-src="https://tpembd.com')
            return s
        if rw(p, fn): mark('text/widgets')
        # 2. social tags on indexable pages
        if f == 'index.html' and not rel.split(os.sep)[0] in ('privacy', '404', '_not-found'):
            def og(s):
                if 'og:title' in s: return s
                t = re.search(r'<title>(.*?)</title>', s, re.S); m = re.search(r'<meta name="description" content="(.*?)"\s*/?>', s, re.S)
                if not (t and m): print('no title/description, skipped:', p); return s
                tt = ' '.join(t.group(1).split()); de = ' '.join(m.group(1).split())
                ca = re.search(r'<link rel="canonical" href="(.*?)"', s)
                url = ca.group(1) if ca else 'https://www.karibucongo.com' + ('' if rel == '.' else '/' + rel.replace(os.sep, '/')) + '/'
                tags = (f'<meta property="og:type" content="website"/><meta property="og:site_name" content="Karibu Congo"/><meta property="og:title" content="{tt}"/><meta property="og:description" content="{de}"/><meta property="og:url" content="{url}"/><meta property="og:image" content="{IMG}"/>'
                        f'<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="{tt}"/><meta name="twitter:description" content="{de}"/><meta name="twitter:image" content="{IMG}"/>')
                return s.replace(m.group(0), m.group(0) + tags, 1)
            if rw(p, og): mark('og tags')

# 3. privacy page
p = os.path.join(ROOT, 'privacy', 'index.html')
def f_priv(s):
    s = s.replace('When the page loads, before you choose', 'Only after you accept')
    s = re.sub(r'<tr>(?:(?!</tr>).)*Car-rental widget.*?</tr>', '', s, flags=re.S)
    s = s.replace('Some pages also load fonts from Google Fonts and photographs from Unsplash, which means', 'Some pages also load fonts from Google Fonts, a styling library from cdn.tailwindcss.com and photographs from Unsplash, which means')
    if 'Last updated: 26 September 2026' in s: s = s.replace('Last updated: 26 September 2026', 'Last updated: 22 October 2026')
    return s
if rw(p, f_priv): mark('privacy')
print(changed)
