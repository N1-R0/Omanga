import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

import { FeatureVisual } from "./visuals/FeatureVisual";

// Brand plate, 16 radius.
// [FIXED] `aspect-square` was a Tailwind default rather than a system ratio, and
// at 640 square it was the largest element in the band — while still holding no
// artwork (see the [BLOCKER] in deep-dive.content.ts). `aspect-card` is the
// system's 3:2 content-plate ratio and is what every other media box uses.
const PANEL_CLASS =
  "relative aspect-card w-full overflow-hidden rounded-md bg-brand";

/**
 * The plate beside the feature list.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] It draws the active feature's artwork.
 *
 * The plate was empty. `preview` — a supplied image per product — was the plan,
 * and the content module still records the [BLOCKER] saying no such image
 * exists. Rather than wait on an asset, the twelve features now have drawn
 * artwork in `visuals/FeatureVisual`, and the plate shows whichever feature is
 * open.
 *
 * `preview` is kept and still wins. If a real product mockup is ever supplied it
 * should override a drawing, and the precedence is stated here rather than left
 * to whoever adds the image to work out.
 *
 * ---------------------------------------------------------------------------
 * [ACCESSIBILITY] The whole plate is hidden when it holds drawn artwork.
 *
 * The visuals contain labels — "Total balance", "USD → NGN", country names — and
 * unhidden they would be announced as loose text between the feature list and
 * whatever follows, with no indication they are a picture. Worse, a visitor
 * using a screen reader would hear a balance and a set of exchange rates read
 * out as though they were live figures on a payments site.
 *
 * Hiding them is honest here because they restate the feature beside them: the
 * heading and body immediately to the left carry every claim the artwork makes.
 * That is the same contract `ArtBox` and `FeatureArtBox` hold, and the same
 * reasoning recorded in both.
 *
 * A supplied `preview` image is different — it has an `alt` written for it, so
 * it is exposed rather than hidden.
 */

export type PreviewPanelProps = {
  /** A supplied product mockup. Takes precedence over the drawn artwork. */
  preview?: ImageAsset;
  sizes: string;
  /** The open feature, whose artwork the plate draws. */
  activeFeatureId: string;
};

export function PreviewPanel({
  preview,
  sizes,
  activeFeatureId,
}: PreviewPanelProps) {
  if (preview !== undefined) {
    return (
      <div className={PANEL_CLASS}>
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes={sizes}
          loading="lazy"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={PANEL_CLASS} aria-hidden>
      <FeatureVisual featureId={activeFeatureId} />
    </div>
  );
}
