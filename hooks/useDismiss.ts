import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * The two ways a user expects to close a transient overlay without using its
 * close control: pressing Escape, and clicking outside it.
 *
 * Both live in one hook because they are one contract — "let me out of this" —
 * and a component that implemented only one of them would be a bug that no
 * automated check catches.
 *
 * The trigger is excluded from the outside-click region on purpose. A toggle
 * button sits outside the panel, so without this the same click would dismiss
 * on `pointerdown` and immediately reopen on `click`.
 */

export type UseDismissOptions = {
  /** Nothing is bound while this is false, so a closed overlay costs nothing. */
  readonly isOpen: boolean;
  readonly onDismiss: () => void;
  /** The overlay. A click inside it is never a dismissal. */
  readonly panelRef: RefObject<HTMLElement | null>;
  /** The control that opened it, if any. Excluded from the outside region. */
  readonly triggerRef?: RefObject<HTMLElement | null>;
};

export function useDismiss({
  isOpen,
  onDismiss,
  panelRef,
  triggerRef,
}: UseDismissOptions): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // `key`, not `keyCode`, and the modern name only — "Esc" was IE.
      if (event.key === "Escape") {
        // Stop the key reaching anything below, so a nested overlay closes one
        // layer at a time rather than all of them at once.
        event.stopPropagation();
        onDismiss();
      }
    };

    /**
     * `pointerdown` rather than `click`, so a press that begins outside the
     * panel dismisses it even if the pointer is released somewhere else. It
     * also covers touch and pen without a second listener.
     */
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      // Composed events from inside a shadow root, and synthetic events with no
      // element target, are not "outside" — they are unknown, and dismissing on
      // unknown input would close the panel for reasons the user cannot see.
      if (!(target instanceof Node)) {
        return;
      }

      const isInsidePanel = panelRef.current?.contains(target) ?? false;
      const isOnTrigger = triggerRef?.current?.contains(target) ?? false;

      if (!isInsidePanel && !isOnTrigger) {
        onDismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, onDismiss, panelRef, triggerRef]);
}
