import type { ConsentCategory } from "@/lib/consent";

/**
 * Every user-facing string in the cookie banner and preferences dialog.
 *
 * Written for this site rather than adapted from a consent-tool template, and
 * each category description names what it actually controls here. A description
 * that says "we use analytics cookies to improve your experience" would be
 * boilerplate and, on this site, also false — the analytics in use sets no
 * cookie at all. Saying what is really there is both the honest option and the
 * one a visitor can act on.
 *
 * [NOT APPROVED COPY] Unlike the rest of `content/`, none of this is transcribed
 * from the CEO-approved copy document — that document has no consent UI in it,
 * because the site had no consent UI. It is drafted here to be accurate against
 * the audit. It is user-facing legal-adjacent text on a YMYL site and should get
 * the same review pass the five legal pages need.
 */

export type ConsentCategoryCopy = {
  readonly id: ConsentCategory;
  readonly title: string;
  readonly description: string;
  /** What the visitor loses by refusing. Omitted where nothing is lost. */
  readonly consequence?: string;
  /** Rendered instead of a control for the category that cannot be refused. */
  readonly lockedNote?: string;
};

const CATEGORIES: readonly ConsentCategoryCopy[] = [
  {
    id: "necessary",
    title: "Strictly necessary",
    description:
      "Needed for the site to work and to be secure. This covers delivering pages, keeping the enquiry forms working, guarding those forms against automated abuse, and remembering the cookie choice you make here.",
    lockedNote: "Always on",
  },
  {
    id: "functional",
    title: "Functional",
    description:
      "Content we embed from another company. Today this is the Google map on our Contact page, which loads from Google and lets Google set its own cookies in your browser.",
    consequence:
      "Turn this off and the map is not loaded at all. Our office address is still shown as text beneath it.",
  },
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Anonymous measurement of how quickly pages load and which pages are visited, so we can find the slow ones. We use Vercel Speed Insights, which sets no cookies and stores nothing on your device.",
    consequence:
      "Turn this off and the measurement script is never loaded. Nothing about the site changes for you.",
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Advertising and cross-site tracking cookies. We do not currently use any. This control is here so that if we ever add one, it cannot run until you have agreed to it.",
    consequence: "Nothing on the site uses this today.",
  },
] as const;

export type ConsentBannerCopy = {
  readonly heading: string;
  readonly body: string;
  readonly acceptLabel: string;
  readonly rejectLabel: string;
  readonly manageLabel: string;
  readonly policyLink: { readonly label: string; readonly href: string };
  readonly landmarkLabel: string;
};

export type ConsentPreferencesCopy = {
  readonly heading: string;
  readonly intro: string;
  readonly categories: readonly ConsentCategoryCopy[];
  readonly saveLabel: string;
  readonly acceptLabel: string;
  readonly rejectLabel: string;
  readonly closeLabel: string;
  readonly footnote: string;
  readonly policyLink: { readonly label: string; readonly href: string };
};

/**
 * Shown where a blocked third-party embed would be.
 *
 * A placeholder rather than an empty space, because a visitor who refused
 * functional cookies months ago and now wants the map needs to be able to see
 * that something is missing and get it back. Silence would read as a broken
 * page.
 *
 * The action grants the functional category and nothing else, which is the
 * narrowest thing it can do — the map is currently the only member of that
 * category, so "load this map" and "allow functional" describe the same
 * decision. If a second functional embed is ever added, this button stops being
 * specific enough and must be replaced by one that opens the preferences dialog.
 */
export type ConsentEmbedPlaceholderCopy = {
  readonly heading: string;
  readonly body: string;
  readonly actionLabel: string;
};

const MAP_PLACEHOLDER: ConsentEmbedPlaceholderCopy = {
  heading: "Map not loaded",
  body: "This map is provided by Google and loading it lets Google set cookies in your browser. Our address is written out below.",
  actionLabel: "Load map",
} as const;

export const consentContent: {
  readonly banner: ConsentBannerCopy;
  readonly preferences: ConsentPreferencesCopy;
  readonly mapPlaceholder: ConsentEmbedPlaceholderCopy;
  /** The footer control that reopens the dialog after a decision. */
  readonly reopenLabel: string;
} = {
  mapPlaceholder: MAP_PLACEHOLDER,
  banner: {
    landmarkLabel: "Cookie consent",
    heading: "Your choice about cookies",
    /*
      No pre-checked boxes, no "by continuing to browse you agree", and no
      dismissal that counts as acceptance. Each of the three buttons is an
      explicit act, and closing the page without pressing one leaves everything
      optional switched off.
    */
    body: "We use strictly necessary cookies to run this site. We would also like to use optional ones for embedded content and anonymous performance measurement. You can accept, refuse, or choose for yourself — and change your mind at any time.",
    acceptLabel: "Accept all",
    rejectLabel: "Reject non-essential",
    manageLabel: "Manage preferences",
    policyLink: { label: "Cookie Policy", href: "/cookie-policy" },
  },
  preferences: {
    heading: "Cookie preferences",
    intro:
      "Choose which optional cookies and embedded content you allow. Strictly necessary items cannot be switched off because the site cannot run without them.",
    categories: CATEGORIES,
    saveLabel: "Save preferences",
    acceptLabel: "Accept all",
    rejectLabel: "Reject non-essential",
    closeLabel: "Close",
    footnote:
      "Your choice is stored in this browser only, alongside the date you made it and the version of this notice you were shown. It contains no name, email address or identifier.",
    policyLink: { label: "Read our Cookie Policy", href: "/cookie-policy" },
  },
  reopenLabel: "Cookie preferences",
} as const;
