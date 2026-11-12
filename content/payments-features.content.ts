import type { FeatureScreen } from "@/content/home.content";
import type { PageMetaContent } from "@/types/content.types";

export type FeatureStep = { title: string; text: string };

export type PaymentsFeature = {
  meta: PageMetaContent;
  crumb: string;
  hero: { title: string; sub: string; cta: string; screen: FeatureScreen };
  steps?: { eyebrow: string; title: string; items: FeatureStep[]; numbered?: boolean };
  notes: ReadonlyArray<{ eyebrow: string; title: string; text: string }>;
  faq?: { title: string; subLead: string; items: ReadonlyArray<{ q: string; a: string }> };
  closing: { title: string; text: string; cta: string; screen: FeatureScreen };
};

const ARRIVE = "Arrive ready.";

export const multiCurrencyWallet: PaymentsFeature = {
  meta: {
    title: "Multi-Currency Wallet for Nigeria Travel | Omanga",
    description:
      "Hold dollars, pounds, Canadian dollars and naira in separate wallets. Convert when you choose and see your rate before confirming.",
    path: "/payments/multi-currency-wallet",
  },
  crumb: "Multi-currency wallet",
  hero: {
    title: "Keep each currency in its own wallet.",
    sub: "Hold dollars, pounds, Canadian dollars and naira side by side. Convert to naira when you are ready to spend in Nigeria.",
    cta: "Open your wallet",
    screen: {
      kind: "rows",
      title: "Your wallets",
      rows: [
        ["Naira", "₦356,021"],
        ["Pounds", "£120.00"],
        ["US dollars", "$40.00"],
        ["Canadian dollars", "C$0.00"],
      ],
    },
  },
  steps: {
    eyebrow: "How it works",
    title: "How your wallet works",
    items: [
      { title: "Add money", text: "Add funds in a supported currency. There is no minimum amount." },
      { title: "Keep currencies separate", text: "See each balance in its own wallet." },
      { title: "Convert when you choose", text: "Change to naira before you travel or after you arrive. Review the rate before confirming." },
    ],
  },
  notes: [
    {
      eyebrow: "Going home",
      title: "Have money left when it is time to go home?",
      text: "Convert your remaining naira back to dollars in the app before your return flight.",
    },
  ],
  faq: {
    title: "Wallet questions",
    subLead: "Currencies, balances and who runs the wallet.",
    items: [
      { q: "Which currencies can I hold?", a: "US dollars, pounds, Canadian dollars and naira." },
      { q: "Is there a minimum balance?", a: "No minimum amount is required to open or fund the wallet." },
      { q: "Who runs the wallet?", a: "Fuspay Technologies, a microfinance bank licensed by the Central Bank of Nigeria." },
    ],
  },
  closing: {
    title: ARRIVE,
    text: "Keep your travel money organised before you leave.",
    cta: "Open your wallet",
    screen: { kind: "rows", title: "Your wallet", rows: [["Naira", "₦356,021"], ["Pounds", "£120.00"], ["US dollars", "$40.00"]] },
  },
};

export const sendMoney: PaymentsFeature = {
  meta: {
    title: "Send Money to Nigerian Bank Accounts | Omanga",
    description:
      "Pay drivers, shops and family in Nigeria from your Omanga naira wallet. Review the recipient and amount before confirming.",
    path: "/payments/send-money",
  },
  crumb: "Send money",
  hero: {
    title: "Send naira to a bank account in Nigeria.",
    sub: "Pay a driver, a shop or someone at home from your Omanga naira wallet. Check the account details before you confirm.",
    cta: "Open your wallet",
    screen: {
      kind: "rows",
      title: "Send naira",
      rows: [
        ["To", "Bank account"],
        ["Recipient", "Name shown here"],
        ["Amount", "₦15,000"],
      ],
      status: "Check the name, then confirm",
    },
  },
  notes: [
    {
      eyebrow: "Paying in person",
      title: "Paying in person",
      text: "At the market, in a restaurant or at the end of a taxi ride, ask for the seller's bank details. Enter the account number and amount, review the recipient's name and confirm the transfer.",
    },
    {
      eyebrow: "Family",
      title: "Sending to family",
      text: "Send naira to a relative's Nigerian bank account or to another Omanga user.",
    },
    {
      eyebrow: "Check first",
      title: "Before you confirm",
      text: "Take a moment to check the recipient's name, account number and amount. Any applicable charge is shown before you confirm.",
    },
  ],
  faq: {
    title: "Transfer questions",
    subLead: "Who you can send to.",
    items: [
      { q: "Can I send to a Nigerian bank account?", a: "Yes, you can send to Nigerian bank accounts." },
      { q: "Can I send to another Omanga user?", a: "Yes." },
    ],
  },
  closing: {
    title: ARRIVE,
    text: "Be ready to pay for the first ride when you land.",
    cta: "Open your wallet",
    screen: { kind: "rows", title: "Transfer", rows: [["Amount", "₦15,000"], ["To", "Bank account"]], status: "Sent" },
  },
};

export const mobileMoney: PaymentsFeature = {
  meta: {
    title: "Mobile Money Payments Across Africa | Omanga",
    description:
      "Send money from your Omanga wallet to mobile money wallets across Africa. Review the recipient and amount before you confirm.",
    path: "/payments/mobile-money",
  },
  crumb: "Mobile money",
  hero: {
    title: "Pay the way people pay where you are going.",
    sub: "In many African countries, people pay by mobile money. Choose the country, enter the recipient's mobile money details and review the transfer before you confirm.",
    cta: "Open your wallet",
    screen: {
      kind: "rows",
      title: "Mobile money",
      rows: [
        ["Country", "Ghana"],
        ["Send to", "Mobile money wallet"],
        ["Amount", "Shown before you confirm"],
      ],
      status: "Review, then confirm",
    },
  },
  steps: {
    eyebrow: "How to send",
    title: "How to send",
    numbered: true,
    items: [
      { title: "Choose Send, then Mobile money", text: "Start from Send in your Omanga wallet." },
      { title: "Add the details", text: "Select the destination and enter the recipient's details and amount." },
      { title: "Review and confirm", text: "Check the information, then confirm the transfer." },
    ],
  },
  notes: [],
  closing: {
    title: ARRIVE,
    text: "Pay the way people pay where you are going.",
    cta: "Open your wallet",
    screen: { kind: "rows", title: "Mobile money", rows: [["Country", "Ghana"], ["Send to", "Mobile money wallet"]], status: "Ready to send" },
  },
};

export const mobileMoneyCountries = {
  eyebrow: "Where you can send",
  title: "Where you can send",
  sub: "Mobile money works across Africa from the same Omanga wallet.",
} as const;
