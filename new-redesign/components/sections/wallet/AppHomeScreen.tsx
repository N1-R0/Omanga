import Image from "next/image";

import { APP, Glyph } from "@/new-redesign/components/sections/wallet/AppUi";
import { Flag } from "@/new-redesign/components/ui/Flag";
import { walletAppHome as c } from "@/new-redesign/content/wallet.content";

/**
 * The Omanga app's home tab, drawn for the PhoneFrame in real iPhone points
 * (390 wide). Every size, colour and font is the app's own, read from
 * omanga-mobile src/features/dashboard (home-page, app-header, balance-area,
 * balance-figure, quick-actions, transactions-section, transaction-row) and
 * checked against the app running in the simulator (2026-10-22).
 *
 * The colours are the app's light theme (constants/colors.ts), not site
 * tokens, so they stay as hex here: canvas #FFFFFF, card #FAFAFA, hairline
 * #EEECEC, mark fill #E8E5E6, text #191617 / #5D5B5B / #6F6D6D, accent
 * #AE2448. The type is Inter (`--font-app`), as in the app.
 *
 * Kept off the site on purpose: the user's first name and initial become
 * "Hi there" and a person glyph, and payees aren't drawn. Icons are the
 * Material glyphs the app uses (Apache-2.0).
 */
// NGN has no minor units in the app's balances (utils/currency formatAmount).
const naira = (n: number) => `₦${Math.round(Math.abs(n)).toLocaleString("en-US")}`;
const signed = (n: number) => `${n < 0 ? "-" : "+"}${naira(n)}`;

export function AppHomeScreen({ gbpToNgn }: { gbpToNgn: number }) {
  const rows = [
    { title: c.converted.title, time: c.converted.time, amount: c.converted.gbp * gbpToNgn, icon: "currency-exchange" as const },
    ...c.rows.map((r) => ({ ...r, icon: "north-east" as const })),
  ];

  return (
    <div className="h-full bg-[#fff] pt-3 text-left text-[#191617]" style={{ fontFamily: "var(--font-app)" }}>
      {/* AppHeader: 36pt avatar on the card fill, greeting 17 semibold, bare bell. */}
      <div className="flex min-h-9 items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full border" style={{ borderColor: APP.hairline, background: APP.card }}>
            <Glyph name="person-outline" size={20} />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.3px]">{c.greeting} ✌🏼</span>
        </div>
        <Glyph name="notifications-none" size={24} />
      </div>

      {/* BalanceArea, 28 below the header: chip, then 16 to the figure. */}
      <div className="mt-7 flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-4">
          <span
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border pr-2 pl-2.5 text-[14px] leading-5 font-semibold"
            style={{ borderColor: APP.hairline, background: APP.card }}
          >
            <Flag src="/flags/nigeria.svg" size={18} />
            {c.currency}
            <span style={{ color: APP.secondary }}>
              <Glyph name="keyboard-arrow-down" size={18} />
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[42px] leading-[1.2] font-bold tracking-[-1px]">
              <span className="tracking-normal">₦</span>
              {naira(c.balance).slice(1)}
            </span>
            <span style={{ color: APP.tertiary }}>
              <Glyph name="eye-off-outline" size={20} />
            </span>
          </span>
        </div>
        <span className="text-[13px] leading-5" style={{ color: APP.tertiary }}>
          {c.updated}
        </span>
      </div>

      {/* QuickActions, 20 below: 80pt columns, 56pt discs, Add money in brand. */}
      <ul className="mt-5 flex justify-center">
        {c.actions.map((label, i) => (
          <li key={label} className="flex w-20 flex-col items-center gap-2">
            <span
              className="grid size-14 place-items-center rounded-full border"
              style={i === 0 ? { background: APP.accent, borderColor: APP.accent, color: "#fff" } : { background: APP.card, borderColor: APP.hairline }}
            >
              <Glyph name={(["add", "arrow-outward", "sync-alt", "more-horiz"] as const)[i]} size={22} />
            </span>
            <span className="text-center text-[13px] leading-4 font-medium">{label}</span>
          </li>
        ))}
      </ul>

      {/* TransactionsSection, 24 + 12 below: heading inset 8 over a 16-gutter card. */}
      <div className="mt-6 flex flex-col gap-3 px-4 pt-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-[16px] leading-[22px] font-semibold">{c.transactionsLabel}</span>
          <span className="text-[14px] leading-5 font-semibold" style={{ color: APP.accent }}>
            {c.seeAll}
          </span>
        </div>
        <ul className="overflow-hidden rounded-[16px] border px-4" style={{ borderColor: APP.hairline, background: APP.card }}>
          {rows.map((r, i) => (
            <li key={r.title}>
              {/* The rule starts past the 40pt mark and its 12pt gap and runs to the card's edge. */}
              {i > 0 ? <div className="-mr-4 ml-[52px] h-px" style={{ background: APP.hairline }} /> : null}
              <div className="flex items-center gap-3 py-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full" style={{ background: APP.fillStrong }}>
                  <Glyph name={r.icon} size={20} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-[15px] leading-5 font-medium">{r.title}</span>
                  <span className="truncate text-[13px] leading-[18px]" style={{ color: APP.secondary }}>
                    {r.time}
                  </span>
                </span>
                <span className="text-[15px] leading-5 font-medium">{signed(r.amount)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* InsurancePromoCard, 32 below: a 230pt card, photo over a #FAFAFA panel.
          Photo: Lawrence Crayton on Unsplash, the app's own crop. */}
      <div className="mt-8 flex flex-col gap-3">
        <span className="px-6 text-[16px] leading-[22px] font-semibold">{c.promo.heading}</span>
        <div className="mx-4 w-[230px] overflow-hidden rounded-[12px]" style={{ background: APP.card }}>
          <Image src={c.promo.image.src} alt="" width={230} height={Math.round(230 / (c.promo.image.width / c.promo.image.height))} className="block" />
          <p className="p-4 text-[16px] leading-[22px] font-semibold">{c.promo.title}</p>
        </div>
      </div>
    </div>
  );
}
