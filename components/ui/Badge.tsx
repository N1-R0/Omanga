import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import type { Tone } from "@/types/ui.types";

const TONE_CLASS: Readonly<Record<Tone, string>> = {
  light: "bg-surface border-border text-text",
  dark: "bg-neutral-0/10 border-neutral-0/10 text-text-inverse",
  brand: "bg-neutral-0/10 border-neutral-0/10 text-text-inverse",
} as const;

export type BadgeProps = {
  children: ReactNode;
  tone: Tone;
};

export function Badge({ children, tone }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-4 py-2 font-sans type-p3",
        TONE_CLASS[tone],
      )}
    >
      {children}
    </span>
  );
}
