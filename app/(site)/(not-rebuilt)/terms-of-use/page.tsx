import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { termsOfUseContent } from "@/content/legal/terms-of-use.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

export const metadata: Metadata = buildLegalMetadata(termsOfUseContent);

export default function Page() {
  return (
    <>
      <JsonLd
        graph={buildPageGraph(termsOfUseContent.meta, { crumb: "Terms of Use" })}
      />

      <LegalDocument content={termsOfUseContent} />
    </>
  );
}
