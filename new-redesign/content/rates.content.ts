/**
 * Rate pages (/rates/[pair]). The per-pair copy is still in
 * content/rates.content.ts; this holds the new hero's photo.
 */
export const rateHero = {
  // The closing panels' mountain photo (Payments, Insurance): light sky at
  // the top for the heading, ridges below for the converter. Decorative.
  photo: { src: "/photos/home/rates-mountains.jpg", position: "50% 70%" },
} as const;
