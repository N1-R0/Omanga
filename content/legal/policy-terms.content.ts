import { WALLET_URL } from "@/config/site";
import {
  COMPANY_IDENTITY_CONFIRM,
  CONTACT_BLOCKS,
  CONTACT_EMAIL_LINK,
  DOCUMENT_MAP_BLOCKS,
  INSURANCE_PROVIDER_NAME,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LINKS,
  MINIMUM_AGE_BLOCK,
  REGULATORY_STATUS_BLOCKS,
  WALLET_PROVIDER_NAME,
} from "@/content/legal/legal-shared.content";
import type { LegalDocumentContent } from "@/types/legal.types";

/**
 * The Policy Terms.
 *
 * ---------------------------------------------------------------------------
 * WHAT "POLICY TERMS" MEANS HERE, AND HOW THAT WAS DECIDED
 *
 * The label came from the approved footer copy with no definition attached, so
 * its scope was derived from the product rather than assumed. Three things
 * settled it:
 *
 *   1. "Policy" is the insurance word. Omanga's headline product is Holiday
 *      Insurance sold as three named plans, and a plan a customer buys is a
 *      policy. Nothing else on the site is called a policy except the privacy and
 *      cookie documents, which already have their own pages in the same footer
 *      column — so this is not a duplicate of either.
 *   2. The Terms of Use covers the website. The website is not the product. There
 *      is a real gap between "rules for using omanga.biz" and "what you actually
 *      bought", and this document is the only one positioned to fill it.
 *   3. The site sells a product whose contract is not with Omanga. Payment is
 *      taken by Paystack, the wallet runs on someone else's platform, and the
 *      insurance is underwritten by someone. A customer has no way to work out
 *      who owes them what, and that is the single most useful thing this document
 *      can explain.
 *
 * So: product terms. Insurance plans and the wallet, who provides each, where the
 * binding contract lives, and how to claim or cancel. It deliberately does not
 * restate the website rules — it points at them.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS AND IS NOT STATED ABOUT COVER
 *
 * The plan contents below are transcribed from `insurance-plans.content.ts`,
 * which is the approved copy already published on the plans page. Nothing is
 * added to them. Benefit limits, monetary caps, waiting periods, pre-existing
 * condition rules, geographic scope and the exclusions list are not published
 * anywhere on this site or in this codebase, and they are the terms that decide
 * whether a claim is paid — so they are marked outstanding rather than drafted.
 *
 * Inventing an exclusions list would be the most damaging thing this whole task
 * could produce: a customer would read it, rely on it, and discover at the point
 * of a hospital admission that the real policy said something else.
 *
 * ---------------------------------------------------------------------------
 * TWO PUBLISHED PROMISES THIS DOCUMENT MUST NOT CONTRADICT
 *
 * The plans page states prices per month, and prints "No commitment · Cancel
 * anytime" under every plan card and again beneath the grid. Both are live,
 * approved, customer-facing promises. This document therefore records the
 * cancellation right as it is advertised, and asks for the mechanics to be
 * confirmed — not the other way round. A terms page that quietly introduced a
 * minimum term or a cancellation fee would contradict the page that sold the plan.
 */

export const policyTermsContent: LegalDocumentContent = {
  meta: {
    title: "Policy Terms | Omanga",
    description:
      "The terms of Omanga's holiday insurance plans and travel wallet — what each plan includes, who provides it, how to cancel, and how to claim.",
    path: "/policy-terms",
  },
  eyebrow: "Legal",
  title: "Policy Terms",
  summary:
    "These terms are about the products we offer — our holiday insurance plans and the Omanga wallet — rather than about this website. They explain what you get, who provides it, and what to do when you need to use it.",
  effectiveDate: LEGAL_EFFECTIVE_DATE,

  intro: [
    {
      kind: "note",
      title: "How this differs from our Terms of Use",
      content: [
        "Our ",
        LEGAL_LINKS.terms,
        " governs your use of omanga.biz — the website. This document governs the products. If you have bought a plan or opened a wallet, this is the page you want.",
      ],
    },
    {
      kind: "note",
      title: "Your policy document comes first",
      content: [
        "Where anything here differs from the policy documentation issued to you when you bought cover, that documentation governs. This page is a summary of how our products work, not a substitute for the contract you hold.",
      ],
    },
    COMPANY_IDENTITY_CONFIRM,
  ],

  sections: [
    {
      id: "who-provides-what",
      heading: "1. Who provides what",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This is the most important section on the page, because our products are delivered by more than one organisation and knowing which one holds your contract tells you who to go to when something matters.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Omanga",
              description: [
                "We present the plans, arrange your cover, take your enquiries and support you through claims and problems. We are your point of contact.",
              ],
            },
            {
              term: INSURANCE_PROVIDER_NAME,
              description: [
                "Provides the holiday health insurance and decides claims against the policy wording. Your insurance contract is with Phillips HMO, not with Omanga.",
              ],
            },
            {
              term: WALLET_PROVIDER_NAME,
              description: [
                "Operates the Omanga wallet at ",
                { text: WALLET_URL, href: WALLET_URL, isExternal: true },
                ". Your wallet agreement is with Fuspay Technologies, under its own terms.",
              ],
            },
            {
              term: "Paystack",
              description: [
                "Takes payment for insurance plans on its own hosted checkout pages. Your card details are given to Paystack, never to us.",
              ],
            },
          ],
        },
        ...REGULATORY_STATUS_BLOCKS,
      ],
    },

    {
      id: "insurance-plans",
      heading: "2. Holiday insurance plans",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "We offer three plans. All three cover hospital admission, diagnostics, emergency assistance and emergency evacuation; the differences are ward type, scan allowances and which hospitals you can be treated at. Prices are in US dollars, per month.",
          ],
        },
      ],
      subsections: [
        {
          id: "what-plans-include",
          heading: "2.1 What each plan includes",
          blocks: [
            {
              kind: "definitions",
              items: [
                {
                  term: "Silver — $50 per month, hospital access Category A",
                  description: [
                    "24/7 emergency assistance; 15 days admission per trip; basic diagnostic services; emergency evacuation; prescription essential drugs.",
                  ],
                },
                {
                  term: "Gold — $85 per month, hospital access Category A and B",
                  description: [
                    "Everything in Silver, plus private ward admission, enhanced diagnostic coverage, extended eye care coverage and higher surgical limits.",
                  ],
                },
                {
                  term:
                    "Diamond — $120 per month, hospital access Category A, B and C",
                  description: [
                    "Everything in Gold, plus premium hospital access, unlimited CT scans, maximum coverage limits and comprehensive care.",
                  ],
                },
              ],
            },
            {
              kind: "paragraph",
              content: [
                "Every plan also includes telemedicine, roaming, 24/7 support and the mobile app. The full side-by-side comparison is on our ",
                LEGAL_LINKS.insurance,
                ", and prices are on our ",
                LEGAL_LINKS.plans,
                ".",
              ],
            },
            {
              kind: "confirm",
              title: "Full Phillips HMO policy wording to be added",
              content: [
                "The summaries above are the plan contents as published on this site. They are not a policy wording. Omanga holds the full policy terms from Phillips HMO and they are to be published on this page, or linked from it as a policy document. Until they are, this page does not state the monetary benefit limits, the surgical limits referred to under Gold, what the hospital access categories mean and which hospitals fall in each, any waiting period, the treatment of pre-existing conditions, the countries covered, the maximum trip length or the exclusions list. Nothing has been drafted in their place, because inventing an exclusion or a limit would mislead a customer at exactly the moment they most need to rely on it.",
              ],
            },
          ],
        },
        {
          id: "when-cover-starts",
          heading: "2.2 When cover starts and how long it lasts",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "Every plan provides 30 days of cover. Cover begins once your payment is confirmed and ends 30 days later.",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "Cover does not extend itself. If your trip runs longer than 30 days, or you travel again, you buy cover again for the new period — see section 4, which explains that payment does not recur automatically.",
              ],
            },
            {
              kind: "confirm",
              title: "Waiting period and trip extension to be confirmed",
              content: [
                "The 30-day cover period is settled. Still to state, from the Phillips HMO policy wording: whether any waiting period applies before a claim can be made, and what a customer should do if a trip is extended while they are already abroad and their 30 days is running out.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "eligibility",
      heading: "3. Who can buy cover",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Anyone can buy cover, from anywhere. There is no restriction by nationality or by the country you live in.",
          ],
        },
        MINIMUM_AGE_BLOCK,
        {
          kind: "paragraph",
          content: [
            "So a parent or guardian may buy cover for a child travelling with them. They buy it in their own name, give consent on the child's behalf, and are responsible for the information given when the cover is arranged.",
          ],
        },
        {
          kind: "confirm",
          title: "Upper age limit and health declaration to be confirmed",
          content: [
            "The minimum age and the absence of a residency restriction are settled. Still to state, from the Phillips HMO policy wording: whether there is a maximum age for cover, and whether any health declaration is required before purchase.",
          ],
        },
      ],
    },

    {
      id: "payment",
      heading: "4. Paying for a plan",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "When you select a plan you are taken to a Paystack checkout page for that plan. Payment is made to Paystack on its page, under its terms. We never see or store your card details.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Prices are shown in US dollars. If your card is denominated in another currency, your bank or card scheme applies its own exchange rate and may charge its own fee, so the amount debited may differ from the price shown. Those charges are not ours and we do not receive them.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Cover is arranged once payment is confirmed. If a payment fails or is reversed, cover may not start or may not continue.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Payment does not recur. We do not store your card for future charges and nothing is taken from you again automatically. Each period of cover is a single payment, and when it ends you decide whether to buy cover again. That is what “No commitment · Cancel anytime” on our plan cards means in practice: there is no subscription to cancel.",
          ],
        },
      ],
    },

    {
      id: "cancelling",
      heading: "5. Cancelling and refunds",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "There is no commitment and nothing to cancel in the sense of stopping a future charge, because payment does not recur. Once your 30 days of cover end, they end, and you are not charged again unless you buy cover again.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If you want to end cover you have already paid for before its 30 days are up, email us at ",
            CONTACT_EMAIL_LINK,
            " and we will arrange it with Phillips HMO.",
          ],
        },
        {
          kind: "confirm",
          title: "Refund policy in preparation",
          content: [
            "Omanga is writing a refund and cancellation policy and it must be published here. It needs to state: whether any part of a paid 30-day period is refunded when cover is ended early, whether there is a cooling-off period after purchase, whether a refund is possible once a claim has been made, and how long a refund takes to reach the customer. Until it is published, this page does not promise a refund, and no other page on this site should imply one.",
          ],
        },
      ],
    },

    {
      id: "claims",
      heading: "6. Making a claim",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "If you need medical help while travelling, use the 24/7 emergency assistance line provided with your plan. In an emergency, get treatment first.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Claims are decided by Phillips HMO against the policy wording, not by Omanga. We will help you make the claim, chase it and, if you are unhappy with the outcome, take it up on your behalf through our ",
            LEGAL_LINKS.complaints,
            ".",
          ],
        },
        {
          kind: "confirm",
          title: "Emergency assistance number and claims steps to be published",
          content: [
            "The emergency assistance telephone number for plan holders is to be published here, and kept editable so it can be changed without a code change. Also to be published, from the Phillips HMO policy wording: the deadline for notifying a claim, what evidence is required, whether treatment must be pre-authorised, and how long a decision takes. The site's footer links to a Claims page that does not yet exist. A customer in hospital abroad needs this in one place and needs to find it fast.",
          ],
        },
      ],
    },

    {
      id: "wallet",
      heading: "7. The Omanga wallet",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The wallet is a multi-currency travel wallet, opened and operated by Fuspay Technologies at ",
            { text: WALLET_URL, href: WALLET_URL, isExternal: true },
            ". When you open one, you enter an agreement with Fuspay Technologies. Fuspay's own wallet policy governs the account — its funding, its spending limits, its fees, how funds are held and how the account is closed — and it applies to your wallet in place of anything on this page.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Exchange rates and fees applied to wallet transactions are set by Fuspay Technologies and its partners. We do not set them and we do not receive them.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If a wallet transaction goes wrong, come to us anyway. Our ",
            LEGAL_LINKS.complaints,
            " sets out how we take it up with Fuspay on your behalf and stay in the conversation until it is resolved.",
          ],
        },
        {
          kind: "confirm",
          title: "Fuspay wallet policy to be linked",
          content: [
            "Fuspay Technologies' wallet policy governs the account and this page should link to it directly, so a customer can read the terms they are actually agreeing to rather than being told they exist. Add the link, and with it Fuspay's fee schedule and its statement of how customer funds are held.",
          ],
        },
      ],
    },

    {
      id: "your-responsibilities",
      heading: "8. Your responsibilities",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "Give accurate information when you buy cover. Cover arranged on the basis of wrong information may not pay out.",
            ],
            [
              "Tell us if your circumstances change in a way that affects your cover.",
            ],
            [
              "Read the policy documentation issued to you and keep it somewhere you can reach while travelling.",
            ],
            [
              "Take reasonable care of yourself and your belongings. Cover is not a substitute for sensible precautions.",
            ],
            [
              "Keep your wallet credentials secure and never share them. We will never ask you for a password.",
            ],
          ],
        },
      ],
    },

    {
      id: "changes",
      heading: "9. Changes to plans and to these terms",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Plans, prices and cover can change. A change does not alter cover you have already paid for during the period it covers. Where a change affects cover you hold, we will tell you before it takes effect.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The effective date at the top of this page tells you which version you are reading.",
          ],
        },
      ],
    },

    {
      id: "complaints",
      heading: "10. If something goes wrong",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Tell us. Our ",
            LEGAL_LINKS.complaints,
            " sets out how to complain, what happens next and where to escalate — including for complaints about a claim decision, which we will raise with the insurer on your behalf.",
          ],
        },
      ],
    },

    {
      id: "related-documents",
      heading: "11. Related documents",
      blocks: [...DOCUMENT_MAP_BLOCKS],
    },

    {
      id: "contact",
      heading: "12. Contact us",
      blocks: [...CONTACT_BLOCKS],
    },

    {
      id: "legal-review",
      heading: "13. Status of this document",
      blocks: [
        {
          kind: "confirm",
          title: "This document is incomplete and has not been reviewed",
          content: [
            "It names the providers, states the 30-day cover period, the eligibility rules and the fact that payment does not recur, and describes the purchase and wallet journeys as they actually work. Still outstanding: the Phillips HMO policy wording with its benefit limits and exclusions, the refund policy, the emergency assistance number, and Omanga's own end-to-end claims flow, which is to be documented and set out here. It has not been reviewed by a qualified Nigerian insurance lawyer and should not be presented to customers as the terms of their cover until those items are supplied and the whole document is reviewed.",
          ],
        },
      ],
    },
  ],
} as const;
