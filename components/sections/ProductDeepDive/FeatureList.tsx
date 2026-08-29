"use client";

import type { DeepDiveFeature } from "@/content/deep-dive.content";

import { FeatureItem } from "./FeatureItem";

/**
 * [CHANGED, 2026-08-29] The active feature is a prop, not local state.
 *
 * It was `useState` here, which was right while this list was the only thing
 * that cared. The preview panel beside it now draws the active feature's
 * artwork, so the state has one more consumer and belongs at the nearest common
 * ancestor — `ProductContent` — rather than being duplicated or lifted through a
 * callback that reports what this component already knows.
 */
export type FeatureListProps = {
  productId: string;
  features: readonly DeepDiveFeature[];
  activeId: string;
  onSelect: (featureId: string) => void;
  isReducedMotion: boolean;
};

export function FeatureList({
  productId,
  features,
  activeId,
  onSelect,
  isReducedMotion,
}: FeatureListProps) {
  return (
    <ul role="list" className="flex flex-col">
      {features.map((feature) => (
        <FeatureItem
          key={feature.id}
          feature={feature}
          buttonId={`${productId}-${feature.id}-button`}
          regionId={`${productId}-${feature.id}-region`}
          isActive={feature.id === activeId}
          isReducedMotion={isReducedMotion}
          onSelect={() => onSelect(feature.id)}
        />
      ))}
    </ul>
  );
}
