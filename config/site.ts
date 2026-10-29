export const SITE_NAME = "Omanga" as const;

export const SITE_TAGLINE = "Omanga Integrated Destination Services" as const;

export const CONTACT_EMAIL = "info@omanga.biz" as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.omanga.biz";

export const SITE_LOCALE = "en" as const;

export const WALLET_URL = "https://omanga.useinclude.com/" as const;

export const INSTAGRAM_URL = "https://www.instagram.com/omanga_services/" as const;

export const GA_MEASUREMENT_ID = "G-YC0FXCGBX9" as const;

export const OFFICE_ADDRESS =
  "Plot 175 Akin Adesola St. Victoria Island, Lagos, Nigeria" as const;

export const OFFICE_MAP_EMBED_URL =
  `https://maps.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed` as const;

export const WHATSAPP_URL =
  "https://wa.me/23408099441818?text=Hello%2C%20I%E2%80%99m%20interested%20in%20Omanga%E2%80%99s%20services%20and%20would%20like%20some%20guidance." as const;

export const WHATSAPP_NUMBER_DISPLAY = "+234 809 944 1818" as const;

export const PLAN_CHECKOUT_URLS = {
  Silver: "https://paystack.shop/pay/c2xlmupefm",
  Gold: "https://paystack.shop/pay/mq8op6uyir",
  Diamond: "https://paystack.shop/pay/e-qmgo0nlw",
} as const;

export const BRAND_COLOR = "#ae2448" as const;
export const INK_COLOR = "#161717" as const;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalised = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalised, SITE_URL).toString();
}
