"use client";

import type { AnimationItem } from "lottie-web";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import type { FeatureLottie as Scene } from "@/new-redesign/content/home.content";

/**
 * A feature item's Lottie scene, filling its panel over the U2 texture
 * (home.content.ts FeatureLottie). Like the retired MP4 player, it plays only
 * while its row is open and the panel is on screen, and it starts from the
 * first frame each time the row opens. Nothing loads until the panel first
 * nears the viewport. With reduced motion it holds `stillFrame`.
 *
 * Uses lottie-web's SVG-only build: the light build drops the drop shadows,
 * and the canvas renderer drew nothing for Jitter's exports (design.md).
 *
 * Decorative: the row's title and text already say what the scene shows.
 */
export function FeatureLottie({ scene, active, className, style }: { scene: Scene; active: boolean; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationItem | null>(null);
  const [near, setNear] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [still, setStill] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.25 });
    const pre = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin: "400px" });
    io.observe(el);
    pre.observe(el);
    return () => {
      io.disconnect();
      pre.disconnect();
    };
  }, []);

  // Load once the panel is near, and only for the open row or a row that has been opened.
  useEffect(() => {
    const el = ref.current;
    if (!el || !near || !active || anim.current) return;
    let cancelled = false;
    (async () => {
      const [{ default: lottie }, data] = await Promise.all([
        import("lottie-web/build/player/lottie_svg"),
        fetch(scene.src).then((r) => r.json()),
      ]);
      if (cancelled) return;
      anim.current = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: data,
        // Fit, not cover: the scene is transparent over the panel's own texture,
        // so letterboxing never shows, and cover cropped the card at tablet widths.
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [near, active, scene.src]);

  useEffect(() => () => anim.current?.destroy(), []);

  // Rewind when the row opens, so each visit starts from the first beat.
  useEffect(() => {
    if (ready && active) anim.current?.goToAndStop(0, true);
  }, [ready, active]);

  useEffect(() => {
    const a = anim.current;
    if (!ready || !a) return;
    if (still) a.goToAndStop(scene.stillFrame, true);
    else if (active && onScreen) a.play();
    else a.pause();
  }, [ready, active, onScreen, still, scene.stillFrame]);

  return <div ref={ref} aria-hidden className={className} style={style} />;
}
