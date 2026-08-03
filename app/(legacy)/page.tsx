import Hero from "./_components/Hero";
import PartnersStrip from "./_components/PartnersStrip";
import BridgeStatement from "./_components/BridgeStatement";
import CoreServices from "./_components/CoreServices";
import HowItWorks from "./_components/HowItWorks";
import TravelConfidence from "./_components/TravelConfidence";
import StatsSection from "./_components/StatsSection";
import FAQ from "./_components/FAQ";
import CTA from "./_components/CTA";

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
