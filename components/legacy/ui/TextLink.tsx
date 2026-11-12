import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

const TONE_CLASS: Readonly<Record<Tone, string>> = {
  light: "text-accent-text hover:text-accent-hover",
  dark: "text-text-inverse hover:opacity-80",
  brand: "text-text-inverse hover:opacity-80",
} as const;

export type TextLinkProps = {
  children: ReactNode;
  href: string;
  tone: Tone;
  isExternal?: boolean;
};

export function TextLink({
  children,
  href,
  tone,
  isExternal = false,
}: TextLinkProps) {
  const className = cx(
    "font-sans type-p1  transition duration-[var(--duration-fast)] ease-standard",
    TONE_CLASS[tone],
  );

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
