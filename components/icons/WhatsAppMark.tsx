import Image from "next/image";

import { cx } from "@/lib/cx";
import type { IconSize, Tone } from "@/types/ui.types";

const SIZE_CLASS: Readonly<Record<IconSize, string>> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const;

const SIZE_PX: Readonly<Record<IconSize, number>> = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

const TONE_FILTER_CLASS: Readonly<Record<Tone, string>> = {
  light: "",
  dark: "invert",
  brand: "invert",
} as const;

export type WhatsAppMarkProps = {
  size: IconSize;
  tone: Tone;
};

export function WhatsAppMark({ size, tone }: WhatsAppMarkProps) {
  return (
    <Image
      src="/whatsapp.png"
      alt=""
      width={SIZE_PX[size]}
      height={SIZE_PX[size]}
      className={cx(SIZE_CLASS[size], "shrink-0", TONE_FILTER_CLASS[tone])}
    />
  );
}
