import { Inter } from "next/font/google";

/**
 * Font definitions for the redesign.
 *
 * One family is loaded here now, not two:
 *   - Inter     — UI chrome: nav, buttons, labels, footer
 *   - Helvetica — headings, body, section text; a system stack, not a download
 *
 * Well inside the four-weight ceiling coding-guidelines.md sets, now that only
 * Inter is fetched.
 *
 * `next/font/google` downloads and self-hosts Inter at build time, so the browser
 * makes no request to Google at runtime. Helvetica needs no request at all — it is
 * either already on the device or substituted by one that is.
 *
 * These are declared here rather than in the layout so the same instance is
 * reused everywhere. Calling a font loader twice creates two hosted copies.
 * The root layout imports `fontVariables` and applies it to <html>; nothing
 * else needs to know these exist.
 */

/**
 * Poppins has been removed.
 *
 * The project family is now Helvetica, which cannot be loaded this way: it is
 * licensed by Monotype, is not on Google Fonts, and so is declared as a
 * system-font stack directly in `styles/tokens.css` instead. See the
 * `--font-heading` token for what that means per platform.
 *
 * Net effect on the budget: one fewer font family to download — two files, since
 * Poppins is not variable and 400 and 600 were separate requests.
 */

/**
 * Inter is a variable font, so `weight` is left at its `variable` default and
 * a single file covers the whole weight axis.
 *
 * That is fewer bytes than the two static cuts it replaces, not more: two
 * static Inter subsets are roughly 2 × 25KB, while the latin variable subset is
 * one ~35KB file and one fewer request. `next/font` does not currently accept a
 * clamped range string for a Google variable font, so restricting the axis is
 * not available anyway.
 *
 * Only two weights are ever rendered:
 *   400 — nav links, footer links, captions.
 *   600 — buttons, UI labels, footer headings, wordmark.
 *
 * Nothing enforces that beyond the type tokens, which is worth a CI check when
 * the header and footer land.
 */
const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

/**
 * The font variable class for the <html> element.
 *
 * Feeds `--font-ui` in `styles/tokens.css`. `--font-heading` needs nothing here —
 * it names system faces directly. Components reference `font-heading` / `font-ui`
 * and never touch either variable.
 */
export const fontVariables = inter.variable;
