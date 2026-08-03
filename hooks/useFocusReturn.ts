import { useEffect, useRef } from "react";
import type { RefObject } from "react";

/**
 * Move focus into a panel when it opens, and put it back where it came from
 * when it closes.
 *
 * component-rules.md: "Focus is managed explicitly when content appears,
 * expands, or is dismissed, and returned to its origin on close." Both halves
 * live here so a component cannot ship one without the other — a panel that
 * takes focus and then drops it at the top of the document on close is a worse
 * experience than one that never took it.
 *
 * Deliberately *not* a focus trap. The mobile navigation panel is a disclosure,
 * not a modal: the header bar around it — logo, primary call to action, the
 * toggle itself — stays visible and stays legitimately reachable. Containing Tab
 * inside the panel would lock a keyboard user away from controls they can see,
 * and claiming `aria-modal` for a panel that does not cover the page would be
 * false. If a genuinely modal overlay is ever needed, it needs a trap, and this
 * hook is not it.
 */

/**
 * Natively focusable elements, minus anything already out of the tab order.
 * `[hidden]` is excluded because focusing a hidden element silently does
 * nothing, which reads to the user as the keyboard having stopped working.
 */
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
  /**
   * Where focus came from. A ref, not state: it is never rendered, and writing
   * it must not schedule a render in the middle of a focus transition.
   */
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

      /**
       * Only restore focus if it is still inside the panel. If the user
       * activated a link, or clicked somewhere else on the page, focus has
       * already moved somewhere they chose — pulling it back to the toggle
       * would be the component overriding a deliberate action.
       */
      const activeOnClose = document.activeElement;
      const hasFocusInPanel =
        activeOnClose instanceof Node && panel.contains(activeOnClose);

      if (hasFocusInPanel || activeOnClose === document.body) {
        origin.focus();
      }
    };
  }, [isOpen, panelRef]);
}
