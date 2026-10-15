import Image from "next/image";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { AfricanCoverageContent } from "@/content/coverage.content";

/**
 * [REBUILT, 2026-10-15] Popcorn layout (mobbin section efced987; owner pick).
 *
 * A faint dot map of Africa behind a centred pill eyebrow, heading and intro,
 * then a loose cloud of flag + name pills, each tilted a little, closing on a
 * "39+ more" pill. Replaces the flag arch (FlagCluster / FlagColumn /
 * FlagItem / CoverageContent, deleted).
 *
 * The map is decorative (`alt=""`): only Africa north of ~6°S (owner: "just
 * the top"), so it is wide like the reference's US map, fading out under the
 * pills. Ink dots at 6% with a random fifth in teal at 20%. An earlier brand highlight on
 * Nigeria was dropped because it sat directly behind the heading.
 *
 * A Server Component: one link, nothing hydrates.
 */

/**
 * Tilt and vertical nudge per pill, in order, hand-tuned against the Popcorn
 * reference so the cloud reads as dropped rather than laid out: no two
 * neighbours lean the same way, and nudges are big enough that the rows
 * interlock. Cycled if the flag list grows.
 */
const SCATTER = [
  "-rotate-[8deg] translate-y-3",
  "rotate-[2deg] -translate-y-1",
  "-rotate-[4deg] translate-y-2",
  "rotate-[9deg] -translate-y-2",
  "-rotate-[6deg] translate-y-1",
  "rotate-[5deg] translate-y-3",
  "-rotate-[3deg] -translate-y-2",
  "rotate-[7deg] translate-y-1",
  "-rotate-[9deg] -translate-y-1",
  "rotate-[3deg] translate-y-2",
  "-rotate-[5deg] -translate-y-3",
  "rotate-[8deg]",
] as const;

/* No hairline: on white the pill is separated by its shadow, as in the
   reference, and a border on a tilted pill reads as a sticker outline. */
const PILL =
  "inline-flex items-center gap-2.5 rounded-pill bg-surface-page py-1.5 pl-1.5 pr-4 font-sans text-small font-medium tablet:py-2 tablet:pl-2 tablet:pr-5 tablet:text-main text-ink shadow-glass-raised";

export type AfricanCoverageProps = {
  content: AfricanCoverageContent;
  /**
   * The id of the heading that names this section.
   *
   * Passed in rather than defined here so the value has one owner — the content
   * module — and the heading and the `aria-labelledby` cannot drift apart.
   */
  headingId: string;
};

export function AfricanCoverage({ content, headingId }: AfricanCoverageProps) {
  const { eyebrow, heading, intro, flags, flagsLabel, moreLabel, action } =
    content;

  return (
    <Section labelledBy={headingId} tone="light">
      <div className="flex flex-col gap-fluid-6">
        {/*
          The map is scoped to the heading and the pills, not the action, so
          it ends where the pills sit, as in the reference.
        */}
        <div className="relative isolate flex flex-col gap-fluid-7">
          <Image
            src="/coverage/africa-dots.svg"
            alt=""
            width={564}
            height={352}
            unoptimized
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-auto w-[min(64rem,160%)] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
          />

          <Reveal index={0}>
            <div className="flex flex-col items-center gap-fluid-3 text-center">
              <span className="rounded-pill bg-surface-page px-4 py-2 font-sans text-small font-medium shadow-glass-control">
                {eyebrow}
              </span>
              {/*
                Owner: heading and intro on two lines each. `text-balance` in a
                capped measure splits them evenly rather than leaving a widow.
              */}
              <h2
                id={headingId}
                className="max-w-[22ch] font-sans text-h2 text-balance"
              >
                {heading}
              </h2>
              <p className="max-w-[44ch] font-sans text-large text-balance text-secondary">
                {intro}
              </p>
            </div>
          </Reveal>

          <Reveal index={1}>
            {/*
              No column gap and a slight negative margin per pill, so
              neighbours touch the way scattered objects do; a small row gap
              so the tilted rows interlock without covering names. Wrapping
              stays natural, so the short second row centres itself.
              `pt-fluid-8` on top of the block gap (owner): the reference
              leaves clear air between the intro and the cloud, ~110px here.
            */}
            <ul
              aria-label={flagsLabel}
              className="mx-auto flex max-w-[66rem] flex-wrap justify-center gap-y-3 px-2 pb-3 pt-fluid-8"
            >
              {flags.map((flag, index) => (
                <li
                  key={flag.src}
                  className={`-mx-0.5 ${SCATTER[index % SCATTER.length]}`}
                >
                  <span className={PILL}>
                    {/*
                      The SVGs are 32-square with a 30x24 flag and a faint
                      edge stroke. The image is 1.45x the round mask so only
                      the flag's centre shows, stroke cropped. alt="" because
                      the name sits beside it.
                    */}
                    <span className="relative size-7 shrink-0 overflow-hidden rounded-full tablet:size-9">
                      <Image
                        src={flag.src}
                        alt=""
                        width={flag.width}
                        height={flag.height}
                        unoptimized
                        loading="lazy"
                        className="absolute left-1/2 top-1/2 w-[2.5rem] max-w-none tablet:w-[3.25rem] -translate-x-1/2 -translate-y-1/2"
                      />
                    </span>
                    {flag.alt}
                  </span>
                </li>
              ))}
              <li
                className={`-mx-0.5 ${SCATTER[flags.length % SCATTER.length]}`}
              >
                <span className={`${PILL} min-h-10 pl-4 tablet:min-h-[3.25rem] tablet:pl-5`}>
                  {moreLabel}
                </span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="flex justify-center">
          <Button
            as="link"
            variant={action.emphasis}
            tone="light"
            href={action.href}
            isExternal={action.isExternal}
            trailingIcon={<ArrowRight size="sm" />}
          >
            {action.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
