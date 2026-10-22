# New redesign

Built at **/new** beside the live site. The live pages in `app/(redesign)` keep
serving `/` until cutover. One page at a time: the home page is finished and
approved before the next page starts.

## Where things are

| Path | What |
|---|---|
| `app/(new-redesign)/layout.tsx` | Root layout: own `<html>`, Host Grotesk, this folder's stylesheet, `noindex`, Header and Footer |
| `app/(new-redesign)/new/page.tsx` | Home, composed from sections in the locked order |
| `new-redesign/config/routes.ts` | `REDESIGN_BASE` and `href()`; every internal link goes through it |
| `new-redesign/config/fonts.ts` | Host Grotesk 400/500 via `next/font/google` (self-hosted at build) |
| `new-redesign/styles/` | `tokens.css` (colour, radius, shadow, breakpoints), `typography.css` (`type-h1`…`type-p3`), `utilities.css` (`container-page`, `section-y`, `section-head`, `glass`) |
| `new-redesign/components/ui/` | Primitives: `Button`, `Card`/`PhotoCard`, `Section`, `SectionHead`, `CurrencyPicker` |
| `new-redesign/components/sections/home/` | One component per home section |
| `new-redesign/content/` | All copy. `home.content.ts` holds the locked section order; `navigation.content.ts` and `footer.content.ts` hold the global chrome |
| `new-redesign/doc/` | Research, sitemap (locked) and page structures |
| `public/photos/nav/`, `public/photos/brand/` | Self-hosted menu-card photos and brand textures (G1, U2, U3) |

References: `design-lab/design-system.html` (tokens and components),
`design-lab/home-wireframe.html` (locked home layout), and `design.md`
(decisions).

## Rules

- Use only the token classes. Tailwind's default colours are switched off.
- Type comes from `type-*` utilities only. Use one filled primary button per view.
- Buttons have an 8px radius, never fully rounded.
- Every mini visual over a photo or texture sits in `glass`.
- Copy lives in `content/`, not in components.
- `design-lab/design-system.html` is the single UI source. Any new piece of UI
  goes on that page first (or in the same change). Reuse `Card`/`PhotoCard`,
  `Button` and `SectionHead`; never restyle a card in place.

## Cutover (when every page is approved)

1. Move `app/(new-redesign)/new/*` up to `app/(new-redesign)/`, and delete
   `app/(redesign)` (or the pages being replaced).
2. Set `REDESIGN_BASE = ""`.
3. Remove `robots: noindex` from the layout and delete `PreviewBadge`.
4. Add the new paths to `config/routes.ts` so the sitemap lists them.
5. Add 301s for the renamed URLs in sitemap § 5.
