import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

/**
 * An inline navigational link, for links that live inside a sentence.
 *
 * Distinct from `Button`'s link form, which is a button-styled link that
 * stands alone. Both render an anchor; they differ in behaviour and context,
 * which is the correct reason to keep two components (component-rules.md:
 * "Abstract by behaviour, never by appearance").
 *
 * Underlined by default and always. On a page where brand colour is reserved
 * for interaction, an unlinked run of brand text and a link would be
 * indistinguishable to anyone who cannot separate the two colours — and
 * "never signal state by colour alone" applies to affordance as much as state.
 */

const TONE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-brand hover:text-brand-hover",
  // On dark and brand surfaces the link inherits the surrounding colour;
  // hover dims rather than recolours, since there is no lighter brand step.
  dark: "text-on-dark hover:text-secondary",
  brand: "text-on-dark hover:text-secondary",
} as const;

export type TextLinkProps = {
  /**
   * The anchor text. SEO expectations forbid "learn more" and "click here":
   * every anchor describes its destination.
   */
  children: ReactNode;
  href: string;
  tone: Tone;
  /** External links get the target and rel attributes and skip the router. */
  isExternal?: boolean;
};

export function TextLink({
  children,
  href,
  tone,
  isExternal = false,
}: TextLinkProps) {
  const className = cx(
    "font-sans text-main focus-ring transition-standard",
    TONE_CLASS[tone],
  );

  // `data-underline` is what typography.css hangs the underline rule on, so
  // offset and thickness stay consistent with every other underline.
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-underline
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} data-underline className={className}>
      {children}
    </Link>
  );
}
