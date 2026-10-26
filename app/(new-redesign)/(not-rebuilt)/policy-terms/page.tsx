import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { policyTermsContent } from "@/content/legal/policy-terms.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

/**
 * The Policy Terms page.
 *
 * The page is a mount point and nothing else: the document lives in its content
 * module and the rendering lives in `LegalDocument`. That split is what lets the
 * wording be reviewed without opening a `.tsx` file.
 *
 * Statically rendered, like every other page in this group. These documents change
 * rarely and never per visitor.
 */

export const metadata: Metadata = buildLegalMetadata(policyTermsContent);

export default function Page() {
  return (
    <>
      {/*
        The same graph every other page emits — organisation, site, this page and
        its breadcrumb. See `lib/legal-metadata.ts` for why these pages carry it.
      */}
      <JsonLd
        graph={buildPageGraph(policyTermsContent.meta, { crumb: "Policy Terms" })}
      />

      <LegalDocument content={policyTermsContent} />
    </>
  );
}
