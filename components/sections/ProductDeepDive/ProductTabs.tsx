"use client";

import { useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { Stack } from "@/components/layout/Stack";

import type { DeepDiveContent } from "@/content/deep-dive.content";

import { ProductContent } from "./ProductContent";
import { ProductTab } from "./ProductTab";

const TAB_LIST_CLASS =
  "grid w-full grid-cols-2 gap-fluid-1 rounded-pill border border-border-subtle p-fluid-1 tablet:inline-flex tablet:w-auto";

export type ProductTabsProps = {
  products: DeepDiveContent["products"];
  /** Names the tab list for assistive technology, from the section's heading. */
  labelledBy: string;
};

export function ProductTabs({ products, labelledBy }: ProductTabsProps) {
  const isReducedMotion = useReducedMotion() === true;
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const focusTab = (index: number) => {
    const nextIndex = (index + products.length) % products.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(products.length - 1);
    }
  };

  return (
    <Stack gap="2xl">
      <div className="flex justify-center">
        <div role="tablist" aria-labelledby={labelledBy} className={TAB_LIST_CLASS}>
          {products.map((product, index) => (
            <ProductTab
              key={product.id}
              id={`${baseId}-${product.id}-tab`}
              panelId={`${baseId}-${product.id}-panel`}
              label={product.tabLabel}
              isActive={index === activeIndex}
              indicatorLayoutId={`${baseId}-indicator`}
              isReducedMotion={isReducedMotion}
              onSelect={() => setActiveIndex(index)}
              onKeyDown={handleKeyDown}
              registerRef={(element) => {
                tabRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </div>

      {/* Both panels stay in the DOM so inactive copy is still in the server HTML. */}
      {products.map((product, index) => (
        <div
          key={product.id}
          role="tabpanel"
          id={`${baseId}-${product.id}-panel`}
          aria-labelledby={`${baseId}-${product.id}-tab`}
          tabIndex={0}
          hidden={index !== activeIndex}
          className="focus-ring"
        >
          <ProductContent product={product} isReducedMotion={isReducedMotion} />
        </div>
      ))}
    </Stack>
  );
}
