import type { Metadata } from "next";
import {
  Shield,
  Trophy,
  Gem,
  CheckCircle2,
  Stethoscope,
  Globe,
  PhoneCall,
  Newspaper,
  Smartphone,
} from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { PLAN_CHECKOUT_URLS } from "../lib/links";

export const metadata: Metadata = {
  title: "Plans — Omanga",
  description:
    "Choose the insurance plan that best fits your needs. Silver, Gold, and Diamond plans with flexible monthly payments.",
};

const PLANS = [
  {
    name: "Silver Package",
    icon: Shield,
    price: "$50",
    hospitalAccess: "Category A",
    checkoutUrl: PLAN_CHECKOUT_URLS.silver,
    accent: "bg-black text-white hover:bg-black/85",
    highlights: [
      { label: "Admission", value: "Semi-private" },
      { label: "Inpatient Psychiatric Care", value: "First 2 days" },
      { label: "CT Scans, MRI, Doppler Ultrasound scan", value: "One per trip" },
      {
        label: "Echocardiography / EEG / Spirometry",
        value: "One session",
      },
    ],
    included: [
      "24/7 emergency assistance",
      "15 days admission per trip",
      "Basic diagnostic services",
      "Emergency evacuation",
      "Prescription essential drugs",
    ],
  },
  {
    name: "Gold Package",
    icon: Trophy,
    price: "$85",
    hospitalAccess: "Category A + B",
    checkoutUrl: PLAN_CHECKOUT_URLS.gold,
    accent: "bg-[#e07b2c] text-white hover:bg-[#c96a22]",
    highlights: [
      { label: "Admission", value: "Private Ward" },
      { label: "Inpatient Psychiatric Care", value: "First 3 days" },
      { label: "CT Scans, MRI, Doppler Ultrasound scan", value: "Two per trip" },
      {
        label: "Echocardiography / EEG / Spirometry",
        value: "Two sessions",
      },
    ],
    included: [
      "Everything in Silver +",
      "Private ward admission",
      "Enhanced diagnostic coverage",
      "Extended eye care coverage",
      "Higher surgical limits",
    ],
  },
  {
    name: "Diamond Package",
    icon: Gem,
    price: "$120",
    hospitalAccess: "Category A + B + C",
    checkoutUrl: PLAN_CHECKOUT_URLS.diamond,
    accent: "bg-[#3730a3] text-white hover:bg-[#2c2585]",
    highlights: [
      { label: "Admission", value: "Private Ward" },
      { label: "Inpatient Psychiatric Care", value: "First 5 days" },
      { label: "CT Scans, MRI, Doppler Ultrasound scan", value: "Unlimited" },
      {
        label: "Echocardiography / EEG / Spirometry",
        value: "Unlimited",
      },
    ],
    included: [
      "Everything in Gold +",
      "Premium hospital access",
      "Unlimited CT scans",
      "Maximum coverage limits",
      "Comprehensive care",
    ],
  },
];

const ALL_PLANS_INCLUDE = [
  {
    icon: Stethoscope,
    title: "Telemedicine",
    description: "Virtual consultations with licensed doctors",
  },
  {
    icon: Globe,
    title: "Roaming",
    description: "Coverage wherever you travel",
  },
  {
    icon: PhoneCall,
    title: "24/7 Dedicated Contact Centre",
    description: "Round-the-clock support when you need it",
  },
  {
    icon: Newspaper,
    title: "Health-tips Newsletter",
    description: "Weekly wellness tips and health insights",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Manage your policy and claims on the go",
  },
];

export default function PlansPage() {
  return (
    <>
      <PageHero
        title="Insurance Plan"
        description="Choose the insurance plan that best fits your needs. All plans provide reliable coverage with flexible monthly payments."
      />

      <section className="bg-white px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div className="hover-lift flex h-full flex-col rounded-2xl border border-black/10 bg-white p-8 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mauve text-maroon">
                  <plan.icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-black">
                  {plan.name}
                </h2>
                <p className="mt-3">
                  <span className="text-3xl font-bold text-black">
                    {plan.price}
                  </span>
                  <span className="text-black/50"> /month</span>
                </p>
                <p className="mt-2 text-sm text-maroon">
                  Hospital Access: {plan.hospitalAccess}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-cream p-5 text-left">
                  <h3 className="col-span-2 text-sm font-semibold text-black">
                    Coverage Highlights
                  </h3>
                  {plan.highlights.map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-black/50">{item.label}:</p>
                      <p className="text-sm font-medium text-black">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex-1 text-left">
                  <h3 className="text-sm font-semibold text-black">
                    What&apos;s Included
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {plan.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-black/70"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-200 hover:scale-105 active:scale-95 ${plan.accent}`}
                >
                  Select {plan.name}
                </a>
                <p className="mt-3 text-xs text-black/50">
                  No commitment • Cancel anytime
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mx-auto mt-20 max-w-7xl text-center">
          <h2 className="text-2xl font-semibold text-black">
            All Plans Include
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {ALL_PLANS_INCLUDE.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mauve text-maroon">
                  <item.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="text-sm font-semibold text-black">
                  {item.title}
                </h3>
                <p className="text-xs text-black/60">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
