import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { cookiePolicyContent } from "@/content/legal/cookie-policy.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

export const metadata: Metadata = buildLegalMetadata(cookiePolicyContent);

export default function Page() {
  return (
    <>
      <JsonLd
        graph={buildPageGraph(cookiePolicyContent.meta, { crumb: "Cookie Policy" })}
      />

      <LegalDocument content={cookiePolicyContent} />
    </>
  );
}
