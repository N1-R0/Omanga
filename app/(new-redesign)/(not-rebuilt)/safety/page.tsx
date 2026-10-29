import type { Metadata } from "next";

import { V2Section } from "@/components/home-v2/V2Section";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SAFETY_HEADING_ID,
  safetyContent,
  safetyFaq,
  safetyMeta,
} from "@/content/safety.content";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq } from "@/new-redesign/content/old-pages.content";
import { HomeFinalCta } from "@/new-redesign/components/sections/home/HomeFinalCta";

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
        className="bg-brand-900 text-text-inverse"
      >
        <Container>
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="font-sans type-p2 font-semibold tracking-wide text-text-inverse/80 uppercase">
              {c.eyebrow}
            </p>
            <h1
              id={SAFETY_HEADING_ID}
              className=" type-h1 font-semibold text-balance"
            >
              {c.heading}
            </h1>
            <p className="max-w-[52ch] font-sans type-p1 text-text-inverse/85">
              {c.intro}
            </p>
          </div>
        </Container>
      </section>

      <V2Section labelledBy="safety-pillars">
        <div className="flex flex-col gap-10">
          <h2 id="safety-pillars" className="font-sans type-h2 text-balance">
            {c.pillarsHeading}
          </h2>
          <ul className="grid gap-8 lg:grid-cols-3">
            {c.pillars.map((pillar) => (
              <li
                key={pillar.heading}
                className="flex flex-col gap-3 rounded-[1.5rem] bg-surface p-8"
              >
                <h3 className="font-sans type-h3">{pillar.heading}</h3>
                <p className="font-sans type-p1 opacity-80">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </V2Section>

      <V2Section
        labelledBy="safety-facts"
        className="bg-surface text-text"
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 id="safety-facts" className="font-sans type-h3">
              {c.factsHeading}
            </h2>
            <ul className="flex list-disc flex-col gap-3 pl-5 font-sans type-p1">
              {c.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-sans type-h3">{c.tipsHeading}</h2>
            <ul className="flex list-disc flex-col gap-3 pl-5 font-sans type-p1">
              {c.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-1 rounded-[1.25rem] bg-bg p-6">
              <h3 className="font-sans type-h3">{c.contactHeading}</h3>
              <p className="font-sans type-p1 opacity-80">
                {c.contactBody}
              </p>
            </div>
          </div>
        </div>
      </V2Section>

      <FaqSection {...oldPageFaq(c.faqHeading, OLD_PAGE_FAQ_SUB.safety, safetyFaq)} />

      <HomeFinalCta />
    </>
  );
}
