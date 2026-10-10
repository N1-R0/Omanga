import { Object3D } from "@/components/home-v2/Object3D";
import { V2Section } from "@/components/home-v2/V2Section";
import { Button } from "@/components/ui/Button";
import type { CtaContent } from "@/content/cta.content";

/**
 * Closing call to action, site-wide.
 *
 * [CHANGED, 2026-10-10] Every page now uses the home page's closing panel (X1,
 * built as `ClosingV2`), on the owner's instruction: a rounded crimson
 * gradient panel inset in a white band, centred heading, intro and one white
 * button, with static 3D objects (Omanga coin, passport, two sparkles)
 * breaking the panel's corners. The full-bleed brand band with line art it
 * replaces is gone, so `CtaContent.graphic` is no longer rendered.
 *
 * Each page still passes its own copy and action.
 */
export type CTAProps = {
  /** `graphic` is not rendered by this design, so it is not required. */
  content: Pick<CtaContent, "heading" | "intro" | "action">;
  headingId: string;
};

export function CTA({ content, headingId }: CTAProps) {
  const { heading, intro, action } = content;

  return (
    <V2Section labelledBy={headingId}>
      <div className="relative">
        <div className="relative isolate flex flex-col items-center gap-fluid-4 overflow-hidden rounded-md bg-[linear-gradient(150deg,var(--color-brand)_0%,var(--color-brand-deep)_100%)] px-fluid-6 py-fluid-8 text-center text-on-dark">
          <h2 id={headingId} className="font-sans text-h1 text-balance measure-heading">
            {heading}
          </h2>
          <p className="font-sans text-large text-on-dark-muted measure-narrow">{intro}</p>
          <Button as="link" href={action.href} isExternal={action.isExternal} variant="primary" tone="brand">
            {action.label}
          </Button>
        </div>

        <Object3D name="coin-omanga" size={200} rotate={16} className="absolute -right-[2%] -top-[12%] w-[clamp(5rem,13vw,12rem)]" />
        <Object3D name="passport-pay" size={220} rotate={-12} className="absolute -left-[3%] bottom-[-10%] w-[clamp(5.5rem,14vw,13rem)]" />
        <Object3D name="sparkle-gold" size={80} className="absolute right-[12%] bottom-[8%] w-[clamp(2rem,4vw,3.5rem)]" />
        <Object3D name="sparkle-pink" size={80} className="absolute left-[14%] top-[10%] w-[clamp(1.75rem,3vw,3rem)]" />
      </div>
    </V2Section>
  );
}
