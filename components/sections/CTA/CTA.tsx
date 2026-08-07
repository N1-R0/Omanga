import { Section } from "@/components/layout/Section";
import type { CtaContent } from "@/content/cta.content";

import { CTAContent } from "./CTAContent";
import { CTAGraphics } from "./CTAGraphics";

/**
 * The homepage's closing CTA band — the last conversion point before the footer.
 *
 * A Server Component. One heading and two links, so nothing hydrates beyond the
 * two entrance wrappers and every string is in the server HTML.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Not built from the Figma MCP frame.
 *
 * The brief names node 1265:13151 as the source of truth. The Figma Dev Mode MCP
 * server is still unreachable in this environment — every tool returns the same
 * setup instruction — and the Figma connector is unauthorised. Built instead from
 * the supplied vector, the section screenshot and `design.md`.
 * **Re-verify against the frame once the MCP server is available.**
 *
 * ---------------------------------------------------------------------------
 * SURFACE. `tone="brand"`, which `design.md` reserves for exactly this
 * element: "the CTA band is the only brand-filled section". It is also the only
 * place the `secondary-on-brand` button treatment is permitted, and the reason
 * that variant exists at all.
 *
 * The band is full-bleed because `Section` paints the surface on the `section`
 * element and the gutter on the `Container` inside it, so the colour reaches the
 * viewport edge while the copy stays on the content column — which is what the
 * frame draws.
 *
 * [DISCREPANCY] The frame's band is about 80 tall above and below the copy. The
 * `Section` primitive gives the brand tone the dark rhythm, 130 at desktop, on an
 * explicit [DECISION] in that file that is already marked "pending design
 * confirmation". This section does not override it — rhythm belongs to `Section`
 * and changing it there would move every brand band on the site. The measurement
 * is offered as input to that open decision: **the frame wants roughly 80, which
 * is neither of the two values the system currently allows.** The band therefore
 * ships taller and more generous than drawn, which the brief's "generous
 * whitespace" asks for in any case.
 *
 * ---------------------------------------------------------------------------
 * COMPOSITION. Two layers in one positioned box: the artwork out of flow behind,
 * the copy in flow in front. DOM order carries the layering, so no z-index rung is
 * spent and `--z-raised` stays available for the cases that genuinely need it.
 *
 * The artwork comes first in the DOM and the copy second. That is the reverse of
 * the reading order a screen reader needs, which is why the artwork is
 * `aria-hidden` with an empty `alt` — it is removed from the accessibility tree
 * entirely, so the first thing announced in the region is the heading.
 *
 * [NOTE] The section above this one is Why Omanga, which is dark. Light, dark,
 * brand across the last three sections satisfies § Component consistency rules'
 * alternation, and the brand band is the page's single permitted use of it.
 *
 * The band carries no eyebrow, no intro and no third action. `CtaContent` has no
 * field for any of them, so none can be added without a copy decision.
 */

export type CTAProps = {
  content: CtaContent;
  /**
   * The id of the heading that names this section.
   *
   * Passed in rather than defined here so the value has one owner — the content
   * module — and the heading and the `aria-labelledby` cannot drift apart.
   */
  headingId: string;
};

export function CTA({ content, headingId }: CTAProps) {
  /*
    `rhythm="loose"` — the page's one full-bleed emphasis band. Rhythm is no
    longer inferred from the brand surface (see `Section`), so the band that
    needs the most air now asks for it. The benchmark reserves its
    `section-space--large` step for exactly this case.
  */
  return (
    <Section labelledBy={headingId} tone="brand" rhythm="loose">
      <div className="relative isolate">
        <CTAGraphics graphic={content.graphic} />

        <CTAContent
          heading={content.heading}
          headingId={headingId}
          intro={content.intro}
          action={content.action}
        />
      </div>
    </Section>
  );
}
