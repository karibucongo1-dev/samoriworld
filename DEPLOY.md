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

`deploy.sh` keeps its own backup in `/home/samopsep/deploy-backups/`. For big changes also zip `public_html` in cPanel File Manager (Compress, Zip Archive) to `/home/samopsep/backups/public_html-pre-deploy-YYYY-MM-DD.zip` and check it is tens of MB.

## 5. Deploy

```
./deploy.sh
```

Host and user default to `premium354.web-hosting.com` and `samopsep`; override with `NAMECHEAP_HOST` / `NAMECHEAP_USER` if needed. The script:

1. Builds and compares every route with the live site.
2. Prints a dry run: `N new file(s), N changed file(s)` and the first 25 files.
3. Asks `Proceed with the sync? [y/N]`. Type `y` or `yes`; anything else cancels with nothing changed.

Answer no if the list contains anything outside `public_html`, any deletion, or files you don't recognise. After the upload it runs a smoke test (home, robots, security.txt, consent.js, privacy, HSTS, POST 405, no directory listing).

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

## Known issues (26 Sep 2026)

- The hotel box uses `src/components/KlookHotelSearch.tsx` (Klook city ids, tracked via Travelpayouts).
- 2 Oct 2026: raise HSTS to `max-age=31536000` and switch the CSP from report-only to enforced on samori.net, samori.co.uk and samori.io, after checking browser consoles for CSP violations. For samori.net change `public/.htaccess` and deploy.

## To do (noted 26 Sep 2026)

- 2 Oct 2026: HSTS to 1 year and enforce the CSP on samori.net, samori.co.uk and samori.io (calendar reminder). Check browser consoles first.
- 3 Oct 2026: same switch for karibucongo.com, editing its live `.htaccess` directly (calendar reminder).
- Car-rental page: headline claims "190+ Countries" and "6+ providers"; Localrent covers about 50 countries. Consider toning down, as done for hotels.
- karibucongo.com hotels page: search box is still dead. Klook has no Kinshasa hotels, so decide what Congo-focused visitors should see.
- karibucongo.com is not in git; its changes were made on the server (backups in `/home/samopsep/backups`).
- Car-rental widget: to change its default location, pick a specific city (not just a country) in the Travelpayouts widget builder and test Find before deploying.
