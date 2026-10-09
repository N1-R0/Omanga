import { Button } from "@/components/ui/Button";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

/**
 * X1 · Panel with objects breaking out (Phantom closing CTA). A rounded
 * crimson panel inset from the page edge; the objects overlap its border so
 * the panel feels like a window the objects are coming through.
 */
export function ClosingV2() {
  const { heading, intro, action } = homeV2Content.closing;

  return (
    <V2Section labelledBy={HOME_V2_IDS.closing}>
      <div className="relative">
        <div className="relative isolate flex flex-col items-center gap-fluid-4 overflow-hidden rounded-md bg-[linear-gradient(150deg,var(--color-brand)_0%,var(--color-brand-deep)_100%)] px-fluid-6 py-fluid-8 text-center text-on-dark">
          <h2 id={HOME_V2_IDS.closing} className="font-sans text-h1 text-balance measure-heading">
            {heading}
          </h2>
          <p className="font-sans text-large text-on-dark-muted measure-narrow">
            {intro}
          </p>
          <Button as="link" href={action.href} isExternal variant="primary" tone="brand">
            {action.label}
          </Button>
        </div>

        <Object3D name="coin-omanga" size={200} float rotate={16} className="absolute -right-[2%] -top-[12%] w-[clamp(5rem,13vw,12rem)]" />
        <Object3D name="passport-pay" size={220} float delay={1.4} rotate={-12} className="absolute -left-[3%] bottom-[-10%] w-[clamp(5.5rem,14vw,13rem)]" />
        <Object3D name="sparkle-gold" size={80} float delay={0.7} className="absolute right-[12%] bottom-[8%] w-[clamp(2rem,4vw,3.5rem)]" />
        <Object3D name="sparkle-pink" size={80} float delay={2} className="absolute left-[14%] top-[10%] w-[clamp(1.75rem,3vw,3rem)]" />
      </div>
    </V2Section>
  );
}
