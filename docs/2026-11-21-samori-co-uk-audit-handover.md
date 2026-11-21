# samori.co.uk: audit fixes (21 Nov 2026)

Branch: `seo-audit-fixes-samori-co-uk`. **Not deployed. Do not run `samori-co-uk/deploy_tech.sh` yet (see "Deploy warning").**

Source audits: `samori-seo-ai-audit.pdf` (repo/static-build review) and `Samori_SEO_Audit_and_Claude_Prompt__1_.md` (DataForSEO-based review of the live site). They are different audits and partly disagree (see "Repo vs live site").

## Deploy warning

1. `deploy_tech.sh` runs `rsync -avz --delete ./out/ ... public_html/`. Anything on the server that is not in this build is deleted. That includes the live pages that are not in this repo, and potentially the `karibucongo.com` addon-domain folder if it sits inside `public_html/`.
2. The live site has real `/mini2/`, `/lito1/`, `/neo2/` (and `/echo-dot/`, `/computers/`, legacy `.html` URLs, redirects). The repo only has "TBD" stubs for the first three. A build from this repo is therefore not equivalent to the live site.
3. Before any deploy: copy what is on the server (cPanel File Manager backup), find where the live source lives, and use `rsync --dry-run` without `--delete` first.

## Changed in this branch (`samori-co-uk/`)

| Audit item | Change |
|---|---|
| Placeholder / unverified pages in sitemap | Only `verified: true` reviews are built, listed and put in the sitemap (`publishedReviews`). `neo2`, `lito1`, `mini2`, `umitec`, `ninja-ultracrush` are no longer generated (`dynamicParams = false`). Data stays in `reviews.ts` as drafts. |
| Placeholder affiliate links | `AffiliateCTA` renders nothing when the URL holds `REPLACE_WITH`, `example-affiliate-network.com` or similar (`src/lib/affiliate.ts`). Every review currently has `REPLACE_WITH_ASIN`, so **no buy buttons show until real URLs are added**. |
| Illustrative guide data | Power-bank and VPN guides are `noindex, follow`, out of the sitemap and llms.txt, carry a visible "Draft" note, and have no price/Offer structured data. |
| Trust pages | New `/about/` (editorial policy), `/affiliate-disclosure/`, `/privacy/`, `/contact/`, linked from a site footer. |
| Metadata | `metadataBase`, default and per-page Open Graph and Twitter (`summary`, no image yet), title template. |
| Structured data | Organization + WebSite on home; WebPage + Product (no Offer, no availability) and BreadcrumbList on reviews. |
| Sitemap freshness | `lastModified` removed (it was build time). |
| robots.txt | Added, references `/sitemap.xml`. |
| llms.txt | Lists only published reviews and the trust pages. |
| Checks | `npm run build:verified` builds then runs `scripts/verify-build.mjs`: no placeholder text, no unverified pages, canonical/title/description/OG on every page, sitemap URLs exist and are indexable, JSON-LD parses, robots.txt and llms.txt consistent. |

## Needs the owner

- **Real affiliate URLs** for each review (Amazon UK ASIN links) and the VPN and power-bank guides.
- **Confirm text I drafted**: editorial policy wording (says specs come from manufacturer information, no hands-on testing claimed), privacy page (says no cookies/analytics, mentions hosting and Cloudflare), contact address `info@samori.net` (reused from samori.net), and whether an Amazon Associates statement is required.
- **Real review dates and author names**; none are invented. Add them to `reviews.ts` and the sitemap when known.
- **Guide figures**: verify against provider and manufacturer pages, then remove `robots: { index: false }`, re-add to sitemap and llms.txt.
- **Cloudflare**: allow verified Googlebot, Bingbot and OAI-SearchBot (verified-bot rules, not user-agent strings or a global WAF off). Check Search Console live inspection.
- **Default social image** for Open Graph/Twitter.

## Not done (needs live-site access or evidence)

From the DataForSEO audit: `/echo-dot/` claims (230,000+ sales, 4.6/5, three "verified review" cards), slogan H1s on `/mini2/` and `/lito1/`, `.html` to new-URL redirect verification, internal-link graph, homepage catalogue curation, backlink review (no disavow), Search Console baseline, Core Web Vitals, AI-citation benchmark. These pages are not in this repo.

## Rollback

`git checkout main` and rebuild. Nothing here touches the server.
