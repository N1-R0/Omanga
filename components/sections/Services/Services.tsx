import { Object3D } from "@/components/home-v2/Object3D";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { ServicesContent } from "@/content/services.content";
import { cx } from "@/lib/cx";

/**
 * "What you can do with Omanga" — the three services as a tilted deck.
 *
 * [CHANGED, 2026-10-10] Pick K5 from `design-lab/services-stack.html`
 * (card style after Daydream on Mobbin, b9ea8bf7). Replaces the photo
 * progression.
 *
 * Each service is a light, brand-tinted card, slightly rotated, with its 3D
 * object large and unboxed beside the text. The heading pins above the deck,
 * and the spacing between cards keeps one card on screen at a time
 * (2026-10-10, on instruction). The cards are `sticky` at the
 * same offset under the header, so as the page scrolls each one slides up and
 * settles on top of the last — a hand of cards. Pure CSS: no scroll listeners,
 * nothing to switch off for reduced motion (the cards move only as fast as the
 * reader scrolls).
 *
 * Colours stay inside the brand family but lighter than the crimson bands
 * around them: blush, apricot and a pale gold, each with ink text and crimson
 * accents (all text at AA on its tint).
 */
const DECK = [
  { surface: "bg-[#FBE8EE]", ring: "ring-[#F3CBD7]", tilt: "-rotate-[1.5deg]" },
  { surface: "bg-[#FDEBDD]", ring: "ring-[#F6D2B8]", tilt: "rotate-[1.25deg]" },
  { surface: "bg-[#FBF1DA]", ring: "ring-[#EEDCB0]", tilt: "-rotate-[0.75deg]" },
] as const;

const HEADING_IDS = [
  "services-spend-heading",
  "services-currency-heading",
  "services-insurance-heading",
] as const;

export type ServicesProps = {
  content: ServicesContent;
  headingId: string;
};

export function Services({ content, headingId }: ServicesProps) {
  return (
    <section aria-labelledby={headingId} className="section-rhythm relative bg-surface-page text-ink focus-ring-on-light">
      <Container>
        {/*
          How the pinning works (desktop; below that the heading does not pin).

          - Every card is a fixed height (`--card-h`, 30rem) and pins at
            `--deck-top`. Below desktop cards size to their content and
            `--card-h` (36rem) is only an estimate for the gap below. Cards
            pin just under the heading. The space between cards is MARGIN, not
            padding, so each sticky box is exactly one card: padding made each
            box taller than its card, which ran the list out of room early and
            pushed pinned cards up into the heading.
          - The gap after each card is a viewport less the card and the deck
            offset plus a quarter-viewport pause, so the next card starts below
            the fold and each card sits alone on screen for a moment before
            the next slides over it.
          - Every card, the last included, has the same gap after it. A sticky
            box's margin counts against its containing block, so equal margins
            make all three cards release at the same scroll position, and the
            last card gets that gap as time to settle on the stack.
          - The heading block is exactly `--deck-top` tall and pins in its own
            track, which ends one card plus one gap above the list. It releases
            at the same scroll position as the cards, so heading and deck leave
            together and never overlap — no backing needed behind the heading.
        */}
        <div className="relative [--deck-top:calc(var(--spacing-header)+1rem)] [--card-gap:max(4rem,calc(100svh-var(--deck-top)-var(--card-h)+25svh))] [--card-h:36rem] desktop:[--card-h:30rem] desktop:[--deck-top:calc(var(--spacing-header)+clamp(14rem,9rem+5vw,16rem))]">
          <div className="flex flex-col items-start gap-fluid-3 desktop:absolute desktop:inset-x-0 desktop:top-0 desktop:bottom-[calc(var(--card-h)+var(--card-gap))]">
            <div className="flex flex-col items-start gap-fluid-3 desktop:sticky desktop:top-[var(--spacing-header)] desktop:min-h-[calc(var(--deck-top)-var(--spacing-header))] desktop:pt-6">
              <span className="rounded-pill border border-border-hairline bg-surface-light px-3.5 py-2 font-sans text-small font-semibold">
                {content.eyebrow}
              </span>
              <h2 id={headingId} className="max-w-[20ch] font-sans text-h2 text-balance">
                {content.heading}
              </h2>
            </div>
          </div>

          <ol className="mx-auto mt-fluid-8 flex max-w-[60rem] flex-col desktop:mt-0 desktop:pt-[calc(var(--deck-top)-var(--spacing-header))]">
            {content.services.map((service, index) => {
              const deck = DECK[index];
              return (
                <li
                  key={HEADING_IDS[index]}
                  className="sticky top-[var(--deck-top)] mb-[var(--card-gap)]"
                >
                  <article
                    aria-labelledby={HEADING_IDS[index]}
                    className={cx(
                      "relative grid min-h-[24rem] items-center gap-fluid-4 rounded-[1.5rem] p-fluid-6 ring-1 desktop:h-[var(--card-h)] desktop:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
                      deck.surface,
                      deck.ring,
                      deck.tilt,
                    )}
                  >
                    {/* Free-standing and large: the object is the card's picture. */}
                    <Object3D
                      name={service.object}
                      size={400}
                      className="mx-auto w-[clamp(10rem,40vw,14rem)] desktop:order-last desktop:w-[clamp(15rem,24vw,22rem)]"
                    />

                    <div className="relative z-10 flex flex-col items-start gap-fluid-3">
                      <span className="font-sans text-small font-semibold tracking-[0.04em] text-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 id={HEADING_IDS[index]} className="font-sans text-h3 text-balance">
                        {service.heading}
                      </h3>
                      <p className="font-sans text-main text-secondary measure-narrow">{service.body}</p>
                      <div className="mt-fluid-2">
                        <Button
                          as="link"
                          variant="primary"
                          tone="light"
                          href={service.action.href}
                          isExternal={service.action.isExternal}
                        >
                          {service.action.label}
                        </Button>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
