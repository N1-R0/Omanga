"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";
import { FeatureLottie } from "@/new-redesign/components/sections/home/FeatureLottie";
import { Photo } from "@/new-redesign/components/ui/Photo";

type Step = { title: string; text: string; lottie: string; ms: number; stillFrame: number };

export function StepWalkthrough({ steps, photo, label, head }: { steps: readonly Step[]; photo: string; label: string; head?: ReactNode }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (still || !visible) return;
    const ms = steps[active].ms;
    const startedAt = performance.now() - progress * ms;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startedAt) / ms);
      setProgress(p);
      if (p >= 1) {
        setProgress(0);
        setActive((a) => (a + 1) % steps.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, still, visible, steps]);

  const go = (i: number) => {
    setProgress(0);
    setActive(i);
  };

  return (
    <div ref={root} className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
      <div className="flex flex-col justify-between gap-10 lg:order-1 lg:gap-6">
        {head}
        <ol aria-label={label} className="flex flex-col gap-3">
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={on ? "step" : undefined}
                  className={cx(
                    "relative flex w-full flex-col overflow-hidden rounded-xs border bg-surface px-5 py-4 text-left transition-colors duration-[var(--duration-base)]",
                    on ? "border-border" : "border-transparent hover:border-border",
                  )}
                >
                  <span className="flex items-center gap-4">
                    <span className={cx("type-p3 grid size-9 shrink-0 place-items-center rounded-[10px] tabular-nums transition-colors", on ? "bg-accent text-on-accent" : "bg-surface-muted text-text")}>
                      {i + 1}
                    </span>
                    <span className="type-h3 text-[18px]">{s.title}</span>
                  </span>
                  <span
                    className={cx(
                      "grid transition-[grid-template-rows,opacity] duration-[var(--duration-base)] ease-standard",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="type-p1 block pt-3 pl-13 text-text-secondary">{s.text}</span>
                    </span>
                  </span>
                  {on ? (
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-surface-muted">
                      <span className="block h-full bg-accent" style={{ width: `${(still ? 1 : progress) * 100}%` }} />
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative isolate flex h-[460px] items-center justify-center overflow-hidden rounded-sm md:h-[560px] lg:order-2 lg:h-[max(600px,calc(100svh-96px))]">
        <Photo src={photo} alt="" fill sizes="(min-width: 1024px) 540px, 100vw" className="-z-10 object-cover" />
        <FeatureLottie key={steps[active].lottie} scene={{ src: steps[active].lottie, stillFrame: steps[active].stillFrame }} active={visible || still} className="aspect-[560/760] h-full" />
      </div>
    </div>
  );
}
