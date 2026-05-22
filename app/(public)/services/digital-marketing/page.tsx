import HeroSection from "@/components/services/common/hero-section";
import DigitalMarketingDetails from "@/components/services/digital-marketing/marketing-details";
import StatisticsSection from "@/components/services/digital-marketing/statistics-section";
import React from "react";

const Page = () => {
  return (
    <main>
      <HeroSection
        title="DIGITAL MARKETING"
        heading="Smart Strategies. Real Growth."
        description="Helping Businesses Grow Through Powerful Digital Experiences."
        bottomLabel="DESIGN HUB"
        image="/service/robot.png"
        backgroundImage="/service/hero_bg.png"
      />
      <DigitalMarketingDetails />
      <StatisticsSection />
    </main>
  );
};

export default Page;
