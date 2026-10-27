// [CHANGED, 2026-10-10] Copy pass to the site copy rules (design-lab/type-and-copy-research.md); facts unchanged.
import { PLAN_CHECKOUT_URLS } from "@/config/site";
import {
  INSURANCE_COVERAGE_ANCHOR,
  type InsurancePlanName,
} from "@/content/insurance.content";
import type { CallToAction } from "@/types/content.types";

/**
 * Checkout destinations, one per tier — see `PLAN_CHECKOUT_URLS` in
 * `config/site.ts` for the URLs and the `[VERIFY]` on their mapping.
 *
 * The annotation is the point of this line. `config/` does not import from
 * `content/`, so the constant cannot be keyed by `InsurancePlanName` where it is
 * declared; assigning it here fails the build if a tier is renamed, added or
 * loses its link, which is the check `Record` would have given at the source.
 */
const CHECKOUT_URLS: Record<InsurancePlanName, string> = PLAN_CHECKOUT_URLS;

/**
 * Insurance plans — spec § 5, filled out from the live plan cards.
 *
 * [CHANGED] No anchor. § 5 is a section of the insurance page in the spec,
 * addressed as `#plans`; on instruction it is the opening section of a
 * standalone `/plans` page instead. See `content/insurance.content.ts`.
 *
 * ---------------------------------------------------------------------------
 * Two sources, and which one wins where
 *
 * The spec is the authority on *what a card carries* — it cut the live cards
 * from roughly fourteen data points to five and moved the rest into the § 6
 * table. That reduction is *mostly* held: the live card's What's Included list
 * is restored, because the Figma frame the cards are built to has a feature
 * list and a card with two rows in it read as empty.
 *
 * The live card's Coverage Highlights block — admission, psychiatric days, scan
 * and session allowances — is not. Removed on instruction, which puts those
 * eight values back where § 6 wants them: "Everything removed reappears in § 6,
 * once, in a scannable table. Nothing is lost; it stops being repeated three
 * times in three narrow columns." They are already in
 * `insurance-coverage.content.ts`.
 *
 * The live page is the authority on *the values themselves*. Where the two
 * disagree, the live page wins, because the spec was transcribing it.
 *
 * ---------------------------------------------------------------------------
 * [DEFECT] The spec's hospital-access values are wrong for two of three tiers.
 *
 * Spec § 5 and § 6.1 both give Silver "Category A + B" and Gold "Category A +
 * B", and § 6 states as fact that "'Category A + B' appears on all three live
 * cards". The live cards read:
 *
 *   Silver    Category A
 *   Gold      Category A + B
 *   Diamond   Category A + B + C
 *
 * So access is the clean three-step ladder the tiers imply, and the spec
 * flattened the bottom two. The live values ship. This also invalidates the
 * § 6.1 table row, which `insurance-coverage.content.ts` carries — correct it
 * there before that section is built.
 *
 * [BLOCKER] The categories are still undefined. Spec § 6 calls defining them
 * "the highest-value fix in this section" and § 12 question 2 is open. Nothing
 * on the page says what A, B or C means to a traveller.
 *
 * ---------------------------------------------------------------------------
 * [NAMING] The live cards read "Silver Package". Spec § 5 § Naming drops the
 * noun — "Shorter, and 'plan' is already established by the section H2 and by
 * the homepage copy. Apply consistently: the homepage document says Silver,
 * Gold and Diamond, so the site should too." Copy decision, so the spec wins
 * over the live page here. The CTA labels shorten with it: "Select Silver", not
 * "Select Silver Package".
 *
 * [NORMALISED] The live CTAs are black, orange and indigo. Spec § 5: "Keep all
 * three buttons identical in weight; a differently-coloured Gold button reads
 * as arbitrary rather than intentional." All three are the primary variant; the
 * only difference is the tone their card's surface requires.
 *
 * ---------------------------------------------------------------------------
 * [BLOCKER] Currency. Prices are USD, as on the live page. Whether GBP and CAD
 * equivalents display for wallet holders funding in those currencies is spec
 * § 12 question 7, unanswered. `currency` is a field rather than baked into the
 * price string so the answer is a data change, not a copy edit.
 *
 * [BLOCKER] Billing period. Spec § 12 question 8: monthly billing and a
 * trip-length product are in tension. The card says "/month" and "15 days
 * admission per trip" four rows apart and reconciles neither.
 *
 * [OMITTED] Gold's "Most popular" tag. The spec permits it "only if that claim
 * is true" and flags it `[VERIFY]` against real conversion data. No such data
 * exists, so no tag — `isFeatured` carries the brand surface and no claim.
 *
 * [OMITTED] The live cards' tier icons — a shield, a trophy and a gem in tinted
 * circles. The Figma frame draws a badge in that slot instead, and no icon in
 * `components/icons/` matches those glyphs. Reinstating them needs the assets.
 */

export type InsurancePlan = {
  readonly name: InsurancePlanName;
  /** Numeric only. The currency symbol and the period are rendered, not typed. */
  readonly price: number;
  /** Spec § 5's one-line positioning. The live cards carry none. */
  readonly description: string;
  /** § 5's "primary benefit" — the one differentiator read at a glance. */
  readonly hospitalAccess: string;
  /** The live card's What's Included list, verbatim. */
  readonly included: readonly string[];
  readonly action: CallToAction;
  /**
   * A visual lift, never a claim. See the omitted-tag note above — this must
   * not render as "Most popular" or any other unevidenced social proof.
   */
  readonly isFeatured?: boolean;
};

export type InsurancePlansContent = {
  readonly heading: string;
  readonly intro: string;
  readonly currency: "USD";
  readonly billingPeriod: string;
  /** Names the hospital-access line. § 6.1's own row label. */
  readonly accessLabel: string;
  /** Heading for the inclusion list inside each card. From the live cards. */
  readonly includedHeading: string;
  /** The line under every card's button. Live copy, on all three. */
  readonly cardFootnote: string;
  readonly plans: readonly [InsurancePlan, InsurancePlan, InsurancePlan];
  /** Centred beneath the grid: the universal inclusions, then the link to § 6. */
  readonly footnote: string;
  readonly action: CallToAction;
};

const SILVER: InsurancePlan = {
  name: "Silver",
  price: 50,
  // [CHANGED, 2026-10-14] UX copy pass: says who the plan suits; list items
  // shortened to plain nouns. Facts unchanged.
  description: "The essentials, for a short, straightforward trip.",
  hospitalAccess: "Category A",
  included: [
    // [CHANGED, 2026-10-18] Owner: "24/7" unconfirmed.
    "Emergency assistance",
    "15 days in hospital per trip",
    "Basic diagnostics",
    "Emergency evacuation",
    "Essential prescription drugs",
  ],
  action: {
    // [CHANGED, 2026-10-14] UX copy pass: "Buy" says the button opens checkout.
    label: "Buy Silver",
    href: CHECKOUT_URLS.Silver,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

/**
 * [NOTE] Gold and Diamond open their lists with "Everything in Silver +" and
 * "Everything in Gold +". Kept verbatim, because that is what the card says and
 * a card can carry an inheritance claim — a *table* cannot, which is exactly
 * why four cells in `insurance-coverage.content.ts` are absent rather than
 * inferred from these two lines.
 */
const GOLD: InsurancePlan = {
  name: "Gold",
  price: 85,
  description:
    "A private ward and more scans, for longer or less predictable trips.",
  hospitalAccess: "Category A + B",
  included: [
    "Everything in Silver, plus:",
    "Private ward admission",
    "Enhanced diagnostics",
    "Extended eye care",
    "Higher surgical limits",
  ],
  action: {
    label: "Buy Gold",
    href: CHECKOUT_URLS.Gold,
    isExternal: true,
    emphasis: "primary",
  },
  isFeatured: true,
} as const;

const DIAMOND: InsurancePlan = {
  name: "Diamond",
  price: 120,
  // [CHANGED, 2026-10-14] UX copy pass: "widest hospital access" matches the
  // card's access line; "premium" and "network" were vaguer than the data.
  description:
    "The highest limits and unlimited scans, with the widest hospital access.",
  hospitalAccess: "Category A + B + C",
  included: [
    "Everything in Gold, plus:",
    "Widest hospital access",
    "Unlimited CT scans",
    "Highest cover limits",
    "Comprehensive care",
  ],
  action: {
    label: "Buy Diamond",
    href: CHECKOUT_URLS.Diamond,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

export const insurancePlansContent: InsurancePlansContent = {
  // [CHANGED, 2026-10-14] UX copy pass: keyword h1 names Nigeria; intro names
  // the provider and regulator, and says the plans apply in Nigeria only.
  heading: "Health insurance plans for your trip to Nigeria",
  intro:
    "Short-term health cover in Nigeria from Phillips HMO, a Nigerian health maintenance organisation (HMO). Every plan covers hospital admission, diagnostics, emergency assistance and evacuation. Plans differ in ward type, scans and hospital access.",
  currency: "USD",
  billingPeriod: "month",
  accessLabel: "Hospital access",
  includedHeading: "What's included",
  // Published, not owner-confirmed (design.md Copy to-do). Kept, not strengthened.
  cardFootnote: "No commitment. Cancel any time.",
  plans: [SILVER, GOLD, DIAMOND],
  // [CHANGED, 2026-10-14] UX copy pass: drops the cancel line the cards
  // already carry; adds renew/extend (owner-confirmed). Roaming is Nigeria only.
  footnote:
    "Every plan also includes telemedicine, roaming across Nigeria, a contact centre, the mobile app and a health-tips newsletter. Renew or extend your plan from your account.",
  action: {
    label: "Compare every benefit",
    // A bare fragment: the comparison table is the next section on this same
    // page, so this scrolls rather than navigates.
    href: `#${INSURANCE_COVERAGE_ANCHOR}`,
    emphasis: "text",
  },
} as const;

export const INSURANCE_PLANS_HEADING_ID = "insurance-plans-heading" as const;
