# Competitor analysis (2026-10-28)

From public pages fetched on 2026-10-28 and Google SERPs read in Chrome. No
backlink or traffic data was available, so none is claimed.

## Matrix

| Competitor | Competes on | Title / H1 pattern | Schema seen | Content strategy | What Omanga can do differently |
|---|---|---|---|---|---|
| Wise | Rates, send money to Nigeria | "US dollars to Nigerian nairas Exchange Rate" / "Send Money to Nigeria" | FAQPage, CurrencyConversionService, ExchangeRateSpecification, AggregateRating | One page per currency pair and corridor; blog answers "can I use Revolut in Nigeria" | Visitor-side angle: spending *in* Nigeria, not sending to it |
| Revolut | Naira travel card, travel insurance in Nigeria, ATMs in Nigeria | "Nigerian Naira Prepaid Currency Card", "Travel Insurance in Nigeria" | (bot check blocked fetch) | Country × product pages; ranks for "can I use my revolut card in nigeria" with its own pages | Local, in-person payment by transfer; Lagos team |
| LemFi | Diaspora remittance | "Send. Save. Grow." | MobileApplication, Organization | Brand-led home; corridor pages | Omanga isn't remittance-first; don't fight here |
| Remitly | Send money to Nigeria from US | "Send Money to Nigeria from the United States" | FinancialService, MoneyTransfer, AggregateRating | Corridor pages | Same: avoid head-on |
| Leadway (Arrival Pack) | Visitor health/accident cover in Lagos | "Arrival Pack Insurance for Visitors to Lagos" | BreadcrumbList, Organization | Product page + blog "best travel insurance for Nigerian travelers" | Closest product rival. Omanga: monthly plans, three tiers, wallet in the same place |
| americanvisitorinsurance / insubuy / aardy | "Nigeria travel insurance" for US travellers | "Travel insurance for Nigeria" | — | Country landing pages + reviews | They sell outbound US policies; Omanga's in-country HMO network is the distinct angle, stated plainly |
| abokiFX, Nairametrics | Daily naira rates | — | — | Daily rate content, parallel market | Do not compete on parallel-market rates |

## Content gaps (prioritised)

1. **"Can I use my card in Nigeria?"** Autocomplete shows card-brand variants
   (Revolut, Monzo, Wise, credit, debit, Amex). Results are Revolut's own pages
   and a Wise blog post. A neutral visitor guide that explains cards, cash and
   paying by transfer is something Omanga can write from experience.
2. **First-time visitor guide** ("visiting Nigeria for the first time", "from
   the USA/UK", "is it safe to travel to Nigeria"). Lagos-based expertise is the
   advantage; it must link official advisories rather than make safety claims.
3. **What $20 / $1 buys in Nigeria** (ATP People Also Ask). Extends the
   existing $100 post rather than a new page.
4. **How HMO cover works for visitors** (hospital categories A/B/C, what to do
   at the hospital). Needs Phillips HMO review.
5. **Comparison with Leadway Arrival Pack / US visitor policies.** Only once
   plan terms are settled and facts are checked; no disparagement.

## Trust signals competitors show that Omanga lacks

- Registered company name and number, regulator and licence lines (open
  blocker in `config/site.ts`).
- Named authors and reviewers on financial and health posts.
- Third-party reviews (Trustpilot, app stores). Don't add rating schema until
  they exist on a page Omanga controls.
