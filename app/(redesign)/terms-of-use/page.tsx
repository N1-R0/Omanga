import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { termsOfUseContent } from "@/content/legal/terms-of-use.content";
import { buildLegalMetadata } from "@/lib/legal-metadata";
import { buildPageGraph } from "@/lib/schema";

/**
 * The Terms of Use page.
 *
 * The page is a mount point and nothing else: the document lives in its content
 * module and the rendering lives in `LegalDocument`. That split is what lets the
 * wording be reviewed without opening a `.tsx` file.
 *
 * Statically rendered, like every other page in this group. These documents change
 * rarely and never per visitor.
 */

export const metadata: Metadata = buildLegalMetadata(termsOfUseContent);

export default function Page() {
  return (
    <>
      {/*
        The same graph every other page emits — organisation, site, this page and
        its breadcrumb. See `lib/legal-metadata.ts` for why these pages carry it.
      */}
      <JsonLd
        graph={buildPageGraph(termsOfUseContent.meta, { crumb: "Terms of Use" })}
      />

      <LegalDocument content={termsOfUseContent} />
    </>
  );
}
