import CardsSection from "@/components/services/design-solution/cards-section";
import CreativeSection from "@/components/services/design-solution/creative-section";
import HeroSection from "@/components/services/common/hero-section";
import InfoSection from "@/components/services/design-solution/info-section";

const Page = () => {
  return (
    <main>
      <HeroSection
        title="DESIGN SOLUTION"
        heading="Every Customer Communication Count"
        description="We Bring All Customer Conversations Into One Powerful Platform."
        bottomLabel="DESIGN HUB"
        image="/service/robot.png"
        backgroundImage="/service/hero_bg.png"
      />
      <CreativeSection />
      <InfoSection />
      <CardsSection />
    </main>
  );
};

export default Page;
