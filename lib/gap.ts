import type { Gap } from "@/types/ui.types";

export const GAP_CLASS: Readonly<Record<Gap, string>> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-10",
  "3xl": "gap-12",
  "4xl": "gap-16",
} as const;
