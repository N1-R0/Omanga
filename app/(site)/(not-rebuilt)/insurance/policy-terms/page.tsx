import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { policyTermsContent } from "@/content/legal/policy-terms.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

export const metadata: Metadata = buildLegalMetadata(policyTermsContent);

export default function Page() {
  return (
    <>
      <JsonLd
        graph={buildPageGraph(policyTermsContent.meta, { crumb: "Policy Terms" })}
      />

      <LegalDocument content={policyTermsContent} />
    </>
  );
}
