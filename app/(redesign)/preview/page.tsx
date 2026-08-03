import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { Hero } from "@/components/sections/Hero";
import { SolutionsOverview } from "@/components/sections/SolutionsOverview";
import { HERO_HEADING_ID, heroContent } from "@/content/hero.content";
import {
  SOLUTIONS_HEADING_ID,
  solutionsContent,
} from "@/content/solutions.content";

/**
 * Foundation smoke check — a development surface, not a page of the site.
 *
 * It exists for two reasons:
 *
 *   1. It gives the `(redesign)` root layout a route, so the layout is
 *      actually exercised by the build instead of sitting inert.
 *   2. It renders the token layer, both font families and every primitive
 *      that has one, so a design review can check colour, type scale, spacing
 *      and focus behaviour in a browser before any real section is built.
 *
 * Phase 3 renders the real Hero section at the top of this route so it can be
 * reviewed in a browser without creating `app/(redesign)/page.tsx` — mounting the
 * homepage is a routing decision belonging to the cutover phase, not to a section
 * build. Everything below the Hero remains the primitive smoke check.
 *
 * At cutover the homepage moves to `app/(redesign)/page.tsx`, that page replaces
 * `app/(legacy)/page.tsx`, and this route is deleted.
 *
 * Deliberately carries no marketing copy. Every string below names the thing
 * it is demonstrating — nothing here is drafted, and nothing is a placeholder
 * for approved copy.
 */

export const metadata: Metadata = {
  title: "Foundation preview",
  // Thin, internal, and temporary. It must never be indexed or followed.
  robots: { index: false, follow: false },
};

export default function FoundationPreviewPage() {
  return (
    <>
      {/*
        The real Hero. It owns the page's single `h1`, which is why the smoke
        check below now opens at `h2` — two `h1`s would break the outline and the
        "exactly one H1" rule the SEO plan sets out.
      */}
      <Hero content={heroContent} headingId={HERO_HEADING_ID} />

      {/*
        Phase 3.2. The real Solutions Overview section, rendered directly beneath
        the Hero in the homepage's specified order. Its heading is an `h2` and its
        card headings are `h3`s, so the outline below it continues to open at
        `h2` without skipping a level.
      */}
      <SolutionsOverview
        content={solutionsContent}
        headingId={SOLUTIONS_HEADING_ID}
      />

      <Section labelledBy="preview-light" tone="light">
        <Stack gap="2xl">
          <Stack gap="sm" align="start">
            <Badge tone="light">Light surface</Badge>
            <Heading id="preview-light" level="h2" role="display">
              Display role, Poppins SemiBold
            </Heading>
          </Stack>

          <Stack gap="lg" align="start">
            <Heading id="preview-light-section" level="h2" role="section">
              Section role, the only section heading size
            </Heading>
            <Text role="body" measure="body">
              Body role at the 756px measure. This paragraph exists to check the
              fluid type scale, the line height, and the reading measure at every
              breakpoint between 360 and 1440.
            </Text>
            <Text role="body" measure="body" isSecondary>
              The same body role marked secondary — 80% opacity, not a second
              grey.
            </Text>
          </Stack>

          <Stack gap="sm" direction="column-to-row" align="start">
            <Button as="button" variant="primary" tone="light">
              Primary
            </Button>
            <Button as="button" variant="secondary" tone="light">
              Secondary
            </Button>
            <Button
              as="button"
              variant="text"
              tone="light"
              trailingIcon={<ArrowRight size="sm" />}
            >
              Text with arrow
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Section labelledBy="preview-dark" tone="dark">
        <Stack gap="2xl">
          <Stack gap="sm" align="start">
            <Badge tone="dark">Dark surface</Badge>
            <Heading id="preview-dark" level="h2" role="section">
              Same tokens inverted onto the dark surface
            </Heading>
          </Stack>

          <Stack gap="sm" direction="column-to-row" align="start">
            <Button as="button" variant="primary" tone="dark">
              Primary
            </Button>
            <Button as="button" variant="secondary" tone="dark">
              Secondary
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Section labelledBy="preview-brand" tone="brand">
        <Stack gap="lg" align="start">
          <Heading id="preview-brand" level="h2" role="section">
            Brand band, the only brand-filled surface
          </Heading>
          <Stack gap="sm" direction="column-to-row" align="start">
            <Button as="button" variant="primary" tone="brand">
              Primary on brand
            </Button>
            <Button as="button" variant="secondary" tone="brand">
              Secondary on brand
            </Button>
          </Stack>
        </Stack>
      </Section>
    </>
  );
}
