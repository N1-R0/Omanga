import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

/**
 * The band's decorative line art.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] Absolutely positioned, which is sanctioned here and nowhere else in
 * this section.
 *
 * `component-rules.md` § Layout rules: "Absolute positioning is reserved for
 * scrims, decorative art, and true overlays, always within a positioned
 * ancestor." This is decorative art, and `CTA` supplies the positioned ancestor.
 *
 * Taking it out of flow is also what stops it driving the band's height. The
 * artwork is 346 tall against a content block of roughly 180, so in normal flow it
 * would set the section's height and the band would grow by 160 for a background.
 * Out of flow, the rhythm stays the section's.
 *
 * ---------------------------------------------------------------------------
 * WIDTH. Anchored right and centred on the band's midline, and scaled per
 * breakpoint so it never runs under the copy. The copy is capped at 486 by
 * `CTAContent`, so the artwork has to finish to the right of that at every width:
 *
 *   breakpoint  content column   artwork      clearance
 *   tablet 768        710        256  454-710      -32
 *   desktop 1024      952        384  568-952      +82
 *   wide 1440        1344        708  636-1344    +150
 *
 * 708 is the asset's intrinsic width and 177 × 4 on the spacing scale, so the wide
 * step renders it 1:1 with no resampling. The 32 of overlap at tablet falls where
 * the second line of the heading ends and involves 0.8px strokes behind white
 * 48px type — it does not measurably change the text's contrast against the brand
 * surface.
 *
 * No vertical scaling. The shapes are drawn to run past the 708 × 346 viewBox so
 * they read as cropped by the band, and stretching the box would either reveal the
 * overrun or crop the shapes twice.
 *
 * ---------------------------------------------------------------------------
 * [DISCREPANCY] Flush to the content column, not to the band's edge.
 *
 * The frame puts the artwork about 25 from the band's right edge, which is inside
 * the page gutter. Reaching that would need a negative offset on a child, and §
 * Layout rules is explicit: "No negative margins, no magic offsets." `right-0`
 * puts it on the content column's right edge instead — 48 from the band edge at
 * 1440, so about 23 further in than drawn. **Confirm whether the artwork should
 * bleed past the gutter.** If it should, that is a `Container` capability rather
 * than something this section should improvise.
 *
 * ---------------------------------------------------------------------------
 * Hidden below the tablet breakpoint, by decision. The frame supplies only a
 * desktop composition, and on a narrow band the artwork would sit directly behind
 * the heading and both buttons. It carries no information, so hiding it costs
 * nothing semantically and guarantees the readability and tap-target requirements.
 * `hidden` removes it from paint and from the accessibility tree, and the image
 * never loads on a phone. **Confirm the narrow-screen treatment with design.**
 *
 * `aria-hidden` on the wrapper as well as an empty `alt`: the empty alt already
 * removes the image, and the wrapper carries nothing else, but stating both means
 * a future addition inside this box cannot leak into the accessibility tree by
 * accident. `pointer-events-none` guarantees the artwork can never take a tap
 * intended for a button, whatever it ends up overlapping.
 *
 * `unoptimized`, following `FlagItem`, `SolutionIllustration` and `Logo` — there is
 * nothing for the optimizer to do to an SVG, and saying so is cheaper than
 * depending on the framework's pass-through behaviour holding across versions.
 */

/** Mirrors the width classes below, so the browser fetches at the rendered size. */
const SIZES = "(min-width: 90rem) 708px, (min-width: 64rem) 384px, 256px";

export type CTAGraphicsProps = {
  graphic: ImageAsset;
};

export function CTAGraphics({ graphic }: CTAGraphicsProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 tablet:block tablet:w-64 desktop:w-96 wide:w-177"
    >
      <Image
        src={graphic.src}
        alt={graphic.alt}
        width={graphic.width}
        height={graphic.height}
        sizes={SIZES}
        unoptimized
        loading="lazy"
        className="h-auto w-full"
      />
    </div>
  );
}
