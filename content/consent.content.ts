import type { ConsentCategory } from "@/lib/consent";

export type ConsentCategoryCopy = {
  readonly id: ConsentCategory;
  readonly title: string;
  readonly description: string;
  readonly consequence?: string;
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
      "Measurement of which pages are visited and how quickly they load, so we can see what people use and find the slow pages. We use Google Analytics, which sets its own cookies in your browser, and Vercel Speed Insights, which sets none.",
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
  readonly reopenLabel: string;
} = {
  mapPlaceholder: MAP_PLACEHOLDER,
  banner: {
    landmarkLabel: "Cookie consent",
    heading: "Your choice about cookies",
    body: "We use necessary cookies to run this site. Optional ones, for embedded content and anonymous performance measurement, stay off unless you accept.",
    acceptLabel: "Accept all",
    rejectLabel: "Reject all",
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
