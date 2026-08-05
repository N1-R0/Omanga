"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/Button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useDismiss } from "@/hooks/useDismiss";
import { useFocusReturn } from "@/hooks/useFocusReturn";
import { cx } from "@/lib/cx";
import type { CallToAction, LinkTarget } from "@/types/content.types";
import type { Tone } from "@/types/ui.types";

import { MobileNavToggle } from "./MobileNavToggle";

/**
 * The narrow-viewport navigation: a toggle in the header bar and a panel that
 * opens beneath it.
 *
 * A disclosure, not a dialog. The panel is positioned against the header rather
 * than the viewport, so the bar above it — logo, primary call to action, the
 * toggle — stays visible and stays usable. That decides every accessibility
 * choice below: `aria-expanded` and `aria-controls` rather than `role="dialog"`,
 * focus moved in and returned rather than trapped, and no `aria-modal`, because
 * the rest of the page is not in fact hidden.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] There is no mobile frame in Figma.
 *
 * design-system.md gives one sentence about narrow layouts — "Header collapses
 * to wordmark, hamburger and one persistent primary button below 1024" — and the
 * docs state outright that "narrow layouts are engineering decisions to be
 * confirmed against design". The panel's surface, its position, and its
 * animation are therefore derived, not measured. Every value used is an existing
 * token. **Needs design confirmation.**
 *
 * ---------------------------------------------------------------------------
 * The panel is always in the DOM
 *
 * It is never conditionally mounted. Two reasons: the nav links are then present
 * in the server HTML at every viewport, which is what SEO expectations require
 * ("all copy server-rendered; nothing that matters to search may depend on
 * client hydration"), and an element that is already there can animate in and
 * out, where a freshly mounted one cannot.
 *
 * `inert` is what makes that safe. While closed, the panel is transparent and
 * `inert` removes it from the tab order, from the accessibility tree, and from
 * hit-testing — all three, which is more than `opacity-0` or `pointer-events-none`
 * would do on their own, and without `display: none`'s inability to animate.
 */

export type MobileNavProps = {
  items: readonly LinkTarget[];
  /**
   * The header's primary call to action.
   *
   * Below `desktop` this panel is the only place it renders — the bar keeps the
   * wordmark and the toggle and nothing else, as the mobile reference does.
   */
  action: CallToAction;
  /** Accessible name for the navigation landmark inside the panel. */
  landmarkLabel: string;
  openLabel: string;
  closeLabel: string;
  /**
   * The tone of the header bar the toggle sits in.
   *
   * It reaches the toggle only. The panel is always light: it is an opaque surface
   * of its own, not a window onto the photograph, so the nav inside it is fixed to
   * `light` rather than following this prop. The two elements genuinely sit on
   * different surfaces, and pretending otherwise would put white links on a white
   * panel the moment the header went transparent.
   */
  tone: Tone;
};

export function MobileNav({
  items,
  action,
  landmarkLabel,
  openLabel,
  closeLabel,
  tone,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * A generated id rather than a constant, so the panel and its `aria-controls`
   * cannot collide with anything else if the header is ever rendered twice.
   */
  const panelId = useId();

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  // Stable identity, so the dismissal effects do not tear down and rebind their
  // document listeners on every render.
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((wasOpen) => !wasOpen);
  }, []);

  // Escape, and a press anywhere outside the panel or its toggle.
  useDismiss({ isOpen, onDismiss: close, panelRef, triggerRef: toggleRef });

  // Focus into the panel on open, back to the toggle on close.
  useFocusReturn({ isOpen, panelRef });

  // The page behind cannot scroll away from the panel while it is open.
  useBodyScrollLock(isOpen);

  /**
   * Close on navigation.
   *
   * Without this, tapping a link in the panel navigates but leaves the panel
   * open over the new page. `usePathname` is the signal because the App Router
   * gives no navigation callback, and this is a subscription to something
   * outside React rather than a derived value — which is the only thing effects
   * are for here.
   */
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/*
        The toggle is wrapped so `useDismiss` has an element to exclude from the
        outside-press region. Without that exclusion the same press would close
        the panel on pointerdown and the toggle would reopen it on click.
      */}
      <div ref={toggleRef} className="desktop:hidden">
        <MobileNavToggle
          isOpen={isOpen}
          onToggle={toggle}
          panelId={panelId}
          openLabel={openLabel}
          closeLabel={closeLabel}
          tone={tone}
        />
      </div>

      <div
        id={panelId}
        ref={panelRef}
        inert={!isOpen}
        className={cx(
          /*
            `top-full` anchors the panel to the bottom edge of the header with no
            magic offset and no header-height token — the header is the
            positioned ancestor, so the panel simply starts where it ends.

            `max-h-screen` with internal scrolling is the safety net for a very
            short viewport or very large text: the panel's natural height is
            about six rows, which fits comfortably, but if it ever does not,
            everything inside stays reachable rather than being clipped.
          */
          "absolute inset-x-0 top-full z-menu max-h-screen overflow-y-auto",
          /*
            The panel and the bar are both `--color-surface-page`, so the top
            edge is the only thing separating them and it has to be visible.

            `--color-border-field` and not `--color-border-light`: the latter is
            `#E5F2F2`, which Phase 1 measured at 1.05:1 on a light surface — it
            fails the 3:1 UI-boundary requirement and would draw nothing a user
            could see. The field token is ink at 50% and measures 3.37:1.

            [QUESTION] Its name is wrong for this use. The system has no general
            light-surface divider token, because Figma contains no drawn
            boundaries on light surfaces at all — the same gap Phase 1 raised as
            open question 4.5, and the same gap behind the header's absent bottom
            border. One token named for the role would close both.
          */
          "border-t border-border-field bg-surface-page px-5 py-6",
          "desktop:hidden",
          /*
            [MEASURED from the structural benchmark] Its menu panels open over
            300ms on `outCirc`, wiping downward as they fade in.

            `transition-menu` carries both, replacing `transition-emphasis`. Same
            duration — 300ms was already the token — but the curve is the
            benchmark's, and a wipe is added to the fade. `outCirc` decelerates far
            harder than `--ease-standard`, which is what makes a panel of this size
            arrive and stop rather than drift into place.

            The benchmark animates `height` to produce the wipe. `clip-path` gives
            the same result on the compositor without touching layout, and without
            needing the panel's height known in advance. See the utility.

            Under `prefers-reduced-motion` the global policy collapses the
            duration, so the panel appears and disappears instantly with its final
            state intact — nothing is gated on the animation running.
          */
          "transition-menu",
          isOpen
            ? "menu-expanded translate-y-0 opacity-100"
            : "menu-collapsed -translate-y-2 opacity-0",
        )}
      >
        {/*
          Navigation, then the primary call to action beneath it.

          The button is not a second copy: the bar hides its own below `desktop`,
          so exactly one filled brand button exists in the viewport at any width.
          It sits last so the nav links stay closest to the toggle that revealed
          them, and so the strongest action is the last thing read.
        */}
        <div className="flex flex-col gap-6">
          <Navigation
            items={items}
            landmarkLabel={landmarkLabel}
            orientation="column"
            tone="light"
          />

          {/* Content width, centred — the panel's links are centred too, and a
              full-bleed button would read as a surface rather than a control. */}
          <div className="flex justify-center">
            <Button as="link" variant="primary" tone="light" href={action.href}>
              {action.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
