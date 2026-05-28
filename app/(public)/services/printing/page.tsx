import HeroSection from "@/components/services/common/hero-section";
import ServiceShowcase from "@/components/services/common/outdoor-section";
import WhyChooseSection from "@/components/services/common/why-choose-section";
import PrintingOfferingSection from "@/components/services/printing/offering-section";
import PrintingWhySection from "@/components/services/printing/why-section";
import React from "react";

const Page = () => {
  const services = [
    {
      title: "Hoardings & Billboards",
      desc: "Large-format visuals for maximum reach",
      image: "/service/outdoor/mdi_billboard.svg",
    },
    {
      title: "Flex & Banner Displays",
      desc: "Cost-effective and high-visibility solutions",
      image: "/service/outdoor/material-symbols_flex-wrap.svg",
    },
    {
      title: "Bus Stops & Shelter Ads",
      desc: "Targeted exposure in high-footfall areas",
      image: "/service/outdoor/roentgen_shelter.svg",
    },
    {
      title: "Street & Roadside Branding",
      desc: "Continuous brand presence in key locations",
      image: "/service/outdoor/streamline-sharp_street-sign-solid.svg",
    },
    {
      title: "Transit Advertisements",
      desc: "Bus, auto, and mobile van branding",
      image: "/service/outdoor/temaki_transit.svg",
    },
  ];

  const features = [
    {
      title: "High Visibility",
      description:
        "Outdoor advertising places your brand in busy public spaces, ensuring maximum exposure to a wide audience.",
    },
    {
      title: "Strong Brand Recall",
      description:
        "Repeated visual exposure helps audiences remember your brand easily and for longer periods.",
    },
    {
      title: "Wide Reach",
      description:
        "Outdoor ads reach diverse audiences across locations, making them ideal for mass awareness campaigns.",
    },
    {
      title: "Digital Campaigns",
      description:
        "Outdoor advertising strengthens digital marketing by reinforcing brand presence offline.",
    },
  ];

  const points = [
    "Strategic location and format planning",
    "High-impact creative designs",
    "Quality printing and installation support",
    "Brand consistency across outdoor formats",
    "End-to-end campaign execution",
  ];

  return (
    <main>
      <HeroSection
        title="PRINTING"
        heading="Sharp Prints. Strong Impressions."
        description="We Turn Designs Into High-Quality Prints That Speak For Your Brand."
        bottomLabel="DESIGN HUB"
        image="/service/robot.png"
        backgroundImage="/service/hero_bg.png"
      />
      <PrintingOfferingSection />
      <PrintingWhySection />
      <ServiceShowcase
        title="Advertising Services"
        backgroundImage="/service/outdoor-bg.webp"
        services={services}
        features={features}
        description="Our team manages the entire process—from concept and design to
            production and execution—ensuring consistency, quality, and
            effectiveness across all outdoor formats. Our team manages the
            entire process—from concept and design to production and
            execution—ensuring consistency, quality, and effectiveness across
            all outdoor formats."
      />
      <WhyChooseSection
        badge="Why Choose Us"
        title="Why Choose"
        highlightText="Design Hub"
        description="We combine creativity, strategic placement, and flawless execution to deliver outdoor advertising campaigns that increase visibility and strengthen your brand presence."
        image="/service/math-circle.gif"
        imageAlt="Design Hub"
        points={points}
      />
    </main>
  );
};

export default Page;
