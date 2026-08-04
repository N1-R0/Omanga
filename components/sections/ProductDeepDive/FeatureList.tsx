"use client";

import { useState } from "react";

import type { DeepDiveFeature } from "@/content/deep-dive.content";

import { FeatureItem } from "./FeatureItem";

export type FeatureListProps = {
  productId: string;
  features: readonly DeepDiveFeature[];
  isReducedMotion: boolean;
};

export function FeatureList({
  productId,
  features,
  isReducedMotion,
}: FeatureListProps) {
  const [firstFeature] = features;
  const [activeId, setActiveId] = useState(firstFeature?.id ?? "");

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
          onSelect={() => setActiveId(feature.id)}
        />
      ))}
    </ul>
  );
}
