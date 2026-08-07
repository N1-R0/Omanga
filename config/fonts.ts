import { Kantumruy_Pro } from "next/font/google";

/**
 * The site's one typeface.
 *
 * Kantumruy Pro — headings, body, navigation, buttons, form fields and footer.
 * There is no second family and no separate UI face. design.md § 2.
 *
 * This replaces the previous Helvetica system stack + Inter pairing. That split
 * came from a two-family rationale (an editorial face against a UI face) that
 * the reference does not have, and the Helvetica half never rendered as intended
 * anyway: it is licensed by Monotype, is not on Google Fonts, and substitutes to
 * Arial on Windows and Roboto on Android — which is most of the audience.
 *
 * `next/font/google` downloads and self-hosts at build time, so the browser
 * makes no request to Google at runtime.
 *
 * A variable font on the weight axis, so one file covers 400, 500 and 600 —
 * fewer bytes and one fewer request than the two static Inter cuts it replaces.
 * `weight` is left at its `variable` default deliberately; naming weights here
 * would fetch static instances instead.
 *
 * `adjustFontFallback` computes an Arial override that matches Kantumruy Pro's
 * metrics, which is what keeps layout shift near zero while the font swaps.
 * Arial is also the explicit fallback in `--font-sans` for the same reason: it
 * is metrically closer than the system sans on any platform.
 */
const kantumruyPro = Kantumruy_Pro({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  variable: "--font-kantumruy",
  preload: true,
  adjustFontFallback: true,
});

/**
 * The font variable class for the <html> element.
 *
 * Feeds `--font-sans` in `styles/tokens.css`. Components reference `font-sans`
 * and never touch the variable directly.
 */
export const fontVariables = kantumruyPro.variable;
