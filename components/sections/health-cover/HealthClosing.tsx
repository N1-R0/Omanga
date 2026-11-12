import { WALLET_URL } from "@/config/site";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { href } from "@/config/routes";
import { healthClosing } from "@/content/health-cover.content";

export function HealthClosing() {
  const { title, text, primary, secondary, texture, screen } = healthClosing;

  return (
    <CtaPanel
      id="final-cta"
      title={title}
      text={text}
      primary={{ label: primary.label, href: href(primary.path) }}
      secondary={{ label: secondary.label, href: WALLET_URL }}
      texture={texture.src}
      screen={screen}
    />
  );
}
