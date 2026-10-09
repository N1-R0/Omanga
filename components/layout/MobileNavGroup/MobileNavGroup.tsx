"use client";

import { useId, useState } from "react";

import { Chevron } from "@/components/layout/NavigationDropdown";
import { NavigationItem } from "@/components/layout/NavigationItem";
import { cx } from "@/lib/cx";
import { isCurrentPath } from "@/lib/is-current-path";
import type { LinkGroup } from "@/types/content.types";
import type { Tone } from "@/types/ui.types";

/**
 * A link group inside the mobile menu panel, as a tap-to-expand disclosure.
 *
 * [CHANGED, 2026-10-09] Replaces the flattened heading-plus-links treatment,
 * on instruction: "Company" should behave like the desktop dropdown. A button
 * with `aria-expanded`/`aria-controls` discloses the links in place.
 *
 * Starts open when the current page is one of its children, so the visitor can
 * see where they are without tapping. The panel's `clip-path` wipe is not a
 * problem: the group only expands after the panel has finished opening, and
 * the panel scrolls internally if the extra rows ever exceed the viewport.
 *
 * The height animation uses the grid-rows 0fr → 1fr technique, which needs no
 * measured height. Closed rows are `inert`, so collapsed links are neither
 * focusable nor announced. Reduced motion collapses the transition globally.
 */
export type MobileNavGroupProps = {
  group: LinkGroup;
  pathname: string;
  tone: Tone;
};

export function MobileNavGroup({ group, pathname, tone }: MobileNavGroupProps) {
  const hasCurrentChild = group.items.some((item) =>
    isCurrentPath(pathname, item.href),
  );
  const [isOpen, setIsOpen] = useState(hasCurrentChild);
  const listId = useId();

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => {
          setIsOpen((wasOpen) => !wasOpen);
        }}
        data-label={group.label}
        className={cx(
          "nav-link px-fluid-2 font-sans text-small hit-area focus-ring transition-standard",
          hasCurrentChild || isOpen ? "text-brand" : "text-ink hover:text-brand",
        )}
      >
        <span className="inline-flex items-center gap-fluid-1">
          {group.label}
          <Chevron isOpen={isOpen} />
        </span>
      </button>

      <div
        id={listId}
        inert={!isOpen}
        className={cx(
          "grid transition-menu",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        {/*
          The collapsing grid item must carry no padding — padding cannot shrink
          below itself, so it would leave a gap under the trigger when closed.
          The spacing lives on the inner list instead.
        */}
        <div className="min-h-0 overflow-hidden">
          <ul role="list" className="flex flex-col items-center gap-fluid-3 pt-fluid-3">
            {group.items.map((item) => (
              <li key={item.href}>
                <NavigationItem
                  link={item}
                  isCurrent={isCurrentPath(pathname, item.href)}
                  tone={tone}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
