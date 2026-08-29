import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_URL } from "@/config/site";
import {
  CONTACT_BLOCKS,
  CONTACT_EMAIL_LINK,
  DOCUMENT_MAP_BLOCKS,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LINKS,
} from "@/content/legal/legal-shared.content";
import type { LegalDocumentContent } from "@/types/legal.types";

/**
 * The Complaints Procedure.
 *
 * ---------------------------------------------------------------------------
 * TIMESCALES
 *
 * A complaints procedure is largely made of numbers, and every one of them is an
 * operational commitment the business has to keep. The 24 to 48 hour turnaround
 * published here is the business's own standard, stated by the CEO, and applies
 * to every complaint regardless of what it is about.
 *
 * The section on what happens next therefore also says what we do when a
 * complaint cannot be closed in that window — tell the customer where it stands
 * within 48 hours. A single flat number with no overflow path is a promise that
 * breaks the first time a provider is slow, and breaking it is worse than never
 * having made it.
 *
 * ---------------------------------------------------------------------------
 * REGULATORY ESCALATION
 *
 * Three external bodies are named, one per kind of complaint: the NDPC for data
 * protection, NAICOM for insurance, and the CBN for payments. Each is named
 * because the provider it supervises is now named — Phillips HMO is a
 * NAICOM-regulated insurance provider, Fuspay Technologies is a CBN-licensed
 * microfinance bank — so the escalation route is a fact about a known entity
 * rather than a guess about an unknown one.
 *
 * Their contact routes are still marked outstanding. Naming the right regulator
 * is verifiable from the provider's licence; reproducing a regulator's complaints
 * address from memory is not, and a wrong address sends a customer with a real
 * complaint to an office that will turn them away.
 */

export const complaintsProcedureContent: LegalDocumentContent = {
  meta: {
    title: "Complaints Procedure | Omanga",
    description:
      "How to complain to Omanga about our service, an insurance claim or a payment — what to include, what happens next, and how to escalate.",
    path: "/complaints-procedure",
  },
  eyebrow: "Legal",
  title: "Complaints Procedure",
  summary:
    "If something has gone wrong, we want to hear about it and put it right. This page explains how to tell us, what we will do, and what to do if you are still not satisfied.",
  effectiveDate: LEGAL_EFFECTIVE_DATE,

  intro: [
    {
      kind: "note",
      title: "In an emergency, do not use this page",
      content: [
        "If you need urgent medical help while travelling, use the 24/7 emergency assistance line provided with your plan, or contact us on WhatsApp at ",
        { text: WHATSAPP_NUMBER_DISPLAY, href: WHATSAPP_URL, isExternal: true },
        ". A complaint can wait until you are safe.",
      ],
    },
  ],

  sections: [
    {
      id: "what-is-a-complaint",
      heading: "1. What counts as a complaint",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "A complaint is any expression of dissatisfaction with us or with a service we arranged, whether or not it is justified. You do not have to use the word “complaint”, and you do not have to be certain you are right.",
          ],
        },
        {
          kind: "paragraph",
          content: ["Complaints we handle include:"],
        },
        {
          kind: "list",
          style: "bullet",
          items: [
            ["the service you received from us, including how long something took"],
            ["information on this website that was wrong or misleading"],
            ["an insurance claim that was declined, delayed or underpaid"],
            ["a problem with a payment, a charge you did not expect, or a wallet transaction"],
            ["how we have handled your personal information"],
            ["the conduct of anyone acting for us"],
          ],
        },
        {
          kind: "note",
          title: "A question is not a complaint",
          content: [
            "If you simply need help or want to know something, use the form on our ",
            LEGAL_LINKS.contact,
            " or message us on WhatsApp. That is faster than this process, and most things are resolved that way.",
          ],
        },
      ],
    },

    {
      id: "how-to-complain",
      heading: "2. How to complain",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Email us at ",
            CONTACT_EMAIL_LINK,
            " and put the word “Complaint” at the start of your subject line, so it is recognised as one and routed correctly rather than joining the general enquiry queue.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "You can also raise it through the form on our ",
            LEGAL_LINKS.contact,
            " or on WhatsApp at ",
            { text: WHATSAPP_NUMBER_DISPLAY, href: WHATSAPP_URL, isExternal: true },
            ". If you start on WhatsApp we may ask you to put it in writing by email, so there is a clear record for both of us.",
          ],
        },
        {
          kind: "note",
          title: "One address for every escalation",
          content: [
            "Whatever your complaint is about — our service, a claim, a payment or your personal information — it goes to ",
            CONTACT_EMAIL_LINK,
            ". You do not need to work out who handles what. We route it internally and, where a provider is involved, we take it to them.",
          ],
        },
      ],
    },

    {
      id: "what-to-include",
      heading: "3. What to tell us",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "The more of this you can give us at the start, the less we have to come back for and the faster we can deal with it.",
          ],
        },
        {
          kind: "list",
          style: "number",
          items: [
            ["Your name and the email address or phone number we should reply to."],
            [
              "Your policy or plan details if your complaint is about insurance, or the transaction date and amount if it is about a payment.",
            ],
            ["What happened, and when."],
            ["What went wrong, from your point of view."],
            ["What you would like us to do to put it right."],
            ["Copies of anything relevant — emails, receipts, screenshots, claim correspondence."],
          ],
        },
        {
          kind: "note",
          title: "Please do not send full card numbers",
          content: [
            "The last four digits and the date and amount are enough for us to find a transaction. If we need anything more sensitive we will tell you how to send it securely.",
          ],
        },
      ],
    },

    {
      id: "what-happens-next",
      heading: "4. What happens next",
      blocks: [
        {
          kind: "paragraph",
          content: ["Every complaint goes through the same four stages."],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "1. Acknowledgement",
              description: [
                "We confirm we have your complaint, tell you who is dealing with it, and give you a reference to quote.",
              ],
            },
            {
              term: "2. Investigation",
              description: [
                "We look into what happened. That means reading the correspondence, checking our records, and — where the complaint concerns a claim, a payment or the wallet — raising it with the provider concerned and pressing them for an answer. If we need anything further from you we will ask once, clearly.",
              ],
            },
            {
              term: "3. Our response",
              description: [
                "We write to you with what we found, whether we uphold your complaint, and what we are doing about it. If we do not uphold it, we explain why in terms you can check rather than simply asserting the outcome.",
              ],
            },
            {
              term: "4. Review",
              description: [
                "If you are not satisfied, tell us and someone not involved in the original decision reviews it. That review is our final response.",
              ],
            },
          ],
        },
        {
          kind: "note",
          title: "How long this takes",
          content: [
            "We handle complaints within 24 to 48 hours. That is our standard turnaround from the moment your complaint reaches us to the moment you have our answer, and it applies whether the complaint is about us or about a provider we have to raise it with.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If something genuinely cannot be resolved in that time — because a provider has not come back to us, or because a claim decision needs to be re-examined — we will tell you within 48 hours where it stands, what is holding it up and when you will hear from us next. You will not be left waiting without an update.",
          ],
        },
      ],
    },

    {
      id: "third-party-complaints",
      heading: "5. Complaints about a provider rather than about us",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Some of what we arrange is delivered by other organisations. Claim decisions are made by Phillips HMO, the wallet is run by Fuspay Technologies, and card payments are taken by Paystack. Where the decision was not ours, we cannot overturn it — but you should still come to us, and the two routes below are how it works in practice.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "In both cases we stay involved until it is resolved. We chase for an answer, tell you what we are told, and tell you plainly if we think the provider has got it wrong.",
          ],
        },
      ],
      subsections: [
        {
          id: "insurance-complaints",
          heading: "5.1 Insurance and claims",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "If your claim has been declined or you disagree with how it was settled, tell us what you were told and send us any correspondence you have.",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "Insurance complaints go directly to Phillips HMO, who provide the cover and made the decision, with Omanga in the loop throughout. We put the complaint in front of them, ask them to explain their decision against the policy wording, and follow it until you have an answer. You are not passed over to them and left there.",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "Phillips HMO is regulated by the National Insurance Commission (NAICOM). If you are not satisfied once Phillips HMO has given its final answer, you can take the matter to NAICOM.",
              ],
            },
            {
              kind: "confirm",
              title: "NAICOM contact route to be added",
              content: [
                "NAICOM is the correct regulator for Phillips HMO and can be named. Its complaints contact route — the address, the online form and any deadline for bringing a complaint to it — should be verified against NAICOM's own published material and added here, so a customer at the end of our process has somewhere specific to go rather than a regulator's name.",
              ],
            },
          ],
        },
        {
          id: "payment-complaints",
          heading: "5.2 Payments and the wallet",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "For a payment or wallet transaction that failed, was taken twice or was for the wrong amount, send us the date, the amount and the last four digits of the card. Do not go to Fuspay Technologies yourself — bring it to us.",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "Payment complaints follow a single route: you come to Omanga, we take it to Fuspay Technologies, Fuspay comes back to us, and we come back to you. We hold the thread the whole way, so you deal with one organisation rather than being handed between two.",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "Fuspay Technologies is a microfinance bank licensed by the Central Bank of Nigeria. If you are not satisfied once we have brought you Fuspay's answer, the CBN operates a consumer complaints route in respect of the institutions it licenses, and you can use it.",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "You can also contact your own bank or card issuer, which has its own dispute process and its own deadlines. Doing that does not stop us investigating.",
              ],
            },
            {
              kind: "confirm",
              title: "CBN complaints contact route to be added",
              content: [
                "The CBN is the correct regulator for Fuspay Technologies and can be named. Its consumer protection complaints route — the address, the online portal and the requirement that a customer complain to the institution first — should be verified against the CBN's own published material and added here.",
              ],
            },
          ],
        },
        {
          id: "privacy-complaints",
          heading: "5.3 Personal information",
          blocks: [
            {
              kind: "paragraph",
              content: [
                "If your complaint is about how we have handled your personal information, please raise it with us first so we can put it right. Our ",
                LEGAL_LINKS.privacy,
                " explains what we collect and the rights you have.",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "You can complain to the Nigeria Data Protection Commission at any time, and you do not have to come to us first. The Commission is the regulator established under the Nigeria Data Protection Act 2023 and publishes its contact details at ",
                {
                  text: "ndpc.gov.ng",
                  href: "https://ndpc.gov.ng/",
                  isExternal: true,
                },
                ".",
              ],
            },
            {
              kind: "paragraph",
              content: [
                "If you are outside Nigeria, your own national data protection authority may also be able to help you.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "final-response",
      heading: "6. Our final response",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Our final response sets out our conclusion, our reasons, and anything we are offering to put things right. It will say clearly that it is our final response, so you are not left wondering whether more is coming, and it will tell you what you can do next if you disagree.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Reaching the end of our process does not take away any legal right you have. You remain free to take the matter to a regulator or to court.",
          ],
        },
      ],
    },

    {
      id: "how-we-treat-you",
      heading: "7. How we will treat you",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "We will deal with your complaint within 24 to 48 hours, which is our standard turnaround for every complaint we receive.",
            ],
            ["We will not charge you for making a complaint."],
            [
              "Complaining will not affect your cover, your wallet or how we deal with you afterwards.",
            ],
            [
              "We will handle what you tell us in line with our ",
              LEGAL_LINKS.privacy,
              ", and share it with a provider only where that is necessary to investigate.",
            ],
            [
              "If you need to complain in a different way because of a disability or because writing is difficult for you, tell us and we will find a way that works.",
            ],
          ],
        },
      ],
    },

    {
      id: "related-documents",
      heading: "8. Related documents",
      blocks: [...DOCUMENT_MAP_BLOCKS],
    },

    {
      id: "contact",
      heading: "9. Contact us",
      blocks: [...CONTACT_BLOCKS],
    },

    {
      id: "legal-review",
      heading: "10. Status of this document",
      blocks: [
        {
          kind: "confirm",
          title: "Regulator contact details are outstanding",
          content: [
            "The stages of this procedure, the 24 to 48 hour turnaround and the escalation routes for insurance and payments are all set out and usable. What is still missing is the contact route for each regulator — NAICOM for Phillips HMO and the CBN for Fuspay Technologies — which should be verified against their own published material rather than reproduced from memory. This document should be reviewed by a qualified Nigerian practitioner alongside the Policy Terms.",
          ],
        },
      ],
    },
  ],
} as const;
