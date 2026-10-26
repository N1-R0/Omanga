import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

import { WalletHero } from "@/new-redesign/components/sections/wallet/WalletHero";
import { WalletClosing } from "@/new-redesign/components/sections/wallet/WalletClosing";
import { WalletCountries } from "@/new-redesign/components/sections/wallet/WalletCountries";
import { WalletHowItWorks } from "@/new-redesign/components/sections/wallet/WalletHowItWorks";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { ProofStrip } from "@/new-redesign/components/ui/ProofStrip";
import { faqItems, paymentsMeta } from "@/new-redesign/content/seo.content";
import { walletFaq, walletProof } from "@/new-redesign/content/wallet.content";

/**
 * Payments at /payments (sitemap-v2.md § C). Copy lives in
 * new-redesign/content/wallet.content.ts. The wallet Service node states fees
 * with the FAQ's own fees answer, so schema and page say the same thing.
 */
export const metadata: Metadata = buildPageMetadata(paymentsMeta);

export default function PaymentsPage() {
  const walletFees = walletFaq.items.find((i) => i.q === "What fees does Omanga charge?")!;
  return (
    <>
      <JsonLd graph={buildPageGraph(paymentsMeta, { crumb: "Payments", services: ["wallet"], walletFees: walletFees.a, nodes: [buildFaqPage(paymentsMeta, faqItems(walletFaq.items))] })} />
      <WalletHero />
      <ProofStrip id="wallet-proof" {...walletProof} />
      <WalletHowItWorks />
      <WalletCountries />
      <FaqSection {...walletFaq} />
      <WalletClosing />
    </>
  );
}
