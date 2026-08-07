"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import type { CallToAction, LinkTarget } from "@/types/content.types";

/**
 * The site header.
 *
 * Layout from the Figma frame (node 1265:12524): logo left, navigation centred,
 * primary call to action right, on a flat white bar. Height and behaviour from the
 * structural benchmark, claritybusinesstravel.com — a 4rem sticky bar with a
 * hairline bottom rule and a 0.3s ease-in-out slide.
 *
 * ---------------------------------------------------------------------------
 * The surface is always opaque
 *
 * An earlier pass made the bar transparent over the hero with white content,
 * inverting on scroll. Reverted: it ships white at all times, which is what the
 * Figma frame draws and what every other band on the page expects. Consequences of
 * the revert, so none of it lingers as dead weight:
 *
 *   - The header is `sticky` again, not `fixed`, so it occupies its own height and
 *     no page has to compensate for a bar floating above it.
 *   - The hero's extra top padding is gone, along with the `--spacing-hero-top`
 *     token that existed only to hold header height + hero padding.
 *   - There is no `isOverlay` prop and no tone switching, so the failure mode it
 *     carried — white links on a white page for any route without a hero — cannot
 *     happen.
 *
 * The `tone` prop on `Navigation`, `MobileNav` and `NavigationItem` survives, and
 * only ever receives `light` from here. It is kept rather than reverted because the
 * dark treatment is measured and documented, and nav-styled links on a dark surface
 * is a real possibility. If that does not materialise, it is dead weight and should
 * be deleted.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] A Client Component, where component-rules.md says layouts stay
 * server-rendered.
 *
 * One reason only: the bar hides on scroll down and returns on scroll up, and
 * scroll position does not exist on the server. Every string and destination still
 * arrives as a prop from the server layout, so no content module enters the client
 * bundle and all the markup is in the server HTML. With JavaScript disabled the
 * header simply never hides, which is the safe state.
 */

/**
 * Scroll distance before the bar is allowed to hide, in pixels.
 *
 * Not a design token — a behavioural threshold, not a measurement of anything
 * drawn. One header height is the smallest value that stops the bar flickering
 * away on the small scroll a focus jump or an anchor link causes.
 */
const HIDE_AFTER_PX = 64;

export type HeaderProps = {
  items: readonly LinkTarget[];
  action: CallToAction;
  landmarkLabel: string;
  /** Wordmark text and the accessible name for the home link. */
  wordmark: string;
  homeLabel: string;
  openLabel: string;
  closeLabel: string;
};

export function Header({
  items,
  action,
  landmarkLabel,
  wordmark,
  homeLabel,
  openLabel,
  closeLabel,
}: HeaderProps) {
  const [isHidden, setIsHidden] = useState(false);

  /** Last known scroll offset. A ref — it is never rendered. */
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    /**
     * Coalesced into an animation frame. Scroll fires far more often than the
     * screen refreshes, and setting state per event would re-render the header
     * many times a frame for no visible benefit — straight into the INP budget.
     */
    let frame = 0;

    const handleScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;

        const y = window.scrollY;
        const isScrollingDown = y > lastYRef.current;

        setIsHidden(isScrollingDown && y > HIDE_AFTER_PX);
        lastYRef.current = y;
      });
    };

    // `passive` because the handler never calls preventDefault, which lets the
    // browser keep scrolling on the compositor rather than waiting on this.
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <header
      className={cx(
        /*
          `flex items-center` on the header itself, not on a descendant.

          This is what fixes the vertical alignment: the inner row previously
          carried `h-full`, which resolves against `Container` — and `Container`
          has no height of its own, so `h-full` computed to `auto` and nothing
          centred. The content sat at the top of a 64px bar. Making the header the
          flex context means `Container` is the item being centred, and no
          descendant needs to know the bar's height at all.
        */
        "sticky top-0 z-header flex h-header items-center",
        "border-b border-border-hairline bg-surface-page text-ink focus-ring-on-light",
        "transition-header",
        isHidden && "-translate-y-full",
        /*
          Reveals the bar whenever focus lands inside it, so a scroll-down that hid
          it cannot make the header unreachable by keyboard. Declared after the
          hidden class deliberately — Tailwind emits variant utilities after plain
          ones, so this wins without `!important`.
        */
        "focus-within:translate-y-0",
      )}
    >
      <Container>
        {/*
          Three regions rather than `justify-between`: the nav is centred in the
          bar, not merely placed between two things, so it must not shift when the
          logo or the button changes width. `flex-1` on the outer two gives them
          equal widths regardless of their contents, which is what holds the centre
          still.
        */}
        <div className="flex items-center gap-fluid-4">
          <div className="flex flex-1 items-center justify-start">
            <Logo wordmark={wordmark} label={homeLabel} />
          </div>

          {/*
            The Header owns this breakpoint, not the Navigation — "breakpoints are
            declared in the component that owns the layout change". Hiding the
            wrapper with `display` also takes the landmark out of the accessibility
            tree, which keeps exactly one navigation landmark exposed at any width.
          */}
          <div className="hidden desktop:block">
            <Navigation
              items={items}
              landmarkLabel={landmarkLabel}
              orientation="row"
              tone="light"
            />
          </div>

          <div className="flex flex-1 items-center justify-end gap-fluid-2">
            {/*
              Desktop only below `desktop`, the primary call to action moves into
              the disclosure panel, which is where the mobile reference puts it.
              Rule 12 still holds — the button exists at every breakpoint and is one
              press away on a phone — and so does rule 3, because only one copy of
              it is ever rendered.
            */}
            <div className="hidden desktop:block">
              <Button as="link" variant="primary" tone="light" href={action.href}>
                {action.label}
              </Button>
            </div>

            <MobileNav
              items={items}
              action={action}
              landmarkLabel={landmarkLabel}
              openLabel={openLabel}
              closeLabel={closeLabel}
              tone="light"
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
