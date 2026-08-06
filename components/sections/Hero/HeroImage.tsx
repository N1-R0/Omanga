import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

/**
 * The hero's full-bleed background photograph and its scrim.
 *
 * Absolutely positioned behind the content, which is one of the three cases
 * layout rules sanction for absolute positioning ("scrims, decorative art, and
 * true overlays, always within a positioned ancestor"). The ancestor is the
 * `section` in `Hero`.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Calls `next/image` directly rather than going through `Media`.
 *
 * `Media` locks a content image's aspect ratio inside a fluid column — it sets
 * `w-full`, applies a ratio class, and requires `ratio` and `radius`. A
 * full-bleed background has no ratio of its own: its box is sized by the band it
 * fills, and the image crops to whatever that turns out to be. Every one of
 * `Media`'s props would be either meaningless or actively wrong here.
 *
 * This is the same reasoning that already keeps `Avatar` and `Logo` separate from
 * `Media`: three genuinely different image cases, three components, rather than
 * one component with props that half its callers ignore. The rule that matters —
 * "components never use a raw image element" — still holds, because this is the
 * shared component for the full-bleed case, not an inline `img` in a section.
 *
 * ---------------------------------------------------------------------------
 * The scrim is not applied here, and that is deliberate.
 *
 * The `scrim` utility sets `position: relative` so its `::after` has something to
 * anchor to. Putting it on this element — which must be `position: absolute` —
 * makes two utilities in the same layer fight over one property, and which one
 * wins depends on the order Tailwind happens to emit them in. It resolves
 * correctly today purely because `.absolute` is emitted after `.scrim`. That is
 * not a thing to depend on.
 *
 * So `Hero` carries `scrim` on the `section`, which is already `relative`, and
 * this element sits behind it. component-rules.md's requirement that "the
 * component enforces it rather than each caller" still holds — the caller of
 * `Hero` cannot turn the scrim off, and there is no prop to try.
 */

export type HeroImageProps = {
  image: ImageAsset;
};

export function HeroImage({ image }: HeroImageProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      <Image
        src={image.src}
        alt={image.alt}
        /*
          `fill` rather than width/height: the band's height is set by its own
          min-height and by how far the copy reflows, so the intrinsic dimensions
          cannot describe the rendered box. The parent is `absolute inset-0`, so
          the box is fully sized before the image loads and nothing shifts —
          which is what protects the CLS budget here in place of a ratio lock.
        */
        fill
        /*
          The band is edge to edge at every breakpoint, so the image is always
          viewport-width. Stating that exactly is what stops a phone downloading
          a desktop-sized crop, which is the largest single risk to the LCP
          budget on this page.
        */
        sizes="100vw"
        /*
          The one eager image on the site. "Hero image only: priority" — it is
          the LCP element, so it is preloaded and must not wait on lazy loading.
        */
        priority
        className="animate-hero-pan object-cover"
      />
      {/*
        `bg-ink` on the wrapper is the reserved surface underneath. If the image
        fails or has not painted yet, the band is a dark surface with legible
        white text on it rather than white text on white — a failure mode that
        would otherwise make the headline invisible.
      */}
    </div>
  );
}
