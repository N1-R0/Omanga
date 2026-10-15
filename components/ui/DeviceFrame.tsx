import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A photoreal phone around whatever is passed as the screen.
 *
 * The frame is Freepik's free "Smartphone 15 Pro Max Mockup" (credited in the
 * footer, as its free licence requires), exported from the PSD in
 * public/devices as three layers on its 938 × 1912 canvas:
 *
 *   - frame: the titanium body with the screen (and the Dynamic Island) cut
 *     out, so each screen draws its own island where its status bar expects it
 *   - screen-mask: the screen's rounded shape, used as a CSS mask
 *   - glare: the PSD's highlight across the glass
 *
 * The screen sits at 34, 20 and is 876 × 1869. That is a touch wider than an
 * iPhone screen (0.469 against 0.460), so content is top-aligned and loses a
 * few points off the bottom, below the tab bar.
 *
 * Positioning is the caller's: the root takes no `position`, so a caller's
 * `absolute` never fights a built-in `relative`.
 */

const W = 938;
const H = 1912;
const SCREEN = { left: 34, top: 20, width: 876, height: 1869 };
const pct = (n: number, of: number) => `${(n / of) * 100}%`;

export function DeviceFrame({
  children,
  className,
  sizes = "20rem",
}: {
  children: ReactNode;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div className="relative size-full">
        <div
          className="absolute inset-0"
          style={{
            maskImage: "url(/devices/iphone-15-pro-max-screen-mask.png)",
            maskSize: "100% 100%",
            WebkitMaskImage: "url(/devices/iphone-15-pro-max-screen-mask.png)",
            WebkitMaskSize: "100% 100%",
          }}
        >
          <div
            className="absolute overflow-hidden bg-white"
            style={{
              left: pct(SCREEN.left, W),
              top: pct(SCREEN.top, H),
              width: pct(SCREEN.width, W),
              height: pct(SCREEN.height, H),
            }}
          >
            {children}
          </div>
        </div>
        <Image
          src="/devices/iphone-15-pro-max-glare.png"
          alt=""
          fill
          sizes={sizes}
          className="pointer-events-none"
        />
        <Image
          src="/devices/iphone-15-pro-max-frame.png"
          alt=""
          fill
          sizes={sizes}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
}
