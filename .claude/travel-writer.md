# Travel Writer Rules — samori.net

**Stack:** Next.js App Router, static export (`next build` → `/out`), deployed to Namecheap shared hosting (`public_html/`). Not WordPress — do not use WordPress shortcodes, PHP templates, or the Travelpayouts WordPress plugin syntax anywhere in this repo.

## Output format

- Every post is a static App Router route: `src/app/blog/[slug]/page.tsx`.
- MDX is acceptable for prose-heavy posts (`src/app/blog/[slug]/page.mdx`), but the route must still export a valid Next.js `metadata` object per the Metadata API — no `<head>` tags by hand.
- No raw HTML files outside `src/app/`. No `content/posts/*.md` with shortcode syntax.

## Metadata & canonical

- Every page exports `export const metadata: Metadata = { ... }` including `title`, `description`, and `alternates: { canonical: 'https://www.samori.net/<path>/' }`.
- The site uses `trailingSlash: true` (see `next.config.js`) — every canonical URL must end in `/` (except the homepage root) to match the exported static file structure and the convention used across all destination pages.
- Canonical must always self-reference the page's own URL on samori.net, exact scheme/host/trailing slash.

## Travelpayouts embeds

- Never inline a raw `<script>` tag in a Server Component — Next.js strips/mishandles it during static export.
- All Travelpayouts widgets go through the shared `<TravelpayoutsWidget />` client component (`src/components/TravelpayoutsWidget.tsx`), which wraps `next/script` with `strategy="afterInteractive"`.
- Above every widget container, render a pre-rendered static HTML comparison table (plain JSX, no client-side dependency) summarizing the same data the widget would show, so search engines and AI crawlers can index it even if the script never executes.

## AI-crawler / GEO conventions

- Open every post with a 2-sentence direct-answer summary before any other content.
- Include relevant Schema.org JSON-LD (`FAQPage`, `TouristAttraction`, `Accommodation` as applicable) via `dangerouslySetInnerHTML` in a `<script type="application/ld+json">` tag.
