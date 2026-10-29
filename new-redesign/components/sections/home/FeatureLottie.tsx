"use client";

import type { AnimationItem } from "lottie-web";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import type { FeatureLottie as Scene } from "@/new-redesign/content/home.content";

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
      if (window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) stripFilters(data);
      anim.current = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData: data,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [near, active, scene.src]);

  useEffect(() => () => anim.current?.destroy(), []);

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

type LottieLayer = { ef?: { ty: number }[]; layers?: LottieLayer[] };

function stripFilters(data: { layers: LottieLayer[]; assets?: LottieLayer[] }) {
  const strip = (layers: LottieLayer[] = []) => {
    for (const layer of layers) {
      if (layer.ef) layer.ef = layer.ef.filter((e) => e.ty !== 25 && e.ty !== 29);
    }
  };
  strip(data.layers);
  for (const asset of data.assets ?? []) strip(asset.layers);
}
