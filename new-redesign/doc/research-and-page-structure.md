# Omanga redesign: research and page structure

Date: 2026-10-21. Status: steps 1 to 3 done. Step 4 (design direction and
overall feel) is on hold until the owner gives input.

This document covers:

1. how competitors structure their websites, from the homepage to the last page
2. what Omanga does today and what sets it apart
3. the proposed structure of every page, section by section, from the header down.

It does not set a visual direction. Layout notes describe content and
interaction only (for example "converter" or "photo"), not style.

Sources:
- Live omanga.biz, all sitemap pages (fetched 2026-10-21).
- This repo's `content/` folder, `design.md` and `omanga.biz-audit/`.
- The `omanga-mobile` app.
- Live competitor pages (fetched 2026-10-21). Revolut blocks automated fetches, so its notes come from search results only.

---

## 1. Omanga today

### What it is
Omanga is one account for people travelling to Nigeria. It has two products.

**Wallet (Omanga Payment Solutions)**
- Free to open. Fund it in USD, GBP or CAD, with no minimum.
- Holds "6+ currencies". Converts at the mid-market rate, refreshed hourly and shown before you confirm.
- ₦20 per transfer.
- Spend online or in person in "50+ African countries".
- Three live rate pages: GBP, USD and CAD to naira.

**Health cover (Omanga Holiday Insurance)**
- Monthly plans, Nigeria only, provided through Phillips HMO and its own hospital network. Omanga is not the insurer.

| Plan | Price | Hospitals | Ward | Scans |
|---|---|---|---|---|
| Silver | $50/mo | Category A | Semi-private | 1 CT/MRI |
| Gold | $85/mo | A and B | Private | 2 |
| Diamond | $120/mo | A, B and C | Private | Unlimited CT |

Every plan includes admission, diagnostics, emergency evacuation, drugs, telemedicine, roaming across Nigeria and the app.

**How people sign up today**
- The wallet opens off-site in a web app (`WALLET_URL`).
- Cover is bought through Paystack checkouts.
- A native app is coming, and it will change every sign-up CTA.

**What the app does that the site never mentions**
- 11 currencies plus stablecoins.
- USD, GBP and EUR virtual accounts.
- Mobile money, send to a bank or to another Omanga user.
- Virtual cards and a marketplace.

The site's no-"card" copy rule contradicts the app's virtual cards. See the open questions in §8.

### What differentiates Omanga
Confirmed by the competitor sweep in §3:

1. **Money and health cover for one destination, in one place.** No competitor pairs spending money with medical cover in Nigeria. Travel insurers don't touch money. Wise, LemFi and Blink don't touch health. Revolut and Monzo bundle generic travel insurance, but name no Nigerian hospitals.
2. **Care through a local hospital network, not a refund form.** Global insurers make you pay first and claim later. Nigerian HMOs sell to "family back home" in naira, through clumsy channels.
3. **Rate honesty in naira.** Omanga shows the mid-market rate before you confirm and charges a flat ₦20. Wise-grade transparency is rare among Africa-focused competitors (Grey, Afriex and Blink are vague).
4. **Built for the visitor, not the sender.** Every money competitor is remittance-first: they send *to* Nigeria. Omanga is for the person who is *in* Nigeria. That includes foreign visitors, whom nobody targets.
5. **Monthly cover for the length of the trip.** It is not an annual policy.

### What weakens it (fix before or during the redesign)
- **Trust and identity.**
  - No legal entity, RC number, named people or licence details on the site.
  - Legal pages still name a regulator and operator that marketing has dropped, and live drafting notes are visible.
  - "Is Omanga safe" searches return results about a Kenyan senator.
- **Contradicting terms.** Marketing says monthly and "cancel any time". The policy terms say 30 days, one payment, no automatic renewal.
- **"One account" is not true yet.** The wallet and cover are bought in two separate places.
- **Insurance facts missing.**
  - Hospital categories A/B/C are undefined and no hospitals are named.
  - Nothing on exclusions, waiting period, age limits, emergency number or claims process.
  - Nothing saying "cover is not an entry requirement".
- **Wallet facts unconfirmed.**
  - Which six currencies.
  - Whether converting is free.
  - Limits.
  - The full country list.
  - How you "pay in person" without a card.
- **Price.** Next to the Lagos State scheme (LASHMA Waka-Well, reported at about ₦45,000 for 90 days), Omanga at $50/month looks expensive unless the value is explained.

---

## 2. Users

| User | Who | What they need to do | Fears | Questions they search |
|---|---|---|---|---|
| **Diaspora visiting home** (primary) | British-, American- or Canadian-Nigerians going home for December, weddings or family. 1–4 weeks. | Get naira at a fair rate. Not carry cash. Be covered if they or their kids fall ill. | Being ripped off on the rate. The home card blocked. Hospitals asking for a deposit. "The NHS won't pay." | "pounds to naira today", "best way to take money to Nigeria", "do I need insurance for Nigeria", "Detty December checklist" |
| **First-time foreign visitor** | Tourist or partner of a Nigerian, often from the US or UK, nervous. | Understand how money works there and have a plan if something goes wrong. | Safety. Not having a BVN or NIN, which local wallets require. Scams. Malaria. | "is Nigeria safe", "is insurance required to enter Nigeria", "how far does $100 go", "can foreigners use OPay" |
| **Business traveller** | Lagos or Abuja trips. Paid by the company or reclaims expenses. | Receipts, limits, named hospitals, company details, paying in person. | Wasted time. Unclear costs. | "business travel Nigeria payment", "health cover Lagos business trip" |
| **Sceptic** (overlaps all three) | Anyone checking Omanga before handing over money. | Proof Omanga is real, who holds the money, and what happens if it goes wrong. | Losing money to an unknown brand. | "is Omanga safe", "Omanga reviews", "who owns Omanga" |
| **Buyer for someone else** (secondary) | Diaspora buying cover for a visiting relative or a partner travelling ahead. | Buy cover in GBP or USD for another person. | Paperwork. | "health insurance for family visiting Nigeria" |

**Design implications**
- The homepage must answer, in order:
  1. What is this?
  2. Is it for me?
  3. How much?
  4. Can I trust it?
  5. What do I do now?
- Diaspora visitors and foreign visitors need different reassurance. The diaspora want rate and convenience. Foreign visitors want safety and how things work. Give each a route ("I'm going home" or "I'm visiting Nigeria") without splitting the site.
- Business travellers get one section, not a whole product line, until the product supports invoices.

---

## 3. Competitor research

Thirteen brands were reviewed across three groups.
- **Money:** Wise, LemFi, Grey, Monzo Travel, Revolut, Afriex, NALA, Taptap Send, Chipper Cash.
- **Direct naira-for-visitors:** Blink Travel Card (O3), Send App Travel Card.
- **Health and travel:** SafetyWing, Genki, World Nomads, Heymondo, Reliance Health, LASHMA Waka-Well, Airalo, Holafly.

### 3.1 How they structure the homepage

| Brand | Opens with | Order after the hero | Proof | Closes with |
|---|---|---|---|---|
| **Wise** | Promise: "saves you money" | Calculator → travel → stats → personas → **safety** → reviews → mission → app (QR) → coverage | Scale numbers, Trustpilot, FCA, safeguarding | Where Wise works |
| **Monzo Travel** | "The bank made for travel" + badges | Features → controls → 3 steps → stats → **insurance blocks** → **"Tips for a smooth take-off"** → converter → guides → FAQ | Ratings, awards, FSCS | "Time to go full Monzo" |
| **LemFi** | Aspiration: "Built for people going places" | Products → **converter** → ratings → **video stories** → referral → why → FAQ | Trustpilot, store ratings, stories | FAQ (no closing band) |
| **Blink** (closest money rival) | "Be here from there" | Spend like a local → culture → "Zero = Free" → stats → 3 steps → **"From touchdown to homecoming" journey** → press → security → reels → FAQ | CBN, PCI, creators | "Your next trip starts with one card" |
| **NALA** | Mission + ratings in hero | Wallet → speed → **FX transparency** → limits → security → testimonials → FAQ → blog | Logo wall, licences page | QR download |
| **Taptap Send** | Calculator in hero, CTA "Send At This Rate" | Corridor flags → regulated → steps → testimonials | State licences | Nothing (stops) |
| **SafetyWing** | Freedom, illustrated | Benefits → plan cards → **price calculator** → what's covered → insurer → stories → FAQ | Named underwriter, stories | "Ready for all of life's adventures?" |
| **Genki** | "Stay healthy as you explore" + Trustpilot | Network map → **"You get better. We'll get the bill."** → sports → reviews → guide → help | 75k members, "80% paid in 2 days" | Chat with us |
| **Heymondo** | "Insure the trip of your dreams" + 3M stat | Blog logos → benefits → products → **app screens** → reviews → AXA | Partner insurer logo | Partner logos |
| **Airalo** | Utility: "A better way to stay connected" | Benefits → videos → **destination tiles with prices** → FAQ → support → magazine → app | 30M users, store ratings | App download |

### 3.2 The standard page grammar (what users already expect)
1. **Header.** Small. Personas or products in a mega-menu, plus Log in and **one** primary CTA.
2. **Hero.** One-line promise and one CTA, with a proof row (ratings, users or press) in or under it.
3. **Converter or price in or under the hero.** Brands without one (Grey, Afriex) read as vaguer.
4. **Product cards (3–6)**, then **how it works in 3 steps**.
5. **Security / "safe at every step"** as its own section: safeguarding, regulator, controls.
6. **Testimonials** (Trustpilot carousel, or video stories).
7. **App download** (QR on desktop).
8. **FAQ.** Questions written as search queries.
9. **Closing CTA band.**
10. **Footer.** Five or six columns: Products, Company, Resources/tools, Help, Legal. A directory of countries or corridors. A dense regulatory block.

**Corridor and destination pages** follow Wise:
- H1 named after the corridor
- calculator
- 3 steps
- security
- ways to pay
- comparison table
- reviews
- FAQ
- directory.

Every H2 on these pages is a search query.

**Insurance product pages** follow Genki and SafetyWing:
- hero with a "from" price
- 3 highlights
- one headline limit
- **"what's covered" tile grid**
- how claims work
- **"Good to know"**: exclusions in plain sentences, plus a worked example
- who's who (agent vs insurer)
- documents
- FAQ.

### 3.3 Storytelling patterns
- **Promise first, fear later.** No one leads with fear. Fear comes in as true stories (World Nomads' "true claim" stories) or as the "without us" side of a comparison (Wise: banks hide fees in the rate).
- **Journey storytelling is rare and unclaimed.** Only Blink uses a trip arc ("From touchdown to homecoming"), and loosely. None ties it to what to do *before you fly*.
- **Proof by specifics.** The most trusted sites publish numbers:
  - Wise: actual fees and comparison tables.
  - Genki: a worked deductible example and claim speed.
  - Monzo: exact caps.
- **Culture as differentiation.** Blink (owambe, street food) and Chipper (football, music) use Nigerian culture. LemFi uses diaspora emotion ("Because when Mum needs it…"). Global brands can't.
- **Human help as a section.** Genki, Airalo and Heymondo give WhatsApp or chat support its own section, not just a footer link.

### 3.4 Ideas worth borrowing
| Idea | From | Use on Omanga |
|---|---|---|
| Live rate in the CTA ("Send At This Rate") | Taptap, LemFi | Converter CTA "Get naira at this rate" |
| Published fees and footnoted caveats | Wise, NALA | Wallet fees table and a "Transparency" footer column |
| Long travel page bundling money, cover and tips | Monzo Travel | Home and "Before you fly" guide |
| Trip journey cards | Blink | The site's story spine (§4) |
| "You get better. We'll get the bill." | Genki | Explain HMO direct care in one line |
| "What's covered" tiles and "Good to know" exclusions | Genki | Health cover page |
| Price calculator with "from" price | SafetyWing | Plans: trip length → months → total |
| Destination tiles with prices | Airalo | Cities (Lagos, Abuja, Port Harcourt…) with hospitals and tips |
| True stories | World Nomads, LemFi | "When it went wrong, here's what happened", but only real, owner-supplied stories |
| Who's-who panel (agent vs provider) | Genki, World Nomads | Safety page and footer |
| App screens as proof | Heymondo, NALA | Wallet balance, plan in the app |

### 3.5 Gaps no competitor fills
1. Nobody pairs money and health cover for Nigeria.
2. Nobody speaks to **foreign** visitors. Every money brand targets diaspora senders.
3. Nobody explains the **arrival problem** in plain words:
   - local wallets need a BVN or NIN
   - home cards get declined
   - cash-only sellers
   - bureau de change and street-rate risk.
4. Nobody answers **"what happens to my leftover naira when I leave?"**
5. Nobody shows **what naira buys**: a danfo ride, a plate of jollof, a Lagos ride-hail.
6. Nobody has **trip-type pages**: wedding guest, Detty December, first visit, business trip.
7. Direct rivals have a low quality bar. Blink has live placeholder text and contradictory numbers, and Chipper's pages are bloated. A clear, consistent and honest site stands out.

---

## 4. Story spine and tone of voice

### The story: the trip timeline
The site tells one story, the trip, and every page sits somewhere on it:

| Stage | User's state | What Omanga does | Where it lives |
|---|---|---|---|
| **Before you fly** | Planning, comparing, slightly anxious | Open the wallet, add pounds or dollars, pick cover | Home, Wallet, Plans, Guides |
| **When you land** | Tired, unsure, no local account | Naira ready at the shown rate, cover active, plan in the app | Home, Wallet, Health cover |
| **While you're there** | Spending, moving around, maybe ill | Pay, convert, transfer. If ill, go to a network hospital and the HMO handles care | Wallet, Health cover, Get care now |
| **Going home** | Wrapping up | Stop cover, keep or move leftover balance (needs owner facts) | FAQ, Wallet |

The ending belongs to Omanga alone: **homecoming**. Competitors close on
"adventures". Omanga closes on arriving home, or arriving in Nigeria,
with everything sorted. The approved line "Land with everything sorted" already does this.

### Tone of voice (keep and sharpen the current voice)
Current approved traits, which hold up against competitors:
- **Plain and second-person.** One person talking to another.
- **Short.** Headings of 8 words or fewer; sentences of 25 words or fewer.
- **Specific over adjectives.** "₦20 per transfer", "mid-market rate", "Phillips HMO". Never "low fees" or "trusted partners".
- **Calm, not hype.** "Land with everything sorted", not "Revolutionise your travel".
- **Honest about limits.** "Nigeria only", "Omanga isn't the insurer".
- **Lightly Nigerian.** Warm and cultural where it helps (Detty December, owambe, jollof), never slang-heavy.
- **British spelling.** Sentence-case CTAs, verb then noun.

Where competitors set the bar:

| Benchmark | Their voice | What to take | What to avoid |
|---|---|---|---|
| Wise | Precise, mildly combative | Precision about fees | The combativeness |
| Blink | Naija-insider | Warmth | The vibe-over-facts |
| Genki | Warm, confident | One-line clarity ("You get better. We'll get the bill.") | — |
| LemFi | Diaspora emotion | Family moments, sparingly | — |

Copy rules carried over from `design.md` (unchanged until the owner changes them):
- No "card" or "cards" (under review, see §8).
- "50+ countries" refers to the wallet only.
- One noun per thing: wallet, health cover, plan.
- No regulator named until licences are confirmed.
- No 24/7 claim, no invented people or stories.
- Don't target "send money to Nigeria".

---

## 5. Sitemap, header and footer

Moved to `sitemap-v2.md` (LOCKED 2026-10-25). The v1 sitemap from 2026-10-21 has been removed. Where §6 differs from v2 on URLs, page names or which pages exist, v2 wins.

---

## 6. Page structures

Each page lists:
- the job of the page
- who it is mainly for
- its sections in order: section, purpose, content, interaction.

The `[ ]` marks content that needs owner facts before the section can ship.

### 6.1 Home `/`
**Job:** say what Omanga is in five seconds, route each visitor type, prove it with a number, and get one action ("Open your free wallet").
**Primary users:** diaspora visiting home, first-time visitors and sceptics.

**v4, LOCKED 2026-10-21 by the owner. Change only with owner sign-off.** v2 was rejected: it
read like the competition, never said what Omanga does, and led with "the
arrival problem". v3 leads with the product and follows six owner-supplied
reference layouts (img 1 to 6). v4 adds a health cover price section and a
Wise-style countries section. Wireframe: `design-lab/home-wireframe.html`.

| # | Section | Layout (ref) | Content |
|---|---|---|---|
| 0 | Header | Overlaid on the hero photo (img 1) | Global header |
| 1 | **Hero** | Full-bleed photo, centred H1, sub, CTA (img 1) | "Pay across Africa. Stay covered in Nigeria." Sub: "A free wallet for 50+ African countries, plus monthly health cover for your time in Nigeria. Rate shown before you pay." (Replaces "Pay and stay covered in Nigeria", which made the wallet read Nigeria-only against the Africa-wide naming rule, 2026-10-21.) "Open your free wallet" + "Compare health plans" |
| 2 | **Partners** | Thin logo strip (img 3) | Confirmed partners only `[ ]` |
| 3 | **What Omanga does** | Eyebrow + H2, accordion list left, photo with app screen right (img 2) | Five rows: convert at the real rate, send for ₦20, pay in 50+ African countries, health cover from $50 a month, get care at a network hospital. The screen swaps per row; the converter lives in row 1. Each row links to its sitemap page: /rates, /wallet, /wallet/countries, /health-cover/plans, /get-care. |
| 4 | **Sorted before you land** | Three photo cards with an app screen on each (img 4) | Approved three steps: open your free wallet, add money, pick your cover |
| 5 | **Health cover prices** | Eyebrow + H2, trip-length toggle, three plan cards with "Popular" tag (pricing ref) | Silver $50, Gold $85 (Popular), Diamond $120 per month, five lines each, "Get [plan]" CTA, "every plan includes" line, link → /health-cover/plans. Toggle shows the trip total `[ ] plan terms, §8 Q1` |
| 6 | **Why Omanga** | 3×2 tile grid (img 5) | Mid-market rate, one flat fee, no minimum, care not claims, who's who, WhatsApp help. Link → /safety |
| 7 | **Countries** | Wise "works nearly everywhere": H2, pill tabs, flag + underlined link grid, "Show all" | "Omanga works across Africa". Tabs: "Pay in" (country list) and "Exchange rates" (rate pairs → /rates/[pair]). Links → /wallet/countries until /wallet/[country] exists `[ ] country list, §8 Q5` |
| 8 | **FAQ** | Two-column question grid (img 6) | 8 questions written as search queries |
| 9 | **Final CTA** | Split card, copy left, app screen right (img 6) | "Land with everything sorted" + CTAs |
| 10 | Footer | Brand blurb + link columns (img 6) | Global footer as locked in sitemap-v2.md: five columns, disclosure block |

Moved off the home page: the arrival problem (removed), the trip timeline
(→ /how-it-works), trip-type tiles (→ Travel menu and travel pages), the guides
teaser (→ /guides), and "what naira buys" (→ /visiting-africa and the rate pages).

**Sections deliberately left off the homepage:**
- a partner logo wall (it goes into the proof row)
- the country pill cloud (moves to /wallet)
- the full plan table (moves to /health-cover/plans).

### 6.2 About the wallet `/wallet`
**Job:** turn "is the rate fair and does it work there?" into "open the wallet".
**Users:** everyone, especially rate-sensitive diaspora visitors.

| # | Section | Content | Interaction |
|---|---|---|---|
| 1 | Hero | H1 "Travel money, ready when you land". Sub-line: fund in pounds, dollars or Canadian dollars, spend in naira. CTA "Open your free wallet" | Converter + app home screen |
| 2 | Proof numbers | 50+ countries · 6+ currencies `[ ] which` · ₦20 per transfer · no minimum | Stat strip |
| 3 | What you can do | Add money, hold, convert, pay, transfer, see every payment | 6 feature tiles with app crops |
| 4 | **How you pay in person** | The question no competitor answers. Explain the in-person mechanism plainly. **Owner 2026-10-22: you pay by transfer.** Cards are still not mentioned (§ 8.2) | Steps with screens |
| 5 | ~~**Fees, in full**~~ **Dropped (owner, 2026-10-22):** only Wise shows a fee table, on a separate Pricing page; others show the fee in the converter. Confirmed fees live in the proof strip and the FAQ. | Every fee in a table: opening, funding, converting, transferring, leftover balance. Footnoted rate source and refresh time (Wise and NALA pattern) `[ ] confirm each fee` | Table |
| 6 | Rate honesty | What the mid-market rate is, why the street or bureau rate differs, and how Omanga shows the rate before you confirm | Link to /rates |
| 7 | Countries | Teaser of the 50+ countries → /wallet/countries `[ ] full list` | Link |
| 8 | **Leftover naira** | What happens when you fly home. **Owner 2026-10-22: leftover naira can be converted to dollars.** | — |
| 9 | ~~Safe at every step~~ **Dropped (owner, 2026-10-23):** competitors rarely give safety its own section on a product page; it lives on /safety and in the FAQ. | Account protection, who holds funds, link to /safety | 3 cards |
| 10 | ~~Pair it with cover~~ **Dropped (owner, 2026-10-23):** insurance pulls a payments page off topic. Cover is one text link in the closing band instead. | Cross-sell: "Add health cover from $50 a month" | Link |
| 11 | FAQ | Wallet questions | Accordion |
| 12 | Closing band + footer | — | — |

### 6.3 About health cover `/health-cover`
**Job:** explain HMO cover so a non-Nigerian understands it, show what is and isn't covered, and send people to the plans.
**Users:** the diaspora with children, first-time visitors and business travellers.

| # | Section | Content | Interaction |
|---|---|---|---|
| 1 | Hero | H1 "Health cover for your trip to Nigeria". "From $50 a month. Nigeria only." CTA "Compare health plans" | Photo (real, self-hosted) |
| 2 | Scope line | **What this is and isn't**: health cover while you are in Nigeria. It is not travel insurance for leaving Nigeria, and it is not an entry requirement. | Callout (fixes the audit's search-intent mismatch) |
| 3 | **Why your home cover isn't enough** | "Your cover at home almost certainly stops at the airport." Deposits before treatment, and pay-then-claim insurers. | Without/with comparison |
| 4 | How care works | Genki-style one-liner plus 3 steps: open the app, go to a network hospital, Phillips HMO handles care | Steps |
| 5 | **What's covered** | Tile grid: admission, diagnostics, scans, drugs, emergency evacuation, telemedicine, roaming | Tiles |
| 6 | **Good to know** | Exclusions, waiting period, age limits, pre-existing conditions, all in plain sentences `[ ] all owner facts` | List |
| 7 | **Hospitals** | What A, B and C categories mean, plus named hospitals by city `[ ]` | City tabs (Lagos, Abuja, Port Harcourt…) |
| 8 | Plans teaser | Silver, Gold and Diamond prices with one line each → plans page | 3 cards |
| 9 | Who provides your cover | Omanga is the agent, Phillips HMO is the provider. Who does what. | Who's-who panel |
| 10 | FAQ | Cover questions | Accordion |
| 11 | Closing band + footer | — | — |

### 6.4 Plans and prices `/health-cover/plans`
**Job:** choose and buy.

| # | Section | Content | Interaction |
|---|---|---|---|
| 1 | Header + short hero | H1 "Health plans for your trip to Nigeria". One sentence. **CTA visible above the fold on mobile** (audit fix) | — |
| 2 | **Trip calculator** | "How long is your trip?" → months needed → total per plan (SafetyWing pattern) `[ ] depends on monthly vs 30-day terms being settled` | Slider or number |
| 3 | Plan cards | Silver, Gold and Diamond: price, hospital categories, ward, scans, "Buy Gold". Most popular marked only if true | 3 cards |
| 4 | Compare in full | Full table with no blank cells `[ ]` | Sticky plan headers |
| 5 | Included in every plan | 5 items | List |
| 6 | Buying for someone else | How to buy cover for a visiting relative `[ ]` | — |
| 7 | Terms in brief | Duration, renewal, cancelling, refunds. Must match /legal/policy-terms word for word | Callout + link |
| 8 | FAQ | Choosing a plan | Accordion |
| 9 | Closing band ("Keep your plan and your money in one account") + footer | — | — |

### 6.5 Get care now `/get-care` [NEW]
**Job:** the page someone opens when they are ill in Lagos. It must work on a bad phone signal. It is also the claims page.

| # | Section | Content |
|---|---|---|
| 1 | Header (minimal) + H1 "Need care in Nigeria?" | — |
| 2 | **Emergency first** | Nigeria emergency number(s) and the Phillips HMO line `[ ]`, as large tap-to-call buttons |
| 3 | What to do, step by step | Open the app, show your plan, go to a network hospital, what the hospital will ask for |
| 4 | Find a hospital | City list `[ ]` |
| 5 | If you paid yourself | How a claim or refund works `[ ]` |
| 6 | Not covered yet? | Buy cover now (with the waiting period stated `[ ]`) |
| 7 | Contact (WhatsApp, email) + footer | — |

### 6.6 How Omanga works `/how-it-works`
The trip timeline in full: each of the four stages gets its own section with app screens and a checklist. Monzo's "Tips for a smooth take-off" is the model. If it duplicates the home timeline too much, fold it into /going-home and /visiting-africa and drop this page.

### 6.7 Travel pages `/going-home`, `/visiting-africa`, `/business-trips` [NEW]
**Job:** speak to one visitor type in their own terms, which no competitor does. This is also the search entry for "travelling to Nigeria from the UK" style queries. All three pages share one template, with different content.

| # | Section | Going home | Visiting Africa | Business trips |
|---|---|---|---|---|
| 1 | Hero | "Going home? Arrive with naira and cover sorted." | "First time in Africa? Here's how money works, and health cover if you're in Nigeria." | "Work trip to Lagos or Abuja, sorted." |
| 2 | The problem in their words | Rate markups, December prices, kids' health | No BVN or NIN, card declines, cash, safety | Receipts, time, company spend |
| 3 | Their trip timeline | Before you fly → owambe season → flying back | Before you fly → arrival → getting around | Arrival → meetings → expenses |
| 4 | What you need | Wallet + family cover | Wallet + cover + how to pay day to day | Wallet + receipts `[ ]` + cover |
| 5 | Practical checklist | Detty December checklist (guide link) | Entry, visa and yellow fever (links to government sources only) | Expense receipts, limits |
| 6 | Relevant guides | 3 cards | 3 cards | 3 cards |
| 7 | FAQ | Persona questions | Persona questions | Persona questions |
| 8 | Closing band + footer | — | — | — |

Business trips waits until receipts and limits are confirmed.

### 6.8 Rates `/rates/[pair]`
**Job:** win "pounds to naira today" searches, then convert visitors into wallet users. Keep the current structure and fix the audit issues.
1. H1 "Pounds to naira today", with the live converter, rate, date and named source.
2. The rate matrix (NGN/USD/GBP/CAD).
3. **Official vs street rate, explained** (new, and specific to this pair).
4. What £50 / £100 / £500 gets you today (table).
5. Change pounds to naira with Omanga (3 steps, CTA "Get naira at this rate").
6. What is the mid-market rate?
7. Other naira rates (links).
8. FAQ (unique to this pair, not shared).
9. Closing band + footer.

### 6.9 Safety `/safety`
**Job:** settle the sceptic and fix the brand-name collision in search.
1. H1 "Is Omanga safe?" with a direct one-paragraph answer.
2. **Who we are:** legal entity, RC number, address, founding year, and the named people behind it `[ ]`.
3. **Who provides what:** a who's-who panel covering wallet provider, health cover provider and Omanga's role `[ ]`.
4. **Where your money is held**, and what happens if something goes wrong `[ ]`.
5. Licences and registrations, each with a link to the public register `[ ]`. Leave this section out until confirmed.
6. Keep your account safe (current content).
7. Complaints: how to raise one and the timeline.
8. FAQ.
9. Closing band + footer.

### 6.10 About us `/about`
**Job:** human proof and the brand story. It must be about this product, not the "leading travel company in Africa" ambition the audit flagged.
1. H1 and a one-paragraph story of why Omanga exists: the arrival problem, told plainly.
2. The people: founders and team with names and photos `[ ]`.
3. What we believe: the current values (People, Passion, Partnership), with one concrete line each.
4. Partners and what each one does (Phillips HMO, Fuspay `[ ] role per owner`, Zira `[ ] role`).
5. Where we are: Victoria Island address, and the map loaded on click.
6. Press, if any `[ ]`.
7. Closing band + footer.

### 6.11 Help `/help`
**Job:** fast help, with WhatsApp first.
1. H1 "How can we help?"
2. **Get care now** banner → /get-care.
3. Three ways to reach us: WhatsApp (first), email, phone. Opening hours `[ ]`.
4. Common questions, grouped (wallet, cover, account). Each answer short, with a link to the full page.
5. Message form, with a privacy notice (audit fix).
6. Office address with the map loaded on click.
7. Footer (no closing band; the page itself is the close).

### 6.12 Guides `/guides` and `/guides/[slug]`
**Hub page**
1. H1 "Guides for your trip to Nigeria".
2. Topic filters: Money, Health, Before you fly, Going home, Visiting.
3. Featured guide.
4. Grid of guides.
5. Closing band.

**Guide template**
1. Breadcrumb.
2. H1.
3. Author and reviewer, with updated date `[ ] real names`.
4. Summary box (answer first, for AI and search).
5. On-this-page table of contents.
6. Body.
7. A product block at the relevant point (converter or plan card, not a banner).
8. FAQ.
9. Related guides.
10. Closing band.

The first guides to add, from search demand:
- Is insurance required to enter Nigeria?
- Can foreigners use OPay or PalmPay?
- What happens to leftover naira?
- First 24 hours in Lagos

### 6.13 Legal `/legal/*`
Header, then:
1. H1
2. last-updated date
3. on-this-page table of contents
4. body
5. related legal links.

Simple footer, no closing band. **Blocker:** remove the live drafting notes and the regulator and operator wording that contradicts marketing before launch.

### 6.14 404
1. "This page isn't here."
2. Three links: About the wallet, About health cover, Exchange rates.
3. Search the guides.
4. Footer.

---

## 7. What carries over and what changes

| Keep | Change | Remove |
|---|---|---|
| Hero line, converter, rate pages, approved copy, the no-overclaim rules, British spelling | Story told as a trip timeline; audience routes; fees in full; a "what's covered / good to know" structure; a get-care page; who's-who trust content; guides with named authors | /get-started as a separate page; the repeated partner strip on every page; FAQ answers copied verbatim across pages; the country pill cloud on home |

---

## 8. Open questions for the owner
Ranked by how much they block the page structures.

1. **Plan terms:** monthly recurring with "cancel any time", or 30 days and one payment? (Affects Plans, the calculator and the FAQ.)
2. **Cards:** the app has virtual cards. Can the site say so? (Affects the copy rule.) *Answered in part 2026-10-22: in person you pay by transfer. Whether the site may mention cards is still open.*
3. **Who's who:** legal entity, RC number, wallet provider, licences, and the roles of Fuspay and Zira. (Affects Safety, the footer and About.)
4. **Insurance facts:** exclusions, waiting period, age limits, emergency number, claims process, named hospitals, what A/B/C mean.
5. **Wallet facts:** which currencies, conversion fee, limits, full country list. *Leftover balance answered 2026-10-22: it can be converted to dollars. Currencies and fees: owner is getting them.*
6. **Native app:** launch timing, store links, and whether "Log in" belongs in the header.
7. ~~URL renames~~ Locked 2026-10-25 (see sitemap-v2.md).
8. **Real stories and quotes:** any customers who would be named?
9. **Business trips:** in scope now, or later? (Sitemap marks it as later.)

---

## Next
Step 4, design direction and overall feel, waits for the owner's input.
