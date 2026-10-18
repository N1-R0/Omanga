import type { Metadata } from "next";

import { V2Section } from "@/components/home-v2/V2Section";
import { Container } from "@/components/layout/Container";
import { CTA } from "@/components/sections/CTA";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";
import {
  SAFETY_HEADING_ID,
  safetyContent,
  safetyFaq,
  safetyMeta,
} from "@/content/safety.content";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

/**
 * [ADDED, 2026-10-18] /safety, "Is Omanga safe?". Copy and its limits are in
 * `content/safety.content.ts`. Static: no data, no animation.
 *
 * Layout follows Wise's safety page: the question as the h1, three plain
 * pillars, then a short "what it is and isn't" list, account tips and the
 * usual FAQ and closing panel.
 */
export const metadata: Metadata = buildPageMetadata(safetyMeta);

export default function SafetyPage() {
  const c = safetyContent;

  return (
    <>
      <JsonLd
        graph={buildPageGraph(safetyMeta, {
          crumb: c.heading,
          nodes: [buildFaqPage(safetyMeta, safetyFaq)],
        })}
      />

      <section
        aria-labelledby={SAFETY_HEADING_ID}
        className="bg-brand-deep text-on-dark"
      >
        <Container>
          <div className="flex flex-col items-center gap-fluid-3 py-fluid-8 text-center">
            <p className="font-sans text-small font-semibold tracking-wide text-on-dark/80 uppercase">
              {c.eyebrow}
            </p>
            <h1
              id={SAFETY_HEADING_ID}
              className="font-heading text-h1 font-semibold text-balance"
            >
              {c.heading}
            </h1>
            <p className="max-w-[52ch] font-sans text-large text-on-dark/85">
              {c.intro}
            </p>
          </div>
        </Container>
      </section>

      <V2Section labelledBy="safety-pillars">
        <div className="flex flex-col gap-fluid-6">
          <h2 id="safety-pillars" className="font-sans text-h2 text-balance">
            {c.pillarsHeading}
          </h2>
          <ul className="grid gap-fluid-5 desktop:grid-cols-3">
            {c.pillars.map((pillar) => (
              <li
                key={pillar.heading}
                className="flex flex-col gap-fluid-2 rounded-[1.5rem] bg-surface-light p-fluid-5"
              >
                <h3 className="font-sans text-h4">{pillar.heading}</h3>
                <p className="font-sans text-main text-secondary">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </V2Section>

      <V2Section
        labelledBy="safety-facts"
        className="bg-surface-light text-ink"
      >
        <div className="grid gap-fluid-7 desktop:grid-cols-2">
          <div className="flex flex-col gap-fluid-4">
            <h2 id="safety-facts" className="font-sans text-h3">
              {c.factsHeading}
            </h2>
            <ul className="flex list-disc flex-col gap-fluid-2 pl-5 font-sans text-main">
              {c.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-fluid-4">
            <h2 className="font-sans text-h3">{c.tipsHeading}</h2>
            <ul className="flex list-disc flex-col gap-fluid-2 pl-5 font-sans text-main">
              {c.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <div className="mt-fluid-2 flex flex-col gap-1 rounded-[1.25rem] bg-surface-page p-fluid-4">
              <h3 className="font-sans text-h5">{c.contactHeading}</h3>
              <p className="font-sans text-main text-secondary">
                {c.contactBody}
              </p>
            </div>
          </div>
        </div>
      </V2Section>

      <Faq
        content={{ heading: c.faqHeading, items: [...safetyFaq] }}
        headingId="safety-faq"
      />

      <CTA content={homeV2Content.closing} headingId={HOME_V2_IDS.closing} />
    </>
  );
}
