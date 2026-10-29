import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from "@/config/site";
import {
  INSURANCE_PROVIDER_NAME,
} from "@/content/legal/legal-shared.content";
import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";
import type { BlogPost, FaqItem } from "@/types/blog.types";
import type { PageMetaContent } from "@/types/content.types";

type SchemaNode = Readonly<Record<string, unknown>>;

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
  alternateName: SITE_TAGLINE,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: absoluteUrl("/logo-omanga-512.png"),
    width: 512,
    height: 512,
  },
  image: { "@id": `${SITE_URL}/#logo` },
  email: CONTACT_EMAIL,
  areaServed: AREA_SERVED,
  sameAs: [INSTAGRAM_URL],
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
  name: SITE_TAGLINE,
  alternateName: SITE_NAME,
  inLanguage: SITE_LOCALE,
  publisher: { "@id": ORGANIZATION_ID },
};

const INSURANCE_PROVIDER_ID = `${SITE_URL}/#phillips-hmo`;

const INSURANCE_PROVIDER: SchemaNode = {
  "@type": "Organization",
  "@id": INSURANCE_PROVIDER_ID,
  name: INSURANCE_PROVIDER_NAME,
  logo: absoluteUrl("/philip-hmo-logo.png"),
};

export type ServiceKey = "wallet" | "insurance";

function buildServiceNodes(
  key: ServiceKey,
  walletFees?: string,
): readonly SchemaNode[] {
  if (key === "wallet") {
    return [
      {
        "@type": "FinancialProduct",
        "@id": `${absoluteUrl("/payments")}#wallet`,
        name: "Omanga Payment Solutions",
        description: `A multi-currency travel wallet. Fund it from USD, GBP or CAD and spend in ${COUNTRIES_SERVED_DISPLAY} African countries.`,
        category: "Multi-currency travel wallet",
        url: absoluteUrl("/payments"),
        brand: { "@id": ORGANIZATION_ID },
        areaServed: AREA_SERVED,
        ...(walletFees === undefined
          ? {}
          : { feesAndCommissionsSpecification: walletFees }),
      },
    ];
  }

  return [
    {
      "@type": "Service",
      "@id": `${absoluteUrl("/insurance")}#service`,
      name: "Omanga Holiday Insurance",
      serviceType: "Short-term travel health insurance",
      url: absoluteUrl("/insurance"),
      provider: { "@id": INSURANCE_PROVIDER_ID },
      brand: { "@id": ORGANIZATION_ID },
      areaServed: { "@type": "Country", name: "Nigeria" },
    },
    INSURANCE_PROVIDER,
  ];
}

function buildWebPage(
  meta: PageMetaContent,
  pageType: PageType,
): SchemaNode {
  const url = absoluteUrl(meta.path);

  return {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: SITE_LOCALE,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

function buildBreadcrumb(
  meta: PageMetaContent,
  crumb: string,
  parent?: BreadcrumbParent,
): SchemaNode {
  const trail = [
    { name: "Home", item: SITE_URL },
    ...(parent === undefined
      ? []
      : [{ name: parent.name, item: absoluteUrl(parent.path) }]),
    { name: crumb, item: absoluteUrl(meta.path) },
  ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(meta.path)}#breadcrumb`,
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...entry,
    })),
  };
}

export type BreadcrumbParent = {
  readonly name: string;
  readonly path: string;
};

export type PageGraphOptions = {
  readonly crumb?: string;
  readonly parent?: BreadcrumbParent;
  readonly nodes?: readonly SchemaNode[];
  readonly services?: readonly ServiceKey[];
  readonly walletFees?: string;
  readonly pageType?: PageType;
};

export type PageType = "WebPage" | "AboutPage" | "ContactPage";

export function buildPageGraph(
  meta: PageMetaContent,
  {
    crumb,
    parent,
    nodes = [],
    services = [],
    walletFees,
    pageType = "WebPage",
  }: PageGraphOptions = {},
): JsonLdGraph {
  const webPage = buildWebPage(meta, pageType);

  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      WEBSITE,
      crumb === undefined
        ? webPage
        :
          { ...webPage, breadcrumb: { "@id": `${absoluteUrl(meta.path)}#breadcrumb` } },
      ...(crumb === undefined ? [] : [buildBreadcrumb(meta, crumb, parent)]),
      ...services.flatMap((key) => buildServiceNodes(key, walletFees)),
      ...nodes,
    ],
  };
}

export type PlanOffer = {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly currency: string;
  readonly url: string;
  readonly billingPeriod: string;
};

const UNIT_CODES: Readonly<Record<string, string>> = {
  day: "DAY",
  week: "WEE",
  month: "MON",
  year: "ANN",
};

export function buildPlanProducts(
  plans: readonly PlanOffer[],
): readonly SchemaNode[] {
  return plans.map((plan) => {
    const unitCode = UNIT_CODES[plan.billingPeriod.toLowerCase()];

    return {
      "@type": "Product",
      name: `Omanga ${plan.name} Holiday Insurance`,
      description: plan.description,
      image: absoluteUrl("/og.png"),
      brand: { "@type": "Brand", name: "Omanga" },
      category: "Travel health insurance",
      offers: {
        "@type": "Offer",
        price: plan.price,
        priceCurrency: plan.currency,
        availability: "https://schema.org/InStock",
        url: plan.url,
        seller: { "@id": ORGANIZATION_ID },
        ...(unitCode === undefined
          ? {}
          : {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: plan.price,
                priceCurrency: plan.currency,
                billingDuration: 1,
                billingIncrement: 1,
                unitCode,
                referenceQuantity: {
                  "@type": "QuantitativeValue",
                  value: 1,
                  unitCode,
                },
              },
            }),
      },
    };
  });
}

export function buildFaqPage(
  meta: PageMetaContent,
  items: readonly FaqItem[],
): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(meta.path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildBlogPosting(post: BlogPost): SchemaNode {
  const url = absoluteUrl(post.meta.path);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.meta.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    inLanguage: SITE_LOCALE,
    articleSection: post.category,
    image: absoluteUrl(post.image.src),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}
