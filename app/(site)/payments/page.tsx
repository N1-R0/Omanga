import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqPage, buildPageGraph } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

import { WalletHero } from "@/components/sections/wallet/WalletHero";
import { WalletClosing } from "@/components/sections/wallet/WalletClosing";
import { WalletCountries } from "@/components/sections/wallet/WalletCountries";
import { WalletHowItWorks } from "@/components/sections/wallet/WalletHowItWorks";
import { FaqSection } from "@/components/ui/FaqSection";
import { ProofStrip } from "@/components/ui/ProofStrip";
import { faqItems, paymentsMeta } from "@/content/seo.content";
import { walletFaq, walletProof } from "@/content/wallet.content";

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
