export type NavIconName =
  | "wallet"
  | "globe"
  | "rate"
  | "shield"
  | "list"
  | "care"
  | "home"
  | "plane"
  | "briefcase"
  | "compass"
  | "book"
  | "info"
  | "lock"
  | "tag"
  | "chat";

/**
 * The shared line-icon set, drawn on a 20px grid with a 1.6 stroke, in an
 * `accent-subtle` circle. `lg` (64px circle, 24px icon) leads the icon tiles
 * (Asset's icon card); `sm` (32px circle, 18px icon) is kept for small rows.
 * The header menu used `sm` until the owner removed menu icons (2026-10-21).
 * `bare` (2026-10-25) is the 24px icon alone in the text colour, no circle,
 * for the Why Omanga cards (Vizcom reference). `tile` (2026-10-26) is the
 * header menu's: a 20px icon in ink on a 44px surface-muted square, after
 * Ramp's menu (owner reference). Decorative: the text beside it names the
 * thing.
 */
const PATHS: Record<NavIconName, string> = {
  wallet: "M3 6.5A2.5 2.5 0 0 1 5.5 4H15v3M3 6.5V15a2 2 0 0 0 2 2h11a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5.5A2.5 2.5 0 0 1 3 6.5Zm11 5h.01",
  globe: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm-7-7h14M10 3c1.8 1.9 2.8 4.4 2.8 7s-1 5.1-2.8 7c-1.8-1.9-2.8-4.4-2.8-7s1-5.1 2.8-7Z",
  rate: "M4 7h11l-3-3M16 13H5l3 3",
  shield: "M10 3 4 5.5v4.2c0 3.6 2.6 6.4 6 7.3 3.4-.9 6-3.7 6-7.3V5.5L10 3Zm-2.5 7 1.8 1.8L13 8",
  list: "M7 6h9M7 10h9M7 14h9M4 6h.01M4 10h.01M4 14h.01",
  care: "M10 4v12M4 10h12",
  home: "M3.5 9 10 3.5 16.5 9M5.5 7.5V16h9V7.5M8.5 16v-4h3v4",
  plane: "M17 4 3.5 9.5l5 1.5m8.5-7-3.5 13-5-6m8.5-7-8.5 7",
  briefcase: "M3 7h14v9H3V7Zm4 0V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 11h14",
  compass: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm2.8-9.8-1.6 4-4 1.6 1.6-4 4-1.6Z",
  book: "M4 4.5A1.5 1.5 0 0 1 5.5 3H16v12H5.5A1.5 1.5 0 0 0 4 16.5v-12ZM4 16.5A1.5 1.5 0 0 0 5.5 18H16",
  info: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-4V9.5M10 7h.01",
  lock: "M5 9h10v8H5V9Zm2 0V6.5a3 3 0 0 1 6 0V9",
  tag: "M3.5 10.5V4a.5.5 0 0 1 .5-.5h6.5l6 6-7 7-6-6Zm3.5-4h.01",
  chat: "M4 4.5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm3 5h.01m3 0h.01m3 0h.01",
};

export function NavIcon({ name, size = "sm" }: { name: NavIconName; size?: "sm" | "lg" | "bare" | "tile" }) {
  const px = size === "sm" ? 18 : size === "tile" ? 20 : 24;
  if (size === "tile") {
    return (
      <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-surface-muted text-text">
        <svg width={px} height={px} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={PATHS[name]} />
        </svg>
      </span>
    );
  }
  if (size === "bare") {
    return (
      <svg aria-hidden width={px} height={px} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <path d={PATHS[name]} />
      </svg>
    );
  }
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent-subtle text-brand-700 ${size === "lg" ? "size-16" : "size-8"}`}>
      <svg width={px} height={px} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d={PATHS[name]} />
      </svg>
    </span>
  );
}
