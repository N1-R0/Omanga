import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";
import type { LegalDocumentContent } from "@/types/legal.types";

/**
 * Metadata for a legal page.
 *
 * A thin wrapper over `buildPageMetadata` rather than a second implementation:
 * this file previously carried its own full copy of the metadata rules, which
 * meant the legal pages and the marketing pages could drift apart — and did, on
 * the share image. Everything general now lives in `lib/seo.ts`; the only thing
 * that is genuinely specific to a legal document is its `og:type`.
 *
 * ---------------------------------------------------------------------------
 * ON `robots`
 *
 * Indexable, deliberately, against the instinct to `noindex` legal pages so they
 * do not compete with commercial ones.
 *
 * They will not compete. Nobody searching for travel insurance lands on a cookie
 * policy, and these pages carry no keywords the money pages want. What indexing
 * them buys is real: for a site selling insurance and payments — the definition
 * of a YMYL subject — published, findable legal documents are a trust signal that
 * search quality raters look for directly. Hiding them subtracts that signal to
 * avoid a competition that does not happen.
 *
 * They are given a lower sitemap priority instead, which expresses the same
 * intent — these are not the pages to spend crawl budget on — without withdrawing
 * the trust signal. See `app/sitemap.ts`.
 *
 * ---------------------------------------------------------------------------
 * ON STRUCTURED DATA
 *
 * [REVISED] These pages originally emitted none, on the argument that no
 * schema.org type describes a privacy policy usefully. That argument holds for
 * inventing a *special* type — there is no `PrivacyPolicy` worth reaching for —
 * but it was the wrong conclusion for the standard graph.
 *
 * Every other page emits `Organization`, `WebSite`, `WebPage` and a breadcrumb.
 * Withholding it here made the five legal pages the only URLs on the site that
 * did not reinforce the Omanga entity, and they are precisely the pages a search
 * engine reads when deciding whether a business is real. They now emit the same
 * graph, with a breadcrumb, via `buildPageGraph` on each page.
 *
 * Still not emitted, and still for the original reason: any type that would
 * claim something the document does not contain.
 */
export function buildLegalMetadata(content: LegalDocumentContent): Metadata {
  return buildPageMetadata(content.meta, { ogType: "article" });
}
