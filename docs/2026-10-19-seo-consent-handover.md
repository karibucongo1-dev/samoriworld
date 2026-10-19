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

These files exist only on the server and are referenced by the source. Copy them into `public/` (same paths)
before building or deploying, so git and the server match:

- `public_html/samori-hero.css` -> `public/samori-hero.css`
- `public_html/images/samori-hero-a380.jpg` -> `public/images/samori-hero-a380.jpg`
- `public_html/destinations/rome/` -> `public/destinations/rome/`
- any Stover pages (`public_html/stover*/`) and anything else in `public_html` that is not in git

`deploy.sh` never deletes, so they stay live even if not copied, but a local preview will show broken images.

## Not done / needs the owner

- **Live checks.** This session could not reach www.samori.net, so the audit's live findings (/luhxe/ 404, Stover pages, GA loader, headers) were not re-measured. Stover pages are not in this repo: they exist only on the server. Check `public_html` for files not in git before deploying.
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
