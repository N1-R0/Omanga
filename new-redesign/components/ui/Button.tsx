import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * Buttons and button-styled links (design system § Components › Buttons).
 *
 *   primary    brand fill. One per view.
 *   secondary  white with a strong border.
 *   ghost      text only, turns brand on hover.
 *   inverse    white fill, for photos, textures and dark surfaces.
 *   onPhoto    text only in white, the secondary action beside a primary on a
 *              photo (keeps one filled button per view).
 *
 * Min height 44, padding 12 × 20, fully rounded ([CHANGED, 2026-10-25] owner:
 * buttons are pills from now on; they were radius 8). A link is
 * rendered when `href` is given, otherwise a <button>.
 */
type Variant = "primary" | "secondary" | "ghost" | "inverse" | "onPhoto";

const VARIANT: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border border-border-strong bg-surface text-text hover:bg-surface-muted",
  ghost: "px-2 text-text hover:text-accent-text",
  inverse: "bg-neutral-0 text-text hover:bg-neutral-100",
  onPhoto: "px-2 text-text-inverse underline decoration-text-inverse/50 underline-offset-4 hover:decoration-text-inverse",
};

const BASE =
  "type-p3 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 transition-colors duration-[var(--duration-fast)] ease-standard disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-neutral-500";

type Props = {
  children: ReactNode;
  variant?: Variant;
} & ({ href: string; external?: boolean } | { href?: undefined; type?: "button" | "submit"; disabled?: boolean });

export function Button(props: Props) {
  const { children, variant = "primary" } = props;
  const className = cx(BASE, VARIANT[variant]);

  if (props.href !== undefined) {
    return props.external ? (
      <a href={props.href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={props.href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} disabled={props.disabled} className={className}>
      {children}
    </button>
  );
}
