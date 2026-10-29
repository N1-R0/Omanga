import { useEffect } from "react";

const LOCK_ATTRIBUTE = "data-scroll-locked";

export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const root = document.documentElement;
    root.setAttribute(LOCK_ATTRIBUTE, "");

    return () => {
      root.removeAttribute(LOCK_ATTRIBUTE);
    };
  }, [isLocked]);
}
