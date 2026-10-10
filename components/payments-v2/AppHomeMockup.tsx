import type { CSSProperties, ReactNode } from "react";

import type { AppHomeSample } from "@/content/payments-hero.content";
import { cx } from "@/lib/cx";

/**
 * The Omanga app's home screen, drawn in HTML inside a phone frame.
 *
 * [CHANGED, 2026-10-10] Matched to a screenshot of the live app the owner
 * supplied, rather than read off the source alone. Exactly one screen, 393 ×
 * 852 pt (iPhone 16 / 15 Pro), clipped like a real screenshot. Positions are
 * the screenshot's (taken on a 402 × 874 device), scaled to this frame:
 *
 *   - photo header to the sheet; avatar + "Hi, {name} ✌🏼"; a round blue
 *     settings button on the right
 *   - currency chip (flag, "NGN", chevron), balance in whole naira with the
 *     hide-balance eye, "Last updated … ago"
 *   - four 57pt round actions at 12% white with labels
 *   - the #FAFAFA sheet: the pink "Continue setup" card with its 3D art, then
 *     "Recent transactions" in a bordered card
 *   - the floating glass tab bar (Home, Insurance, Cards, Account) and the
 *     home indicator over the bottom of the list
 *
 * Inter is the app's face; the site does not ship it, so the system UI stack
 * (SF Pro on Apple devices) stands in.
 *
 * Positioning is the caller's: the root takes no `position`, so a caller's
 * `absolute` never fights a built-in `relative`.
 *
 * Purely decorative and `aria-hidden`: the hero copy already says what it
 * shows, and a screen reader walking a fake balance would be noise.
 */

const SCREEN_PT = 393;
const SCREEN_H_PT = 852;
const u = (pt: number) => `calc(${pt} * var(--u))`;

const ICONS = {
  add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  send: "M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z",
  convert:
    "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
  more: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  gear: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
  chevron:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13.5L7.5 11l1.42-1.41L12 12.67l3.08-3.08L16.5 11 12 15.5z",
  eyeOff:
    "M2 5.27 3.28 4 20 20.72 18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58-5 0-9.27-3.11-11-7.5.69-1.76 1.79-3.31 3.19-4.54L2 5.27M12 9a3 3 0 0 1 3 3c0 .35-.06.69-.17 1L11 9.17c.31-.11.65-.17 1-.17m0-4.5c5 0 9.27 3.11 11 7.5-.82 2.08-2.21 3.88-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12C19.17 8.64 15.76 6.5 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12c1.65 3.36 5.06 5.5 8.82 5.5.69 0 1.37-.07 2-.21L11.72 15A3.06 3.06 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13z",
  in: "M15 19v-2H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z",
  out: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  shield:
    "M10.5 13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13zM12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z",
  card: "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
  person:
    "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
} as const;

type IconName = keyof typeof ICONS;

function Icon({ name, size, color = "currentColor" }: { name: IconName; size: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: u(size), height: u(size) }} fill={color}>
      <path d={ICONS[name]} />
    </svg>
  );
}

function Text({ size, weight, color, style, children }: {
  size: number;
  weight: 400 | 500 | 600 | 700;
  color: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span style={{ fontSize: u(size), fontWeight: weight, color, lineHeight: 1.3, ...style }}>
      {children}
    </span>
  );
}

/** Absolutely placed block, in screen points from the top. */
function At({ top, children, className, style }: {
  top: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cx("absolute inset-x-0", className)} style={{ top: u(top), ...style }}>
      {children}
    </div>
  );
}

const ACTIONS: { icon: IconName; label: string }[] = [
  { icon: "add", label: "Add money" },
  { icon: "send", label: "Send" },
  { icon: "convert", label: "Convert" },
  { icon: "more", label: "More" },
];

/*
  [DECISION NEEDED] The app's tab bar has a "Cards" tab, and the mockup shows
  the app as it is. Site copy elsewhere avoids any card claim (Omanga issues no
  card) — drop this entry if the mockup must follow that rule too.
*/
const TABS: { icon: IconName; label: string }[] = [
  { icon: "home", label: "Home" },
  { icon: "shield", label: "Insurance" },
  { icon: "card", label: "Cards" },
  { icon: "person", label: "Account" },
];

const SHEET_TOP = 453;

export function AppHomeMockup({ sample, className }: { sample: AppHomeSample; className?: string }) {
  return (
    <div
      aria-hidden
      className={cx(
        "rounded-[13%/6%] bg-[#0d0d10] p-[1.3%] shadow-[0_40px_80px_-20px_rgb(20_10_14/0.45)] ring-1 ring-black/40",
        className,
      )}
    >
      {/* The screen is the query container; `--u` is one app point. */}
      <div className="relative overflow-hidden rounded-[12%/5.5%] bg-[#fafafa] [container-type:inline-size]">
        <div
          className="relative overflow-hidden"
          style={{
            ["--u" as string]: `calc(100cqw / ${SCREEN_PT})`,
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
            aspectRatio: `${SCREEN_PT} / ${SCREEN_H_PT}`,
          }}
        >
          {/* Photo header: the top of the screen down to the sheet. */}
          <div
            className="absolute inset-x-0 top-0 bg-[#2F6495] bg-cover bg-center"
            style={{ height: u(SHEET_TOP + 20), backgroundImage: "url(/app-home/header-background.jpg)" }}
          />

          {/* Status bar */}
          <At top={0} className="flex items-center justify-between" style={{ height: u(54), padding: `${u(12)} ${u(34)} 0` }}>
            <Text size={16} weight={600} color="#fff">9:41</Text>
            <span
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
              style={{ top: u(11), width: u(124), height: u(36) }}
            />
            <span className="flex items-center" style={{ gap: u(6) }}>
              <span className="flex items-end" style={{ gap: u(2), height: u(11) }}>
                {[4, 6, 8, 11].map((h) => (
                  <span key={h} className="block rounded-[1px] bg-white" style={{ width: u(3), height: u(h) }} />
                ))}
              </span>
              <span className="block rounded-[3px] border border-white/60 p-px" style={{ width: u(25), height: u(12) }}>
                <span className="block h-full rounded-[1.5px] bg-white" style={{ width: "80%" }} />
              </span>
            </span>
          </At>

          {/* Greeting bar */}
          <At top={62} className="flex items-center justify-between" style={{ padding: `0 ${u(20)}` }}>
            <span className="flex items-center" style={{ gap: u(9) }}>
              <span className="grid place-items-center rounded-full bg-[#ADA424]" style={{ width: u(36), height: u(36) }}>
                <Text size={16} weight={700} color="#fff">{sample.firstName.charAt(0)}</Text>
              </span>
              <Text size={20} weight={600} color="#fff" style={{ letterSpacing: u(-0.3) }}>
                Hi, {sample.firstName} ✌🏼
              </Text>
            </span>
            <span
              className="grid place-items-center rounded-full bg-[#1E88E5] shadow-[0_4px_14px_rgb(30_136_229/0.45)]"
              style={{ width: u(44), height: u(44), boxShadow: `0 0 0 ${u(3)} rgb(30 136 229 / 0.3), 0 ${u(4)} ${u(14)} rgb(0 0 0 / 0.25)` }}
            >
              <Icon name="gear" size={26} color="#fff" />
            </span>
          </At>

          {/* Balance */}
          <At top={183} className="flex flex-col items-center" style={{ gap: u(10) }}>
            <span className="flex items-center rounded-full bg-white/10" style={{ gap: u(7), padding: `${u(6)} ${u(14)}` }}>
              <span
                className="block shrink-0 rounded-full"
                style={{ width: u(18), height: u(18), background: "linear-gradient(90deg,#008751 33.3%,#fff 33.3% 66.6%,#008751 66.6%)" }}
              />
              <Text size={15} weight={600} color="#fff">NGN</Text>
              <Icon name="chevron" size={16} color="#fff" />
            </span>
            <span className="flex items-center" style={{ gap: u(10) }}>
              <Text size={46} weight={700} color="#fff" style={{ letterSpacing: u(-1.2), lineHeight: 1.1 }}>
                ₦{sample.balance}
              </Text>
              <Icon name="eyeOff" size={22} color="#fff" />
            </span>
            <Text size={13.5} weight={400} color="rgb(255 255 255 / 0.75)">Last updated 13 sec ago</Text>
          </At>

          {/* Quick actions */}
          <At top={340} className="flex justify-center" style={{ gap: u(24) }}>
            {ACTIONS.map((action) => (
              <span key={action.label} className="flex flex-col items-center" style={{ width: u(64), gap: u(10) }}>
                <span className="grid place-items-center rounded-full bg-white/12" style={{ width: u(57), height: u(57) }}>
                  <Icon name={action.icon} size={22} color="#fff" />
                </span>
                <Text size={13} weight={600} color="#fff" style={{ whiteSpace: "nowrap" }}>{action.label}</Text>
              </span>
            ))}
          </At>

          {/* Sheet */}
          <At
            top={SHEET_TOP}
            className="bottom-0 bg-[#fafafa]"
            style={{ borderRadius: `${u(15)} ${u(15)} 0 0`, padding: `${u(19)} ${u(16)} 0` }}
          >
            {/* Continue setup */}
            <div className="flex items-center bg-[#FBEAEE]" style={{ gap: u(16), padding: u(16), borderRadius: u(16) }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative, inside an aria-hidden mockup */}
              <img src="/app-home/complete-kyc.webp" alt="" style={{ width: u(56), height: u(56) }} />
              <span className="flex flex-col" style={{ gap: u(4) }}>
                <Text size={15} weight={600} color="#1E1E1E">Continue setup</Text>
                <Text size={13} weight={400} color="#666666">Use this guide to finish setting up your account</Text>
                <Text size={14} weight={600} color="#AE2448" style={{ marginTop: u(6) }}>Complete setup</Text>
              </span>
            </div>

            <div className="flex items-center justify-between" style={{ padding: `${u(19)} ${u(8)} ${u(12)}` }}>
              <Text size={14} weight={500} color="#757575">Recent transactions</Text>
              <Text size={14} weight={500} color="#AE2448">See all</Text>
            </div>
            <div className="overflow-hidden border border-[#EDEDED] bg-white" style={{ borderRadius: u(20), padding: `0 ${u(16)}` }}>
              {sample.transactions.map((row, index) => (
                <div
                  key={row.title}
                  className={cx("flex items-center", index > 0 && "border-t border-[#EEEEEE]")}
                  style={{ gap: u(12), padding: `${u(16)} 0` }}
                >
                  <span className="grid shrink-0 place-items-center rounded-full bg-[#F5F5F5]" style={{ width: u(40), height: u(40) }}>
                    {row.initials !== undefined ? (
                      <Text size={13} weight={500} color="#6B7A90">{row.initials}</Text>
                    ) : (
                      <Icon name={row.kind === "convert" ? "convert" : row.kind} size={20} color="#1E1E1E" />
                    )}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col" style={{ gap: u(2) }}>
                    <Text size={16} weight={500} color="#1E1E1E" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {row.title}
                    </Text>
                    <Text size={14} weight={400} color="#767676">{row.detail}</Text>
                  </span>
                  <span className="flex flex-col items-end" style={{ gap: u(2) }}>
                    <Text size={16} weight={500} color="#1E1E1E">{row.amount}</Text>
                    {row.secondary !== undefined && (
                      <Text size={13} weight={400} color="#8B96A8">{row.secondary}</Text>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </At>

          {/* Floating glass tab bar and the home indicator. */}
          <div
            className="absolute flex items-center justify-between rounded-full border border-black/5 bg-white/80 shadow-[0_6px_24px_rgb(0_0_0/0.12)] backdrop-blur-md"
            style={{ left: u(22), right: u(22), bottom: u(28), padding: u(5) }}
          >
            {TABS.map((tab, index) => {
              const active = index === 0;
              const color = active ? "#AE2448" : "#1E1E1E";
              return (
                <span
                  key={tab.label}
                  className={cx("flex flex-1 flex-col items-center rounded-full", active && "bg-black/[0.06]")}
                  style={{ padding: `${u(7)} 0`, gap: u(2) }}
                >
                  <Icon name={tab.icon} size={24} color={color} />
                  <Text size={10.5} weight={600} color={color}>{tab.label}</Text>
                </span>
              );
            })}
          </div>
          <span
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{ bottom: u(8), width: u(139), height: u(5) }}
          />
        </div>
      </div>
    </div>
  );
}
