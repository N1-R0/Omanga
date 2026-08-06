import {
  CONTACT_EMAIL,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/config/site";
import { COUNTRIES_SERVED } from "@/content/site.content";
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
  description: `${COUNTRIES_SERVED} African countries`,
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

const SERVICES: readonly SchemaNode[] = [
  {
    "@type": "Service",
    name: "Omanga Payment Solutions",
    url: absoluteUrl("/payments"),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: AREA_SERVED,
  },
  {
    "@type": "Service",
    name: "Omanga Holiday Insurance",
    url: absoluteUrl("/insurance"),
    provider: { "@id": ORGANIZATION_ID },
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

/**
 * Graph for a page: the organisation, the site, the page itself and the two
 * services. Fields blocked in project-context.md — `sameAs`, postal address,
 * telephone, registration number, `Product`/`Offer`, `AggregateRating` — are
 * omitted rather than filled.
 */
export function buildPageGraph(meta: PageMetaContent): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [ORGANIZATION, WEBSITE, buildWebPage(meta), ...SERVICES],
  };
}
