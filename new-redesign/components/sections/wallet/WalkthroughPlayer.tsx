"use client";

import type { AnimationItem } from "lottie-web";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";
import { PhoneFrame } from "@/new-redesign/components/ui/PhoneFrame";

/**
 * The phone walkthrough (design system § Phone walkthrough): the phone in the
 * centre plays the active step's clip while that step's timer fills; when it
 * fills, the next step starts, looping after the last. Clicking a step plays
 * it from the start.
 *
 * The clips are Lottie exports from Jitter (owner, 2026-10-22), played with
 * lottie-web's SVG build, as the home page's feature scenes are. The timer
 * runs on each step's known clip length (`ms`, equal to the Lottie's length),
 * and the animation is restarted with it, so a slow load never stalls the
 * steps; the poster (the clip's first frame) shows until the animation is
 * ready.
 *
 * Nothing runs while the section is off screen. Under reduced motion nothing
 * autoplays: the active step's poster shows, its track is full, and clicking
 * a step changes it.
 */
type Step = { title: string; text: string; lottie: string; poster: string; ms: number };

export function WalkthroughPlayer({
  steps,
  label,
  cta,
}: {
  steps: readonly Step[];
  label: string;
  /** "Download now" under every step (owner, 2026-10-22). */
  cta: { label: string; href: string };
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationItem | null>(null);
  const [ready, setReady] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  // Load the active step's clip; the poster covers the gap.
  const src = steps[active].lottie;
  useEffect(() => {
    const el = stage.current;
    if (!el || !visible) return;
    let cancelled = false;
    (async () => {
      const [{ default: lottie }, data] = await Promise.all([
        import("lottie-web/build/player/lottie_svg"),
        fetch(src).then((r) => r.json()),
      ]);
      if (cancelled) return;
      anim.current?.destroy();
      anim.current = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: data,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
      });
      setReady(src);
    })();
    return () => {
      cancelled = true;
    };
  }, [src, visible]);

  useEffect(() => () => anim.current?.destroy(), []);

  // Start the clip from its first frame once it's ready (held still under reduced motion).
  useEffect(() => {
    const a = anim.current;
    if (ready !== src || !a) return;
    if (still || !visible) a.goToAndStop(0, true);
    else a.goToAndPlay(progress * steps[active].ms, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, src, still, visible]);

  // One clock per step: fill the track over the clip's length, then move on.
  useEffect(() => {
    if (still || !visible) {
      anim.current?.pause();
      return;
    }
    const { ms } = steps[active];
    const start = performance.now() - progress * ms;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      setProgress(p);
      if (p >= 1) {
        setProgress(0);
        setActive((a) => (a + 1) % steps.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // `progress` is read once to resume where the clock stopped, not tracked.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, still, visible, steps]);

  const play = (i: number) => {
    setProgress(0);
    setActive(i);
  };

  const step = steps[active];

  return (
    <div ref={root} className="grid items-center lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-2 lg:gap-x-16 lg:gap-y-24">
      <div className="flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <PhoneFrame bare bezel="black" className="[--phone-scale:0.85] lg:[--phone-scale:1]">
          {/* eslint-disable-next-line @next/next/no-img-element -- a decorative still under the animation, sized by the frame */}
          <img src={step.poster} alt="" className={cx("absolute inset-0 size-full object-cover", ready === step.lottie && "invisible")} />
          <div ref={stage} className="absolute inset-0 [&_svg]:!size-full" />
        </PhoneFrame>
      </div>

      <ol aria-label={label} className="mt-12 flex flex-col gap-8 lg:contents">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <li
              key={s.title}
              className={cx(
                // The active step lifts into a white card with a soft shadow
                // (owner reference, 2026-10-22); the others sit flat on the
                // page with the same padding, so nothing shifts when it moves.
                "flex w-full max-w-[360px] flex-col items-start rounded-xs p-6 transition-[opacity,background-color,box-shadow] duration-[var(--duration-base)] ease-standard lg:self-center",
                on ? "bg-surface opacity-100 shadow-[var(--shadow-raise)]" : "opacity-45 hover:opacity-80",
                i < 2 ? "lg:col-start-1" : "lg:col-start-3",
                i % 2 === 0 ? "lg:row-start-1" : "lg:row-start-2",
              )}
            >
              <button
                type="button"
                onClick={() => play(i)}
                aria-current={on ? "step" : undefined}
                className="flex w-full flex-col items-start gap-3 rounded-xs text-left"
              >
                <span aria-hidden className="h-0.5 w-full overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full bg-accent"
                    style={{ width: on ? `${(still ? 1 : progress) * 100}%` : "0%" }}
                  />
                </span>
                <span className="type-p3 text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <span className="type-h3">{s.title}</span>
                <span className="type-p2 text-text-secondary">{s.text}</span>
              </button>
              {/* A sibling of the step button, not inside it: a link can't nest in a button. */}
              <Link href={cta.href} className="type-p3 mt-5 rounded-xs text-accent-text hover:underline hover:underline-offset-4">
                {cta.label} <span aria-hidden>→</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
