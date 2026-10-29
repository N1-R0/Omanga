import { COUNTRIES_SERVED_DISPLAY } from "@/content/site.content";

export const aboutHero = {
  pill: "About",
  title: "Money and health cover for your trip to Nigeria",
  sub: "Omanga is a Lagos company for anyone visiting Nigeria: one account for your travel wallet and your health cover.",
  video: {
    small: "/videos/about-hero-airport-720.mp4",
    large: "/videos/about-hero-airport-1080.mp4",
    poster: "/videos/about-hero-airport-poster.jpg",
  },
} as const;

export const aboutStory = {
  eyebrow: "Our story",
  title: "Why we built Omanga",
  lead: "Omanga started with one aim: make it easier to visit Nigeria and travel across Africa. Two things often get in the way: paying for things, and getting medical care if you fall ill.",
  body: [
    `So we put both in one account. Fund your wallet from USD, GBP or CAD, hold 6+ currencies and see the rate before you confirm. Spend in ${COUNTRIES_SERVED_DISPLAY} African countries. The wallet is free to open.`,
    "Then add short-term health cover from Phillips HMO for your time in Nigeria, with plans from $50 a month. Whether you're a tourist, a Nigerian living abroad or here for work, you land with money and cover sorted.",
  ],
} as const;

export const aboutMissionVision = {
  eyebrow: "What drives us",
  title: "Our mission and vision",
  sub: "We live by Ubuntu: together, we achieve more than we can alone.",
  cards: [
    {
      title: "Our mission",
      text: "Make it simpler for anyone to visit Nigeria and travel across Africa. We give visitors the money tools and health cover they need, support local communities and help every trip reflect the continent's hospitality.",
      tone: "blush",
    },
    {
      title: "Our vision",
      text: "Become a leading travel services company in Africa, helping visitors see the continent's diversity, culture and natural beauty through authentic, sustainable travel.",
      tone: "brand",
    },
  ],
} as const;

export const aboutValues = {
  eyebrow: "Our values",
  title: "What we value",
  values: [
    {
      title: "People",
      text: "We put people first: the visitors we serve, the communities they visit and the partners we work with.",
      photo: { src: "/about/value-people.jpg", width: 1600, height: 1066 },
    },
    {
      title: "Passion",
      text: "We want every visitor to see the best of what Nigeria and the rest of Africa have to offer.",
      photo: { src: "/about/value-passion.jpg", width: 1600, height: 1413 },
    },
    {
      title: "Partnership",
      text: "We work with established partners. Phillips HMO, a Nigerian health maintenance organisation (HMO), provides our health cover.",
      photo: { src: "/about/value-partnership.jpg", width: 1094, height: 1600 },
    },
  ],
} as const;

export const aboutOffice = {
  eyebrow: "Our office",
  title: "Find us in Lagos",
  sub: "We're a Lagos company, and our team works from Victoria Island.",
  officeName: "Victoria Island, Lagos",
  officeNote: "Our head office",
  directions: "Get directions",
  mapLabel: "Our office",
  mapTitle: "Map of Omanga's office in Victoria Island, Lagos",
  photos: [
    { src: "/about/office-civic-centre.jpg", label: "Victoria Island" },
    { src: "/about/office-lagoon.jpg", label: "Lagos" },
  ],
} as const;
