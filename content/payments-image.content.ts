import type { ImageAsset } from "@/types/content.types";

/**
 * The Payments page's full-bleed band.
 *
 * One asset, no strings but the alt — which is still user-facing copy, so it
 * lives here rather than in the component. Mirrors the arrangement
 * `insurance-image.content.ts` already has.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] The band is not in the content spec.
 *
 * `Omanga-Payment-Solutions-Page-v1` runs Header → Hero → (skip) → three cards
 * → Without/With → App → two cards → Trust → CTA → Footer, and its § Constraint
 * check claims "no new sections invented". There is no image band between the
 * hero and the cards. Added on instruction, mirroring `/insurance` and
 * `/get-started`. Because it carries no copy it contradicts no approved string,
 * but the page's section order now differs from the spec's, and § 11.2's heading
 * hierarchy is numbered against that order.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] THE MOCKUP RENDERS CARD LANGUAGE.
 *
 * The screen in the phone lists transactions reading "Card unlocked via app",
 * "Card locked via app" and "Snip 14 · Metal Card", and the account row above
 * them is labelled with a card-style artwork.
 *
 * This page removed the card everywhere. The `h1` above this band was rewritten
 * from the spec's "One multi-currency wallet **and card** for travel across
 * Africa" specifically to strike it, `site.content.ts` names the word in
 * `FORBIDDEN_COPY_TERMS`, and two homepage modules were corrected in the same
 * change for the weaker offence of saying "wherever cards are accepted".
 *
 * The rule those exist to serve is about the claim, not the character string,
 * and a claim rendered in a photograph is still the claim. A visitor reading a
 * headline that names no card, above an image of an app managing one, is being
 * told two different things about what the product is — on a payments page,
 * which is the worst category for it.
 *
 * It also names a metal card tier Omanga does not offer, and shows a $19.98
 * balance in a UI that is not Omanga's shipped app.
 *
 * Shipped as supplied because the instruction was to use this image, and the
 * text is small enough at the rendered size to be illegible on most screens —
 * but it is legible at 2× on a large display, and it should be replaced with a
 * render of the real wallet view before launch. Raised, not resolved.
 *
 * ---------------------------------------------------------------------------
 * [FLAGGED] 7680 × 4320 and 3.4MB, as a PNG.
 *
 * That is 8K — about five times the widest size it will ever render at, since
 * the band is `100vw` against a 1520 page cap. § Image optimization: "Serve at
 * the largest rendered size, not the source size. Re-export oversized assets."
 *
 * `next/image` protects the browser, so no visitor downloads 3.4MB. The
 * repository still carries it, and PNG is the wrong container for a photographic
 * gradient — a JPEG or WebP at ~3000px wide would be a fraction of this with no
 * visible difference at any rendered size.
 *
 * [RENAMED] Supplied as `paymentimage.png`. Renamed per coding-guidelines.md
 * § File naming, which requires lowercase, hyphenated, descriptive asset names.
 * Nothing referenced the old name.
 *
 * ---------------------------------------------------------------------------
 * [NOTE] It is cropped, and that is the decision rather than an accident.
 *
 * The source is 16:9. The band is `100vw` wide by `--spacing-image-band` tall,
 * which at the 1520 cap is 600 against the 855 an uncropped 16:9 would need, so
 * `object-cover` takes a centre band and the rock forms at top and bottom lose
 * their outer edges. Confirmed: the band height is not being set to fit this
 * image. The phone sits near the centre of the frame and survives the crop at
 * every width.
 */

/**
 * `alt` is deliberately empty.
 *
 * The band is atmosphere between two text sections, and it is the same call
 * `insurance-image.content.ts` and `get-started-image.content.ts` make.
 *
 * It is a closer call here than on those two, because this is a product mockup
 * rather than a photograph, and a mockup of the thing the page is selling can be
 * content. It stays decorative for one reason: everything the image asserts is
 * already stated in text within two screens of it — the hero paragraph above and
 * § 4's cards below — so describing it would repeat the page rather than add to
 * it. A screen-reader user loses nothing.
 *
 * If it is ever replaced with a render of the real wallet view carrying a claim
 * the copy does not make, it becomes content and wants a descriptive alt — and
 * that alt would have to come through the copy document.
 */
export const paymentsImageContent: ImageAsset = {
  src: "/payments-app-mockup.png",
  alt: "",
  width: 7680,
  height: 4320,
} as const;
