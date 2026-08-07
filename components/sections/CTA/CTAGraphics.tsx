import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

/**
 * The closing band's decorative artwork.
 *
 * ---------------------------------------------------------------------------
 * [REDESIGNED] From a right-hand element to a backdrop.
 *
 * It used to sit absolutely positioned against the right edge at up to 708px
 * wide, beside a 400px copy column. That arrangement made it a second focal
 * point in a band that should have exactly one, and it was the reason the copy
 * was squeezed into a column narrower than the band could afford.
 *
 * It now spans the band behind the copy at low opacity. Same asset, same
 * decorative role, but it reads as texture on the brand surface rather than as
 * something to look at — which is what lets the heading be the only thing in
 * the band with any weight.
 *
 * Consequences worth stating rather than rediscovering in review:
 *
 *   - `-z-10` puts it behind the copy. The parent in `CTA` carries `isolate`, so
 *     that negative index stays inside this band and cannot escape to sit behind
 *     the page background.
 *   - It is hidden below tablet. On a phone the band is close to square and the
 *     artwork's 2:1 box would either crop to nothing or force the band taller
 *     for no gain.
 *   - `opacity-20` against `--color-brand` keeps every contrast pair in the band
 *     measured against the flat brand fill, so the heading's and the button's
 *     contrast ratios are unchanged by its presence.
 *
 * ---------------------------------------------------------------------------
 * [FIXED] It was spilling out of the band and into the footer.
 *
 * `h-auto w-full` sized the artwork to the container's width and let its height
 * fall where it liked — 1424 wide gives a 696-tall box, and any width or copy
 * length that leaves the band shorter than that put the difference outside the
 * band. Nothing clipped it, so the outlines carried on over the footer's ink
 * surface, where they read as a rendering fault rather than as texture.
 *
 * Two changes, and both are needed:
 *
 *   `object-contain` inside a box that fills the band, so the artwork is bounded
 *   by the band's height as well as its width and can never be taller than the
 *   thing it sits behind.
 *
 *   `overflow-hidden` as the backstop. Containment already prevents the spill;
 *   this makes it impossible for a future change to reintroduce it.
 */

/**
 * The rendered box is the band's width from tablet up, so `sizes` states the
 * viewport rather than a fixed pixel width. The band is inside the page gutter,
 * hence the 90vw rather than 100vw.
 */
const SIZES = "(min-width: 48rem) 90vw, 0px";

export type CTAGraphicsProps = {
  graphic: ImageAsset;
};

export function CTAGraphics({ graphic }: CTAGraphicsProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden items-center justify-center overflow-hidden opacity-20 tablet:flex"
    >
      <Image
        src={graphic.src}
        alt={graphic.alt}
        width={graphic.width}
        height={graphic.height}
        sizes={SIZES}
        unoptimized
        loading="lazy"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
