import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";

/**
 * About page (/about), rebuilt in the new design one section at a time
 * (owner, 2026-10-26).
 */

/**
 * Hero: Mobbin A1 (Wise "Meet money without borders"), the heading and sub on
 * the left and a wide video box below. Copy kept from the previous About hero.
 */
export const aboutHero = {
  // Pill above the heading (owner, 2026-10-27).
  pill: "About",
  title: "Money and health cover for your trip to Nigeria",
  sub: "A Lagos company for anyone visiting Nigeria: one account for your travel wallet and your health cover.",
  // Pexels 19959356, "A woman walking through an airport with luggage" by K
  // (Pexels License, free, no credit needed), 9s, self-hosted. 720p for
  // phones, 1080p above; the poster is the clip's own still. Decorative.
  video: {
    small: "/videos/about-hero-airport-720.mp4",
    large: "/videos/about-hero-airport-1080.mp4",
    poster: "/videos/about-hero-airport-poster.jpg",
  },
} as const;

/**
 * Our story: Mobbin B1 (Ramp's "Our Story"), the eyebrow and heading on the
 * left, the lead large on the right with the other two paragraphs as two
 * columns under it (owner, 2026-10-27). Copy kept from the old story section;
 * its two side photos are dropped, as the reference has none.
 */
export const aboutStory = {
  eyebrow: "Our story",
  title: "Why we built Omanga",
  lead: "Omanga started with one aim: make it easier to visit Nigeria and travel across Africa. Two things often get in the way: paying for things, and getting medical care if you fall ill.",
  body: [
    `So we put both in one account. Fund your wallet from USD, GBP or CAD, hold 6+ currencies and see the rate before you confirm. Spend in ${COUNTRIES_SERVED_DISPLAY} African countries. The wallet is free to open.`,
    "Then add short-term health cover from Phillips HMO for your time in Nigeria, with plans from $50 a month. Whether you're a tourist, a Nigerian living abroad or here for work, you land with money and cover sorted.",
  ],
} as const;
