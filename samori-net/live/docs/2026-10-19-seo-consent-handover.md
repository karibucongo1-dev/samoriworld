# samori.net: SEO, consent and accuracy changes (19 Oct 2026)

Not deployed. Deploy with `./deploy.sh` (see DEPLOY.md) after review.

## Done in this branch

| Area | Change |
|---|---|
| Newsletter | Removed the fake signup box (it showed "You're on the list" without sending anything). Privacy notice says no newsletter runs. |
| About / Contact | New `/about/` and `/contact/` pages. Contact uses `info@samori.net`, the address already published in the privacy notice. Explains affiliate role and that bookings are with the provider. |
| Footer | Removed the four `href="#"` social placeholders. Added About, Contact and links to the Dubai/Doha hotel guides and the Bali guide (previously had no incoming links). |
| Consent | Partner booking widgets (tpembd.com / tp.media / LocalRent) now load only after Accept, on all 13 static destination pages and in the React widgets. Until then a note with a "Cookie settings" button shows; normal booking links still work. Reject after Accept reloads the page. |
| Privacy | Updated to match: widgets after consent, withdrawal behaviour, newsletter wording, date. |
| Sitemap | Removed noindex `/privacy/`; added `/about/` and `/contact/`. All 31 sitemap URLs exist in the build with a matching self-canonical. |
| Redirects | `.htaccess`: `samori.net` -> `https://www.samori.net` and `http://www` -> `https://www`, path and query kept, matched only on samori.net hostnames. |
| Caching | `.htaccess`: one-year immutable cache for `/_next/static/` only (hashed build files). HTML stays no-store. |
| Metadata | Home title "Samori World \| Travel Guides, Flights, Hotels & eSIMs". Removed "lowest fare", "best price", "low deposits" and undated example prices (flights, eSIM, home). Shared Open Graph/Twitter defaults with an absolute image. Organization JSON-LD on the home page. |
| Accuracy | Hilton Dubai Palm Jumeirah: "entrance of the Palm's trunk" (Hilton factsheet). Doha Museum of Islamic Art: no longer "free"; ticketed with free categories, links to Visit Qatar. eSIM: phone must support eSIM and be unlocked or allow other eSIMs. |
| Links | Dubai, Doha, Kenya and London guides link to their "where to stay" guide. Lazy-loaded the Dubai card image on the home page. |
| Tests | `tests/site-content.test.ts`: no pre-consent widget scripts in static pages, sitemap rules, no newsletter, no `#` socials, redirect scoping. |

## Live site was ahead of git (found from the saved live homepage)

The live home page had changes that were never committed. They are now ported into the source:
the A380 hero (`samori-hero` markup), the "Shop" nav link to shop.samori.net, and the Doha/Rome card photos.
The live inline Google Analytics loader (G-LKMZFYPFHW) is replaced by a `ga` loader inside `consent.js`, so GA
follows the same Accept/Reject choice as everything else, and its `_ga` cookies are deleted on Reject.

Those server-only files are now in git (see "Server scan" below), so a build from this branch matches the live site.

## Server scan (19 Oct 2026, via cPanel File Manager)

- The GA tag (G-LKMZFYPFHW) was pasted inline into 37 of 38 server HTML pages (all but `about.html`). Git has none of them, and the `consent.js` loader replaces it. After the next deploy the inline copies are overwritten for every page the build or `public/` produces (since PR #2 this includes the Stover pages).
- The "Shop" header link was also added by hand to 26 server pages. The 13 static pages in `public/` now have it (12 destination guides and Things to Do); the React pages get it from `AppHeader.tsx`.
- Brought into git from the server: `destinations/brazzaville`, `destinations/istanbul`, `destinations/rome` (pages plus images), `stover/` and `stover-women/` (pages plus assets, unchanged), `samori-hero.css`, `images/samori-hero-a380.jpg`, and about 340 destination images. Nothing in the repo was overwritten with a server copy.
- The three new destination pages were cleaned the same way as the others: the inline GA block was removed (GA now comes from `consent.js` via `data-load="ga"`), and the Travelpayouts widget script became a consent-gated `data-consent-src`. The Brazzaville, Istanbul and Rome cards were added to the React `/destinations/` page, which would otherwise have dropped them on deploy.
- Every static page that has `consent.js` now asks it for GA (`data-load="ga"`), so analytics keeps working on those pages, but only after Accept. `privacy/` has no `consent.js`, so it no longer reports to GA.
- The Stover pages now load GA through the shared `/consent.js` too (PR #2), so their banner names Google Analytics and Reject clears `_ga` cookies. Their old `assets/page-consent.js` copies were removed from git; the server copies are unused.
- Not copied (too large for the transfer): `destinations/kuala-lumpur/images/central-market-facade.jpg` (5.2 MB), `pavilion-kl-fountain-exterior.jpg` (2.9 MB), `destinations/new-york/images/9-11-memorial-and-museum.jpg` (8.3 MB), `empire-state-building.jpg` (3.7 MB), `grand-central-terminal.jpg` (6.1 MB). They stay live because `deploy.sh` never deletes, but a local build will show broken images for them. `destinations/paris/images/paris-images.zip` (4.8 MB) looks like a leftover upload archive and was left out on purpose.
- Server housekeeping: the `*.bak-*` copies next to each page were not copied. The temporary `samori-*.zip` files created in the server home folder (`/home/samopsep/`) for this transfer are safe to delete.

## Not done / needs the owner

- **Live checks.** This session could not reach www.samori.net, so the audit's live findings (/luhxe/ 404, Stover pages, GA loader, headers) were not re-measured. The Stover pages and the Brazzaville, Istanbul and Rome guides are now in git. The remaining server-only files are the five oversized images listed under "Server scan".
- **/luhxe/** exists in the repo and stays in the sitemap; the next deploy restores it. Remove the folder if the product is gone.
- **Tailwind Play CDN** still loads on 11 static pages (`cdn.tailwindcss.com`). Replacing it needs a compiled CSS file per page; not done.
- **CSP** is unchanged and still report-only. Build an enforced policy only after an inventory of live requests (including any GA tag on the server).
- **Redirect and `<If>` caching rules** are candidates: test on the server (`curl -sI http://samori.net/x?y=1` should 301 to `https://www.samori.net/x?y=1`), and check karibucongo.com still serves its own site. Roll back by restoring the previous `.htaccess` (`deploy-backups/`).
- **Social profiles**: add real profile URLs to the footer if they exist.
- **Company details**: About/Contact name no company or address because none is published on the site yet. Add Samori Ltd details if you want them public.
- **Guides**: add author names, real review dates and official-source citations; re-check entry/visa and safety text against official sources before each update.

## Six-week editorial plan (existing clusters first)

1. Dubai: check facts and sources on the destination and hotel guides; add review date and author.
2. Doha: same, including museum and transport prices from official sites.
3. London and Kenya: same; add a short comparison table to each destination page.
4. Bali: link the budget guide from a Bali section on /destinations/; check prices with dates.
5. Travel bags (BAGSMART, Luhxe, Stover): one "packing" hub page linking the product pages, retailer-sourced and labelled as such.
6. Review search queries in Search Console; only then plan new destinations.
