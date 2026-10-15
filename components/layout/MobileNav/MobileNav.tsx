"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useDismiss } from "@/hooks/useDismiss";
import { useFocusReturn } from "@/hooks/useFocusReturn";
import { cx } from "@/lib/cx";
import { isCurrentPath } from "@/lib/is-current-path";
import { isLinkGroup } from "@/types/content.types";
import type {
  CallToAction,
  LinkGroup,
  NavigationEntry,
} from "@/types/content.types";
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
 * design.md gives one sentence about narrow layouts — "Header collapses
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
  /** The second pill at the foot of the open menu (the wallet sign-up). */
  menuAction: CallToAction;
  /** Lets the header go see-through while the full-screen menu is open. */
  onOpenChange?: (isOpen: boolean) => void;
  items: readonly NavigationEntry[];
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
  menuAction,
  onOpenChange,
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

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  /**
   * Close on navigation.
   *
   * Without this, tapping a link in the panel navigates but leaves the panel
   * open over the new page. `usePathname` is the signal because the App Router
   * gives no navigation callback, and this is a subscription to something
   * outside React.
   */
  const pathname = usePathname();

  // [CHANGED, 2026-10-15] Adjusted during render, not in an effect (React's
  // "storing information from previous renders" pattern): when the path
  // changes, close the panel in the same render instead of one render later.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setIsOpen(false);
  }

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

      {/*
        [CHANGED, 2026-10-15] Revolut's mobile menu (measured on revolut.com):
        a full-screen sheet over the page, 50% black with an 85px backdrop
        blur, white type. Top-level links are left-aligned rows; a group is an
        accordion row with a chevron, smaller sub-links and a hairline after it;
        two full-width pills follow the links.

        The sheet is positioned inside the header from its top edge, under the
        bar's own content, and the header goes transparent while it is open
        (`onOpenChange`), so logo, toggle and sheet read as one surface.
      */}
      <div
        id={panelId}
        ref={panelRef}
        inert={!isOpen}
        className={cx(
          "absolute inset-x-0 top-0 -z-10 flex h-dvh flex-col bg-black/50 pt-header text-on-dark backdrop-blur-[85px]",
          "desktop:hidden",
          "transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.15,0.5,0.5,1)]",
          isOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="flex-1 overflow-y-auto px-fluid-4 pt-fluid-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <nav aria-label={landmarkLabel}>
            <ul role="list" className="flex flex-col">
              {items.map((entry) =>
                isLinkGroup(entry) ? (
                  <li key={entry.label}>
                    <MenuGroup group={entry} pathname={pathname} />
                  </li>
                ) : (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      aria-current={
                        isCurrentPath(pathname, entry.href) ? "page" : undefined
                      }
                      className="flex h-12 items-center font-heading text-main font-medium focus-ring"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/*
          [CHANGED, 2026-10-15] Stacked full width, right under the links (owner
          request), rather than pinned to the foot of the sheet. Wallet first:
          it is the primary action on every page.
        */}
          <div className="grid gap-fluid-2 pt-fluid-5">
            <Button
              as="link"
              variant="white"
              tone="dark"
              href={menuAction.href}
              isExternal={menuAction.isExternal}
            >
              {menuAction.label}
            </Button>
            <Button
              as="link"
              variant="secondary"
              tone="dark"
              href={action.href}
            >
              {action.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * A group row: label and chevron; open, its links in smaller regular type and
 * a hairline after them (Revolut). Opens by default when it holds the current
 * page.
 */
function MenuGroup({
  group,
  pathname,
}: {
  group: LinkGroup;
  pathname: string;
}) {
  const hasCurrentChild = group.items.some((item) =>
    isCurrentPath(pathname, item.href),
  );
  const [isOpen, setIsOpen] = useState(hasCurrentChild);
  const listId = useId();

  return (
    <div className={cx(isOpen && "border-b border-white/20 pb-fluid-2")}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        className="flex h-12 w-full items-center justify-between font-heading text-main font-medium focus-ring"
      >
        {group.label}
        <svg
          viewBox="0 0 24 24"
          className={cx(
            "size-4 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        id={listId}
        inert={!isOpen}
        className={cx(
          "grid transition-[grid-template-rows,opacity] duration-300",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul role="list" className="min-h-0 overflow-hidden">
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={
                  isCurrentPath(pathname, item.href) ? "page" : undefined
                }
                className="flex h-11 items-center font-sans text-small text-on-dark/85 focus-ring"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
