"use client";

import { useEffect, useRef, type ReactNode } from "react";

const HEADER = 76;

export function ScrollGrowBox({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
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
      style={{ ["--p" as string]: 0, ["--start" as string]: "min(1080px, 100% - 32px)" }}
      className={`mx-auto w-full md:w-[calc(var(--start)+(100%-var(--start))*var(--p))] md:rounded-[calc(12px*(1-var(--p)))] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
