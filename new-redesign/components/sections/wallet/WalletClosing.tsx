import { WALLET_URL } from "@/config/site";
import { CtaPanel } from "@/new-redesign/components/ui/CtaPanel";
import { href } from "@/new-redesign/config/routes";
import { walletClosing } from "@/new-redesign/content/wallet.content";

/**
 * 12 · Closing band (design system § Final CTA and footer): the shared CTA
 * panel, as on home, with the wallet's line and a health-cover text link.
 */
export function WalletClosing() {
  const { eyebrow, title, text, primary, secondary, texture, screen } = walletClosing;

  return (
    <CtaPanel
      id="final-cta"
      eyebrow={eyebrow}
      title={title}
      text={text}
      primary={{ label: primary.label, href: WALLET_URL, external: true }}
      secondary={{ label: secondary.label, href: href(secondary.path) }}
      texture={texture.src}
      screen={screen}
    />
  );
}
