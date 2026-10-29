import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import type { LegalDocumentContent } from "@/types/legal.types";

export function buildLegalMetadata(content: LegalDocumentContent): Metadata {
  return buildPageMetadata(content.meta, { ogType: "article" });
}
