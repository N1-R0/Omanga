"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { heroVideoContent } from "@/content/hero.content";

/**
 * [ADDED, 2026-10-18] Home hero, owner wireframe "Desktop - 1": the h1, line
 * and two actions centred on a white page, and under them an inset video
 * frame (a traveller walking through an airport) that grows to full bleed as
 * the page scrolls.
 *
 * [CHANGED, 2026-10-18] No longer the home hero (replaced by `HeroCard` the
 * same day); kept, with its clip in public/, for a later section. It renders
 * an h1, so give it an h2 before reusing it below a hero.
 *
 * The frame scales with `transform` (GPU, no layout per frame) from its inset
 * size up to the viewport width, and its corners square off as it lands.
 * The range runs from the frame's top entering the viewport to that top
 * reaching the header line, so the grow is done by the time the frame fills
 * the screen.
 *
 * Reduced motion holds the final state: full bleed, square corners, no
 * scroll link. The video itself still plays muted; a decorative loop has no
 * sound or controls to offer, so it is `aria-hidden`.
 *
 * A Client Component for the same reason `GetStartedImageBand` is: the effect
 * is driven by scroll position, which does not exist on the server.
 */

/** Inset scale at rest: the wireframe's frame is ~80% of the page width. */
const REST_SCALE = 0.8;
/** Corner radius at rest, in px (`--radius-md` is 16; a bigger plate wants more). */
const REST_RADIUS = 24;

export function HeroVideoReveal({ headingId }: { headingId: string }) {
  const { heading, intro, actions, video } = heroVideoContent;
  const frameRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0.35, 1], [REST_SCALE, 1]);
  const radius = useTransform(scrollYProgress, [0.35, 1], [REST_RADIUS, 0]);

  return (
    <section aria-labelledby={headingId} className="bg-surface-page text-ink">
      <Container>
        <div className="flex flex-col items-center gap-fluid-4 pb-fluid-8 pt-[16svh] text-center">
          {/*
            [CHANGED, 2026-10-18] Owner: heading bold and large, the line under
            it on one line. Heavier and bigger than the site's display role
            (Geist 500, 88px max), so set here rather than on the token; the
            intro only wraps below tablet, where one line cannot fit.
          */}
          <h1
            id={headingId}
            className="max-w-[17ch] font-heading text-[clamp(3rem,1.8rem+5.6vw,7rem)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance"
          >
            {heading}
          </h1>
          <p className="font-sans text-main text-ink/80 tablet:whitespace-nowrap">
            {intro}
          </p>
          <div className="flex flex-wrap justify-center gap-fluid-2 pt-fluid-1">
            {actions.map((action) => (
              <Button
                key={action.label}
                as="link"
                href={action.href}
                isExternal={action.isExternal}
                variant={
                  action.emphasis === "primary" ? "primary" : "secondary"
                }
                tone="light"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>

      {/* `overflow-hidden` on the wrapper stops the full-width frame adding a horizontal scroll. */}
      <div ref={frameRef} className="overflow-hidden">
        <motion.div
          className="relative aspect-[4/5] max-h-svh tablet:aspect-[16/9] w-full origin-top overflow-hidden bg-surface-light"
          style={
            isReducedMotion === true
              ? undefined
              : { scale, borderRadius: radius }
          }
        >
          <video
            className="absolute inset-0 size-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
