# Deploying samori.net

Server: premium354 (Namecheap), `/home/samopsep/public_html`, SSH port 21098.
`deploy.sh` is additive: it uploads new and changed files and never deletes anything on the server. It does overwrite live files with the same path, so read the dry-run list.

## 1. Before you start

- Work in the Codespace on an up-to-date `main`: `git status` should be clean apart from `next-env.d.ts` (Next.js rewrites it on every build).
- If you changed `.htaccess` on the server by hand, copy the change into `public/.htaccess` first, or the deploy will undo it.
- If SSH asks for a password or passphrase, type it yourself. Never paste it into a chat.

## 2. Check the security files

```
grep -c 'Options -Indexes' public/.htaccess              # expect 1
grep -c 'REQUEST_METHOD' public/.htaccess                # expect 1 (GET/HEAD only)
grep -c 'Strict-Transport-Security' public/.htaccess     # expect 1
grep -o 'static.localrent.com\|widget.localrent.com\|tpo.gg\|emrld.ltd' public/.htaccess | sort | uniq -c   # all four hosts
ls -la public/robots.txt public/.well-known/security.txt
```

## 3. Build

```
npm ci && npm run build
test -f out/.htaccess && test -f out/robots.txt && test -f out/.well-known/security.txt && echo OK
```

## 4. Backup you control (big deploys)

`deploy.sh` keeps its own backup in `/home/samopsep/deploy-backups/` (the newest 3 per site). For big changes also zip `public_html` in cPanel File Manager (Compress, Zip Archive) to `/home/samopsep/backups/public_html-pre-deploy-YYYY-MM-DD.zip` and check it is tens of MB.

## 5. Deploy

```
./deploy.sh
```

Host and user default to `premium354.web-hosting.com` and `samopsep`; override with `NAMECHEAP_HOST` / `NAMECHEAP_USER` if needed. The script:

1. Builds and compares every route with the live site.
2. Prints a dry run: `N new file(s), N changed file(s)` and the first 25 files.
3. Asks `Proceed with the sync? [y/N]`. Type `y` or `yes`; anything else cancels with nothing changed.

Answer no if the list contains anything outside `public_html`, any deletion, or files you don't recognise. After the upload it runs a smoke test (home, robots, security.txt, consent.js, privacy, HSTS, POST 405, no directory listing). If that passes, it keeps the newest 3 backups of this site in `deploy-backups` and deletes older ones (set `KEEP_BACKUPS=5` to keep more).

## 6. Check the live site

```
curl -sI https://www.samori.net/ | grep -iE 'strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy'
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://www.samori.net/          # 405
curl -s -o /dev/null -w '%{http_code}\n' https://www.samori.net/blog/             # 403
curl -s https://www.samori.net/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' | \
  while read u; do echo "$(curl -s -o /dev/null -w '%{http_code}' "$u") $u"; done   # all 200
```

In a private window: the consent banner shows on the home page, `/bagsmart/`, `/luhxe/` and `/lycamobile/`; Metricool and emrld.ltd load only after Accept; the flight widget works.

## 7. Rollback

- One page: fix and redeploy, or restore that folder from the backup.
- Whole site: extract the pre-deploy zip (or the `deploy-backups` tar.gz) over `public_html`.
- Just `.htaccess`: copy `backups/samori.net-htaccess-2026-09-25-before-indexes.bak` over `public_html/.htaccess`.

## 8. After deploying

Merge the branch into `main` and push, so `main` always matches the live site. Keep `deploy.sh` additive.

## karibucongo.com

karibucongo.com is kept in git as the **live built site** in `karibucongo/site/` (HTML, JS, images), not as Next.js source. Its old source on the server (`karibucongo-site-source`, last touched 5 Sep) no longer matches the site, so edit the files in `karibucongo/site/` directly.

- Server: premium354, `/home/samopsep/karibucongo.com` (addon domain of samori.net, same SSH login).
- Not in git on purpose: `*.zip` image bundles, `*.bak*` files and `.well-known/ssl-manager/`. They stay on the server; the scripts skip them.
- `karibucongo/last-sync.sha256` records every file's checksum at the last pull or deploy. Commit it with the site.

**Import or refresh from the live site** (read-only on the server):

```
scripts/pull-karibucongo.sh
git add karibucongo && git commit -m 'karibucongo.com: sync from live site'
```

**Deploy** after editing files in `karibucongo/site/`:

```
./deploy-karibucongo.sh
```

It works like `deploy.sh`: additive, dry run, `Proceed? [y/N]`, backup to `deploy-backups/karibucongo.com-*.tar.gz`, smoke test (the `deploy.sh` checks plus sitemap, hotel-search.js, /hotels/, a destination page), then keeps the newest 3 backups. Before anything else it compares the server with `last-sync.sha256`:

- `EDITED` means someone changed that live file by hand since the last sync. The deploy stops, because it would overwrite the edit. Run `scripts/pull-karibucongo.sh`, commit, redo your change on top and deploy again.
- `ADDED` / `REMOVED` are only warnings (added files stay on the server; removed ones get uploaded again). Pull to bring git up to date.

After deploying, commit the site changes and the updated `last-sync.sha256`, so `main` matches the live site. Please avoid editing karibucongo.com in cPanel from now on; if you must, pull straight afterwards.

## Known issues (26 Sep 2026)

- The hotel box uses `src/components/KlookHotelSearch.tsx` (Klook city ids, tracked via Travelpayouts).
- 2 Oct 2026: raise HSTS to `max-age=31536000` and switch the CSP from report-only to enforced on samori.net, samori.co.uk and samori.io, after checking browser consoles for CSP violations. For samori.net change `public/.htaccess` and deploy.

## To do (noted 26 Sep 2026)

- 2 Oct 2026: HSTS to 1 year and enforce the CSP on samori.net, samori.co.uk and samori.io (calendar reminder). Check browser consoles first.
- 3 Oct 2026: same switch for karibucongo.com: edit `karibucongo/site/.htaccess` and run `./deploy-karibucongo.sh` (calendar reminder).
- karibucongo.com hotels page: uses `karibucongo/site/hotel-search.js` (at the site root, loaded on every page as `/hotel-search.js?v=2`; bump `v` in the pages after any change). Klook has no Kinshasa hotels; revisit if another hotel partner covering Kinshasa is approved.
- Car-rental widget: to change its default location, pick a specific city (not just a country) in the Travelpayouts widget builder and test Find before deploying.

### Optional, when there is time

- karibucongo.com: 27 MB of `*.zip` image bundles under `destinations/` are publicly downloadable. They are not in git and the deploy never deletes, so remove them on the server (cPanel File Manager) if they are not needed.

### Done 26 Sep 2026

- karibucongo.com sitemap: now lists all 28 indexable pages (`/privacy/` is `noindex`, the Bali post's canonical is samori.net). Submitted to Search Console and Bing.
- samori.io: POST blocked (405) and `/privacy/` added with a footer link.
- Backups: old deploy backups and snapshot folders removed; deploys now keep the newest 3 per site.
- karibucongo.com brought into git (`karibucongo/site/`, `deploy-karibucongo.sh`).
- samori.io: contact form replaced with a "Send by email" link that opens the visitor's email app, and the page title, description and canonical are set.
- karibucongo.com: 15 oversized photos (up to 8 MB) resized to at most 1920 px, same names and formats, 40.8 MB down to 6.7 MB.
