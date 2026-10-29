import Link from "next/link";

import { WHATSAPP_URL } from "@/config/site";
import { href } from "@/new-redesign/config/routes";
import { FaqList } from "@/new-redesign/components/sections/home/FaqList";
import { Section } from "@/new-redesign/components/ui/Section";
import { SectionHead } from "@/new-redesign/components/ui/SectionHead";

type Props = {
  eyebrow: string;
  title: string;
  subLead: string;
  subLink: string;
  subTail: string;
  guide?: { lead: string; label: string; path: string };
  items: ReadonlyArray<{ q: string; a: string }>;
};

export function FaqSection({ eyebrow, title, subLead, subLink, subTail, guide, items }: Props) {
  return (
    <Section id="faq" label={title}>
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        sub={
          <>
            {subLead}{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent-text underline underline-offset-4">
              {subLink}
            </a>{" "}
            {subTail}
            {guide ? (
              <>
                {" "}
                {guide.lead}{" "}
                <Link href={href(guide.path)} className="text-accent-text underline underline-offset-4">
                  {guide.label}
                </Link>
                .
              </>
            ) : null}
          </>
        }
      />
      <FaqList items={items} />
    </Section>
  );
}
