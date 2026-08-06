import { PRIMARY_CTA } from "@/content/site.content";
import type { CallToAction, ImageAsset } from "@/types/content.types";

/**
 * The decorative line art.
 *
 * `alt` is deliberately empty. The artwork is abstract geometry sitting behind
 * the heading; it carries no information the heading and buttons do not already
 * give, so an empty alt is the correct statement rather than an omission
 * (`component-rules.md` § Image component rules).
 *
 * [DISCREPANCY] The asset carries its own greys — `#C2C2C2` and `#C8C8C8` at 0.8
 * and 1.8 stroke widths — neither of which is a token. It ships as supplied, the
 * same call `trust.content.ts` makes for the partner logos: recolouring a design
 * asset is a design decision, not an implementation one. Because the file is
 * referenced rather than inlined, no colour appears in any component.
 *
 * Several of its paths extend past the 708 × 346 viewBox on purpose, so the
 * shapes read as cropped by the band. That crop is baked into the asset and needs
 * no clipping here.
 *
 * [RENAMED] Supplied as `CTA vextor.svg`. `coding-guidelines.md` § File naming
 * requires "lowercase, hyphenated asset filenames. No spaces", and § Image
 * optimization requires assets be "renamed on import".
 */
const GRAPHIC: ImageAsset = {
  src: "/cta-graphic.svg",
  alt: "",
  width: 708,
  height: 346,
} as const;

export type CtaContent = {
  readonly heading: string;
  readonly intro: string;
  readonly action: CallToAction;
  readonly graphic: ImageAsset;
};

export const ctaContent: CtaContent = {
  heading: "Ready to experience Africa?",
  intro:
    "Open your Omanga account and travel with your payments and your health cover already handled. The spirit of Ubuntu lives in us all — through our collective unity, we achieve great things.",
  action: PRIMARY_CTA,
  graphic: GRAPHIC,
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const CTA_HEADING_ID = "cta-heading";
