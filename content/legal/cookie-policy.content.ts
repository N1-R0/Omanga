import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
} from "@/lib/consent";
import {
  CONTACT_BLOCKS,
  DOCUMENT_MAP_BLOCKS,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LINKS,
} from "@/content/legal/legal-shared.content";
import type { LegalDocumentContent } from "@/types/legal.types";

/**
 * The Cookie Policy.
 *
 * ---------------------------------------------------------------------------
 * THE INVENTORY IS THE AUDIT, NOT A TEMPLATE
 *
 * Every row in the table below was established by inspecting the live site and
 * the dependencies, and the finding is unusual enough to be worth stating
 * plainly: omanga.biz sets no cookies of its own at all. `document.cookie` is
 * empty on every page, `localStorage` and `sessionStorage` were empty before this
 * consent system existed, and the only script on the page that is not the
 * application's own bundle is Vercel Speed Insights — which was audited to
 * confirm it touches no browser storage of any kind.
 *
 * The temptation with a document like this is to list the cookies a site of this
 * type usually has: a session cookie, a CSRF token, a Google Analytics `_ga`
 * pair, a Meta `_fbp`. None of them exists here. Listing them would be inventing
 * tracking to describe, which is both false and, on a page whose only job is to
 * be an accurate inventory, self-defeating.
 *
 * So the table has three entries, one of which is a browser-storage item rather
 * than a cookie and one of which belongs to Google rather than to us. That is the
 * complete and accurate picture, and the policy says so.
 *
 * ---------------------------------------------------------------------------
 * ON GOOGLE'S COOKIE NAMES
 *
 * The map embed loads from `maps.google.com`, so any cookies it sets belong to a
 * Google domain and cannot be read from this origin — which is precisely why they
 * are a third-party concern. The specific names and lifetimes are Google's to
 * define and change, so the row describes the category and points at Google's own
 * documentation rather than asserting a list of names and durations that would be
 * a guess and would go stale.
 */

const CONSENT_STORAGE_DESCRIPTION =
  "Remembers the cookie choice you made, so we can honour it and so you are not asked again on every page.";

export const cookiePolicyContent: LegalDocumentContent = {
  meta: {
    title: "Cookie Policy | Omanga",
    description:
      "Every cookie and storage technology used on omanga.biz, what each one does, and how to control them. Our site sets no tracking cookies.",
    path: "/cookie-policy",
  },
  eyebrow: "Legal",
  title: "Cookie Policy",
  summary:
    "This policy lists every cookie and similar technology used on omanga.biz, what each one is for, and how you can control them.",
  effectiveDate: LEGAL_EFFECTIVE_DATE,

  intro: [
    {
      kind: "note",
      title: "The short version",
      content: [
        "This website sets no cookies of its own and uses no advertising or tracking cookies. It stores one item in your browser to remember your cookie choice. Two optional things — a Google map and anonymous page-speed measurement — do not run at all unless you allow them.",
      ],
    },
  ],

  sections: [
    {
      id: "what-are-cookies",
      heading: "1. What cookies and similar technologies are",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "A cookie is a small text file that a website asks your browser to store and sends back to that website on later visits. Related technologies do a similar job in a different way — local storage keeps data in your browser but never sends it anywhere automatically, and an embedded frame from another company lets that company set its own cookies from inside our page.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "The distinction that matters for your privacy is not the technology but who it belongs to. A first-party item is set by omanga.biz and only we can read it. A third-party item is set by another company from inside our page, and it is readable by them across other sites that embed them too.",
          ],
        },
      ],
    },

    {
      id: "what-we-use",
      heading: "2. What this website uses",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This is the complete list as at the effective date of this policy. It is short because this site does not use analytics cookies, advertising networks, social media pixels, session recording or cross-site tracking of any kind.",
          ],
        },
        {
          kind: "cookieTable",
          caption:
            "Cookies and storage technologies used on omanga.biz, with provider, purpose, category, duration and whether consent is required",
          rows: [
            {
              name: CONSENT_STORAGE_KEY,
              provider: "Omanga (first party, browser local storage)",
              purpose: CONSENT_STORAGE_DESCRIPTION,
              category: "Strictly necessary",
              duration:
                "Until you clear it or change your choice. Not automatically expired.",
              consent: "No — it records your choice",
            },
            {
              name: "Google Maps embed cookies",
              provider: "Google (third party, set on Google domains)",
              purpose:
                "Set by Google when the map on our Contact page is loaded, for Google's own purposes including preferences, security and abuse prevention.",
              category: "Functional",
              duration:
                "Set and controlled by Google. We cannot read, set or delete them.",
              consent: "Yes — the map is not loaded until you allow it",
            },
            {
              name: "Vercel Speed Insights",
              provider: "Vercel (first party path, no cookie set)",
              purpose:
                "Measures how quickly pages load and reports the timings with the page address. Sets no cookie and stores nothing on your device.",
              category: "Analytics",
              duration:
                "No storage on your device. Nothing is kept in your browser.",
              consent: "Yes — the script is not loaded until you allow it",
            },
          ],
        },
        {
          kind: "note",
          title: "Why one row says “no cookie”",
          content: [
            "We include Vercel Speed Insights in this table even though it sets no cookie, because it is a measurement tool that contacts a third party and you should be able to see it and turn it off. We think a cookie policy that only listed literal cookies would be hiding it on a technicality.",
          ],
        },
      ],
    },

    {
      id: "categories",
      heading: "3. The categories we use",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Strictly necessary",
              description: [
                "Needed for the site to work and be secure. This category cannot be switched off, because it includes the record of your own cookie choice — switching it off would mean forgetting that you said no.",
              ],
            },
            {
              term: "Functional",
              description: [
                "Content embedded from another company. On this site that is the Google map on our Contact page and nothing else. Refuse this and the map is never loaded; our address is still shown as text.",
              ],
            },
            {
              term: "Analytics",
              description: [
                "Anonymous measurement of page performance. Refuse this and the measurement script is never loaded. Nothing else about the site changes.",
              ],
            },
            {
              term: "Marketing",
              description: [
                "Advertising and cross-site tracking. We do not use any today. The control exists so that if we ever add one, it cannot run before you have agreed to it. If that changes, this policy will be updated and you will be asked again.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "your-choice",
      heading: "4. How your choice is recorded",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "When you make a choice in our cookie banner, we save it in your browser's local storage. It holds which categories you allowed, the date and time you decided, and a version number for this notice — currently version ",
            String(CONSENT_VERSION),
            ". It contains no name, no email address and no identifier, and it is never sent to our servers.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "If we later change what a category covers, we increase that version number. Your old choice is then treated as out of date and you are asked again, because a decision you made about a different set of facts is not consent to the new ones.",
          ],
        },
        {
          kind: "note",
          title: "If nothing is stored",
          content: [
            "Because the record lives in your browser, clearing your site data, using private browsing, or switching browser or device means we no longer know your choice and will ask again. Until you answer, everything optional stays off.",
          ],
        },
      ],
    },

    {
      id: "managing",
      heading: "5. How to change or withdraw your choice",
      blocks: [
        {
          kind: "list",
          style: "bullet",
          items: [
            [
              "Use the “Cookie preferences” link in the footer of any page on this site. It reopens the same controls you saw first time, and you can change any category or withdraw consent entirely.",
            ],
            [
              "Withdrawing is exactly as easy as giving — one link, one press, no form and no email.",
            ],
            [
              "Your browser can also block or delete cookies for all websites. Every major browser has this in its privacy or site data settings, and each one publishes instructions.",
            ],
            [
              "Clearing this site's storage in your browser removes our record of your choice and returns you to being asked again.",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Blocking strictly necessary storage through your browser will not break this site, but it does mean we cannot remember your cookie choice, so the banner will appear on every visit.",
          ],
        },
      ],
    },

    {
      id: "third-party-cookies",
      heading: "6. Third-party cookies",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Google is the only third party that can set cookies through this website, and only on our Contact page, and only if you allow functional cookies. Because those cookies are set on Google's own domains, we cannot read them, change them or delete them — only Google and you can. Google explains what it sets and how to control it in its own privacy and cookie documentation at ",
            {
              text: "policies.google.com",
              href: "https://policies.google.com/technologies/cookies",
              isExternal: true,
            },
            ".",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "When you follow a link from this site to our wallet platform, to Paystack, or to WhatsApp, you are on their website and their cookies and policies apply there. This policy covers omanga.biz only.",
          ],
        },
      ],
    },

    {
      id: "changes",
      heading: "7. Changes to this policy",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "If we add or remove a cookie or a similar technology, we will update this table and the effective date. If the change adds something that needs your consent, we will ask you again rather than relying on a choice you made before it existed.",
          ],
        },
      ],
    },

    {
      id: "related-documents",
      heading: "8. Related documents",
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Our ",
            LEGAL_LINKS.privacy,
            " explains everything else we do with personal information, including what happens to the enquiries you send us.",
          ],
        },
        ...DOCUMENT_MAP_BLOCKS,
      ],
    },

    {
      id: "contact",
      heading: "9. Contact us",
      blocks: [...CONTACT_BLOCKS],
    },
  ],
} as const;
