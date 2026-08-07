import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

// Brand plate, 16 radius.
// [FIXED] `aspect-square` was a Tailwind default rather than a system ratio, and
// at 640 square it was the largest element in the band — while still holding no
// artwork (see the [BLOCKER] in deep-dive.content.ts). `aspect-card` is the
// system's 3:2 content-plate ratio and is what every other media box uses.
const PANEL_CLASS =
  "relative aspect-card w-full overflow-hidden rounded-md bg-brand";

export type PreviewPanelProps = {
  /** Absent until the artwork is supplied; the plate then ships without art. */
  preview?: ImageAsset;
  sizes: string;
};

export function PreviewPanel({ preview, sizes }: PreviewPanelProps) {
  return (
    <div className={PANEL_CLASS}>
      {preview !== undefined && (
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes={sizes}
          loading="lazy"
          className="object-cover"
        />
      )}
    </div>
  );
}
