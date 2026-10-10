import Link from "next/link";

import { Object3D } from "@/components/home-v2/Object3D";
import { V2Section } from "@/components/home-v2/V2Section";
import { FAQ_HELP } from "@/content/site.content";
import type { FaqContent } from "@/types/blog.types";

import { FaqList } from "./FaqList";

/**
 * FAQ band, site-wide.
 *
 * [CHANGED, 2026-10-10] Every page now uses the home page's design (Q1, built
 * as `FaqV2`), on the owner's instruction: a light band, two columns at
 * desktop — the question-bubble object, heading, optional intro and a "Contact
 * us" line on the left, the accordion on the right. The old dark/light `tone`
 * prop is gone: one look everywhere.
 *
 * Structured data is still emitted by the page (`buildFaqPage`), not here.
 */
export type FaqProps = {
  content: FaqContent;
  headingId: string;
};

export function Faq({ content, headingId }: FaqProps) {
  return (
    <V2Section labelledBy={headingId} className="bg-surface-light text-ink">
      <div className="grid gap-fluid-7 desktop:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="flex flex-col items-start gap-fluid-3">
          <Object3D name="question-bubble" size={120} className="w-[clamp(4.5rem,8vw,7rem)]" />
          <h2 id={headingId} className="font-sans text-h2 text-balance">
            {content.heading}
          </h2>
          {content.intro !== undefined && (
            <p className="font-sans text-main text-secondary">{content.intro}</p>
          )}
          <p className="font-sans text-main text-secondary">
            {FAQ_HELP.text}{" "}
            <Link href={FAQ_HELP.link.href} className="text-brand underline underline-offset-4 focus-ring">
              {FAQ_HELP.link.label}
            </Link>
          </p>
        </div>
        <div className="min-w-0">
          <FaqList items={content.items} />
        </div>
      </div>
    </V2Section>
  );
}
