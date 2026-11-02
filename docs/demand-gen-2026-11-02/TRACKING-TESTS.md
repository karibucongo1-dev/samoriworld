# Tracking tests (2 Nov 2026)

None of these tests was run by this session: Shopify, GA4 and Google Ads were not reachable (see COMPLETION-REPORT.md). Each test below is written to be run by hand. Fill in the "Observed" and "Result" columns.

## IDs to use (from the brief; confirm each)

| Store | GA4 property | Stream | Measurement ID | Ads conversion action | Campaign goal |
|---|---|---|---|---|---|
| shop.samori.co.uk (tjifct-34) | 556766273 ("omar") | confirm | G-0W30VCYV60 (confirm) | "omar (web) affiliate_click", ID 7851023976 (confirm) | Samori Shop - Affiliate Click |
| shop.samori.net (xydmiq-em) | 556773840 | 15888313055 | **unknown: find it** in GA4 Admin → Data streams → this stream | **unknown: find it** in Ads → Goals → Conversions | none needed while the campaign uses Maximize clicks |

Do not copy the .co.uk measurement ID or Ads action to .net.

## Test setup (both stores)

- Use Chrome with the **Tag Assistant** extension (tagassistant.google.com) and GA4 **DebugView** (GA4 → Admin → DebugView).
- Use a fresh incognito window for each consent state.
- Record date, time and time zone (Europe/London) for every test.

## Tests

| ID | Store / page / button | Consent state | Steps | Expected | Observed | Result |
|---|---|---|---|---|---|---|
| T1 | Any product page, retailer button | Accepted (analytics) | Click the retailer button once with a normal left-click | Exactly **one** `affiliate_click` in DebugView, sent to the store's own property; parameters such as link domain and product name; no email or name | | |
| T2 | Same | Accepted | Ctrl/Cmd-click, middle-click, and press Enter with the button focused | One event per activation; the retailer page opens in a new tab; the current page stays | | |
| T3 | Same | Rejected | Reject analytics in the cookie banner, then click the button | **No** `affiliate_click` and no GA4 requests in Tag Assistant; the retailer page still opens normally | | |
| T4 | Same | Accepted | Click, then check the retailer URL in the address bar | Affiliate tag or tracking parameters are still present (e.g. Amazon `tag=`, Impact click ID) | | |
| T5 | — | — | Ads → Goals → Conversions → the store's action → Diagnostics | Status "Recording conversions", or the exact diagnostic text if not; action is included in the campaign goal | | |

**Duplicates:** if T1 shows two events per click, the usual causes are the event being sent from both a theme script and a Customer events (custom pixel) subscription, or two listeners on the same button. Record which.

**Custom pixel note:** Shopify custom pixels run in a sandbox. They receive Shopify standard events (and events published with `Shopify.analytics.publish`), not ordinary DOM `CustomEvent`s dispatched in the theme. If the theme dispatches a DOM event and the pixel listens for it, the pixel will never see it.

## Ads warning ("Verify conversion actions") on Samori Shop

Work through these in order and record each answer:

1. **Is the action receiving anything?** Ads → Goals → Conversions → Summary → the action's status and "Last conversion" date.
2. **Where does it come from?** The action's Source column: imported from GA4, or a Google tag? If imported from GA4, it depends on GA4 receiving `affiliate_click` and on the event being marked as a key event in GA4.
3. **Is the GA4 link working?** Ads → Tools → Data manager → Google Analytics: property 556766273 linked, with auto-tagging on.
4. **Is it in the goal?** Campaign → Settings → Goals: "Samori Shop - Affiliate Click" includes this action.
5. **Timing.** Imported GA4 events can take up to about 24–48 hours to appear in Ads. Zero conversions over 1–2 days of delivery doesn't prove a fault on its own.

A manual test click proves the website sends the event. It does not prove Ads will attribute a conversion to an ad click. Do not create test conversions or switch to an unrelated goal to clear the warning.

## Garment page checks (shop.samori.net/collections/garment-bags)

| Check | How | Result |
|---|---|---|
| Each product claim matches the retailer variant the button links to (UK storefront vs US/import seller) | Open each retailer link in a UK session; compare size, weight and materials | |
| Airline cabin-size guidance has a source and a date | Compare with each airline's current baggage page | |
| Import/delivery cautions shown where the seller ships from abroad | Retailer page: "Dispatched from / Sold by" | |
| Affiliate disclosure visible above the first retailer button on mobile | Phone, or Chrome DevTools at 375px width | |
| Buttons usable by keyboard (Tab, then Enter) with a visible focus outline | Desktop | |
| T1–T4 above pass on this page | — | |
