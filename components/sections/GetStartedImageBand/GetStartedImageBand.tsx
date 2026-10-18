import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

/**
 * The Get Started page's full-bleed photographic band.
 *
 * One image, no heading, no copy, no overlay, no scrim. The band exists to break
 * the page's rhythm between two text sections, which is also why it carries no
 * layout of its own beyond its height.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A `div`, not a `section`.
 *
 * coding-guidelines.md: "Every section is a `section` with an accessible name
 * from its heading." This band has no heading by requirement, so a `section`
 * here would be a region with no accessible name — announced as an unlabelled
 * landmark that a screen-reader user has to enter to discover is empty. A `div`
 * is the honest element for a band that is purely visual.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Full-bleed, and no vertical padding.
 *
 * The screenshot runs the image edge to edge with no gutter, so `Container` is
 * deliberately absent — this is the one band on the page that is not on the
 * content column.
 *
 * It also sets no vertical rhythm. The space above it is the hero's bottom
 * `section-rhythm` padding and the space below it will be the next section's
 * top padding; adding padding here would stack a third value on top of two that
 * already exist and put ~200px of white above the image at desktop. "Spacing
 * between siblings comes from the parent's gap. Children carry no margins."
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Height from `--spacing-image-band`, not an aspect ratio.
 *
 * Measured at 525 against a 1512 frame. The token reproduces that proportion as
 * a `vw` term with a floor and a cap — see the token for why a bare ratio has
 * neither. The box is fully sized before the image loads either way, so the CLS
 * guarantee is unchanged.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] `next/image` directly rather than through `Media`.
 *
 * The same call `HeroImage` documents, for the same reason and one more. `Media`
 * locks a ratio from a closed set — none of which is near 2.9:1 — and its box is
 * `w-full` with the image inside it at 100%. A parallax layer has to be *taller*
 * than its box and free to move inside it, which is the one thing `Media`'s
 * geometry cannot express. Every one of its props would be wrong here.
 *
 * The rule that matters — "components never use a raw image element" — still
 * holds: this is the shared component for the full-bleed parallax case, not an
 * inline `img` dropped into a section.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] A Client Component, where coding-guidelines.md says `"use client"`
 * belongs in "the leaf that needs interactivity, never in a section wrapper".
 *
 * The same deviation `Header` already documents, for the same reason: the effect
 * is driven by scroll position, and scroll position does not exist on the server.
 * `useScroll` needs a ref to the band itself, so the ref and the element cannot
 * be split across the boundary.
 *
 * What the rule is protecting is not lost. There is no server subtree being
 * dragged into the client bundle — the band's entire content is one image — the
 * asset arrives as a prop so no content module enters the bundle, and the
 * `<img>` is in the server HTML because Client Components still server-render.
 * With JavaScript disabled the band is a static photograph, which is the correct
 * degraded state.
 */

export type GetStartedImageBandProps = {
  image: ImageAsset;
};

export function GetStartedImageBand({ image }: GetStartedImageBandProps) {
  /*
    [CHANGED, 2026-10-18] Static. The scroll-linked parallax (`useScroll`)
    is removed with the site's other scroll effects (owner request,
    crawlability), so the photo simply fills the band.
  */
  return (
    <div className="relative h-image-band w-full overflow-hidden bg-surface-light">
      <BandImage image={image} />
    </div>
  );
}

/**
 * The photograph itself. Not exported — it exists only inside this band and has
 * no second caller, so hoisting it would be generalising for a use case that does
 * not exist. It is separate only because both branches above render it and a
 * duplicated `Image` is a place for the two to drift apart.
 */
function BandImage({ image }: { image: ImageAsset }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      /*
        `fill` rather than width/height: the rendered box is set by the band's
        height token and the overscan, so the intrinsic dimensions cannot describe
        it. The parent is absolutely positioned and fully sized, so nothing shifts
        on load.
      */
      fill
      /* Edge to edge at every breakpoint, so the image is always viewport-width. */
      sizes="100vw"
      /*
        Lazy, which is the default for everything but the hero. The band sits
        below the fold on this page — the hero above it is 432 to 552 tall before
        the header — so it is not the LCP element and eager-loading a 3000px-wide
        photograph would cost the budget nothing is gained.
      */
      className="object-cover"
    />
  );
}
