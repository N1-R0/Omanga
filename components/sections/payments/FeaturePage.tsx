import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { WALLET_URL } from "@/config/site";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { FeatureHero } from "@/components/sections/payments/FeatureHero";
import { FeatureNotes } from "@/components/sections/payments/FeatureNotes";
import { FeatureSteps } from "@/components/sections/payments/FeatureSteps";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { FaqSection } from "@/components/ui/FaqSection";
import { href } from "@/config/routes";
import type { PaymentsFeature } from "@/content/payments-features.content";
import { walletClosing } from "@/content/wallet.content";

export function FeaturePage({ page, children }: { page: PaymentsFeature; children?: ReactNode }) {
  const faqNodes = page.faq ? [buildFaqPage(page.meta, page.faq.items.map((i) => ({ question: i.q, answer: i.a })))] : [];

  return (
    <>
      <JsonLd
        graph={buildPageGraph(page.meta, {
          crumb: page.crumb,
          parent: { name: "Payments", path: "/payments" },
          services: ["wallet"],
          nodes: faqNodes,
        })}
      />
      <FeatureHero crumb={page.crumb} hero={page.hero} />
      {page.steps ? <FeatureSteps steps={page.steps} /> : null}
      <FeatureNotes notes={page.notes} />
      {children}
      {page.faq ? (
        <FaqSection
          title={page.faq.title}
          subLead={page.faq.subLead}
          subLink="Chat on WhatsApp"
          subTail="if yours isn't here."
          items={page.faq.items}
        />
      ) : null}
      <CtaPanel
        id="final-cta"
        title={page.closing.title}
        text={page.closing.text}
        primary={{ label: page.closing.cta, href: WALLET_URL, external: true }}
        secondary={{ label: "Add health cover for your trip", href: href("/insurance/plans") }}
        texture={walletClosing.texture.src}
        screen={page.closing.screen}
      />
    </>
  );
}
