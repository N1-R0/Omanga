import type { CSSProperties, ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * The device frame (design system § Components › Phone frame), owner's spec
 * from Figma (2026-10-22): a plain rectangle, 309 × 675, 30px corner radius,
 * with the screen as its fill, and a 6px border outside it. The border is the
 * design system's glass (owner, same day): the cards' translucent white fill,
 * 1px white edge (5px fill + 1px edge = 6px), 10px backdrop blur and float
 * shadow, so the fabric behind shows through. No bezel, side buttons or
 * Dynamic Island (owner removed it).
 *
 * The screen is drawn as an app screenshot would show it: the status bar and
 * home indicator are part of the screen, not the frame. It's laid
 * out in real iPhone points, 390 × 852 (the frame's 309 : 675 ratio), and
 * scaled to fit, so app screens written for the hero phone keep their sizes.
 *
 * `--phone-scale` sizes the frame (1 = 309 × 675). The border stays 6px at any
 * scale. The parent crops it when only the top shows. Decorative: the screen
 * is an illustrative app state, hidden from assistive tech.
 *
 * The status bar SVGs come from the open-design `mobile-app` seed
 * (github.com/nexu-io/open-design, Apache-2.0).
 */
const FRAME_W = 309;
const FRAME_H = 675;
const SCREEN_W = 390;
const SCREEN_H = Math.round((SCREEN_W * FRAME_H) / FRAME_W); // 852

export function PhoneFrame({
  children,
  className,
  time = "9:41",
  bare = false,
  bezel = "glass",
}: {
  children: ReactNode;
  /** Sets `--phone-scale` (e.g. "[--phone-scale:0.9] lg:[--phone-scale:1]"). */
  className?: string;
  time?: string;
  /** The child is a full screen capture (status bar included): it fills the
   *  frame as is, and the frame draws no status bar or home indicator. */
  bare?: boolean;
  /** "glass" (default, the hero) or "black": the owner's original 6px solid
   *  black stroke, used by the pay-in-person walkthrough (owner, 2026-10-22). */
  bezel?: "glass" | "black";
}) {
  return (
    <div
      aria-hidden
      className={cx(
        "relative shrink-0 rounded-[36px] shadow-float",
        bezel === "glass"
          ? "border border-[var(--glass-edge)] bg-[var(--glass-fill)] p-[5px] backdrop-blur-[var(--glass-blur)]"
          : "bg-[#000] p-[6px]",
        className,
      )}
    >
      <div
        className="relative overflow-hidden rounded-[30px] bg-surface"
        style={{ width: `calc(${FRAME_W}px * var(--phone-scale, 1))`, height: `calc(${FRAME_H}px * var(--phone-scale, 1))` } as CSSProperties}
      >
        {bare ? (
          children
        ) : (
          <div
            className="absolute top-0 left-0 flex origin-top-left flex-col text-text"
            style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(calc(${FRAME_W / SCREEN_W} * var(--phone-scale, 1)))` }}
          >
            <div className="flex h-[54px] shrink-0 items-start justify-between px-[30px] pt-[19px] text-[15px] font-medium tracking-[-0.01em] tabular-nums">
              <span>{time}</span>
              <span className="inline-flex items-center gap-1.5 fill-current">
                <svg viewBox="0 0 17 11" className="h-[11px] w-[17px]">
                  <rect x="0" y="7" width="3" height="4" rx="0.6" />
                  <rect x="4" y="5" width="3" height="6" rx="0.6" />
                  <rect x="8" y="3" width="3" height="8" rx="0.6" />
                  <rect x="12" y="0" width="3" height="11" rx="0.6" />
                </svg>
                <svg viewBox="0 0 17 11" className="h-[11px] w-[17px]">
                  <path d="M8.5 1.5C5.5 1.5 2.7 2.6 0.5 4.6L2 6.1C3.8 4.5 6.1 3.6 8.5 3.6c2.4 0 4.7 0.9 6.5 2.5l1.5-1.5c-2.2-2-5-3.1-8-3.1zM3.5 7.6L5 9.1c1-0.9 2.2-1.4 3.5-1.4 1.3 0 2.5 0.5 3.5 1.4l1.5-1.5c-1.4-1.3-3.1-2-5-2-1.9 0-3.6 0.7-5 2zM6.5 10.6l2 2 2-2c-0.5-0.5-1.2-0.8-2-0.8s-1.5 0.3-2 0.8z" />
                </svg>
                <svg viewBox="0 0 25 11" className="h-[11px] w-[25px]">
                  <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" fill="none" stroke="currentColor" strokeOpacity="0.45" />
                  <rect x="22" y="3.5" width="1.5" height="4" rx="0.4" fillOpacity="0.45" />
                  <rect x="2" y="2" width="18" height="7" rx="1.4" />
                </svg>
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
            {/* Home indicator, always the last thing on the screen. */}
            <div className="relative h-7 shrink-0">
              <span className="absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-text opacity-85" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
