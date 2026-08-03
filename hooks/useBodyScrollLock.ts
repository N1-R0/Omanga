import { useEffect } from "react";

/**
 * Freeze page scrolling while an overlay is open.
 *
 * The lock is a `data-scroll-locked` attribute on the document element; the
 * rule that acts on it lives in `styles/globals.css`. That indirection is
 * deliberate. Components declare no inline `style`, and writing
 * `document.body.style.overflow` from a hook is the same violation wearing a
 * different hat — it also silently clobbers whatever overflow the stylesheet
 * set, which is how scroll locks end up leaving the page unscrollable.
 *
 * The stylesheet keeps `scrollbar-gutter: stable` on the scroll container at
 * all times, so locking and unlocking cannot change the content width. Without
 * it, every menu open would shift the page by the scrollbar's width and spend
 * that shift out of the CLS budget.
 *
 * An effect is the right tool here by the project's own rule — this is a
 * subscription to something outside React, and it cleans up after itself.
 */
const LOCK_ATTRIBUTE = "data-scroll-locked";

export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const root = document.documentElement;
    root.setAttribute(LOCK_ATTRIBUTE, "");

    // Cleanup runs on unmount as well as on unlock, so a component that
    // disappears while its overlay is open cannot leave the page frozen.
    return () => {
      root.removeAttribute(LOCK_ATTRIBUTE);
    };
  }, [isLocked]);
}
