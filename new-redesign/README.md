# New design

Live since 2026-10-26 for home (`/`), Payments (`/payments`) and Insurance
(`/insurance`). Every other page is still the old design in `app/(redesign)`,
wearing this design's header, footer and cookie banner. Pages are rebuilt one
at a time and replace their old version.

## Where things are

| Path | What |
|---|---|
| `app/(new-redesign)/layout.tsx` | Root layout: own `<html>`, Host Grotesk, this folder's stylesheet, header, footer, cookie banner, consented analytics |
| `app/(new-redesign)/page.tsx` | Home, composed from sections in the locked order |
| `app/not-found.tsx` | The 404, in this design |
| `new-redesign/config/routes.ts` | `href()`: every internal link goes through it; `LIVE_PATHS` sends pages not yet rebuilt to their old URLs |
| `new-redesign/config/fonts.ts` | Host Grotesk 400/500 via `next/font/google` (self-hosted at build) |
| `new-redesign/styles/` | `tokens.css`, `typography.css` (`type-h1`…`type-p3`), `utilities.css` (`container-page`, `section-y`, `section-head`, `glass`), `animations.css`; `chrome.css` styles the header and footer on the old pages |
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
- The header, footer and consent components also render on the old pages, so
  they use literal radii, not the radius tokens (see `styles/chrome.css`).

## Rebuilding an old page

1. Build it in `app/(new-redesign)` at its sitemap-v2 path, with metadata from
   `lib/seo.ts` and structured data from `lib/schema.ts`.
2. Delete the old page in `app/(redesign)` and anything only it used.
3. If the URL changes, delete its line in `LIVE_PATHS` and add a 301 from the
   old URL in `next.config.ts`; update `config/routes.ts` for the sitemap.
4. With the last old page gone, delete `app/(redesign)`, `styles/`,
   `new-redesign/styles/chrome.css` and the old `components/` and `content/`.
