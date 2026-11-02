# Samori Demand Gen: completion report (2 Nov 2026)

Scope: the two active campaigns only, in Google Ads account Karibu Congo (491-367-0262).

| Campaign | ID | Budget / bidding | Destination |
|---|---|---|---|
| Samori Shop \| Demand Gen \| UK | 24424023520 | £20/day, Maximize conversions, goal "Samori Shop - Affiliate Click", ends 30 Nov 2026 | https://shop.samori.co.uk/ |
| SW \| DemandGen \| Garment Bags \| UK | 24420227918 | £12/day, Maximize clicks, ends 1 Dec 2026 | https://shop.samori.net/collections/garment-bags |

Both use Presence targeting. Their core settings are the intended baseline and were not changed.

## What this session could and could not reach

| Access | Available | Effect |
|---|---|---|
| Git repo `karibucongo1-dev/samoriworld` | Yes | Contains samori.net and karibucongo.com only. No Shopify theme, pixel or tracking code for either store, on any branch. |
| Google Ads (491-367-0262) | No | Campaign settings, diagnostics, change history, asset previews and conversion-action status could not be read. |
| GA4 (properties 556766273, 556773840) | No | Event receipt and DebugView could not be checked. |
| Shopify admin (tjifct-34, xydmiq-em) | No | Themes, drafts, Customer events (pixels) and app embeds could not be read. |
| Live storefronts | No | The session's network proxy blocks both shop domains, so public pages could not be fetched. |

So nothing below is marked complete on the basis of a live test. Every blocked row names the exact step and how to do it by hand.

## Task checklist

| # | Task | Status | Evidence | Remaining action |
|---|---|---|---|---|
| 1 | Find earlier work (branches, themes, drafts, reports) | Partial | Repo: all 7 remote branches searched for `affiliate_click`, measurement IDs, `garment-bags` and Demand Gen notes: none found. Shopify themes and drafts not reachable. | In each store: Online Store → Themes. Record the live theme's name and ID, and any unpublished themes with their last-saved date. Pages: list drafts. Add to this file. |
| 2a | .co.uk tracking trace (button → pixel → GA4 → Ads → goal) | Blocked | No access to Shopify, GA4 or Ads | Follow TRACKING-TESTS.md tests T1–T5 for shop.samori.co.uk. |
| 2b | .net tracking trace, including finding the real measurement ID and Ads action | Blocked | Property 556773840 / stream 15888313055 are from the brief only; not confirmed | GA4 Admin → Data streams → stream 15888313055: copy its Measurement ID (G-…) into TRACKING-TESTS.md. Then run T1–T5 for shop.samori.net. Do not reuse the .co.uk ID or Ads action. |
| 2c | Fix tracking code defects | Not started | No code available to inspect | Export the live theme of each store (Themes → ⋯ → Download theme file) and the Customer events pixel code, and share them. Fixes then go into a duplicated, unpublished theme only. |
| 2d | Explain the "Verify conversion actions" warning | Blocked | Needs Ads → Goals → Conversions → Summary | See TRACKING-TESTS.md "Ads warning" for the diagnosis order. |
| 3 | UK Belkin/accessories landing page | Not started | No existing draft found; store not reachable | Check Online Store → Pages and unpublished themes for a draft first (task 1). If none, build it as a draft page in tjifct-34 from currently published products, then send the preview link. Do not change the ad destination until the preview is approved. |
| 4a | Garment page: verify claims, links, disclosure, mobile | Blocked | Store not reachable | Manual checklist in TRACKING-TESTS.md "Garment page checks". |
| 4b | Review every Demand Gen video variant and placement preview | Blocked | Needs Ads → campaign → Ads → asset group → preview | Record crops, text readability, logo, product fidelity, CTA, claims per variant (template in ADS-CHANGES-FOR-REVIEW.md). |
| 5 | Explain zero delivery on Garment Bags | Partial | Reasoned checklist below; account data not reachable | Run the checks in "Zero delivery" below and record results. |
| 6 | Preserve live settings | Complete | No live setting was changed by this session. All proposals are in ADS-CHANGES-FOR-REVIEW.md, awaiting approval. | None |
| 7 | Handoff files | Complete | This folder (5 files) | Fill in the blocked rows as the manual checks are done. |

## Zero delivery on Garment Bags (task 5)

At the last check the campaign showed "Eligible (Learning)" with 0 impressions and £0 spend. "Eligible" means nothing is blocking it outright, so look for one of these, in this order:

1. **Ad review.** Ads → each ad: status must be Approved, not "Under review" or "Approved (limited)". New Demand Gen video and image assets can take 1–2 business days.
2. **Dates and schedule.** Campaign start date has passed; no ad schedule excludes all hours.
3. **Bid limit.** Maximize clicks with a max CPC cap that is too low can stop all auctions. If a cap is set, record it.
4. **Audience size.** Ad group → Audience: a narrow custom segment, or "optimised targeting" off with a small segment, can leave too few people to serve. Check the audience size estimate.
5. **Channels and exclusions.** Channel controls not reduced to a single small channel; no account-level placement or content exclusions that block most inventory.
6. **Product or destination policy.** Policy manager: any destination or "unavailable video" issue on the ads.
7. **Change history.** Record the date of the last edit to bidding, budget, audience or assets. Each significant edit can restart learning.

If none of these blocks it, treat it as still in learning, not failed. Review again 7 days after the most recent significant edit. Only then consider the controlled test in ADS-CHANGES-FOR-REVIEW.md (one change, a 7-day window, and a rollback).

## Monitoring plan (weekly, both campaigns)

| Metric | Where | Watch for |
|---|---|---|
| Spend vs budget | Ads → Campaigns | Daily spend up to 2× budget is allowed; the monthly cap is 30.4× budget |
| Clicks, CTR, CPC | Ads | CPC rising while clicks fall |
| Landing sessions | GA4 → Acquisition, filtered to source google / cpc | Clicks far above sessions means visitors leave before the page loads, or did not accept consent (GA4 only counts consented visits) |
| Affiliate clicks | GA4 event `affiliate_click`; Ads conversions once verified | These are referrals, not sales |
| Cost per affiliate click | Ads spend ÷ affiliate clicks | Compare with the commission you actually earn per referral |
| Commission actually earned | Each retailer's affiliate dashboard (e.g. Amazon Associates, Impact) | The only revenue figure. Do not use the nominal £1 event value as revenue. |

Decision rule to agree in advance: if, after 14 days of delivery, commission earned is below ad spend and falling, pause the campaign and move budget to search or organic channels.
