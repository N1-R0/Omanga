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
  description: "Essential cover for a straightforward trip.",
  hospitalAccess: "Category A",
  included: [
    "24/7 emergency assistance",
    "15 days admission per trip",
    "Basic diagnostic services",
    "Emergency evacuation",
    "Prescription essential drugs",
  ],
  action: {
    label: "Select Silver",
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
    "Private ward and wider diagnostics, for longer or less predictable trips.",
  hospitalAccess: "Category A + B",
  included: [
    "Everything in Silver +",
    "Private ward admission",
    "Enhanced diagnostic coverage",
    "Extended eye care coverage",
    "Higher surgical limits",
  ],
  action: {
    label: "Select Gold",
    href: CHECKOUT_URLS.Gold,
    isExternal: true,
    emphasis: "primary",
  },
  isFeatured: true,
} as const;

const DIAMOND: InsurancePlan = {
  name: "Diamond",
  price: 120,
  description:
    "Maximum limits and unlimited scans, with the widest hospital network.",
  hospitalAccess: "Category A + B + C",
  included: [
    "Everything in Gold +",
    "Premium hospital access",
    "Unlimited CT scans",
    "Maximum coverage limits",
    "Comprehensive care",
  ],
  action: {
    label: "Select Diamond",
    href: CHECKOUT_URLS.Diamond,
    isExternal: true,
    emphasis: "primary",
  },
} as const;

export const insurancePlansContent: InsurancePlansContent = {
  heading: "Choose your plan",
  intro:
    "Every plan covers hospital admission, diagnostics, emergency assistance and evacuation. The difference is how much room you have — ward type, scan allowances and which hospitals you can walk into.",
  currency: "USD",
  billingPeriod: "month",
  accessLabel: "Hospital access",
  includedHeading: "What's included",
  cardFootnote: "No commitment · Cancel anytime",
  plans: [SILVER, GOLD, DIAMOND],
  footnote:
    "No commitment. Cancel anytime. Every plan includes telemedicine, roaming, 24/7 support, the mobile app and our health-tips newsletter.",
  action: {
    label: "See the full comparison",
    // A bare fragment: the comparison table is the next section on this same
    // page, so this scrolls rather than navigates. The prefixed
    // `INSURANCE_COVERAGE_HREF` is for links arriving from `/insurance`.
    href: `#${INSURANCE_COVERAGE_ANCHOR}`,
    emphasis: "text",
  },
} as const;

export const INSURANCE_PLANS_HEADING_ID = "insurance-plans-heading" as const;
