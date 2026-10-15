import Link from "next/link";
import type { ReactNode } from "react";

import type { SolutionContent } from "@/content/solutions.content";

/**
 * One product card, laid out like wise.com's product cards (owner reference,
 * 2026-10-15): a large rounded card with the title, one line and an underlined
 * link left-aligned at the top, and the media filling the rest.
 *
 *   media="asset"   an illustration or image, inset in the card's lower half
 *                   (Wise's globe card). Insurance.
 *   media="widget"  a white panel that runs to the card's sides and bottom
 *                   edge (Wise's converter card). Payments.
 *
 * Neutral for now (light grey card, ink text) at the owner's request, until
 * the section's colours are decided. Colour lives only in this file.
 */
export function ProductPanel({
  content,
  headingId,
  media,
  children,
}: {
  content: SolutionContent;
  headingId: string;
  media: "asset" | "widget";
  children: ReactNode;
}) {
  const { heading, body, action } = content;

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface-light text-ink"
    >
      <div className="flex flex-col gap-fluid-2 p-fluid-5 pb-fluid-4">
        <h3 id={headingId} className="text-h3 text-balance">
          {heading}
        </h3>
        <p className="font-sans text-main text-secondary">
          {body}{" "}
          <Link
            href={action.href}
            className="font-heading font-medium text-ink underline decoration-2 underline-offset-4 transition-opacity duration-300 hover:opacity-70 focus-ring"
          >
            {action.label}
          </Link>
        </p>
      </div>

      {media === "asset" ? (
        <div className="flex flex-1 items-center justify-center px-fluid-4 pb-fluid-5">
          {children}
        </div>
      ) : (
        <div className="mt-auto">{children}</div>
      )}
    </article>
  );
}
