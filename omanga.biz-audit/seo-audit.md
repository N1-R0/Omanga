# omanga.biz — SEO audit (2026-10-28)

Follows the 2026-10-18 audit (`FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`). This
pass adds Search Console data, which the earlier audits did not have.

Stack: Next.js 16.2 App Router, every marketing page static (rates and sitemap
ISR, 1 h), Vercel. Canonical host `https://www.omanga.biz`.

## Baseline (Search Console, domain property `sc-domain:omanga.biz`)

| Metric | Value | Window |
|---|---|---|
| Clicks | 31 | last 28 days |
| Impressions | 91 | last 28 days |
| CTR / avg position | 34.1% / 4.1 | last 28 days |
| Clicks / impressions | 37 / 116 | last 90 days |
| Queries with impressions | 5, all branded or near-brand ("omanga", "destination", "wallet setup") | last 28 days |
| Indexed pages | 16 | 2026-10-28 |
| Not indexed | 9: 3 "Page with redirect" (expected), 6 "Discovered – currently not indexed" | 2026-10-28 |
| Sitemap | submitted 2026-10-26, read 2026-10-26, Success, 21 URLs | |
| Core Web Vitals (field) | Not enough usage data, mobile and desktop | 90 days |
| Manual actions | None | |
| Product snippets / Merchant listings | 3 valid, warnings: missing `shippingDetails`, `hasMerchantReturnPolicy` | |
| Breadcrumbs | 15 valid | |

**Reading:** Google crawls and indexes the site without technical trouble.
The problem is demand capture, not indexation: the site earns impressions
only for its own name. Non-branded visibility is effectively zero.

## Findings

Severity: Critical / High / Medium / Low. Status: Fixed (local) / Open / Owner.

| # | Issue | URLs | Evidence | Impact | Action | Status |
|---|---|---|---|---|---|---|
| 1 | No non-branded search visibility | sitewide | GSC: 5 queries, all brand; 116 impressions in 90 days | High | Content roadmap (`seo-content-roadmap.md`), internal links, off-site authority | Open (ongoing) |
| 2 | /safety and the 5 legal pages never crawled | /safety, /privacy-policy, /terms-of-use, /policy-terms, /complaints-procedure, /cookie-policy | GSC "Discovered – currently not indexed", last crawl N/A | Medium | Added in-body links to /safety from home, Insurance, Payments and the 3 rate pages; request indexing for /safety after deploy | Fixed (local) + Owner |
| 3 | Blog posts not linked from product or rate pages | 4 posts | Live crawl: each post linked from 4 pages only (blog index and other posts) | Medium | Guide links added: Insurance → health insurance guide; Payments, USD and CAD rates → $100 guide; GBP rate → pounds guide | Fixed (local) |
| 4 | /insurance title says "Travel Insurance", page FAQ says "Is this travel insurance? No." | /insurance | Live HTML title vs FAQ; Google SERP for "travel insurance for nigeria" is outbound cover for Nigerians (AXA Mansard, Leadway, Insubuy, Revolut) | Medium (relevance + trust) | Title "Health Insurance for Visiting Nigeria, from $50 \| Omanga"; description keeps "travel health insurance" | Fixed (local) |
| 5 | Home FAQ (and its FAQPage schema) said "no commitment, cancel any time" | / | Live JSON-LD; owner rule § 8.1 keeps the claim out until confirmed; `/policy-terms` says payment does not recur; Paystack pages are monthly subscriptions | High (YMYL accuracy) | Home FAQ answer now matches the Insurance FAQ ("paid monthly for the months you're there") | Fixed (local) |
| 6 | Plan terms contradict each other across the site | /plans, /policy-terms, /blog/health-insurance-for-visiting-nigeria, content/insurance-faq.content.ts | "Cancel any time" (plans card, blog) vs "30 days, single payment, does not recur" (policy terms) vs Paystack monthly subscription | High (legal/trust) | Owner confirms the real terms, then one copy pass | Owner |
| 7 | No conversion measurement | sitewide | GA4 not live; no events | High (cannot judge SEO by outcomes) | GA4 behind consent (in progress, uncommitted) + 5 conversion events added | Fixed (local), needs GA Admin setup |
| 8 | Apex HTTP takes two hops | http://omanga.biz | `http://omanga.biz` → 308 `https://omanga.biz/` → 308 `https://www.omanga.biz/` | Low | Vercel domain setting: redirect apex straight to `https://www.` | Owner (hosting) |
| 9 | Mobile lab LCP 3.5 s on home | / | PSI mobile 2026-10-28: Perf 88, LCP 3.5 s, CLS 0, TBT 80 ms; LCP element is the H1 text, 410 ms render delay; render-blocking CSS ~150 ms | Low–Medium (lab only; no field data) | Leave: likely font swap re-painting the H1. `display: optional` would avoid it but changes brand type on slow links. Revisit when CrUX has data | Open (documented) |
| 10 | Product schema on /plans triggers merchant-listing warnings | /plans | GSC: missing shippingDetails / return policy, 3 items | Low | Insurance has no shipping or returns; adding them would be invented. Leave; warnings are non-blocking | Won't fix |
| 11 | Generic "mid-market rate" wording in 3 posts | /blog/pounds-to-naira-best-rate, /blog/how-far-does-100-dollars-go-in-nigeria, /blog/detty-december-nigeria-checklist | Live text | Low | Educational use, not a claim about Omanga's source. One sentence in the pounds post sits next to "Our pounds to naira page shows today's figure", which can read as Omanga using it | Owner decision |
| 12 | Old redirected URLs still in Google's report | /get-started, /blog/how-to-pay-in-nigeria-as-a-visitor | GSC "Page with redirect", validation "Failed" | None (expected) | Nothing; 308s are correct | No action |

### Checked and fine

- robots.txt allows all, disallows `/api/` only, names the www sitemap.
- Sitemap: 21 URLs, all 200, all self-canonical, real `lastmod`.
- Every sitemap URL: one H1, unique title (44–61 chars) and description,
  self-referencing canonical, `index, follow`, OG image, no `X-Robots-Tag`.
- Trailing slash and `https://omanga.biz/*` 308 to the www path; query strings
  return 200 with the clean canonical; unknown paths 404.
- All content is in server HTML; JSON-LD parses on all 20 pages; every
  image has `alt`.
- URL Inspection, /rates/dollars-to-naira: indexed, user and Google canonical
  agree, last crawl 2026-10-18, crawled as Googlebot smartphone.
- PSI mobile, home: Accessibility 100, Best Practices 100, SEO 100.

## Checks that could not be completed

| Check | Why |
|---|---|
| Bing Webmaster Tools | Not signed in. `site:omanga.biz` on Bing returned a bot challenge, which was not attempted |
| PageSpeed API for other pages | Daily API quota exhausted; home tested in the PSI web UI only |
| Rich Results Test / validator.schema.org | Not run separately; GSC enhancement reports (Breadcrumbs, Product) were used as Google's own validation |
| GA4 reports | GA4 not live yet |
| Backlinks | No backlink tool access (OpenSEO credits out since 2026-10-11, MCP unauthorised). GSC Links report not read |
| Keyword volumes | No paid volume source. AnswerThePublic free tier hides volumes |

## Deployed vs local

Everything under "Fixed (local)" exists only in the working tree on branch
`redesign`, uncommitted, with the in-progress GA4 work. Nothing is deployed.

## Monitoring plan

Baseline is the table at the top (2026-10-28). Leading indicators first;
rankings and conversions are outcomes and lag them.

| When | Leading (crawl, index) | Outcomes (search, conversions) |
|---|---|---|
| Day 30 | /safety indexed; Not indexed ≤ 3 (redirects only); sitemap read after deploy; GA4 events visible in DebugView | Non-branded queries > 0; impressions above 91 per 28 days |
| Day 60 | Every new post indexed within 14 days of publishing; CrUX starts reporting | Impressions and clicks per landing page; CTR on /insurance after the title change; first wallet_signup_click and plan_checkout_click from organic |
| Day 90 | No new excluded reasons besides redirects | Non-branded share of clicks; organic generate_lead count; referring domains (GSC Links) vs today |

No ranking or indexation timeline is promised.
