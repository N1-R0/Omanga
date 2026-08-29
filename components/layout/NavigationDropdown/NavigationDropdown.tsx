"use client";

import { useCallback, useId, useRef, useState } from "react";

import { NavigationItem } from "@/components/layout/NavigationItem";
import { useDismiss } from "@/hooks/useDismiss";
import { cx } from "@/lib/cx";
import { isCurrentPath } from "@/lib/is-current-path";
import type { LinkGroup } from "@/types/content.types";
import type { Tone } from "@/types/ui.types";

/**
 * A navigation entry that opens a short list of destinations beneath it.
 *
 * ---------------------------------------------------------------------------
 * A DISCLOSURE, NOT A `role="menu"`
 *
 * The ARIA menu pattern is for application menus — the ones where arrow keys
 * move a roving focus, Home and End jump to the ends, and Tab leaves the whole
 * widget. This is a list of two page links. Announcing them as menu items would
 * promise a keyboard model that is not implemented, and a screen-reader user
 * would press Down expecting to move between them and get nothing.
 *
 * So it is a button with `aria-expanded` and `aria-controls`, disclosing a plain
 * `ul` of links. Tab moves through them, which is what a list of links should
 * do, and every assistive technology already supports it.
 *
 * ---------------------------------------------------------------------------
 * OPEN ON HOVER *AND* ON CLICK
 *
 * Hover alone is unusable on touch and unreachable by keyboard. Click alone
 * feels broken on a desktop nav, where the whole convention is that these open
 * on approach.
 *
 * Both are wired, and the hover half is guarded by `@media (hover: hover)` at
 * the CSS level and by pointer type at the JS level: `onPointerEnter` fires for
 * a touch too, and without the guard a tap would open the panel on pointerenter
 * and the click that follows would immediately close it again.
 *
 * There is no close delay on pointer leave. The panel is flush against the
 * button with no gap to cross, so the usual reason for one — a diagonal mouse
 * path across dead space — does not exist here.
 */

/** The chevron. Inline SVG: one shape, no icon dependency, inherits colour. */
function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className={cx(
        "size-3 shrink-0 transition-standard",
        isOpen && "rotate-180",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export type NavigationDropdownProps = {
  group: LinkGroup;
  /** The path being viewed, so a child can be marked current. */
  pathname: string;
  tone: Tone;
};

export function NavigationDropdown({
  group,
  pathname,
  tone,
}: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Escape and outside press. The wrapper is the trigger region, so a press on
  // the button itself is excluded and cannot close-then-reopen.
  useDismiss({ isOpen, onDismiss: close, panelRef, triggerRef: wrapperRef });

  /**
   * Whether the open menu contains the page being viewed.
   *
   * The group has no route of its own, so this is the only way "Company" can
   * show that one of its children is where you are. It is a real state, not a
   * decoration: without it the nav highlights nothing at all on `/about`.
   */
  const hasCurrentChild = group.items.some((item) =>
    isCurrentPath(pathname, item.href),
  );

  /**
   * Close when focus leaves the whole group.
   *
   * On the wrapper, not on the button. React's `onBlur` is the delegated
   * `focusout`, so it bubbles — a handler on the button alone would fire as
   * focus moved into the panel and close it before the first link could be
   * reached. Checking `relatedTarget` against the wrapper is what survives
   * tabbing through the children and still closes when Tab leaves the last one.
   */
  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;

    if (next instanceof Node && event.currentTarget.contains(next)) {
      return;
    }

    setIsOpen(false);
  }, []);

  const handlePointerEnter = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse") {
      setIsOpen(true);
    }
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse") {
      setIsOpen(false);
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          setIsOpen((wasOpen) => !wasOpen);
        }}
        /*
          `data-label` and `nav-link` are the same treatment the sibling links
          get, so the button sits on the shared baseline and reserves the same
          width for its own hover weight. Without it, opening the menu would
          nudge every item to its right.
        */
        data-label={group.label}
        className={cx(
          "nav-link px-fluid-2 font-sans text-small hit-area focus-ring transition-standard",
          "gap-fluid-1",
          hasCurrentChild || isOpen
            ? NAV_STATE[tone].current
            : NAV_STATE[tone].default,
        )}
      >
        {/*
          One grid cell holding the label and the chevron, so the width
          reservation in `nav-link` still measures the same box the label
          occupies. A second grid item would sit on top of the first.
        */}
        <span className="inline-flex items-center gap-fluid-1">
          {group.label}
          <Chevron isOpen={isOpen} />
        </span>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        inert={!isOpen}
        className={cx(
          /*
            `top-full` with no offset: the panel starts exactly where the button
            ends, so there is no gap for a mouse to fall through on its way down.

            Centred on the button rather than left-aligned to it, because the
            desktop nav is itself centred in the bar — a panel hanging off the
            left edge of a centred item reads as misaligned rather than anchored.
          */
          "absolute top-full left-1/2 z-menu -translate-x-1/2",
          /*
            `rounded-sm` is the 8px card radius, and the panel is a small card.
            The border does the separating rather than a shadow: the system's
            only light-surface shadows are the glass set, which belong to the
            glass components, and inventing an elevation token for one menu is
            how a shadow scale starts drifting.
          */
          "min-w-max rounded-sm border border-border-hairline bg-surface-page",
          "p-fluid-2",
          "transition-menu",
          isOpen
            ? "menu-expanded translate-y-0 opacity-100"
            : "menu-collapsed -translate-y-1 opacity-0",
        )}
      >
        <ul role="list" className="flex flex-col items-stretch">
          {group.items.map((item) => (
            <li key={item.href}>
              <NavigationItem
                link={item}
                isCurrent={isCurrentPath(pathname, item.href)}
                tone="light"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The sibling links' state map, minus the hover weight change.
 *
 * `nav-link` keeps a link's width fixed across hover by rendering its label a
 * second time at weight 500, hidden, in the same grid cell — so the cell is
 * always as wide as the bold form and the visible label can thicken inside it
 * without moving anything.
 *
 * That reservation measures `data-label`, which is the word alone. This button
 * also contains a chevron, so its visible content is already wider than the
 * reservation and the reservation stops doing its job: thicken this label on
 * hover and the button grows, shifting every item to its right by two or three
 * pixels. On a centred nav bar that moves the whole row.
 *
 * So hover here is carried by colour and by the rule `nav-link` already draws,
 * and the weight is left alone. The alternative — taking the chevron out of
 * flow so the reservation still measures the whole button — needs a
 * padding-inline-end utility that does not exist, added to `styles/utilities.css`
 * for exactly one component, which that file's own rule forbids.
 *
 * Duplicated from `NavigationItem` rather than imported: exporting the map would
 * make a Server Component's internals part of a Client Component's contract, and
 * passing classes down as props would let any caller restyle a nav item.
 */
const NAV_STATE: Readonly<Record<Tone, { current: string; default: string }>> = {
  light: { current: "text-brand", default: "text-ink hover:text-brand" },
  dark: { current: "text-on-dark", default: "text-on-dark" },
  brand: { current: "text-on-dark", default: "text-on-dark" },
} as const;
