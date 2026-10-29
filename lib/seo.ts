import type { Metadata } from "next";

import { SITE_LOCALE, SITE_NAME, absoluteUrl } from "@/config/site";
import type { PageMetaContent } from "@/types/content.types";

const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: "Omanga — travel money wallet and health insurance for Nigeria",
} as const;

export type PageMetadataOptions = {
  readonly ogType?: "website" | "article";
  readonly isNoIndex?: boolean;
};

export function buildPageMetadata(
  meta: PageMetaContent,
  { ogType = "website", isNoIndex = false }: PageMetadataOptions = {},
): Metadata {
  const canonical = meta.path;

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

    alternates: { canonical },

    robots: isNoIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
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
