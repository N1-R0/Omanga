import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacyPolicyContent } from "@/content/legal/privacy-policy.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

/**
 * The Privacy Policy page.
 *
 * The page is a mount point and nothing else: the document lives in its content
 * module and the rendering lives in `LegalDocument`. That split is what lets the
 * wording be reviewed without opening a `.tsx` file.
 *
 * Statically rendered, like every other page in this group. These documents change
 * rarely and never per visitor.
 */

export const metadata: Metadata = buildLegalMetadata(privacyPolicyContent);

export default function Page() {
  return (
    <>
      {/*
        The same graph every other page emits — organisation, site, this page and
        its breadcrumb. See `lib/legal-metadata.ts` for why these pages carry it.
      */}
      <JsonLd
        graph={buildPageGraph(privacyPolicyContent.meta, { crumb: "Privacy Policy" })}
      />

      <LegalDocument content={privacyPolicyContent} />
    </>
  );
}
