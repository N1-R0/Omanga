import type { ImageAsset } from "@/types/content.types";

/**
 * Trust / Partners content.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] The label is not approved copy, and Figma's string is rejected.
 *
 * The Figma frame (node 1265:12699) reads "Our clients are backed by:" above
 * logos for Y Combinator, Coinbase and Blockchange. All four values belong to the
 * structural benchmark this redesign follows, not to Omanga: they are that
 * company's investors, and "backed by" is a funding claim about Omanga that no
 * approved document makes. Shipping it would be the same class of defect as the
 * "ClarityGo" eyebrow already caught in `solutions.content.ts`.
 *
 * The section cannot ship with no label at all — it is the only text in the
 * section, it names the section for assistive technology, and three unlabelled
 * logos assert nothing. So the label ships as the shortest claim-free statement
 * that the frame's structure requires: these are partners. It deliberately says
 * nothing about backing, funding, underwriting, clients, or what each partner
 * does.
 *
 * **This string needs copy approval or replacement.** It is the one value in this
 * module that is not traceable to a source document.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER, carried] Partner roles are still outstanding.
 *
 * `project-context.md` § Open blockers, item 1: "Partner roles for phillips.hmo,
 * fuspay, zira — blocks the labelled trust wall." Until each role is approved,
 * a partner is a logo and nothing else — no caption, no "insurance partner",
 * nothing in alt text. When the roles land, `PartnerContent` gains a `role`
 * field and `PartnerLogo` gains a caption; nothing else about this section
 * changes.
 */

/**
 * The partner logos, in the frame's left-to-right order.
 *
 * `alt` carries each partner's name exactly as its own wordmark sets it —
 * lowercase, and "phillips.hmo" with two l's and a dot. These are informative
 * images, not decoration: the name appears nowhere else in the section, so an
 * empty alt would lose it. No role or relationship is stated, per the blocker
 * above.
 *
 * [DISCREPANCY] Three things about these assets differ from the design sources,
 * and all three are design decisions rather than implementation ones:
 *
 *   1. The files are raster. `coding-guidelines.md` § Image optimization: "SVG
 *      for logos, icons and flat illustration". SVG versions are outstanding.
 *   2. They are full colour. `design.md` § Image treatment specifies
 *      partner logos as "monochrome, optically balanced to equal visual weight",
 *      and the frame draws them monochrome. Desaturating a partner's trademark
 *      is a brand decision, so the supplied assets ship as supplied.
 *   3. Each file carries a different amount of baked-in whitespace, so "equal
 *      visual weight" is approximate at best until the assets are re-exported on
 *      a common bounding box.
 *
 * [DISCREPANCY] Two filenames do not match the marks they contain:
 * `fusepay-logo.png` renders "fuspay", and `philip-hmo-logo.png` renders
 * "phillips.hmo". The existing files are used as-is rather than renamed, because
 * `app/(legacy)` still references both paths.
 */
const PARTNER_LOGOS: readonly ImageAsset[] = [
  {
    src: "/philip-hmo-logo.png",
    alt: "phillips.hmo",
    width: 1412,
    height: 496,
  },
  {
    src: "/fusepay-logo.png",
    alt: "fuspay",
    width: 960,
    height: 456,
  },
  {
    src: "/zira-logo.png",
    alt: "zira",
    width: 850,
    height: 286,
  },
] as const;

/**
 * The section's content.
 *
 * `partners` is a plain array rather than named fields: unlike the two solutions,
 * the partners are interchangeable peers in a strip, the section applies no
 * per-partner treatment, and adding a fourth is meant to be a one-line edit here
 * and nowhere else.
 *
 * An `ImageAsset` per partner rather than a `{ name, logo }` pair, because the
 * name and the alt text are the same string and storing it twice invites the two
 * to drift.
 */
export type TrustPartnersContent = {
  readonly label: string;
  readonly partners: readonly ImageAsset[];
};

export const trustContent: TrustPartnersContent = {
  label: "Our partners",
  partners: PARTNER_LOGOS,
} as const;

/**
 * The label's id.
 *
 * Exported because two elements must agree on it exactly: `TrustPartners`
 * renders the heading with this id and names its `section` with
 * `aria-labelledby` pointing at it. If they drift, the section loses its
 * accessible name and nothing about that failure is visible on screen.
 */
export const TRUST_HEADING_ID = "trust-heading" as const;
