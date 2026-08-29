import { CONTACT_EMAIL, OFFICE_ADDRESS } from "@/config/site";
import type { LegalBlock } from "@/types/legal.types";

/**
 * Facts and fragments shared by all five legal documents.
 *
 * The five pages cross-reference each other constantly and repeat the same
 * contact route, the same company-identity gap and the same effective date. Each
 * of those has one definition here, so a change lands in five documents at once
 * and they cannot fall out of step — which for a set of documents that describe
 * each other is not a tidiness point but an accuracy one.
 */

/**
 * The date the five documents took effect.
 *
 * [TO CONFIRM] Set to the date they were written. If publication slips, this must
 * move to the actual publication date: an effective date earlier than the day the
 * document first appeared is a claim that visitors were on notice when they were
 * not.
 */
export const LEGAL_EFFECTIVE_DATE = "2026-08-28" as const;

export const LEGAL_ROUTES = {
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
  policyTerms: "/policy-terms",
  complaints: "/complaints-procedure",
  cookies: "/cookie-policy",
} as const;

export const LEGAL_LINKS = {
  privacy: { text: "Privacy Policy", href: LEGAL_ROUTES.privacy },
  terms: { text: "Terms of Use", href: LEGAL_ROUTES.terms },
  policyTerms: { text: "Policy Terms", href: LEGAL_ROUTES.policyTerms },
  complaints: {
    text: "Complaints Procedure",
    href: LEGAL_ROUTES.complaints,
  },
  cookies: { text: "Cookie Policy", href: LEGAL_ROUTES.cookies },
  contact: { text: "Contact page", href: "/contact" },
  insurance: { text: "insurance page", href: "/insurance" },
  plans: { text: "plans page", href: "/plans" },
} as const;

export const MAILTO = `mailto:${CONTACT_EMAIL}` as const;

export const CONTACT_EMAIL_LINK = {
  text: CONTACT_EMAIL,
  href: MAILTO,
} as const;

/**
 * The identity gap, written once.
 *
 * Nigerian company law and every privacy regime worth naming require a data
 * controller to identify itself — a registered name, a registration number and a
 * registered office. None of the three is established anywhere in this project:
 * `config/site.ts` records that they are open blockers and deliberately holds no
 * placeholder for them, and the address it does hold is flagged `[VERIFY]` as
 * possibly a trading address rather than the registered one.
 *
 * So the documents say "Omanga", which is the trading name the site uses
 * throughout and is true, and this callout states plainly what is still missing.
 * Writing "Omanga Limited (RC 1234567)" would have made the page look finished by
 * inventing the two facts a reader most needs to be able to rely on.
 */
export const COMPANY_IDENTITY_CONFIRM: LegalBlock = {
  kind: "confirm",
  title: "Company identity to be confirmed before publication",
  content: [
    "This document identifies us by our trading name, Omanga. Our full registered company name, company registration (RC) number, and registered office address are not yet published on this site and must be added here before these terms are relied on. The address we publish — ",
    OFFICE_ADDRESS,
    " — is our office; we have not yet confirmed whether it is also our registered office.",
  ],
} as const;

/** The wallet operator, named identically wherever the wallet is described. */
export const WALLET_PROVIDER_NAME = "Fuspay Technologies" as const;

/** The insurance provider, named identically wherever cover is described. */
export const INSURANCE_PROVIDER_NAME = "Phillips HMO" as const;

/**
 * Who is authorised to do what, written once.
 *
 * Payments and insurance are both licensed activities in Nigeria. Omanga holds
 * neither licence and does not claim to: it presents these services and routes
 * customers to the providers who are authorised to deliver them. Naming the
 * providers and their regulators is what lets a customer check that for
 * themselves, and is the fact the earlier draft of these documents was missing.
 *
 * The licence numbers are still outstanding and are marked as such below rather
 * than left implied. "Licensed by the CBN" is a verifiable claim about a named
 * company; a licence number invented to make the sentence look complete is not.
 */
export const REGULATORY_STATUS_BLOCKS: readonly LegalBlock[] = [
  {
    kind: "paragraph",
    content: [
      "Payment services and insurance are regulated activities in Nigeria, and each is delivered here by the provider authorised to deliver it. Omanga arranges and supports these services; it does not underwrite insurance and does not itself hold a banking licence.",
    ],
  },
  {
    kind: "definitions",
    items: [
      {
        term: WALLET_PROVIDER_NAME,
        description: [
          "Operates the Omanga wallet. Fuspay Technologies is a fully registered microfinance bank holding a banking licence from the Central Bank of Nigeria.",
        ],
      },
      {
        term: INSURANCE_PROVIDER_NAME,
        description: [
          "Provides the holiday health insurance sold on this site. Phillips HMO is a fully registered insurance provider regulated by the National Insurance Commission (NAICOM).",
        ],
      },
    ],
  },
  {
    kind: "confirm",
    title: "Licence numbers to be added",
    content: [
      "The regulator and licence type for each provider are stated above and are correct. The licence numbers themselves — Fuspay Technologies' CBN licence number and Phillips HMO's NAICOM registration number — are not yet published here and should be added so a customer can verify them against the regulators' own registers.",
    ],
  },
] as const;

/**
 * The age rule, written once.
 *
 * The Nigeria Data Protection Act 2023 treats anyone under 18 as a child and
 * requires the consent of a parent or guardian before their data is processed.
 * The same threshold therefore governs eligibility, which is why this sentence
 * appears identically in the Privacy Policy, the Terms of Use and the Policy
 * Terms rather than being written three times and allowed to drift.
 */
export const MINIMUM_AGE_BLOCK: LegalBlock = {
  kind: "paragraph",
  content: [
    "Nigerian law treats anyone under the age of 18 as a minor. You must be 18 or over to buy insurance cover, to open a wallet or to enter into an agreement with us in your own name. A person under 18 may be covered or may transact only with the consent of a parent or legal guardian, who takes responsibility for the arrangement.",
  ],
} as const;

/**
 * How the five documents relate, stated identically in each of them.
 *
 * A reader who lands on one of the five has no way to know the other four exist
 * or which one answers their question. Repeating the map in each document is the
 * cheapest fix and the one that works regardless of which page they arrived on.
 */
export const DOCUMENT_MAP_BLOCKS: readonly LegalBlock[] = [
  {
    kind: "paragraph",
    content: ["Five documents govern your use of this website and our services."],
  },
  {
    kind: "definitions",
    items: [
      {
        term: "Terms of Use",
        description: [
          "The rules for using this website — who may use it, what you may and may not do here, and the limits of what we promise about the site itself. ",
          LEGAL_LINKS.terms,
          ".",
        ],
      },
      {
        term: "Policy Terms",
        description: [
          "What our insurance and payment products actually cover, who provides them, and where the binding contract for each one lives. This is the document that explains why buying a policy involves a contract that is not with us. ",
          LEGAL_LINKS.policyTerms,
          ".",
        ],
      },
      {
        term: "Privacy Policy",
        description: [
          "What personal information we collect, why, who we share it with, and the rights you have over it. ",
          LEGAL_LINKS.privacy,
          ".",
        ],
      },
      {
        term: "Cookie Policy",
        description: [
          "The cookies and similar technologies this website uses, and how to control them. ",
          LEGAL_LINKS.cookies,
          ".",
        ],
      },
      {
        term: "Complaints Procedure",
        description: [
          "How to complain, what happens after you do, and where to escalate if we do not put it right. ",
          LEGAL_LINKS.complaints,
          ".",
        ],
      },
    ],
  },
] as const;

/** The contact routes, identical across the five documents. */
export const CONTACT_BLOCKS: readonly LegalBlock[] = [
  {
    kind: "paragraph",
    content: [
      "You can reach us by email at ",
      CONTACT_EMAIL_LINK,
      ", through the form on our ",
      LEGAL_LINKS.contact,
      ", or on WhatsApp using the link published there.",
    ],
  },
  {
    kind: "paragraph",
    content: ["Our office address is ", OFFICE_ADDRESS, "."],
  },
] as const;

/**
 * [TO CONFIRM] A dedicated privacy contact.
 *
 * Every enquiry currently arrives in one general mailbox. A data subject request
 * has statutory deadlines attached to it and needs to be recognised as one on
 * arrival, which a shared inbox with no routing rule cannot be relied on to do.
 */
export const PRIVACY_CONTACT_CONFIRM: LegalBlock = {
  kind: "confirm",
  title: "Privacy contact route to be confirmed",
  content: [
    "Privacy requests currently reach the same general mailbox as every other enquiry. Before publication, confirm whether a dedicated address (for example privacy@omanga.biz) should be published here, and whether Omanga has appointed a Data Protection Officer or a Data Protection Compliance Organisation. Requests carry statutory deadlines and need to be recognised as such when they arrive.",
  ],
} as const;
