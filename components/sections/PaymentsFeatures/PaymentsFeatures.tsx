import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Text } from "@/components/ui/Text";
import type { PaymentsFeaturesContent } from "@/content/payments-features.content";
import type { RateRow } from "@/lib/rates";
import { PAYMENTS_RATES_ANCHOR } from "@/content/site.content";
import type { Tone } from "@/types/ui.types";

import { FeatureCard } from "./FeatureCard";
import { MetricRow } from "./MetricRow";

/**
 * What Omanga Payment Solutions does — spec § 4.
 *
 * Centred heading block, three brand-filled capability cards, then the figures
 * that back them. The spec treats the cards and the metric row as one continuous
 * block, so they are one section here rather than two bands.
 *
 * A Server Component. Two of the three visuals hydrate as their own leaves; the
 * copy, the headings and the live rates are all in the server HTML.
 *
 * Light, after the dark deep dive, so the page alternates: light hero,
 * photograph, dark deep dive, light features.
 *
 * ---------------------------------------------------------------------------
 * THE `rates` ANCHOR LIVES ON THE SECOND CARD.
 *
 * `PAYMENTS_RATES_ANCHOR` is exported from `site.content.ts` and the homepage's
 * services section links to `/payments#rates`. Since the legacy page was deleted
 * that link has been landing at the top of this page. It lands here now.
 *
 * On the card's grid cell rather than on the `Section`, because the section is
 * about three capabilities and only one of them is the rate story — an anchor on
 * the section would drop the visitor above a heading that does not mention rates.
 * `scroll-mt-header` clears the fixed bar, without which the card's top edge
 * would sit underneath it.
 */

const SECTION_TONE: Tone = "light";

export type PaymentsFeaturesProps = {
  content: PaymentsFeaturesContent;
  headingId: string;
  /**
   * Live FX for the rate card, fetched by the page.
   *
   * Threaded through rather than fetched here so the section stays synchronous
   * and one place owns the request. See `lib/rates.ts` for why the figures are
   * fetched at all rather than typed.
   */
  rates: readonly RateRow[];
};

/** Card heading ids. Module constants — nothing outside this section wants them. */
const CARD_HEADING_IDS: Readonly<Record<string, string>> = {
  wallet: "payments-feature-wallet-heading",
  rates: "payments-feature-rates-heading",
  coverage: "payments-feature-coverage-heading",
};

/** The metric row continues the entrance after the heading (0) and three cards. */
const METRICS_REVEAL_INDEX = 4;

export function PaymentsFeatures({
  content,
  headingId,
  rates,
}: PaymentsFeaturesProps) {
  return (
    <Section labelledBy={headingId} tone={SECTION_TONE}>
      <Stack gap="4xl">
        <Reveal index={0}>
          <div className="text-center">
            <Stack gap="lg" align="center">
              <Badge tone="light">{content.eyebrow}</Badge>

              <Heading id={headingId} level="h2" role="section">
                {content.heading}
              </Heading>

              <Text role="body" measure="narrow" isSecondary>
                {content.intro}
              </Text>
            </Stack>
          </div>
        </Reveal>

        {/*
          Equal height is `Grid`'s default and is load-bearing: it is what keeps
          the three cards the same height, so their art boxes align across the
          row however many lines each heading takes.
        */}
        <Grid columns={3} gap="2xl">
          {content.features.map((feature, index) => (
            <Reveal key={feature.id} index={index + 1}>
              <div
                id={
                  feature.id === "rates" ? PAYMENTS_RATES_ANCHOR : undefined
                }
                className="h-full scroll-mt-header"
              >
                <FeatureCard
                  content={feature}
                  headingLevel="h3"
                  headingId={CARD_HEADING_IDS[feature.id] ?? feature.id}
                  rates={rates}
                />
              </div>
            </Reveal>
          ))}
        </Grid>

        <Reveal index={METRICS_REVEAL_INDEX}>
          <MetricRow label={content.metricsLabel} metrics={content.metrics} />
        </Reveal>
      </Stack>
    </Section>
  );
}
