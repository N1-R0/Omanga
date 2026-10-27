"use client";

import { useEffect, useRef } from "react";

/**
 * A decorative, muted, looping video that fills its box (object-cover).
 * The 720p file plays below 768, the 1080p one above. Its poster shows until
 * it loads, and stays (the video never plays) when the visitor asks for
 * reduced motion.
 */
export function HeroVideo({ small, large, poster }: { small: string; large: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Autoplay can be refused (low-power mode); the poster then stays.
    video.play().catch(() => {});
  }, []);

  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} aria-hidden className="absolute inset-0 size-full object-cover">
      <source src={small} type="video/mp4" media="(max-width: 767px)" />
      <source src={large} type="video/mp4" />
    </video>
  );
}
