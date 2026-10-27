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
