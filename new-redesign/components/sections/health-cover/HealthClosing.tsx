import { WALLET_URL } from "@/config/site";
import { CtaPanel } from "@/new-redesign/components/ui/CtaPanel";
import { href } from "@/new-redesign/config/routes";
import { healthClosing } from "@/new-redesign/content/health-cover.content";

/**
 * 8 · Closing band (owner, 2026-10-26: reuse the Payments page's UI): the
 * shared CTA panel, with the insurance line, "Get insurance plan" as the one
 * primary action and the wallet as a text link.
 */
export function HealthClosing() {
  const { eyebrow, title, text, primary, secondary, texture, screen } = healthClosing;

  return (
    <CtaPanel
      id="final-cta"
      eyebrow={eyebrow}
      title={title}
      text={text}
      primary={{ label: primary.label, href: href(primary.path) }}
      secondary={{ label: secondary.label, href: WALLET_URL }}
      texture={texture.src}
      screen={screen}
    />
  );
}
