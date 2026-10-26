import type { Metadata } from "next";

import { WalletHero } from "@/new-redesign/components/sections/wallet/WalletHero";
import { WalletClosing } from "@/new-redesign/components/sections/wallet/WalletClosing";
import { WalletCountries } from "@/new-redesign/components/sections/wallet/WalletCountries";
import { WalletHowItWorks } from "@/new-redesign/components/sections/wallet/WalletHowItWorks";
import { FaqSection } from "@/new-redesign/components/ui/FaqSection";
import { ProofStrip } from "@/new-redesign/components/ui/ProofStrip";
import { walletFaq, walletProof } from "@/new-redesign/content/wallet.content";

/**
 * Payments at /new/payments (sitemap-v2.md § C; was /wallet, § 6.2). Sections land one at a time; the
 * hero and the proof strip are built (2026-10-22). Copy lives in new-redesign/content/wallet.content.ts.
 */
export const metadata: Metadata = {
  title: "Payments",
};

export default function PaymentsPage() {
  return (
    <>
      <WalletHero />
      <ProofStrip id="wallet-proof" {...walletProof} />
      <WalletHowItWorks />
      <WalletCountries />
      <FaqSection {...walletFaq} />
      <WalletClosing />
    </>
  );
}
