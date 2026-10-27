"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A box that starts at the content width (12px radius) and grows to the full
 * page width (square) as the page scrolls, done when its top reaches the
 * header (owner, 2026-10-26, About hero). Progress is a CSS variable, `--p`
 * from 0 to 1, written on scroll at most once a frame.
 *
 * From 768 only: below that the box is already edge to edge. Under reduced
 * motion it stays at the content width.
 */
const HEADER = 76;

export function ScrollGrowBox({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // Distance the page scrolls before the box's top meets the header.
      const travel = Math.max(1, box.getBoundingClientRect().top + window.scrollY - HEADER);
      box.style.setProperty("--p", String(Math.min(1, Math.max(0, window.scrollY / travel))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      // --start: the content column (1080, or the viewport less the gutters).
      style={{ ["--p" as string]: 0, ["--start" as string]: "min(1080px, 100% - 32px)" }}
      className={`mx-auto w-full md:w-[calc(var(--start)+(100%-var(--start))*var(--p))] md:rounded-[calc(12px*(1-var(--p)))] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
