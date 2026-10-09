import Image from "next/image";

import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { V2Section } from "./V2Section";

/** T3 · Partner logos (Whereby). One line of label, one row of logos. */
export function PartnersV2() {
  const { label, logos } = homeV2Content.partners;

  return (
    <V2Section labelledBy={HOME_V2_IDS.partners} rhythm="tight">
      <div className="flex flex-col items-center gap-fluid-5 border-y border-border-hairline py-fluid-6">
        <h2
          id={HOME_V2_IDS.partners}
          className="font-sans text-small text-secondary"
        >
          {label}
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-fluid-8 gap-y-fluid-4">
          {logos.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                className="h-8 w-auto opacity-70 grayscale transition-standard hover:opacity-100 hover:grayscale-0 tablet:h-10"
              />
            </li>
          ))}
        </ul>
      </div>
    </V2Section>
  );
}
