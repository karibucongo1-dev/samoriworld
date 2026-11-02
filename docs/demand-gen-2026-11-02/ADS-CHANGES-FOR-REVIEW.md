# Ads changes for review (2 Nov 2026)

Nothing here has been applied. Each item needs your approval before anyone changes the live campaigns. Presence targeting stays on both.

## P1. Samori Shop | Demand Gen | UK (24424023520): pause bidding on an unverified goal

| | Current | Proposed |
|---|---|---|
| Bidding | Maximize conversions, goal "Samori Shop - Affiliate Click" | **Option A:** Maximize clicks with a max CPC of about £0.30. **Option B:** keep the bidding but lower the budget to £8/day |
| Budget | £20/day | £20/day (A) or £8/day (B) |

**Rationale.** The editor still shows "Verify conversion actions", and 150 clicks for £37.50 recorded 0 conversions. With no verified conversions, Maximize conversions has nothing to learn from, so it spends to find any, at up to £40 a day (2× budget). The latest snapshot works out at about £0.25 a click, so a £0.30 cap keeps the current traffic level while limiting surprises.

**Risk.** Changing bidding restarts learning. If the conversion action turns out to work and was just delayed, a few days of conversion learning are lost.

**Rollback.** Switch bidding back to Maximize conversions with the same goal and a £20 budget. Record the time of each change in this file.

**Do first.** Run TRACKING-TESTS.md T1 and T5. If T5 shows the action is "Recording conversions", keep the current setup and review again in 7 days.

## P2. Garment Bags (24420227918): no change until the zero-delivery checks are done

Run the zero-delivery checks in COMPLETION-REPORT.md and record the date of the last significant edit. If every check passes and there are still no impressions 7 days after that edit, run **one** of these tests (only one variable at a time):

- **If a max CPC cap is set:** raise it by 50% for 7 days. Rollback: restore the old cap.
- **If the audience is a narrow custom segment:** turn on optimised targeting for 7 days. Rollback: turn it off.

## P3. Ad destination for Samori Shop: only after the UK page preview is approved

Current destination: https://shop.samori.co.uk/ (homepage, which also features India offers). Proposed: the UK accessories page, once it exists as a draft and you approve the preview. No URL is proposed yet, because no such page or draft has been found.

Matching ad-copy direction (no prices, discounts or "best" claims):
- Headline: "Phone & laptop accessories, UK retailers"
- Description: "Compare chargers and power banks, then buy from the retailer. Prices and delivery set by each retailer."

## P4. Video variant review (template)

Fill in one row per generated variant from each asset group's previews:

| Variant / placement | Crop OK | Text readable on mobile | Logo quality | Product matches the item | CTA accurate | Unsupported claims | Action |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

"Eligible" status doesn't mean anyone has reviewed the visuals. Prepare replacements for any failing variant without editing the live ads.

## Affiliate programme check (before more spend)

Check each retailer programme's paid-search and display rules (for example, Amazon Associates and the Impact brand contracts) to confirm that ads sending traffic to pages with their links are allowed. Some brands forbid using their trademark in ads.
