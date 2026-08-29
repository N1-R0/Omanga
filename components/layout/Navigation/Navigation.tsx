"use client";

import { usePathname } from "next/navigation";

import { NavigationDropdown } from "@/components/layout/NavigationDropdown";
import { NavigationGroup } from "@/components/layout/NavigationGroup";
import { NavigationItem } from "@/components/layout/NavigationItem";
import { isCurrentPath } from "@/lib/is-current-path";
import { isLinkGroup } from "@/types/content.types";
import type { NavigationEntry } from "@/types/content.types";
import type { Tone } from "@/types/ui.types";

/**
 * The navigation landmark and the current-page decision.
 *
 * This is the only Client Component in the header chrome, and it is a client
 * component for exactly one reason: the App Router exposes no pathname to a
 * Server Component, so "which item is current" cannot be answered on the
 * server. Nothing else here needs the browser.
 *
 * That is why the split is drawn here rather than lower down. `NavigationItem`
 * could have read `usePathname` itself, which would have looked like a smaller
 * client leaf — but it would have made every item subscribe to the router
 * separately and turned a pure, testable presentational component into a
 * hook-dependent one. One component owns the pathname; the items stay pure.
 *
 * The links themselves are server-rendered inside this component's HTML, so the
 * nav is crawlable and fully operable before hydration. Only the active
 * highlight depends on JavaScript, and it is not the only signal — `aria-current`
 * is server-rendered too.
 */

export type NavigationProps = {
  items: readonly NavigationEntry[];
  /**
   * Accessible name for the landmark.
   *
   * Two `nav` elements exist in the document — the desktop bar and the mobile
   * panel — but they are mutually exclusive by `display`, so exactly one
   * landmark is ever exposed at any viewport width. That is a considered
   * deviation from "one `nav`" in coding-guidelines.md: a mobile user with a
   * screen reader gets a navigation landmark instead of a bare list, and no
   * user is ever offered two.
   */
  landmarkLabel: string;
  orientation: "row" | "column";
  /** The surface the items sit on. Forwarded, not decided here. */
  tone: Tone;
};

export function Navigation({
  items,
  landmarkLabel,
  orientation,
  tone,
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={landmarkLabel}>
      <NavigationGroup orientation={orientation}>
        {items.map((entry) => {
          if (!isLinkGroup(entry)) {
            return (
              <li key={entry.href}>
                <NavigationItem
                  link={entry}
                  isCurrent={isCurrentPath(pathname, entry.href)}
                  tone={tone}
                />
              </li>
            );
          }

          /*
            The row gets a dropdown. The column does not.

            A disclosure nested inside the mobile panel — itself a disclosure —
            means two taps to reach Contact, and it puts a collapsed region
            inside an animating one, where the panel's `clip-path` wipe would
            clip a submenu that opened after it. The panel is six rows tall with
            room to spare, so the group is simply flattened: its label becomes a
            heading over its children and every destination is one tap away.

            The heading is a real `h2`, not a styled span. It names the list
            beneath it, which is the only thing that tells a screen-reader user
            why two of these links are grouped.
          */
          if (orientation === "column") {
            return (
              <li key={entry.label} className="flex flex-col items-center gap-fluid-2">
                <h2 className="font-sans text-small text-ink-muted uppercase">
                  {entry.label}
                </h2>

                <ul role="list" className="flex flex-col items-center gap-fluid-3">
                  {entry.items.map((item) => (
                    <li key={item.href}>
                      <NavigationItem
                        link={item}
                        isCurrent={isCurrentPath(pathname, item.href)}
                        tone={tone}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={entry.label}>
              <NavigationDropdown group={entry} pathname={pathname} tone={tone} />
            </li>
          );
        })}
      </NavigationGroup>
    </nav>
  );
}
