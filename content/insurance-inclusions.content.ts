export type Inclusion = {
  readonly id: string;
  readonly term: string;
  readonly description: string;
};

export type InsuranceInclusionsContent = {
  readonly heading: string;
  readonly inclusions: readonly Inclusion[];
};

export const insuranceInclusionsContent: InsuranceInclusionsContent = {
  heading: "Included in every plan",
  inclusions: [
    {
      id: "telemedicine",
      term: "Telemedicine",
      description:
        "Get advice from a licensed doctor without going to a hospital.",
    },
    {
      id: "roaming",
      term: "Roaming across Nigeria",
      description: "Your health cover applies wherever you go in Nigeria.",
    },
    {
      id: "contact-centre",
      term: "Contact centre",
      description: "Call or message for help with your plan or your care.",
    },
    {
      id: "newsletter",
      term: "Health-tips newsletter",
      description: "Weekly tips to help you stay well.",
    },
    {
      id: "mobile-app",
      term: "Mobile app",
      description: "Manage, renew or extend your plan from your phone.",
    },
  ],
} as const;

export const INSURANCE_INCLUSIONS_HEADING_ID =
  "insurance-inclusions-heading" as const;
