import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
]
  .map((selector) => `${selector}:not([hidden])`)
  .join(",");

export type UseFocusReturnOptions = {
  readonly isOpen: boolean;
  readonly panelRef: RefObject<HTMLElement | null>;
};

export function useFocusReturn({
  isOpen,
  panelRef,
}: UseFocusReturnOptions): void {
  const originRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const panel = panelRef.current;

    if (panel === null) {
      return;
    }

    const active = document.activeElement;
    originRef.current = active instanceof HTMLElement ? active : null;

    const first = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();

    return () => {
      const origin = originRef.current;
      originRef.current = null;

      if (origin === null || !document.body.contains(origin)) {
        return;
      }

      const activeOnClose = document.activeElement;
      const hasFocusInPanel =
        activeOnClose instanceof Node && panel.contains(activeOnClose);

      if (hasFocusInPanel || activeOnClose === document.body) {
        origin.focus();
      }
    };
  }, [isOpen, panelRef]);
}
