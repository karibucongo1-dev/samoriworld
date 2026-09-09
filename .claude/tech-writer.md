# Tech Writer Rules — samori.co.uk (Samori Systems)

**Stack:** separate Next.js App Router project at `samori-co-uk/`, static export (`next build` → `samori-co-uk/out`), deployed to Namecheap shared hosting. This is a distinct niche/domain from samori.net and karibucongo.com — do not mix tech-review routes into the travel app at the repo root.

## Search intent & pricing

- All prices in £ GBP. UK-specific merchant comparisons (Amazon UK, Currys, Very) where relevant.
- Every post targets UK search intent — spelling, units (kg/cm), and retailer references should read as UK-first.

## Output format & rendering order

- Individual product reviews are dynamic routes: `samori-co-uk/src/app/[slug]/page.tsx`, driven by the single data source `src/lib/reviews.ts` — the same pattern as the travel app's `destinations.ts`. Add a product by adding an entry there; don't hand-write a one-off page file.
- Longer-form comparison/guide content (e.g. "Best Portable Power Banks for UK Travelers") lives under `src/app/guides/<slug>/page.tsx`.
- **Rendering order matters**: a static, pre-rendered HTML spec/comparison table must render BEFORE any affiliate CTA button or dynamic widget, so crawlers and AI bots can index product data even if scripts never execute.

## Canonical & metadata

- Every page exports `metadata` (or `generateMetadata` for dynamic routes) with `alternates: { canonical: 'https://www.samori.co.uk/<path>/' }`, derived from `SITE_URL` + the route's own slug (see `src/lib/site-config.ts`) — never hardcoded, and never omitted. This directly fixes the samori.co.uk bug where product review pages had no canonical tag at all.

## Affiliate links

- Every outgoing affiliate link uses `target="_blank" rel="nofollow sponsored"` — required for Google Search Console compliance. Use the shared `<AffiliateCTA />` component (`src/components/AffiliateCTA.tsx`) so this can't be forgotten on a one-off page.

## Structured data

- Product reviews: `Product` + `Offer` (+ `AggregateRating` where a rating exists) JSON-LD.
- SaaS/software reviews: `SoftwareApplication` + `Review` JSON-LD.
- Every page with a FAQ section: `FAQPage` JSON-LD.
- Inject via `dangerouslySetInnerHTML` in a `<script type="application/ld+json">` tag, never hand-escaped strings.

## AI-crawler / GEO conventions

- Open every review/guide with a 2-sentence direct verdict for AI search engines before any other content.
