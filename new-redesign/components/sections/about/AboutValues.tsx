import Image from "next/image";

import { SectionHead } from "@/new-redesign/components/ui/SectionHead";
import { aboutValues } from "@/new-redesign/content/about.content";

/**
 * 4 · What we value (owner, 2026-10-27; Mobbin D1, Figma's values): a white
 * band (the reference's tint, kept neutral after the crimson Vision card),
 * the section head, then three square photos (12px radius) with an H3 and a
 * line of text under each. One column below 768, three from 768.
 */
export function AboutValues({ headingId }: { headingId: string }) {
  const { eyebrow, title, values } = aboutValues;

  return (
    <section aria-labelledby={headingId} className="section-y bg-surface">
      <div className="container-page">
        <SectionHead id={headingId} eyebrow={eyebrow} title={title} />

        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {values.map((value) => (
            <li key={value.title}>
              <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-muted">
                <Image
                  src={value.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-[22px] leading-[1.2] tracking-[-0.02em]">{value.title}</h3>
              <p className="type-p2 mt-2 text-text-secondary">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
