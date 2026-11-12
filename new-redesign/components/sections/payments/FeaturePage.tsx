import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { WALLET_URL } from "@/config/site";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { FeatureHero } from "@/new-redesign/components/sections/payments/FeatureHero";
import { FeatureNotes } from "@/new-redesign/components/sections/payments/FeatureNotes";
import { FeatureSteps } from "@/new-redesign/components/sections/payments/FeatureSteps";
import { CtaPanel } from "@/new-redesign/components/ui/CtaPanel";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { href } from "@/new-redesign/config/routes";
import type { PaymentsFeature } from "@/new-redesign/content/payments-features.content";
import { walletClosing } from "@/new-redesign/content/wallet.content";

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
