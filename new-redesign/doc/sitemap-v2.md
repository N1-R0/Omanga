# Omanga sitemap v2: research and recommendation

Date: 2026-10-25. Status: **LOCKED, approved by the owner 2026-10-25.**

This replaces the sitemap in `research-and-page-structure.md` §5 (locked 2026-10-21). The main changes are:
- The owner's naming: **Payments** and **Insurance** are the primary categories, not Wallet and Health cover.
- Live URLs are kept wherever they already exist.
- The persona pages are deferred.

This document covers structure only. Section titles are working titles that state each section's purpose. They are not final copy.

**How the research was done**
- **Sites:** the UK versions of every competitor, fetched 2026-10-25.
- **What was read:** headings and navigation from the server HTML, or from the rendered page for Revolut.
- **Limits:**
  - **omanga.biz:** this machine's DNS doesn't resolve it, so it was fetched by its IP (216.198.79.1).
  - **Revolut:** it serves a bot check to scripts, so it was read in a real browser.
  - **LemFi:** `/gb` redirects to `/en-gb`, and `/gb/send-money-to-nigeria` and `/gb/pricing` return 404, so its corridor and pricing pages were not reviewed.
  - **Depth:** only the pages listed under each competitor were read. This is not a full crawl.

---

## A. Competitor research

### Pages reviewed
| Site | Pages |
|---|---|
| Omanga | [Home](https://www.omanga.biz/), [Payments](https://www.omanga.biz/payments), [Insurance](https://www.omanga.biz/insurance), [Plans](https://www.omanga.biz/plans), [Safety](https://www.omanga.biz/safety), [About](https://www.omanga.biz/about) |
| Wise | [Home](https://wise.com/gb/), [Send money to Nigeria](https://wise.com/gb/send-money/send-money-to-nigeria), [Pricing](https://wise.com/gb/pricing/), [Account](https://wise.com/gb/multi-currency-account/), [GBP to NGN converter](https://wise.com/gb/currency-converter/gbp-to-ngn-rate) |
| LemFi | [Home](https://lemfi.com/en-gb), [Accounts](https://lemfi.com/en-gb/gb/accounts) |
| Revolut | [Home](https://www.revolut.com/en-GB/), [Insurance](https://www.revolut.com/global-insurance/), [Send money to Nigeria](https://www.revolut.com/money-transfer/send-money-to-nigeria/) |
| Remitly | [Home](https://www.remitly.com/gb/en), [Nigeria](https://www.remitly.com/gb/en/nigeria), [Rates](https://www.remitly.com/gb/en/pricing) |

### Omanga today (verified)
- **Header:** Home, Payments, Insurance, Plans, Company (About us, Contact, Blog), Get started, Open your free wallet (→ `omanga.useinclude.com`).
- **Home:** hero, two products, partners, "Everything your trip needs", three steps, 50+ countries, FAQ, closing band. That's 8 sections.
- **Payments:** the hero, "What you can do with the wallet" (6 items), then "Hold, convert and spend" repeating the same points, then a stats row repeating them a third time. Then FAQ and close.
- **Insurance:** hero, what you get (6), how you get care, who provides your cover, FAQ, close.
- **Plans:** three plan cards with Paystack links, comparison table, included in every plan, FAQ, close.
- **Safety:** a direct answer, how Omanga keeps things clear, what Omanga is and isn't, account safety, FAQ.
- **Footer:** Services, Company, Support (Is Omanga safe?, Claims → `/policy-terms#claims`), Legal (5 pages).

**Problems seen**
- "Home" in the nav is redundant.
- "Get started" is a second CTA beside the wallet button.
- Blog is buried under Company.
- The Payments page states the same benefits three times.
- Home has two "what Omanga offers" sections.
- The home link "See all countries" goes to `/plans#coverage`. Visitors looking for where the wallet works land on the insurance plans page.

**Keep**
- The URLs `/payments`, `/insurance` and `/rates/*`.
- The plan cards with direct checkout.
- The Safety page's direct-answer format.
- The "who provides your cover" disclosure.

### Competitors (verified structure)
| | Wise | LemFi | Revolut | Remitly |
|---|---|---|---|---|
| **Header** | Personal / Business / Platform mega-menus. Personal is grouped by Features, Customers (expats, travellers, frequent senders) and Pricing. Help, Log in and Sign up on the right. | Logo, language and **Download app** only. No product menu. | Personal / Business / Kids & Teens / Company. A large mega-menu (40+ links) plus a Plans group. | Personal, Business, **Destination**, Help, Log in, Sign up. |
| **Home sections** | About 10: hero with calculator, proof stats, "The account that moves with you" (5 audience cards), Business, "Safe at every step", reviews, mission, app, country links. | 7: hero with product tabs and calculator, brand story, "Made for you" (products), referral, "Why LemFi", stories, FAQ (3 questions). | 8: "Banking & Beyond", then one H2 per product (salary, savings, spending, AI, safety, investing) and a closing CTA. | About 12: hero, calculator, "Move money your way" (send / pay / receive by intent), trust, safety (3 blocks), app, reviews, blog, country list, FAQ. |
| **How products are introduced** | One account, then routes by audience. | Every product shown at once, including an "Upcoming" tile. | One H2 per product, all with equal weight. | By intent: "I want to send / pay / receive". |
| **Pricing** | A dedicated Pricing page, plus fees shown live in every calculator. | Fees only in the calculator and "Why LemFi". | A plans comparison (Standard to Ultra, with prices) at the foot of the home page. | The "Pricing" URL is really an exchange-rate hub of popular currency pairs. |
| **Trust and regulation** | A home security block (safeguarding, 2FA, fraud checks). The footer names the FCA, the firm reference and the legal entity. | The footer names the entity, FCA registration, reference number and registered office. | A safety H2 on home, a Security & Protection menu, and FCA/PRA wording in the footer. | Three safety blocks on home and a Fraud and Scam Resources link in the footer. |
| **Answering doubts** | Corridor-page FAQs include "How is Wise regulated?" and limits. | FAQ: "Where is LemFi available?" | The insurance page has "What you need to know" with claim steps and "Cancel for any reason" steps. | A delivery guarantee ("or we refund your fees*") and a FAQ question "Is Remitly safe?" |
| **Nigeria page** | About 12 sections: how to send, safety, ways to pay, how to receive, cheapest and fastest, app, reviews, 10 FAQs. | Not reviewed (404). | About 15 sections. Long and repetitive. | Short: hero, three trust points, delivery options with a bank list, reliability. |
| **Rate pages** | `currency-converter/gbp-to-ngn-rate`: converter, chart, stats, rate table, FAQ, other pairings, popular amounts. | — | A list of "Convert GBP to …" pages in the footer. | A rates hub that lists pairs, then pages per pair. |

### Lessons for Omanga (interpretation)
| Adopt | Why |
|---|---|
| Show fees and the rate inside the product, as calculators (Wise, Remitly) | Omanga's real advantage is a mid-market rate shown before you confirm, plus a flat ₦20. Show it; don't just claim it. |
| Pricing kept on the product pages, not a separate page (LemFi, Revolut) | Omanga has one fee and three plans. A pricing page would be thin. |
| A rates hub with pages per pair (Wise, Remitly) | Omanga already ranks with `/rates/*`. A hub gives these pages a parent and a menu entry. |
| A "What you need to know" section and the claim steps on the insurance page (Revolut) | Insurance buyers need limits and how to claim before they pay. Omanga's site doesn't say yet. |
| Entity and regulatory line in the footer (all four) | This is standard practice. Omanga can only add it once the details are confirmed. |
| Help and Log in top right, one primary CTA (Wise, Remitly) | Leaves room for the products. |
| A short header with 3–4 items (LemFi, Remitly) | Omanga has two products, not forty. |

| Avoid | Why |
|---|---|
| Mega-menus and an H2 for every product (Revolut, Wise) | They exist to handle large catalogues. On a two-product site they look empty or padded. |
| Showing products that aren't live ("Upcoming", LemFi) | This would break the rule against overclaiming. Mobile money and cards stay off the site. |
| Claims with an asterisk ("Fees? Almost none", "guaranteed or we refund*") | Omanga can't support them, and they erode trust. |
| A list of 175 countries on the home page (Remitly) and Omanga's own country pill cloud | Noise. Put the list on its own page once it's confirmed. |
| Long corridor pages with repeated H1s and H2s (Revolut, Wise) | Search engines put up with it, but readers don't. Omanga's pages should be short and specific. |
| Generic headings ("Banking & Beyond", "Life, meets savings", "Made for you") | They could belong to any fintech. |

---

## B. Strategic recommendation

**Positioning:** Omanga is for the person arriving, not the person sending money. You pay in Nigeria and across Africa at the real rate, and you have medical cover in Nigeria if you need it. Every competitor reviewed is built to send money *to* Nigeria. Omanga is built for someone who is *in* Nigeria.

**Principles**
1. **Two products, one journey.** Payments and Insurance are the only primary categories. Everything else (rates, guides, trust) supports them.
2. **One home for each fact.**
   - Fees live on Payments.
   - Plan differences live on Plans.
   - Shared benefits live on Insurance.
   - Who-provides-what lives on Safety.
   - Other pages link to these rather than repeating them.
3. **Show proof, not claims.** Lead with the live rate, the price and the named provider. Add regulatory lines only once confirmed.
4. **A page has to earn its place.** It needs search demand or a step in the decision, plus enough verified content. Otherwise it's a section on another page.
5. **Keep live URLs.** `/payments`, `/insurance`, `/rates/*` and the legal URLs already exist. Redirect only where the hierarchy clearly improves.
6. **Insurance wording stays accurate.** "Insurance" is the category. Every insurance page carries the line "Provided by Phillips HMO. Omanga is not the insurer."

---

## C. Proposed sitemap

> Live 2026-10-26: `/`, `/payments` and `/insurance` are in the new design. The other pages stay in the old design at their current URLs until rebuilt; the new header and footer link to them through `href()` (`new-redesign/config/routes.ts`). The 301s below land as each page is rebuilt.

### Hierarchy
```
/                                   Home                            LAUNCH
├── /payments                       Payments                        LAUNCH
│   └── /payments/countries         Where you can pay               LATER (needs the confirmed country list)
├── /rates                          Exchange rates                  LAUNCH (new hub)
│   └── /rates/[pair]               Pounds / Dollars / Canadian dollars to naira   LAUNCH (existing 3)
├── /insurance                      Insurance                       LAUNCH
│   ├── /insurance/plans            Plans and prices                LAUNCH (301 from /plans)
│   └── /insurance/get-care         Get care and claims             LAUNCH if facts confirmed, else LATER
├── /guides                         Guides                          LAUNCH (301 from /blog)
│   └── /guides/[slug]              4 existing posts                LAUNCH (301 from /blog/[slug])
├── /about                          About Omanga                    LAUNCH
├── /safety                         Is Omanga safe?                 LAUNCH
├── /help                           Help and contact                LAUNCH (301 from /contact)
├── /terms-of-use, /privacy-policy, /policy-terms, /complaints-procedure, /cookie-policy   LAUNCH (URLs unchanged)
└── 404

Removed: /get-started → 301 to / (done 2026-10-26)
```

### Primary navigation
```
[Logo]  Payments ▾   Insurance ▾   Guides   Company ▾        Help   Log in   [Open your free wallet]

Payments ▾                 Insurance ▾                    Company ▾
  Payments overview          Insurance overview             About Omanga
  Exchange rates             Plans and prices               Is Omanga safe?
                             Get care and claims

Mobile: [Logo] [Open your free wallet] [☰]. The menu sheet uses the same groups, then Help and Chat on WhatsApp.
```
- No "Home" link, because the logo does that.
- "Get started" is dropped.
- The primary CTA leads to the wallet. Insurance has its own CTA on its pages.

### Footer
| Payments | Insurance | Company | Support | Legal |
|---|---|---|---|---|
| Payments overview | Insurance overview | About Omanga | Help and contact | Terms of use |
| Exchange rates | Plans and prices | Is Omanga safe? | Chat on WhatsApp ↗ | Privacy policy |
| Pounds to naira | Get care and claims | Guides | Complaints | Insurance policy terms |
| Dollars to naira | | | | Cookie policy |
| Canadian dollars to naira | | | | |

**Disclosure block, shown on every page:**
- Shown now: "Insurance plans are provided by Phillips HMO. Omanga is not the insurer."
- Added once confirmed: the legal entity, RC number, registered address, and the wallet provider or licence line.

**App row:** only once the native app is in the stores.

### Where each CTA leads
| CTA | Destination |
|---|---|
| Open your free wallet (header, home, Payments, rates) | Web wallet `omanga.useinclude.com` (external). Store links later. |
| Log in | Web wallet (external). |
| Compare plans (home, Insurance) | `/insurance/plans` |
| Buy Silver / Gold / Diamond | The Paystack checkout for that plan (external) |
| Get naira at this rate (rate pages) | Web wallet (external) |
| Need care now? (Insurance, Help) | `/insurance/get-care` |
| Chat on WhatsApp | `wa.me` (external) |

### Pages and sections

**Home `/`** (updated 2026-10-25, as built at /new; full detail in `home-structure-v2.md` § 3)
*Purpose:* explain both products in seconds and send each visitor to the one they need.
1. Hero: Pay across Africa. Stay covered in Nigeria. (two CTAs)
2. Partners strip
3. Your money and your health, sorted for the trip (Payments card, metrics, Insurance card)
4. Set up at home before you fly (three steps)
5. Why Omanga (kept from the earlier preview)
6. Countries (kept from the earlier preview)
7. FAQ
8. Closing band: land with everything sorted

*Removed from Home:* "What Omanga does" and the health-cover prices section (both replaced by 3). No fee amounts, rate source or refresh timing anywhere (owner, 2026-10-25).

**Payments `/payments`** (revised again and approved by the owner 2026-10-25; applied at /new/payments)
*Purpose:* show how you hold, convert and pay across Africa, in the order a trip runs.

Research, 2026-10-25 (Wise multi-currency account, Monzo travel, LemFi accounts): account pages run 6 to 8 sections. A repetition audit found converting shown four times, pay by transfer four times and adding money three times across "What you can do", "Paying in person" and "Going home", so those three became one walkthrough.

1. Hero: Travel money, ready when you land (the converter in a frosted box)
2. Proof strip: 50+ countries, add from 3 currencies, pay by transfer, free to open
3. How it works: From home to Nigeria, and back again (four-step walkthrough: add money, convert to naira, pay by transfer, going home)
4. Pay in 50+ countries across Africa (globe and list)
5. Wallet questions, answered
6. Closing band: your naira, ready before you land

*Removed:* "See the rate before you convert", "What you can do", "How you pay at a shop, a hotel or a taxi" (the screenshot prototype) and "Naira left when you fly home?". Their content lives in How it works.

**Exchange rates `/rates`**
*Purpose:* the parent page for rate searches, and a quick check of today's naira rates.
1. Today's naira rates (converter and rate table)
2. Rates by currency (links to the pair pages)
3. How Omanga's rate works (the mid-market rate, explained once)
4. Rate questions

**Rate page `/rates/[pair]`**
*Purpose:* win "[currency] to naira today" searches and turn them into wallet sign-ups.
1. [Currency] to naira today (converter, rate, time, source)
2. What your money gets you (amount table)
3. Change [currency] to naira with Omanga (three steps, CTA)
4. Questions about this rate (unique to the pair)
5. Other naira rates

**Insurance `/insurance`** (revised and approved by the owner 2026-10-26; building at /new/insurance)
*Purpose:* explain what the cover is, show the three plans, show how care works and who provides it, so the visitor is ready to buy.

Research, 2026-10-26 (SafetyWing Nomad Insurance, World Nomads UK; Genki's page 404s): both put the plans and prices second or third, right after a short reassurance block, then what's covered, then help or emergency contact, a short FAQ (4 to 5) and a closing CTA. Neither sells by feature lists alone: the plan cards do the selling, and the reassurance answers "can I trust this abroad".

1. Hero: Travel health insurance for your trip to Nigeria (built; buy-flow Lottie), then the Payments-style proof strip with insurance facts (owner, 2026-10-26)
2. What it is and what it isn't (built; Nigeria only, not travel insurance, not an entry requirement)
3. Choose your plan (built; Vercel layout): Silver, Gold and Diamond at a glance, each with its price and a buy link; full comparison on Plans and prices
4. What every plan includes (built; Superpower grouped panel): the shared benefits only
5. ~~How you get care in Nigeria (step walkthrough, the Payments format: pick a plan, your cover in the app, go to a network hospital and Phillips HMO handles your care)~~ (dropped by the owner 2026-10-26: not needed)
6. ~~Who provides your cover (Phillips HMO as provider, Omanga's role, WhatsApp support, link to Is Omanga safe?)~~ (skipped by the owner 2026-10-26; the provider question moves into the FAQ)
7. Insurance questions (built; the Payments FAQ UI)
8. Closing band: choose your plan (built; the Payments closing UI)

*Not a separate section:* "Good to know before you buy". Nigeria-only and not-travel-insurance already live in section 2; exclusions, waiting periods and age limits join the FAQ once confirmed (§ 8.4).
*Copy fixes in the built sections:* "Health cover" becomes "Insurance" as the category (owner naming); "Cancel any time" comes out until confirmed (§ 8.1; the home page already leaves it out).

**Plans and prices `/insurance/plans`**
*Purpose:* compare the three plans and buy one.
1. Choose your plan (Silver, Gold and Diamond cards, each with its price and Buy button)
2. Compare every benefit (table)
3. Choosing a plan: questions (including buying for someone else)

**Get care and claims `/insurance/get-care`**
*Purpose:* tell an insured customer what to do when they need care or a refund. It must load fast on a weak signal.
1. Need care now? (emergency and Phillips HMO lines, tap to call)
2. What to do at the hospital
3. Find a network hospital
4. Making a claim
5. Still need help? (WhatsApp, email)

**Guides `/guides`**
*Purpose:* answer pre-trip questions people search for, and lead them to Payments or Insurance.
1. Guides for your trip
2. Featured guide
3. All guides, filterable by Money, Health and Travel

**Guide `/guides/[slug]`**
1. Summary answer
2. Article (with one product block placed where it's relevant)
3. Questions
4. Related guides

**About Omanga `/about`**
*Purpose:* show who is behind Omanga and why it exists.
1. Why we built Omanga
2. What we stand for (mission and values merged)
3. Partners and what each one does
4. The team (once names and photos are agreed)
5. Where to find us

**Is Omanga safe? `/safety`**
*Purpose:* answer the sceptic directly and stop the brand-name mix-up in search.
1. The short answer
2. Who provides what
3. Licences and registration (only once confirmed)
4. Keep your account safe
5. If something goes wrong (contact and complaints)
6. Safety questions

**Help and contact `/help`**
*Purpose:* get people to an answer or a person quickly.
1. How can we help? (WhatsApp first, then email and phone)
2. Need care in Nigeria? (banner to Get care)
3. Common questions by topic (Payments, Insurance, Account), with links out
4. Send us a message
5. Our office

**Legal pages** (5, URLs unchanged)
*Purpose:* the binding terms, kept easy to read.
1. Title and last updated
2. On this page
3. Body
4. Related legal pages

**404**
1. This page isn't here
2. Popular pages: Payments, Insurance, Exchange rates

---

## D. Implementation priorities

### Launch
- Home, Payments, Exchange rates hub plus the 3 rate pages, Insurance, Plans and prices.
- Is Omanga safe?, About Omanga, Help and contact, Guides with the 4 posts, the 5 legal pages, and 404.
- 301 redirects: `/plans`, `/blog`, `/blog/[slug]`, `/contact`, `/get-started`.
- **Before launch, the legal pages must be cleaned up:** remove the live drafting notes and the regulator and operator wording that contradicts the marketing.

### Kept as sections, not pages
| Topic | Lives on |
|---|---|
| Fees and pricing | Payments §3 and Plans |
| How it works | Home §4 and Payments §5 |
| Supported countries | Payments §4, until the full list is confirmed |
| Partners | Home §5 and About §3 |
| Claims | Get care, or until then the claims section of the policy terms |
| Buying for someone else | Plans FAQ |
| Mission, vision and values | About §2 |

### Deferred until the product or facts are ready
| Page or section | Waiting for |
|---|---|
| `/insurance/get-care` | Emergency line, hospital list, claims steps |
| `/payments/countries` and `/payments/[country]` | The confirmed country list and what works in each country |
| More rate pairs (e.g. cedis, euros) | Confirmed supported currencies |
| Persona pages (going home, visiting Africa, business trips) | Guide traffic showing demand. Until then, guides cover these searches. |
| Licences and registration (Safety, footer) | Legal entity, RC number, licences |
| The team (About) | Names and photos |
| App download row and page | Native app in the stores |
| Virtual accounts, cards, sending to Omanga users, mobile money | The owner confirming they are live and may be marketed |
| Careers, press, referral, business | No product or content yet |

### To confirm before final sign-off
1. Plan terms: monthly and "cancel any time", or 30 days for one payment? This affects Plans and the Insurance "Good to know" section.
2. Whether "insurance" may be used, given that Phillips HMO is an HMO. The owner prefers it, and the disclosure line is kept as a safeguard.
3. The facts for Get care: emergency number, Phillips HMO line, hospitals, claims steps.
4. Wallet facts: currencies held, conversion fee, limits, and the full list of countries.
5. The legal entity, RC number, licences, and the roles of Fuspay and Zira.
