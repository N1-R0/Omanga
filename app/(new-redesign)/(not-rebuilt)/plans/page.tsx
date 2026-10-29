import type { Metadata } from "next";

import { plansFaqContent } from "@/content/page-faqs.content";

import { InsuranceCoverage } from "@/components/sections/InsuranceCoverage";
import { InsuranceInclusions } from "@/components/sections/InsuranceInclusions";
import { InsurancePlans } from "@/components/sections/InsurancePlans";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  INSURANCE_COVERAGE_HEADING_ID,
  insuranceCoverageContent,
} from "@/content/insurance-coverage.content";
import {
  INSURANCE_INCLUSIONS_HEADING_ID,
  insuranceInclusionsContent,
} from "@/content/insurance-inclusions.content";
import {
  INSURANCE_PLANS_HEADING_ID,
  insurancePlansContent,
} from "@/content/insurance-plans.content";
import { buildPageGraph, buildPlanProducts } from "@/lib/schema";
import type { PageMetaContent } from "@/types/content.types";
import { buildPageMetadata } from "@/lib/seo";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { OLD_PAGE_FAQ_SUB, oldPageFaq, plansClosing } from "@/new-redesign/content/old-pages.content";
import { CtaPanel } from "@/new-redesign/components/ui/CtaPanel";
import { WALLET_URL } from "@/config/site";

const plansMeta: PageMetaContent = {
  title: "Health Insurance Plans in Nigeria from $50 a Month | Omanga",
  description:
    "Compare health insurance plans in Nigeria for your trip: Silver, Gold and Diamond from Phillips HMO at $50, $85 or $120 a month. Choose your plan.",
  path: "/plans",
};

export const metadata: Metadata = buildPageMetadata(plansMeta);

export default function PlansPage() {
  return (
    <>
      <JsonLd
        graph={buildPageGraph(plansMeta, {
          crumb: "Health Insurance Plans",
          services: ["insurance"],
          nodes: buildPlanProducts(
            insurancePlansContent.plans.map((plan) => ({
              name: plan.name,
              description: plan.description,
              price: plan.price,
              currency: insurancePlansContent.currency,
              url: plan.action.href,
              billingPeriod: insurancePlansContent.billingPeriod,
            })),
          ),
        })}
      />

      <InsurancePlans
        content={insurancePlansContent}
        headingId={INSURANCE_PLANS_HEADING_ID}
      />

      <InsuranceCoverage
        content={insuranceCoverageContent}
        plans={insurancePlansContent.plans}
        headingId={INSURANCE_COVERAGE_HEADING_ID}
      />

      <InsuranceInclusions
        content={insuranceInclusionsContent}
        headingId={INSURANCE_INCLUSIONS_HEADING_ID}
      />

      <FaqSection {...oldPageFaq(plansFaqContent.heading, OLD_PAGE_FAQ_SUB.plans, plansFaqContent.items)} />

      <CtaPanel
        id="final-cta"
        eyebrow={plansClosing.eyebrow}
        title={plansClosing.title}
        text={plansClosing.text}
        primary={{ label: plansClosing.primary.label, href: WALLET_URL, external: true }}
        texture={plansClosing.texture.src}
        screen={plansClosing.screen}
      />
    </>
  );
}
