import { useEffect } from "react";
import type { RefObject } from "react";

export type UseDismissOptions = {
  readonly isOpen: boolean;
  readonly onDismiss: () => void;
  readonly panelRef: RefObject<HTMLElement | null>;
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
      if (event.key === "Escape") {
        event.stopPropagation();
        onDismiss();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

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
