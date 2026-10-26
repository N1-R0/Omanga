import type { Metadata } from "next";

import { HealthClosing } from "@/new-redesign/components/sections/health-cover/HealthClosing";
import { HealthHero } from "@/new-redesign/components/sections/health-cover/HealthHero";
import { HealthIncludes } from "@/new-redesign/components/sections/health-cover/HealthIncludes";
import { HealthPlans } from "@/new-redesign/components/sections/health-cover/HealthPlans";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { ProofStrip } from "@/new-redesign/components/ui/ProofStrip";
import { healthFaq, healthProof } from "@/new-redesign/content/health-cover.content";
import { HealthScope } from "@/new-redesign/components/sections/health-cover/HealthScope";

/**
 * Insurance at /new/insurance (sitemap-v2.md § C; was /health-cover, § 6.3). Sections land one at a
 * time; the hero is built (2026-10-23). Copy lives in
 * new-redesign/content/health-cover.content.ts.
 */
export const metadata: Metadata = {
  title: "Insurance",
};

export default function InsurancePage() {
  return (
    <>
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
