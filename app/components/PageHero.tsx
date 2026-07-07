import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-cream px-6 pb-16 pt-12 text-center lg:px-10">
      <Reveal className="mx-auto max-w-2xl">
        {eyebrow && (
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-maroon">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base text-black/60">{description}</p>
        )}
        {children}
      </Reveal>
    </section>
  );
}
