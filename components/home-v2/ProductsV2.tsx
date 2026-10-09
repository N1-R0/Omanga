import Link from "next/link";

import { ArrowRight } from "@/components/icons/ArrowRight";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";
import { cx } from "@/lib/cx";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

const PANEL = {
  brand: "bg-[linear-gradient(150deg,var(--color-brand)_0%,var(--color-brand-deep)_100%)]",
  blush: "bg-blush",
} as const;

/**
 * P1 · Image-top cards (Okta). The two products side by side: a coloured
 * panel holding the product's object, then name, one line and a link.
 * The whole card is the link target so the hit area is the card, not the
 * small "Explore" label.
 */
export function ProductsV2() {
  const { heading, items } = homeV2Content.products;

  return (
    <V2Section labelledBy={HOME_V2_IDS.products}>
      <div className="flex flex-col gap-fluid-7">
        <h2
          id={HOME_V2_IDS.products}
          className="font-sans text-h2 measure-heading text-balance"
        >
          {heading}
        </h2>

        <ul className="grid gap-fluid-4 tablet:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.name}>
              <Link
                href={item.link.href}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-border-hairline bg-surface-page focus-ring"
              >
                <div
                  className={cx(
                    "grid aspect-[16/10] place-items-center overflow-hidden",
                    PANEL[item.tone],
                  )}
                >
                  <Object3D
                    name={item.object}
                    size={320}
                    float
                    delay={index * 1.5}
                    className="w-[46%] transition-emphasis group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-fluid-2 p-fluid-5">
                  <h3 className="font-sans text-h4">{item.name}</h3>
                  <p className="font-sans text-main text-secondary measure-body">
                    {item.body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-fluid-1 pt-fluid-2 font-sans text-main text-brand">
                    {item.link.label}
                    <span className="transition-emphasis group-hover:translate-x-1">
                      <ArrowRight size="sm" />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </V2Section>
  );
}
