import Image from "next/image";

import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

/**
 * R5 · Traveller photo collage (Bevel, "Crafted with Care, Loved Everywhere").
 * Tall rounded photos stepped into an arch above a centred heading. The
 * arch comes from each tile's top offset; the outer tiles sit lowest.
 * Below tablet only the middle four show, so the row never shrinks to slivers.
 */
const OFFSETS = ["mt-[22%]", "mt-[10%]", "mt-[3%]", "mt-0", "mt-0", "mt-[3%]", "mt-[10%]", "mt-[22%]"];

export function CollageV2() {
  const { heading, intro, photos } = homeV2Content.collage;

  return (
    <V2Section labelledBy={HOME_V2_IDS.collage}>
      <div className="flex flex-col items-center gap-fluid-6">
        <ul className="grid w-full grid-cols-4 items-start gap-fluid-2 tablet:grid-cols-8">
          {photos.map((photo, index) => (
            <li
              key={photo.src}
              className={`${OFFSETS[index]} ${index < 2 || index > 5 ? "hidden tablet:block" : ""}`}
            >
              <div className="relative aspect-[3/5] overflow-hidden rounded-pill bg-surface-light">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 12vw, 25vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="relative flex flex-col items-center gap-fluid-3 text-center">
          <Object3D
            name="speech-stars"
            size={120}
            className="absolute -top-[70%] right-[-14%] hidden w-[clamp(4rem,7vw,6.5rem)] tablet:block"
          />
          <h2 id={HOME_V2_IDS.collage} className="font-sans text-h2 text-balance measure-heading">
            {heading}
          </h2>
          <p className="font-sans text-large text-secondary">{intro}</p>
        </div>
      </div>
    </V2Section>
  );
}
