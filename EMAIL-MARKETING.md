# Email marketing: shop.samori.co.uk + Brevo

Goal: Shopify customers and sign-ups flow into Brevo, and Brevo sends campaigns from an `@samori.co.uk` address that passes SPF, DKIM and DMARC.

Three admin panels are involved:

| Panel | Used for |
|---|---|
| cPanel (premium354) → Email Accounts | the sender mailbox that receives replies |
| DNS for samori.co.uk (see step 2) | authentication records for Brevo |
| Brevo → Senders, Domains, Campaign settings | the sending domain, sender and campaign defaults |
| Shopify admin → Apps | the Brevo app that syncs customers and orders |

Copy every DNS value **from Brevo's screen**. The names below show the shape of each record, but the actual values are generated for your account.

## 1. Create the sender mailbox (cPanel)

cPanel → Email Accounts → Create:

- Domain: `samori.co.uk`
- Username: `hello` (or `news`), so the address is `hello@samori.co.uk`
- Pick a strong password and store it in your password manager, not in this repo or a chat.

Brevo emails a code to this mailbox in step 3, and customer replies arrive here. Open it once in Webmail to check that mail is delivered.

## 2. Find where samori.co.uk DNS is managed

Look up the nameservers in cPanel → Zone Editor, or at the registrar:

- `dns1/dns2.namecheaphosting.com`: edit records in **cPanel → Zone Editor → samori.co.uk → Manage**.
- Shopify nameservers, or the domain was bought through Shopify: edit in **Shopify admin → Settings → Domains → samori.co.uk → DNS settings**.
- Anything else (e.g. Cloudflare, or Namecheap BasicDNS): edit at that provider.

Don't touch the existing `shop` CNAME (`shops.myshopify.com`) or the MX records. The storefront and the cPanel mailboxes depend on them.

## 3. Authenticate samori.co.uk in Brevo

Brevo → profile menu → **Senders, Domains & Dedicated IPs** → **Domains** → **Add a domain** → `samori.co.uk` → **Authenticate the domain yourself** (manual).

Brevo lists 3–4 records. Add each one in the DNS editor from step 2:

| Type | Name (host) | Value (shape) |
|---|---|---|
| TXT | `@` / `samori.co.uk` | `brevo-code:xxxxxxxx` |
| CNAME | `brevo1._domainkey` | `b1.samori-co-uk.dkim.brevo.com` |
| CNAME | `brevo2._domainkey` | `b2.samori-co-uk.dkim.brevo.com` |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |

Rules:

- **Only one SPF record** (`v=spf1 …`) per domain. cPanel's mail already has one, usually something like `v=spf1 +a +mx include:spf.web-hosting.com ~all`. If Brevo lists an SPF include, add it to that same record: `v=spf1 +a +mx include:spf.web-hosting.com include:spf.brevo.com ~all`. Two SPF records make both fail.
- **Only one `_dmarc` record.** If one already exists, keep its policy and add Brevo's `rua` address to it instead of adding a second record.
- cPanel's own DKIM (`default._domainkey`) stays. It doesn't clash with `brevo1`/`brevo2`.
- In cPanel → **Email Deliverability**, don't click "Repair" on SPF after adding Brevo, or it may rewrite the record without the Brevo include.
- In Namecheap / cPanel host fields, enter `brevo1._domainkey`, not `brevo1._domainkey.samori.co.uk`. Some editors append the domain themselves.

Then go back to Brevo → Domains → **Authenticate**. DNS can take from minutes to a few hours. All rows should turn green.

After a week or two of clean sending, raise DMARC to `p=quarantine`.

## 4. Add the sender (Brevo)

Brevo → Senders, Domains & Dedicated IPs → **Senders** → Add:

- From name: `Samori`
- From email: `hello@samori.co.uk`

Enter the code sent to the mailbox from step 1.

## 5. Campaign defaults (Brevo → Campaign settings)

At `app.brevo.com/campaign-settings`:

- Default sender: `Samori <hello@samori.co.uk>`, reply-to the same address.
- Footer / company details: registered business name and postal address. UK PECR and Brevo's terms require it in every marketing email.
- Unsubscribe: keep the Brevo unsubscribe link and the "update profile" link in the footer.
- Tracking: turn on open and click tracking and **Google Analytics / UTM tracking** (`utm_source=brevo`, `utm_medium=email`), so sales from campaigns show up in Shopify analytics.
- Double opt-in for forms: on. A confirmation email is sent before the contact joins the list.

## 6. Connect Shopify to Brevo

Shopify admin → **Apps** → Shopify App Store → install **"Brevo: Email Marketing & SMS"** (by Brevo) → log in with the Brevo account → approve the permissions.

In the app:

1. **Contact sync**: sync customers into a new Brevo list, e.g. `Shopify customers`. Sync only customers whose *Email marketing* status is **Subscribed**. Everyone else can still receive transactional mail from Shopify but must not get campaigns.
2. **Order and cart sync**: turn on, so Brevo gets orders, products and abandoned carts.
3. **Tracking script**: enable it (theme app embed: Online Store → Themes → Customize → App embeds → Brevo → on). Abandoned-cart and browse events depend on it.
4. **Sign-up forms**: either keep the theme's own newsletter form (Shopify marks those customers "Subscribed" and the app syncs them), or use a Brevo form. Don't use both on the same page.
5. Turn on **consent at checkout**: Shopify → Settings → Checkout → Marketing options → *Email*. The box is **unticked** by default, as UK GDPR requires.

## 7. Starter automations (Brevo → Automations)

- **Welcome**: trigger *contact added to list "Shopify customers"* → welcome email with a first-order code (create the code in Shopify → Discounts).
- **Abandoned cart**: Shopify template, first email after 1 hour, reminder after 24 hours.
- **Post-purchase**: order placed → thank-you email, review request 7–10 days later.

## 8. Test before the first campaign

- Brevo → Domains: every record green.
- Send a test campaign to a Gmail address → Show original → `SPF: PASS`, `DKIM: PASS` (d=samori.co.uk), `DMARC: PASS`.
- Subscribe on shop.samori.co.uk with a test address → contact appears in the Brevo list within a few minutes.
- Add to cart, leave, wait an hour → abandoned-cart email arrives.
- Click unsubscribe in a test email → contact is blocklisted in Brevo and shows "Unsubscribed" in Shopify.

## Not covered here

The newsletter box on samori.net (`src/components/Newsletter.tsx`) only shows a thank-you message and stores nothing. To collect those addresses in Brevo, replace it with a Brevo embedded form. The site is a static export and `.htaccess` rejects POST, so the form must post directly to Brevo and needs Brevo's form host added to the CSP.
