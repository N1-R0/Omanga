import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { GetStartedSolution } from "@/content/get-started-solutions.content";
import type { HeadingLevel } from "@/types/ui.types";

/**
 * One of the section's two offering panels.
 *
 * One component, not a payments panel and an insurance panel. The two are
 * structurally identical — heading, body, one link — and design.md § Card
 * variants requires that of them: "Product cards are equal-width and
 * equal-height siblings; they differ by surface only, never by internal
 * structure or padding."
 *
 * Named `SolutionPanel` rather than anything card-based on purpose:
 * coding-guidelines.md § Naming forbids "card-based names for wallet features",
 * because a card is the physical product Omanga does not issue.
 *
 * A Server Component. Nothing here hydrates — the action is a link, and every
 * state it has is CSS on the `Button` primitive.
 *
 * ---------------------------------------------------------------------------
 * Surface, radius and padding all come from `Card`'s `product-secondary`
 * variant and are not restated here: `Card` owns "surface, radius, padding, and
 * border" by rule, which is what guarantees the two panels cannot drift apart.
 *
 * [DECISION] Both panels take the same surface, where the homepage's equivalent
 * section pairs a brand card with a light one. The screenshot draws both in the
 * light grey, and the brief requires the two to have "equal visual weight" —
 * which is the section's actual argument: the offerings are peers and the
 * visitor is choosing, not being steered.
 *
 * [DECISION] No media slot. The brief asks for a product logo and none exists —
 * see `get-started-solutions.content.ts` for the full note. The approved product
 * name ships as a real heading instead, which is what the SEO document requires
 * of it regardless.
 */

export type SolutionPanelProps = {
  content: GetStartedSolution;
  /**
   * The document outline level for this panel's heading. Passed in so the
   * section owns the outline and the panel cannot skip a level.
   */
  headingLevel: HeadingLevel;
  /** Stable id for the panel heading. Required by `Heading`. */
  headingId: string;
};

export function SolutionPanel({
  content,
  headingLevel,
  headingId,
}: SolutionPanelProps) {
  return (
    <Card
      variant="product-secondary"
      heading={
        /*
          `role="feature"` (24 → 28) is the system's card-heading step and the
          same role the homepage's product cards take, so the two sections'
          panels read at one size. `measure="none"` because the heading should
          wrap at the panel's edge — the panel's own padding is the measure here,
          and a `ch` cap inside an already-narrow column would break the line
          early for no reason.
        */
        <Heading
          id={headingId}
          level={headingLevel}
          role="feature"
          measure="none"
        >
          {content.heading}
        </Heading>
      }
      body={
        /* No measure: the paragraph fills the panel, which is what its padding is for. */
        <Text role="body">{content.body}</Text>
      }
      action={
        /*
          A link, not a button — it navigates to a route, and "the rendered
          element follows semantics: `button` for actions, `a` for navigation,
          chosen by prop, never by styling".

          `variant="primary"` and `tone="light"`: the screenshot draws both pills
          brand-filled on the light panel, and the brief calls each one a primary
          CTA. That is two primaries in one section, which design.md rule 3
          nominally caps at one — raised in the section component, where the
          hierarchy decision belongs.

          No trailing icon: the screenshot draws none, and an arrow the design
          does not show is a decision rather than a default.
        */
        <Button
          as="link"
          variant="primary"
          tone="light"
          href={content.action.href}
        >
          {content.action.label}
        </Button>
      }
    />
  );
}
