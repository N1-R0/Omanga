import type { Metadata } from "next";

import { SITE_LOCALE, SITE_NAME, absoluteUrl } from "@/config/site";
import type { PageMetaContent } from "@/types/content.types";

/**
 * One builder for every page's `Metadata`.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS EXISTS — A REAL DEFECT, NOT TIDINESS
 *
 * Each page previously declared its own ~25-line metadata object: canonical,
 * robots, the full `openGraph` block, the full `twitter` block. Six near-identical
 * copies, and the duplication was not harmless.
 *
 * Audited live, 28 August 2026: **only the homepage had a social share image.**
 * `/about`, `/insurance`, `/plans`, `/contact` and `/get-started` served no
 * `og:image` and no `twitter:image` at all — verified by fetching each page and
 * matching every `og:image*` tag in the HTML. Five of the six pages shared as a
 * bare link with no card on WhatsApp, LinkedIn, Facebook and X. For a business
 * whose enquiries arrive over WhatsApp, that is the share surface that matters
 * most.
 *
 * The cause is subtle enough to be worth writing down. `app/(redesign)/
 * opengraph-image.tsx` is file-based metadata sitting in the segment that renders
 * `/`. Every page then declared its own `openGraph` object without an `images`
 * key. The homepage picked the file up because the file is in its segment; the
 * child routes declared an `openGraph` block that carried no image and inherited
 * none. Nothing errored, nothing was obviously missing in the source, and the
 * only way to see it was to read the served HTML.
 *
 * Setting `images` explicitly here removes the ambiguity entirely: the image is
 * named in the metadata object rather than left to file-convention inheritance,
 * so it cannot silently apply to one route and not another. It is now impossible
 * to add a page without a share image, because there is no per-page metadata
 * object left to forget it in.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS DELIBERATELY NOT CENTRALISED
 *
 * Titles and descriptions. They stay in each page's `PageMetaContent`, because
 * they are the two fields that must differ per page and a helper that generated
 * them would be a template — which is how sites end up with "Omanga | Omanga"
 * on forty pages. This builder takes them as input and never invents them.
 */

/**
 * The shared social card.
 *
 * `absoluteUrl` rather than a relative path: `metadataBase` would resolve a
 * relative one, but several crawlers and most chat clients do not, and an OG
 * image that fails to resolve is indistinguishable from an absent one.
 *
 * The route is Next's generated filename for `app/(redesign)/opengraph-image.tsx`.
 * It is stable for a given build and is what the homepage already serves.
 */
const OG_IMAGE = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: "Omanga — travel money wallet and holiday insurance for Africa",
} as const;

export type PageMetadataOptions = {
  /**
   * `article` for the legal documents, `website` for everything else.
   *
   * Not cosmetic: `og:type` is what tells a crawler whether a URL is a page of
   * the site or a standalone document, and legal pages are the latter.
   */
  readonly ogType?: "website" | "article";
  /**
   * Keep the page out of the index while still following its links.
   *
   * Present for the private and utility routes that will exist later — an
   * account area, a thank-you page, a search results page. Public marketing
   * pages must never set it.
   */
  readonly isNoIndex?: boolean;
};

export function buildPageMetadata(
  meta: PageMetaContent,
  { ogType = "website", isNoIndex = false }: PageMetadataOptions = {},
): Metadata {
  const canonical = meta.path;

  /*
    A page may override the card with its own asset, which is why
    `PageMetaContent` carries an optional `ogImage`. That type is the site's
    `ImageAsset` — `src`, `alt`, `width`, `height` — and Open Graph wants `url`,
    so the two shapes are reconciled here rather than at each call site. The
    override is absolutised for the same reason the default is.
  */
  const image =
    meta.ogImage === undefined
      ? OG_IMAGE
      : {
          url: absoluteUrl(meta.ogImage.src),
          width: meta.ogImage.width,
          height: meta.ogImage.height,
          alt: meta.ogImage.alt,
        };

  return {
    title: { absolute: meta.title },
    description: meta.description,

    /*
      A path, not an absolute URL. Next resolves it against `metadataBase`, which
      the root layout sets from `SITE_URL` — so the canonical hostname has exactly
      one owner and cannot drift per page. This is what the www/apex fix in
      `config/site.ts` relies on.
    */
    alternates: { canonical },

    robots: isNoIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            /*
              Uncapped snippet, image preview and video preview. Without these
              Google may truncate a result to a short snippet, which for the legal
              and service pages is the difference between a useful result and an
              ambiguous one. They only ever permit; they never force.
            */
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },

    openGraph: {
      type: ogType,
      url: canonical,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: meta.title,
      description: meta.description,
      images: [image],
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image.url],
    },
  };
}
