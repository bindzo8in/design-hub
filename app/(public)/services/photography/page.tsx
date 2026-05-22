import HeroSection from "@/components/services/common/hero-section";
import CapturedSection from "@/components/services/photography/captured-section";
import PhotographyServices from "@/components/services/photography/services";

const Page = () => {


  return (
    <main>
      <HeroSection
        title="PHOTOGRAPHY"
        heading="Turning Moments Into Memories"
        description="Professional Photography That Brings Your Brand To Life."
        bottomLabel="DESIGN HUB"
        image="/service/robot.png"
        backgroundImage="/service/hero_bg.png"
      />
      <PhotographyServices />
      <CapturedSection />
    </main>
  );
};

export default Page;
