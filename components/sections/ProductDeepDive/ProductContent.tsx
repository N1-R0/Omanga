"use client";

import type { DeepDiveProduct } from "@/content/deep-dive.content";

import { FeatureList } from "./FeatureList";
import { PreviewPanel } from "./PreviewPanel";

// design-system.md § Grid system: "Deep dive: feature list and 672 square media, 50 gap."
const LAYOUT_CLASS =
  "grid grid-cols-1 gap-12 desktop:grid-cols-12 desktop:gap-x-12";
const LIST_CELL_CLASS = "desktop:col-span-5";
const PANEL_CELL_CLASS = "desktop:col-start-7 desktop:col-span-6";

// The panel is six of twelve columns inside a container capping at 95rem.
const PREVIEW_SIZES =
  "(min-width: 90rem) 688px, (min-width: 64rem) 48vw, (min-width: 48rem) calc(100vw - 6rem), calc(100vw - 2rem)";

export type ProductContentProps = {
  product: DeepDiveProduct;
  isReducedMotion: boolean;
};

export function ProductContent({
  product,
  isReducedMotion,
}: ProductContentProps) {
  return (
    <div className={LAYOUT_CLASS}>
      <div className={LIST_CELL_CLASS}>
        <FeatureList
          productId={product.id}
          features={product.features}
          isReducedMotion={isReducedMotion}
        />
      </div>

      <div className={PANEL_CELL_CLASS}>
        <PreviewPanel preview={product.preview} sizes={PREVIEW_SIZES} />
      </div>
    </div>
  );
}
