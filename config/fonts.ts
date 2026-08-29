import localFont from "next/font/local";

/**
 * The site's typefaces.
 *
 * Kantumruy Pro — headings, body, navigation, buttons, form fields and footer.
 * Fraunces — the wordmark, and nothing else. See `fraunces` below for why that
 * restriction is enforced by the font file itself rather than by convention.
 *
 * ---------------------------------------------------------------------------
 * Kantumruy Pro
 *
 * A variable font on the weight axis, so one file covers 400, 500 and 600 —
 * the three weights § 2 defines — in 33KB.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] `next/font/local`, from a file in the repository.
 *
 * It was `next/font/google`, which downloads the font from Google at BUILD time
 * and self-hosts the result. The runtime behaviour was already correct — no
 * request reaches Google from a visitor's browser either way — but the build
 * itself needed to reach `fonts.googleapis.com`, and that turned a font into a
 * build-time network dependency on a third party.
 *
 * It failed:
 *
 *   next/font: error: Failed to fetch `Kantumruy Pro` from Google Fonts.
 *
 * Any build environment that cannot reach Google cannot build this site at all —
 * an offline machine, a locked-down CI runner, a corporate proxy, or Google
 * simply being slow at the wrong moment. The failure is total rather than
 * graceful: the build aborts, so there is no fallback and nothing ships.
 *
 * The file now lives beside this module. The build reads it from disk, so it
 * cannot fail for a network reason, and the bytes are pinned — a font that
 * changes upstream can no longer change this site's metrics without a commit.
 *
 * The asset is the `latin` `wght` variable cut from `@fontsource-variable/
 * kantumruy-pro@5.3.0`, which is the same upstream font Google serves. Only the
 * `latin` subset is vendored: the previous configuration requested exactly that
 * subset, and the family's other cut is Khmer, which this site does not set.
 *
 * To update: take `files/kantumruy-pro-latin-wght-normal.woff2` from a newer
 * release of that package and replace the file. Do not add the italic or Khmer
 * cuts unless something actually renders them — each is another file the browser
 * may be told to preload.
 */

const kantumruyPro = localFont({
  src: "./fonts/kantumruy-pro-latin-variable.woff2",

  /*
    The variable font's full `wght` axis, as a range. This is the same span
    Google's own stylesheet requests for this family (`wght@100..700`), so the
    three weights `design.md` § 2 names — 400 body, 500 headings, 600 inline
    `strong` — all resolve from the one file rather than snapping to a static
    instance.
  */
  weight: "100 700",
  style: "normal",

  /*
    Render immediately in the fallback and swap when the font arrives. The
    alternative blocks first paint on a font, which is a worse trade on a page
    whose LCP is a heading.
  */
  display: "swap",
  variable: "--font-kantumruy",
  preload: true,

  /*
    Computes an Arial override — ascent, descent and width — matched to
    Kantumruy Pro's metrics, which is what keeps layout shift near zero while the
    font swaps. Arial is also the explicit fallback in `--font-sans` for the same
    reason: it is metrically closer than the system sans on any platform.

    `next/font/local` takes the family name here, where the Google loader took a
    boolean. Same mechanism, and it must stay Arial to match the token.
  */
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
export const fontVariables = `${kantumruyPro.variable} ${fraunces.variable}`;
