import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { InsuranceDeepDiveContent } from "@/content/insurance-deep-dive.content";
import type { Tone } from "@/types/ui.types";

import { InsuranceDeepDivePanel } from "./InsuranceDeepDivePanel";

/**
 * A closer look at Holiday Insurance.
 *
 * `ProductDeepDive` with the tab bar removed. The heading block, the rhythm,
 * the entrance stagger and the panel body are all the homepage section's and are
 * documented there; only the tabs are gone.
 *
 * [DECISION] No `tablist`, not a one-tab `tablist`. A tab list with a single tab
 * is a control that cannot change anything, and it still announces itself as a
 * tab list with one tab — a keyboard user arrows through it and nothing happens.
 * With the tabs gone the panel is also no longer a `tabpanel`, so it drops the
 * role and the tab stop that went with it.
 *
 * Dark, like the homepage's. On this page it follows the photographic band, so
 * the page still alternates: light hero, photograph, dark band.
 */

const SECTION_TONE: Tone = "dark";

export type InsuranceDeepDiveProps = {
  content: InsuranceDeepDiveContent;
  headingId: string;
};

export function InsuranceDeepDive({
  content,
  headingId,
}: InsuranceDeepDiveProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        <Reveal index={0}>
          <div className="text-center">
            <Stack gap="lg" align="center">
              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>

              <Text role="body" measure="narrow" isSecondary>
                {content.intro}
              </Text>
            </Stack>
          </div>
        </Reveal>

        <Reveal index={1}>
          <InsuranceDeepDivePanel product={content.product} />
        </Reveal>
      </Stack>
    </Section>
  );
}
