import Image from "next/image";

import { cx } from "@/lib/cx";

import { FeatureArtBox } from "./FeatureArtBox";

/**
 * Card one's visual — the account drawer.
 *
 * A bottom sheet listing the currencies held in one wallet — the card's claim
 * drawn rather than stated: four balances, four currencies, one account.
 *
 * The sheet is taller than the room below it, so its last row is clipped by the
 * card's edge. That is deliberate and is the same device `pv-panel` uses: a
 * drawer that ends inside the frame reads as a small white box, one that runs
 * off the edge reads as a sheet pulled up over a screen behind it.
 *
 * ---------------------------------------------------------------------------
 * [PLACEHOLDER] The four balances are invented, and they are the only invented
 * figures in this section.
 *
 * They are here because a currency list with no amounts does not read as a
 * wallet, and because the alternative — real balances — does not exist to be
 * used. They are never announced: `FeatureArtBox` hides this subtree from
 * assistive technology entirely, so no screen reader reads a balance out.
 *
 * They are also in source rather than baked into an image, which is the whole
 * argument `PaymentsVisual` makes for its own figure: greppable, reviewable in a
 * diff, changed by editing one line. `solutions.content.ts` records the previous
 * generation's baked-in figures as an open blocker for exactly this reason.
 *
 * Confirm or replace before launch.
 */

/**
 * The four currencies, in the order the drawer lists them.
 *
 * The three funding currencies the site publishes — USD, GBP, CAD — plus NGN,
 * which is the corridor the live rate ticker's first pair already names. No
 * currency appears here that the site does not state elsewhere: the wallet holds
 * six and only four fit the sheet, so this is a subset, never an invention.
 */
const ACCOUNTS = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    balance: "₦1,240,500",
    flag: "/flags/nigeria.svg",
    isActive: true,
  },
  {
    code: "USD",
    name: "US Dollar",
    balance: "$3,180.42",
    flag: "/flags/united-states.svg",
    isActive: false,
  },
  {
    code: "GBP",
    name: "British Pound",
    balance: "£745.20",
    flag: "/flags/united-kingdom.svg",
    isActive: false,
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    balance: "C$960.00",
    flag: "/flags/canada.svg",
    isActive: false,
  },
] as const;

export function AccountDrawerVisual() {
  /*
    [CHANGED, 2026-10-18] Static. The sheet used to rise in and its rows
    stagger in on scroll; removed with every other animation on the site
    (owner request, crawlability).
  */
  return (
    <FeatureArtBox>
      <div className="pf-drawer pf-surface">
        <span className="pf-grabber" />

        <p className="pf-drawer-title">Your accounts</p>

        {ACCOUNTS.map((account) => {
          return (
            <div
              key={account.code}
              className={cx(
                "pf-account-row",
                account.isActive && "pf-account-row-active",
              )}
            >
              <span className="pf-flag">
                <Image
                  src={account.flag}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </span>

              <span>
                <span className="pf-account-code block">{account.code}</span>
                <span className="pf-account-name block">{account.name}</span>
              </span>

              <span className="pf-account-balance">{account.balance}</span>
            </div>
          );
        })}
      </div>
    </FeatureArtBox>
  );
}
