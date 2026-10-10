import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

/**
 * C3 · Globe ring + copy (Wise, "Coverage around the world"). Swapped the
 * reference's globe for the Africa slab, since the hero already uses the globe
 * and the claim here is specifically African. Flags orbit it on a circle;
 * positions are computed, not hand-placed, so adding a flag just works.
 */
export function CoverageV2() {
  const { eyebrow, heading, intro, flags, action } = homeV2Content.coverage;

  return (
    <V2Section labelledBy={HOME_V2_IDS.coverage} className="bg-blush text-ink">
      <div className="grid items-center gap-fluid-7 desktop:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <Object3D
            name="africa-continent"
            size={360}
            className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2"
          />
          <ul aria-label="A selection of countries Omanga works in">
            {flags.map((flag, index) => {
              const angle = (index / flags.length) * 2 * Math.PI - Math.PI / 2;
              return (
                <li
                  key={flag.src}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${50 + 45 * Math.cos(angle)}%`,
                    top: `${50 + 45 * Math.sin(angle)}%`,
                  }}
                >
                  <Image
                    src={flag.src}
                    alt={flag.alt}
                    width={40}
                    height={40}
                    className="size-[clamp(1.75rem,3.2vw,2.5rem)] rounded-full border-2 border-surface-page object-cover shadow-glass-control"
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-fluid-4">
          <p className="font-sans text-small uppercase tracking-[0.08em] text-brand">
            {eyebrow}
          </p>
          <h2 id={HOME_V2_IDS.coverage} className="font-sans text-h2 text-balance">
            {heading}
          </h2>
          <p className="font-sans text-large text-secondary measure-body">
            {intro}
          </p>
          <Link
            href={action.href}
            className="inline-flex items-center gap-fluid-1 self-start font-sans text-main text-brand focus-ring"
          >
            {action.label}
            <ArrowRight size="sm" />
          </Link>
        </div>
      </div>
    </V2Section>
  );
}
