import Image from "next/image";

import { homePartners } from "@/new-redesign/content/home.content";

/**
 * 2 · Partner strip (img 3; design system § Partner strip).
 *
 * A thin band right under the hero, on the page's grey (owner, 2026-10-25:
 * no white background or rule): a centred P2 label, then the logos in a
 * static row. The supplied PNGs have solid white grounds, so they're
 * multiply-blended, which drops the white into the grey. They're grey at rest, as in the reference, and return to
 * their own colours on hover, so the supplied trademarks are never altered,
 * only toned.
 *
 * The logos are trimmed to the mark and sized by optical weight (each one's
 * `display` height, from its aspect ratio), then scaled to 85% below 768.
 */
export function HomePartners() {
  const { label, logos } = homePartners;

  return (
    <section id="partners" aria-labelledby="partners-label" className="bg-bg py-8 md:py-10">
      <div className="container-page flex flex-col items-center gap-5 text-center">
        <p id="partners-label" className="type-p2 text-text-secondary">
          {label}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-14">
          {logos.map((logo) => (
            <li key={logo.src}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                sizes="160px"
                style={{ ["--logo-h" as string]: `${logo.display}px` }}
                className="h-[calc(var(--logo-h)*0.85)] w-auto opacity-60 mix-blend-multiply grayscale transition-[filter,opacity] duration-[var(--duration-base)] ease-standard hover:opacity-100 hover:grayscale-0 md:h-(--logo-h)"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
