import { WALLET_URL } from "@/config/site";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { href } from "@/config/routes";
import { walletClosing } from "@/content/wallet.content";

export function WalletClosing() {
  const { title, text, primary, secondary, texture, screen } = walletClosing;

  return (
    <CtaPanel
      id="final-cta"
      title={title}
      text={text}
      primary={{ label: primary.label, href: WALLET_URL, external: true }}
      secondary={{ label: secondary.label, href: href(secondary.path) }}
      texture={texture.src}
      screen={screen}
    />
  );
}
