"use client";

import { useEffect, useState } from "react";

// Gates JavaScript behaviour to a breakpoint, never layout — layout stays in CSS.
// Returns false until mounted, so the server render is the unenhanced one.
export function useMediaQuery(query: string): boolean {
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setIsMatching(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMatching(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return isMatching;
}
