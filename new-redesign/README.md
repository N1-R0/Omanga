# New design

The site's only design system since 2026-10-26. Home (`/`), Payments
(`/payments`) and Insurance (`/insurance`) are built in it. The other pages
(about, plans, safety, contact, blog, rates, legal) sit in
`app/(new-redesign)/(not-rebuilt)`: their sections were moved onto these
tokens and they share the new FAQ and closing panel, but their own sections
still need redesigning, one page at a time.

## Where things are

| Path | What |
|---|---|
| `app/(new-redesign)/layout.tsx` | Root layout: own `<html>`, Host Grotesk, this folder's stylesheet, header, footer, cookie banner, consented analytics |
| `app/(new-redesign)/page.tsx` | Home, composed from sections in the locked order |
| `app/not-found.tsx` | The 404, in this design |
| `new-redesign/config/routes.ts` | `href()`: every internal link goes through it; `LIVE_PATHS` sends pages not yet rebuilt to their old URLs |
| `new-redesign/config/fonts.ts` | Host Grotesk 400/500 via `next/font/google` (self-hosted at build) |
| `new-redesign/styles/` | `tokens.css`, `typography.css` (`type-h1`…`type-p3`), `utilities.css` (`container-page`, `section-y`, `section-head`, `glass`), `animations.css` |
| `app/(new-redesign)/(not-rebuilt)/` | Pages not yet redesigned; its layout starts them below the header |
| `components/`, `content/` | The older pages' sections and copy, on the new tokens |
| `new-redesign/content/old-pages.content.ts` | Those pages' FAQ sub lines and the Plans closing panel |
| `new-redesign/components/ui/` | Primitives: `Button`, `Card`, `Section`, `SectionHead`, `FaqSection`, `ProofStrip`, `CtaPanel`, `CurrencyPicker` |
| `new-redesign/components/layout/`, `consent/` | Header, footer, cookie banner and preferences |
| `new-redesign/components/sections/` | One component per section |
| `new-redesign/content/` | All copy, plus `seo.content.ts` for page titles and descriptions |
| `new-redesign/doc/` | Research, sitemap (locked) and page structures |

References: `design-lab/design-system.html` (tokens and components) and
`design.md` (decisions).

## Rules

- Use only the token classes. Tailwind's default colours are switched off.
- Type comes from `type-*` utilities only. Use one filled primary button per view.
- Buttons are pills; cards have a 16px radius, photos inside them 12px.
- Every mini visual over a photo or texture sits in `glass`.
- Copy lives in `content/`, not in components.

## Rebuilding a page in `(not-rebuilt)`

1. Build it in `app/(new-redesign)` at its sitemap-v2 path, with metadata from
   `lib/seo.ts` and structured data from `lib/schema.ts`.
2. Delete the old page and the `components/` and `content/` files only it used.
3. If the URL changes, delete its line in `LIVE_PATHS` and add a 301 from the
   old URL in `next.config.ts`; update `config/routes.ts` for the sitemap.
