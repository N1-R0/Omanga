import type { ImageAsset } from "@/types/content.types";

/**
 * The Get Started page's full-bleed photographic band.
 *
 * No copy of any kind — the band is one image and nothing else, so this module
 * holds an asset rather than strings. It still lives here rather than in the
 * component: `alt` is a user-facing string and "copy is data, never markup" has
 * no exemption for alt text.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The band is not in the approved copy document.
 *
 * That document runs Header → Hero → The two solutions → Closing section, with
 * no image band between the hero and the cards. Because the band carries no
 * copy, nothing here contradicts an approved string — but the section order
 * does now differ from the approved structure, and `get-started-seo.md`
 * § Heading hierarchy numbers its sections against that order. Raised so the
 * documents can be reconciled rather than left disagreeing.
 *
 * `get-started-seo.md` § E-E-A-T does argue for exactly this asset: "the hero
 * photograph is the primary experience signal on this page… This is the
 * strongest single argument for the brief's instruction to replace the
 * animation." So the band has a documented purpose; it is only its position that
 * is undocumented.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The photograph is very probably the wrong image.
 *
 * Two problems, and neither is an implementation decision:
 *
 * 1. It does not look African. project-context.md § Design philosophy commits to
 *    "real African photography", and the SEO document is more specific still — it
 *    wants "a real traveller in a real, identifiable African setting". This shows
 *    four women in front of a mural; the branded glass in frame reads CERVEZA
 *    SUR, a Spanish beer, which places the scene in Europe. This is the same
 *    problem `hero.content.ts` already documents about `/hero.png`.
 *
 * 2. It is alcohol-forward. Omanga is a Nigerian brand selling to travellers
 *    across the continent, a large share of whom do not drink. Four people
 *    holding beer is a narrower audience signal than a payments and insurance
 *    router wants to open with, and it says nothing about either product.
 *
 * Shipped as supplied, because substituting an image is a design decision and
 * the brief is explicit that the correct existing asset is to be used. Raised for
 * design.
 *
 * ---------------------------------------------------------------------------
 * [RENAMED] Supplied as `getstartedimg.jpg`. coding-guidelines.md § File naming
 * requires "lowercase, hyphenated asset filenames" and § Image optimization
 * requires assets be "renamed on import". Nothing else referenced the old name.
 *
 * [FLAGGED] The source is 6720 × 4480 and 27.4MB — roughly five times the
 * largest size it is ever rendered at. `next/image` resizes and re-encodes it, so
 * the browser never receives that weight, but § Image optimization is explicit:
 * "Serve at the largest rendered size, not the source size. Re-export oversized
 * assets." It should be re-exported at ~3024px wide before launch, which also
 * takes it out of the git history at 27MB.
 */

/**
 * `alt` is deliberately empty.
 *
 * The band is atmosphere. It sits between two sections that fully describe the
 * products, carries no text, and conveys nothing a screen-reader user needs in
 * order to act — so an empty alt is the correct statement rather than an
 * omission (component-rules.md § Image component rules).
 *
 * [QUESTION] If the SEO document's framing is taken literally — the photograph as
 * the page's "primary experience signal" — then it is content and wants a
 * descriptive alt. That alt would be user-facing copy about a real place, it is
 * not in the approved document, and it cannot be written until (1) above is
 * settled and the photograph actually shows somewhere nameable. Flagged rather
 * than drafted.
 */
export const getStartedImageContent: ImageAsset = {
  src: "/get-started-friends.jpg",
  alt: "",
  width: 6720,
  height: 4480,
} as const;
