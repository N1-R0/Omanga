import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

import { HealthClosing } from "@/components/sections/health-cover/HealthClosing";
import { HealthHero } from "@/components/sections/health-cover/HealthHero";
import { HealthIncludes } from "@/components/sections/health-cover/HealthIncludes";
import { HealthPlans } from "@/components/sections/health-cover/HealthPlans";
import { FaqSection } from "@/components/ui/FaqSection";
import { ProofStrip } from "@/components/ui/ProofStrip";
import { HealthScope } from "@/components/sections/health-cover/HealthScope";
import { healthFaq, healthProof } from "@/content/health-cover.content";
import { faqItems, insuranceMeta } from "@/content/seo.content";

export const metadata: Metadata = buildPageMetadata(insuranceMeta);

export default function InsurancePage() {
  return (
    <>
      <JsonLd graph={buildPageGraph(insuranceMeta, { crumb: "Insurance", services: ["insurance"], nodes: [buildFaqPage(insuranceMeta, faqItems(healthFaq.items))] })} />
      <HealthHero />
      <ProofStrip id="insurance-proof" {...healthProof} />
      <HealthScope />
      <HealthPlans />
      <HealthIncludes />
      <FaqSection {...healthFaq} />
      <HealthClosing />
    </>
  );
}
