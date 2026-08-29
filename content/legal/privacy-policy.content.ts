import { WALLET_URL } from "@/config/site";
import {
  COMPANY_IDENTITY_CONFIRM,
  CONTACT_BLOCKS,
  CONTACT_EMAIL_LINK,
  DOCUMENT_MAP_BLOCKS,
  LEGAL_EFFECTIVE_DATE,
  INSURANCE_PROVIDER_NAME,
  LEGAL_LINKS,
  MINIMUM_AGE_BLOCK,
  PRIVACY_CONTACT_CONFIRM,
  REGULATORY_STATUS_BLOCKS,
  WALLET_PROVIDER_NAME,
} from "@/content/legal/legal-shared.content";
import type { LegalDocumentContent } from "@/types/legal.types";

/**
 * The Privacy Policy.
 *
 * ---------------------------------------------------------------------------
 * SCOPE, WHICH IS THE MOST IMPORTANT DECISION IN THIS DOCUMENT
 *
 * This policy covers omanga.biz and the enquiries it receives. It does not
 * pretend to cover the wallet or the insurance checkout, and that is a finding of
 * the audit rather than a limitation of effort:
 *
 *   - There is no account system, no login and no user database in this
 *     application. Nothing here stores a customer record.
 *   - The wallet lives at a different origin entirely, on a platform Omanga does
 *     not operate. Every "open a wallet" call to action leaves this site.
 *   - Insurance is paid for on Paystack's own hosted pages. No card details ever
 *     reach this application, and there is no payment code in it to receive them.
 *   - The two forms deliver one email to a Zoho mailbox and write nothing to any
 *     store. `app/api/enquiry/route.ts` is explicit: "No CRM, no database, no
 *     third-party form service, no newsletter list."
 *
 * The template version of this document would describe KYC verification, account
 * balances, transaction histories and card data, because that is what a fintech
 * privacy policy usually describes. Every one of those sentences would be false
 * of this website. A policy that over-claims its own processing is not a cautious
 * policy — it misdescribes who holds what, which is the single thing a data
 * subject uses it to work out where to send a request.
 *
 * So the document says clearly what this site does, and says just as clearly that
 * the wallet and the checkout are separate services with separate controllers,
 * and that their policies govern there. Those controllers are now named — Fuspay
 * Technologies for the wallet and Phillips HMO for the insurance — with the
 * regulator that authorises each. Their licence numbers remain marked as
 * outstanding, because a number is either verified or invented.
 *
 * ---------------------------------------------------------------------------
 * ON NAMING LAWS
 *
 * The NDPA 2023 and the NDPC are stated as applying, which is safe: Omanga
 * operates from Lagos and processes personal data in Nigeria. Section references
 * (ss. 24–27 for principles and lawful bases, ss. 34–38 for data subject rights)
 * were verified against the NDPC's own published description of the Act.
 *
 * The GDPR is deliberately NOT claimed as applying. Article 3(2) turns on whether
 * Omanga *intends* to offer services to people in the EU or UK, which is a
 * business fact this codebase cannot establish — the site is in English, prices
 * are in dollars, and the audience is travellers to Africa, all of which is
 * consistent with either answer. The document therefore describes the position
 * accurately and flags it for counsel, rather than either asserting compliance
 * with a regime whose obligations have not been implemented, or denying the
 * application of a law that may well bite.
 */

export const privacyPolicyContent: LegalDocumentContent = {
  meta: {
    title: "Privacy Policy | Omanga",
    /*
      Held under 165 characters so Google does not truncate it mid-sentence. The
      longer version ran to 181 and was cut at "the third parties who prov…",
      which loses the clause that makes the sentence worth reading.
    */
    description:
      "How Omanga collects, uses and protects your personal information on omanga.biz — our enquiry forms, cookies, and the third parties we work with.",
    path: "/privacy-policy",
  },
  eyebrow: "Legal",
  title: "Privacy Policy",
  summary:
    "This policy explains what personal information we collect when you use omanga.biz, why we collect it, who we share it with, and the rights you have over it.",
  effectiveDate: LEGAL_EFFECTIVE_DATE,

  intro: [
    {
      kind: "paragraph",
      content: [
        "Omanga presents travel payment and holiday insurance services for travel across Africa. This website is where we describe those services and where you can get in touch with us about them.",
      ],
    },
    {
      kind: "note",
      title: "What this policy covers, and what it does not",
      content: [
        "This policy covers this website and the enquiries you send us through it. It does not cover the Omanga wallet, which runs on a separate platform at a different web address, or insurance payments, which are taken on Paystack's own pages. Those services collect information directly from you under their own privacy policies. Section 6 explains this in detail.",
      ],
    },
    COMPANY_IDENTITY_CONFIRM,
  ],

  sections: [
    {
      id: "who-we-are",
      heading: "1. Who we are",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Omanga is a destination services business based in Lagos, Nigeria. We present two things to travellers: a multi-currency travel wallet, which we call Omanga Payment Solutions, and short-term holiday health insurance for travel across Africa.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "For the information described in this policy, Omanga is the data controller — we decide why it is collected and what happens to it. Where a third party collects information directly from you on their own service, they are the controller for that information, not us.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "You can contact us about anything in this policy at ",
            CONTACT_EMAIL_LINK,
            ".",
          ],
        },
        PRIVACY_CONTACT_CONFIRM,
      ],
    },

    {
      id: "information-we-collect",
      heading: "2. Information we collect",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "We collect far less than a payments or insurance website usually does, because this site does not have accounts, does not process payments and does not store customer records. In practice there are three sources.",
          ],
        },
      ],
      subsections: [
        {
          id: "information-you-give-us",
          heading: "2.1 Information you give us in a form",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "Two forms on this site collect information. Neither creates an account and neither takes a payment.",
              ],
            },
            {
              kind: "definitions",
              items: [
                {
                  term: "The Get Started enquiry form",
                  description: [
                    "Your name and email address, both required, and optionally the destination you are travelling to and a short note about what you need.",
                  ],
                },
                {
                  term: "The Talk to us form on our Contact page",
                  description: [
                    "Your name, email address, the topic of your enquiry, whether you are an existing customer, and your message — all required. Optionally your WhatsApp number, the country you are contacting us from, and, if your enquiry is about a partnership or a business matter, your company or organisation and your role. You also tick a box confirming you are happy for us to reply.",
                  ],
                },
              ],
            },
            {
              kind: "paragraph",
              content: [
                "Please do not send us medical details, identity document numbers, card numbers or other sensitive information through these forms. They are ordinary email enquiries and are not the right channel for it. If you need to send something sensitive in connection with an insurance claim or a payment, contact us first and we will tell you where it should go.",
              ],
            },
          ],
        },
        {
          id: "information-collected-automatically",
          heading: "2.2 Information collected automatically",
          blocks: [
            {
              kind: "definitions",
              items: [
                {
                  term: "Technical request data",
                  description: [
                    "Like every website, ours receives your IP address, browser type and the page you requested, because a web request cannot be delivered without them. Our hosting provider processes these to serve the page and to keep the service secure.",
                  ],
                },
                {
                  term: "Anti-abuse counting",
                  description: [
                    "When you submit an enquiry form, we count submissions against your IP address in the server's memory for one hour, to stop automated flooding of the form. The count is held in memory only, is not written to any database, and disappears when the server process restarts.",
                  ],
                },
                {
                  term: "Performance measurement",
                  description: [
                    "If you allow analytics cookies, we measure how quickly pages load. This does not set a cookie and stores nothing on your device. See our ",
                    LEGAL_LINKS.cookies,
                    " for exactly what it collects.",
                  ],
                },
              ],
            },
            {
              kind: "paragraph",
              content: [
                "We do not use advertising trackers, session recording, heatmaps, cross-site tracking pixels or any social media tracking on this website.",
              ],
            },
          ],
        },
        {
          id: "information-we-do-not-collect",
          heading: "2.3 Information we do not collect on this website",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "Being specific about this is more useful than a long list of what we might collect. On omanga.biz we do not collect or hold:",
              ],
            },
            {
              kind: "list",
              style: "bullet",
              items: [
                ["account usernames or passwords — this site has no login"],
                [
                  "card numbers or bank details — no payment is taken on this site",
                ],
                [
                  "identity or KYC documents — no verification happens on this site",
                ],
                ["wallet balances or transaction histories"],
                ["medical information or insurance claim records"],
                [
                  "precise location data — we do not use the browser's location feature",
                ],
              ],
            },
            {
              kind: "note",
              title: "Where that information does get collected",
              content: [
                "Some of it is collected by Fuspay Technologies and Phillips HMO when you use their services. That happens on their systems under their policies, not here. Section 6 sets out what each of them does.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "how-we-use",
      heading: "3. How we use your information",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "To reply to your enquiry and to have the conversation you started.",
            ],
            [
              "To pass you to the right person internally — the topic you select is used for this and nothing else.",
            ],
            [
              "To keep this website working, available and secure, including protecting the forms from automated abuse.",
            ],
            [
              "To understand which pages are slow, if you have allowed analytics.",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "We do not sell your personal information. We do not share it with third parties for their own marketing. We do not use it to build a profile of you, and we do not make any decision about you by automated means.",
          ],
        },
        {
          kind: "note",
          title: "Marketing",
          content: [
            "Our Contact page describes an option to receive travel alerts and Omanga updates by email. If you ask for these, we will use your email address to send them and you can stop them at any time by replying or emailing us. We will not add you to a mailing list because you sent us an unrelated enquiry.",
          ],
        },
      ],
    },

    {
      id: "lawful-basis",
      heading: "4. Our lawful basis for using it",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Nigerian data protection law requires us to have a lawful basis for each use of your personal data. Ours are as follows.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Consent",
              description: [
                "For optional cookies and embedded content, and for marketing emails. You give it by an affirmative act and can withdraw it at any time, as easily as you gave it.",
              ],
            },
            {
              term: "Legitimate interests",
              description: [
                "For answering the enquiry you chose to send us, and for keeping this website secure and available. Our interest is in running the business and protecting the site; we consider this does not override your rights, because you initiated the contact and the information is used only to respond to it.",
              ],
            },
            {
              term: "Steps prior to entering a contract",
              description: [
                "Where your enquiry is a step towards buying a policy or opening a wallet, we handle it on that basis.",
              ],
            },
            {
              term: "Legal obligation",
              description: [
                "Where we are required to keep or disclose information by law.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "how-long",
      heading: "5. How long we keep it",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "We keep personal data no longer than we need it, and we follow the retention periods set out in Nigerian data protection law — the Nigeria Data Protection Act 2023 and the retention schedule in the NDPR Implementation Framework.",
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Enquiries that do not lead to a purchase",
              description: [
                "Kept for up to three years from your last contact with us, which is the period Nigerian data protection law allows for records of activity on a digital platform. We delete them at the end of that period.",
              ],
            },
            {
              term: "Enquiries and correspondence connected to a policy or a wallet",
              description: [
                "Kept for up to six years after the last transaction in the relationship, which is the period Nigerian data protection law allows for records under a contract, and which also covers the time within which a claim or a dispute may be brought.",
              ],
            },
            {
              term: "Records we are required to keep by law",
              description: [
                "Kept for whatever period the relevant law or a court order requires, and deleted afterwards.",
              ],
            },
            {
              term: "The anti-abuse counter described in section 2.2",
              description: [
                "Discarded within an hour and never written to any store.",
              ],
            },
            {
              term: "Your cookie choice",
              description: [
                "Stays in your own browser until you clear it or change it. We do not hold a copy.",
              ],
            },
          ],
        },
        {
          kind: "paragraph",
          content: [
            "You can ask us to delete your information sooner. Section 9 explains how, and we will do it unless a law requires us to keep it.",
          ],
        },
      ],
    },

    {
      id: "who-we-share-with",
      heading: "6. Who we share your information with",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "We do not sell or rent your information. We share it in only two ways: with the suppliers who run parts of this website for us, and with the providers who deliver the wallet and insurance services when you choose to use them.",
          ],
        },
      ],
      subsections: [
        {
          id: "our-suppliers",
          heading: "6.1 Suppliers who process information for us",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "These companies process information on our instructions, to run this website. This is the complete list as at the effective date of this policy.",
              ],
            },
            {
              kind: "definitions",
              items: [
                {
                  term: "Vercel",
                  description: [
                    "Hosts this website and delivers its pages. Processes the technical request data described in section 2.2, and, if you allow analytics, the page performance measurements.",
                  ],
                },
                {
                  term: "Zoho",
                  description: [
                    "Provides our business email. Enquiries you submit through our forms are delivered to, and stored in, a Zoho mailbox.",
                  ],
                },
                {
                  term: "Google",
                  description: [
                    "Provides the map on our Contact page. The map is not loaded unless you allow functional cookies. If you do, your browser connects to Google, which can set its own cookies and will receive your IP address. See our ",
                    LEGAL_LINKS.cookies,
                    ".",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "service-providers",
          heading: "6.2 Providers of the wallet and insurance services",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "When you follow a link from this site to open a wallet or to buy a policy, you leave omanga.biz. The information you enter there is collected by that provider, on their systems, under their privacy policy — not by this website.",
              ],
            },
            {
              kind: "definitions",
              items: [
                {
                  term: WALLET_PROVIDER_NAME,
                  description: [
                    "Operates the Omanga wallet, whose sign-up is hosted at ",
                    { text: WALLET_URL, href: WALLET_URL, isExternal: true },
                    ". Any account details, identity verification and transaction information you provide are collected by Fuspay Technologies there, under its own privacy policy.",
                  ],
                },
                {
                  term: INSURANCE_PROVIDER_NAME,
                  description: [
                    "Provides the holiday health insurance. The details you give when cover is arranged, and any medical information connected to a claim, are held by Phillips HMO as the provider of the cover, under its own privacy policy.",
                  ],
                },
                {
                  term: "Paystack",
                  description: [
                    "Takes insurance plan payments on its own hosted checkout pages. Your card details are entered on Paystack's page and are given to Paystack, not to us. We never see or store them.",
                  ],
                },
              ],
            },
            ...REGULATORY_STATUS_BLOCKS,
          ],
        },
        {
          id: "other-disclosures",
          heading: "6.3 Other disclosures",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "We may disclose information where we are required to by law, by a court, or by a regulator, and where it is necessary to establish, exercise or defend a legal claim. If our business is restructured or transferred, information may pass to the receiving organisation, which would remain bound by this policy.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "international-transfers",
      heading: "7. Where your information is held",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Your wallet and insurance data is processed in Nigeria. Omanga operates from Lagos, and both providers — Fuspay Technologies and Phillips HMO — are Nigerian regulated institutions processing that information in Nigeria. Your account details, identity verification, transaction records, policy details and claim information do not leave the country.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The technical suppliers who run this website operate internationally, so the limited website data described in section 2.2 — your IP address, browser type, the page you requested and, if you allow it, page performance measurements — and the enquiry emails held in our mailbox may be processed outside Nigeria, including in the United States and Europe.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The Nigeria Data Protection Act 2023 restricts transfers of personal data out of Nigeria and requires an appropriate legal ground for each one. For those website suppliers we rely on the contractual protections in our agreements with them.",
          ],
        },
        {
          kind: "confirm",
          title: "Transfer basis for website suppliers to be confirmed",
          content: [
            "The position on the wallet and insurance providers is settled: both process in Nigeria. Still to confirm, for each supplier named in section 6.1, is the country the data is processed in and the transfer ground under the NDPA being relied on. Do not publish a statement that appropriate safeguards are in place until it has been checked against the actual contracts.",
          ],
        },
      ],
    },

    {
      id: "security",
      heading: "8. How we protect it",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "This website is served only over an encrypted HTTPS connection, so what you type into a form is encrypted in transit.",
            ],
            [
              "Enquiries are delivered over an authenticated, encrypted connection to our mail provider.",
            ],
            [
              "Form submissions are validated on the server and rate limited, to reduce abuse.",
            ],
            [
              "Access to the enquiry mailbox is limited to staff who need it, and is protected by the mail provider's authentication.",
            ],
            [
              "The site holds no customer database, which removes an entire category of risk: there is no store of customer records here to be breached.",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "No method of transmission or storage is completely secure, and we cannot guarantee absolute security. If a breach affects your personal information and is likely to result in a risk to your rights, we will notify the Nigeria Data Protection Commission and, where the law requires it, you.",
          ],
        },
      ],
    },

    {
      id: "your-rights",
      heading: "9. Your rights",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Under the Nigeria Data Protection Act 2023 (sections 34 to 38) you have the following rights over personal data we hold about you.",
          ],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["To be told what personal data we hold about you and to get a copy of it."],
            ["To have inaccurate information corrected."],
            ["To have information deleted, where there is no good reason for us to keep it."],
            ["To object to, or ask us to restrict, our use of it."],
            ["To receive information you gave us in a portable format."],
            ["To withdraw consent at any time, where we relied on your consent."],
            ["To complain to the Nigeria Data Protection Commission."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "To exercise any of these, email us at ",
            CONTACT_EMAIL_LINK,
            " and tell us what you want to do. We will not charge you, and we will ask you for enough information to be confident of who you are before we act — which is a protection for you, not an obstacle.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "We will respond to your request within 24 hours of receiving it.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If you are unhappy with how we have handled a privacy request, please use our ",
            LEGAL_LINKS.complaints,
            " first so we have a chance to put it right. You can complain to the Nigeria Data Protection Commission at any point — you do not have to come to us first. The Commission publishes its contact details at ",
            {
              text: "ndpc.gov.ng",
              href: "https://ndpc.gov.ng/",
              isExternal: true,
            },
            ".",
          ],
        },
      ],
    },

    {
      id: "cookies",
      heading: "10. Cookies",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This website uses a small number of cookies and similar technologies. Nothing optional runs until you allow it, and you can change your choice at any time. Our ",
            LEGAL_LINKS.cookies,
            " lists every one of them individually and explains how to control them.",
          ],
        },
      ],
    },

    {
      id: "childrens-privacy",
      heading: "11. Children",
      blocks: [
        MINIMUM_AGE_BLOCK,
        {
          kind: "paragraph",
          content: [
            "This website is intended for adults and we do not knowingly collect personal information from anyone under 18 through it. Where a parent or guardian arranges cover or a transaction for a minor, they give consent to our processing of that minor's information on their behalf, and we may ask them to confirm it.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If you believe a minor has sent us personal information through this site without that consent, contact us at ",
            CONTACT_EMAIL_LINK,
            " and we will delete it.",
          ],
        },
      ],
    },

    {
      id: "other-sites",
      heading: "12. Links to other websites",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This site links out to the Fuspay Technologies wallet platform, to Paystack, to WhatsApp and, if you allow it, embeds a map from Google. We are not responsible for the privacy practices of any of them. Read their policies before giving them your information.",
          ],
        },
      ],
    },

    {
      id: "changes",
      heading: "13. Changes to this policy",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "We will update this policy when what we do changes. The effective date at the top of the page tells you which version you are reading. If a change materially affects how we use your information, we will make that clear on the site rather than relying on a silent update, and where the change requires your consent we will ask for it again.",
          ],
        },
      ],
    },

    {
      id: "related-documents",
      heading: "14. Related documents",
      blocks: [...DOCUMENT_MAP_BLOCKS],
    },

    {
      id: "contact",
      heading: "15. Contact us",
      blocks: [
        ...CONTACT_BLOCKS,
        {
          kind: "paragraph",
          content: [
            "Please mark privacy requests clearly, for example by starting your subject line with “Privacy request”, so we can route them quickly.",
          ],
        },
      ],
    },

    {
      id: "legal-review",
      heading: "16. Status of this document",
      blocks: [
        {
          kind: "confirm",
          title: "This document has not been reviewed by a lawyer",
          content: [
            "It was drafted from an audit of what this website and its code actually do, so its description of our processing is accurate. It is not legal advice and has not been reviewed by a qualified Nigerian data protection practitioner. Before it is relied on, it needs that review — in particular on whether Omanga must register with the Nigeria Data Protection Commission as a data controller of major importance, on the transfer grounds in section 7, and on whether the UK or EU GDPR applies to Omanga because of the travellers it markets to. Every item marked for confirmation on this page must also be resolved.",
          ],
        },
      ],
    },
  ],
} as const;
