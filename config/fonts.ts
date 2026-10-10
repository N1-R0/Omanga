import localFont from "next/font/local";

/**
 * [CHANGED, 2026-10-10] Typography pick F4 (`design-lab/typography.html`):
 * Manrope for headings, Inter for everything else. Replaces Kantumruy Pro, a
 * face drawn mainly for Khmer whose Latin was the weakest part of the old
 * system, and the Archivo display face the payments hero briefly used.
 * Research: `design-lab/type-and-copy-research.md`.
 *
 * Both are vendored variable `wght` cuts from `@fontsource-variable/*@5.2.8`
 * (latin subset), loaded with `next/font/local` so the build never fetches
 * from Google — see the 2026-08-29 note on why that matters.
 */

/** Inter — body, UI, navigation, buttons, forms, figures. */
const inter = localFont({
  src: "./fonts/inter-latin-wght-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  preload: true,
  // Arial override metrics keep layout shift near zero while the font swaps.
  adjustFontFallback: "Arial",
});

/** Manrope — headings (display, h1–h3 roles). Geometric, at 700–800. */
const manrope = localFont({
  src: "./fonts/manrope-latin-wght-variable.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
  // The hero heading is the LCP element on most pages.
  preload: true,
  adjustFontFallback: "Arial",
});

/**
 * Fraunces — the wordmark only.
 *
 * ---------------------------------------------------------------------------
 * WHY THE FILE IS A SUBSET, AND WHAT THAT COSTS
 *
 * The wordmark is six letters that appear in the header and the footer of every
 * page. Shipping a full Latin cut for them is 36KB (weight axis only) or 67KB
 * (with optical sizing) to render one word.
 *
 * The vendored file is `@fontsource-variable/fraunces@5.3.0`'s `latin-opsz`
 * cut, with `opsz` instanced at 48 and the glyph set subset to A–Z and the
 * space. That is 8KB, and it leaves one variable axis — `wght` 100–900.
 *
 * Two decisions are baked into that file rather than expressed in CSS.
 *
 *   Optical size. Fraunces' `opsz` axis runs 9–144, and the smaller `wght`-only
 *   cut pins it at 9, which is the text end: at the wordmark's 22–26px that
 *   reads as body copy set large, which defeats the point of a second family.
 *   48 was chosen by rendering the word at its true size across the axis — at 72
 *   and above the thin strokes start to break up at 26px on a 1x display, and
 *   below 32 the serif character stops being visible at all. The wordmark only
 *   ever renders at one size, so a live axis would buy nothing and would be one
 *   more thing a call site could set wrongly.
 *
 *   Glyph coverage. The file contains NO lowercase, digits or punctuation. That
 *   is not an oversight — it is what stops a second family spreading across a
 *   site whose design system says it has one. The wordmark is set in caps, so
 *   caps are all it needs.
 *
 * If Fraunces is ever wanted for headings or anything beyond the wordmark,
 * replace this file with the full `fraunces-latin-opsz-normal.woff2` from the
 * same package, restore the `opsz` axis, and update `design.md` § 2 to say the
 * site now has two families. Setting other text in `font-wordmark` against this
 * subset renders the fallback for every glyph it lacks, which is a visible break
 * rather than a silent one.
 */
const fraunces = localFont({
  src: "./fonts/fraunces-wordmark-subset.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",

  /*
    Preloaded, unlike a decorative face would be. The wordmark sits in the
    header above the fold on every page, so a swap after first paint is visible
    on arrival — exactly the jank `adjustFontFallback` exists to avoid on the
    body font. 8KB is a cheap way not to have it.
  */
  preload: true,

  /*
    A serif override rather than Arial. Fraunces is a serif, and measuring the
    fallback against a sans would size the pre-swap wordmark wrong and reflow the
    lockup when the real font lands. `next/font` offers exactly two override
    faces — Arial and Times New Roman — so this is the serif one, and
    `--font-wordmark` names the same family first in its fallback stack.
  */
  adjustFontFallback: "Times New Roman",
});

/**
 * The font variable classes for the <html> element.
 *
 * Feed `--font-sans` and `--font-wordmark` in `styles/tokens.css`. Components
 * reference `font-sans` and `font-wordmark` and never touch the variables.
 */
export const fontVariables = `${inter.variable} ${manrope.variable} ${fraunces.variable}`;
