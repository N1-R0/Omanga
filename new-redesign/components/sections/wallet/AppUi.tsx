import type { ReactNode } from "react";

/**
 * Shared pieces for the drawn Omanga app screens (the hero phone, the feature
 * cards): the app's light-theme colours (omanga-mobile constants/colors.ts,
 * kept as hex because they're the app's, not site tokens) and its icons.
 */
export const APP = {
  card: "#FAFAFA",
  hairline: "#EEECEC",
  fillStrong: "#E8E5E6",
  text: "#191617",
  secondary: "#5D5B5B",
  tertiary: "#6F6D6D",
  accent: "#AE2448",
};

/** Material Icons (Apache-2.0) and MDI's eye-off-outline, as the app sets them, filled in currentColor. */
export type GlyphName =
  | "person-outline"
  | "notifications-none"
  | "keyboard-arrow-down"
  | "eye-off-outline"
  | "add"
  | "arrow-outward"
  | "sync-alt"
  | "more-horiz"
  | "currency-exchange"
  | "north-east";

/** Material Icons (and MDI's eye-off-outline, as in balance-figure), filled in currentColor. */
const GLYPHS: Record<GlyphName, string> = {
  "person-outline":
    "M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  "notifications-none":
    "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z",
  "keyboard-arrow-down": "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  "eye-off-outline":
    "M2 5.27 3.28 4 20 20.72 18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58-5 0-9.27-3.11-11-7.5.69-1.76 1.79-3.31 3.19-4.54L2 5.27M12 9a3 3 0 0 1 3 3c0 .35-.06.69-.17 1L11 9.17c.31-.11.65-.17 1-.17m0-4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12 9.821 9.821 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.821 9.821 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13z",
  add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  "arrow-outward": "M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z",
  "sync-alt": "M22 8l-4-4v3H3v2h15v3l4-4zM2 16l4 4v-3h15v-2H6v-3l-4 4z",
  "more-horiz":
    "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  "currency-exchange":
    "M12.89 11.1c-1.78-.59-2.64-.96-2.64-1.9 0-1.02 1.11-1.39 1.81-1.39 1.31 0 1.79.99 1.9 1.34l1.58-.67c-.15-.44-.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6.56-2.62 2.85-2.62 2.96 0 2.27 2.25 2.91 3.35 3.31 1.58.56 2.28 1.07 2.28 2.03 0 1.13-1.05 1.61-1.98 1.61-1.82 0-2.34-1.87-2.4-2.09l-1.66.67c.63 2.19 2.28 2.78 3.02 2.96V19h1.75v-1.24c.52-.09 3.02-.59 3.02-3.22.01-1.39-.6-2.61-3.4-3.44zM3 21H1v-6h6v2H4.52c1.61 2.41 4.36 4 7.48 4 4.97 0 9-4.03 9-9h2c0 6.08-4.92 11-11 11-3.72 0-7.01-1.85-9-4.67V21zm-2-9C1 5.92 5.92 1 12 1c3.72 0 7.01 1.85 9 4.67V3h2v6h-6V7h2.48C17.87 4.59 15.12 3 12 3c-4.97 0-9 4.03-9 9H1z",
  "north-east": "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z",
};

export function Glyph({ name, size }: { name: GlyphName; size: number }): ReactNode {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current">
      <path d={GLYPHS[name]} />
    </svg>
  );
}
