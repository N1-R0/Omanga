export type HelpTopic = { id: string; label: string; items: ReadonlyArray<{ q: string; a: string }> };

export const help = {
  meta: {
    title: "Omanga Help and FAQs",
    description: "Find answers about your Omanga wallet, transfers, exchange rates and health cover for Nigeria.",
    path: "/help",
  },
  eyebrow: "Help",
  heading: "What do you need help with?",
  sub: "Choose a topic below.",
  topics: [
    {
      id: "wallet",
      label: "Wallet",
      items: [
        { q: "What is the Omanga wallet?", a: "A wallet where you can hold supported currencies separately, including dollars, pounds, Canadian dollars and naira." },
        { q: "How do I add money?", a: "Add US dollars, pounds or Canadian dollars." },
        { q: "Is it free?", a: "Opening a wallet is free. Any applicable charge is shown before you confirm." },
        { q: "Who runs my wallet?", a: "Fuspay Technologies, a microfinance bank licensed by the Central Bank of Nigeria." },
      ],
    },
    {
      id: "sending-money",
      label: "Sending money",
      items: [
        { q: "How do I pay a seller?", a: "Ask for their bank details, enter them in Omanga, check the recipient's name and amount, then confirm." },
        { q: "Can I send to a Nigerian bank?", a: "Yes, you can send to Nigerian bank accounts." },
      ],
    },
    {
      id: "mobile-money",
      label: "Mobile money",
      items: [
        { q: "How do I send?", a: "Choose Send, select Mobile money, enter the destination details and amount, then review and confirm." },
      ],
    },
    {
      id: "exchange-rates",
      label: "Exchange rates",
      items: [
        { q: "Is the website rate the rate I receive?", a: "No. The website displays a reference rate. Your exact rate appears in the app before you confirm." },
        { q: "Can I convert naira back?", a: "Yes, you can convert naira back to dollars." },
      ],
    },
    {
      id: "health-cover",
      label: "Health cover",
      items: [
        { q: "Does it work outside Nigeria?", a: "No. It applies in Nigeria only." },
        { q: "How long does it last?", a: "30 days from the day your policy is issued." },
        { q: "Who provides it?", a: "Phillips HMO, regulated by NAICOM." },
        { q: "What does each plan include?", a: "Benefits vary by plan. See the plan comparison and policy terms for the full details." },
        { q: "Does it renew automatically?", a: "No. It is a one-time payment for 30 days." },
        { q: "When do I get my policy?", a: "After you pay, you receive a confirmation email with a registration form. Once you complete it, your policy arrives by email within 24 to 48 hours, with your benefits and the list of hospitals." },
      ],
    },
    {
      id: "your-account",
      label: "Your account",
      items: [
        { q: "Is there an Omanga app?", a: "The app is being prepared for the App Store and Google Play. Until it is available, you can open your wallet and buy health cover on the web." },
        { q: "How do I log in?", a: "Select Log in at the top of the website." },
      ],
    },
  ] satisfies HelpTopic[],
  closing: {
    title: "Still need help?",
    text: "Speak to a person. Message us on WhatsApp or email info@omanga.biz.",
    whatsapp: "Message us",
    email: "Email us",
  },
} as const;
