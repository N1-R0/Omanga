import Hero from "./components/Hero";
import PartnersStrip from "./components/PartnersStrip";
import BridgeStatement from "./components/BridgeStatement";
import CoreServices from "./components/CoreServices";
import HowItWorks from "./components/HowItWorks";
import TravelConfidence from "./components/TravelConfidence";
import StatsSection from "./components/StatsSection";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnersStrip />
      <BridgeStatement />
      <CoreServices />
      <HowItWorks />
      <TravelConfidence />
      <StatsSection />
      <FAQ />
      <CTA />
    </>
  );
}
