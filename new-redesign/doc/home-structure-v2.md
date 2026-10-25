# Home page structure v2

Date: 2026-10-25. Status: **proposed, awaiting owner approval.**

Builds on `sitemap-v2.md` (LOCKED). This document lists section titles only; body copy comes later.

**Sources:** all fetched 2026-10-25, UK sites where there is a choice. The headings were read from the server HTML, or from the rendered page for Revolut.
- **Remittance and money:** [Wise](https://wise.com/gb/), [LemFi](https://lemfi.com/en-gb), [Revolut](https://www.revolut.com/en-GB/), [Remitly](https://www.remitly.com/gb/en), [Monzo](https://monzo.com/).
- **Africa-focused:** [NALA](https://www.nala.com/), [Grey](https://grey.co/), [Afriex](https://www.afriex.com/). The Afriex homepage is now business-only, so it was used for tone only.
- **Insurance:** [SafetyWing Nomad Insurance](https://safetywing.com/nomad-insurance).

---

## 1. What the homepages do

| Site | Sections after the hero | Flow |
|---|---|---|
| Wise | About 9 | Proof stats → the account by audience ("For travellers") → business → safety → reviews → mission → app → country links |
| LemFi | 6 | Brand story → products → referral → "Why LemFi" → customer stories → FAQ (3 questions) |
| Revolut | 7 | One H2 per product → closing CTA. Plans in the footer area. |
| Remitly | About 11 | Calculator → intent cards ("I want to send / pay / receive") → trust → safety (3 blocks) → app → reviews → blog → countries → FAQ |
| Monzo | About 9 | Products → "Quit the app juggling act" → accounts and plans → **"The bank made for travel"** → savings → regulation and support → Which? award → apply → security |
| NALA | About 8 | Proof → "One global account for the currencies big banks ignore" → speed → API → FX transparency → limits → control → sharing |
| Grey | About 6 | "No Limits, No Borders" → products → account benefits (6 numbered) → social impact → more than banking |
| SafetyWing | 5 | 4 reassurance points (buy while abroad, global cover, simple claims, 24/7 human support) → **pricing calculator** → what's covered → FAQ → closing |

**Patterns (interpretation)**
- **Hero:** every site leads with one product promise and one primary action. Most also put a live tool in or right under the hero: Wise, Remitly and LemFi a calculator, SafetyWing a price calculator.
- **Proof:** it comes early and is specific (Wise "Over 70% arrive in under 20 seconds", NALA "98% of transfers arrive within 10 minutes"). Where claims are vague (Grey "100% Protected", LemFi "Fees? Almost none"), they read as marketing.
- **Insurance:** SafetyWing sells by removing worry (claims, support, buying while abroad), then shows the price, then what's covered. Monzo puts travel cover inside a "made for travel" block, as one line among the money features.
- **Trust:** the regulated entity and support sit near the end (Monzo "A regulated bank with 24/7 support", Wise "Safe at every step").
- **FAQ:** short (LemFi 3, Remitly 5, Wise on corridor pages 10). Most sites close with a CTA band and an app prompt.

## 2. Tone and copywriting

| Site | Voice | Works | Doesn't |
|---|---|---|---|
| Wise | Plain, confident, numbers first | "Your money, not ours"; proof stated as data | Long corridor pages repeat themselves |
| LemFi | Warm, diaspora identity, cheeky | "Ambition has no passport"; "Because when Mum needs it, she needs it now" | Snark that overclaims ("Fees? Almost none", "Obviously") |
| NALA | Emotional and then specific | "Waiting is cancelled"; "'processing' isn't enough" plus a hard number | "For the next billion" is abstract |
| Monzo | Witty but useful | "Spend your money on life, not your life on money"; "The bank made for travel" with plain sub-features | — |
| Remitly | Warm, human, intent-led | "I want to send money" cards | "Life grows as money flows" is filler |
| Revolut | Slogans | — | "Banking & Beyond" and "Life, meets savings" could belong to anyone |
| Grey | Generic | Numbered benefit list is easy to scan | "Inclusive global banking designed just for you" and "No Limits, No Borders" |
| SafetyWing | Calm, plain | "Buy while abroad", "Simple claims process", "Explore what's covered" | — |

**Omanga's voice** (keeps the existing tone rules in `research-and-page-structure.md` §4):
1. **Name the trip moment, not the category.** "Before you fly", "When you land", "If you fall ill" beat "payments" or "solutions".
2. **One emotional line, then one fact.** NALA's pattern, without its unprovable numbers. "Rate shown before you pay" is the fact Omanga can prove.
3. **No claims Omanga can't back:** no speed promises, "best rate", "100% protected" or "trusted by millions".
4. **Short, plain, British spelling.** Section titles of about 8 words or fewer. Each title says what the reader gets, not what the component is.
5. **One job per section.** No benefit appears twice on the page.

---

## 3. Recommended home page (header to footer)

Re-checked 2026-10-25 against the live homepages of Wise, LemFi, Remitly, NALA and Revolut, and the live omanga.biz.

**Updated 2026-10-25 (owner): the remaining sections from the earlier preview stay.** Eight sections between the header and the footer, in page order. Titles only.

1. Header
2. Pay across Africa. Stay insured in Nigeria. (hero)
3. Partners strip (owner: right after the hero)
4. Your money and your health, sorted for the trip (one section)
   - Payments card: Convert your money, then pay across Africa
   - Metrics strip: 50+ countries, 6+ currencies, 3 plans
   - Insurance card: Insurance plans for your time in Nigeria
5. Set up at home before you fly
6. Honest about rates, clear about who does what (Why Omanga, kept)
7. One wallet for 50+ countries across Africa (Countries, kept)
8. Everything you need before you go (FAQ, kept)
9. Land with everything sorted (closing band)
10. Footer

| # | Job |
|---|---|
| 2 | The promise, both products named, two actions (Open your free wallet, Get insurance plan) |
| 3 | Partner logos (Phillips HMO, Fuspay, Zira), on the page grey |
| 4 | Payments: the live converter in the phone. Insurance: plan pills that drive a chat animation per plan. No rate source, refresh timing or fee amounts (owner). |
| 5 | Three steps with a scroll-driven plane: open the wallet, add money, pick a plan |
| 6 | Six short trust points: rate shown first, pay by transfer, no minimum, care through a network, who's who, WhatsApp |
| 7 | Where the wallet works, with the country list |
| 8 | Common questions, each answered briefly |
| 9 | Closing band, both CTAs |

Not built from the earlier v2 list, by the owner's choice to keep the existing sections: "Who looks after your money and your cover" (its job is covered by 6) and "Questions before you travel" (8 is the FAQ).

**Decisions (interpretation)**
- **No separate "two products" section.** With only two products, the hero names both and sections 3 and 4 each give one product a full section (Revolut's one-section-per-product pattern). A summary section above them would repeat both. This replaces sitemap-v2's "Pay like a local. Get care if you need it."
- **Payments before Insurance.** It's the primary CTA and has the live proof (the converter), as Wise, LemFi and Remitly all lead with the calculator.
- **Naming:** "Payments" and "Insurance" per the owner. "Wallet" stays only as the account name in CTAs; "health cover" is not used as a category.
- **No price in section 4's title** until plan terms (monthly or 30 days) are confirmed (owner question §8.1).
- **Not adopted:** reviews and stats (Omanga has no verified figures yet), app download (not in the stores), country directory (moves to Payments), referral, blog strip, careers.
- **Removed from the preview:** "What Omanga does" (2026-10-25, it repeated section 4) and the old health-cover prices section (the Insurance card replaces it). Why Omanga and Countries were first marked for removal, then kept by the owner (2026-10-25).
