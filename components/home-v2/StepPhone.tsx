import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { cx } from "@/lib/cx";

/**
 * A phone for the How it works cards, with the same unit system as
 * `AppHomeMockup` (`--u` is one app point on a 393pt-wide screen) so a screen
 * drawn here and the home screen read as the same app.
 *
 * Only the top of the phone is meant to show: the card crops it, as in the
 * Norma reference. Decorative and `aria-hidden`; the card's text says what the
 * step is.
 */

const SCREEN_PT = 393;
const SCREEN_H_PT = 852;
export const u = (pt: number) => `calc(${pt} * var(--u))`;

export function StepPhone({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <DeviceFrame
      className={cx("drop-shadow-[0_24px_24px_rgb(20_10_14/0.25)]", className)}
    >
      <div className="[container-type:inline-size]">
        <div
          className="relative flex flex-col overflow-hidden"
          style={{
            ["--u" as string]: `calc(100cqw / ${SCREEN_PT})`,
            fontFamily:
              '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
            aspectRatio: `${SCREEN_PT} / ${SCREEN_H_PT}`,
            color: "#1E1E1E",
          }}
        >
          <StatusBar />
          {children}
        </div>
      </div>
    </DeviceFrame>
  );
}

function StatusBar() {
  return (
    <div
      className="relative flex shrink-0 items-center justify-between"
      style={{ height: u(54), padding: `${u(12)} ${u(34)} 0` }}
    >
      <AppText size={16} weight={600}>
        9:41
      </AppText>
      <span
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
        style={{ top: u(11), width: u(124), height: u(36) }}
      />
      <span className="flex items-end" style={{ gap: u(2), height: u(11) }}>
        {[4, 6, 8, 11].map((h) => (
          <span
            key={h}
            className="block rounded-[1px] bg-[#1E1E1E]"
            style={{ width: u(3), height: u(h) }}
          />
        ))}
      </span>
    </div>
  );
}

export function AppText({
  size,
  weight,
  color,
  style,
  children,
}: {
  size: number;
  weight: 400 | 500 | 600 | 700;
  color?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      style={{
        fontSize: u(size),
        fontWeight: weight,
        color,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * The same phone frame around a real screenshot from the app (iOS simulator,
 * iPhone 17 Pro, 1206 × 2622). The screenshot carries its own status bar and
 * Dynamic Island, so neither is drawn here.
 */
export function ScreenshotPhone({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <DeviceFrame
      className={cx("drop-shadow-[0_24px_24px_rgb(20_10_14/0.25)]", className)}
    >
      <div className="relative aspect-[1206/2622]">
        <Image
          src={src}
          alt=""
          fill
          sizes="16rem"
          className="object-cover object-top"
        />
      </div>
    </DeviceFrame>
  );
}
