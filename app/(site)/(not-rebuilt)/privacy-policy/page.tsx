import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacyPolicyContent } from "@/content/legal/privacy-policy.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

export const metadata: Metadata = buildLegalMetadata(privacyPolicyContent);

export default function Page() {
  return (
    <>
      <JsonLd
        graph={buildPageGraph(privacyPolicyContent.meta, { crumb: "Privacy Policy" })}
      />

      <LegalDocument content={privacyPolicyContent} />
    </>
  );
}
