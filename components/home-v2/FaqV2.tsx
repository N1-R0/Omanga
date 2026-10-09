import Link from "next/link";

import { FaqList } from "@/components/sections/Faq/FaqList";
import { HOME_V2_IDS, homeV2Content } from "@/content/home-v2.content";

import { Object3D } from "./Object3D";
import { V2Section } from "./V2Section";

/**
 * Q1 · Heading left, list right (Wix). Reuses the site's `FaqList` so the
 * accordion behaviour (native <details>, no script) stays the same as on the
 * Payments and Insurance pages.
 */
export function FaqV2() {
  const { heading, help, helpLink, items } = homeV2Content.faq;

  return (
    <V2Section labelledBy={HOME_V2_IDS.faq} className="bg-surface-light text-ink">
      <div className="grid gap-fluid-7 desktop:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="flex flex-col items-start gap-fluid-3">
          <Object3D name="question-bubble" size={120} float className="w-[clamp(4.5rem,8vw,7rem)]" />
          <h2 id={HOME_V2_IDS.faq} className="font-sans text-h2 text-balance">
            {heading}
          </h2>
          <p className="font-sans text-main text-secondary">
            {help}{" "}
            <Link href={helpLink.href} className="text-brand underline underline-offset-4 focus-ring">
              {helpLink.label}
            </Link>
          </p>
        </div>
        <div className="min-w-0">
          <FaqList items={items} />
        </div>
      </div>
    </V2Section>
  );
}
