import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { complaintsProcedureContent } from "@/content/legal/complaints-procedure.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

export const metadata: Metadata = buildLegalMetadata(complaintsProcedureContent);

export default function Page() {
  return (
    <>
      <JsonLd
        graph={buildPageGraph(complaintsProcedureContent.meta, { crumb: "Complaints Procedure" })}
      />

      <LegalDocument content={complaintsProcedureContent} />
    </>
  );
}
