import Image from "next/image";

import type { ImageAsset } from "@/types/content.types";

// Square brand plate, 16 radius, per design-system.md § Card variants and § Image treatment.
const PANEL_CLASS =
  "relative aspect-square w-full overflow-hidden rounded-panel bg-brand";

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
