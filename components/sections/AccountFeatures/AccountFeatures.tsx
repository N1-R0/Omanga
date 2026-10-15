import type { ReactNode } from "react";

import { ArrowDownToLine } from "@/components/icons/ArrowDownToLine";
import { ArrowLeftRight } from "@/components/icons/ArrowLeftRight";
import { CalendarPlus } from "@/components/icons/CalendarPlus";
import { CalendarRange } from "@/components/icons/CalendarRange";
import { Globe } from "@/components/icons/Globe";
import { Hospital } from "@/components/icons/Hospital";
import { LayoutGrid } from "@/components/icons/LayoutGrid";
import { ShieldCheck } from "@/components/icons/ShieldCheck";
import { Smartphone } from "@/components/icons/Smartphone";
import { Stethoscope } from "@/components/icons/Stethoscope";
import { Wallet } from "@/components/icons/Wallet";
import { Container } from "@/components/layout/Container";
import type {
  AccountFeatureIcon,
  AccountFeaturesContent,
} from "@/content/account-features.content";

/**
 * [ADDED, 2026-10-15] The features card grid. On the home page it replaces
 * Services and the Product Deep Dive (owner decision, see
 * `account-features.content.ts`); on Payments and Insurance it replaces the
 * untabbed deep dive, with the same approved feature copy.
 *
 * Layout: Ramp's "Build anything on Ramp" (Mobbin section b54966b6, pick E1).
 * A centred eyebrow, heading and intro on the light grey surface, then white
 * cards, each with a small tinted icon tile, a heading and one line. On the
 * home page the cards are split into two labelled rows ("Wallet" / "Health
 * cover"); a product page has one unlabelled group.
 *
 * Outline: h2 for the section; h3 for group labels and h4 per card when
 * groups are labelled, otherwise h3 per card.
 */

const ICONS: Readonly<Record<AccountFeatureIcon, ReactNode>> = {
  "top-up": <ArrowDownToLine size="md" />,
  convert: <ArrowLeftRight size="md" />,
  spend: <Globe size="md" />,
  plans: <ShieldCheck size="md" />,
  care: <Stethoscope size="md" />,
  extend: <CalendarPlus size="md" />,
  wallet: <Wallet size="md" />,
  pay: <Smartphone size="md" />,
  "one-view": <LayoutGrid size="md" />,
  provider: <Hospital size="md" />,
  trip: <CalendarRange size="md" />,
};

export type AccountFeaturesProps = {
  content: AccountFeaturesContent;
  headingId: string;
};

export function AccountFeatures({ content, headingId }: AccountFeaturesProps) {
  const labelled = content.groups.some((group) => group.label);
  const CardHeading = labelled ? "h4" : "h3";

  return (
    <section
      aria-labelledby={headingId}
      className="section-rhythm bg-surface-light text-ink focus-ring-on-light"
    >
      <Container>
        <div className="flex flex-col items-center gap-fluid-3 text-center">
          {content.eyebrow ? (
            <span className="rounded-pill border border-border-hairline bg-surface-page px-3.5 py-2 font-sans text-small font-semibold">
              {content.eyebrow}
            </span>
          ) : null}
          <h2
            id={headingId}
            className="max-w-[20ch] font-sans text-h2 text-balance"
          >
            {content.heading}
          </h2>
          {content.intro ? (
            <p className="max-w-[48ch] font-sans text-main text-balance text-ink-muted">
              {content.intro}
            </p>
          ) : null}
        </div>

        <div className="mt-[var(--space-8)] flex flex-col gap-10">
          {content.groups.map((group, index) => (
            <div key={group.label ?? index} className="flex flex-col gap-4">
              {group.label ? (
                <h3 className="font-sans text-small font-semibold tracking-normal text-ink-muted">
                  {group.label}
                </h3>
              ) : null}
              <ul className="grid gap-4 tablet:grid-cols-3">
                {group.features.map((feature) => (
                  <li
                    key={feature.heading}
                    className="flex flex-col gap-3 rounded-[0.875rem] bg-surface-page p-6 desktop:p-7"
                  >
                    {/*
                      [CHANGED, 2026-10-15] Teal, not brand: these icons label
                      a feature, they are not actions, and brand is kept for
                      actions only. Strong teal on its 10% tint is an icon
                      pair (3:1 floor).
                    */}
                    <span className="mb-3 flex size-10 items-center justify-center rounded-[0.625rem] bg-support/10 text-support-strong">
                      {ICONS[feature.icon]}
                    </span>
                    <CardHeading className="font-sans text-large font-medium leading-snug">
                      {feature.heading}
                    </CardHeading>
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
