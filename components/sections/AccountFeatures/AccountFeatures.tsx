import type { ReactNode } from "react";

import { ArrowDownToLine } from "@/components/icons/ArrowDownToLine";
import { ArrowLeftRight } from "@/components/icons/ArrowLeftRight";
import { CalendarPlus } from "@/components/icons/CalendarPlus";
import { Globe } from "@/components/icons/Globe";
import { ShieldCheck } from "@/components/icons/ShieldCheck";
import { Stethoscope } from "@/components/icons/Stethoscope";
import { Container } from "@/components/layout/Container";
import type {
  AccountFeatureIcon,
  AccountFeaturesContent,
} from "@/content/account-features.content";

/**
 * [ADDED, 2026-10-15] The home page's one features section, replacing
 * Services and the Product Deep Dive (owner decision, see
 * `account-features.content.ts`).
 *
 * Layout: Ramp's "Build anything on Ramp" (Mobbin section b54966b6, pick E1).
 * A centred eyebrow and heading on the light grey surface, then white cards,
 * each with a small tinted icon tile, a heading and one line. The six cards
 * are split into two rows of three under a small "Wallet" / "Health cover"
 * label so the page still separates the two products.
 *
 * Outline: h2 for the section, h3 for each group label, h4 per card.
 */

const ICONS: Readonly<Record<AccountFeatureIcon, ReactNode>> = {
  "top-up": <ArrowDownToLine size="md" />,
  convert: <ArrowLeftRight size="md" />,
  spend: <Globe size="md" />,
  plans: <ShieldCheck size="md" />,
  care: <Stethoscope size="md" />,
  extend: <CalendarPlus size="md" />,
};

export type AccountFeaturesProps = {
  content: AccountFeaturesContent;
  headingId: string;
};

export function AccountFeatures({ content, headingId }: AccountFeaturesProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="section-rhythm bg-surface-light text-ink focus-ring-on-light"
    >
      <Container>
        <div className="flex flex-col items-center gap-fluid-3 text-center">
          <span className="rounded-pill border border-border-hairline bg-surface-page px-3.5 py-2 font-sans text-small font-semibold">
            {content.eyebrow}
          </span>
          <h2
            id={headingId}
            className="max-w-[20ch] font-sans text-h2 text-balance"
          >
            {content.heading}
          </h2>
        </div>

        <div className="mt-[var(--space-8)] flex flex-col gap-10">
          {content.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-4">
              <h3 className="font-sans text-small font-semibold tracking-normal text-ink-muted">
                {group.label}
              </h3>
              <ul className="grid gap-4 tablet:grid-cols-3">
                {group.features.map((feature) => (
                  <li
                    key={feature.heading}
                    className="flex flex-col gap-3 rounded-[0.875rem] bg-surface-page p-6 desktop:p-7"
                  >
                    <span className="mb-3 flex size-10 items-center justify-center rounded-[0.625rem] bg-brand/10 text-brand">
                      {ICONS[feature.icon]}
                    </span>
                    <h4 className="font-sans text-large font-medium leading-snug">
                      {feature.heading}
                    </h4>
                    <p className="font-sans text-main text-ink-muted">
                      {feature.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
