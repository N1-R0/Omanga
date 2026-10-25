import type { Metadata } from "next";

import { HealthHero } from "@/new-redesign/components/sections/health-cover/HealthHero";
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
      <HealthScope />
    </>
  );
}
