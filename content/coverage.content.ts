import { PRIMARY_CTA } from "@/content/site.content";
import type {
  CallToAction,
  Eyebrow,
  ImageAsset,
} from "@/types/content.types";

/**
 * African Coverage content.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] `copy.md` is not in project knowledge, so none of these strings is
 * traceable to the approved document.
 *
 * They are transcribed from the section screenshot and then corrected against
 * `project-context.md` § Non-negotiable copy facts, which is the one source of
 * copy authority available. Three of the four strings the design draws are
 * explicitly rejected by that document — see each note below.
 *
 * **Every string in this module needs copy approval.** This follows the
 * precedent `trust.content.ts` and `how-it-works.content.ts` already set:
 * correct the frame against the non-negotiables, ship the corrected string, and
 * flag it rather than shipping a claim the project has already struck.
 */

/**
 * The flags, in the cluster's left-to-right, top-to-bottom order.
 *
 * `ImageAsset` rather than a `{ country, asset, alt }` triple: the country name
 * and the alt text are the same string, and storing it twice invites the two to
 * drift. Same call `trust.content.ts` makes for the partner logos.
 *
 * The arch's shape — which column each flag lands in and how high that column
 * sits — is not here. That is layout, and it belongs to `FlagCluster`. This
 * module supplies an ordered list and nothing about how it is arranged.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Canada, the United Kingdom and the United States are not African.
 *
 * All three were supplied for this cluster and all three appear in the Figma
 * frame, which draws Canada, Iceland, the United States, Yemen, Bolivia, Hungary
 * and Moldova — placeholder flags carried over from the structural benchmark
 * this redesign follows. Under a heading that reads "43 African countries", three
 * non-African flags contradict the sentence directly above them.
 *
 * They ship because they were explicitly requested. Each `alt` names the country
 * the image depicts and claims nothing about coverage, so the alt text is
 * accurate even where the composition is not. **Confirm with design whether these
 * three should be replaced with African flags** — the section's own heading is
 * the argument for replacing them.
 *
 * [NOTE] Fourteen flags cannot represent forty-three countries. The cluster is a
 * sample, and `FlagCluster` labels it as one so that is not left implied.
 *
 * Intrinsic dimensions are the assets' own 32 × 32 viewBox. They are square, so
 * the box is locked before load and nothing reflows.
 */
const FLAG_VIEWBOX = 32;

const flag = (src: string, alt: string): ImageAsset => ({
  src: `/flags/${src}.svg`,
  alt,
  width: FLAG_VIEWBOX,
  height: FLAG_VIEWBOX,
});

const COVERAGE_FLAGS: readonly ImageAsset[] = [
  flag("canada", "Canada"),
  flag("united-states", "United States"),
  flag("united-kingdom", "United Kingdom"),
  flag("benin", "Benin"),
  flag("cameroon", "Cameroon"),
  flag("ghana", "Ghana"),
  flag("nigeria", "Nigeria"),
  flag("kenya", "Kenya"),
  flag("niger", "Niger"),
  flag("rwanda", "Rwanda"),
  flag("republic-of-congo", "Republic of the Congo"),
  flag("sierra-leone", "Sierra Leone"),
  flag("south-africa", "South Africa"),
  flag("south-sudan", "South Sudan"),
] as const;

/**
 * The section's action.
 *
 * [CORRECTED] The frame reads "Get your Omanga Card →".
 *
 * `project-context.md`: "**Wallet, not card.** Tracked changes removed every
 * 'card' claim... Never reintroduce physical-card language in copy, image alt
 * text, or component names." And: "**Primary CTA is `Get Started`.**"
 *
 * So the label is not rewritten here — it is the approved primary CTA, spread
 * from `site.content.ts` so the label and the destination have exactly one owner
 * and cannot drift from the header, the hero or the CTA band.
 *
 * `emphasis` is overridden to `text`, which is the only value that differs: the
 * frame draws this action as a tertiary text link with a trailing arrow, not a
 * filled button. Emphasis is the section's hierarchy, not the copy's.
 *
 * [NOTE] `/get-started` has no route yet. It is not marked `isRoutePending`
 * because `site.content.ts` owns that link and does not mark it either; flagging
 * it in one place and not the other would make the two disagree. The missing
 * stub is a routing task, tracked there.
 */
const COVERAGE_ACTION: CallToAction = {
  ...PRIMARY_CTA,
  emphasis: "text",
} as const;

export type AfricanCoverageContent = {
  readonly eyebrow: Eyebrow;
  readonly heading: string;
  readonly intro: string;
  readonly flags: readonly ImageAsset[];
  /** The flag cluster's accessible name. See the field for why it exists. */
  readonly flagsLabel: string;
  readonly action: CallToAction;
};

export const coverageContent: AfricanCoverageContent = {
  /**
   * [CORRECTED] The frame reads "Integrations".
   *
   * This section is about the countries Omanga reaches, not about third-party
   * integrations — there are none on this page and none in the approved
   * information architecture. "Integrations" is benchmark-template language of
   * the same kind as the "backed by" claim `trust.content.ts` rejected and the
   * "ClarityGo" eyebrow `solutions.content.ts` caught.
   *
   * "Coverage" is what the section is, it is claim-free, and it is already the
   * label the footer uses for the same subject ("Coverage — 43 countries").
   */
  eyebrow: "Coverage",

  /**
   * [CORRECTED] The frame reads "Works in 52 African countries".
   *
   * `project-context.md`: "**43 African countries.** Not 52. The spec's 52 is
   * obsolete — reject it everywhere, including alt text, meta, and schema
   * `areaServed`." Five sections already shipped with 43.
   *
   * [DISCREPANCY] This is near-identical to the Coverage tab heading in
   * `deep-dive.content.ts` — "Works across 43 African countries". Two headings
   * this close on one page is a copy question, not an implementation one.
   * **Confirm which one changes.**
   */
  heading: "Works in 43 African countries",

  /**
   * [CORRECTED] The frame reads "Use your Omanga card and reach healthcare
   * across 52 African countries". Both the card claim and the 52 are struck,
   * per the two non-negotiables above.
   *
   * [DISCREPANCY] The closing clause repeats `services.content.ts` almost
   * exactly — "however many borders it crosses". The phrase is the frame's, so it
   * ships, but the repetition is worth a copy pass.
   */
  intro:
    "The question every traveller actually asks is whether it will work where they're going. Use your Omanga wallet and reach healthcare across 43 African countries — one account from arrival to departure, however many borders the trip crosses.",

  flags: COVERAGE_FLAGS,

  /**
   * The cluster's accessible name.
   *
   * Interface text rather than marketing copy, and in a content module for the
   * same reasons `site.content.ts` keeps the skip-link label there: it is
   * user-visible, it needs translating if the site ever is, and a component may
   * not hardcode a string.
   *
   * Deliberately claim-free. "A selection" is doing real work — fourteen flags
   * cannot stand for forty-three countries, and three of the fourteen are not
   * African at all, so any wording that framed the group as *the* covered
   * countries would be inaccurate. **Needs copy approval like every string here.**
   */
  flagsLabel: "A selection of country flags",

  action: COVERAGE_ACTION,
} as const;

/** Shared so the `h2` and the section's `aria-labelledby` cannot drift apart. */
export const COVERAGE_HEADING_ID = "coverage-heading";
