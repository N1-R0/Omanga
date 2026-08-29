import { WALLET_URL } from "@/config/site";
import {
  COMPANY_IDENTITY_CONFIRM,
  CONTACT_BLOCKS,
  CONTACT_EMAIL_LINK,
  DOCUMENT_MAP_BLOCKS,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LINKS,
  MINIMUM_AGE_BLOCK,
  REGULATORY_STATUS_BLOCKS,
  WALLET_PROVIDER_NAME,
} from "@/content/legal/legal-shared.content";
import type { LegalDocumentContent } from "@/types/legal.types";

/**
 * The Terms of Use.
 *
 * ---------------------------------------------------------------------------
 * SCOPE: THIS WEBSITE, NOT THE PRODUCTS
 *
 * These terms govern the website. What the wallet and the insurance policies
 * actually promise is the Policy Terms document's job, and keeping the two apart
 * is the whole reason both exist — see `policy-terms.content.ts` for why that
 * split was chosen rather than duplicating one into the other.
 *
 * The practical consequence, and the thing that keeps this document honest: the
 * site has no accounts, takes no payments and stores no user data, so most of
 * what a standard SaaS terms-of-use covers has nothing to attach to here. There
 * is no account termination clause, because there are no accounts to terminate.
 * There is no subscription or billing clause, because nothing is billed on this
 * site. Writing those sections anyway would describe a product that does not
 * exist, and would conflict with the Policy Terms on where payment obligations
 * actually live.
 *
 * ---------------------------------------------------------------------------
 * LIMITATION OF LIABILITY
 *
 * Drafted to exclude what can be excluded and to say so in plain terms, with the
 * carve-outs that no contract can exclude — death or personal injury caused by
 * negligence, and fraud — stated explicitly. A clause purporting to exclude
 * everything is routinely struck down and takes the rest of the section with it,
 * so the narrower version is also the more effective one. It still needs a
 * lawyer's eye, which section 15 says.
 */

export const termsOfUseContent: LegalDocumentContent = {
  meta: {
    title: "Terms of Use | Omanga",
    description:
      "The terms governing your use of omanga.biz — who may use the site, acceptable use, intellectual property, disclaimers and the limits of our liability.",
    path: "/terms-of-use",
  },
  eyebrow: "Legal",
  title: "Terms of Use",
  summary:
    "These terms govern your use of omanga.biz. By using this website you accept them. If you do not accept them, please do not use the site.",
  effectiveDate: LEGAL_EFFECTIVE_DATE,

  intro: [
    {
      kind: "note",
      title: "These terms cover the website, not the products",
      content: [
        "This document is about using omanga.biz. What our insurance and wallet products cover, and the contract you enter when you buy one, are set out in our ",
        LEGAL_LINKS.policyTerms,
        ". Where the two overlap, the Policy Terms govern the product.",
      ],
    },
    COMPANY_IDENTITY_CONFIRM,
  ],

  sections: [
    {
      id: "about-these-terms",
      heading: "1. About these terms",
      blocks: [
        /*
          The domain is written out, not interpolated from `SITE_URL`.

          `SITE_URL` reads `NEXT_PUBLIC_SITE_URL`, which is set per environment so
          that preview deployments do not emit production canonicals. That is
          correct for a canonical tag and wrong for this sentence: it made the
          Terms read "your use of http://localhost:3000" on a local build, and
          would name a vercel.app address on a preview deployment.

          A legal document has to identify the site by the domain it is actually
          published at, and that is a fixed fact about the business rather than a
          property of the build. It is also not a link — a document does not
          hyperlink to the site it is already on.
        */
        {
          kind: "paragraph",
          content: [
            "These terms are an agreement between you and Omanga about your use of the website at omanga.biz. They apply every time you visit, whether or not you contact us or buy anything.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "We may update these terms. The effective date at the top tells you which version applies. Changes are not retrospective: the version in force when you used the site is the one that governed that use.",
          ],
        },
      ],
    },

    {
      id: "eligibility",
      heading: "2. Who may use this site",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "You may use this website if you are legally able to enter into a contract in the country you are in.",
          ],
        },
        MINIMUM_AGE_BLOCK,
        {
          kind: "paragraph",
          content: [
            "Where a parent or guardian buys cover or transacts for a minor, they do so in their own name and are responsible for these terms and for what is agreed. The same age rule is stated in our ",
            LEGAL_LINKS.privacy,
            " and our ",
            LEGAL_LINKS.policyTerms,
            ".",
          ],
        },
      ],
    },

    {
      id: "accounts",
      heading: "3. Accounts",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This website has no accounts and no login. You do not create one to browse it or to send us an enquiry.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The Omanga wallet is a separate service, operated by ",
            WALLET_PROVIDER_NAME,
            " and hosted at ",
            { text: WALLET_URL, href: WALLET_URL, isExternal: true },
            ". If you open a wallet there, you create an account on that platform and Fuspay's own terms govern it, including its rules on account security and closure. Keeping those credentials safe is your responsibility, and we ask you never to send them to us — we will never ask you for a password.",
          ],
        },
      ],
    },

    {
      id: "what-we-provide",
      heading: "4. What this website provides",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This website describes our services, sets out insurance plans and their prices, and gives you ways to contact us and to reach the providers who deliver those services. It is an information and enquiry channel.",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "The wallet is opened and operated by Fuspay Technologies on a separate platform, which you reach by a link from this site.",
            ],
            [
              "Insurance plan payments are taken on Paystack's hosted checkout pages, which you reach by a link from this site. No payment is taken on omanga.biz.",
            ],
            [
              "Support conversations happen by email and on WhatsApp, using the details published on our ",
              LEGAL_LINKS.contact,
              ".",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Information on this site is provided for general guidance. Insurance cover, prices, country coverage and exchange rates can change, and the terms of a specific policy or a specific transaction always take precedence over a description on a web page. Nothing on this website is financial, insurance, legal or tax advice, and none of it is an offer that we are bound to accept.",
          ],
        },
        ...REGULATORY_STATUS_BLOCKS,
      ],
    },

    {
      id: "acceptable-use",
      heading: "5. Acceptable use",
      blocks: [
        {
          kind: "paragraph",
          content: ["You agree not to:"],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["use the site for any unlawful or fraudulent purpose"],
            [
              "submit false information, impersonate anyone, or send an enquiry on someone else's behalf without their permission",
            ],
            [
              "attempt to gain unauthorised access to the site, its servers, or any connected system",
            ],
            [
              "introduce malware, or otherwise interfere with the operation or security of the site",
            ],
            [
              "use automated means to flood our forms, scrape the site at a rate that burdens it, or circumvent our rate limiting",
            ],
            [
              "copy, republish or exploit the site's content commercially without our permission",
            ],
            [
              "use the site or our services in connection with money laundering, terrorist financing, sanctions evasion or any other financial crime",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "We may restrict or block access to the site where we reasonably believe it is being misused in any of these ways.",
          ],
        },
      ],
    },

    {
      id: "enquiries",
      heading: "6. Enquiries you send us",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "When you send us an enquiry, please give us accurate information and only submit someone else's details if you have their permission. We use what you send to reply to you, as described in our ",
            LEGAL_LINKS.privacy,
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Our forms are ordinary email enquiries. Do not send card numbers, passwords, identity documents or medical information through them. If your enquiry needs something sensitive, contact us first and we will tell you the right channel.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Sending an enquiry does not create cover, open a wallet, or oblige us to provide anything. It starts a conversation.",
          ],
        },
      ],
    },

    {
      id: "third-parties",
      heading: "7. Third-party services and links",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This site links to services we do not operate, including the Fuspay Technologies wallet platform, Paystack and WhatsApp, and can embed a map from Google if you allow functional cookies. When you use those services you are subject to their terms and their privacy policies, not ours.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "We are not responsible for the content, availability or practices of any third-party site, and a link is not an endorsement. Where a third party provides a regulated service, they are responsible for it and for their own compliance.",
          ],
        },
      ],
    },

    {
      id: "payments",
      heading: "8. Payments, fees and currency",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "No payment is taken on this website. Insurance plan prices are shown on our ",
            LEGAL_LINKS.plans,
            " and are charged by Paystack on its own checkout pages. Wallet funding, spending and any charges on it are governed by Fuspay Technologies' terms.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Where a price is displayed in a currency other than the one your card or account is denominated in, your bank or the payment provider will apply its own exchange rate and may add its own fee. We do not set or receive those, and the amount that leaves your account may therefore differ from the price shown here.",
          ],
        },
        {
          kind: "confirm",
          title: "Refund and cancellation policy in preparation",
          content: [
            "Omanga is writing a refund and cancellation policy. Until it is published, this section cannot state what a customer is entitled to on cancellation, and no page on this site should imply one. When it is ready it belongs in the ",
            LEGAL_LINKS.policyTerms,
            ", with this section pointing at it, and it must be consistent with the “No commitment · Cancel anytime” copy printed on every plan card.",
          ],
        },
      ],
    },

    {
      id: "intellectual-property",
      heading: "9. Intellectual property",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The content of this website — text, design, graphics, photographs, logos and the arrangement of them — belongs to Omanga or to our licensors, and is protected by copyright and trade mark law. The Omanga name and logo are ours; the names and logos of our partners belong to them and appear with permission.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "You may view, print and download extracts for your own personal use in deciding whether to use our services. You may not reproduce, republish, sell or commercially exploit any part of the site without our written permission.",
          ],
        },
      ],
    },

    {
      id: "availability",
      heading: "10. Availability of the site",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "We aim to keep the site available but we do not guarantee that it will be uninterrupted or error free. We may suspend, withdraw or change any part of it, and we will try to give notice where we reasonably can. We are not liable if the site is unavailable at any time.",
          ],
        },
      ],
    },

    {
      id: "disclaimers",
      heading: "11. Disclaimers",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The site and its content are provided as they are. To the extent the law allows, we exclude the implied warranties and conditions that would otherwise apply to it.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "We take care over the information published here, but we do not warrant that it is complete, current or free from error. Country coverage, plan prices, benefit levels and exchange rates change. Always check the actual policy documentation or the provider's own terms before relying on anything you read here.",
          ],
        },
      ],
    },

    {
      id: "liability",
      heading: "12. Our liability",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Nothing in these terms limits or excludes our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for anything else that the law does not allow us to limit or exclude.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Subject to that, we are not liable for loss of profit, loss of business, loss of anticipated savings, or any indirect or consequential loss arising out of your use of this website. We are not liable for loss or damage caused by a virus or other harmful material you pick up through your use of the site or a site we link to, or for the acts or omissions of a third-party provider.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Claims about an insurance policy or a wallet transaction are dealt with under the terms of that product and by the provider of it, not under these website terms.",
          ],
        },
        {
          kind: "confirm",
          title: "This section is being revised",
          content: [
            "Omanga is updating this section. It currently limits categories of loss but sets no monetary cap, because a cap should be set deliberately against the business's insurance and risk position rather than picked from a template. The revision should settle, with a Nigerian lawyer, whether a cap is appropriate and at what figure, and whether these exclusions are enforceable against consumers under the Federal Competition and Consumer Protection Act.",
          ],
        },
      ],
    },

    {
      id: "indemnity",
      heading: "13. Indemnity",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "You agree to indemnify us against any claim, loss or cost we suffer arising from your breach of these terms or your misuse of this website.",
          ],
        },
      ],
    },

    {
      id: "governing-law",
      heading: "14. Governing law and disputes",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Omanga operates from Lagos, Nigeria. These terms, and any dispute or claim arising out of them or out of your use of this website, are governed by the laws of the Federal Republic of Nigeria.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If something goes wrong, please raise it with us first through our ",
            LEGAL_LINKS.complaints,
            ". Most things are resolved that way and it costs you nothing.",
          ],
        },
        {
          kind: "confirm",
          title: "Jurisdiction and dispute resolution to be confirmed",
          content: [
            "Confirm with counsel which courts are to have jurisdiction, whether arbitration is preferred and under which rules, and how this interacts with the rights of consumers outside Nigeria who may be entitled to bring proceedings locally. Do not publish an exclusive jurisdiction clause without that advice — an unenforceable one is worse than none.",
          ],
        },
      ],
    },

    {
      id: "general",
      heading: "15. General",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "If any part of these terms is found to be unenforceable, the rest continues to apply.",
            ],
            [
              "If we do not enforce a term straight away, we do not lose the right to enforce it later.",
            ],
            [
              "You may not transfer your rights under these terms. We may transfer ours if our business is restructured or sold, and your rights will not be reduced by that.",
            ],
            [
              "These terms, together with the documents they refer to, are the whole agreement between us about your use of this website.",
            ],
          ],
        },
      ],
    },

    {
      id: "related-documents",
      heading: "16. Related documents",
      blocks: [...DOCUMENT_MAP_BLOCKS],
    },

    {
      id: "contact",
      heading: "17. Contact us",
      blocks: [
        ...CONTACT_BLOCKS,
        {
          kind: "paragraph",
          content: [
            "Questions about these terms can be sent to ",
            CONTACT_EMAIL_LINK,
            ".",
          ],
        },
      ],
    },

    {
      id: "legal-review",
      heading: "18. Status of this document",
      blocks: [
        {
          kind: "confirm",
          title: "This document has not been reviewed by a lawyer",
          content: [
            "It was drafted from an audit of what this website actually does, so its description of the service is accurate. It has not been reviewed by a qualified Nigerian lawyer and is not legal advice. The liability, indemnity and jurisdiction sections in particular need that review before these terms are relied on, together with every item marked for confirmation on this page.",
          ],
        },
      ],
    },
  ],
} as const;
