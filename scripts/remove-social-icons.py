#!/usr/bin/env python3
"""Remove the four placeholder social icons (Instagram, X, Facebook, TikTok) from the built karibucongo.com site.
Edits the footer HTML and the embedded React payload (html and .txt). Idempotent; preserves line endings."""
import os, re, sys
root = os.path.join(os.path.dirname(__file__), '..', 'karibucongo', 'site')
names = 'Instagram|X|Facebook|TikTok'
html = re.compile(r'<a href="#" aria-label="(?:%s)"[^>]*>(?:IG|X|FB|TT)</a>' % names)
rsc = re.compile(r'\[\\*"\$\\*",\\*"a\\*",\\*"(?:%s)\\*",\{[^{}]*\}\],?' % names)
changed = 0
for d, _, fs in os.walk(root):
    for f in fs:
        if not f.endswith(('.html', '.txt')): continue
        p = os.path.join(d, f)
        s = open(p, encoding='utf8', newline='').read()
        if 'aria-label' not in s or not re.search(names, s): continue
        n = rsc.sub('', html.sub('', s))
        if n != s:
            open(p, 'w', encoding='utf8', newline='').write(n); changed += 1
print('files changed:', changed)
