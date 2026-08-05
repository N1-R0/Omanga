import Link from "next/link";

import type { FooterLinkColumn } from "@/types/content.types";

/**
 * One titled column of footer links.
 *
 * design-system.md rule 13 lists what the Figma footer must *not* ship:
 * "absolute-positioned link columns, mixed 11/12/13/14 link sizes ... Rebuild it
 * on the grid with one link style." This component is that one link style. Four
 * instances of it is what makes a fifth column impossible to get wrong.
 *
 * The column takes the whole `FooterLinkColumn` object rather than a heading and
 * a list of links as separate props. They are one value — a column with a
 * heading but no links, or links with no heading, is not a state that should be
 * representable.
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A plain `h2`, not the `Heading` primitive.
 *
 * `Heading`'s five roles — display, section, step, feature, column — are all
 * content roles from the editorial type scale. The footer heading is Inter chrome
 * at 14/24, which is a different axis of the system, and adding a sixth role for
 * it would put UI chrome inside a component whose whole purpose is the editorial
 * type scale. The level is still `h2`: the footer follows the page's sections,
 * which are also `h2`, so the outline neither skips nor competes with the single
 * `h1`.
 */

export type FooterColumnProps = {
  column: FooterLinkColumn;
};

export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-ui text-footer-heading text-on-dark">
        {column.heading}
      </h2>

      {/*
        The explicit `role="list"` is not redundant. The global reset removes the
        marker, and Safari drops list semantics when it does — so without this the
        column announces as four loose links instead of a list of four.
      */}
      <ul role="list" className="flex flex-col gap-1 desktop:gap-3">
        {column.links.map((link) => (
          <li key={link.href}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The single footer link style.
 *
 * Not exported. It exists only inside this column and has no second caller, so
 * hoisting it would be generalising for a use case that does not exist.
 *
 * Secondary weight is opacity, never a second grey — design-system.md is
 * explicit, and it is also what keeps one rule working on both the dark footer
 * and anywhere else. 80% white on `#161717` measures about 14:1, so it clears AA
 * comfortably; hover restores full white rather than introducing a colour.
 *
 * ---------------------------------------------------------------------------
 * [CONFLICT] Target size, unresolved.
 *
 * project-context.md sets a blanket "touch targets ≥ 44×44 CSS px with adequate
 * spacing". design-system.md gives the footer link 14/24 type, and § Spacing
 * philosophy gives the column a 12 gap — a 24px line box on a 36px pitch. The
 * two cannot both be satisfied: `hit-area` here would force 44px rows and
 * destroy the specified footer rhythm.
 *
 * Shipped to the design's metrics, because WCAG 2.1 AA does not actually require
 * 44px — SC 2.5.5 Target Size is level AAA, and the 24px minimum of 2.5.8 is
 * cleared with room to spare by the 36px pitch, which is also the "adequate
 * spacing" the project rule allows for. The stricter 44px bar is honoured
 * everywhere it applies to a real control: buttons, nav links and the menu
 * toggle all carry `hit-area`. **Raised for a decision rather than resolved
 * silently** — if 44px is meant to be absolute, the footer's type and gap need
 * respecifying, which is a design change, not a code change.
 */
function FooterLink({ link }: { link: FooterLinkColumn["links"][number] }) {
  const className =
    "inline-flex min-h-11 items-center font-ui text-footer text-on-dark text-secondary hover:opacity-100 focus-ring transition-standard desktop:min-h-0";

  /**
   * An approved label whose route does not exist yet. Rendered as an attribute
   * so the outstanding stubs can be audited in a crawl, not just found by
   * grepping the content module.
   */
  const pendingAttribute =
    link.isRoutePending === true ? { "data-route-pending": "true" } : {};

  if (link.isExternal === true) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...pendingAttribute}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} {...pendingAttribute}>
      {link.label}
    </Link>
  );
}
