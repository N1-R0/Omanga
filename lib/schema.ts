import {
  CONTACT_EMAIL,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/config/site";
import {
  INSURANCE_PROVIDER_NAME,
  WALLET_PROVIDER_NAME,
} from "@/content/legal/legal-shared.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { PageMetaContent } from "@/types/content.types";

type SchemaNode = Readonly<Record<string, unknown>>;

/**
 * A `schema.org` graph, ready to serialise into a `application/ld+json` block.
 */
export type JsonLdGraph = {
  readonly "@context": "https://schema.org";
  readonly "@graph": readonly SchemaNode[];
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const AREA_SERVED: SchemaNode = {
  "@type": "Place",
  name: "Africa",
  description: `${COUNTRIES_SERVED_DISPLAY} African countries`,
};

const ORGANIZATION: SchemaNode = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo-omanga.svg"),
  },
  /*
    [ADDED, 2026-08-29] `email` and `areaServed` at organisation level.

    Both were already on the `contactPoint` below, which is where a support
    channel belongs — but a consumer of this graph reading the Organization node
    alone got a name, a URL and a logo. Neither value is new or unverified: the
    address is deliberately still absent, for the reason `config/site.ts` records
    at `OFFICE_ADDRESS` (a trading address must not be marked up as the
    registered one), and no `sameAs` appears because no social profile URL exists
    in this project — `footer.content.ts` blocks the same claim for the same
    reason.
  */
  email: CONTACT_EMAIL,
  areaServed: AREA_SERVED,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT_EMAIL,
    areaServed: AREA_SERVED,
  },
};

const WEBSITE: SchemaNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: SITE_LOCALE,
  publisher: { "@id": ORGANIZATION_ID },
};

/**
 * The two entities that actually deliver the regulated services.
 *
 * Named nodes with no `url` or `@id`: their websites are not recorded anywhere
 * in this project, and a guessed domain in structured data is a factual claim
 * about a third party. The names are the confirmed ones and are imported from
 * `legal-shared.content.ts` so the schema and the legal pages cannot disagree
 * about who provides what.
 */
const WALLET_PROVIDER: SchemaNode = {
  "@type": "Organization",
  name: WALLET_PROVIDER_NAME,
};

const INSURANCE_PROVIDER: SchemaNode = {
  "@type": "Organization",
  name: INSURANCE_PROVIDER_NAME,
};

/**
 * [FIXED, 2026-08-29] `provider` was Omanga on both services. It is not.
 *
 * Omanga presents these services, arranges them and supports the customer.
 * The wallet is operated by Fuspay Technologies, a CBN-licensed microfinance
 * bank, and the insurance is provided by Phillips HMO, regulated by NAICOM —
 * facts confirmed while the legal pages were written, and the whole reason those
 * pages are careful never to imply Omanga holds either licence.
 *
 * Structured data saying `provider: Omanga` said exactly what the visible pages
 * were written to avoid: that Omanga provides a regulated payment service and
 * underwrites insurance. On a YMYL site that is not a tidiness point — it is a
 * machine-readable claim of authorisation, made to the search engines whose
 * quality raters are looking for precisely this.
 *
 * `brand` keeps Omanga attached, which is accurate: these are Omanga-branded
 * services delivered by licensed partners.
 */
const SERVICES: readonly SchemaNode[] = [
  {
    "@type": "Service",
    name: "Omanga Payment Solutions",
    url: absoluteUrl("/payments"),
    provider: WALLET_PROVIDER,
    brand: { "@id": ORGANIZATION_ID },
    areaServed: AREA_SERVED,
  },
  {
    "@type": "Service",
    name: "Omanga Holiday Insurance",
    url: absoluteUrl("/insurance"),
    provider: INSURANCE_PROVIDER,
    brand: { "@id": ORGANIZATION_ID },
    areaServed: AREA_SERVED,
  },
];

function buildWebPage(meta: PageMetaContent): SchemaNode {
  const url = absoluteUrl(meta.path);

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: SITE_LOCALE,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

/* -----------------------------------------------------------------------------
   Breadcrumbs
   -------------------------------------------------------------------------- */

/**
 * A `BreadcrumbList` for a page one level below the homepage.
 *
 * Every route on this site is exactly one level deep, so the trail is always
 * Home → this page. The builder takes the crumb label rather than deriving it
 * from the page title: a title is written for a search result — "Travel Health
 * Insurance for Africa — Plans from $50 | Omanga" — and a breadcrumb is a
 * navigational label. Google renders the breadcrumb in place of the URL in the
 * result, so a title used as a crumb reads as a duplicate of the heading above it.
 *
 * Emitted for every page except the homepage, where a one-item trail pointing at
 * itself is noise.
 *
 * Nothing is fabricated: the trail describes the site's actual, flat structure
 * rather than inventing a category level that does not exist in the URL.
 */
function buildBreadcrumb(meta: PageMetaContent, crumb: string): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(meta.path)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: crumb,
        item: absoluteUrl(meta.path),
      },
    ],
  };
}

export type PageGraphOptions = {
  /**
   * The breadcrumb label for this page. Omit on the homepage.
   */
  readonly crumb?: string;
  /**
   * Extra nodes for this page only — currently the three plan `Product`s.
   */
  readonly nodes?: readonly SchemaNode[];
};

/**
 * Graph for a page: the organisation, the site, the page itself, the two
 * services, and optionally a breadcrumb trail and page-specific nodes.
 *
 * Fields blocked in project-context.md — `sameAs`, postal address, telephone,
 * registration number, `AggregateRating` — remain omitted rather than filled.
 * `Product`/`Offer` has come off that list because the prices are published and
 * verifiable on the page; see `buildPlanProducts`.
 */
export function buildPageGraph(
  meta: PageMetaContent,
  { crumb, nodes = [] }: PageGraphOptions = {},
): JsonLdGraph {
  const webPage = buildWebPage(meta);

  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      WEBSITE,
      crumb === undefined
        ? webPage
        : /*
             Linking the page to its trail with `breadcrumb` is what makes the
             association explicit rather than leaving two unrelated nodes in the
             graph for Google to pair up by proximity.
           */
          { ...webPage, breadcrumb: { "@id": `${absoluteUrl(meta.path)}#breadcrumb` } },
      ...(crumb === undefined ? [] : [buildBreadcrumb(meta, crumb)]),
      ...SERVICES,
      ...nodes,
    ],
  };
}

/* -----------------------------------------------------------------------------
   Insurance plans
   -------------------------------------------------------------------------- */

export type PlanOffer = {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly currency: string;
  readonly url: string;
};

/**
 * A `Product` with an `Offer` for each insurance plan.
 *
 * This is the one structured-data addition with direct commercial value: it puts
 * "$50" into the search result itself. It was deferred in a comment on
 * `app/(redesign)/plans/page.tsx` pending a section that has since shipped, so it
 * was unblocked and unowned rather than undecided.
 *
 * ---------------------------------------------------------------------------
 * EVERY FIELD IS TAKEN FROM WHAT THE PAGE ALREADY RENDERS
 *
 * Google requires structured data to match the visible content, and marking up a
 * price that differs from the one on the page is a manual-action risk rather than
 * a ranking one. So `name`, `description`, `price` and `currency` all come from
 * `insurance-plans.content.ts` — the same module the cards render from — and are
 * passed in rather than restated here, so they cannot drift.
 *
 * What is deliberately NOT emitted, because it does not exist:
 *
 *   aggregateRating   there are no reviews. Inventing one is the single most
 *                     common structured-data manual action there is.
 *   review            same.
 *   priceValidUntil   no expiry is published, and guessing a date would either
 *                     expire the offer early or claim a validity nobody set.
 *   sku / gtin        these are service plans, not stocked goods.
 *
 * `availability` is `InStock`, which is true — all three can be bought today, and
 * each `url` is that tier's own Paystack checkout page.
 *
 * [VERIFY] `priceCurrency` is USD because the plans page renders dollars. The
 * checkout is Paystack, which is Nigerian, so confirm the buyer is actually
 * charged in USD rather than a converted NGN amount. If the charge is in NGN, this
 * markup states a price the customer will not be charged and must be corrected.
 */
export function buildPlanProducts(
  plans: readonly PlanOffer[],
): readonly SchemaNode[] {
  return plans.map((plan) => ({
    "@type": "Product",
    name: `Omanga ${plan.name} Holiday Insurance`,
    description: plan.description,
    brand: { "@id": ORGANIZATION_ID },
    category: "Travel health insurance",
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: plan.currency,
      availability: "https://schema.org/InStock",
      url: plan.url,
      seller: { "@id": ORGANIZATION_ID },
    },
  }));
}
