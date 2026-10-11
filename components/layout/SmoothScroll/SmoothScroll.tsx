"use client";

import { useEffect } from "react";

/**
 * Site-wide smooth scrolling.
 *
 * Lenis, which is the library this effect is usually built with — it replaces the
 * browser's scroll with an interpolated one, so the page glides to a stop instead
 * of halting on the last wheel tick.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A new dependency, deliberately.
 *
 * `motion` is already installed and `useScroll` can read scroll position, but it
 * cannot *replace* scroll — there is no momentum primitive in it. The alternative
 * was hand-rolling a requestAnimationFrame lerp over `scrollTop`, which is what
 * Lenis is, except without its accumulated handling of trackpads, touch, anchor
 * targets, nested scrollers and the several browsers that report wheel deltas
 * differently. 6KB for that is the cheaper side of the trade.
 *
 * ---------------------------------------------------------------------------
 * [ACCESSIBILITY] Scroll interception is the risky kind of enhancement, so it is
 * fenced on all four sides:
 *
 *   1. `prefers-reduced-motion` skips it entirely. Native scrolling returns —
 *      not a shortened animation, no instance created at all. design.md § 11
 *      principle 4 removes slide motion, and this is the page sliding.
 *   2. Keyboard scrolling is left to the browser. Lenis does not capture Space,
 *      Page Up/Down, Home/End or arrow keys, so no keyboard user's scroll changes
 *      behaviour or speed.
 *   3. `allowNestedScroll` so a scrollable child — the mobile navigation panel is
 *      the one on this site — keeps its own scrolling instead of having every
 *      gesture inside it hijacked by the page.
 *   4. `autoRaf` drives it from Lenis's own frame loop and is torn down on
 *      unmount, so a route change cannot leave an orphaned rAF running.
 *
 * `anchors` hands in-page links to Lenis, so the skip link and every `#` target
 * land on the right element rather than being fought over by two scroll systems.
 * `:target` in globals.css still supplies the sticky-header offset.
 *
 * `duration` is 0.9s with an exponential ease-out — long enough to read as weight,
 * short enough that the page is never still moving when a user starts reading. The
 * common failure of this effect is a two-second glide that makes a long page feel
 * unresponsive; 0.9 is measured against this page, which is tall.
 *
 * ---------------------------------------------------------------------------
 * Renders nothing. It is mounted once in the root layout, alongside the other
 * document-wide concerns, and it holds no state React needs to know about.
 *
 * ---------------------------------------------------------------------------
 * [PERFORMANCE, 2026-10-11] Lenis is imported dynamically, after the browser is
 * idle, and never on touch-only devices. A site audit measured mobile LCP at
 * 2.9–3.2s against Google's 2.5s bar. The hero image arrived quickly, but it
 * painted ~2s late behind main-thread JavaScript, and the Lenis chunk was part
 * of that work. Lenis leaves touch scrolling native by default (`syncTouch` is
 * off), so phones were paying for a library that did nothing for them. Desktop
 * still gets smooth scrolling, a moment after the first paint instead of before it.
 *
 * NOTE: `styles/globals.css` keeps `scroll-behavior: smooth` for in-page anchors.
 * Lenis handles anchors itself while it is active, and the CSS rule is what makes
 * them smooth for the reduced-motion path — where Lenis is absent — so both stay.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const isTouchOnly = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    if (prefersReducedMotion.matches || isTouchOnly) {
      return;
    }

    let lenis: { destroy: () => void } | undefined;
    let isCancelled = false;

    const start = async () => {
      const { default: Lenis } = await import("lenis");

      if (isCancelled) {
        return;
      }

      lenis = new Lenis({
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: true,
        allowNestedScroll: true,
        autoRaf: true,
      });
    };

    // Safari has no requestIdleCallback; a short timeout is the fallback.
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idleHandle = hasIdleCallback
      ? window.requestIdleCallback(() => void start(), { timeout: 2000 })
      : setTimeout(() => void start(), 1200);

    return () => {
      isCancelled = true;

      if (hasIdleCallback) {
        window.cancelIdleCallback(idleHandle as number);
      } else {
        clearTimeout(idleHandle);
      }

      lenis?.destroy();
    };
  }, []);

  return null;
}
