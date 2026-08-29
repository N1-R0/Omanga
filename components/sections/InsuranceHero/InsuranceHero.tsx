import { InsuranceHeroActions } from "@/components/sections/InsuranceHero/InsuranceHeroActions";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { InsuranceHeroContent } from "@/content/insurance-hero.content";

/**
 * The Insurance page hero.
 *
 * The Get Started hero's band, with a call-to-action row and a helper line
 * added beneath the copy. Every layout decision below is `GetStartedHero`'s and
 * is documented there in full — the flat white surface, the centred single
 * axis, `min-h-hero-compact` from `tablet:` only, and why this band renders its
 * own `section` instead of using the `Section` primitive.
 *
 * ---------------------------------------------------------------------------
 * [DUPLICATION] This is the second centred hero and it repeats the first.
 *
 * The two differ only by this section's actions and helper line, which is a
 * shared `CenteredHero` waiting to be extracted. Not extracted here: that would
 * mean rewriting a shipped section, and the instruction for this phase is to
 * build the insurance hero. Worth doing before a third page wants one — at
 * which point the duplication is a pattern rather than an instance.
 *
 * ---------------------------------------------------------------------------
 * [DEVIATION] The Get Started hero deliberately carries no button; this one
 * does. `Omanga-Insurance-Page-Content-Spec` § 2 is explicit about the reason:
 * the structural reference "offers the reader nothing to click" and relies on
 * its sticky nav, which suits a sales-led B2B funnel. Omanga's visitor arrives
 * self-serve, so a CTA is inserted beneath the sub-paragraph and the layout
 * above it is held exactly.
 *
 * ---------------------------------------------------------------------------
 * [CHANGED, 2026-08-29] One action, not two.
 *
 * Both specs put a primary and a ghost secondary in this band. Both pages
 * dropped the secondary in the same change, so `content.action` is a single
 * value rather than a tuple. See `InsuranceHeroContent` for the reasoning and
 * `InsuranceHeroActions` for what it cost the markup — nothing.
 */

export type InsuranceHeroProps = {
  content: InsuranceHeroContent;
  /**
   * The id of the `h1`, used to name the section. Owned by the content module
   * so the heading and the `aria-labelledby` cannot drift.
   */
  headingId: string;
};

export function InsuranceHero({ content, headingId }: InsuranceHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="section-rhythm flex items-center bg-surface-page text-ink focus-ring-on-light tablet:min-h-hero-compact"
    >
      <Container>
        <div className="text-center">
          <Stack gap="xl" align="center">
            {/*
              An eyebrow, not a heading — it carries no keyword value and
              stacking it as an H-level breaks the outline. `Badge` renders a
              `span` and is `inline-flex`, so under `items-center` it sizes to
              its own label.
            */}
            <Badge tone="light">{content.eyebrow}</Badge>

            <Heading id={headingId} level="h1" role="hero" measure="hero">
              {content.heading}
            </Heading>

            <Text role="body" measure="narrow">
              {content.intro}
            </Text>

            {/*
              The button and the line beneath it are one group, tighter than the
              parent's `xl` step: the helper text explains the button and belongs
              to it, not to the paragraph above.
            */}
            <Stack gap="md" align="center">
              <InsuranceHeroActions action={content.action} />

              {/*
                `role="small"` rather than a caption. It is a plain qualifier on
                the offer — "Cover for your trip, not a year" — and not legal
                text, so it takes no separate treatment.
              */}
              <Text role="small" measure="narrow">
                {content.helper}
              </Text>
            </Stack>
          </Stack>
        </div>
      </Container>
    </section>
  );
}
