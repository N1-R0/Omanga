import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import type { ServicesContent } from "@/content/services.content";

/**
 * "What you can do with Omanga": the three services as tall photo cards.
 *
 * [CHANGED, 2026-10-14] After Samara on Mobbin (29d6b6a5), on the owner's
 * instruction to drop the 3D illustrations. Replaces the S1 label-tab cards.
 *
 * Each card is a full-bleed portrait photo and is itself the link. Two short
 * lines sit top-left in white: the service heading, quieter, then the action
 * with an arrow. Nothing else; the approved body copy is not shown (see
 * `services.content.ts`).
 *
 * A short dark scrim at the top of each photo keeps the white text at AA
 * whatever the photo does there; it fades out by mid-card, so it reads as
 * shade rather than a gradient effect. The photo eases up in scale on hover,
 * only when motion is allowed.
 */
const HEADING_IDS = [
  "services-spend-heading",
  "services-currency-heading",
  "services-insurance-heading",
] as const;

export type ServicesProps = {
  content: ServicesContent;
  headingId: string;
};

export function Services({ content, headingId }: ServicesProps) {
  return (
    <section aria-labelledby={headingId} className="section-rhythm relative bg-surface-page text-ink focus-ring-on-light">
      <Container>
        <div className="flex flex-col items-start gap-fluid-3">
          <span className="rounded-pill border border-border-hairline bg-surface-light px-3.5 py-2 font-sans text-small font-semibold">
            {content.eyebrow}
          </span>
          <h2 id={headingId} className="max-w-[20ch] font-sans text-h2 text-balance">
            {content.heading}
          </h2>
        </div>

        <ul className="mt-[var(--space-8)] grid gap-4 tablet:grid-cols-3">
          {content.services.map((service, index) => (
            <li key={HEADING_IDS[index]}>
              <Link
                href={service.action.href}
                aria-labelledby={HEADING_IDS[index]}
                {...(service.action.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[0.875rem] bg-ink tablet:aspect-[3/4.2]"
              >
                <Image
                  src={service.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 48rem) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/55 to-transparent" />

                <div id={HEADING_IDS[index]} className="relative flex flex-col gap-1 p-6 font-sans text-large font-medium leading-snug desktop:p-7">
                  {/* Plain weight on purpose: the reference's two lines are the same size. */}
                  <h3 className="font-sans text-large font-medium leading-snug tracking-normal text-on-dark/75">{service.heading}</h3>
                  <span className="text-on-dark">
                    {service.action.label}
                    <span aria-hidden="true"> →</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
