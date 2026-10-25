"use client";

import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";

/**
 * The steps' journey rail (owner-approved wireframe, 2026-10-25): "Home" on
 * the left, "Lagos" on the right, and a dotted path between them with a stop
 * over each card's centre. The path dips to the middle stop because the
 * middle card sits lower (owner: "curvy" lines), then rises again.
 *
 * A plane follows the path with the scroll, turning with its curve. The
 * travelled part of the path goes dark grey; each stop fills crimson with a
 * white number once the plane reaches it.
 *
 * Progress: when the section is pinned (the `pin` variant, HomeSteps), it is
 * how far the page has scrolled through the section's extra height, so the
 * plane finishes just as the section unpins. When it isn't pinned, it runs
 * while the rail moves from 85% to 40% of the viewport height. With reduced
 * motion it sits at the end, every stop filled.
 *
 * Desktop only (the cards stack below 1024px). Decorative: the cards carry
 * the steps and their numbers.
 */
const GAP = 16; // the cards' grid gap, so the stops sit over their centres
const Y = 12; // the path's resting height inside the drawing

export function StepsRail({ from, to, count, dip: DIP }: { from: string; to: string; count: number; dip: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [width, setWidth] = useState(0);
  const [plane, setPlane] = useState({ x: 0, y: Y, angle: 0 });

  const col = (width - GAP * (count - 1)) / count;
  const stops = Array.from({ length: count }, (_, i) => ({ x: col / 2 + i * (col + GAP), y: i === Math.floor(count / 2) ? Y + DIP : Y }));
  const points = [{ x: 0, y: Y }, ...stops, { x: width, y: Y }];
  const d = points.reduce((acc, pt, i) => {
    if (i === 0) return `M${pt.x},${pt.y}`;
    const prev = points[i - 1];
    const mid = (prev.x + pt.x) / 2;
    return `${acc} C${mid},${prev.y} ${mid},${pt.y} ${pt.x},${pt.y}`;
  }, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.closest("section");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const progress = () => {
      const vh = window.innerHeight;
      if (still) return 1;
      if (section && section.offsetHeight > vh * 1.5) {
        return -section.getBoundingClientRect().top / (section.offsetHeight - vh);
      }
      return (vh * 0.85 - el.getBoundingClientRect().top) / (vh * 0.45);
    };
    const update = () => {
      frame = 0;
      setWidth(el.offsetWidth);
      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      const at = Math.min(1, Math.max(0, progress())) * len;
      const pt = path.getPointAtLength(at);
      const ahead = path.getPointAtLength(Math.min(len, at + 1));
      const behind = path.getPointAtLength(Math.max(0, at - 1));
      setPlane({ x: pt.x, y: pt.y, angle: (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [width]);

  return (
    <div ref={ref} aria-hidden className="relative mb-5 hidden pt-8 lg:block">
      <span className="type-p2 absolute top-0 left-0 inline-flex items-center gap-1.5 text-text-secondary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-[18px]">
          <path d="M3 11 12 4l9 7v9H3z" />
          <path d="M9 20v-6h6v6" />
        </svg>
        {from}
      </span>
      <span className="type-p2 absolute top-0 right-0 inline-flex items-center gap-1.5 text-text-secondary">
        {to}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-[18px]">
          <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </span>

      <div className="relative" style={{ height: Y * 2 + DIP }}>
        {width ? (
          <svg width={width} height={Y * 2 + DIP} className="absolute inset-0 overflow-visible">
            <defs>
              <clipPath id="steps-travelled">
                <rect x={0} y={-20} width={plane.x} height={Y * 2 + DIP + 40} />
              </clipPath>
            </defs>
            <path ref={pathRef} d={d} fill="none" className="stroke-border-strong" strokeWidth={2} strokeDasharray="0 7" strokeLinecap="round" />
            <path d={d} fill="none" className="stroke-neutral-700" strokeWidth={2} strokeDasharray="0 7" strokeLinecap="round" clipPath="url(#steps-travelled)" />
          </svg>
        ) : null}

        {stops.map((s, i) => {
          const on = plane.x >= s.x;
          return (
            <span
              key={i}
              className={cx(
                "type-p3 absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1.5px] transition-colors duration-[var(--duration-base)]",
                on ? "border-accent bg-accent text-on-accent" : "border-border-strong bg-surface text-text",
              )}
              style={{ left: s.x, top: s.y }}
            >
              {i + 1}
            </span>
          );
        })}

        <svg
          viewBox="0 0 24 24"
          className="absolute top-0 left-0 size-[22px] fill-accent"
          style={{ transform: `translate(${plane.x - 11}px, ${plane.y - 11}px) rotate(${plane.angle}deg)` }}
        >
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)" />
        </svg>
      </div>
    </div>
  );
}
