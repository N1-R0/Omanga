import Link from "next/link";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

/**
 * F2 · Soft cards, object at the bottom (Complex Law). Pale blush cards with
 * a dashed edge: copy on top, the object anchored to the foot of the card so
 * the three objects line up across the row whatever the copy length.
 */
export function FeaturesV2() {
  const { eyebrow, heading, items } = homeV2Content.features;

  return (
    <V2Section labelledBy={HOME_V2_IDS.features}>
      <div className="flex flex-col items-center gap-fluid-7">
        <div className="flex flex-col items-center gap-fluid-3 text-center">
          <p className="rounded-pill bg-blush px-fluid-3 py-fluid-1 font-sans text-small text-brand">
            {eyebrow}
          </p>
          <h2
            id={HOME_V2_IDS.features}
            className="font-sans text-h2 measure-heading text-balance"
          >
            {heading}
          </h2>
        </div>

        <ul className="grid w-full gap-fluid-4 desktop:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.heading}
              className="flex flex-col gap-fluid-3 rounded-md border border-dashed border-blush-strong bg-[#fdf6f8] p-fluid-5"
            >
              <h3 className="font-sans text-h5">{item.heading}</h3>
              <p className="font-sans text-main text-secondary">{item.body}</p>
              <Link
                href={item.link.href}
                className="inline-flex items-center gap-fluid-1 self-start font-sans text-main text-brand focus-ring"
              >
                {item.link.label}
                <ArrowRight size="sm" />
              </Link>
              <div className="mt-auto flex justify-center pt-fluid-5">
                <Object3D
                  name={item.object}
                  size={200}
                  className="w-[clamp(8rem,40%,11rem)]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </V2Section>
  );
}
