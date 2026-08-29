import { Icon } from "@/components/ui/Icon";
import type { IconSize } from "@/types/ui.types";

/** Wallet. Several currencies held in one account. Path data from lucide-react (ISC). */

export type WalletProps = {
  size: IconSize;
  label?: string;
};

export function Wallet({ size, label }: WalletProps) {
  return (
    <Icon size={size} label={label}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </Icon>
  );
}
