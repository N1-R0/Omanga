export const notFound = {
  meta: {
    title: "Page not found | Omanga",
    description: "This page doesn't exist. Find Omanga's travel wallet, insurance plans for Nigeria and how to reach us.",
  },
  eyebrow: "404",
  title: "We couldn't find that page",
  text: "The page you were looking for may have moved, or the link that brought you here may be out of date. Everything below still works.",
  action: { label: "Go to the homepage", path: "/" },
  linksTitle: "You might be looking for",
  links: [
    { label: "Payments", path: "/payments" },
    { label: "Insurance", path: "/insurance" },
    { label: "Plans and prices", path: "/insurance/plans" },
    { label: "About Omanga", path: "/about" },
    { label: "Help and contact", path: "/help" },
  ],
} as const;
