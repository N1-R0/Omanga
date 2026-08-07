import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Reveal } from "@/components/ui/Reveal";
import type { TrustPartnersContent } from "@/content/trust.content";

import { PartnerLogos } from "./PartnerLogos";

/**
 * The homepage's Trust / Partners strip — the page's proof layer, which
 * `project-context.md` names a launch requirement rather than polish.
 *
 * A Server Component with nothing interactive in it: a label and three images, no
 * links, no state, so nothing hydrates and the label is in the server HTML.
 *
 * Geometry from the frame (node 1265:12699), a 1440 × 379 band on the page
 * surface:
 *
 *   label at y 102, band ends 97 below the row  -> the light section rhythm, 100
 *   label to the tallest logo, 52               -> 40, the "heading block to
 *                                                  content block" step
 *   label 20 line box                           -> `--text-small`, 12/20
 *
 * ---------------------------------------------------------------------------
 * [DECISION] A plain `h2`, not the `Heading` primitive.
 *
 * The same call `FooterColumn` makes, for the same reason: `Heading`'s five roles
 * are all editorial type, and this label is Inter chrome. The nearest editorial
 * role is 18 → 24 and would render the label at twice the size the frame draws.
 *
 * The level stays `h2`, so the section is named by a real heading, the outline
 * runs h1 → h2 without skipping, and the strip has a heading in the server HTML
 * like every other section.
 *
 * [DISCREPANCY] The frame's label measures about 16px with roughly 0.08em
 * tracking — 245px wide for 26 characters in a 20px line box. The system has no
 * 16px chrome role. `--text-small` is the nearest: it is the only role carrying
 * tracking (+1), and its 12/20 line box matches the frame's exactly, but it is
 * a quarter smaller than drawn. **Confirm the label's size with design** — the
 * alternative is a new role, which is a design-system change, not a section one.
 *
 * Secondary weight is opacity, never a second grey, per § Color roles. 80% of
 * `--color-ink` on white measures ~4.9:1, so a 12px label still clears AA.
 *
 * ---------------------------------------------------------------------------
 * [NOTE] This section is light, and so is the Solutions Overview above it.
 * `component-rules.md` asks consecutive sections to alternate surface; the frame
 * paints both white, and the strip's layout pattern is unlike anything around it.
 * Surface alternation is a page-composition decision and belongs to whoever
 * assembles the eleven sections, not to this one.
 *
 * The section is CTA-free and stays that way. The frame draws no action, the
 * partners are not linked, and adding either would be inventing content.
 */

export type TrustPartnersProps = {
  content: TrustPartnersContent;
  /**
   * The id of the label that names this section.
   *
   * Passed in rather than defined here so the value has exactly one owner — the
   * content module — and the heading and the `aria-labelledby` cannot drift apart.
   */
  headingId: string;
};

export function TrustPartners({ content, headingId }: TrustPartnersProps) {
  /*
    `rhythm="tight"` — this is a strip, not a section. The benchmark gives its
    equivalent logo band its `section-space--small` step rather than the full
    one, which is what keeps a single row of logos from occupying as much
    vertical space as a section with a heading, copy and cards in it.
  */
  return (
    <Section labelledBy={headingId} tone="light" rhythm="tight">
      {/*
        MOTION. One reveal for the whole strip rather than one per logo. The
        marquee already moves the logos on narrow viewports, and staggering ten
        entrances underneath a continuous drift reads as noise — which is exactly
        the "never distracting" line the brief draws.
      */}
      <Reveal>
        <Stack gap="2xl">
          <h2 id={headingId} className="text-center font-sans text-small text-secondary">
            {content.label}
          </h2>

          <PartnerLogos partners={content.partners} />
        </Stack>
      </Reveal>
    </Section>
  );
}
