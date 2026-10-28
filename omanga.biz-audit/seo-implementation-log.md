# SEO implementation log

## 2026-10-28

All changes are local on branch `redesign`, uncommitted, mixed with the
in-progress GA4 work. Not deployed.

### Changes

| File | Change | Finding |
|---|---|---|
| new-redesign/content/seo.content.ts | /insurance title → "Health Insurance for Visiting Nigeria, from $50 \| Omanga"; new description | audit #4 |
| new-redesign/content/home.content.ts | Home FAQ: question → "How much is health insurance for visiting Nigeria?"; answer drops "no commitment, cancel any time"; FAQ links /safety | #5, #2 |
| new-redesign/content/health-cover.content.ts | Same question rename; FAQ links the health insurance guide | #4, #3 |
| new-redesign/content/wallet.content.ts | FAQ links the $100 guide | #3 |
| new-redesign/components/ui/FaqSection.tsx | Optional `guide` sentence + link after the WhatsApp line | #2, #3 |
| app/(new-redesign)/(not-rebuilt)/rates/[pair]/page.tsx | "Other naira rates" adds the matching guide and /safety | #2, #3 |
| lib/analytics.ts (new) | `trackEvent`, a no-op unless gtag is loaded | #7 |
| components/consent/ConsentedAnalytics/GoogleAnalytics.tsx | One delegated click listener: wallet_signup_click, plan_checkout_click (with plan), whatsapp_click, email_click | #7 |
| components/sections/ContactHero/TalkForm.tsx | generate_lead on accepted enquiry | #7 |
| .claude/launch.json | `omanga-prod` config (next start on 3107) for verification | — |

### Tests

| Test | Result |
|---|---|
| `tsc --noEmit` | Pass |
| `eslint` (app, components, lib, new-redesign, config, content) | Pass, no warnings |
| `next build` | Pass, 27 routes generated |
| Rendered HTML, 20 sitemap URLs on the production build | All 200, one H1, unique titles, index/follow, JSON-LD parses on all 20 |
| New links present | Home 4× /safety; Insurance → health guide; Payments, USD, CAD → $100 guide; GBP → pounds guide; rates → /safety |
| "cancel any time" on home HTML | 0 occurrences |
| Browser console, production build | No errors |
| Visual check | Rate-page links render as the existing pills; FAQ sentence reads "…Not sure you need cover? Read our guide." |
| GA events in a browser | **Not run.** The tag is production-only and would send test hits to the live property from localhost. Verified by types and build only; check in GA4 DebugView after deploy |

### Outstanding

- Commit and deploy (with the GA4 work, which bumps consent to v2).
- GA4 Admin: mark the five events as key events; link Search Console.
- GSC: request indexing for /safety, /insurance and the home page after deploy.
- Vercel: send `http://omanga.biz` straight to `https://www.omanga.biz` (one hop).
- Owner decisions: plan terms (audit #6), mid-market wording (#11).
