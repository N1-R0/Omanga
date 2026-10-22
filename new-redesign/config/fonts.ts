import { Host_Grotesk, Inter } from "next/font/google";

/**
 * Host Grotesk, the only typeface in the new design system (design-lab/
 * design-system.html § Typography). Two weights: 400 for headings and body,
 * 500 for H3, buttons and labels.
 *
 * `next/font/google` downloads the files at build time and serves them from
 * this origin, so no request goes to Google from a visitor's browser.
 */
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-host-grotesk",
  // The hero heading is the LCP element.
  preload: true,
});

/**
 * Inter, only inside the PhoneFrame's app screens, because the Omanga app sets
 * all its UI in Inter (omanga-mobile constants/fonts.ts). It isn't a site
 * typeface, it's never preloaded, and it's only fetched on pages that draw a
 * phone.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-app",
  preload: false,
});

export const fontVariables = `${hostGrotesk.variable} ${inter.variable}`;
