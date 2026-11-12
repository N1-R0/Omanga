# Omanga website

Next.js (App Router, Turbopack) site for omanga.biz. One design system, one
source tree. Decisions and history live in `design.md`; copy and sitemap in
`docs/copy.md` and `docs/phase-3-research-ia.md` (local, not in git).

```bash
npm run dev     # local dev server
npm run build   # production build
```

## Where things are

| Path | What |
|---|---|
| `app/(site)/layout.tsx` | Root layout: `<html>`, fonts, stylesheet, header, footer, cookie banner, consented analytics |
| `app/(site)/page.tsx` | Home |
| `app/(site)/payments`, `insurance`, `about` | Pages built in the current design |
| `app/(site)/(not-rebuilt)/` | Pages still on older sections (plans, policy terms, rates, safety, help, contact, blog, legal); its layout starts them below the header |
| `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/api/` | 404, sitemap, robots, contact enquiry API |
| `components/layout/` | Header, footer, nav icons, smooth scroll; plus the older `Container`, `Grid`, `Section`, `Stack` |
| `components/ui/` | Current primitives: `Button`, `Card`, `Section`, `SectionHead`, `FaqSection`, `CtaPanel`, `Converter`, `Photo`… |
| `components/sections/` | One component per section of the current pages, plus the older contact and insurance sections |
| `components/legacy/ui/` | Older primitives (forms, `Heading`, `Text`, `Badge`…) still used by the not-rebuilt pages |
| `components/consent/`, `blog/`, `legal/`, `rates/`, `seo/`, `icons/` | Cookie consent, blog, legal documents, rate table, JSON-LD, icons |
| `content/` | All copy, one file per page or area; `seo.content.ts` for titles and descriptions |
| `config/routes.ts` | `href()`: internal links, with `LIVE_PATHS` aliases for pages not built yet |
| `config/public-routes.ts` | Route list for `sitemap.xml` |
| `config/site.ts`, `fonts.ts`, `blur.ts` | Site constants, self-hosted fonts, image blur placeholders |
| `styles/` | `globals.css` (entry), `tokens.css`, `typography.css`, `utilities.css`, `animations.css`, `fonts/` |
| `lib/` | SEO metadata, schema, rates, consent, analytics, enquiry handling |
| `scripts/blur-placeholders.mjs` | Regenerate `config/blur.ts` after adding or replacing a photo |

## Rules

- Use only the token classes; Tailwind's default colours are switched off.
- Type comes from `type-*` utilities only. One filled primary button per view.
- Buttons are pills; cards have a 16px radius, photos inside them 12px.
- Copy lives in `content/`, not in components. No code comments; decisions go in `design.md`.

## Rebuilding a page in `(not-rebuilt)`

1. Build it in `app/(site)` at its sitemap path, with metadata from `lib/seo.ts`
   and structured data from `lib/schema.ts`.
2. Delete the old page and the `components/` and `content/` files only it used.
3. If the URL changes, delete its `LIVE_PATHS` line, add a 301 in
   `next.config.ts` and update `config/public-routes.ts`.
