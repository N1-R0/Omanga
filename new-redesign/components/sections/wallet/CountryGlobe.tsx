"use client";

import createGlobe from "cobe";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { cx } from "@/lib/cx";
import { Flag } from "@/new-redesign/components/ui/Flag";

/**
 * The globe + list (design system § Country globe), after Cartesia's "Fluent
 * and native, worldwide" section (owner, 2026-10-22).
 *
 * Left: a 3D dotted globe drawn with cobe (WebGL, MIT, ~5KB), facing Africa
 * and swaying slowly left and right on a loop, with a crimson marker per
 * country. Right: the country list. Hovering or focusing a row picks that
 * country: its marker grows and a white chip names it. Nothing cycles on its
 * own (owner removed the auto-advance, 2026-10-23).
 *
 * The chip is tied to the marker with CSS anchor positioning: cobe puts a 1px
 * anchor named `--cobe-{id}` on each marker. Browsers without anchor
 * positioning skip the chip; the row highlight still shows the pick.
 *
 * The sway pauses off screen. Under reduced motion the globe is still.
 */
type Country = { name: string; flag: string; location: readonly [number, number] };

// Crimson accent (brand-600, #ae2448) and the white of the sphere, 0–1 RGB.
const ACCENT: [number, number, number] = [0.682, 0.141, 0.282];
const WHITE: [number, number, number] = [1, 1, 1];

// Africa's centre (≈ 2°N, 18°E) as cobe angles; the sway is ±0.3 rad over 14s.
const FACE_PHI = Math.PI - ((18 * Math.PI) / 180 - Math.PI / 2);
const FACE_THETA = 0.12;
const SWAY = 0.3;
const SWAY_MS = 14000;

const idOf = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");

export function CountryGlobe({
  countries,
  listLabel,
  cta,
}: {
  countries: readonly Country[];
  listLabel: string;
  cta: { label: string; href: string };
}) {
  const [active, setActive] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const globe = useRef<ReturnType<typeof createGlobe> | null>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let size = el.offsetWidth;

    globe.current = createGlobe(el, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: FACE_PHI,
      theta: FACE_THETA,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      mapBaseBrightness: 0,
      baseColor: WHITE,
      markerColor: ACCENT,
      glowColor: WHITE,
      markers: [],
      opacity: 0.9,
    });

    const ro = new ResizeObserver(() => {
      size = el.offsetWidth;
      globe.current?.update({ width: size * dpr, height: size * dpr });
    });
    ro.observe(el);

    let raf = 0;
    let on = false;
    const start = performance.now();
    const tick = (now: number) => {
      globe.current?.update({ phi: FACE_PHI + SWAY * Math.sin(((now - start) / SWAY_MS) * Math.PI * 2) });
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (still || e.isIntersecting === on) return;
      on = e.isIntersecting;
      if (on) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      globe.current?.destroy();
      globe.current = null;
    };
  }, []);

  // Markers redraw on the next frame; the active one is larger.
  useEffect(() => {
    globe.current?.update({
      markers: countries.map((c, i) => ({
        location: [c.location[0], c.location[1]],
        size: i === active ? 0.06 : 0.03,
        id: idOf(c.name),
      })),
    });
  }, [countries, active]);

  const on = countries[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[5fr_4fr] lg:gap-16">
      <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[560px]">
        {/* Its own box, so cobe's anchors (appended here) come before the chip. */}
        <div className="absolute inset-0">
          <canvas ref={canvas} className="size-full" />
        </div>
        <span
          className="type-p3 invisible absolute ml-3 flex -translate-y-1/2 items-center gap-2 rounded-full bg-surface py-1.5 pr-3 pl-1.5 whitespace-nowrap shadow-float supports-[anchor-name:--a]:visible"
          style={
            {
              positionAnchor: `--cobe-${idOf(on.name)}`,
              left: "anchor(right)",
              top: "anchor(center)",
            } as CSSProperties
          }
        >
          <Flag src={on.flag} size={20} />
          {on.name}
        </span>
      </div>

      <div>
        <p className="type-p3 pb-3 text-text-secondary">{listLabel}</p>
        <ul>
          {countries.map((c, i) => (
            <li key={c.name}>
              <Link
                href={cta.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cx(
                  "-mx-3 flex items-center gap-3 rounded-xs border-t border-border px-3 py-3.5 transition-colors duration-[var(--duration-fast)]",
                  i === active ? "bg-surface-muted" : "hover:bg-surface-muted",
                )}
              >
                <Flag src={c.flag} size={24} />
                <span className="type-p1 flex-1">{c.name}</span>
                <span aria-hidden className="text-text-secondary">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={cta.href}
          className="type-p3 flex border-t border-border pt-5 text-accent-text hover:underline hover:underline-offset-4"
        >
          {cta.label} <span aria-hidden className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
