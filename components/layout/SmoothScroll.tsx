"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenis: Lenis | null = null;

export function pauseSmoothScroll(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
